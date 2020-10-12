package org.ldk;

import org.bitcoinj.core.*;
import org.bitcoinj.script.Script;
import org.junit.jupiter.api.Test;
import org.ldk.impl.bindings;
import org.ldk.enums.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
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
        final long chan_manager_events;
        final long chan_handler;
        final long router;
        final long route_handler;
        final long message_handler;
        final long peer_manager;
        HashMap<String, Long> monitors; // Wow I forgot just how terrible Java is - we can't put a byte array here.
        byte[] node_id;
        bindings.LDKFeeEstimator fee_est;
        bindings.LDKBroadcasterInterface broad_trait;
        bindings.LDKLogger log_trait;
        bindings.LDKWatch watcher;

        Peer(byte seed) {
            this.log_trait = (String arg)-> System.out.println(seed + ": " + arg);
            logger = bindings.LDKLogger_new(this.log_trait);
            this.fee_est = confirmation_target -> 0;
            this.fee_estimator = bindings.LDKFeeEstimator_new(this.fee_est);
            this.broad_trait = tx -> {
                // We should broadcast
            };
            this.tx_broadcaster = bindings.LDKBroadcasterInterface_new(this.broad_trait);
            this.monitors = new HashMap<>();
            this.watcher = new bindings.LDKWatch() {
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
                public long release_pending_monitor_events() {
                    synchronized (monitors) {
                        assert monitors.size() <= 1;
                        for (Long mon : monitors.values()) {
                            return bindings.ChannelMonitor_get_and_clear_pending_monitor_events(mon);
                        }
                    }
                    return bindings.new_empty_slice_vec();
                }
            };
            this.chain_monitor = bindings.LDKWatch_new(this.watcher);

            byte[] key_seed = new byte[32];
            for (byte i = 0; i < 32; i++) { key_seed[i] = (byte) (i ^ seed); }
            this.keys = bindings.KeysManager_new(key_seed, LDKNetwork.LDKNetwork_Bitcoin, System.currentTimeMillis() / 1000, (int)(System.currentTimeMillis() * 1000) & 0xffffffff);
            this.keys_interface = bindings.KeysManager_as_KeysInterface(keys);
            this.config = bindings.UserConfig_default();
            this.chan_manager = bindings.ChannelManager_new(LDKNetwork.LDKNetwork_Bitcoin, fee_estimator, chain_monitor, tx_broadcaster, logger, keys_interface, config, 1);
            this.node_id = bindings.ChannelManager_get_our_node_id(chan_manager);
            this.chan_manager_events = bindings.ChannelManager_as_EventsProvider(chan_manager);

            this.chan_handler = bindings.ChannelManager_as_ChannelMessageHandler(chan_manager);
            this.router = bindings.NetGraphMsgHandler_new(0, logger);
            this.route_handler = bindings.NetGraphMsgHandler_as_RoutingMessageHandler(router);
            this.message_handler = bindings.MessageHandler_new(chan_handler, route_handler);

            byte[] random_data = new byte[32];
            for (byte i = 0; i < 32; i++) { random_data[i] = (byte) ((i ^ seed) ^ 0xf0); }
            this.peer_manager = bindings.PeerManager_new(message_handler, bindings.LDKKeysInterface_call_get_node_secret(keys_interface), random_data, logger);
        }

        void connect_block(Block b, Transaction t, int height) {
            byte[] header = b.bitcoinSerialize();
            long txn;
            if (t != null)
                txn = bindings.LDKCVecTempl_C2TupleTempl_usize__Transaction_new(
                    new long[] {bindings.C2Tuple_usizeTransactionZ_new(1, bindings.new_txpointer_copy_data(t.bitcoinSerialize()))});
            else
                txn = bindings.LDKCVecTempl_C2TupleTempl_usize__Transaction_new(new long[0]);
            bindings.ChannelManager_block_connected(chan_manager, header, txn, height);
            synchronized (monitors) {
                for (Long mon : monitors.values()) {
                    if (t != null)
                        txn = bindings.LDKCVecTempl_C2TupleTempl_usize__Transaction_new(
                            new long[] {bindings.C2Tuple_usizeTransactionZ_new(1, bindings.new_txpointer_copy_data(t.bitcoinSerialize()))});
                    else
                        txn = bindings.LDKCVecTempl_C2TupleTempl_usize__Transaction_new(new long[0]);
                    long ret = bindings.ChannelMonitor_block_connected(mon, header, txn, height, tx_broadcaster, fee_estimator, logger);
                    bindings.CVec_C2Tuple_TxidCVec_TxOutZZZ_free(ret);
                }
            }
        }

        void free() {
            // Note that we can't rely on finalizer order, so don't bother trying to rely on it here
            bindings.Logger_free(logger);
            bindings.FeeEstimator_free(fee_estimator);
            bindings.BroadcasterInterface_free(tx_broadcaster);
            bindings.Watch_free(chain_monitor);
            bindings.KeysManager_free(keys);
            bindings.KeysInterface_free(keys_interface);
            bindings.UserConfig_free(config);
            bindings.ChannelManager_free(chan_manager);
            bindings.EventsProvider_free(chan_manager_events);
            bindings.ChannelMessageHandler_free(chan_handler);
            bindings.NetGraphMsgHandler_free(router);
            bindings.RoutingMessageHandler_free(route_handler);
            //MessageHandler was actually moved into the route_handler!: bindings.MessageHandler_free(message_handler);
            bindings.PeerManager_free(peer_manager);
            synchronized (monitors) {
                for (Long mon : monitors.values()) {
                    bindings.ChannelMonitor_free(mon);
                }
            }
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
            bindings.CVec_u8Z_free(arr_vec);
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
        bindings.LDKSocketDescriptor sock1 = new bindings.LDKSocketDescriptor() {
            @Override
            public long send_data(long data, boolean resume_read) {
                return do_read_event(list, peer1.peer_manager, descriptor1ref.val, data).length;
            }

            @Override public void disconnect_socket() { assert false; }
            @Override public boolean eq(long other_arg) { return bindings.LDKSocketDescriptor_get_obj_from_jcalls(other_arg).hash() == 2; }
            @Override public long hash() { return 2; }
        };
        long descriptor2 = bindings.LDKSocketDescriptor_new(sock1);

        bindings.LDKSocketDescriptor sock2 = new bindings.LDKSocketDescriptor() {
            @Override
            public long send_data(long data, boolean resume_read) {
                return do_read_event(list, peer2.peer_manager, descriptor2, data).length;
            }

            @Override public void disconnect_socket() { assert false; }
            @Override public boolean eq(long other_arg) { return bindings.LDKSocketDescriptor_get_obj_from_jcalls(other_arg).hash() == 1; }
            @Override public long hash() { return 1; }
        };
        descriptor1.val = bindings.LDKSocketDescriptor_new(sock2);

        long init_vec = bindings.PeerManager_new_outbound_connection(peer1.peer_manager, peer2.node_id, descriptor1.val);
        assert(bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_result_ok(init_vec));

        long con_res = bindings.PeerManager_new_inbound_connection(peer2.peer_manager, descriptor2);
        assert(bindings.LDKCResult_NonePeerHandleErrorZ_result_ok(con_res));
        bindings.CResult_NonePeerHandleErrorZ_free(con_res);
        do_read_event(list, peer2.peer_manager, descriptor2, bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_get_inner(init_vec));
        bindings.CResult_CVec_u8ZPeerHandleErrorZ_free(init_vec);

        while (!list.isEmpty()) { list.poll().join(); }

        long cc_res = bindings.ChannelManager_create_channel(peer1.chan_manager, peer2.node_id, 10000, 1000, 42, 0);
        assert bindings.LDKCResult_NoneAPIErrorZ_result_ok(cc_res);
        bindings.CResult_NoneAPIErrorZ_free(cc_res);

        bindings.PeerManager_process_events(peer1.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }
        bindings.PeerManager_process_events(peer2.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }

        long events = bindings.LDKEventsProvider_call_get_and_clear_pending_events(peer1.chan_manager_events);
        bindings.VecOrSliceDef events_arr_info = bindings.LDKCVecTempl_Event_arr_info(events);
        assert events_arr_info.datalen == 1;
        bindings.LDKEvent event = bindings.LDKEvent_ref_from_ptr(events_arr_info.dataptr);
        assert event instanceof bindings.LDKEvent.FundingGenerationReady;
        assert ((bindings.LDKEvent.FundingGenerationReady)event).channel_value_satoshis == 10000;
        assert ((bindings.LDKEvent.FundingGenerationReady)event).user_channel_id == 42;
        byte[] funding_spk = bindings.get_u8_slice_bytes(((bindings.LDKEvent.FundingGenerationReady)event).output_script);
        assert funding_spk.length == 34 && funding_spk[0] == 0 && funding_spk[1] == 32; // P2WSH
        byte[] chan_id = ((bindings.LDKEvent.FundingGenerationReady)event).temporary_channel_id;
        bindings.CVec_EventZ_free(events);

        Transaction funding = new Transaction(NetworkParameters.fromID(NetworkParameters.ID_MAINNET));
        funding.addInput(new TransactionInput(NetworkParameters.fromID(NetworkParameters.ID_MAINNET), funding, new byte[0]));
        funding.getInputs().get(0).setWitness(new TransactionWitness(2)); // Make sure we don't complain about lack of witness
        funding.getInput(0).getWitness().setPush(0, new byte[] {0x1});
        funding.addOutput(Coin.SATOSHI.multiply(10000), new Script(funding_spk));
        long funding_txo = bindings.OutPoint_new(funding.getTxId().getReversedBytes(), (short) 0);
        bindings.ChannelManager_funding_transaction_generated(peer1.chan_manager, chan_id, funding_txo);
        bindings.OutPoint_free(funding_txo);

        bindings.PeerManager_process_events(peer1.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }
        bindings.PeerManager_process_events(peer2.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }

        events = bindings.LDKEventsProvider_call_get_and_clear_pending_events(peer1.chan_manager_events);
        events_arr_info = bindings.LDKCVecTempl_Event_arr_info(events);
        assert events_arr_info.datalen == 1;
        event = bindings.LDKEvent_ref_from_ptr(events_arr_info.dataptr);
        assert event instanceof bindings.LDKEvent.FundingBroadcastSafe;
        bindings.CVec_EventZ_free(events);

        Block b = new Block(NetworkParameters.fromID(NetworkParameters.ID_MAINNET), 2, Sha256Hash.ZERO_HASH, Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[]{funding}));
        peer1.connect_block(b, funding, 1);
        peer2.connect_block(b, funding, 1);

        for (int height = 2; height < 10; height++) {
            b = new Block(NetworkParameters.fromID(NetworkParameters.ID_MAINNET), 2, b.getHash(), Sha256Hash.ZERO_HASH, 42, 0, 0, Arrays.asList(new Transaction[]{funding}));
            peer1.connect_block(b, null, height);
            peer2.connect_block(b, null, height);
        }

        bindings.PeerManager_process_events(peer1.peer_manager);
        bindings.PeerManager_process_events(peer2.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }

        long peer1_chans = bindings.ChannelManager_list_channels(peer1.chan_manager);
        long peer2_chans = bindings.ChannelManager_list_channels(peer2.chan_manager);
        assert bindings.vec_slice_len(peer1_chans) == 1;
        assert bindings.vec_slice_len(peer2_chans) == 1;
        long[] peer_1_chan_info = bindings.LDKCVecTempl_ChannelDetails_arr_info(peer1_chans);
        assert peer_1_chan_info.length == 1;
        assert bindings.ChannelDetails_get_channel_value_satoshis(peer_1_chan_info[0]) == 10000;
        assert bindings.ChannelDetails_get_is_live(peer_1_chan_info[0]);
        assert Arrays.equals(bindings.ChannelDetails_get_channel_id(peer_1_chan_info[0]), funding.getTxId().getReversedBytes());
        assert Arrays.equals(bindings.ChannelDetails_get_channel_id(bindings.LDKCVecTempl_ChannelDetails_arr_info(peer2_chans)[0]), funding.getTxId().getReversedBytes());
        bindings.CVec_ChannelDetailsZ_free(peer2_chans);

        byte[] payment_preimage = new byte[32];
        for (int i = 0; i < 32; i++) payment_preimage[i] = (byte) (i ^ 0x0f);
        byte[] payment_hash = Sha256Hash.hash(payment_preimage);
        long netgraph = bindings.NetGraphMsgHandler_read_locked_graph(peer1.router);
        long route = bindings.get_route(peer1.node_id, bindings.LockedNetworkGraph_graph(netgraph), peer2.node_id, peer1_chans,
                bindings.LDKCVecTempl_RouteHint_new(new long[0]), 1000, 42, peer1.logger);
        bindings.CVec_ChannelDetailsZ_free(peer1_chans);
        assert bindings.LDKCResult_RouteLightningErrorZ_result_ok(route);
        bindings.LockedNetworkGraph_free(netgraph);
        long payment_res = bindings.ChannelManager_send_payment(peer1.chan_manager, bindings.LDKCResult_RouteLightningErrorZ_get_inner(route), payment_hash, new byte[32]);
        bindings.CResult_RouteLightningErrorZ_free(route);
        assert bindings.LDKCResult_NonePaymentSendFailureZ_result_ok(payment_res);
        bindings.CResult_NonePaymentSendFailureZ_free(payment_res);

        bindings.PeerManager_process_events(peer1.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }
        bindings.PeerManager_process_events(peer2.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }
        bindings.PeerManager_process_events(peer1.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }

        long peer2_events = bindings.LDKEventsProvider_call_get_and_clear_pending_events(peer2.chan_manager_events);
        bindings.VecOrSliceDef event_arr_info = bindings.LDKCVecTempl_Event_arr_info(peer2_events);
        assert event_arr_info.datalen == 1;
        bindings.LDKEvent forwardable = bindings.LDKEvent_ref_from_ptr(event_arr_info.dataptr);
        assert forwardable instanceof bindings.LDKEvent.PendingHTLCsForwardable;
        bindings.CVec_EventZ_free(peer2_events);
        bindings.ChannelManager_process_pending_htlc_forwards(peer2.chan_manager);

        peer2_events = bindings.LDKEventsProvider_call_get_and_clear_pending_events(peer2.chan_manager_events);
        event_arr_info = bindings.LDKCVecTempl_Event_arr_info(peer2_events);
        assert event_arr_info.datalen == 1;
        bindings.LDKEvent payment_recvd = bindings.LDKEvent_ref_from_ptr(event_arr_info.dataptr);
        assert payment_recvd instanceof bindings.LDKEvent.PaymentReceived;
        assert bindings.ChannelManager_claim_funds(peer2.chan_manager, payment_preimage, new byte[32], ((bindings.LDKEvent.PaymentReceived)payment_recvd).amt);
        bindings.CVec_EventZ_free(peer2_events);

        bindings.PeerManager_process_events(peer2.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }
        bindings.PeerManager_process_events(peer1.peer_manager);
        while (!list.isEmpty()) { list.poll().join(); }

        long peer1_events = bindings.LDKEventsProvider_call_get_and_clear_pending_events(peer1.chan_manager_events);
        event_arr_info = bindings.LDKCVecTempl_Event_arr_info(peer1_events);
        assert event_arr_info.datalen == 1;
        bindings.LDKEvent sent = bindings.LDKEvent_ref_from_ptr(event_arr_info.dataptr);
        assert sent instanceof bindings.LDKEvent.PaymentSent;
        assert Arrays.equals(((bindings.LDKEvent.PaymentSent)sent).payment_preimage, payment_preimage);
        bindings.CVec_EventZ_free(peer1_events);

        peer1.free();
        peer2.free();
        bindings.SocketDescriptor_free(descriptor2);
        bindings.SocketDescriptor_free(descriptor1.val);
    }
}
