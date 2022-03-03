package org.ldk;

import org.bitcoinj.core.*;
import org.bitcoinj.script.Script;
import org.junit.jupiter.api.Test;
import org.ldk.batteries.ChannelManagerConstructor;
import org.ldk.batteries.NioPeerHandler;
import org.ldk.enums.*;
import org.ldk.enums.Currency;
import org.ldk.structs.*;
import org.ldk.util.UInt5;

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
    private final boolean use_ignore_handler;
    private final boolean use_chan_manager_constructor;
    private final boolean use_invoice_payer;

    HumanObjectPeerTestInstance(boolean nice_close, boolean use_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean use_nio_peer_handler, boolean use_filter, boolean use_ignore_handler, boolean use_chan_manager_constructor, boolean use_invoice_payer) {
        this.nice_close = nice_close;
        this.use_km_wrapper = use_km_wrapper;
        this.use_manual_watch = use_manual_watch;
        this.reload_peers = reload_peers;
        this.break_cross_peer_refs = break_cross_peer_refs;
        this.use_nio_peer_handler = use_nio_peer_handler;
        this.use_filter = use_filter;
        this.use_ignore_handler = use_ignore_handler;
        this.use_chan_manager_constructor = use_chan_manager_constructor;
        this.use_invoice_payer = use_invoice_payer;
    }

    class Peer {
        KeysInterface manual_keysif(KeysInterface underlying_if) {
            return KeysInterface.new_impl(new KeysInterface.KeysInterfaceInterface() {
                @Override public Result_SecretKeyNoneZ get_node_secret(Recipient recipient) { return underlying_if.get_node_secret(recipient); }
                @Override public byte[] get_destination_script() { return underlying_if.get_destination_script(); }
                @Override public ShutdownScript get_shutdown_scriptpubkey() { return underlying_if.get_shutdown_scriptpubkey(); }

                @Override
                public Sign get_channel_signer(boolean inbound, long channel_value_satoshis) {
                    Sign underlying_ck = underlying_if.get_channel_signer(inbound, channel_value_satoshis);
                    BaseSign underlying_base = underlying_ck.get_base_sign();
                    BaseSign.BaseSignInterface bsi = new BaseSign.BaseSignInterface() {
                        @Override public byte[] get_per_commitment_point(long idx) {
                            return underlying_base.get_per_commitment_point(idx);
                        }
                        @Override public byte[] release_commitment_secret(long idx) {
                            return underlying_base.release_commitment_secret(idx);
                        }
                        @Override public Result_NoneNoneZ validate_holder_commitment(HolderCommitmentTransaction holder_tx, byte[][] preimages) {
                            return underlying_base.validate_holder_commitment(holder_tx, preimages);
                        }
                        @Override public byte[] channel_keys_id() {
                            return new byte[32];
                        }
                        @Override public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx, byte[][] preimages) {
                            return underlying_base.sign_counterparty_commitment(commitment_tx, preimages);
                        }
                        @Override public Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret) {
                            return underlying_base.validate_counterparty_revocation(idx, secret);
                        }
                        @Override public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs(HolderCommitmentTransaction holder_commitment_tx) {
                            return underlying_base.sign_holder_commitment_and_htlcs(holder_commitment_tx);
                        }
                        @Override public Result_SignatureNoneZ sign_justice_revoked_output(byte[] justice_tx, long input, long amount, byte[] per_commitment_key) {
                            return underlying_base.sign_justice_revoked_output(justice_tx, input, amount, per_commitment_key);
                        }
                        @Override public Result_SignatureNoneZ sign_justice_revoked_htlc(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc) {
                            return underlying_base.sign_justice_revoked_htlc(justice_tx, input, amount, per_commitment_key, htlc);
                        }
                        @Override public Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc) {
                            return underlying_base.sign_counterparty_htlc_transaction(htlc_tx, input, amount, per_commitment_point, htlc);
                        }
                        @Override public Result_SignatureNoneZ sign_closing_transaction(ClosingTransaction closing_tx) {
                            return underlying_base.sign_closing_transaction(closing_tx);
                        }
                        @Override public Result_C2Tuple_SignatureSignatureZNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg) {
                            return underlying_base.sign_channel_announcement(msg);
                        }
                        @Override public void ready_channel(ChannelTransactionParameters params) {
                            underlying_base.ready_channel(params);
                        }
                    };
                    Sign.SignInterface si = new Sign.SignInterface() {
                        @Override
                        public byte[] write() {
                            return underlying_ck.write();
                        }
                    };
                    Sign resp = Sign.new_impl(si, bsi, underlying_base.get_pubkeys());
                    must_free_objs.add(new WeakReference<>(si));
                    must_free_objs.add(new WeakReference<>(bsi));
                    must_free_objs.add(new WeakReference<>(resp));
                    must_free_objs.add(new WeakReference<>(underlying_base));
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

                @Override
                public Result_RecoverableSignatureNoneZ sign_invoice(byte[] hrp_bytes, UInt5[] invoice_data, Recipient receipient) {
                    return underlying_if.sign_invoice(hrp_bytes, invoice_data, receipient);
                }

                @Override
                public byte[] get_inbound_payment_key_material() {
                    return underlying_if.get_inbound_payment_key_material();
                }
            });
        }

        Watch get_manual_watch() {
            Watch.WatchInterface watch_impl = new Watch.WatchInterface() {
                public Result_NoneChannelMonitorUpdateErrZ watch_channel(OutPoint funding_txo, ChannelMonitor monitor) {
                    synchronized (monitors) {
                        assert monitors.put(Arrays.toString(funding_txo.get_txid()), monitor) == null;
                    }
                    return Result_NoneChannelMonitorUpdateErrZ.ok();
                }

                public Result_NoneChannelMonitorUpdateErrZ update_channel(OutPoint funding_txo, ChannelMonitorUpdate update) {
                    synchronized (monitors) {
                        String txid = Arrays.toString(funding_txo.get_txid());
                        assert monitors.containsKey(txid);
                        Result_NoneNoneZ update_res = monitors.get(txid).update_monitor(update, tx_broadcaster, fee_estimator, logger);
                        assert update_res instanceof Result_NoneNoneZ.Result_NoneNoneZ_OK;
                    }
                    return Result_NoneChannelMonitorUpdateErrZ.ok();
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
        final KeysManager explicit_keys_manager;
        final KeysInterface keys_interface;
        final ChainMonitor chain_monitor;
        final NetworkGraph router;
        NetGraphMsgHandler route_handler;
        final Watch chain_watch;
        final HashSet<String> filter_additions;
        Option_FilterZ filter;
        ChannelManager chan_manager;
        PeerManager peer_manager;
        final HashMap<String, ChannelMonitor> monitors; // Wow I forgot just how terrible Java is - we can't put a byte array here.
        byte[] node_id;
        byte[] connected_peer_node_id = null;
        final LinkedList<byte[]> broadcast_set = new LinkedList<>();
        final LinkedList<Event> pending_manager_events = new LinkedList<>();
        private final CustomMessageHandler custom_message_handler;
        final LinkedList<byte[]> received_custom_messages = new LinkedList<>();
        final LinkedList<byte[]> custom_messages_to_send = new LinkedList<>();
        ChannelManagerConstructor constructor = null;
        InvoicePayer payer = null;
        GcCheck obj = new GcCheck();

        private ChannelMonitor test_mon_roundtrip(OutPoint expected_id, byte[] data) {
            // Because get_funding_txo() returns an OutPoint in a tuple that is a reference to an OutPoint inside the
            // ChannelMonitor, its a good test to ensure that the OutPoint isn't freed (or is cloned) before the
            // ChannelMonitor is. This used to be broken.
            Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ roundtrip_monitor = UtilMethods.C2Tuple_BlockHashChannelMonitorZ_read(data, keys_interface);
            assert roundtrip_monitor instanceof Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK;
            TwoTuple_OutPointScriptZ funding_txo = ((Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK) roundtrip_monitor).res.get_b().get_funding_txo();
            System.gc(); System.runFinalization(); // Give the GC a chance to run.
            assert Arrays.equals(funding_txo.get_a().get_txid(), expected_id.get_txid());
            assert funding_txo.get_a().get_index() == expected_id.get_index();
            Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ roundtrip_two = UtilMethods.C2Tuple_BlockHashChannelMonitorZ_read(data, keys_interface);
            assert roundtrip_two instanceof Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK;
            return ((Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK) roundtrip_two).res.get_b();
        }

        private Peer(Object _dummy, byte seed) {
            logger = Logger.new_impl((org.ldk.structs.Record arg)->{
                if (arg.get_level() == Level.LDKLevel_Error)
                    System.err.println(seed + ": " + arg.get_module_path() + " - " + arg.get_args());
                else
                    System.out.println(seed + ": " + arg.get_module_path() + " - " + arg.get_args());
            });
            fee_estimator = FeeEstimator.new_impl((confirmation_target -> 253));
            tx_broadcaster = BroadcasterInterface.new_impl(tx -> {
                synchronized (broadcast_set) {
                    broadcast_set.add(tx);
                    broadcast_set.notifyAll();
                }
            });
            monitors = new HashMap<>();
            this.seed = seed;
            Persist persister = Persist.new_impl(new Persist.PersistInterface() {
                @Override
                public Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint id, ChannelMonitor data, MonitorUpdateId update_id) {
                    synchronized (monitors) {
                        String key = Arrays.toString(id.to_channel_id());
                        ChannelMonitor res = test_mon_roundtrip(id, data.write());
                        assert monitors.put(key, res) == null;
                    }
                    return Result_NoneChannelMonitorUpdateErrZ.ok();
                }

                @Override
                public Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint id, ChannelMonitorUpdate update, ChannelMonitor data, MonitorUpdateId update_id) {
                    synchronized (monitors) {
                        String key = Arrays.toString(id.to_channel_id());
                        ChannelMonitor res = test_mon_roundtrip(id, data.write());
                        // Note that we use a serialization-roundtrip copy of data here, not the original, as this can
                        // expose the JVM JIT bug where it finalize()s things still being called.
                        assert monitors.put(key, res) != null;
                    }
                    return Result_NoneChannelMonitorUpdateErrZ.ok();
                }
            });

            filter_additions = new HashSet<>();
            if (use_filter) {
                this.filter = Option_FilterZ.some(Filter.new_impl(new Filter.FilterInterface() {
                    @Override public void register_tx(byte[] txid, byte[] script_pubkey) {
                        filter_additions.add(Arrays.toString(txid));
                    }
                    @Override public Option_C2Tuple_usizeTransactionZZ register_output(WatchedOutput output) {
                        filter_additions.add(Arrays.toString(output.get_outpoint().get_txid()) + ":" + output.get_outpoint().get_index());
                        return Option_C2Tuple_usizeTransactionZZ.none();
                    }
                }));
            } else {
                this.filter = Option_FilterZ.none();
            }

            if (use_manual_watch) {
                chain_watch = get_manual_watch();
                chain_monitor = null;
            } else {
                chain_monitor = ChainMonitor.of(filter, tx_broadcaster, logger, fee_estimator, persister);
                chain_watch = chain_monitor.as_Watch();
            }

            byte[] key_seed = new byte[32];
            for (byte i = 0; i < 32; i++) {
                key_seed[i] = (byte) (i ^ seed);
            }
            KeysManager keys = KeysManager.of(key_seed, System.currentTimeMillis() / 1000, (int) (System.currentTimeMillis() * 1000));
            if (use_km_wrapper) {
                this.keys_interface = manual_keysif(keys.as_KeysInterface());
                this.explicit_keys_manager = null;
            } else {
                this.keys_interface = keys.as_KeysInterface();
                this.explicit_keys_manager = keys;
            }
            this.router = NetworkGraph.of(new byte[32]);
            this.route_handler = NetGraphMsgHandler.of(this.router, Option_AccessZ.some(Access.new_impl(new Access.AccessInterface() {
                @Override
                public Result_TxOutAccessErrorZ get_utxo(byte[] genesis_hash, long short_channel_id) {
                    // We don't exchange any gossip, so should never actually get called, but providing a Some(Access)
                    // is a good test of our Option<Trait> free'ing, which used to be broken and relies on a dirty hack.
                    assert false;
                    return Result_TxOutAccessErrorZ.err(AccessError.LDKAccessError_UnknownTx);
                }
            })), logger);

            this.custom_message_handler = CustomMessageHandler.new_impl(new CustomMessageHandler.CustomMessageHandlerInterface() {
                @Override
                public Result_NoneLightningErrorZ handle_custom_message(Type msg, byte[] sender_node_id) {
                    synchronized (received_custom_messages) {
                        received_custom_messages.add(msg.write());
                        received_custom_messages.notifyAll();
                    }
                    return Result_NoneLightningErrorZ.ok();
                }

                @Override
                public TwoTuple_PublicKeyTypeZ[] get_and_clear_pending_msg() {
                    byte[][] bytes;
                    synchronized (custom_messages_to_send) {
                        bytes = custom_messages_to_send.toArray(new byte[0][0]);
                        custom_messages_to_send.clear();
                    }
                    TwoTuple_PublicKeyTypeZ[] ret = new TwoTuple_PublicKeyTypeZ[bytes.length];
                    for (int i = 0; i < bytes.length; i++) {
                        final int msg_idx = i;
                        ret[i] = TwoTuple_PublicKeyTypeZ.of(connected_peer_node_id, Type.new_impl(new Type.TypeInterface() {
                            @Override public short type_id() { return 4096; }
                            @Override public String debug_str() { return "Custom Java Message"; }
                            @Override public byte[] write() { return bytes[msg_idx]; }
                        }));
                    }
                    return ret;
                }
            }, (message_type, buffer) -> {
                assert message_type == 4096;
                return Result_COption_TypeZDecodeErrorZ.ok(Option_TypeZ.some(Type.new_impl(new Type.TypeInterface() {
                    @Override public short type_id() { return 4096; }
                    @Override public String debug_str() { return "Custom Java-Decoded Message"; }
                    @Override public byte[] write() { return buffer; }
                })));
            });
        }
        private void bind_nio() {
            if (!use_nio_peer_handler) return;
            if (use_chan_manager_constructor) {
                this.nio_peer_handler = this.constructor.nio_peer_handler;
            } else {
                try { this.nio_peer_handler = new NioPeerHandler(peer_manager); } catch (IOException e) { assert false; }
            }
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
            if (use_chan_manager_constructor) {
                if (use_ignore_handler) {
                    this.constructor = new ChannelManagerConstructor(Network.LDKNetwork_Bitcoin, UserConfig.with_default(), new byte[32], 0,
							this.keys_interface, this.fee_estimator, this.chain_monitor, null, this.tx_broadcaster, this.logger);
                } else {
                    this.constructor = new ChannelManagerConstructor(Network.LDKNetwork_Bitcoin, UserConfig.with_default(), new byte[32], 0,
							this.keys_interface, this.fee_estimator, this.chain_monitor, this.router, this.tx_broadcaster, this.logger);
                }
                MultiThreadedLockableScore scorer = null;
                if (use_invoice_payer) { scorer = MultiThreadedLockableScore.of(Scorer.with_default().as_Score()); }
                constructor.chain_sync_completed(new ChannelManagerConstructor.EventHandler() {
                    @Override public void handle_event(Event event) {
                        synchronized (pending_manager_events) {
                            pending_manager_events.add(event);
                            pending_manager_events.notifyAll();
                        }
                    }
                    @Override public void persist_manager(byte[] channel_manager_bytes) { assert channel_manager_bytes.length > 1; }
                }, scorer);
                this.chan_manager = constructor.channel_manager;
                this.peer_manager = constructor.peer_manager;
                this.payer = constructor.payer;
                must_free_objs.add(new WeakReference<>(this.chan_manager));
            } else {
                ChainParameters params = ChainParameters.of(Network.LDKNetwork_Bitcoin, BestBlock.of(new byte[32], 0));
                this.chan_manager = ChannelManager.of(this.fee_estimator, chain_watch, tx_broadcaster, logger, this.keys_interface, UserConfig.with_default(), params);
                byte[] random_data = keys_interface.get_secure_random_bytes();
                Result_SecretKeyNoneZ node_secret = keys_interface.get_node_secret(Recipient.LDKRecipient_Node);
                assert node_secret.is_ok();
                this.peer_manager = PeerManager.of(chan_manager.as_ChannelMessageHandler(), route_handler.as_RoutingMessageHandler(),
                        ((Result_SecretKeyNoneZ.Result_SecretKeyNoneZ_OK)node_secret).res, random_data, logger, this.custom_message_handler);
                if (use_invoice_payer) {
                    this.payer = InvoicePayer.of(this.chan_manager.as_Payer(), Router.new_impl(new Router.RouterInterface() {
                        @Override
                        public Result_RouteLightningErrorZ find_route(byte[] payer, RouteParameters params, byte[] payment_hash, ChannelDetails[] first_hops, Score scorer) {
                            return UtilMethods.find_route(payer, params, router, first_hops, logger, scorer);
                        }
                    }), MultiThreadedLockableScore.of(Score.new_impl(new Score.ScoreInterface() {
                        @Override public void payment_path_failed(RouteHop[] path, long scid) {}
                        @Override public long channel_penalty_msat(long short_channel_id, long send_amt_msat, long channel_capacity_msat, NodeId source, NodeId target) { return 0; }
                        @Override public void payment_path_successful(RouteHop[] path) {}
                        @Override public byte[] write() { assert false; return null; }
                    })), logger, EventHandler.new_impl(new EventHandler.EventHandlerInterface() {
                        @Override public void handle_event(Event event) {
                            synchronized (pending_manager_events) {
                                pending_manager_events.add(event);
                                pending_manager_events.notifyAll();
                            }
                        }
                    }), RetryAttempts.of(0));
                }
            }

            this.node_id = chan_manager.get_our_node_id();
            this.filter = null;
            bind_nio();
            System.gc();
        }

        Object ptr_to;
        Peer(Peer orig) {
            this(null, orig.seed);
            if (use_chan_manager_constructor) {
                byte[][] monitors = {orig.monitors.values().stream().iterator().next().write()};
                byte[] serialized = orig.chan_manager.write();
                try {
                    Filter filter_nullable = null;
                    if (this.filter instanceof Option_FilterZ.Some) {
                        filter_nullable = ((Option_FilterZ.Some) this.filter).some;
                    }
                    if (use_ignore_handler) {
                        this.constructor = new ChannelManagerConstructor(serialized, monitors, UserConfig.with_default(),
                                this.keys_interface, this.fee_estimator, this.chain_monitor, filter_nullable,
                                null, this.tx_broadcaster, this.logger);
                    } else {
                        this.constructor = new ChannelManagerConstructor(serialized, monitors, UserConfig.with_default(),
                                this.keys_interface, this.fee_estimator, this.chain_monitor, filter_nullable,
                                this.router, this.tx_broadcaster, this.logger);
                        try {
                            // Test that ChannelManagerConstructor correctly rejects duplicate ChannelMonitors
                            byte[][] monitors_dupd = new byte[2][];
                            monitors_dupd[0] = monitors[0];
                            monitors_dupd[1] = monitors[0];
                            ChannelManagerConstructor constr = this.constructor = new ChannelManagerConstructor(serialized, monitors_dupd, UserConfig.with_default(),
                                    this.keys_interface, this.fee_estimator, this.chain_monitor, filter_nullable,
                                    null, this.tx_broadcaster, this.logger);
                            assert false;
                        } catch (ChannelManagerConstructor.InvalidSerializedDataException e) {}
                    }
                    MultiThreadedLockableScore scorer = null;
                    if (use_invoice_payer) { scorer = MultiThreadedLockableScore.of(Scorer.with_default().as_Score()); }
                    constructor.chain_sync_completed(new ChannelManagerConstructor.EventHandler() {
                        @Override public void handle_event(Event event) {
                            synchronized (pending_manager_events) {
                                pending_manager_events.add(event);
                                pending_manager_events.notifyAll();
                            }
                        }
                        @Override public void persist_manager(byte[] channel_manager_bytes) { assert channel_manager_bytes.length > 1; }
                    }, scorer);
                    this.chan_manager = constructor.channel_manager;
                    this.payer = constructor.payer;
                    this.peer_manager = constructor.peer_manager;
                    must_free_objs.add(new WeakReference<>(this.chan_manager));
                    // If we are using a ChannelManagerConstructor, we may have pending events waiting on the old peer
                    // which have been removed from the ChannelManager but which we still need to handle.
                    this.pending_manager_events.addAll(orig.pending_manager_events);
                    if (!this.pending_manager_events.isEmpty()) {
                        // However, this implies cross_reload_ref_pollution
                        cross_reload_ref_pollution = true;
                    }
                } catch (ChannelManagerConstructor.InvalidSerializedDataException e) {
                    assert false;
                }
            } else {
                ChannelMonitor[] monitors = new ChannelMonitor[1];
                assert orig.monitors.size() == 1;
                if (!break_cross_peer_refs) {
                    monitors[0] = orig.monitors.values().stream().iterator().next();
                } else {
                    byte[] serialized = orig.monitors.values().stream().iterator().next().write();
                    Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ res =
                            UtilMethods.C2Tuple_BlockHashChannelMonitorZ_read(serialized, this.keys_interface);
                    assert res instanceof Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK;
                    monitors[0] = ((Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK) res).res.get_b();
                }
                byte[] serialized = orig.chan_manager.write();
                Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ read_res =
                        UtilMethods.C2Tuple_BlockHashChannelManagerZ_read(serialized, this.keys_interface, this.fee_estimator, this.chain_watch, this.tx_broadcaster, this.logger, UserConfig.with_default(), monitors);
                assert read_res instanceof Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK;
                this.chan_manager = ((Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK) read_res).res.get_b();
                this.chain_watch.watch_channel(monitors[0].get_funding_txo().get_a(), monitors[0]);
                byte[] random_data = keys_interface.get_secure_random_bytes();
                Result_SecretKeyNoneZ node_secret = keys_interface.get_node_secret(Recipient.LDKRecipient_Node);
                assert node_secret.is_ok();
                this.peer_manager = PeerManager.of(chan_manager.as_ChannelMessageHandler(), route_handler.as_RoutingMessageHandler(),
                        ((Result_SecretKeyNoneZ.Result_SecretKeyNoneZ_OK)node_secret).res,
                        random_data, logger, this.custom_message_handler);
                if (!break_cross_peer_refs && (use_manual_watch || use_km_wrapper)) {
                    // When we pass monitors[0] into chain_watch.watch_channel we create a reference from the new Peer to a
                    // field in the old peer, preventing freeing of the original Peer until the new Peer is freed. Thus, we
                    // shouldn't bother waiting for the original to be freed later on.
                    cross_reload_ref_pollution = true;
                }
                if (use_invoice_payer) {
                    this.payer = InvoicePayer.of(this.chan_manager.as_Payer(), Router.new_impl(new Router.RouterInterface() {
                        @Override
                        public Result_RouteLightningErrorZ find_route(byte[] payer, RouteParameters params, byte[] _payment_hash, ChannelDetails[] first_hops, Score scorer) {
                            return UtilMethods.find_route(payer, params, router, first_hops, logger, scorer);
                        }
                    }), MultiThreadedLockableScore.of(Score.new_impl(new Score.ScoreInterface() {
                        @Override public long channel_penalty_msat(long short_channel_id, long send_amt_msat, long channel_capacity_msat, NodeId source, NodeId target) { return 0; }
                        @Override public void payment_path_failed(RouteHop[] path, long scid) {}
                        @Override public void payment_path_successful(RouteHop[] path) {}
                        @Override public byte[] write() { assert false; return null; }
                    })), logger, EventHandler.new_impl(new EventHandler.EventHandlerInterface() {
                        @Override public void handle_event(Event event) {
                            synchronized (pending_manager_events) {
                                pending_manager_events.add(event);
                                pending_manager_events.notifyAll();
                            }
                        }
                    }), RetryAttempts.of(0));
                }
            }
            this.node_id = chan_manager.get_our_node_id();
            bind_nio();

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
            this.filter = null;
        }

        TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] connect_block(Block b, int height, long expected_monitor_update_len) {
            byte[] header = Arrays.copyOfRange(b.bitcoinSerialize(), 0, 80);
            TwoTuple_usizeTransactionZ[] txn;
            if (b.hasTransactions()) {
                assert b.getTransactions().size() == 1;
                TwoTuple_usizeTransactionZ txp = TwoTuple_usizeTransactionZ.of((long) 0, b.getTransactions().get(0).bitcoinSerialize());
                txn = new TwoTuple_usizeTransactionZ[]{txp};
            } else
                txn = new TwoTuple_usizeTransactionZ[0];
            if (chain_monitor != null) {
                chan_manager.as_Listen().block_connected(b.bitcoinSerialize(), height);
                chain_monitor.as_Listen().block_connected(b.bitcoinSerialize(), height);
            } else {
                chan_manager.as_Confirm().transactions_confirmed(header, txn, height);
                chan_manager.as_Confirm().best_block_updated(header, height);
                // Connect manually if we aren't using a ChainMonitor and are implementing Watch ourselves
                synchronized (monitors) {
                    assert monitors.size() == 1;
                    for (ChannelMonitor mon : monitors.values()) {
                        TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] ret = mon.block_connected(header, txn, height, tx_broadcaster, fee_estimator, logger);
                        assert ret.length == expected_monitor_update_len;
                        return ret;
                    }
                }
            }
            return null;
        }

        Event[] get_monitor_events(int expected_len) {
            if (use_chan_manager_constructor) {
                while (true) {
                    synchronized (this.pending_manager_events) {
                        if (expected_len != 0 && this.pending_manager_events.size() == expected_len) {
                            break;
                        }
                    }
                    if (expected_len == 0) {
                        try { Thread.sleep(500); } catch (InterruptedException e) { assert false; }
                        break;
                    } else {
                        Thread.yield();
                    }
                }
                synchronized (this.pending_manager_events) {
                    Event[] res = this.pending_manager_events.toArray(new Event[0]);
                    this.pending_manager_events.clear();
                    assert res.length == expected_len;
                    return res;
                }
            } else if (chain_monitor != null) {
                ArrayList<Event> l = new ArrayList<Event>();
                chain_monitor.as_EventsProvider().process_pending_events(EventHandler.new_impl(l::add));
                assert l.size() == expected_len;
                return l.toArray(new Event[0]);
            } else {
                synchronized (monitors) {
                    assert monitors.size() == 1;
                    for (ChannelMonitor mon : monitors.values()) {
                        Event[] res = mon.get_and_clear_pending_events();
                        assert res.length == expected_len;
                        return res;
                    }
                    return null;
                }
            }
        }

        Event[] get_manager_events(int expected_len, Peer peer1, Peer peer2) {
            assert expected_len != 0;
            if (!use_nio_peer_handler) {
                maybe_exchange_peer_messages(peer1, peer2);
            }
            Event[] res = new Event[0];
            if (use_chan_manager_constructor) {
                while (res.length < expected_len) {
                    synchronized (this.pending_manager_events) {
                        if (this.pending_manager_events.size() >= expected_len) {
                            res = this.pending_manager_events.toArray(res);
                            assert res.length == expected_len;
                            this.pending_manager_events.clear();
                        }
                        if (res.length < expected_len) {
                            try { this.pending_manager_events.wait(); } catch (InterruptedException e) { assert false; }
                        }
                    }
                }
            } else {
                ArrayList<Event> l = new ArrayList<Event>();
                while (l.size() < expected_len) {
                    Thread.yield();
                    if (use_nio_peer_handler) {
                        peer1.nio_peer_handler.check_events();
                        peer2.nio_peer_handler.check_events();
                    }
                    chan_manager.as_EventsProvider().process_pending_events(EventHandler.new_impl(l::add));
                }
                return l.toArray(new Event[0]);
            }
            assert res.length == expected_len;
            return res;
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

    void maybe_exchange_peer_messages(Peer peer1, Peer peer2) {
        if (!use_nio_peer_handler) {
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
        } else if (!use_chan_manager_constructor) {
            peer1.nio_peer_handler.check_events();
            peer2.nio_peer_handler.check_events();
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
        peer2.connected_peer_node_id = peer1.node_id;
        peer1.connected_peer_node_id = peer2.node_id;
        if (use_nio_peer_handler) {
            try {
                peer1.nio_peer_handler.connect(peer2.chan_manager.get_our_node_id(), new InetSocketAddress("127.0.0.1", peer2.nio_port), 100);
            } catch (IOException e) { assert false; }
            while (peer1.peer_manager.get_peer_node_ids().length == 0 || peer2.peer_manager.get_peer_node_ids().length == 0) {
                Thread.yield();
            }
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

            maybe_exchange_peer_messages(peer1, peer2);
        }
    }

    TestState do_test_message_handler() throws InterruptedException {
        Peer peer1 = new Peer((byte) 1);
        Peer peer2 = new Peer((byte) 2);

        connect_peers(peer1, peer2);

        Result__u832APIErrorZ cc_res = peer1.chan_manager.create_channel(peer2.node_id, 100000, 1000, 42, null);
        assert cc_res instanceof Result__u832APIErrorZ.Result__u832APIErrorZ_OK;

        // Previously, this was a SEGFAULT instead of get_funding_txo() returning null.
        ChannelDetails pre_funding_chan = peer1.chan_manager.list_channels()[0];
        assert pre_funding_chan.get_funding_txo() == null;

        Event[] events = peer1.get_manager_events(1, peer1, peer2);
        assert events[0] instanceof Event.FundingGenerationReady;
        assert ((Event.FundingGenerationReady) events[0]).channel_value_satoshis == 100000;
        assert ((Event.FundingGenerationReady) events[0]).user_channel_id == 42;
        byte[] funding_spk = ((Event.FundingGenerationReady) events[0]).output_script;
        assert funding_spk.length == 34 && funding_spk[0] == 0 && funding_spk[1] == 32; // P2WSH
        byte[] chan_id = ((Event.FundingGenerationReady) events[0]).temporary_channel_id;

        NetworkParameters bitcoinj_net = NetworkParameters.fromID(NetworkParameters.ID_MAINNET);

        Transaction funding = new Transaction(bitcoinj_net);
        funding.addInput(new TransactionInput(bitcoinj_net, funding, new byte[0]));
        funding.getInputs().get(0).setWitness(new TransactionWitness(2)); // Make sure we don't complain about lack of witness
        funding.getInput(0).getWitness().setPush(0, new byte[]{0x1});
        funding.addOutput(Coin.SATOSHI.multiply(100000), new Script(funding_spk));
        Result_NoneAPIErrorZ funding_res = peer1.chan_manager.funding_transaction_generated(chan_id, funding.bitcoinSerialize());
        assert funding_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;

        maybe_exchange_peer_messages(peer1, peer2);
        synchronized (peer1.broadcast_set) {
            while (peer1.broadcast_set.size() != 1) {
                peer1.broadcast_set.wait();
            }
        }

        assert peer1.broadcast_set.size() == 1;
        assert Arrays.equals(peer1.broadcast_set.get(0), funding.bitcoinSerialize());
        peer1.broadcast_set.clear();

        Block b = new Block(bitcoinj_net, 2, Sha256Hash.ZERO_HASH, Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[]{funding}));
        peer1.connect_block(b, 1, 0);
        peer2.connect_block(b, 1, 0);

        for (int height = 2; height < 10; height++) {
            b = new Block(bitcoinj_net, 2, b.getHash(), Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[0]));
            peer1.connect_block(b, height, 0);
            peer2.connect_block(b, height, 0);
        }

        maybe_exchange_peer_messages(peer1, peer2);
        while (peer1.chan_manager.list_usable_channels().length != 1 || peer2.chan_manager.list_usable_channels().length != 1)

        peer1.chan_manager.list_channels();
        ChannelDetails[] peer1_chans = peer1.chan_manager.list_usable_channels();
        ChannelDetails[] peer2_chans = peer2.chan_manager.list_usable_channels();
        assert peer1_chans.length == 1;
        assert peer2_chans.length == 1;
        assert peer1_chans[0].get_channel_value_satoshis() == 100000;
        assert peer1_chans[0].get_is_usable();
        Option_u64Z short_chan_id = peer1_chans[0].get_short_channel_id();
        assert short_chan_id instanceof Option_u64Z.Some;
        assert ((Option_u64Z.Some)short_chan_id).some == (1L << 40); // 0th output in the 0th transaction in the 1st block
        assert Arrays.equals(peer1_chans[0].get_channel_id(), funding.getTxId().getReversedBytes());
        assert Arrays.equals(peer2_chans[0].get_channel_id(), funding.getTxId().getReversedBytes());

        Result_InvoiceSignOrCreationErrorZ invoice = UtilMethods.create_invoice_from_channelmanager(peer2.chan_manager, peer2.keys_interface, Currency.LDKCurrency_Bitcoin, Option_u64Z.some(10000000), "Invoice Description");
        assert invoice instanceof Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK;
        System.out.println("Got invoice: " + ((Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK) invoice).res.to_str());

        Result_InvoiceNoneZ parsed_invoice = Invoice.from_str(((Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK) invoice).res.to_str());
        assert parsed_invoice instanceof Result_InvoiceNoneZ.Result_InvoiceNoneZ_OK;
        assert Arrays.equals(((Result_InvoiceNoneZ.Result_InvoiceNoneZ_OK) parsed_invoice).res.payment_hash(), ((Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK) invoice).res.payment_hash());
        SignedRawInvoice signed_raw = ((Result_InvoiceNoneZ.Result_InvoiceNoneZ_OK) parsed_invoice).res.into_signed_raw();
        RawInvoice raw_invoice = signed_raw.raw_invoice();
        byte[] desc_hash = raw_invoice.hash();
        Description raw_invoice_description = raw_invoice.description();
        String description_string = raw_invoice_description.into_inner();
        assert description_string.equals("Invoice Description");

        if (!use_invoice_payer) {
            byte[] payment_hash = ((Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK) invoice).res.payment_hash();
            byte[] payment_secret = ((Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK) invoice).res.payment_secret();
            byte[] dest_node_id = ((Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK) invoice).res.recover_payee_pub_key();
            assert Arrays.equals(dest_node_id, peer2.node_id);
            InvoiceFeatures invoice_features = ((Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK) invoice).res.features();
            RouteHint[] route_hints = ((Result_InvoiceSignOrCreationErrorZ.Result_InvoiceSignOrCreationErrorZ_OK) invoice).res.route_hints();

            PaymentParameters payee = PaymentParameters.of(peer2.node_id, invoice_features, route_hints, Option_u64Z.none(), 6*24*14);
            RouteParameters route_params = RouteParameters.of(payee, 10000000, 42);
            Result_RouteLightningErrorZ route_res = UtilMethods.find_route(
                    peer1.chan_manager.get_our_node_id(), route_params, peer1.router,
                    peer1_chans, peer1.logger, Scorer.with_default().as_Score());
            assert route_res instanceof Result_RouteLightningErrorZ.Result_RouteLightningErrorZ_OK;
            Route route = ((Result_RouteLightningErrorZ.Result_RouteLightningErrorZ_OK) route_res).res;
            assert route.get_paths().length == 1;
            assert route.get_paths()[0].length == 1;
            assert route.get_paths()[0][0].get_fee_msat() == 10000000;

            Result_PaymentIdPaymentSendFailureZ payment_res = peer1.chan_manager.send_payment(route, payment_hash, payment_secret);
            assert payment_res instanceof Result_PaymentIdPaymentSendFailureZ.Result_PaymentIdPaymentSendFailureZ_OK;

            RouteHop[][] hops = new RouteHop[1][1];
            byte[] hop_pubkey = new byte[33];
            hop_pubkey[0] = 3;
            hop_pubkey[1] = 42;
            hops[0][0] = RouteHop.of(hop_pubkey, NodeFeatures.known(), 42, ChannelFeatures.known(), 100, 0);
            Route r2 = Route.of(hops, payee);
            payment_res = peer1.chan_manager.send_payment(r2, payment_hash, payment_secret);
            assert payment_res instanceof Result_PaymentIdPaymentSendFailureZ.Result_PaymentIdPaymentSendFailureZ_Err;
        } else {
            Result_PaymentIdPaymentErrorZ send_res = peer1.payer.pay_invoice(((Result_InvoiceNoneZ.Result_InvoiceNoneZ_OK) parsed_invoice).res);
            assert send_res instanceof Result_PaymentIdPaymentErrorZ.Result_PaymentIdPaymentErrorZ_OK;
        }

        if (reload_peers) {
            if (use_chan_manager_constructor) {
                peer1.constructor.interrupt();
                peer2.constructor.interrupt();
            } else if (use_nio_peer_handler) {
                peer1.nio_peer_handler.interrupt();
                peer2.nio_peer_handler.interrupt();
            }
            WeakReference<Peer> op1 = new WeakReference<Peer>(peer1);
            peer1 = new Peer(peer1);
            peer2 = new Peer(peer2);
            return new TestState(op1, peer1, peer2, b.getHash());
        }
        return new TestState(null, peer1, peer2, b.getHash());
    }

    boolean cross_reload_ref_pollution = false;
    class TestState {
        private final WeakReference<Peer> ref_block;
        private final Peer peer1;
        private final Peer peer2;
        public Sha256Hash best_blockhash;

        public TestState(WeakReference<Peer> ref_block, Peer peer1, Peer peer2, Sha256Hash best_blockhash) {
            this.ref_block = ref_block;
            this.peer1 = peer1;
            this.peer2 = peer2;
            this.best_blockhash = best_blockhash;
        }
    }
    void do_test_message_handler_b(TestState state) throws InterruptedException {
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

        Event[] events = state.peer2.get_manager_events(1, state.peer1, state.peer2);
        assert events[0] instanceof Event.PendingHTLCsForwardable;
        state.peer2.chan_manager.process_pending_htlc_forwards();

        events = state.peer2.get_manager_events(1, state.peer1, state.peer2);
        assert events[0] instanceof Event.PaymentReceived;
        assert ((Event.PaymentReceived)events[0]).purpose instanceof PaymentPurpose.InvoicePayment;
        byte[] payment_preimage = ((PaymentPurpose.InvoicePayment)((Event.PaymentReceived)events[0]).purpose).payment_preimage;
        assert !Arrays.equals(payment_preimage, new byte[32]);
        state.peer2.chan_manager.claim_funds(payment_preimage);

        events = state.peer1.get_manager_events(2, state.peer1, state.peer2);
        assert events[0] instanceof Event.PaymentSent;
        assert Arrays.equals(((Event.PaymentSent) events[0]).payment_preimage, payment_preimage);
        assert events[1] instanceof Event.PaymentPathSuccessful;
        assert Arrays.equals(((Event.PaymentPathSuccessful) events[1]).payment_hash, ((Event.PaymentSent) events[0]).payment_hash);

        if (use_nio_peer_handler) {
            // We receive PaymentSent immediately upon receipt of the payment preimage, but we expect to not have an
            // HTLC transaction to broadcast below, which requires a bit more time to fully complete the
            // commitment-transaction-update dance between both peers.
            Thread.sleep(100);
        }

        if (state.peer1.chain_monitor != null) {
            Balance[] peer1_balances = state.peer1.chain_monitor.get_claimable_balances(state.peer1.chan_manager.list_channels());
            assert peer1_balances.length == 0;
            Balance[] peer2_balances = state.peer2.chain_monitor.get_claimable_balances(state.peer2.chan_manager.list_channels());
            assert peer2_balances.length == 0;
        }

        ChannelDetails[] peer1_chans = state.peer1.chan_manager.list_channels();

        if (nice_close) {
            Result_NoneAPIErrorZ close_res = state.peer1.chan_manager.close_channel(peer1_chans[0].get_channel_id());
            assert close_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;
            maybe_exchange_peer_messages(state.peer1, state.peer2);
            synchronized (state.peer1.broadcast_set) {
                while (state.peer1.broadcast_set.size() != 1) state.peer1.broadcast_set.wait();
            }
            synchronized (state.peer2.broadcast_set) {
                while (state.peer2.broadcast_set.size() != 1) state.peer2.broadcast_set.wait();
            }

            assert state.peer1.broadcast_set.size() == 1;
            assert state.peer2.broadcast_set.size() == 1;
        } else {
            state.peer1.chan_manager.force_close_all_channels();
            maybe_exchange_peer_messages(state.peer1, state.peer2);
            synchronized (state.peer1.broadcast_set) {
                while (state.peer1.broadcast_set.size() != 1) state.peer1.broadcast_set.wait();
            }
            synchronized (state.peer2.broadcast_set) {
                while (state.peer2.broadcast_set.size() != 1) state.peer2.broadcast_set.wait();
            }

            assert state.peer1.broadcast_set.size() == 1;
            assert state.peer2.broadcast_set.size() == 1;
        }

        events = state.peer2.get_manager_events(1, state.peer1, state.peer2);
        assert events[0] instanceof Event.ChannelClosed;
        events = state.peer1.get_manager_events(1, state.peer1, state.peer2);
        assert events[0] instanceof Event.ChannelClosed;

        if (state.peer1.chain_monitor != null) {
            Balance[] peer1_balances = state.peer1.chain_monitor.get_claimable_balances(state.peer1.chan_manager.list_channels());
            assert peer1_balances.length == 1;
            for (Balance bal : peer1_balances) {
                assert bal instanceof Balance.ClaimableOnChannelClose;
                long expected_tx_fee = 183;
                assert ((Balance.ClaimableOnChannelClose) bal).claimable_amount_satoshis == 100000 - 1 - 10000 - expected_tx_fee;
            }
            Balance[] peer2_balances = state.peer2.chain_monitor.get_claimable_balances(state.peer2.chan_manager.list_channels());
            assert peer2_balances.length == 1;
            for (Balance bal : peer2_balances) {
                assert bal instanceof Balance.ClaimableOnChannelClose;
                assert ((Balance.ClaimableOnChannelClose) bal).claimable_amount_satoshis == 10000 + 1;
            }
        }

        if (!nice_close) {
            NetworkParameters bitcoinj_net = NetworkParameters.fromID(NetworkParameters.ID_MAINNET);
            Transaction tx = new Transaction(bitcoinj_net, state.peer1.broadcast_set.getFirst());
            Block b = new Block(bitcoinj_net, 2, state.best_blockhash, Sha256Hash.ZERO_HASH, 42, 0, 0,
                    Arrays.asList(new Transaction[]{tx}));
            TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] watch_outputs = state.peer2.connect_block(b, 10, 1);
            if (watch_outputs != null) { // We only process watch_outputs manually when we use a manually-build Watch impl
                assert watch_outputs.length == 1;
                assert Arrays.equals(watch_outputs[0].get_a(), tx.getTxId().getReversedBytes());
                assert watch_outputs[0].get_b().length == 2;
                assert watch_outputs[0].get_b()[0].get_a() == 0;
                assert watch_outputs[0].get_b()[1].get_a() == 1;
            }

            for (int i = 11; i < 21; i++) {
                b = new Block(bitcoinj_net, 2, b.getHash(), Sha256Hash.ZERO_HASH, 42, 0, 0, new ArrayList<>());
                state.peer2.connect_block(b, i, 0);
            }

            Event[] broadcastable_event = state.peer2.get_monitor_events(1);
            for (ChannelMonitor mon : state.peer2.monitors.values()) {
                // This used to be buggy and double-free, so go ahead and fetch them!
                byte[][] txn = mon.get_latest_holder_commitment_txn(state.peer2.logger);
            }
            assert broadcastable_event.length == 1;
            assert broadcastable_event[0] instanceof Event.SpendableOutputs;
            if (state.peer2.explicit_keys_manager != null) {
                TxOut[] additional_outputs = new TxOut[]{new TxOut(420, new byte[]{0x42})};
                Result_TransactionNoneZ tx_res = state.peer2.explicit_keys_manager.spend_spendable_outputs(((Event.SpendableOutputs) broadcastable_event[0]).outputs, additional_outputs, new byte[]{0x00}, 253);
                assert tx_res instanceof Result_TransactionNoneZ.Result_TransactionNoneZ_OK;
                Transaction built_tx = new Transaction(bitcoinj_net, ((Result_TransactionNoneZ.Result_TransactionNoneZ_OK) tx_res).res);
                assert built_tx.getOutputs().size() == 2;
                assert Arrays.equals(built_tx.getOutput(1).getScriptBytes(), new byte[]{0x00});
                assert Arrays.equals(built_tx.getOutput(0).getScriptBytes(), new byte[]{0x42});
                assert built_tx.getOutput(0).getValue().value == 420;
            }
        }

        // Test exchanging a custom message (note that ChannelManagerConstructor) always loads an IgnorimgMessageHandler
        // so we cannot exchange custom messages with it
        if (!use_chan_manager_constructor) {
            byte[] custom_message_bytes = new byte[]{0x42, 0x44, 0x43, 0x00};
            state.peer1.custom_messages_to_send.add(custom_message_bytes);
            state.peer1.peer_manager.process_events();
            synchronized (state.peer2.received_custom_messages) {
                while (true) {
                    if (state.peer2.received_custom_messages.isEmpty()) {
                        state.peer2.received_custom_messages.wait();
                        continue;
                    }
                    assert state.peer2.received_custom_messages.size() == 1;
                    assert Arrays.equals(state.peer2.received_custom_messages.get(0), custom_message_bytes);
                    break;
                }
            }
        }

        if (use_nio_peer_handler) {
            state.peer1.peer_manager.disconnect_by_node_id(state.peer2.chan_manager.get_our_node_id(), false);
            while (state.peer1.peer_manager.get_peer_node_ids().length != 0) Thread.yield();
            while (state.peer2.peer_manager.get_peer_node_ids().length != 0) Thread.yield();
            state.peer1.nio_peer_handler.interrupt();
            state.peer2.nio_peer_handler.interrupt();
        }

        state.peer1.get_monitor_events(0);
        state.peer2.get_monitor_events(0);

        if (use_chan_manager_constructor) {
            state.peer1.constructor.interrupt();
            state.peer2.constructor.interrupt();
        }

        t.interrupt();

        state.peer1.router.write();

        // Construct the only Option_Enum::Variant(OpaqueStruct) we have in the codebase as this used to cause double-frees:
        byte[] serd = new byte[] {(byte)0xd9,(byte)0x77,(byte)0xcb,(byte)0x9b,(byte)0x53,(byte)0xd9,(byte)0x3a,(byte)0x6f,(byte)0xf6,(byte)0x4b,(byte)0xb5,(byte)0xf1,(byte)0xe1,(byte)0x58,(byte)0xb4,(byte)0x09,(byte)0x4b,(byte)0x66,(byte)0xe7,(byte)0x98,(byte)0xfb,(byte)0x12,(byte)0x91,(byte)0x11,(byte)0x68,(byte)0xa3,(byte)0xcc,(byte)0xdf,(byte)0x80,(byte)0xa8,(byte)0x30,(byte)0x96,(byte)0x34,(byte)0x0a,(byte)0x6a,(byte)0x95,(byte)0xda,(byte)0x0a,(byte)0xe8,(byte)0xd9,(byte)0xf7,(byte)0x76,(byte)0x52,(byte)0x8e,(byte)0xec,(byte)0xdb,(byte)0xb7,(byte)0x47,(byte)0xeb,(byte)0x6b,(byte)0x54,(byte)0x54,(byte)0x95,(byte)0xa4,(byte)0x31,(byte)0x9e,(byte)0xd5,(byte)0x37,(byte)0x8e,(byte)0x35,(byte)0xb2,(byte)0x1e,(byte)0x07,(byte)0x3a,(byte)0x00,(byte)0x00,(byte)0x00,(byte)0x00,(byte)0x00,(byte)0x19,(byte)0xd6,(byte)0x68,(byte)0x9c,(byte)0x08,(byte)0x5a,(byte)0xe1,(byte)0x65,(byte)0x83,(byte)0x1e,(byte)0x93,(byte)0x4f,(byte)0xf7,(byte)0x63,(byte)0xae,(byte)0x46,(byte)0xa2,(byte)0xa6,(byte)0xc1,(byte)0x72,(byte)0xb3,(byte)0xf1,(byte)0xb6,(byte)0x0a,(byte)0x8c,(byte)0xe2,(byte)0x6f,(byte)0x00,(byte)0x08,(byte)0x3a,(byte)0x84,(byte)0x00,(byte)0x00,(byte)0x03,(byte)0x4d,(byte)0x01,(byte)0x34,(byte)0x13,(byte)0xa7,(byte)0x00,(byte)0x00,(byte)0x00,(byte)0x90,(byte)0x00,(byte)0x00,(byte)0x00,(byte)0x00,(byte)0x00,(byte)0x0f,(byte)0x42,(byte)0x40,(byte)0x00,(byte)0x00,(byte)0x27,(byte)0x10,(byte)0x00,(byte)0x00,(byte)0x00,(byte)0x14,};
        Result_ChannelUpdateDecodeErrorZ upd_msg = ChannelUpdate.read(serd);
        assert upd_msg instanceof Result_ChannelUpdateDecodeErrorZ.Result_ChannelUpdateDecodeErrorZ_OK;
        Option_NetworkUpdateZ upd = Option_NetworkUpdateZ.some(NetworkUpdate.channel_update_message(((Result_ChannelUpdateDecodeErrorZ.Result_ChannelUpdateDecodeErrorZ_OK) upd_msg).res));
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
    HumanObjectPeerTestInstance do_test_run(boolean nice_close, boolean use_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean nio_peer_handler, boolean use_ignoring_routing_handler, boolean use_chan_manager_constructor, boolean use_invoice_payer) throws InterruptedException {
        HumanObjectPeerTestInstance instance = new HumanObjectPeerTestInstance(nice_close, use_km_wrapper, use_manual_watch, reload_peers, break_cross_peer_refs, nio_peer_handler, !nio_peer_handler, use_ignoring_routing_handler, use_chan_manager_constructor, use_invoice_payer);
        HumanObjectPeerTestInstance.TestState state = instance.do_test_message_handler();
        instance.do_test_message_handler_b(state);
        return instance;
    }
    void do_test(boolean nice_close, boolean use_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean nio_peer_handler, boolean use_ignoring_routing_handler, boolean use_chan_manager_constructor, boolean use_invoice_payer) throws InterruptedException {
        HumanObjectPeerTestInstance instance = do_test_run(nice_close, use_km_wrapper, use_manual_watch, reload_peers, break_cross_peer_refs, nio_peer_handler, use_ignoring_routing_handler, use_chan_manager_constructor, use_invoice_payer);
        while (instance.gc_count != instance.gc_exp_count) {
            System.gc();
            System.runFinalization();
        }
        for (WeakReference<Object> o : instance.must_free_objs)
            assert o.get() == null;
    }
    @Test
    public void test_message_handler() throws InterruptedException {
        Thread gc_thread = new Thread(() -> {
            while (true) {
                System.gc();
                System.runFinalization();
                try { Thread.sleep(0, 1); } catch (InterruptedException e) { break; }
            }
        }, "Test GC Thread");
        gc_thread.start();
        for (int i = 0; i < (1 << 9) - 1; i++) {
            boolean nice_close =                   (i & (1 << 0)) != 0;
            boolean use_km_wrapper =               (i & (1 << 1)) != 0;
            boolean use_manual_watch =             (i & (1 << 2)) != 0;
            boolean reload_peers =                 (i & (1 << 3)) != 0;
            boolean break_cross_refs =             (i & (1 << 4)) != 0;
            boolean use_ignoring_routing_handler = (i & (1 << 5)) != 0;
            boolean use_chan_manager_constructor = (i & (1 << 6)) != 0;
            boolean use_invoice_payer =            (i & (1 << 7)) != 0;
            boolean nio_peer_handler =             (i & (1 << 8)) != 0;
            if (break_cross_refs && !reload_peers) {
                // There are no cross refs to break without reloading peers.
                continue;
            }
            if (use_chan_manager_constructor && (use_manual_watch || !nio_peer_handler)) {
                // ChannelManagerConstructor requires a ChainMonitor as the Watch and creates a NioPeerHandler for us.
                continue;
            }
            if (!use_chan_manager_constructor && (use_ignoring_routing_handler)) {
                // We rely on the ChannelManagerConstructor to convert null into an IgnoringMessageHandler, so don't
                // try to run with an IgnoringMessageHandler unless we're also using a ChannelManagerConstructor.
                continue;
            }
            if (use_chan_manager_constructor && use_ignoring_routing_handler && use_invoice_payer) {
                // As documented on ChannelManagerConstructor, if we provide a `null` NetworkGraph (because we want to
                // use an IgnoringMessageHandler), no InvoicePayer will be constructored for us, thus we cannot use an
                // InvoicePayer to send payments in this case.
                continue;
            }
            System.err.println("Running test with flags " + i);
            do_test(nice_close, use_km_wrapper, use_manual_watch, reload_peers, break_cross_refs, nio_peer_handler, use_ignoring_routing_handler, use_chan_manager_constructor, use_invoice_payer);
        }
        gc_thread.interrupt();
        gc_thread.join();
    }

    // This is used in the test jar to test the built jar is runnable
    public static void main(String[] args) {
        try {
            new HumanObjectPeerTest().test_message_handler();
        } catch (Exception e) {
            System.err.println("Caught exception:");
            System.err.println(e);
            System.exit(1);
        }
    }
}
