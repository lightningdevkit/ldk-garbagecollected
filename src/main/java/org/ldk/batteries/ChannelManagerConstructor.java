package org.ldk.batteries;

import javax.annotation.Nullable;
import org.ldk.enums.Network;
import org.ldk.structs.*;
import org.ldk.util.TwoTuple;

import java.io.IOException;


/**
 * A simple utility class which assists in constructing a fresh or deserializing from disk a ChannelManager and one or
 * more ChannelMonitors.
 *
 * Also constructs a PeerManager and spawns a background thread to monitor for and notify you of relevant Events.
 */
public class ChannelManagerConstructor {
    /**
     * An Exception that indicates the serialized data is invalid and has been corrupted on disk. You should attempt to
     * restore from a backup if there is one which is known to be current. Otherwise, funds may have been lost.
     */
    public static class InvalidSerializedDataException extends Exception {}

    /**
     * The ChannelManager either deserialized or newly-constructed.
     */
    public final ChannelManager channel_manager;
    /**
     * The latest block has the channel manager saw. If this is non-null it is a 32-byte block hash.
     * You should sync the blockchain starting with the block that builds on this block.
     */
    public final byte[] channel_manager_latest_block_hash;
    /**
     * A list of ChannelMonitors and the last block they each saw. You should sync the blockchain on each individually
     * starting with the block that builds on the hash given.
     * After doing so (and syncing the blockchain on the channel manager as well), you should call chain_sync_completed()
     * and then continue to normal application operation.
     */
    public final TwoTuple_BlockHashChannelMonitorZ[] channel_monitors;
    /**
     * A PeerManager which is constructed to pass messages and handle connections to peers.
     */
    public final PeerManager peer_manager;
    /**
     * A NioPeerHandler which manages a background thread to handle socket events and pass them to the peer_manager.
     */
    public final NioPeerHandler nio_peer_handler;

    private final ChainMonitor chain_monitor;

    private final Logger logger;

    public final @Nullable NetGraphMsgHandler router;

    /**
     * Deserializes a channel manager and a set of channel monitors from the given serialized copies and interface implementations
     *
     * @param filter If provided, the outputs which were previously registered to be monitored for will be loaded into the filter.
     *               Note that if the provided Watch is a ChainWatch and has an associated filter, the previously registered
     *               outputs will be loaded when chain_sync_completed is called.
     */
    public ChannelManagerConstructor(byte[] channel_manager_serialized, byte[][] channel_monitors_serialized,
                                     KeysInterface keys_interface, FeeEstimator fee_estimator, ChainMonitor chain_monitor, @Nullable Filter filter,
                                     @Nullable NetGraphMsgHandler router,
                                     BroadcasterInterface tx_broadcaster, Logger logger) throws InvalidSerializedDataException {
        final IgnoringMessageHandler no_custom_messages = IgnoringMessageHandler.of();
        final ChannelMonitor[] monitors = new ChannelMonitor[channel_monitors_serialized.length];
        this.channel_monitors = new TwoTuple_BlockHashChannelMonitorZ[monitors.length];
        for (int i = 0; i < monitors.length; i++) {
            Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ res = UtilMethods.C2Tuple_BlockHashChannelMonitorZ_read(channel_monitors_serialized[i], keys_interface);
            if (res instanceof Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err) {
                throw new InvalidSerializedDataException();
            }
            byte[] block_hash = ((Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK)res).res.get_a();
            monitors[i] = ((Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK) res).res.get_b();
            this.channel_monitors[i] = TwoTuple_BlockHashChannelMonitorZ.of(block_hash, monitors[i]);
        }
        Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ res =
                UtilMethods.C2Tuple_BlockHashChannelManagerZ_read(channel_manager_serialized, keys_interface, fee_estimator, chain_monitor.as_Watch(), tx_broadcaster,
                        logger, UserConfig.with_default(), monitors);
        if (res instanceof Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err) {
            throw new InvalidSerializedDataException();
        }
        this.channel_manager = ((Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK)res).res.get_b();
        this.channel_manager_latest_block_hash = ((Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK)res).res.get_a();
        this.chain_monitor = chain_monitor;
        this.router = router;
        this.logger = logger;
        byte[] random_data = keys_interface.get_secure_random_bytes();
        if (router != null) {
            this.peer_manager = PeerManager.of(channel_manager.as_ChannelMessageHandler(), router.as_RoutingMessageHandler(),
                    keys_interface.get_node_secret(), random_data, logger, no_custom_messages.as_CustomMessageHandler());
        } else {
            this.peer_manager = PeerManager.of(channel_manager.as_ChannelMessageHandler(), (IgnoringMessageHandler.of()).as_RoutingMessageHandler(),
                    keys_interface.get_node_secret(), random_data, logger, no_custom_messages.as_CustomMessageHandler());
        }
        NioPeerHandler nio_peer_handler = null;
        try {
            nio_peer_handler = new NioPeerHandler(this.peer_manager);
        } catch (IOException e) {
            throw new IllegalStateException("We should never fail to construct nio objects unless we're on a platform that cannot run LDK.");
        }
        this.nio_peer_handler = nio_peer_handler;
        if (filter != null) {
            for (ChannelMonitor monitor : monitors) {
                monitor.load_outputs_to_watch(filter);
            }
        }
    }

    /**
     * Constructs a channel manager from the given interface implementations
     */
    public ChannelManagerConstructor(Network network, UserConfig config, byte[] current_blockchain_tip_hash, int current_blockchain_tip_height,
                                     KeysInterface keys_interface, FeeEstimator fee_estimator, ChainMonitor chain_monitor,
                                     @Nullable NetGraphMsgHandler router,
                                     BroadcasterInterface tx_broadcaster, Logger logger) {
        final IgnoringMessageHandler no_custom_messages = IgnoringMessageHandler.of();
        channel_monitors = new TwoTuple_BlockHashChannelMonitorZ[0];
        channel_manager_latest_block_hash = null;
        this.chain_monitor = chain_monitor;
        this.router = router;
        BestBlock block = BestBlock.of(current_blockchain_tip_hash, current_blockchain_tip_height);
        ChainParameters params = ChainParameters.of(network, block);
        channel_manager = ChannelManager.of(fee_estimator, chain_monitor.as_Watch(), tx_broadcaster, logger, keys_interface, config, params);
        this.logger = logger;
        byte[] random_data = keys_interface.get_secure_random_bytes();
        if (router != null) {
            this.peer_manager = PeerManager.of(channel_manager.as_ChannelMessageHandler(), router.as_RoutingMessageHandler(),
                    keys_interface.get_node_secret(), random_data, logger, no_custom_messages.as_CustomMessageHandler());
        } else {
            this.peer_manager = PeerManager.of(channel_manager.as_ChannelMessageHandler(), (IgnoringMessageHandler.of()).as_RoutingMessageHandler(),
                    keys_interface.get_node_secret(), random_data, logger, no_custom_messages.as_CustomMessageHandler());
        }
        NioPeerHandler nio_peer_handler = null;
        try {
            nio_peer_handler = new NioPeerHandler(this.peer_manager);
        } catch (IOException e) {
            throw new IllegalStateException("We should never fail to construct nio objects unless we're on a platform that cannot run LDK.");
        }
        this.nio_peer_handler = nio_peer_handler;
    }

    /**
     * Abstract interface which should handle Events and persist the ChannelManager. When you call chain_sync_completed
     * a background thread is started which will automatically call these methods for you when events occur.
     */
    public interface EventHandler {
        void handle_event(Event events);
        void persist_manager(byte[] channel_manager_bytes);
    }

    BackgroundProcessor background_processor = null;

    /**
     * Utility which adds all of the deserialized ChannelMonitors to the chain watch so that further updates from the
     * ChannelManager are processed as normal.
     *
     * This also spawns a background thread which will call the appropriate methods on the provided
     * EventHandler as required.
     */
    public void chain_sync_completed(EventHandler event_handler) {
        if (background_processor != null) { return; }
        for (TwoTuple_BlockHashChannelMonitorZ monitor: channel_monitors) {
            this.chain_monitor.as_Watch().watch_channel(monitor.get_b().get_funding_txo().get_a(), monitor.get_b());
        }
        background_processor = BackgroundProcessor.start(org.ldk.structs.ChannelManagerPersister.new_impl(channel_manager -> {
            event_handler.persist_manager(channel_manager.write());
            return Result_NoneErrorZ.ok();
        }), org.ldk.structs.EventHandler.new_impl(event_handler::handle_event),
        this.chain_monitor, this.channel_manager, this.router, this.peer_manager, this.logger);
    }

    /**
     * Interrupt the background thread, stopping the background handling of events.
     */
    public void interrupt() {
        this.background_processor.stop();
        this.nio_peer_handler.interrupt();
    }
}
