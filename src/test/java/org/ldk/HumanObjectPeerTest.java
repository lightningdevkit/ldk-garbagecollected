package org.ldk;

import org.bitcoinj.base.Coin;
import org.bitcoinj.base.Sha256Hash;
import org.bitcoinj.core.*;
import org.bitcoinj.script.Script;
import org.junit.jupiter.api.Test;
import org.ldk.batteries.ChannelManagerConstructor;
import org.ldk.batteries.NioPeerHandler;
import org.ldk.enums.*;
import org.ldk.enums.Currency;
import org.ldk.structs.*;
import org.ldk.util.UInt128;
import org.ldk.util.UInt5;

import java.io.FileReader;
import java.io.IOException;
import java.lang.ref.WeakReference;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.time.Instant;
import java.util.*;
import java.util.function.IntConsumer;

class HumanObjectPeerTestInstance {
    private final boolean nice_close;
    private final boolean use_km_wrapper;
    private final boolean use_full_km_wrapper;
    private final boolean use_manual_watch;
    private final boolean reload_peers;
    private final boolean break_cross_peer_refs;
    private final boolean use_nio_peer_handler;
    private final boolean use_filter;
    private final boolean use_ignore_handler;
    private final boolean use_chan_manager_constructor;
    private final boolean use_invoice_payer;
    TxOut gossip_txout = null;
    final Instant TIME_42 = Instant.ofEpochSecond(42);

    HumanObjectPeerTestInstance(boolean nice_close, boolean use_km_wrapper, boolean use_full_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean use_nio_peer_handler, boolean use_filter, boolean use_ignore_handler, boolean use_chan_manager_constructor, boolean use_invoice_payer) {
        this.nice_close = nice_close;
        this.use_km_wrapper = use_km_wrapper;
        this.use_full_km_wrapper = use_full_km_wrapper;
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
        NodeSigner manual_node_signer(KeysManager underlying_km) {
            NodeSigner underlying_ns = underlying_km.as_NodeSigner();
            must_free_objs.add(new WeakReference<>(underlying_ns));
            return NodeSigner.new_impl(new NodeSigner.NodeSignerInterface() {
                @Override public ExpandedKey get_expanded_key() { return underlying_ns.get_expanded_key(); }
                @Override public PeerStorageKey get_peer_storage_key() { return underlying_ns.get_peer_storage_key(); }
                @Override public ReceiveAuthKey get_receive_auth_key() { return underlying_ns.get_receive_auth_key(); }
                @Override public Result_PublicKeyNoneZ get_node_id(Recipient recipient) { return underlying_ns.get_node_id(recipient); }
                @Override public Result_ThirtyTwoBytesNoneZ ecdh(Recipient recipient, byte[] other_key, Option_BigEndianScalarZ tweak) {
                    return underlying_ns.ecdh(recipient, other_key, tweak);
                }
                @Override public Result_RecoverableSignatureNoneZ sign_invoice(RawBolt11Invoice invoice, Recipient recipient) {
                    return underlying_ns.sign_invoice(invoice, recipient);
                }
                @Override public Result_SchnorrSignatureNoneZ sign_bolt12_invoice(UnsignedBolt12Invoice invoice) {
                    return underlying_ns.sign_bolt12_invoice(invoice);
                }
                @Override public Result_ECDSASignatureNoneZ sign_gossip_message(UnsignedGossipMessage msg) {
                    return underlying_ns.sign_gossip_message(msg);
                }
                @Override public Result_StrNoneZ sign_message(byte[] msg) { return underlying_ns.sign_message(msg); }
            });
        }
        SignerProvider manual_signer_provider(KeysManager underlying_km) {
            SignerProvider underlying_sp = underlying_km.as_SignerProvider();
            must_free_objs.add(new WeakReference<>(underlying_sp));
            return SignerProvider.new_impl(new SignerProvider.SignerProviderInterface() {
                @Override public Result_CVec_u8ZNoneZ get_destination_script(byte[] channel_keys_id) { return underlying_sp.get_destination_script(channel_keys_id); }
                @Override public Result_ShutdownScriptNoneZ get_shutdown_scriptpubkey() { return underlying_sp.get_shutdown_scriptpubkey(); }
                @Override public byte[] generate_channel_keys_id(boolean inbound, UInt128 user_channel_id) {
                    return underlying_sp.generate_channel_keys_id(inbound, user_channel_id);
                }
                @Override
                public EcdsaChannelSigner derive_channel_signer(byte[] channel_keys_id) {
                    if (!use_full_km_wrapper) {
                        EcdsaChannelSigner underlying_signer = underlying_sp.derive_channel_signer(channel_keys_id);
                        must_free_objs.add(new WeakReference<>(underlying_signer));
                        return underlying_signer;
                    } else {
                        BaseEcdsaChannelSigner underlying_ecs =
                                underlying_sp.derive_channel_signer(channel_keys_id).get_base_ecdsa_channel_signer();
                        ChannelSigner underlying_cs = underlying_ecs.get_channel_signer();
                        ChannelSigner.ChannelSignerInterface csi = new ChannelSigner.ChannelSignerInterface() {
                            @Override public Result_PublicKeyNoneZ get_per_commitment_point(long idx) { return underlying_cs.get_per_commitment_point(idx); }
                            @Override public Result__u832NoneZ release_commitment_secret(long idx) { return underlying_cs.release_commitment_secret(idx); }
                            @Override public Result_NoneNoneZ validate_holder_commitment(HolderCommitmentTransaction holder_tx, byte[][] preimages) {
                                Result_NoneNoneZ res = underlying_cs.validate_holder_commitment(holder_tx, preimages);
                                mid_test_must_free_objs.add(new WeakReference<>(res));
                                return res;
                            }
                            @Override public Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret) {
                                Result_NoneNoneZ res = underlying_cs.validate_counterparty_revocation(idx, secret);
                                mid_test_must_free_objs.add(new WeakReference<>(res));
                                return res;
                            }
                            @Override public ChannelPublicKeys pubkeys() { return underlying_cs.pubkeys(); }
                            @Override public byte[] new_funding_pubkey(byte[] splice_parent_funding_txid) {
                                return underlying_cs.new_funding_pubkey(splice_parent_funding_txid);
                            }
                            @Override public byte[] channel_keys_id() { return underlying_cs.channel_keys_id(); }
                        };
                        BaseEcdsaChannelSigner.BaseEcdsaChannelSignerInterface ecsi = new BaseEcdsaChannelSigner.BaseEcdsaChannelSignerInterface() {
                            @Override public Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ sign_counterparty_commitment(ChannelTransactionParameters channel_parameters, CommitmentTransaction commitment_tx, byte[][] inbound_htlc_preimages, byte[][] outbound_htlc_preimages) {
                                return underlying_ecs.sign_counterparty_commitment(channel_parameters, commitment_tx, inbound_htlc_preimages, outbound_htlc_preimages);
                            }
                            @Override public Result_ECDSASignatureNoneZ sign_holder_commitment(ChannelTransactionParameters channel_parameters, HolderCommitmentTransaction commitment_tx) {
                                return underlying_ecs.sign_holder_commitment(channel_parameters, commitment_tx);
                            }
                            @Override public Result_ECDSASignatureNoneZ sign_justice_revoked_output(ChannelTransactionParameters channel_parameters, byte[] justice_tx, long input, long amount, byte[] per_commitment_key) {
                                return underlying_ecs.sign_justice_revoked_output(channel_parameters, justice_tx, input, amount, per_commitment_key);
                            }
                            @Override public Result_ECDSASignatureNoneZ sign_justice_revoked_htlc(ChannelTransactionParameters channel_parameters, byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc) {
                                return underlying_ecs.sign_justice_revoked_htlc(channel_parameters, justice_tx, input, amount, per_commitment_key, htlc);
                            }
                            @Override public Result_ECDSASignatureNoneZ sign_holder_htlc_transaction(byte[] htlc_tx, long input, HTLCDescriptor htlc_descriptor) {
                                return underlying_ecs.sign_holder_htlc_transaction(htlc_tx, input, htlc_descriptor);
                            }
                            @Override public Result_ECDSASignatureNoneZ sign_counterparty_htlc_transaction(ChannelTransactionParameters channel_parameters, byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc) {
                                return underlying_ecs.sign_counterparty_htlc_transaction(channel_parameters, htlc_tx, input, amount, per_commitment_point, htlc);
                            }
                            @Override public Result_ECDSASignatureNoneZ sign_closing_transaction(ChannelTransactionParameters channel_parameters, ClosingTransaction closing_tx) {
                                return underlying_ecs.sign_closing_transaction(channel_parameters, closing_tx);
                            }
                            @Override public Result_ECDSASignatureNoneZ sign_holder_keyed_anchor_input(ChannelTransactionParameters channel_parameters, byte[] anchor_tx, long input) {
                                return underlying_ecs.sign_holder_keyed_anchor_input(channel_parameters, anchor_tx, input);
                            }
                            @Override public Result_ECDSASignatureNoneZ sign_channel_announcement_with_funding_key(ChannelTransactionParameters channel_parameters, UnsignedChannelAnnouncement msg) {
                                return underlying_ecs.sign_channel_announcement_with_funding_key(channel_parameters, msg);
                            }

                            @Override
                            public byte[] sign_splice_shared_input(ChannelTransactionParameters channel_parameters, byte[] tx, long input_index) {
                                return underlying_ecs.sign_splice_shared_input(channel_parameters, tx, input_index);
                            }
                        };
                        EcdsaChannelSigner.EcdsaChannelSignerInterface wrapper =
                                new EcdsaChannelSigner.EcdsaChannelSignerInterface() {};
                        EcdsaChannelSigner resp = EcdsaChannelSigner.new_impl(wrapper, ecsi, csi);
                        must_free_objs.add(new WeakReference<>(wrapper));
                        must_free_objs.add(new WeakReference<>(ecsi));
                        must_free_objs.add(new WeakReference<>(csi));
                        must_free_objs.add(new WeakReference<>(resp));
                        must_free_objs.add(new WeakReference<>(underlying_ecs));
                        must_free_objs.add(new WeakReference<>(underlying_cs));
                        return resp;
                    }
                }
            });
        }

        Watch get_manual_watch() {
            Watch.WatchInterface watch_impl = new Watch.WatchInterface() {
                public Result_ChannelMonitorUpdateStatusNoneZ watch_channel(ChannelId channel_id, ChannelMonitor monitor) {
                    synchronized (monitors) {
                        assert monitors.put(Arrays.toString(channel_id.get_a()), monitor) == null;
                    }
                    return Result_ChannelMonitorUpdateStatusNoneZ.ok(ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed);
                }

                public ChannelMonitorUpdateStatus update_channel(ChannelId channel_id, ChannelMonitorUpdate update) {
                    synchronized (monitors) {
                        String key = Arrays.toString(channel_id.get_a());
                        assert monitors.containsKey(key);
                        Result_NoneNoneZ update_res = monitors.get(key).update_monitor(update, tx_broadcaster, fee_estimator, logger);
                        assert update_res instanceof Result_NoneNoneZ.Result_NoneNoneZ_OK;
                    }
                    return ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
                }

                @Override
                public FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] release_pending_monitor_events() {
                    synchronized (monitors) {
                        assert monitors.size() <= 1;
                        for (ChannelMonitor mon : monitors.values()) {
                            FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] res = new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[1];
                            res[0] = FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ.of(mon.get_funding_txo(), ChannelId.of(new byte[32]), mon.get_and_clear_pending_monitor_events(), mon.get_counterparty_node_id());
                            return res;
                        }
                    }
                    return new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[0];
                }
            };
            Watch watch = Watch.new_impl(watch_impl);
            must_free_objs.add(new WeakReference<>(watch_impl));
            must_free_objs.add(new WeakReference<>(watch));
            return watch;
        }

        UserConfig get_config() {
            ChannelHandshakeConfig channel_config = ChannelHandshakeConfig.with_default();
            channel_config.set_announce_for_forwarding(true);
            UserConfig config = UserConfig.with_default();
            config.set_channel_handshake_config(channel_config);
            assert config.get_channel_handshake_config().get_announce_for_forwarding();
            return config;
        }

        NioPeerHandler nio_peer_handler;
        short nio_port;
        final byte seed;
        final byte[] key_seed = new byte[32];
        final Logger logger;
        final FeeEstimator fee_estimator;
        final BroadcasterInterface tx_broadcaster;
        final KeysManager explicit_keys_manager;
        final NodeSigner node_signer;
        final SignerProvider signer_provider;
        final EntropySource entropy_source;
        final ChainMonitor chain_monitor;
        NetworkGraph net_graph;
        P2PGossipSync route_handler;
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
        long network_graph_persists = 0;
        GcCheck obj = new GcCheck();

        private ChannelMonitor test_mon_roundtrip(byte[] data) {
            Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ roundtrip_monitor = UtilMethods.C2Tuple_ThirtyTwoBytesChannelMonitorZ_read(data, this.entropy_source, this.signer_provider);
            assert roundtrip_monitor instanceof Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK;
            must_free_objs.add(new WeakReference<>(roundtrip_monitor));
            OutPoint funding_txo = ((Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK) roundtrip_monitor).res.get_b().get_funding_txo();
            must_free_objs.add(new WeakReference<>(funding_txo));
            System.gc(); System.runFinalization(); // Give the GC a chance to run.
            Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ roundtrip_two = UtilMethods.C2Tuple_ThirtyTwoBytesChannelMonitorZ_read(data, this.entropy_source, this.signer_provider);
            assert roundtrip_two instanceof Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK;
            must_free_objs.add(new WeakReference<>(((Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK) roundtrip_two).res.get_b()));
            must_free_objs.add(new WeakReference<>(((Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK) roundtrip_two).res));
            must_free_objs.add(new WeakReference<>(roundtrip_two));
            return ((Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK) roundtrip_two).res.get_b();
        }

        private Peer(Object _dummy, byte seed) {
            logger = Logger.new_impl((org.ldk.structs.Record arg)->{
                if (arg.get_level() == Level.LDKLevel_Error)
                    System.err.println(seed + ": " + arg.get_module_path() + " - " + arg.get_args());
                else
                    System.out.println(seed + ": " + arg.get_module_path() + " - " + arg.get_args());
            });
            fee_estimator = FeeEstimator.new_impl((confirmation_target -> 253));
            tx_broadcaster = BroadcasterInterface.new_impl(txn -> {
                synchronized (broadcast_set) {
                    for (byte[] tx : txn){
                        broadcast_set.add(tx);
                    }
                    broadcast_set.notifyAll();
                }
            });
            monitors = new HashMap<>();
            this.seed = seed;
            Persist persister = Persist.new_impl(new Persist.PersistInterface() {
                @Override public TwoTuple_ChannelIdu64Z[] get_and_clear_completed_updates() {
                    return new TwoTuple_ChannelIdu64Z[0];
                }

                @Override
                public ChannelMonitorUpdateStatus persist_new_channel(MonitorName monitor_name, ChannelMonitor monitor) {
                    synchronized (monitors) {
                        ChannelMonitor res = test_mon_roundtrip(monitor.write());
                        String key = monitor_name.to_str();
                        assert monitors.put(key, res) == null;
                    }
                    return ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
                }

                @Override
                public ChannelMonitorUpdateStatus update_persisted_channel(MonitorName monitor_name, ChannelMonitorUpdate update, ChannelMonitor data) {
                    synchronized (monitors) {
                        ChannelMonitor res = test_mon_roundtrip(data.write());
                        String key = monitor_name.to_str();
                        // Note that we use a serialization-roundtrip copy of data here, not the original, as this can
                        // expose the JVM JIT bug where it finalize()s things still being called.
                        assert monitors.put(key, res) != null;
                    }
                    return ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
                }

                @Override
                public void archive_persisted_channel(MonitorName monitor_name) {
                    assert false;
                }
            });

            filter_additions = new HashSet<>();
            if (use_filter) {
                this.filter = Option_FilterZ.some(Filter.new_impl(new Filter.FilterInterface() {
                    @Override public void register_tx(byte[] txid, byte[] script_pubkey) {
                        filter_additions.add(Arrays.toString(txid));
                    }
                    @Override public void register_output(WatchedOutput output) {
                        filter_additions.add(Arrays.toString(output.get_outpoint().get_txid()) + ":" + output.get_outpoint().get_index());
                    }
                }));
            } else {
                this.filter = Option_FilterZ.none();
            }

            for (byte i = 0; i < 32; i++) {
                key_seed[i] = (byte) (i ^ seed);
            }
            KeysManager keys = KeysManager.of(key_seed, System.currentTimeMillis() / 1000, (int) (System.currentTimeMillis() * 1000), true);
            if (use_km_wrapper) {
                this.signer_provider = manual_signer_provider(keys);
                this.node_signer = manual_node_signer(keys);
                this.entropy_source = EntropySource.new_impl(new EntropySource.EntropySourceInterface() {
                    @Override public byte[] get_secure_random_bytes() { return keys.as_EntropySource().get_secure_random_bytes(); }
                });
                this.explicit_keys_manager = null;
            } else {
                this.signer_provider = keys.as_SignerProvider();
                this.entropy_source = keys.as_EntropySource();
                this.node_signer = keys.as_NodeSigner();
                this.explicit_keys_manager = keys;
            }

            if (use_manual_watch) {
                chain_watch = get_manual_watch();
                chain_monitor = null;
            } else {
                chain_monitor = ChainMonitor.of(filter, tx_broadcaster, logger, fee_estimator, persister, this.entropy_source, this.node_signer.get_peer_storage_key());
                chain_watch = chain_monitor.as_Watch();
            }

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
                @Override public void peer_disconnected(byte[] their_node_id) {}
                @Override public Result_NoneNoneZ peer_connected(byte[] their_node_id, Init msg, boolean inbound) {
                    return Result_NoneNoneZ.ok();
                }
                @Override public NodeFeatures provided_node_features() {
                    return NodeFeatures.empty();
                }
                @Override public InitFeatures provided_init_features(byte[] their_node_id) {
                    return InitFeatures.empty();
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
        private void setup_route_handler() {
            this.route_handler = P2PGossipSync.of(this.net_graph,
                Option_UtxoLookupZ.some(UtxoLookup.new_impl((genesis_hash, short_channel_id) -> UtxoResult.sync(Result_TxOutUtxoLookupErrorZ.ok(gossip_txout)))), this.logger);
        }
        Peer(byte seed) {
            this(null, seed);
            this.net_graph = NetworkGraph.of(Network.LDKNetwork_Bitcoin, this.logger);
            this.setup_route_handler();

            if (use_chan_manager_constructor) {
                this.constructor = new ChannelManagerConstructor(Network.LDKNetwork_Bitcoin, get_config(), new byte[32], 0,
                        this.explicit_keys_manager.as_EntropySource(), this.explicit_keys_manager.as_NodeSigner(), this.explicit_keys_manager.as_SignerProvider(),
                        this.fee_estimator, this.chain_monitor, this.net_graph,
                        ProbabilisticScoringDecayParameters.with_default(), ProbabilisticScoringFeeParameters.with_default(),
                        (payer_node_id, route_params, first_hops, inflight_htlcs, payment_hash, payment_id, default_router) -> {
                            assert payment_hash != null && payment_id != null;
                            Router r = default_router.as_Router();
                            must_free_objs.add(new WeakReference<>(r));
                            return r.find_route_with_id(payer_node_id, route_params, first_hops, inflight_htlcs, payment_hash, payment_id);
                        },
                        this.tx_broadcaster, this.logger);
                constructor.chain_sync_completed(KVStoreSync.new_impl(new KVStoreSync.KVStoreSyncInterface() {
                    @Override public Result_CVec_u8ZIOErrorZ read(String primary_namespace, String secondary_namespace, String key) {
                        assert(false);
                        return null;
                    }

                    @Override public Result_NoneIOErrorZ write(String primary_namespace, String secondary_namespace, String key, byte[] buf) {
                        assert(primary_namespace.equals(""));
                        assert(secondary_namespace.equals(""));
                        assert(buf.length > 0);
                        if (key.equals("network_graph"))
                            network_graph_persists += 1;
                        return Result_NoneIOErrorZ.ok();
                    }

                    @Override public Result_NoneIOErrorZ remove(String primary_namespace, String secondary_namespace, String key, boolean lazy) {
                        assert(false);
                        return null;
                    }

                    @Override public Result_CVec_StrZIOErrorZ list(String primary_namespace, String secondary_namespace) {
                        assert(false);
                        return null;
                    }
                }), new ChannelManagerConstructor.EventHandler() {
                    @Override public Result_NoneReplayEventZ handle_event(Event event) {
                        synchronized (pending_manager_events) {
                            pending_manager_events.add(event);
                            pending_manager_events.notifyAll();
                        }
                        return Result_NoneReplayEventZ.ok();
                    }
                }, null, !use_ignore_handler);
                this.chan_manager = constructor.channel_manager;
                this.peer_manager = constructor.peer_manager;
                must_free_objs.add(new WeakReference<>(this.chan_manager));
            } else {
                Router router = Router.new_impl(new Router.RouterInterface() {
                    @Override
                    public Result_RouteStrZ find_route_with_id(byte[] payer, RouteParameters route_params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs, byte[] _payment_hash, byte[] _payment_id) {
                        return find_route(payer, route_params, first_hops, inflight_htlcs);
                    }

                    @Override
                    public Result_CVec_BlindedPaymentPathZNoneZ create_blinded_payment_paths(byte[] recipient, ChannelDetails[] first_hops, ReceiveTlvs tlvs, Option_u64Z amount_msats) {
                        return Result_CVec_BlindedPaymentPathZNoneZ.err();
                    }

                    @Override
                    public Result_RouteStrZ find_route(byte[] payer, RouteParameters params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs) {
                        while (true) {
                            try (ReadOnlyNetworkGraph graph = net_graph.read_only()) {
                                assert graph.channel(424242) == null;
                                long[] channels = graph.list_channels();
                                if (channels.length != 1) {
                                    // If we're using a NioPeerHandler, the handling of announcement signatures and
                                    // channel broadcasting may be done async, so just wait until the channel shows up.
                                    assert use_nio_peer_handler;
                                    continue;
                                }
                                ChannelInfo chan = graph.channel(channels[0]);
                                assert Arrays.equals(chan.get_node_one().as_slice(), chan.get_node_one().write());
                                assert Arrays.equals(chan.get_node_one().as_slice(), chan_manager.get_our_node_id()) ||
                                        Arrays.equals(chan.get_node_two().as_slice(), chan_manager.get_our_node_id());
                                break;
                            }
                        }
                        return UtilMethods.find_route(payer, params, net_graph, first_hops, logger,
                                ScoreLookUp.new_impl((candidate, usage, params1) -> candidate.source().as_slice()[1]),
                                ProbabilisticScoringFeeParameters.with_default(), new byte[32]);
                    }
                });
                MessageRouter msg_router = MessageRouter.new_impl(new MessageRouter.MessageRouterInterface() {
                    @Override public Result_OnionMessagePathNoneZ find_path(byte[] sender, byte[][] peers, Destination destination) {
                        return Result_OnionMessagePathNoneZ.err();
                    }
                    @Override public Result_CVec_BlindedMessagePathZNoneZ create_blinded_paths(byte[] recipient, ReceiveAuthKey key, MessageContext context, MessageForwardNode[] peers) {
                        return Result_CVec_BlindedMessagePathZNoneZ.err();
                    }
                });
                ChainParameters params = ChainParameters.of(Network.LDKNetwork_Bitcoin, BestBlock.of(new byte[32], 0));
                this.chan_manager = ChannelManager.of(this.fee_estimator, chain_watch, tx_broadcaster, router,
                    msg_router, logger, this.entropy_source, this.node_signer, this.signer_provider, get_config(),
                    params, (int)(System.currentTimeMillis() / 1000));
                this.peer_manager = PeerManager.of(chan_manager.as_ChannelMessageHandler(), route_handler.as_RoutingMessageHandler(),
                        IgnoringMessageHandler.of().as_OnionMessageHandler(), this.custom_message_handler,
                        IgnoringMessageHandler.of().as_SendOnlyMessageHandler(), 0xdeadbeef,
                        this.entropy_source.get_secure_random_bytes(), logger, this.node_signer);
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
                byte[] serialized_graph = orig.net_graph.write();
                byte[] serialized_scorer = orig.constructor.scorer.write();
                try {
                    Filter filter_nullable = null;
                    if (this.filter instanceof Option_FilterZ.Some) {
                        filter_nullable = ((Option_FilterZ.Some) this.filter).some;
                    }
                    this.constructor = new ChannelManagerConstructor(serialized, monitors, get_config(),
                        this.explicit_keys_manager.as_EntropySource(), this.explicit_keys_manager.as_NodeSigner(), this.explicit_keys_manager.as_SignerProvider(),
                        this.fee_estimator, this.chain_monitor, filter_nullable,
                            serialized_graph, ProbabilisticScoringDecayParameters.with_default(),
                            ProbabilisticScoringFeeParameters.with_default(), serialized_scorer, null,
                            this.tx_broadcaster, this.logger);
                    try {
                        // Test that ChannelManagerConstructor correctly rejects duplicate ChannelMonitors
                        byte[][] monitors_dupd = new byte[2][];
                        monitors_dupd[0] = monitors[0];
                        monitors_dupd[1] = monitors[0];
                        ChannelManagerConstructor constr = new ChannelManagerConstructor(serialized, monitors_dupd, get_config(),
                            this.explicit_keys_manager.as_EntropySource(), this.explicit_keys_manager.as_NodeSigner(), this.explicit_keys_manager.as_SignerProvider(),
                            this.fee_estimator, this.chain_monitor, filter_nullable,
                                serialized_graph, ProbabilisticScoringDecayParameters.with_default(),
                                ProbabilisticScoringFeeParameters.with_default(), serialized_scorer, null,
                                this.tx_broadcaster, this.logger);
                        assert false;
                    } catch (ChannelManagerConstructor.InvalidSerializedDataException e) {}
                    this.net_graph = this.constructor.net_graph;
                    setup_route_handler();
                    ChannelMonitor monitor_clone = test_mon_roundtrip(monitors[0]);
                    // Monitors aren't written on startup anymore so load them manually into our set.
                    this.monitors.put(MonitorName.v1_channel(monitor_clone.get_funding_txo()).to_str(), monitor_clone);
                    constructor.chain_sync_completed(KVStoreSync.new_impl(new KVStoreSync.KVStoreSyncInterface() {
                        @Override public Result_CVec_u8ZIOErrorZ read(String primary_namespace, String secondary_namespace, String key) {
                            assert(false);
                            return null;
                        }

                        @Override
                        public Result_NoneIOErrorZ write(String primary_namespace, String secondary_namespace, String key, byte[] buf) {
                            assert(primary_namespace.equals(""));
                            assert(secondary_namespace.equals(""));
                            assert(buf.length > 0);
                            if (key.equals("network_graph"))
                                network_graph_persists += 1;
                            return Result_NoneIOErrorZ.ok();
                        }

                        @Override public Result_NoneIOErrorZ remove(String primary_namespace, String secondary_namespace, String key, boolean lazy) {
                            assert(false);
                            return null;
                        }

                        @Override public Result_CVec_StrZIOErrorZ list(String primary_namespace, String secondary_namespace) {
                            assert(false);
                            return null;
                        }
                    }), new ChannelManagerConstructor.EventHandler() {
                        @Override public Result_NoneReplayEventZ handle_event(Event event) {
                            synchronized (pending_manager_events) {
                                pending_manager_events.add(event);
                                pending_manager_events.notifyAll();
                            }
                            return Result_NoneReplayEventZ.ok();
                        }
                    }, null, !use_ignore_handler);
                    this.chan_manager = constructor.channel_manager;
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
                this.net_graph = NetworkGraph.of(Network.LDKNetwork_Bitcoin, this.logger);
                Router router = Router.new_impl(new Router.RouterInterface() {
                    @Override
                    public Result_RouteStrZ find_route_with_id(byte[] payer, RouteParameters route_params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs, byte[] _payment_hash, byte[] _payment_id) {
                        return find_route(payer, route_params, first_hops, inflight_htlcs);
                    }

                    @Override
                    public Result_CVec_BlindedPaymentPathZNoneZ create_blinded_payment_paths(byte[] recipient, ChannelDetails[] first_hops, ReceiveTlvs tlvs, Option_u64Z amount_msats) {
                        return Result_CVec_BlindedPaymentPathZNoneZ.err();
                    }

                    @Override
                    public Result_RouteStrZ find_route(byte[] payer, RouteParameters params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs) {
                        while (true) {
                            try (ReadOnlyNetworkGraph graph = net_graph.read_only()) {
                                assert graph.channel(424242) == null;
                                long[] channels = graph.list_channels();
                                if (channels.length != 1) {
                                    // If we're using a NioPeerHandler, the handling of announcement signatures and
                                    // channel broadcasting may be done async, so just wait until the channel shows up.
                                    assert use_nio_peer_handler;
                                    continue;
                                }
                                ChannelInfo chan = graph.channel(channels[0]);
                                assert Arrays.equals(chan.get_node_one().as_slice(), chan.get_node_one().write());
                                assert Arrays.equals(chan.get_node_one().as_slice(), chan_manager.get_our_node_id()) ||
                                        Arrays.equals(chan.get_node_two().as_slice(), chan_manager.get_our_node_id());
                                break;
                            }
                        }
                        return UtilMethods.find_route(payer, params, net_graph, first_hops, logger,
                                ScoreLookUp.new_impl((candidate, usage, params1) -> candidate.source().as_slice()[0]),
                                ProbabilisticScoringFeeParameters.with_default(), new byte[32]);
                    }
                });
                MessageRouter msg_router = MessageRouter.new_impl(new MessageRouter.MessageRouterInterface() {
                    @Override public Result_OnionMessagePathNoneZ find_path(byte[] sender, byte[][] peers, Destination destination) {
                        return Result_OnionMessagePathNoneZ.err();
                    }
                    @Override public Result_CVec_BlindedMessagePathZNoneZ create_blinded_paths(byte[] recipient, ReceiveAuthKey key, MessageContext context, MessageForwardNode[] peers) {
                        return Result_CVec_BlindedMessagePathZNoneZ.err();
                    }
                });
                this.setup_route_handler();
                ChannelMonitor[] monitors = new ChannelMonitor[1];
                assert orig.monitors.size() == 1;
                if (!break_cross_peer_refs) {
                    monitors[0] = orig.monitors.values().stream().iterator().next();
                } else {
                    byte[] serialized = orig.monitors.values().stream().iterator().next().write();
                    Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ res =
                            UtilMethods.C2Tuple_ThirtyTwoBytesChannelMonitorZ_read(serialized, this.entropy_source, this.signer_provider);
                    assert res instanceof Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK;
                    monitors[0] = ((Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK) res).res.get_b();
                }
                byte[] serialized = orig.chan_manager.write();
                Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ read_res =
                        UtilMethods.C2Tuple_ThirtyTwoBytesChannelManagerZ_read(serialized, this.entropy_source, this.node_signer, this.signer_provider, this.fee_estimator, this.chain_watch, this.tx_broadcaster, router, msg_router, this.logger, get_config(), monitors);
                assert read_res instanceof Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_OK;
                this.chan_manager = ((Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ.Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_OK) read_res).res.get_b();
                this.chain_watch.watch_channel(monitors[0].channel_id(), monitors[0]);
                this.peer_manager = PeerManager.of(chan_manager.as_ChannelMessageHandler(), route_handler.as_RoutingMessageHandler(),
                        IgnoringMessageHandler.of().as_OnionMessageHandler(), this.custom_message_handler,
                        IgnoringMessageHandler.of().as_SendOnlyMessageHandler(),
                        (int)(System.currentTimeMillis() / 1000), this.entropy_source.get_secure_random_bytes(),
                        logger, this.node_signer);
                if (!break_cross_peer_refs && (use_manual_watch || use_km_wrapper)) {
                    // When we pass monitors[0] into chain_watch.watch_channel we create a reference from the new Peer to a
                    // field in the old peer, preventing freeing of the original Peer until the new Peer is freed. Thus, we
                    // shouldn't bother waiting for the original to be freed later on.
                    cross_reload_ref_pollution = true;
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

        TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] connect_block(Block b, int height, long expected_monitor_update_len) {
            byte[] header = Arrays.copyOfRange(b.serialize(), 0, 80);
            TwoTuple_usizeTransactionZ[] txn;
            if (b.hasTransactions()) {
                assert b.getTransactions().size() == 1;
                TwoTuple_usizeTransactionZ txp = TwoTuple_usizeTransactionZ.of((long) 0, b.getTransactions().get(0).serialize());
                txn = new TwoTuple_usizeTransactionZ[]{txp};
            } else
                txn = new TwoTuple_usizeTransactionZ[0];
            if (chain_monitor != null) {
                chan_manager.as_Listen().block_connected(b.serialize(), height);
                chain_monitor.as_Listen().block_connected(b.serialize(), height);
            } else {
                chan_manager.as_Confirm().transactions_confirmed(header, txn, height);
                chan_manager.as_Confirm().best_block_updated(header, height);
                // Connect manually if we aren't using a ChainMonitor and are implementing Watch ourselves
                synchronized (monitors) {
                    assert monitors.size() == 1;
                    for (ChannelMonitor mon : monitors.values()) {
                        TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] ret = mon.block_connected(header, txn, height, tx_broadcaster, fee_estimator, logger);
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
                chain_monitor.as_EventsProvider().process_pending_events(EventHandler.new_impl(event -> {
                    l.add(event);
                    return Result_NoneReplayEventZ.ok();
                }));
                assert l.size() == expected_len;
                return l.toArray(new Event[0]);
            } else {
                synchronized (monitors) {
                    assert monitors.size() == 1;
                    for (ChannelMonitor mon : monitors.values()) {
                        ArrayList<Event> res = new ArrayList<Event>();
                        EventHandler handler = EventHandler.new_impl(event -> {
                            res.add(event);
                            return Result_NoneReplayEventZ.ok();
                        });
                        mon.process_pending_events(handler, logger);
                        assert res.size() == expected_len;
                        return res.toArray(new Event[0]);
                    }
                    return null;
                }
            }
        }

        Event[] get_manager_events(int expected_len, Peer peer1, Peer peer2, boolean process_pending_forwards) {
            assert expected_len != 0;
            Event[] res = new Event[0];
            if (use_chan_manager_constructor) {
                if (process_pending_forwards) {
                    peer1.chan_manager.process_pending_htlc_forwards();
                    peer2.chan_manager.process_pending_htlc_forwards();
                }
                if (!use_nio_peer_handler) {
                    maybe_exchange_peer_messages(peer1, peer2);
                }
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
                    if (process_pending_forwards) {
                        peer1.chan_manager.process_pending_htlc_forwards();
                        peer2.chan_manager.process_pending_htlc_forwards();
                    }
                    if (use_nio_peer_handler) {
                        peer1.nio_peer_handler.check_events();
                        peer2.nio_peer_handler.check_events();
                    } else {
                        maybe_exchange_peer_messages(peer1, peer2);
                    }
                    chan_manager.as_EventsProvider().process_pending_events(EventHandler.new_impl(event -> {
                        l.add(event);
                        return Result_NoneReplayEventZ.ok();
                    }));
                }
                return l.toArray(new Event[0]);
            }
            assert res.length == expected_len;
            return res;
        }
    }

    static class DescriptorHolder { SocketDescriptor val; }

    boolean running = false;
    final LinkedList<Runnable> runqueue = new LinkedList<>();
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
    void do_disconnect_event(PeerManager pm, SocketDescriptor descriptor) {
        if (!t.isAlive()) t.start();
        synchronized (runqueue) {
            ran = true;
            runqueue.add(() -> {
                pm.socket_disconnected(descriptor);
            });
            runqueue.notifyAll();
        }
    }
    void do_read_event(PeerManager pm, SocketDescriptor descriptor, byte[] data) {
        if (!t.isAlive()) t.start();
        synchronized (runqueue) {
            ran = true;
            runqueue.add(() -> {
                Result_NonePeerHandleErrorZ res = pm.read_event(descriptor, data);
                assert res instanceof Result_NonePeerHandleErrorZ.Result_NonePeerHandleErrorZ_OK;
            });
            runqueue.notifyAll();
        }
        mid_test_must_free_objs.add(new WeakReference<>(data));
    }

    void connect_peers(final Peer peer1, final Peer peer2) {
        peer2.connected_peer_node_id = peer1.node_id;
        peer1.connected_peer_node_id = peer2.node_id;
        if (use_nio_peer_handler) {
            try {
                peer1.nio_peer_handler.connect(peer2.chan_manager.get_our_node_id(), new InetSocketAddress("127.0.0.1", peer2.nio_port), 100);
            } catch (IOException e) { assert false; }
            while (peer1.peer_manager.list_peers().length == 0 || peer2.peer_manager.list_peers().length == 0) {
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

                @Override public void disconnect_socket() { do_disconnect_event(peer1.peer_manager, descriptor1ref.val); }
                @Override public boolean eq(SocketDescriptor other_arg) { return other_arg.hash() == 2; }
                @Override public long hash() { return 2; }
            });

            descriptor1.val = SocketDescriptor.new_impl(new SocketDescriptor.SocketDescriptorInterface() {
                @Override
                public long send_data(byte[] data, boolean resume_read) {
                    do_read_event(peer2.peer_manager, descriptor2, data);
                    return data.length;
                }

                @Override public void disconnect_socket() { do_disconnect_event(peer2.peer_manager, descriptor2); }
                @Override public boolean eq(SocketDescriptor other_arg) { return other_arg.hash() == 1; }
                @Override public long hash() { return 1; }
            });

            Result_CVec_u8ZPeerHandleErrorZ conn_res = peer1.peer_manager.new_outbound_connection(peer2.node_id, descriptor1.val, Option_SocketAddressZ.none());
            assert conn_res instanceof Result_CVec_u8ZPeerHandleErrorZ.Result_CVec_u8ZPeerHandleErrorZ_OK;

            Result_NonePeerHandleErrorZ inbound_conn_res = peer2.peer_manager.new_inbound_connection(descriptor2, Option_SocketAddressZ.none());
            assert inbound_conn_res instanceof Result_NonePeerHandleErrorZ.Result_NonePeerHandleErrorZ_OK;
            do_read_event(peer2.peer_manager, descriptor2, ((Result_CVec_u8ZPeerHandleErrorZ.Result_CVec_u8ZPeerHandleErrorZ_OK) conn_res).res);

            maybe_exchange_peer_messages(peer1, peer2);
        }
    }

    TestState do_test_message_handler() throws InterruptedException {
        Peer peer1 = new Peer((byte) 1);
        Peer peer2 = new Peer((byte) 2);

        connect_peers(peer1, peer2);

        UInt128 user_id = new UInt128(new byte[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16});
        mid_test_must_free_objs.add(new WeakReference<>(user_id));

        Result_ChannelIdAPIErrorZ cc_res = peer1.chan_manager.create_channel(peer2.node_id, 100000, 1000, user_id, null, null);
        assert cc_res instanceof Result_ChannelIdAPIErrorZ.Result_ChannelIdAPIErrorZ_OK;
        mid_test_must_free_objs.add(new WeakReference<>(cc_res));

        // Previously, this was a SEGFAULT instead of get_funding_txo() returning null.
        ChannelDetails pre_funding_chan = peer1.chan_manager.list_channels()[0];
        assert pre_funding_chan.get_funding_txo() == null;
        mid_test_must_free_objs.add(new WeakReference<>(pre_funding_chan));

        // Test Address construction
        String valid_addr = "bc1qprzyshqx2qlyrur5pyx9s3tg6y4m5lfwkcls38";
        assert Address.from_string(valid_addr).address.equals(valid_addr);
        try {
            Address.from_string("");
            assert false;
        } catch (IllegalArgumentException e) {}

        Event[] events = peer1.get_manager_events(1, peer1, peer2, false);
        assert events[0] instanceof Event.FundingGenerationReady;
        mid_test_must_free_objs.add(new WeakReference<>(events[0]));
        assert ((Event.FundingGenerationReady) events[0]).channel_value_satoshis == 100000;
        assert ((Event.FundingGenerationReady) events[0]).user_channel_id.equals(user_id);
        byte[] funding_spk = ((Event.FundingGenerationReady) events[0]).output_script;
        assert funding_spk.length == 34 && funding_spk[0] == 0 && funding_spk[1] == 32; // P2WSH
        mid_test_must_free_objs.add(new WeakReference<>(((Event.FundingGenerationReady) events[0]).user_channel_id));
        ChannelId chan_id = ((Event.FundingGenerationReady) events[0]).temporary_channel_id;
        mid_test_must_free_objs.add(new WeakReference<>(chan_id));

        Transaction funding_input = new Transaction();
        funding_input.addOutput(Coin.ofSat(100000), Script.parse(funding_spk));
        Transaction funding = new Transaction();
        funding.addInput(funding_input.getOutput(0));
        funding.getInput(0).setWitness(TransactionWitness.of(new byte[]{0x1})); // Make sure we don't complain about lack of witness
        funding.addOutput(Coin.ofSat(100000), Script.parse(funding_spk));
        Result_NoneAPIErrorZ funding_res = peer1.chan_manager.funding_transaction_generated(chan_id, peer2.node_id, funding.serialize());
        assert funding_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;

        gossip_txout = new TxOut(100000, funding_spk);

        maybe_exchange_peer_messages(peer1, peer2);
        synchronized (peer1.broadcast_set) {
            while (peer1.broadcast_set.size() != 1) {
                peer1.broadcast_set.wait();
            }
        }

        events = peer1.get_manager_events(1, peer1, peer2, false);
        assert events[0] instanceof Event.ChannelPending;
        mid_test_must_free_objs.add(new WeakReference<>(events[0]));

        events = peer2.get_manager_events(1, peer1, peer2, false);
        assert events[0] instanceof Event.ChannelPending;
        mid_test_must_free_objs.add(new WeakReference<>(events[0]));

        assert peer1.broadcast_set.size() == 1;
        assert Arrays.equals(peer1.broadcast_set.get(0), funding.serialize());
        mid_test_must_free_objs.add(new WeakReference<>(peer1.broadcast_set.get(0)));
        peer1.broadcast_set.clear();

        Block b = new Block(2, Sha256Hash.ZERO_HASH, Sha256Hash.ZERO_HASH, TIME_42, 0, 0, List.of(funding));
        peer1.connect_block(b, 1, 0);
        peer2.connect_block(b, 1, 0);

        for (int height = 2; height < 10; height++) {
            b = new Block(2, b.getHash(), Sha256Hash.ZERO_HASH, TIME_42, 0, 0, List.of());
            peer1.connect_block(b, height, 0);
            peer2.connect_block(b, height, 0);
        }

        maybe_exchange_peer_messages(peer1, peer2);
        while (peer1.chan_manager.list_usable_channels().length != 1 || peer2.chan_manager.list_usable_channels().length != 1) ;

        events = peer1.get_manager_events(1, peer1, peer2, false);
        assert events[0] instanceof Event.ChannelReady;
        mid_test_must_free_objs.add(new WeakReference<>(events[0]));

        events = peer2.get_manager_events(1, peer1, peer2, false);
        assert events[0] instanceof Event.ChannelReady;
        mid_test_must_free_objs.add(new WeakReference<>(events[0]));

        ChannelDetails[] peer1_chans = peer1.chan_manager.list_usable_channels();
        ChannelDetails[] peer2_chans = peer2.chan_manager.list_usable_channels();
        assert peer1_chans.length == 1;
        assert peer2_chans.length == 1;
        assert peer1_chans[0].get_channel_value_satoshis() == 100000;
        assert peer1_chans[0].get_is_usable();
        Option_u64Z short_chan_id = peer1_chans[0].get_short_channel_id();
        assert short_chan_id instanceof Option_u64Z.Some;
        assert ((Option_u64Z.Some)short_chan_id).some == (1L << 40); // 0th output in the 0th transaction in the 1st block
        assert Arrays.equals(peer1_chans[0].get_channel_id().get_a(), funding.getTxId().serialize());
        assert Arrays.equals(peer2_chans[0].get_channel_id().get_a(), funding.getTxId().serialize());
        mid_test_must_free_objs.add(new WeakReference<>(peer1_chans[0]));
        mid_test_must_free_objs.add(new WeakReference<>(peer2_chans[0]));

        // Generate a random invoice description to exercise the string conversion logic a good bit
        String invoice_description;
        char[] string_bytes = new char[16];
        try {
            new FileReader("/dev/urandom").read(string_bytes);
        } catch (Exception e) { assert false; }
        invoice_description = new String(string_bytes);
        Result_DescriptionCreationErrorZ descr = Description.of(invoice_description);
        assert(descr instanceof Result_DescriptionCreationErrorZ.Result_DescriptionCreationErrorZ_OK);

        Result_Bolt11InvoiceSignOrCreationErrorZ invoice = peer2.chan_manager.create_bolt11_invoice(Option_u64Z.some(10000000),
                Bolt11InvoiceDescription.direct(((Result_DescriptionCreationErrorZ.Result_DescriptionCreationErrorZ_OK) descr).res),
                Option_u32Z.none(), Option_u16Z.none(), Option_ThirtyTwoBytesZ.none());
        assert invoice instanceof Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK;
        System.out.println("Got invoice: " + ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res.to_str());
        mid_test_must_free_objs.add(new WeakReference<>(invoice));
        mid_test_must_free_objs.add(new WeakReference<>(((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res));

        String invoice_string = ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res.to_str();
        Result_Bolt11InvoiceParseOrSemanticErrorZ parsed_invoice = Bolt11Invoice.from_str(invoice_string);
        assert parsed_invoice instanceof Result_Bolt11InvoiceParseOrSemanticErrorZ.Result_Bolt11InvoiceParseOrSemanticErrorZ_OK;
        mid_test_must_free_objs.add(new WeakReference<>(parsed_invoice));
        assert ((Result_Bolt11InvoiceParseOrSemanticErrorZ.Result_Bolt11InvoiceParseOrSemanticErrorZ_OK) parsed_invoice).res.fallback_addresses().length == 0;
        assert Arrays.equals(((Result_Bolt11InvoiceParseOrSemanticErrorZ.Result_Bolt11InvoiceParseOrSemanticErrorZ_OK) parsed_invoice).res.payment_hash(), ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res.payment_hash());
        SignedRawBolt11Invoice signed_raw = ((Result_Bolt11InvoiceParseOrSemanticErrorZ.Result_Bolt11InvoiceParseOrSemanticErrorZ_OK) parsed_invoice).res.into_signed_raw();
        mid_test_must_free_objs.add(new WeakReference<>(signed_raw));
        RawBolt11Invoice raw_invoice = signed_raw.raw_invoice();
        Description raw_invoice_description = raw_invoice.description();
        mid_test_must_free_objs.add(new WeakReference<>(raw_invoice_description));
        String description_string = raw_invoice_description.into_inner().get_a();
        boolean has_null = false;
        for (byte db : invoice_description.getBytes())
            if (db == 0)
                has_null = true;
        if (!has_null) // Null codepoints are dropped, so may fail
            assert description_string.equals(invoice_description);

        // Do a trivial test of constructing a phantom invoice
        Result_Bolt11InvoiceSignOrCreationErrorZ phantom_invoice = UtilMethods.create_phantom_invoice(
                Option_u64Z.some(42000),
                Option_ThirtyTwoBytesZ.none(),
                "Phantom Invoice", 7200,
                new PhantomRouteHints[]{ peer2.chan_manager.get_phantom_route_hints() },
                peer2.entropy_source,
                PhantomKeysManager.of(peer2.key_seed, 42, 42, new byte[32], true).as_NodeSigner(),
                peer2.logger, Currency.LDKCurrency_Bitcoin, Option_u16Z.none(),
                System.currentTimeMillis() / 1000);
        assert phantom_invoice.is_ok();
        RouteHint[] hints = ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK)phantom_invoice).res.route_hints();
        mid_test_must_free_objs.add(new WeakReference<>(((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK)phantom_invoice).res));
        assert hints.length == 1;
        mid_test_must_free_objs.add(new WeakReference<>(hints[0]));
        RouteHintHop[] val = hints[0].get_a();
        assert hints[0].get_a().length == 1; // Our one channel is public so we should just have a single-hop hint

        if (!use_invoice_payer) {
            byte[] payment_hash = ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res.payment_hash();
            byte[] payment_secret = ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res.payment_secret();
            byte[] dest_node_id = ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res.recover_payee_pub_key();
            assert Arrays.equals(dest_node_id, peer2.node_id);
            Bolt11InvoiceFeatures invoice_features = ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res.features();
            RouteHint[] route_hints = ((Result_Bolt11InvoiceSignOrCreationErrorZ.Result_Bolt11InvoiceSignOrCreationErrorZ_OK) invoice).res.route_hints();

            Payee payee = Payee.clear(peer2.node_id, route_hints, invoice_features, 42);
            PaymentParameters pay_params = PaymentParameters.of(payee, Option_u64Z.none(), 6*24*14, (byte)5, (byte)10, (byte)2, new long[0], new long[0]);
            RouteParameters route_params = RouteParameters.from_payment_params_and_value(pay_params, 10_000_000);
            mid_test_must_free_objs.add(new WeakReference<>(payee));
            mid_test_must_free_objs.add(new WeakReference<>(pay_params));
            mid_test_must_free_objs.add(new WeakReference<>(route_params));

            byte[] payment_id = new byte[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 };
            Result_NoneRetryableSendFailureZ payment_res = peer1.chan_manager.send_payment(payment_hash, RecipientOnionFields.secret_only(payment_secret), payment_id, route_params, Retry.attempts(0));
            assert payment_res instanceof Result_NoneRetryableSendFailureZ.Result_NoneRetryableSendFailureZ_OK;

            route_params.set_final_value_msat(1_000_000_000);
            payment_res = peer1.chan_manager.send_payment(payment_hash, RecipientOnionFields.secret_only(payment_secret), payment_id, route_params, Retry.attempts(0));
            mid_test_must_free_objs.add(new WeakReference<>(payment_res));
            assert payment_res instanceof Result_NoneRetryableSendFailureZ.Result_NoneRetryableSendFailureZ_Err;
        } else {
            Result_NoneBolt11PaymentErrorZ pay_res = peer1.chan_manager.pay_for_bolt11_invoice(
                    ((Result_Bolt11InvoiceParseOrSemanticErrorZ.Result_Bolt11InvoiceParseOrSemanticErrorZ_OK) parsed_invoice).res,
                    new byte[32], Option_u64Z.none(), RouteParametersConfig.with_default(), Retry.attempts(0));
            mid_test_must_free_objs.add(new WeakReference<>(pay_res));
            assert pay_res.is_ok();
        }

        if (reload_peers) {
            assert peer1.network_graph_persists == 0;
            assert peer2.network_graph_persists == 0;
            if (use_chan_manager_constructor) {
                peer1.constructor.interrupt();
                peer2.constructor.interrupt();
                if (!use_ignore_handler) {
                    assert peer1.network_graph_persists >= 1;
                    assert peer2.network_graph_persists >= 1;
                } else {
                    assert peer1.network_graph_persists == 0;
                    assert peer2.network_graph_persists == 0;
                }
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
        final WeakReference<Peer> ref_block;
        final Peer peer1;
        final Peer peer2;
        public Sha256Hash best_blockhash;

        public TestState(WeakReference<Peer> ref_block, Peer peer1, Peer peer2, Sha256Hash best_blockhash) {
            this.ref_block = ref_block;
            this.peer1 = peer1;
            this.peer2 = peer2;
            this.best_blockhash = best_blockhash;
        }
    }
    void do_test_message_handler_b(TestState state) throws Exception {
        Event[] events = state.peer2.get_manager_events(1, state.peer1, state.peer2, true);
        assert events[0] instanceof Event.PaymentClaimable;
        assert ((Event.PaymentClaimable)events[0]).purpose instanceof PaymentPurpose.Bolt11InvoicePayment;
        assert ((PaymentPurpose.Bolt11InvoicePayment) ((Event.PaymentClaimable)events[0]).purpose).payment_preimage instanceof Option_ThirtyTwoBytesZ.Some;
        byte[] payment_preimage = ((Option_ThirtyTwoBytesZ.Some) ((PaymentPurpose.Bolt11InvoicePayment)((Event.PaymentClaimable)events[0]).purpose).payment_preimage).some;
        assert !Arrays.equals(payment_preimage, new byte[32]);
        state.peer2.chan_manager.claim_funds(payment_preimage);

        events = state.peer2.get_manager_events(1, state.peer1, state.peer2, false);
        assert events[0] instanceof Event.PaymentClaimed;
        assert ((Event.PaymentClaimed)events[0]).purpose instanceof PaymentPurpose.Bolt11InvoicePayment;
        assert ((PaymentPurpose.Bolt11InvoicePayment) ((Event.PaymentClaimed)events[0]).purpose).payment_preimage instanceof  Option_ThirtyTwoBytesZ.Some;
        payment_preimage = ((Option_ThirtyTwoBytesZ.Some)((PaymentPurpose.Bolt11InvoicePayment)((Event.PaymentClaimed)events[0]).purpose).payment_preimage).some;
        assert !Arrays.equals(payment_preimage, new byte[32]);

        events = state.peer1.get_manager_events(2, state.peer1, state.peer2, false);
        assert events[0] instanceof Event.PaymentSent;
        assert Arrays.equals(((Event.PaymentSent) events[0]).payment_preimage, payment_preimage);
        assert events[1] instanceof Event.PaymentPathSuccessful;
        assert ((Event.PaymentPathSuccessful) events[1]).payment_hash instanceof Option_ThirtyTwoBytesZ.Some;
        assert Arrays.equals(((Option_ThirtyTwoBytesZ.Some) ((Event.PaymentPathSuccessful) events[1]).payment_hash).some, ((Event.PaymentSent) events[0]).payment_hash);

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
            Result_NoneAPIErrorZ close_res = state.peer1.chan_manager.close_channel(peer1_chans[0].get_channel_id(), state.peer2.node_id);
            assert close_res instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;
            maybe_exchange_peer_messages(state.peer1, state.peer2);
            synchronized (state.peer1.broadcast_set) {
                while (state.peer1.broadcast_set.size() != 1) state.peer1.broadcast_set.wait();
            }
            synchronized (state.peer2.broadcast_set) {
                while (state.peer2.broadcast_set.size() != 1) state.peer2.broadcast_set.wait();
            }
        } else {
            state.peer1.chan_manager.force_close_all_channels_broadcasting_latest_txn("Force closing");
            maybe_exchange_peer_messages(state.peer1, state.peer2);
            synchronized (state.peer1.broadcast_set) {
                while (state.peer1.broadcast_set.size() != 1) state.peer1.broadcast_set.wait();
            }
            synchronized (state.peer2.broadcast_set) {
                while (state.peer2.broadcast_set.size() != 1) state.peer2.broadcast_set.wait();
            }
        }

        assert state.peer1.broadcast_set.size() == 1;
        assert state.peer2.broadcast_set.size() == 1;

        events = state.peer2.get_manager_events(1, state.peer1, state.peer2, false);
        assert events[0] instanceof Event.ChannelClosed;
        events = state.peer1.get_manager_events(1, state.peer1, state.peer2, false);
        assert events[0] instanceof Event.ChannelClosed;

        if (state.peer1.chain_monitor != null) {
            Balance[] peer1_balances = state.peer1.chain_monitor.get_claimable_balances(state.peer1.chan_manager.list_channels());
            assert peer1_balances.length == 1;
            for (Balance bal : peer1_balances) {
                assert bal instanceof Balance.ClaimableOnChannelClose;
                long expected_tx_fee = 183;
                assert(bal.claimable_amount_satoshis() == 100000 - 1 - 10000 - expected_tx_fee);
                assert ((Balance.ClaimableOnChannelClose) bal).balance_candidates[0].get_amount_satoshis() == 100000 - 1 - 10000 - expected_tx_fee;
            }
            Balance[] peer2_balances = state.peer2.chain_monitor.get_claimable_balances(state.peer2.chan_manager.list_channels());
            assert peer2_balances.length == 1;
            for (Balance bal : peer2_balances) {
                assert bal instanceof Balance.ClaimableOnChannelClose;
                assert(bal.claimable_amount_satoshis() == 10000 + 1);
                assert ((Balance.ClaimableOnChannelClose) bal).balance_candidates[0].get_amount_satoshis() == 10000 + 1;
            }
        }

        if (!nice_close) {
            Transaction tx = Transaction.read(ByteBuffer.wrap(state.peer1.broadcast_set.getFirst()));
            Block b = new Block(2, state.best_blockhash, Sha256Hash.ZERO_HASH, TIME_42, 0, 0, List.of(tx));
            TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] watch_outputs = state.peer2.connect_block(b, 10, 1);
            if (watch_outputs != null) { // We only process watch_outputs manually when we use a manually-build Watch impl
                assert watch_outputs.length == 1;
                assert Arrays.equals(watch_outputs[0].get_a(), tx.getTxId().serialize());
                assert watch_outputs[0].get_b().length == 2;
                assert watch_outputs[0].get_b()[0].get_a() == 0;
                assert watch_outputs[0].get_b()[1].get_a() == 1;
            }

            for (int i = 11; i < 21; i++) {
                b = new Block(2, b.getHash(), Sha256Hash.ZERO_HASH, TIME_42, 0, 0, List.of());
                state.peer2.connect_block(b, i, 0);
            }

            Event[] broadcastable_event = state.peer2.get_monitor_events(1);
            assert broadcastable_event.length == 1;
            assert broadcastable_event[0] instanceof Event.SpendableOutputs;
            if (state.peer2.explicit_keys_manager != null) {
                TxOut[] additional_outputs = new TxOut[]{new TxOut(420, new byte[]{0x42})};
                Result_TransactionNoneZ tx_res = state.peer2.explicit_keys_manager.as_OutputSpender().spend_spendable_outputs(((Event.SpendableOutputs) broadcastable_event[0]).outputs, additional_outputs, new byte[]{0x00}, 253, Option_u32Z.none());
                assert tx_res instanceof Result_TransactionNoneZ.Result_TransactionNoneZ_OK;
                Transaction built_tx = Transaction.read(ByteBuffer.wrap(((Result_TransactionNoneZ.Result_TransactionNoneZ_OK) tx_res).res));
                assert built_tx.getOutputs().size() == 2;
                assert Arrays.equals(built_tx.getOutput(1).getScriptBytes(), new byte[]{0x00});
                assert Arrays.equals(built_tx.getOutput(0).getScriptBytes(), new byte[]{0x42});
                assert built_tx.getOutput(0).getValue().value == 420;
            }

            state.peer1.peer_manager.disconnect_all_peers();

            while (state.peer1.peer_manager.list_peers().length != 0 || state.peer2.peer_manager.list_peers().length != 0) {
                // LDK disconnects peers before sending an error message, so wait for disconnection.
                Thread.sleep(10);
            }

            connect_peers(state.peer1, state.peer2);
        }

        // Test exchanging a custom message (note that ChannelManagerConstructor) always loads an IgnorimgMessageHandler
        // so we cannot exchange custom messages with it
        if (!use_chan_manager_constructor) {
            byte[] custom_message_bytes = new byte[]{0x42, 0x44, 0x43, 0x00};
            synchronized(state.peer1.custom_messages_to_send) {
                state.peer1.custom_messages_to_send.add(custom_message_bytes);
            }
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
            state.peer1.peer_manager.disconnect_by_node_id(state.peer2.chan_manager.get_our_node_id());
            while (state.peer1.peer_manager.list_peers().length != 0) Thread.yield();
            while (state.peer2.peer_manager.list_peers().length != 0) Thread.yield();
            state.peer1.nio_peer_handler.interrupt();
            state.peer2.nio_peer_handler.interrupt();
        }

        state.peer1.get_monitor_events(0);
        state.peer2.get_monitor_events(0);

        if (use_chan_manager_constructor) {
            assert state.peer1.network_graph_persists == 0;
            assert state.peer2.network_graph_persists == 0;
            state.peer1.constructor.interrupt();
            state.peer2.constructor.interrupt();
            if (!use_ignore_handler) {
                assert state.peer1.network_graph_persists >= 1;
                assert state.peer2.network_graph_persists >= 1;
            } else {
                assert state.peer1.network_graph_persists == 0;
                assert state.peer2.network_graph_persists == 0;
            }
        }

        t.interrupt();

        if (state.peer1.net_graph != null)
            state.peer1.net_graph.write();

        if (use_chan_manager_constructor) {
            // Lock the scorer twice back-to-back to check that the try-with-resources AutoCloseable on the scorer works.
            try (ChannelManagerConstructor.ScorerWrapper score = state.peer1.constructor.get_locked_scorer()) {
                score.prob_scorer.debug_log_liquidity_stats();
            }
        }
    }

    LinkedList<WeakReference<Object>> must_free_objs = new LinkedList<>();
    LinkedList<WeakReference<Object>> mid_test_must_free_objs = new LinkedList<>();
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
    void block_on_gc(TestState state) {
        GcCheck obj = new GcCheck();
        System.gc();
        System.runFinalization();
        // Ensure the original peers get freed before we move on. Note that we have to be in a different function
        // scope to do so as the (at least current OpenJDK) JRE won't release anything created in the same scope.
        while (!cross_reload_ref_pollution && state.ref_block.get() != null) {
            System.gc();
            System.runFinalization();
        }

for (WeakReference<Object> o : mid_test_must_free_objs)
if (o.get() != null) {
System.err.println("HI");
}
        for (WeakReference<Object> o : mid_test_must_free_objs)
            assert o.get() == null;
    }
}
public class HumanObjectPeerTest {
    static HumanObjectPeerTestInstance do_test_run(boolean nice_close, boolean use_km_wrapper, boolean use_full_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean nio_peer_handler, boolean use_ignoring_routing_handler, boolean use_chan_manager_constructor, boolean use_invoice_payer) throws Exception {
        HumanObjectPeerTestInstance instance = new HumanObjectPeerTestInstance(nice_close, use_km_wrapper, use_full_km_wrapper, use_manual_watch, reload_peers, break_cross_peer_refs, nio_peer_handler, !nio_peer_handler, use_ignoring_routing_handler, use_chan_manager_constructor, use_invoice_payer);
        HumanObjectPeerTestInstance.TestState state = instance.do_test_message_handler();
        if (state.ref_block != null) {
            instance.block_on_gc(state);
            instance.connect_peers(state.peer1, state.peer2);
        }
        instance.do_test_message_handler_b(state);
        return instance;
    }
    static void do_test(boolean nice_close, boolean use_km_wrapper, boolean use_full_km_wrapper, boolean use_manual_watch, boolean reload_peers, boolean break_cross_peer_refs, boolean nio_peer_handler, boolean use_ignoring_routing_handler, boolean use_chan_manager_constructor, boolean use_invoice_payer) throws Exception {
        HumanObjectPeerTestInstance instance = do_test_run(nice_close, use_km_wrapper, use_full_km_wrapper, use_manual_watch, reload_peers, break_cross_peer_refs, nio_peer_handler, use_ignoring_routing_handler, use_chan_manager_constructor, use_invoice_payer);
        while (instance.gc_count != instance.gc_exp_count) {
            System.gc();
            System.runFinalization();
        }
        for (WeakReference<Object> o : instance.must_free_objs)
            assert o.get() == null;
        for (WeakReference<Object> o : instance.mid_test_must_free_objs)
            assert o.get() == null;
    }
    public static final int TEST_ITERATIONS = (1 << 10);
    public static void do_test_message_handler(IntConsumer statusFunction) throws Exception {
        Thread gc_thread = new Thread(() -> {
            while (true) {
                System.gc();
                System.runFinalization();
                try { Thread.sleep(0, 1); } catch (InterruptedException e) { break; }
            }
        }, "Test GC Thread");
        gc_thread.start();
        for (int i = 0; i < TEST_ITERATIONS; i++) {
            boolean nice_close =                   (i & (1 << 0)) != 0;
            boolean use_km_wrapper =               (i & (1 << 1)) != 0;
            boolean use_full_km_wrapper =          (i & (1 << 2)) != 0;
            boolean use_manual_watch =             (i & (1 << 3)) != 0;
            boolean reload_peers =                 (i & (1 << 4)) != 0;
            boolean break_cross_refs =             (i & (1 << 5)) != 0;
            boolean use_ignoring_routing_handler = (i & (1 << 6)) != 0;
            boolean use_chan_manager_constructor = (i & (1 << 7)) != 0;
            boolean use_invoice_payer =            (i & (1 << 8)) != 0;
            boolean nio_peer_handler =             (i & (1 << 9)) != 0;
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
                // use an IgnoringMessageHandler), no InvoicePayer will be constructed for us, thus we cannot use an
                // InvoicePayer to send payments in this case.
                continue;
            }
            if (use_chan_manager_constructor && use_km_wrapper) {
                // ChannelManagerConstructor requires a full KeysManager, so using wrapped keys interfaces doesn't make
                // any sense.
                continue;
            }
            if (use_full_km_wrapper && !use_km_wrapper) {
                // Gotta use some KM wrapper if we're gonna use a full one.
                continue;
            }
            statusFunction.accept(i);
            do_test(nice_close, use_km_wrapper, use_full_km_wrapper, use_manual_watch, reload_peers, break_cross_refs, nio_peer_handler, use_ignoring_routing_handler, use_chan_manager_constructor, use_invoice_payer);
        }
        gc_thread.interrupt();
        gc_thread.join();
    }
    @Test
    public void test_message_handler() throws Exception {
        do_test_message_handler(i -> System.err.println("Running test with flags " + i));
    }

    // This is used in the test jar to test the built jar is runnable
    public static void main(String[] args) {
        try {
            do_test_message_handler(i -> System.err.println("Running test with flags " + i));
        } catch (Exception e) {
            System.err.println("Caught exception:");
            System.err.println(e);
            e.printStackTrace();
            System.exit(1);
        }
    }
}
