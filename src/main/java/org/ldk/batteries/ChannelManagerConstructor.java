package org.ldk.batteries;

import org.jetbrains.annotations.Nullable;
import org.ldk.enums.LDKNetwork;
import org.ldk.structs.*;
import org.ldk.util.TwoTuple;


/**
 * A simple utility class which assists in constructing a fresh or deserializing from disk a ChannelManager and one or
 * more ChannelMonitors.
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
    public final TwoTuple<ChannelMonitor, byte[]>[] channel_monitors;

    private final ChainMonitor chain_monitor;

    /**
     * Deserializes a channel manager and a set of channel monitors from the given serialized copies and interface implementations
     *
     * @param filter If provided, the outputs which were previously registered to be monitored for will be loaded into the filter.
     *               Note that if the provided Watch is a ChainWatch and has an associated filter, the previously registered
     *               outputs will be loaded when chain_sync_completed is called.
     */
    public ChannelManagerConstructor(byte[] channel_manager_serialized, byte[][] channel_monitors_serialized,
                                     KeysInterface keys_interface, FeeEstimator fee_estimator, ChainMonitor chain_monitor, @Nullable Filter filter,
                                     BroadcasterInterface tx_broadcaster, Logger logger) throws InvalidSerializedDataException {
        final ChannelMonitor[] monitors = new ChannelMonitor[channel_monitors_serialized.length];
        this.channel_monitors = new TwoTuple[monitors.length];
        for (int i = 0; i < monitors.length; i++) {
            Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ res = UtilMethods.constructor_BlockHashChannelMonitorZ_read(channel_monitors_serialized[i], keys_interface);
            if (res instanceof Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err) {
                throw new InvalidSerializedDataException();
            }
            monitors[i] = ((Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK) res).res.b;
            this.channel_monitors[i] = new TwoTuple<>(monitors[i], ((Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK)res).res.a);
        }
        Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ res =
                UtilMethods.constructor_BlockHashChannelManagerZ_read(channel_manager_serialized, keys_interface, fee_estimator, chain_monitor.as_Watch(), tx_broadcaster,
                        logger, UserConfig.constructor_default(), monitors);
        if (res instanceof Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err) {
            throw new InvalidSerializedDataException();
        }
        this.channel_manager = ((Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK)res).res.b;
        this.channel_manager_latest_block_hash = ((Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK)res).res.a;
        this.chain_monitor = chain_monitor;
        if (filter != null) {
            for (ChannelMonitor monitor : monitors) {
                monitor.load_outputs_to_watch(filter);
            }
        }
    }

    /**
     * Constructs a channel manager from the given interface implementations
     */
    public ChannelManagerConstructor(LDKNetwork network, UserConfig config, byte[] current_blockchain_tip_hash, int current_blockchain_tip_height,
                                     KeysInterface keys_interface, FeeEstimator fee_estimator, ChainMonitor chain_monitor,
                                     BroadcasterInterface tx_broadcaster, Logger logger) throws InvalidSerializedDataException {
        channel_monitors = new TwoTuple[0];
        channel_manager_latest_block_hash = null;
        this.chain_monitor = chain_monitor;
        BestBlock block = BestBlock.constructor_new(current_blockchain_tip_hash, current_blockchain_tip_height);
        channel_manager = ChannelManager.constructor_new(fee_estimator, chain_monitor.as_Watch(), tx_broadcaster, logger, keys_interface, config, network, block);
    }

    /**
     * Abstract interface which should handle Events and persist the ChannelManager. When you call chain_sync_completed
     * a background thread is started which will automatically call these methods for you when events occur.
     */
    public interface ChannelManagerPersister {
        void handle_events(Event[] events);
        void persist_manager(byte[] channel_manager_bytes);
    }

    Thread persister_thread = null;
    volatile boolean shutdown = false;

    /**
     * Utility which adds all of the deserialized ChannelMonitors to the chain watch so that further updates from the
     * ChannelManager are processed as normal.
     *
     * This also spawns a background thread which will call the appropriate methods on the provided
     * ChannelManagerPersister as required.
     */
    public void chain_sync_completed(ChannelManagerPersister persister) {
        if (persister_thread != null) { return; }
        for (TwoTuple<ChannelMonitor, byte[]> monitor: channel_monitors) {
            this.chain_monitor.as_Watch().watch_channel(monitor.a.get_funding_txo().a, monitor.a);
        }
        persister_thread = new Thread(() -> {
            long lastTimerTick = System.currentTimeMillis();
            while (true) {
                boolean need_persist = this.channel_manager.await_persistable_update_timeout(1);
                Event[] events = this.channel_manager.as_EventsProvider().get_and_clear_pending_events();
                if (events.length != 0) {
                    persister.handle_events(events);
                    need_persist = true;
                }
                events = this.chain_monitor.as_EventsProvider().get_and_clear_pending_events();

                if (events.length != 0) {
                    persister.handle_events(events);
                    need_persist = true;
                }
                if (need_persist) {
                    persister.persist_manager(this.channel_manager.write());
                }
                if (shutdown) {
                    return;
                }
                if (lastTimerTick < System.currentTimeMillis() - 60 * 1000) {
                    this.channel_manager.timer_tick_occurred();
                    lastTimerTick = System.currentTimeMillis();
                }
            }
        }, "NioPeerHandler NIO Thread");
        persister_thread.start();
    }

    /**
     * Interrupt the background thread, stopping the background handling of
     */
    public void interrupt() {
        shutdown = true;
        try {
            persister_thread.join();
        } catch (InterruptedException ignored) { }
    }
}
