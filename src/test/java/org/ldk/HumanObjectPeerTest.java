package org.ldk;

import org.bitcoinj.core.*;
import org.bitcoinj.core.Transaction;
import org.bitcoinj.script.Script;
import org.junit.jupiter.api.Test;
import org.ldk.batteries.ChannelManagerConstructor;
import org.ldk.batteries.NioPeerHandler;
import org.ldk.enums.LDKNetwork;
import org.ldk.impl.bindings;
import org.ldk.structs.*;
import org.ldk.util.TwoTuple;

import java.io.IOException;
import java.lang.ref.WeakReference;
import java.net.InetSocketAddress;
import java.util.*;

class HumanObjectPeerTestInstance {
    private final boolean nice_close;
    private final boolean use_km_wrapper;
    private final boolean use_manual_watch;
    private final boolean reload_peers;
    private final boolean break_cross_peer_refs;
    private final boolean use_nio_peer_handler;
    private final boolean use_filter;

    HumanObjectPeerTestInstance(boolean nice_close, boolean use_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean use_nio_peer_handler, boolean use_filter) {
        this.nice_close = nice_close;
        this.use_km_wrapper = use_km_wrapper;
        this.use_manual_watch = use_manual_watch;
        this.reload_peers = reload_peers;
        this.break_cross_peer_refs = break_cross_peer_refs;
        this.use_nio_peer_handler = use_nio_peer_handler;
        this.use_filter = use_filter;
    }

    class Peer {
        KeysInterface manual_keysif(KeysInterface underlying_if) {
            return KeysInterface.new_impl(new KeysInterface.KeysInterfaceInterface() {
                @Override public byte[] get_node_secret() { return underlying_if.get_node_secret(); }
                @Override public byte[] get_destination_script() { return underlying_if.get_destination_script(); }
                @Override public byte[] get_shutdown_pubkey() { return underlying_if.get_shutdown_pubkey(); }

                @Override
                public Sign get_channel_signer(boolean inbound, long channel_value_satoshis) {
                    Sign underlying_ck = underlying_if.get_channel_signer(inbound, channel_value_satoshis);
                    Sign.SignInterface si = new Sign.SignInterface() {
                        @Override
                        public byte[] get_per_commitment_point(long idx) {
                            return underlying_ck.get_per_commitment_point(idx);
                        }

                        @Override
                        public byte[] release_commitment_secret(long idx) {
                            return underlying_ck.release_commitment_secret(idx);
                        }

                        @Override
                        public byte[] channel_keys_id() {
                            return new byte[32];
                        }

                        @Override
                        public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx) {
                            return underlying_ck.sign_counterparty_commitment(commitment_tx);
                        }

                        @Override
                        public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs(HolderCommitmentTransaction holder_commitment_tx) {
                            return underlying_ck.sign_holder_commitment_and_htlcs(holder_commitment_tx);
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
                    Sign resp = Sign.new_impl(si, underlying_ck.get_pubkeys());
                    must_free_objs.add(new WeakReference<>(si));
                    must_free_objs.add(new WeakReference<>(resp));
                    must_free_objs.add(new WeakReference<>(underlying_ck));
                    return resp;
                }

                @Override
                public byte[] get_secure_random_bytes() {
                    return underlying_if.get_secure_random_bytes();
                }

                @Override
                public Result_SignDecodeErrorZ read_chan_signer(byte[] reader) {
                    return underlying_if.read_chan_signer(reader);
                }
            });
        }

        Watch get_manual_watch() {
            Watch.WatchInterface watch_impl = new Watch.WatchInterface() {
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
            };
            Watch watch = Watch.new_impl(watch_impl);
            must_free_objs.add(new WeakReference<>(watch_impl));
            must_free_objs.add(new WeakReference<>(watch));
            return watch;
        }

        NioPeerHandler nio_peer_handler;
        short nio_port;
        final byte seed;
        final Logger logger;
        final FeeEstimator fee_estimator;
        final BroadcasterInterface tx_broadcaster;
        final KeysInterface keys_interface;
        final ChainMonitor chain_monitor;
        final NetGraphMsgHandler router;
        final Watch chain_watch;
        final HashSet<String> filter_additions;
        final Filter filter;
        ChannelManager chan_manager;
        EventsProvider chan_manager_events;
        PeerManager peer_manager;
        final HashMap<String, ChannelMonitor> monitors; // Wow I forgot just how terrible Java is - we can't put a byte array here.
        byte[] node_id;
        final LinkedList<byte[]> broadcast_set = new LinkedList<>();
        GcCheck obj = new GcCheck();

        private TwoTuple<OutPoint, byte[]> test_mon_roundtrip(ChannelMonitor mon) {
            // Because get_funding_txo() returns an OutPoint in a tuple that is a reference to an OutPoint inside the
            // ChannelMonitor, its a good test to ensure that the OutPoint isn't freed (or is cloned) before the
            // ChannelMonitor is. This used to be broken.
            Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ roundtrip_monitor = UtilMethods.constructor_BlockHashChannelMonitorZ_read(mon.write(), keys_interface);
            assert roundtrip_monitor instanceof Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK;
            TwoTuple<OutPoint, byte[]> funding_txo = ((Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK) roundtrip_monitor).res.b.get_funding_txo();
            System.gc(); System.runFinalization(); // Give the GC a chance to run.
            return funding_txo;
        }

        private Peer(Object _dummy, byte seed) {
            logger = Logger.new_impl((String arg) -> System.out.println(seed + ": " + arg));
            fee_estimator = FeeEstimator.new_impl((confirmation_target -> 253));
            tx_broadcaster = BroadcasterInterface.new_impl(tx -> {
                broadcast_set.add(tx);
            });
            monitors = new HashMap<>();
            this.seed = seed;
            Persist persister = Persist.new_impl(new Persist.PersistInterface() {
                @Override
                public Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint id, ChannelMonitor data) {
                    synchronized (monitors) {
                        String key = Arrays.toString(id.to_channel_id());
                        assert monitors.put(key, data) == null;
                        TwoTuple<OutPoint, byte[]> res = test_mon_roundtrip(data);
                        assert Arrays.equals(res.a.get_txid(), id.get_txid());
                        assert res.a.get_index() == id.get_index();
                    }
                    return new Result_NoneChannelMonitorUpdateErrZ.Result_NoneChannelMonitorUpdateErrZ_OK();
                }

                @Override
                public Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint id, ChannelMonitorUpdate update, ChannelMonitor data) {
                    synchronized (monitors) {
                        String key = Arrays.toString(id.to_channel_id());
                        assert monitors.put(key, data) != null;
                        TwoTuple<OutPoint, byte[]> res = test_mon_roundtrip(data);
                        assert Arrays.equals(res.a.get_txid(), id.get_txid());
                        assert res.a.get_index() == id.get_index();
                    }
                    return new Result_NoneChannelMonitorUpdateErrZ.Result_NoneChannelMonitorUpdateErrZ_OK();
                }
            });

            filter_additions = new HashSet<>();
            if (use_filter) {
                this.filter = Filter.new_impl(new Filter.FilterInterface() {
                    @Override public void register_tx(byte[] txid, byte[] script_pubkey) {
                        filter_additions.add(Arrays.toString(txid));
                    }
                    @Override public void register_output(OutPoint outpoint, byte[] script_pubkey) {
                        filter_additions.add(Arrays.toString(outpoint.get_txid()) + ":" + outpoint.get_index());
                    }
                });
            } else {
                this.filter = null;
            }

            if (use_manual_watch) {
                chain_watch = get_manual_watch();
                chain_monitor = null;
            } else {
                chain_monitor = ChainMonitor.constructor_new(filter, tx_broadcaster, logger, fee_estimator, persister);
                chain_watch = chain_monitor.as_Watch();
            }

            byte[] key_seed = new byte[32];
            for (byte i = 0; i < 32; i++) {
                key_seed[i] = (byte) (i ^ seed);
            }
            KeysManager keys = KeysManager.constructor_new(key_seed, System.currentTimeMillis() / 1000, (int) (System.currentTimeMillis() * 1000));
            if (use_km_wrapper) {
                this.keys_interface = manual_keysif(keys.as_KeysInterface());
            } else {
                this.keys_interface = keys.as_KeysInterface();
            }
            this.router = NetGraphMsgHandler.constructor_new(new byte[32], null, logger);
        }
        private void bind_nio() {
            if (!use_nio_peer_handler) return;
            try { this.nio_peer_handler = new NioPeerHandler(peer_manager); } catch (IOException e) { assert false; }
            for (short i = 10_000; true; i++) {
                try {
                    nio_peer_handler.bind_listener(new InetSocketAddress("127.0.0.1", i));
                    nio_port = i;
                    break;
                } catch (IOException e) { assert i < 10_500; }
            }
        }
        Peer(byte seed) {
            this(null, seed);
            this.chan_manager = ChannelManager.constructor_new(FeeEstimator.new_impl(confirmation_target -> 0), chain_watch, tx_broadcaster, logger, this.keys_interface, UserConfig.constructor_default(), LDKNetwork.LDKNetwork_Bitcoin, new byte[32], 0);
            this.node_id = chan_manager.get_our_node_id();
            this.chan_manager_events = chan_manager.as_EventsProvider();

            byte[] random_data = new byte[32];
            for (byte i = 0; i < 32; i++) {
                random_data[i] = (byte) ((i ^ seed) ^ 0xf0);
            }
            this.peer_manager = PeerManager.constructor_new(chan_manager.as_ChannelMessageHandler(), router.as_RoutingMessageHandler(), keys_interface.get_node_secret(), random_data, logger);
            bind_nio();
            System.gc();
        }
        Object ptr_to;
        Peer(Peer orig) {
            this(null, orig.seed);
            if (!break_cross_peer_refs) {
                ChannelMonitor[] monitors = new ChannelMonitor[1];
                synchronized (monitors) {
                    assert orig.monitors.size() == 1;
                    monitors[0] = orig.monitors.values().stream().iterator().next();
                }
                byte[] serialized = orig.chan_manager.write();
                Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ read_res =
                        UtilMethods.constructor_BlockHashChannelManagerZ_read(serialized, this.keys_interface, this.fee_estimator, this.chain_watch, this.tx_broadcaster, this.logger, UserConfig.constructor_default(), monitors);
                assert read_res instanceof Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK;
                this.chan_manager = ((Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK) read_res).res.b;
                this.chain_watch.watch_channel(monitors[0].get_funding_txo().a, monitors[0]);
            } else {
                final ArrayList<byte[]> channel_monitors = new ArrayList();
                synchronized (monitors) {
                    assert orig.monitors.size() == 1;
                    channel_monitors.add(orig.monitors.values().stream().iterator().next().write());
                }
                byte[] serialized = orig.chan_manager.write();
                try {
                    ChannelManagerConstructor constructed = new ChannelManagerConstructor(serialized, channel_monitors.toArray(new byte[1][]), this.keys_interface, this.fee_estimator, this.chain_watch, this.filter, this.tx_broadcaster, this.logger);
                    this.chan_manager = constructed.channel_manager;
                    constructed.chain_sync_completed();
                    if (use_filter && !use_manual_watch) {
                        // With a manual watch we don't actually use the filter object at all.
                        assert this.filter_additions.containsAll(orig.filter_additions) &&
                                orig.filter_additions.containsAll(this.filter_additions);
                    }
                } catch (ChannelManagerConstructor.InvalidSerializedDataException e) {
                    assert false;
                }
            }
            if (!break_cross_peer_refs && (use_manual_watch || use_km_wrapper)) {
                // When we pass monitors[0] into chain_watch.watch_channel we create a reference from the new Peer to a
                // field in the old peer, preventing freeing of the original Peer until the new Peer is freed. Thus, we
                // shouldn't bother waiting for the original to be freed later on.
                cross_reload_ref_pollution = true;
            }
            this.node_id = chan_manager.get_our_node_id();
            this.chan_manager_events = chan_manager.as_EventsProvider();

            if (cross_reload_ref_pollution) {
                // This really, really needs to be handled at the bindings layer, but its rather complicated -
                // ChannelSigners can be cloned and passed around without java being involved, resulting in them being
                // owned by both one or more ChannelMonitors and a ChannelManager, with only one having proper pointers
                // to the ChannelSigner. Ideally, the ChannelSigner would have a global reference to the Java
                // implementation class, but that results in circular references. Instead, we need some ability to,
                // while cloning ChannelSigners, add new references in the calling Java struct (ie ChannelMonitor) to
                // the ChannelSigner.
                this.ptr_to = orig.chan_manager;
            }

            byte[] random_data = new byte[32];
            for (byte i = 0; i < 32; i++) {
                random_data[i] = (byte) ((i ^ seed) ^ 0xf0);
            }
            this.peer_manager = PeerManager.constructor_new(chan_manager.as_ChannelMessageHandler(), router.as_RoutingMessageHandler(), keys_interface.get_node_secret(), random_data, logger);
            bind_nio();
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
            chan_manager.as_Listen().block_connected(b.bitcoinSerialize(), height);
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

        Event[] get_monitor_events() {
            if (chain_monitor != null) {
                return chain_monitor.as_EventsProvider().get_and_clear_pending_events();
            } else {
                synchronized (monitors) {
                    assert monitors.size() == 1;
                    for (ChannelMonitor mon : monitors.values()) {
                        return mon.get_and_clear_pending_events();
                    }
                    return null;
                }
            }
        }

        Route get_route(byte[] dest_node, ChannelDetails[] our_chans) {
            try (LockedNetworkGraph netgraph = this.router.read_locked_graph()) {
                NetworkGraph graph = netgraph.graph();
                long res = bindings.get_route(this.node_id, graph._test_only_get_ptr(), dest_node, 0L, new long[]{our_chans[0]._test_only_get_ptr()},
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

    static class DescriptorHolder { SocketDescriptor val; }

    boolean running = false;
    final LinkedList<Runnable> runqueue = new LinkedList();
    boolean ran = false;
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
    void wait_events_processed(Peer peer1, Peer peer2) {
        if (use_nio_peer_handler) {
            peer1.nio_peer_handler.check_events();
            peer2.nio_peer_handler.check_events();
            try { Thread.sleep(400); } catch (InterruptedException e) { assert false; }
        } else {
            synchronized (runqueue) {
                ran = false;
            }
            while (true) {
                peer1.peer_manager.process_events();
                peer2.peer_manager.process_events();
                synchronized (runqueue) {
                    if (runqueue.isEmpty() && !running) {
                        if (ran) {
                            ran = false;
                            continue;
                        } else { break; }
                    }
                    try { runqueue.wait(); } catch (InterruptedException e) { assert false; }
                }
            }
        }
    }
    void do_read_event(PeerManager pm, SocketDescriptor descriptor, byte[] data) {
        if (!t.isAlive()) t.start();
        synchronized (runqueue) {
            ran = true;
            runqueue.add(() -> {
                Result_boolPeerHandleErrorZ res = pm.read_event(descriptor, data);
                assert res instanceof Result_boolPeerHandleErrorZ.Result_boolPeerHandleErrorZ_OK;
            });
            runqueue.notifyAll();
        }
        must_free_objs.add(new WeakReference<>(data));
    }

    void connect_peers(final Peer peer1, final Peer peer2) {
        if (use_nio_peer_handler) {
            try {
                peer1.nio_peer_handler.connect(peer2.chan_manager.get_our_node_id(), new InetSocketAddress("127.0.0.1", peer2.nio_port), 100);
            } catch (IOException e) { assert false; }
        } else {
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
        }
    }

    TestState do_test_message_handler() throws InterruptedException {
        Peer peer1 = new Peer((byte) 1);
        Peer peer2 = new Peer((byte) 2);

        connect_peers(peer1, peer2);
        wait_events_processed(peer1, peer2);

        Result_NoneAPIErrorZ cc_res = peer1.chan_manager.create_channel(peer2.node_id, 10000, 1000, 42, null);
        assert cc_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;
        wait_events_processed(peer1, peer2);

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
        wait_events_processed(peer1, peer2);

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
        wait_events_processed(peer1, peer2);

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
        wait_events_processed(peer1, peer2);

        RouteHop[][] hops = new RouteHop[1][1];
        byte[] hop_pubkey = new byte[33];
        hop_pubkey[0] = 3;
        hop_pubkey[1] = 42;
        hops[0][0] = RouteHop.constructor_new(hop_pubkey, NodeFeatures.constructor_known(), 42, ChannelFeatures.constructor_known(), 100, 0);
        Route r2 = Route.constructor_new(hops);
        payment_res = peer1.chan_manager.send_payment(r2, payment_hash, new byte[32]);
        assert payment_res instanceof Result_NonePaymentSendFailureZ.Result_NonePaymentSendFailureZ_Err;

        assert peer1.get_monitor_events().length == 0;
        assert peer2.get_monitor_events().length == 0;

        if (reload_peers) {
            if (use_nio_peer_handler) {
                peer1.nio_peer_handler.interrupt();
                peer2.nio_peer_handler.interrupt();
            }
            WeakReference<Peer> op1 = new WeakReference<Peer>(peer1);
            peer1 = new Peer(peer1);
            peer2 = new Peer(peer2);
            return new TestState(op1, peer1, peer2, payment_preimage, b.getHash());
        }
        return new TestState(null, peer1, peer2, payment_preimage, b.getHash());
    }

    boolean cross_reload_ref_pollution = false;
    class TestState {
        private final WeakReference<Peer> ref_block;
        private final Peer peer1;
        private final Peer peer2;
        private final byte[] payment_preimage;
        public Sha256Hash best_blockhash;

        public TestState(WeakReference<Peer> ref_block, Peer peer1, Peer peer2, byte[] payment_preimage, Sha256Hash best_blockhash) {
            this.ref_block = ref_block;
            this.peer1 = peer1;
            this.peer2 = peer2;
            this.payment_preimage = payment_preimage;
            this.best_blockhash = best_blockhash;
        }
    }
    void do_test_message_handler_b(TestState state) {
        GcCheck obj = new GcCheck();
        if (state.ref_block != null) {
            // Ensure the original peers get freed before we move on. Note that we have to be in a different function
            // scope to do so as the (at least current OpenJDK) JRE won't release anything created in the same scope.
            while (!cross_reload_ref_pollution && state.ref_block.get() != null) {
                System.gc();
                System.runFinalization();
            }
            connect_peers(state.peer1, state.peer2);
        }
        wait_events_processed(state.peer1, state.peer2);

        Event[] events = state.peer2.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PendingHTLCsForwardable;
        state.peer2.chan_manager.process_pending_htlc_forwards();

        events = state.peer2.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PaymentReceived;
        state.peer2.chan_manager.claim_funds(state.payment_preimage, new byte[32], ((Event.PaymentReceived) events[0]).amt);
        wait_events_processed(state.peer1, state.peer2);

        events = state.peer1.chan_manager_events.get_and_clear_pending_events();
        assert events.length == 1;
        assert events[0] instanceof Event.PaymentSent;
        assert Arrays.equals(((Event.PaymentSent) events[0]).payment_preimage, state.payment_preimage);
        wait_events_processed(state.peer1, state.peer2);

        ChannelDetails[] peer1_chans = state.peer1.chan_manager.list_channels();

        if (nice_close) {
            Result_NoneAPIErrorZ close_res = state.peer1.chan_manager.close_channel(peer1_chans[0].get_channel_id());
            assert close_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;
            wait_events_processed(state.peer1, state.peer2);

            assert state.peer1.broadcast_set.size() == 1;
            assert state.peer2.broadcast_set.size() == 1;
        } else {
            state.peer1.chan_manager.force_close_all_channels();
            wait_events_processed(state.peer1, state.peer2);

            assert state.peer1.broadcast_set.size() == 1;
            assert state.peer2.broadcast_set.size() == 0;

            NetworkParameters bitcoinj_net = NetworkParameters.fromID(NetworkParameters.ID_MAINNET);
            Transaction tx = new Transaction(bitcoinj_net, state.peer1.broadcast_set.getFirst());
            Block b = new Block(bitcoinj_net, 2, state.best_blockhash, Sha256Hash.ZERO_HASH, 42, 0, 0,
                    Arrays.asList(new Transaction[]{tx}));
            TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] watch_outputs = state.peer2.connect_block(b, 10, 1);
            if (watch_outputs != null) { // We only process watch_outputs manually when we use a manually-build Watch impl
                assert watch_outputs.length == 1;
                assert Arrays.equals(watch_outputs[0].a, tx.getTxId().getReversedBytes());
                assert watch_outputs[0].b.length == 1;
            }

            // This used to be buggy and double-free, so go ahead and fetch them!
            for (ChannelMonitor mon : state.peer2.monitors.values()) {
                byte[][] txn = mon.get_latest_holder_commitment_txn(state.peer2.logger);
            }
        }

        if (use_nio_peer_handler) {
            state.peer1.peer_manager.disconnect_by_node_id(state.peer2.chan_manager.get_our_node_id(), false);
            wait_events_processed(state.peer1, state.peer2);
            assert state.peer1.peer_manager.get_peer_node_ids().length == 0;
            assert state.peer2.peer_manager.get_peer_node_ids().length == 0;
            state.peer1.nio_peer_handler.interrupt();
            state.peer2.nio_peer_handler.interrupt();
        }

        assert state.peer1.get_monitor_events().length == 0;
        assert state.peer2.get_monitor_events().length == 0;
    }

    java.util.LinkedList<WeakReference<Object>> must_free_objs = new java.util.LinkedList();
    int gc_count = 0;
    int gc_exp_count = 0;
    class GcCheck {
        GcCheck() { gc_exp_count += 1; }
        @Override
        protected void finalize() throws Throwable {
            gc_count += 1;
            super.finalize();
        }
    }
}
public class HumanObjectPeerTest {
    HumanObjectPeerTestInstance do_test_run(boolean nice_close, boolean use_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean nio_peer_handler) throws InterruptedException {
        HumanObjectPeerTestInstance instance = new HumanObjectPeerTestInstance(nice_close, use_km_wrapper, use_manual_watch, reload_peers, break_cross_peer_refs, nio_peer_handler, !nio_peer_handler);
        HumanObjectPeerTestInstance.TestState state = instance.do_test_message_handler();
        instance.do_test_message_handler_b(state);
        return instance;
    }
    void do_test(boolean nice_close, boolean use_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean nio_peer_handler) throws InterruptedException {
        HumanObjectPeerTestInstance instance = do_test_run(nice_close, use_km_wrapper, use_manual_watch, reload_peers, break_cross_peer_refs, nio_peer_handler);
        while (instance.gc_count != instance.gc_exp_count) {
            System.gc();
            System.runFinalization();
        }
        for (WeakReference<Object> o : instance.must_free_objs)
            assert o.get() == null;
    }
    @Test
    public void test_message_handler() throws InterruptedException {
        for (int i = 0; i < (1 << 6) - 1; i++) {
            boolean nice_close =       (i & (1 << 0)) != 0;
            boolean use_km_wrapper =   (i & (1 << 1)) != 0;
            boolean use_manual_watch = (i & (1 << 2)) != 0;
            boolean reload_peers =     (i & (1 << 3)) != 0;
            boolean break_cross_refs = (i & (1 << 4)) != 0;
            boolean nio_peer_handler = (i & (1 << 5)) != 0;
            if (break_cross_refs && !reload_peers) {
                // There are no cross refs to break without reloading peers.
                continue;
            }
            System.err.println("Running test with flags " + i);
            do_test(nice_close, use_km_wrapper, use_manual_watch, reload_peers, break_cross_refs, nio_peer_handler);
        }
    }
}
