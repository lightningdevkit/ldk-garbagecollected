package org.ldk;

import org.junit.jupiter.api.Test;
import org.ldk.impl.bindings;

import java.util.concurrent.ConcurrentLinkedQueue;

public class PeerTest {
    class Peer {
        final long logger;
        final long fee_estimator;
        final long tx_broadcaster;
        final long chain_monitor;
        final long keys;
        final long keys_interface;
        final long config;
        final long chan_manager;
        final long chan_handler;
        final long router;
        final long route_handler;
        final long message_handler;
        final long peer_manager;

        Peer(byte seed) {
            logger = bindings.LDKLogger_new((String arg)-> System.out.println(seed + ": " + arg));
            this.fee_estimator = bindings.LDKFeeEstimator_new(confirmation_target -> 0);
            this.tx_broadcaster = bindings.LDKBroadcasterInterface_new(tx -> {
                // We should broadcast
            });
            this.chain_monitor = bindings.LDKWatch_new(new bindings.LDKWatch() {
                @Override
                public long watch_channel(long funding_txo, long monitor) {
                    return bindings.CResult_NoneChannelMonitorUpdateErrZ_ok();
                }

                @Override
                public long update_channel(long funding_txo, long update) {
                    return bindings.CResult_NoneChannelMonitorUpdateErrZ_ok();
                }

                @Override
                public long release_pending_monitor_events() {
                    return bindings.new_empty_slice_vec();
                }
            });

            byte[] key_seed = new byte[32];
            for (byte i = 0; i < 32; i++) { key_seed[i] = (byte) (i ^ seed); }
            this.keys = bindings.KeysManager_new(key_seed, bindings.LDKNetwork.LDKNetwork_Bitcoin, System.currentTimeMillis() / 1000, (int)(System.currentTimeMillis() * 1000) & 0xffffffff);
            this.keys_interface = bindings.KeysManager_as_KeysInterface(keys);
            this.config = bindings.UserConfig_default();
            this.chan_manager = bindings.ChannelManager_new(bindings.LDKNetwork.LDKNetwork_Bitcoin, fee_estimator, chain_monitor, tx_broadcaster, logger, keys_interface, config, 1);

            this.chan_handler = bindings.ChannelManager_as_ChannelMessageHandler(chan_manager);
            this.router = bindings.NetGraphMsgHandler_new(0, logger);
            this.route_handler = bindings.NetGraphMsgHandler_as_RoutingMessageHandler(router);
            this.message_handler = bindings.MessageHandler_new(chan_handler, route_handler);

            byte[] random_data = new byte[32];
            for (byte i = 0; i < 32; i++) { random_data[i] = (byte) ((i ^ seed) ^ 0xf0); }
            this.peer_manager = bindings.PeerManager_new(message_handler, bindings.LDKKeysInterface_call_get_node_secret(keys_interface), random_data, logger);
        }

        void free() {
            // Note that we can't rely on finalizer order, so don't bother trying to rely on it here
            bindings.Logger_free(logger);
            bindings.FeeEstimator_free(fee_estimator);
            bindings.BroadcasterInterface_free(tx_broadcaster);
            bindings.Watch_free(chain_monitor);
            bindings.KeysManager_free(keys);
            bindings.KeysInterface_free(keys_interface);
            bindings.ChannelManager_free(chan_manager);
            bindings.ChannelMessageHandler_free(chan_handler);
            bindings.NetGraphMsgHandler_free(router);
            bindings.RoutingMessageHandler_free(route_handler);
            //MessageHandler was actually moved into the route_handler!: bindings.MessageHandler_free(message_handler);
            bindings.PeerManager_free(peer_manager);
        }
    }

    class LongHolder { long val; }

    byte[] do_read_event(ConcurrentLinkedQueue<Thread> list, long pm, long descriptor, long data) {
        byte[] arr = bindings.get_u8_slice_bytes(data);
        Thread thread = new Thread(() -> {
            long arr_vec = bindings.bytes_to_u8_vec(arr);
            long res = bindings.PeerManager_read_event(pm, descriptor, arr_vec);
            assert bindings.LDKCResult_boolPeerHandleErrorZ_result_ok(res);
            //assert bindings.deref_bool(bindings.LDKCResult_boolPeerHandleErrorZ_get_inner(res));
            bindings.CResult_boolPeerHandleErrorZ_free(res);
            bindings.free_heap_ptr(arr_vec);
        });
        thread.start();
        list.add(thread);
        return arr;
    }

    @Test
    void test_message_handler() throws InterruptedException {
        Peer peer1 = new Peer((byte) 1);
        Peer peer2 = new Peer((byte) 2);

        ConcurrentLinkedQueue<Thread> list = new ConcurrentLinkedQueue<Thread>();
        LongHolder descriptor1 = new LongHolder();
        LongHolder descriptor1ref = descriptor1;
        long descriptor2 = bindings.LDKSocketDescriptor_new(new bindings.LDKSocketDescriptor() {
            @Override
            public long send_data(long data, boolean resume_read) {
                return do_read_event(list, peer1.peer_manager, descriptor1ref.val, data).length;
            }

            @Override public void disconnect_socket() { assert false; }
            @Override public boolean eq(long other_arg) { return bindings.LDKSocketDescriptor_get_obj_from_jcalls(other_arg).hash() == 2; }
            @Override public long hash() { return 2; }
        });

        descriptor1.val = bindings.LDKSocketDescriptor_new(new bindings.LDKSocketDescriptor() {
            @Override
            public long send_data(long data, boolean resume_read) {
                return do_read_event(list, peer2.peer_manager, descriptor2, data).length;
            }

            @Override public void disconnect_socket() { assert false; }
            @Override public boolean eq(long other_arg) { return bindings.LDKSocketDescriptor_get_obj_from_jcalls(other_arg).hash() == 1; }
            @Override public long hash() { return 1; }
        });

        long init_vec = bindings.PeerManager_new_outbound_connection(peer1.peer_manager, bindings.ChannelManager_get_our_node_id(peer2.chan_manager), descriptor1.val);
        assert(bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_result_ok(init_vec));

        long con_res = bindings.PeerManager_new_inbound_connection(peer2.peer_manager, descriptor2);
        assert(bindings.LDKCResult_NonePeerHandleErrorZ_result_ok(con_res));
        bindings.CResult_NonePeerHandleErrorZ_free(con_res);
        do_read_event(list, peer2.peer_manager, descriptor2, bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_get_inner(init_vec));
        bindings.CResult_CVec_u8ZPeerHandleErrorZ_free(init_vec);

        while (!list.isEmpty()) { list.poll().join(); }

        long cc_res = bindings.ChannelManager_create_channel(peer1.chan_manager, bindings.ChannelManager_get_our_node_id(peer2.chan_manager), 10000, 1000, 0, bindings.LDKUserConfig_optional_none());
        assert bindings.LDKCResult_NoneAPIErrorZ_result_ok(cc_res);
        bindings.CResult_NoneAPIErrorZ_free(cc_res);

        bindings.PeerManager_process_events(peer1.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }
        bindings.PeerManager_process_events(peer2.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }

        long peer1_chans = bindings.ChannelManager_list_channels(peer1.chan_manager);
        long peer2_chans = bindings.ChannelManager_list_channels(peer2.chan_manager);
        assert bindings.vec_slice_len(peer1_chans) == 1;
        assert bindings.vec_slice_len(peer2_chans) == 1;
        bindings.CVec_ChannelDetailsZ_free(peer1_chans);
        bindings.CVec_ChannelDetailsZ_free(peer2_chans);

        peer1.free();
        peer2.free();
        bindings.SocketDescriptor_free(descriptor2);
        bindings.SocketDescriptor_free(descriptor1.val);
    }
}
