package org.ldk;

import org.junit.jupiter.api.Test;
import org.ldk.impl.bindings;

public class PeerTest {
    @Test
    void test_message_handler() {
        long logger = bindings.LDKLogger_new((String arg)-> System.out.println(arg));

        long fee_estimator = bindings.LDKFeeEstimator_new(new bindings.LDKFeeEstimator() {
            @Override
            public int get_est_sat_per_1000_weight(bindings.LDKConfirmationTarget confirmation_target) {
                return 0;
            }
        });
        long tx_broadcaster = bindings.LDKBroadcasterInterface_new(new bindings.LDKBroadcasterInterface() {
            @Override
            public void broadcast_transaction(long tx) {
                // We should broadcast
            }
        });
        long chain_monitor = bindings.LDKManyChannelMonitor_new(new bindings.LDKManyChannelMonitor() {
            @Override
            public long add_monitor(long funding_txo, long monitor) {
                return 0;
            }

            @Override
            public long update_monitor(long funding_txo, long monitor) {
                return 0;
            }

            @Override
            public long get_and_clear_pending_monitor_events() {
                return 0;
            }
        });
        byte[] key_seed = new byte[32];
        for (byte i = 0; i < 32; i++) { key_seed[i] = i; }
        long keys = bindings.KeysManager_new(key_seed, bindings.LDKNetwork.LDKNetwork_Bitcoin, System.currentTimeMillis() / 1000, (int)(System.currentTimeMillis() * 1000) & 0xffffffff);
        long keys_interface = bindings.KeysManager_as_KeysInterface(keys);
        long config = bindings.UserConfig_default();
        long chan_manager = bindings.ChannelManager_new(bindings.LDKNetwork.LDKNetwork_Bitcoin, fee_estimator, chain_monitor, tx_broadcaster, logger, keys_interface, config, 1);

        long chan_handler = bindings.ChannelManager_as_ChannelMessageHandler(chan_manager);
        long chain_watch = bindings.LDKChainWatchInterface_new(new bindings.LDKChainWatchInterface() {
            @Override
            public void install_watch_tx(byte[] txid, long script_pub_key) {

            }

            @Override
            public void install_watch_outpoint(long outpoint, long out_script) {

            }

            @Override
            public void watch_all_txn() {

            }

            @Override
            public long get_chain_utxo(long genesis_hash, long unspent_tx_output_identifier) {
                return 0;
            }

            @Override
            public long filter_block(long block) {
                return 0;
            }

            @Override
            public long reentered() {
                return 0;
            }
        });
        long router = bindings.NetGraphMsgHandler_new(chain_watch, logger);
        long route_handler = bindings.NetGraphMsgHandler_as_RoutingMessageHandler(router);
        long message_handler = bindings.MessageHandler_new(chan_handler, route_handler);
        long our_node_secret = bindings.LDKSecretKey_new(); //TODO: Need LDKSecretKey constructor
        byte[] random_data = new byte[32];
        for (byte i = 0; i < 32; i++) { random_data[i] = i; }

        long peer_manager = bindings.PeerManager_new(message_handler, our_node_secret, random_data, logger);

        // Note that we can't rely on finalizer order, so don't bother trying to rely on it here
        bindings.Logger_free(logger);
        bindings.FeeEstimator_free(fee_estimator);
        bindings.BroadcasterInterface_free(tx_broadcaster);
        bindings.ManyChannelMonitor_free(chain_monitor);
        bindings.KeysManager_free(keys);
        bindings.KeysInterface_free(keys_interface);
        bindings.ChannelManager_free(chan_manager);
        bindings.ChannelMessageHandler_free(chan_handler);
        bindings.ChainWatchInterface_free(chain_watch);
        bindings.NetGraphMsgHandler_free(router);
        bindings.RoutingMessageHandler_free(route_handler);
        //bindings.MessageHandler_free(message_handler);
        bindings.PeerManager_free(peer_manager);
    }
}
