package org.ldk;

import org.junit.jupiter.api.Test;
import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.structs.Record;

public class ManualMsgHandlingPeerTest {
    @Test
    void test_message_handler() {
        long logger = bindings.LDKLogger_new((long arg)->{
            System.out.println(bindings.Record_get_args(arg));
            bindings.Record_free(arg);
        });
        long chan_handler = bindings.LDKChannelMessageHandler_new(new bindings.LDKChannelMessageHandler() {
            @Override
            public void handle_open_channel(byte[] their_node_id, long their_features, long msg) {

            }

            @Override
            public void handle_accept_channel(byte[] their_node_id, long their_features, long msg) {

            }

            @Override
            public void handle_funding_created(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_funding_signed(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_funding_locked(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_shutdown(byte[] their_node_id, long their_features, long msg) {

            }

            @Override
            public void handle_closing_signed(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_update_add_htlc(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_update_fulfill_htlc(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_update_fail_htlc(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_update_fail_malformed_htlc(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_commitment_signed(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_revoke_and_ack(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_update_fee(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_announcement_signatures(byte[] their_node_id, long msg) {

            }

            @Override
            public void peer_disconnected(byte[] their_node_id, boolean no_connection_possible) {

            }

            @Override
            public void peer_connected(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_channel_reestablish(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_channel_update(byte[] their_node_id, long msg) {

            }

            @Override
            public void handle_error(byte[] their_node_id, long msg) {

            }
        }, () -> new long[0]);
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
            @Override public long[] get_next_channel_announcements(long starting_point, byte batch_amount) {
                return new long[0];
            }
            @Override public long[] get_next_node_announcements(byte[] starting_point, byte batch_amount) {
                return new long[0];
            }

            @Override public void peer_connected(byte[] their_node_id, long init) { }

            @Override
            public long handle_reply_channel_range(byte[] their_node_id, long msg) {
                return 0;
            }

            @Override
            public long handle_reply_short_channel_ids_end(byte[] their_node_id, long msg) {
                return 0;
            }

            @Override
            public long handle_query_channel_range(byte[] their_node_id, long msg) {
                return 0;
            }

            @Override
            public long handle_query_short_channel_ids(byte[] their_node_id, long msg) {
                return 0;
            }
        }, () -> new long[0]);
        long message_handler = bindings.MessageHandler_new(chan_handler, route_handler);
        byte[] our_node_secret = new byte[32];
        byte[] random_data = new byte[32];
        for (byte i = 0; i < 32; i++) { random_data[i] = i; our_node_secret[i] = (byte) (i ^ 0xff); }

        long ignoring_message_handler = bindings.IgnoringMessageHandler_new();
        long peer_manager = bindings.PeerManager_new(message_handler, our_node_secret, random_data, logger,
                bindings.IgnoringMessageHandler_as_CustomMessageHandler(ignoring_message_handler));

        // Test Level_max() since its the only place we create a java object from a Rust-returned enum.
        assert bindings.Level_max() == Level.LDKLevel_Gossip;

        // Note that we can't rely on finalizer order, so don't bother trying to rely on it here
        bindings.Logger_free(logger);
        bindings.ChannelMessageHandler_free(chan_handler);
        bindings.RoutingMessageHandler_free(route_handler);
        //bindings.MessageHandler_free(message_handler);
        bindings.PeerManager_free(peer_manager);
    }
}
