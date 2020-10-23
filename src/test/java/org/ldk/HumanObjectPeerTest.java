package org.ldk;

import org.bitcoinj.core.*;
import org.bitcoinj.core.Transaction;
import org.bitcoinj.script.Script;
import org.junit.jupiter.api.Test;
import org.ldk.enums.LDKNetwork;
import org.ldk.impl.bindings;
import org.ldk.structs.*;
import org.ldk.util.TwoTuple;

import java.lang.ref.WeakReference;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.concurrent.ConcurrentLinkedQueue;

class HumanObjectPeerTestInstance {
    class Peer {
        final Logger logger;
        final FeeEstimator fee_estimator;
        final BroadcasterInterface tx_broadcaster;
        final KeysManager keys;
        final KeysInterface keys_interface;
        final ChannelManager chan_manager;
        final EventsProvider chan_manager_events;
        final NetGraphMsgHandler router;
        final PeerManager peer_manager;
        final HashMap<String, ChannelMonitor> monitors; // Wow I forgot just how terrible Java is - we can't put a byte array here.
        byte[] node_id;
        final LinkedList<org.ldk.structs.Transaction> broadcast_set = new LinkedList<>();

        Peer(byte seed) {
            logger = new Logger((String arg) -> System.out.println(seed + ": " + arg));
            fee_estimator = new FeeEstimator((confirmation_target -> 253));
            tx_broadcaster = new BroadcasterInterface(tx -> {
                broadcast_set.add(tx);
            });
            this.monitors = new HashMap<>();
            Watch chain_monitor = new Watch(new Watch.WatchInterface() {
                public Result_NoneChannelMonitorUpdateErrZ watch_channel(OutPoint funding_txo, ChannelMonitor monitor) {
                    synchronized (monitors) {
                        assert monitors.put(Arrays.toString(funding_txo.get_txid()), monitor) == null;
                    }
                    return new Result_NoneChannelMonitorUpdateErrZ.Result_NoneChannelMonitorUpdateErrZ_OK();
                }

                public Result_NoneChannelMonitorUpdateErrZ update_channel(OutPoint funding_txo, ChannelMonitorUpdate update) {
                    synchronized (monitors) {
                        String txid = Arrays.toString(funding_txo.get_txid());
                        assert monitors.containsKey(txid);
                        Result_NoneMonitorUpdateErrorZ update_res = monitors.get(txid).update_monitor(update, tx_broadcaster, logger);
                        assert update_res instanceof Result_NoneMonitorUpdateErrorZ.Result_NoneMonitorUpdateErrorZ_OK;
                    }
                    return new Result_NoneChannelMonitorUpdateErrZ.Result_NoneChannelMonitorUpdateErrZ_OK();
                }

                @Override
                public MonitorEvent[] release_pending_monitor_events() {
                    synchronized (monitors) {
                        assert monitors.size() <= 1;
                        for (ChannelMonitor mon : monitors.values()) {
                            return mon.get_and_clear_pending_monitor_events();
                        }
                    }
                    return new MonitorEvent[0];
                }
            });

            byte[] key_seed = new byte[32];
            for (byte i = 0; i < 32; i++) {
                key_seed[i] = (byte) (i ^ seed);
            }
            this.keys = KeysManager.constructor_new(key_seed, LDKNetwork.LDKNetwork_Bitcoin, System.currentTimeMillis() / 1000, (int) (System.currentTimeMillis() * 1000) & 0xffffffff);
            this.keys_interface = keys.as_KeysInterface();
            this.chan_manager = ChannelManager.constructor_new(LDKNetwork.LDKNetwork_Bitcoin, new FeeEstimator(confirmation_target -> 0), chain_monitor, tx_broadcaster, logger, keys.as_KeysInterface(), UserConfig.constructor_default(), 1);
            this.node_id = chan_manager.get_our_node_id();
            this.chan_manager_events = chan_manager.as_EventsProvider();
            this.router = NetGraphMsgHandler.constructor_new(null, logger);

            byte[] random_data = new byte[32];
            for (byte i = 0; i < 32; i++) {
                random_data[i] = (byte) ((i ^ seed) ^ 0xf0);
            }
            this.peer_manager = PeerManager.constructor_new(chan_manager.as_ChannelMessageHandler(), router.as_RoutingMessageHandler(), keys_interface.get_node_secret(), random_data, logger);
            System.gc();
        }

        void connect_block(Block b, int height) {
            byte[] header = Arrays.copyOfRange(b.bitcoinSerialize(), 0, 80);
            TwoTuple<Long, org.ldk.structs.Transaction>[] txn;
            if (b.hasTransactions()) {
                assert b.getTransactions().size() == 1;
                TwoTuple<Long, org.ldk.structs.Transaction> txp = new TwoTuple<>((long) 1, new org.ldk.structs.Transaction(b.getTransactions().get(0).bitcoinSerialize()));
                txn = new TwoTuple[]{txp};
            } else
                txn = new TwoTuple[0];
            chan_manager.block_connected(header, txn, height);
            synchronized (monitors) {
                for (ChannelMonitor mon : monitors.values()) {
                    TwoTuple<byte[], TxOut[]>[] ret = mon.block_connected(header, txn, height, tx_broadcaster, fee_estimator, logger);
                    assert ret.length == 0;
                }
            }
        }

        Route get_route(byte[] dest_node, ChannelDetails[] our_chans) {
            try (LockedNetworkGraph netgraph = this.router.read_locked_graph()) {
                NetworkGraph graph = netgraph.graph();
                long res = bindings.get_route(this.node_id, graph._test_only_get_ptr(), dest_node, new long[]{our_chans[0]._test_only_get_ptr()},
                        new long[0], 1000, 42, this.logger._test_only_get_ptr());
                assert bindings.LDKCResult_RouteLightningErrorZ_result_ok(res);
                byte[] serialized_route = bindings.Route_write(bindings.LDKCResult_RouteLightningErrorZ_get_ok(res));
                must_free_objs.add(new WeakReference<>(serialized_route));
                Route copy = Route.constructor_read(serialized_route);
                bindings.CResult_RouteLightningErrorZ_free(res);
                return copy;
            }
        }
    }

    class LongHolder { long val; }

    java.util.LinkedList<WeakReference<Object>> must_free_objs = new java.util.LinkedList();

    void do_read_event(ConcurrentLinkedQueue<Thread> list, PeerManager pm, long descriptor, byte[] data) {
        Thread thread = new Thread(() -> {
            long res = bindings.PeerManager_read_event(pm._test_only_get_ptr(), descriptor, data);
            assert bindings.LDKCResult_boolPeerHandleErrorZ_result_ok(res);
            //assert bindings.deref_bool(bindings.LDKCResult_boolPeerHandleErrorZ_get_inner(res));
            bindings.CResult_boolPeerHandleErrorZ_free(res);
        });
        thread.start();
        list.add(thread);
        must_free_objs.add(new WeakReference<>(data));
    }

    boolean gc_ran = false;

    class GcCheck {
        @Override
        protected void finalize() throws Throwable {
            gc_ran = true;
            super.finalize();
        }
    }

    void do_test_message_handler(boolean nice_close) throws InterruptedException {
        GcCheck obj = new GcCheck();
        Peer peer1 = new Peer((byte) 1);
        Peer peer2 = new Peer((byte) 2);

        ConcurrentLinkedQueue<Thread> list = new ConcurrentLinkedQueue<Thread>();
        LongHolder descriptor1 = new LongHolder();
        LongHolder descriptor1ref = descriptor1;
        bindings.LDKSocketDescriptor sock1 = new bindings.LDKSocketDescriptor() {
            @Override
            public long send_data(byte[] data, boolean resume_read) {
                do_read_event(list, peer1.peer_manager, descriptor1ref.val, data);
                return data.length;
            }

            @Override public void disconnect_socket() { assert false; }
            @Override public boolean eq(long other_arg) { return bindings.LDKSocketDescriptor_get_obj_from_jcalls(other_arg).hash() == 2; }
            @Override public long hash() { return 2; }
        };
        long descriptor2 = bindings.LDKSocketDescriptor_new(sock1);

        bindings.LDKSocketDescriptor sock2 = new bindings.LDKSocketDescriptor() {
            @Override
            public long send_data(byte[] data, boolean resume_read) {
                do_read_event(list, peer2.peer_manager, descriptor2, data);
                return data.length;
            }

            @Override public void disconnect_socket() { assert false; }
            @Override public boolean eq(long other_arg) { return bindings.LDKSocketDescriptor_get_obj_from_jcalls(other_arg).hash() == 1; }
            @Override public long hash() { return 1; }
        };
        descriptor1.val = bindings.LDKSocketDescriptor_new(sock2);

        long init_vec = bindings.PeerManager_new_outbound_connection(peer1.peer_manager._test_only_get_ptr(), peer2.node_id, descriptor1.val);
        assert (bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_result_ok(init_vec));

        long con_res = bindings.PeerManager_new_inbound_connection(peer2.peer_manager._test_only_get_ptr(), descriptor2);
        assert (bindings.LDKCResult_NonePeerHandleErrorZ_result_ok(con_res));
        bindings.CResult_NonePeerHandleErrorZ_free(con_res);
        do_read_event(list, peer2.peer_manager, descriptor2, bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_get_ok(init_vec));
        bindings.CResult_CVec_u8ZPeerHandleErrorZ_free(init_vec);

        while (!list.isEmpty()) { list.poll().join(); }

        Result_NoneAPIErrorZ cc_res = peer1.chan_manager.create_channel(peer2.node_id, 10000, 1000, 42, null);
        assert cc_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;

        peer1.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }
        peer2.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }

        Event[] events = peer1.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.FundingGenerationReady;
        assert ((Event.FundingGenerationReady) events[0]).channel_value_satoshis == 10000;
        assert ((Event.FundingGenerationReady) events[0]).user_channel_id == 42;
        byte[] funding_spk = ((Event.FundingGenerationReady) events[0]).output_script;
        assert funding_spk.length == 34 && funding_spk[0] == 0 && funding_spk[1] == 32; // P2WSH
        byte[] chan_id = ((Event.FundingGenerationReady) events[0]).temporary_channel_id;

        NetworkParameters bitcoinj_net = NetworkParameters.fromID(NetworkParameters.ID_MAINNET);

        Transaction funding = new Transaction(bitcoinj_net);
        funding.addInput(new TransactionInput(bitcoinj_net, funding, new byte[0]));
        funding.getInputs().get(0).setWitness(new TransactionWitness(2)); // Make sure we don't complain about lack of witness
        funding.getInput(0).getWitness().setPush(0, new byte[]{0x1});
        funding.addOutput(Coin.SATOSHI.multiply(10000), new Script(funding_spk));
        peer1.chan_manager.funding_transaction_generated(chan_id, OutPoint.constructor_new(funding.getTxId().getReversedBytes(), (short) 0));

        peer1.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }
        peer2.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }

        events = peer1.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.FundingBroadcastSafe;
        assert ((Event.FundingBroadcastSafe) events[0]).user_channel_id == 42;

        Block b = new Block(bitcoinj_net, 2, Sha256Hash.ZERO_HASH, Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[]{funding}));
        peer1.connect_block(b, 1);
        peer2.connect_block(b, 1);

        for (int height = 2; height < 10; height++) {
            b = new Block(bitcoinj_net, 2, b.getHash(), Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[0]));
            peer1.connect_block(b, height);
            peer2.connect_block(b, height);
        }

        peer1.peer_manager.process_events();
        peer2.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }

        peer1.chan_manager.list_channels();
        ChannelDetails[] peer1_chans = peer1.chan_manager.list_channels();
        ChannelDetails[] peer2_chans = peer2.chan_manager.list_channels();
        assert peer1_chans.length == 1;
        assert peer2_chans.length == 1;
        assert peer1_chans[0].get_channel_value_satoshis() == 10000;
        assert peer1_chans[0].get_is_live();
        assert Arrays.equals(peer1_chans[0].get_channel_id(), funding.getTxId().getReversedBytes());
        assert Arrays.equals(peer2_chans[0].get_channel_id(), funding.getTxId().getReversedBytes());

        byte[] payment_preimage = new byte[32];
        for (int i = 0; i < 32; i++) payment_preimage[i] = (byte) (i ^ 0x0f);
        byte[] payment_hash = Sha256Hash.hash(payment_preimage);
        Route route = peer1.get_route(peer2.node_id, peer1_chans);
        Result_NonePaymentSendFailureZ payment_res = peer1.chan_manager.send_payment(route, payment_hash, new byte[32]);
        assert payment_res instanceof Result_NonePaymentSendFailureZ.Result_NonePaymentSendFailureZ_OK;

        peer1.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }
        peer2.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }
        peer1.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }

        events = peer2.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PendingHTLCsForwardable;
        peer2.chan_manager.process_pending_htlc_forwards();

        events = peer2.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PaymentReceived;
        peer2.chan_manager.claim_funds(payment_preimage, new byte[32], ((Event.PaymentReceived) events[0]).amt);

        peer2.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }
        peer1.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }
        peer2.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }

        events = peer1.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PaymentSent;
        assert Arrays.equals(((Event.PaymentSent) events[0]).payment_preimage, payment_preimage);

        if (nice_close) {
            Result_NoneAPIErrorZ close_res = peer1.chan_manager.close_channel(peer1_chans[0].get_channel_id());
            assert close_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;

            peer1.peer_manager.process_events();
            while (!list.isEmpty()) { list.poll().join(); }
            peer2.peer_manager.process_events();
            while (!list.isEmpty()) { list.poll().join(); }
            peer1.peer_manager.process_events();
            while (!list.isEmpty()) { list.poll().join(); }
            peer2.peer_manager.process_events();
            while (!list.isEmpty()) { list.poll().join(); }

            assert peer1.broadcast_set.size() == 1;
            assert peer2.broadcast_set.size() == 1;
        } else {
            peer1.chan_manager.force_close_all_channels();

            peer1.peer_manager.process_events();
            while (!list.isEmpty()) { list.poll().join(); }
            peer2.peer_manager.process_events();
            while (!list.isEmpty()) { list.poll().join(); }
            peer1.peer_manager.process_events();
            while (!list.isEmpty()) { list.poll().join(); }
            peer2.peer_manager.process_events();
            while (!list.isEmpty()) { list.poll().join(); }

            assert peer1.broadcast_set.size() == 1;
            assert peer2.broadcast_set.size() == 0;

            //b = new Block(bitcoinj_net, 2, b.getHash(), Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[]{new Transaction(bitcoinj_net, peer1.broadcast_set.getFirst())}));
            //peer2.connect_block(b, 1);
        }

        bindings.SocketDescriptor_free(descriptor2);
        bindings.SocketDescriptor_free(descriptor1.val);
    }

}
public class HumanObjectPeerTest {
    @Test
    public void test_message_handler_force_close() throws InterruptedException {
        HumanObjectPeerTestInstance instance = new HumanObjectPeerTestInstance();
        instance.do_test_message_handler(false);
        while (!instance.gc_ran) {
            System.gc();
            System.runFinalization();
        }
        for (WeakReference<Object> o : instance.must_free_objs)
            assert o.get() == null;
    }
    @Test
    public void test_message_handler_nice_close() throws InterruptedException {
        HumanObjectPeerTestInstance instance = new HumanObjectPeerTestInstance();
        instance.do_test_message_handler(true);
        while (!instance.gc_ran) {
            System.gc();
            System.runFinalization();
        }
        for (WeakReference<Object> o : instance.must_free_objs)
            assert o.get() == null;
    }
}
