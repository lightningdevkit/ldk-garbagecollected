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

class HumanObjectPeerTestInstance {
    class Peer {
        KeysInterface manual_keysif(KeysInterface underlying_if) {
            return KeysInterface.new_impl(new KeysInterface.KeysInterfaceInterface() {
                @Override public byte[] get_node_secret() { return underlying_if.get_node_secret(); }
                @Override public byte[] get_destination_script() { return underlying_if.get_destination_script(); }
                @Override public byte[] get_shutdown_pubkey() { return underlying_if.get_shutdown_pubkey(); }

                @Override
                public ChannelKeys get_channel_keys(boolean inbound, long channel_value_satoshis) {
                    ChannelKeys underlying_ck = underlying_if.get_channel_keys(inbound, channel_value_satoshis);
                    ChannelKeys.ChannelKeysInterface cki = new ChannelKeys.ChannelKeysInterface() {
                        @Override
                        public byte[] get_per_commitment_point(long idx) {
                            return underlying_ck.get_per_commitment_point(idx);
                        }

                        @Override
                        public byte[] release_commitment_secret(long idx) {
                            return underlying_ck.release_commitment_secret(idx);
                        }

                        @Override
                        public TwoTuple<Long, Long> key_derivation_params() {
                            return new TwoTuple<Long, Long>((long)0, (long)1);
                        }

                        @Override
                        public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx) {
                            return underlying_ck.sign_counterparty_commitment(commitment_tx);
                        }

                        @Override
                        public Result_SignatureNoneZ sign_holder_commitment(HolderCommitmentTransaction holder_commitment_tx) {
                            return underlying_ck.sign_holder_commitment(holder_commitment_tx);
                        }

                        @Override
                        public Result_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions(HolderCommitmentTransaction holder_commitment_tx) {
                            return underlying_ck.sign_holder_commitment_htlc_transactions(holder_commitment_tx);
                        }

                        @Override
                        public Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc) {
                            return underlying_ck.sign_justice_transaction(justice_tx, input, amount, per_commitment_key, htlc);
                        }

                        @Override
                        public Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc) {
                            return underlying_ck.sign_counterparty_htlc_transaction(htlc_tx, input, amount, per_commitment_point, htlc);
                        }

                        @Override
                        public Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx) {
                            return underlying_ck.sign_closing_transaction(closing_tx);
                        }

                        @Override
                        public Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg) {
                            return underlying_ck.sign_channel_announcement(msg);
                        }

                        @Override
                        public void ready_channel(ChannelTransactionParameters params) {
                            underlying_ck.ready_channel(params);
                        }

                        @Override
                        public byte[] write() {
                            return underlying_ck.write();
                        }
                    };
                    ChannelKeys resp = ChannelKeys.new_impl(cki, underlying_ck.get_pubkeys());
                    must_free_objs.add(new WeakReference<>(cki));
                    must_free_objs.add(new WeakReference<>(resp));
                    must_free_objs.add(new WeakReference<>(underlying_ck));
                    return resp;
                }

                @Override
                public byte[] get_secure_random_bytes() {
                    return underlying_if.get_secure_random_bytes();
                }

                @Override
                public Result_ChanKeySignerDecodeErrorZ read_chan_signer(byte[] reader) {
                    return underlying_if.read_chan_signer(reader);
                }
            });
        }

        Watch get_manual_watch() {
            return Watch.new_impl(new Watch.WatchInterface() {
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
                        Result_NoneMonitorUpdateErrorZ update_res = monitors.get(txid).update_monitor(update, tx_broadcaster, fee_estimator, logger);
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
        }

        final Logger logger;
        final FeeEstimator fee_estimator;
        final BroadcasterInterface tx_broadcaster;
        final KeysInterface keys_interface;
        final ChainMonitor chain_monitor;
        final ChannelManager chan_manager;
        final EventsProvider chan_manager_events;
        final NetGraphMsgHandler router;
        final PeerManager peer_manager;
        final HashMap<String, ChannelMonitor> monitors; // Wow I forgot just how terrible Java is - we can't put a byte array here.
        byte[] node_id;
        final LinkedList<byte[]> broadcast_set = new LinkedList<>();

        Peer(byte seed, boolean use_km_wrapper, boolean use_manual_watch) {
            logger = Logger.new_impl((String arg) -> System.out.println(seed + ": " + arg));
            fee_estimator = FeeEstimator.new_impl((confirmation_target -> 253));
            tx_broadcaster = BroadcasterInterface.new_impl(tx -> {
                broadcast_set.add(tx);
            });
            this.monitors = new HashMap<>();
            Persist persister = Persist.new_impl(new Persist.PersistInterface() {
                @Override
                public Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint id, ChannelMonitor data) {
                    return new Result_NoneChannelMonitorUpdateErrZ.Result_NoneChannelMonitorUpdateErrZ_OK();
                }

                @Override
                public Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint id, ChannelMonitorUpdate update, ChannelMonitor data) {
                    return new Result_NoneChannelMonitorUpdateErrZ.Result_NoneChannelMonitorUpdateErrZ_OK();
                }
            });
            Watch chain_watch;
            if (use_manual_watch) {
                chain_watch = get_manual_watch();
                chain_monitor = null;
            } else {
                chain_monitor = ChainMonitor.constructor_new(null, tx_broadcaster, logger, fee_estimator, persister);
                chain_watch = chain_monitor.as_Watch();
            }

            byte[] key_seed = new byte[32];
            for (byte i = 0; i < 32; i++) {
                key_seed[i] = (byte) (i ^ seed);
            }
            if (use_km_wrapper) {
                KeysManager underlying = KeysManager.constructor_new(key_seed, LDKNetwork.LDKNetwork_Bitcoin, System.currentTimeMillis() / 1000, (int) (System.currentTimeMillis() * 1000) & 0xffffffff);
                this.keys_interface = manual_keysif(underlying.as_KeysInterface());
            } else {
                KeysManager keys = KeysManager.constructor_new(key_seed, LDKNetwork.LDKNetwork_Bitcoin, System.currentTimeMillis() / 1000, (int) (System.currentTimeMillis() * 1000) & 0xffffffff);
                this.keys_interface = keys.as_KeysInterface();
            }
            this.chan_manager = ChannelManager.constructor_new(LDKNetwork.LDKNetwork_Bitcoin, FeeEstimator.new_impl(confirmation_target -> 0), chain_watch, tx_broadcaster, logger, this.keys_interface, UserConfig.constructor_default(), 1);
            this.node_id = chan_manager.get_our_node_id();
            this.chan_manager_events = chan_manager.as_EventsProvider();
            this.router = NetGraphMsgHandler.constructor_new(new byte[32], null, logger);

            byte[] random_data = new byte[32];
            for (byte i = 0; i < 32; i++) {
                random_data[i] = (byte) ((i ^ seed) ^ 0xf0);
            }
            this.peer_manager = PeerManager.constructor_new(chan_manager.as_ChannelMessageHandler(), router.as_RoutingMessageHandler(), keys_interface.get_node_secret(), random_data, logger);
            System.gc();
        }

        TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] connect_block(Block b, int height, long expected_monitor_update_len) {
            byte[] header = Arrays.copyOfRange(b.bitcoinSerialize(), 0, 80);
            TwoTuple<Long, byte[]>[] txn;
            if (b.hasTransactions()) {
                assert b.getTransactions().size() == 1;
                TwoTuple<Long, byte[]> txp = new TwoTuple<>((long) 1, b.getTransactions().get(0).bitcoinSerialize());
                txn = new TwoTuple[]{txp};
            } else
                txn = new TwoTuple[0];
            chan_manager.block_connected(header, txn, height);
            if (chain_monitor != null) {
                chain_monitor.block_connected(header, txn, height);
            } else {
                synchronized (monitors) {
                    assert monitors.size() == 1;
                    for (ChannelMonitor mon : monitors.values()) {
                        TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] ret = mon.block_connected(header, txn, height, tx_broadcaster, fee_estimator, logger);
                        assert ret.length == expected_monitor_update_len;
                        return ret;
                    }
                }
            }
            return null;
        }

        Route get_route(byte[] dest_node, ChannelDetails[] our_chans) {
            try (LockedNetworkGraph netgraph = this.router.read_locked_graph()) {
                NetworkGraph graph = netgraph.graph();
                long res = bindings.get_route(this.node_id, graph._test_only_get_ptr(), dest_node, new long[]{our_chans[0]._test_only_get_ptr()},
                        new long[0], 1000, 42, this.logger._test_only_get_ptr());
                assert bindings.LDKCResult_RouteLightningErrorZ_result_ok(res);
                byte[] serialized_route = bindings.Route_write(bindings.LDKCResult_RouteLightningErrorZ_get_ok(res));
                must_free_objs.add(new WeakReference<>(serialized_route));
                Result_RouteDecodeErrorZ copy = Route.constructor_read(serialized_route);
                assert copy instanceof Result_RouteDecodeErrorZ.Result_RouteDecodeErrorZ_OK;
                bindings.CResult_RouteLightningErrorZ_free(res);
                return ((Result_RouteDecodeErrorZ.Result_RouteDecodeErrorZ_OK) copy).res;
            }
        }
    }

    class DescriptorHolder { SocketDescriptor val; }

    boolean running = false;
    final LinkedList<Runnable> runqueue = new LinkedList();
    Thread t = new Thread(() -> {
            while (true) {
                try {
                    Runnable r;
                    synchronized (runqueue) {
                        while (runqueue.isEmpty()) {
                            runqueue.wait();
                        }
                        running = true;
                        r = runqueue.pollFirst();
                    }
                    r.run();
                    synchronized (runqueue) {
                        running = false;
                        runqueue.notifyAll();
                    }
                } catch (InterruptedException e) {
                    return;
                }
            }
    });
    void wait_events_processed() {
        while (true) {
            synchronized (runqueue) {
                if (runqueue.isEmpty() && !running) break;
                try { runqueue.wait(); } catch (InterruptedException e) { assert false; }
            }
        }
    }
    void do_read_event(PeerManager pm, SocketDescriptor descriptor, byte[] data) {
        if (!t.isAlive()) t.start();
        synchronized (runqueue) {
            runqueue.add(() -> {
                Result_boolPeerHandleErrorZ res = pm.read_event(descriptor, data);
                assert res instanceof Result_boolPeerHandleErrorZ.Result_boolPeerHandleErrorZ_OK;
            });
            runqueue.notifyAll();
        }
        must_free_objs.add(new WeakReference<>(data));
    }

    void do_test_message_handler(boolean nice_close, boolean use_km_wrapper, boolean use_manual_watch) throws InterruptedException {
        GcCheck obj = new GcCheck();
        Peer peer1 = new Peer((byte) 1, use_km_wrapper, use_manual_watch);
        Peer peer2 = new Peer((byte) 2, use_km_wrapper, use_manual_watch);

        DescriptorHolder descriptor1 = new DescriptorHolder();
        DescriptorHolder descriptor1ref = descriptor1;
        SocketDescriptor descriptor2 = SocketDescriptor.new_impl(new SocketDescriptor.SocketDescriptorInterface() {
            @Override
            public long send_data(byte[] data, boolean resume_read) {
                do_read_event(peer1.peer_manager, descriptor1ref.val, data);
                return data.length;
            }

            @Override public void disconnect_socket() { assert false; }
            @Override public boolean eq(SocketDescriptor other_arg) { return other_arg.hash() == 2; }
            @Override public long hash() { return 2; }
        });

        descriptor1.val = SocketDescriptor.new_impl(new SocketDescriptor.SocketDescriptorInterface() {
            @Override
            public long send_data(byte[] data, boolean resume_read) {
                do_read_event(peer2.peer_manager, descriptor2, data);
                return data.length;
            }

            @Override public void disconnect_socket() { assert false; }
            @Override public boolean eq(SocketDescriptor other_arg) { return other_arg.hash() == 1; }
            @Override public long hash() { return 1; }
        });

        Result_CVec_u8ZPeerHandleErrorZ conn_res = peer1.peer_manager.new_outbound_connection(peer2.node_id, descriptor1.val);
        assert conn_res instanceof Result_CVec_u8ZPeerHandleErrorZ.Result_CVec_u8ZPeerHandleErrorZ_OK;

        Result_NonePeerHandleErrorZ inbound_conn_res = peer2.peer_manager.new_inbound_connection(descriptor2);
        assert inbound_conn_res instanceof Result_NonePeerHandleErrorZ.Result_NonePeerHandleErrorZ_OK;
        do_read_event(peer2.peer_manager, descriptor2, ((Result_CVec_u8ZPeerHandleErrorZ.Result_CVec_u8ZPeerHandleErrorZ_OK) conn_res).res);

        wait_events_processed();

        Result_NoneAPIErrorZ cc_res = peer1.chan_manager.create_channel(peer2.node_id, 10000, 1000, 42, null);
        assert cc_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;

        peer1.peer_manager.process_events();
        wait_events_processed();
        peer2.peer_manager.process_events();
        wait_events_processed();

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
        wait_events_processed();
        peer2.peer_manager.process_events();
        wait_events_processed();

        events = peer1.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.FundingBroadcastSafe;
        assert ((Event.FundingBroadcastSafe) events[0]).user_channel_id == 42;

        Block b = new Block(bitcoinj_net, 2, Sha256Hash.ZERO_HASH, Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[]{funding}));
        peer1.connect_block(b, 1, 0);
        peer2.connect_block(b, 1, 0);

        for (int height = 2; height < 10; height++) {
            b = new Block(bitcoinj_net, 2, b.getHash(), Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[0]));
            peer1.connect_block(b, height, 0);
            peer2.connect_block(b, height, 0);
        }

        peer1.peer_manager.process_events();
        peer2.peer_manager.process_events();
        wait_events_processed();

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
        wait_events_processed();
        peer2.peer_manager.process_events();
        wait_events_processed();
        peer1.peer_manager.process_events();
        wait_events_processed();

        {
            peer1.chan_manager.write();
            //ChannelManager.
        }

        events = peer2.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PendingHTLCsForwardable;
        peer2.chan_manager.process_pending_htlc_forwards();

        events = peer2.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PaymentReceived;
        peer2.chan_manager.claim_funds(payment_preimage, new byte[32], ((Event.PaymentReceived) events[0]).amt);

        peer2.peer_manager.process_events();
        wait_events_processed();
        peer1.peer_manager.process_events();
        wait_events_processed();
        peer2.peer_manager.process_events();
        wait_events_processed();

        events = peer1.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PaymentSent;
        assert Arrays.equals(((Event.PaymentSent) events[0]).payment_preimage, payment_preimage);

        if (nice_close) {
            Result_NoneAPIErrorZ close_res = peer1.chan_manager.close_channel(peer1_chans[0].get_channel_id());
            assert close_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;

            peer1.peer_manager.process_events();
            wait_events_processed();
            peer2.peer_manager.process_events();
            wait_events_processed();
            peer1.peer_manager.process_events();
            wait_events_processed();
            peer2.peer_manager.process_events();
            wait_events_processed();

            assert peer1.broadcast_set.size() == 1;
            assert peer2.broadcast_set.size() == 1;
        } else {
            peer1.chan_manager.force_close_all_channels();

            peer1.peer_manager.process_events();
            wait_events_processed();
            peer2.peer_manager.process_events();
            wait_events_processed();
            peer1.peer_manager.process_events();
            wait_events_processed();
            peer2.peer_manager.process_events();
            wait_events_processed();

            assert peer1.broadcast_set.size() == 1;
            assert peer2.broadcast_set.size() == 0;

            Transaction tx = new Transaction(bitcoinj_net, peer1.broadcast_set.getFirst());
            b = new Block(bitcoinj_net, 2, b.getHash(), Sha256Hash.ZERO_HASH, 42, 0, 0,
                    Arrays.asList(new Transaction[]{tx}));
            TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] watch_outputs =  peer2.connect_block(b, 1, 1);
            if (watch_outputs != null) { // We only process watch_outputs manually when we use a manually-build Watch impl
                assert watch_outputs.length == 1;
                assert Arrays.equals(watch_outputs[0].a, tx.getTxId().getReversedBytes());
                assert watch_outputs[0].b.length == 1;
            }

            // This used to be buggy and double-free, so go ahead and fetch them!
            for (ChannelMonitor mon : peer2.monitors.values()) {
                byte[][] txn = mon.get_latest_holder_commitment_txn(peer2.logger);
            }
        }
    }

    java.util.LinkedList<WeakReference<Object>> must_free_objs = new java.util.LinkedList();
    boolean gc_ran = false;
    class GcCheck {
        @Override
        protected void finalize() throws Throwable {
            gc_ran = true;
            super.finalize();
        }
    }
}
public class HumanObjectPeerTest {
    void do_test(boolean nice_close, boolean use_km_wrapper, boolean use_manual_watch) throws InterruptedException {
        HumanObjectPeerTestInstance instance = new HumanObjectPeerTestInstance();
        instance.do_test_message_handler(nice_close, use_km_wrapper, use_manual_watch);
        while (!instance.gc_ran) {
            System.gc();
            System.runFinalization();
        }
        for (WeakReference<Object> o : instance.must_free_objs)
            assert o.get() == null;
    }
    @Test
    public void test_message_handler_force_close() throws InterruptedException {
        do_test(false, false, false);
    }
    @Test
    public void test_message_handler_nice_close() throws InterruptedException {
        do_test(true, false, false);
    }
    @Test
    public void test_message_handler_nice_close_wrapper() throws InterruptedException {
        do_test(true, true, true);
    }
    @Test
    public void test_message_handler_force_close_wrapper() throws InterruptedException {
        do_test(false, true, true);
    }
}
