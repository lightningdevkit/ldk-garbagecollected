package org.ldk;

import org.bitcoinj.core.*;
import org.bitcoinj.core.Transaction;
import org.bitcoinj.script.Script;
import org.junit.jupiter.api.Test;
import org.ldk.enums.LDKNetwork;
import org.ldk.impl.bindings;
import org.ldk.structs.*;

import java.lang.ref.WeakReference;
import java.util.Arrays;
import java.util.HashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

public class HumanObjectPeerTest {
    class Peer {
        final long logger;
        final long fee_estimator;
        final long tx_broadcaster;
        final KeysManager keys;
        final KeysInterface keys_interface;
        final ChannelManager chan_manager;
        final EventsProvider chan_manager_events;
        final NetGraphMsgHandler router;
        final PeerManager peer_manager;
        HashMap<String, Long> monitors; // Wow I forgot just how terrible Java is - we can't put a byte array here.
        byte[] node_id;

        Peer(byte seed) {
            bindings.LDKLogger log_trait = (String arg) -> System.out.println(seed + ": " + arg);
            logger = bindings.LDKLogger_new(log_trait);
            this.fee_estimator = bindings.LDKFeeEstimator_new(confirmation_target -> 0);
            this.tx_broadcaster = bindings.LDKBroadcasterInterface_new(tx -> {
                // We should broadcast
            });
            this.monitors = new HashMap<>();
            Watch chain_monitor = new Watch(new bindings.LDKWatch() {
                @Override
                public long watch_channel(long funding_txo, long monitor) {
                    synchronized (monitors) {
                        assert monitors.put(Arrays.toString(bindings.OutPoint_get_txid(funding_txo)), monitor) == null;
                    }
                    bindings.OutPoint_free(funding_txo);
                    return bindings.CResult_NoneChannelMonitorUpdateErrZ_ok();
                }

                @Override
                public long update_channel(long funding_txo, long update) {
                    synchronized (monitors) {
                        String txid = Arrays.toString(bindings.OutPoint_get_txid(funding_txo));
                        assert monitors.containsKey(txid);
                        long update_res = bindings.ChannelMonitor_update_monitor(monitors.get(txid), update, tx_broadcaster, logger);
                        assert bindings.LDKCResult_NoneMonitorUpdateErrorZ_result_ok(update_res);
                        bindings.CResult_NoneMonitorUpdateErrorZ_free(update_res);
                    }
                    bindings.OutPoint_free(funding_txo);
                    bindings.ChannelMonitorUpdate_free(update);
                    return bindings.CResult_NoneChannelMonitorUpdateErrZ_ok();
                }

                @Override
                public long[] release_pending_monitor_events() {
                    synchronized (monitors) {
                        assert monitors.size() <= 1;
                        for (Long mon : monitors.values()) {
                            return bindings.ChannelMonitor_get_and_clear_pending_monitor_events(mon);
                        }
                    }
                    return new long[0];
                }
            });

            byte[] key_seed = new byte[32];
            for (byte i = 0; i < 32; i++) {
                key_seed[i] = (byte) (i ^ seed);
            }
            this.keys = KeysManager.constructor_new(key_seed, LDKNetwork.LDKNetwork_Bitcoin, System.currentTimeMillis() / 1000, (int) (System.currentTimeMillis() * 1000) & 0xffffffff);
            this.keys_interface = keys.as_KeysInterface();
            this.chan_manager = ChannelManager.constructor_new(LDKNetwork.LDKNetwork_Bitcoin, new FeeEstimator(confirmation_target -> 0), chain_monitor,
                    new BroadcasterInterface(tx -> {
                    }), new Logger(log_trait), keys.as_KeysInterface(), UserConfig.constructor_default(), 1);
            this.node_id = chan_manager.get_our_node_id();
            this.chan_manager_events = chan_manager.as_EventsProvider();
            this.router = NetGraphMsgHandler.constructor_new(null, new Logger(log_trait));

            byte[] random_data = new byte[32];
            for (byte i = 0; i < 32; i++) {
                random_data[i] = (byte) ((i ^ seed) ^ 0xf0);
            }
            this.peer_manager = PeerManager.constructor_new(chan_manager.as_ChannelMessageHandler(), router.as_RoutingMessageHandler(), keys_interface.get_node_secret(), random_data, new Logger(log_trait));
            System.gc();
        }

        void connect_block(Block b, Transaction t, int height) {
            byte[] header = Arrays.copyOfRange(b.bitcoinSerialize(), 0, 80);
            long[] txn;
            if (t != null)
                txn = new long[]{bindings.C2Tuple_usizeTransactionZ_new(1, bindings.new_txpointer_copy_data(t.bitcoinSerialize()))};
            else
                txn = new long[0];
            bindings.ChannelManager_block_connected(chan_manager._test_only_get_ptr(), header, txn, height);
            synchronized (monitors) {
                for (Long mon : monitors.values()) {
                    if (t != null)
                        txn = new long[]{bindings.C2Tuple_usizeTransactionZ_new(1, bindings.new_txpointer_copy_data(t.bitcoinSerialize()))};
                    else
                        txn = new long[0];
                    long[] ret = bindings.ChannelMonitor_block_connected(mon, header, txn, height, tx_broadcaster, fee_estimator, logger);
                    for (long r : ret) bindings.C2Tuple_TxidCVec_TxOutZZ_free(r);
                }
            }
        }

        void free() {
            // Note that we can't rely on finalizer order, so don't bother trying to rely on it here
            bindings.Logger_free(logger);
            bindings.FeeEstimator_free(fee_estimator);
            bindings.BroadcasterInterface_free(tx_broadcaster);
            synchronized (monitors) {
                for (Long mon : monitors.values()) {
                    bindings.ChannelMonitor_free(mon);
                }
            }
        }

        Route get_route(byte[] dest_node, ChannelDetails[] our_chans) {
            try (LockedNetworkGraph netgraph = this.router.read_locked_graph()) {
                NetworkGraph graph = netgraph.graph();
                long res = bindings.get_route(this.node_id, graph._test_only_get_ptr(), dest_node, new long[] {our_chans[0]._test_only_get_ptr()},
                        new long[0], 1000, 42, this.logger);
                assert bindings.LDKCResult_RouteLightningErrorZ_result_ok(res);
                Route copy = Route.constructor_read(bindings.Route_write(bindings.LDKCResult_RouteLightningErrorZ_get_ok(res)));
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
    void do_test_message_handler() throws InterruptedException {
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

        long cc_res = bindings.ChannelManager_create_channel(peer1.chan_manager._test_only_get_ptr(), peer2.node_id, 10000, 1000, 42, 0);
        assert bindings.LDKCResult_NoneAPIErrorZ_result_ok(cc_res);
        bindings.CResult_NoneAPIErrorZ_free(cc_res);

        peer1.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }
        peer2.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }

        Event[] events = peer1.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.FundingGenerationReady;
        assert ((Event.FundingGenerationReady)events[0]).channel_value_satoshis == 10000;
        assert ((Event.FundingGenerationReady)events[0]).user_channel_id == 42;
        byte[] funding_spk = ((Event.FundingGenerationReady)events[0]).output_script;
        assert funding_spk.length == 34 && funding_spk[0] == 0 && funding_spk[1] == 32; // P2WSH
        byte[] chan_id = ((Event.FundingGenerationReady)events[0]).temporary_channel_id;

        Transaction funding = new Transaction(NetworkParameters.fromID(NetworkParameters.ID_MAINNET));
        funding.addInput(new TransactionInput(NetworkParameters.fromID(NetworkParameters.ID_MAINNET), funding, new byte[0]));
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
        assert ((Event.FundingBroadcastSafe)events[0]).user_channel_id == 42;

        Block b = new Block(NetworkParameters.fromID(NetworkParameters.ID_MAINNET), 2, Sha256Hash.ZERO_HASH, Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[]{funding}));
        peer1.connect_block(b, funding, 1);
        peer2.connect_block(b, funding, 1);

        for (int height = 2; height < 10; height++) {
            b = new Block(NetworkParameters.fromID(NetworkParameters.ID_MAINNET), 2, b.getHash(), Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[]{funding}));
            peer1.connect_block(b, null, height);
            peer2.connect_block(b, null, height);
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

        long[] peer2_events = bindings.EventsProvider_get_and_clear_pending_events(peer2.chan_manager_events._test_only_get_ptr());
        assert peer2_events.length == 1;
        bindings.LDKEvent forwardable = bindings.LDKEvent_ref_from_ptr(peer2_events[0]);
        assert forwardable instanceof bindings.LDKEvent.PendingHTLCsForwardable;
        bindings.CVec_EventZ_free(peer2_events);
        bindings.ChannelManager_process_pending_htlc_forwards(peer2.chan_manager._test_only_get_ptr());

        peer2_events = bindings.EventsProvider_get_and_clear_pending_events(peer2.chan_manager_events._test_only_get_ptr());
        assert peer2_events.length == 1;
        bindings.LDKEvent payment_recvd = bindings.LDKEvent_ref_from_ptr(peer2_events[0]);
        assert payment_recvd instanceof bindings.LDKEvent.PaymentReceived;
        peer2.chan_manager.claim_funds(payment_preimage, new byte[32], ((bindings.LDKEvent.PaymentReceived) payment_recvd).amt);
        bindings.CVec_EventZ_free(peer2_events);

        peer2.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }
        peer1.peer_manager.process_events();
        while (!list.isEmpty()) { list.poll().join(); }

        long[] peer1_events = bindings.EventsProvider_get_and_clear_pending_events(peer1.chan_manager_events._test_only_get_ptr());
        assert peer1_events.length == 1;
        bindings.LDKEvent sent = bindings.LDKEvent_ref_from_ptr(peer1_events[0]);
        assert sent instanceof bindings.LDKEvent.PaymentSent;
        assert Arrays.equals(((bindings.LDKEvent.PaymentSent) sent).payment_preimage, payment_preimage);
        bindings.CVec_EventZ_free(peer1_events);

        peer1.free();
        peer2.free();
        bindings.SocketDescriptor_free(descriptor2);
        bindings.SocketDescriptor_free(descriptor1.val);
    }

    @Test
    public void test_message_handler() throws InterruptedException {
        do_test_message_handler();
        while (!gc_ran) {
            System.gc();
            System.runFinalization();
        }
        for (WeakReference<Object> o : must_free_objs)
            assert o.get() == null;
    }
}