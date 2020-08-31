package org.ldk;

import org.junit.jupiter.api.Test;
import org.ldk.impl.bindings;

public class PeerTest {
    @Test
    void test_message_handler() {
        long logger = bindings.LDKLogger_new((String arg)->{
            System.out.println(arg);
        });
        long chan_handler = bindings.LDKChannelMessageHandler_new(new bindings.LDKChannelMessageHandler() {
            @Override
            public void handle_open_channel(long their_node_id, long their_features, long msg) {

            }

            @Override
            public void handle_accept_channel(long their_node_id, long their_features, long msg) {

            }

            @Override
            public void handle_funding_created(long their_node_id, long msg) {

            }

            @Override
            public void handle_funding_signed(long their_node_id, long msg) {

            }

            @Override
            public void handle_funding_locked(long their_node_id, long msg) {

            }

            @Override
            public void handle_shutdown(long their_node_id, long msg) {

            }

            @Override
            public void handle_closing_signed(long their_node_id, long msg) {

            }

            @Override
            public void handle_update_add_htlc(long their_node_id, long msg) {

            }

            @Override
            public void handle_update_fulfill_htlc(long their_node_id, long msg) {

            }

            @Override
            public void handle_update_fail_htlc(long their_node_id, long msg) {

            }

            @Override
            public void handle_update_fail_malformed_htlc(long their_node_id, long msg) {

            }

            @Override
            public void handle_commitment_signed(long their_node_id, long msg) {

            }

            @Override
            public void handle_revoke_and_ack(long their_node_id, long msg) {

            }

            @Override
            public void handle_update_fee(long their_node_id, long msg) {

            }

            @Override
            public void handle_announcement_signatures(long their_node_id, long msg) {

            }

            @Override
            public void peer_disconnected(long their_node_id, boolean no_connection_possible) {

            }

            @Override
            public void peer_connected(long their_node_id, long msg) {

            }

            @Override
            public void handle_channel_reestablish(long their_node_id, long msg) {

            }

            @Override
            public void handle_error(long their_node_id, long msg) {

            }
        }, () -> 0);
        long route_handler = bindings.LDKRoutingMessageHandler_new(new bindings.LDKRoutingMessageHandler() {
            @Override public long handle_node_announcement(long msg) {
                return 0;
            }
            @Override public long handle_channel_announcement(long msg) {
                return 0;
            }
            @Override public long handle_channel_update(long msg) {
                return 0;
            }
            @Override public void handle_htlc_fail_channel_update(long update) {

            }
            @Override public long get_next_channel_announcements(long starting_point, byte batch_amount) {
                return 0;
            }
            @Override public long get_next_node_announcements(long starting_point, byte batch_amount) {
                return 0;
            }
            @Override public boolean should_request_full_sync(long node_id) {
                return false;
            }
        });
        long message_handler = bindings.MessageHandler_new(chan_handler, route_handler);
        long our_node_secret = bindings.LDKSecretKey_new(); //TODO: Need LDKSecretKey constructor
        byte[] random_data = new byte[32];
        for (byte i = 0; i < 32; i++) { random_data[i] = i; }

        long peer_manager = bindings.PeerManager_new(message_handler, our_node_secret, random_data, logger);

        // Note that we can't rely on finalizer order, so don't bother trying to rely on it here
        bindings.Logger_free(logger);
        bindings.ChannelMessageHandler_free(chan_handler);
        bindings.RoutingMessageHandler_free(route_handler);
        //bindings.MessageHandler_free(message_handler);
        bindings.PeerManager_free(peer_manager);
    }
}
