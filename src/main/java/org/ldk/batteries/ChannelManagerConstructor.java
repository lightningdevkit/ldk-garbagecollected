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

    private final Watch chain_watch;

    /**
     * Deserializes a channel manager and a set of channel monitors from the given serialized copies and interface implementations
     *
     * @param filter If provided, the outputs which were previously registered to be monitored for will be loaded into the filter.
     */
    public ChannelManagerConstructor(byte[] channel_manager_serialized, byte[][] channel_monitors_serialized,
                                     KeysInterface keys_interface, FeeEstimator fee_estimator, Watch chain_watch, @Nullable Filter filter,
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
                UtilMethods.constructor_BlockHashChannelManagerZ_read(channel_manager_serialized, keys_interface, fee_estimator, chain_watch, tx_broadcaster,
                        logger, UserConfig.constructor_default(), monitors);
        if (res instanceof Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err) {
            throw new InvalidSerializedDataException();
        }
        this.channel_manager = ((Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK)res).res.b;
        this.channel_manager_latest_block_hash = ((Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK)res).res.a;
        this.chain_watch = chain_watch;
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
                                     KeysInterface keys_interface, FeeEstimator fee_estimator, Watch chain_watch,
                                     BroadcasterInterface tx_broadcaster, Logger logger) throws InvalidSerializedDataException {
        channel_monitors = new TwoTuple[0];
        channel_manager_latest_block_hash = null;
        this.chain_watch = chain_watch;
        channel_manager = ChannelManager.constructor_new(fee_estimator, chain_watch, tx_broadcaster, logger, keys_interface, config, network, current_blockchain_tip_hash, current_blockchain_tip_height);
    }

    /**
     * Utility which adds all of the deserialized ChannelMonitors to the chain watch so that further updates from the
     * ChannelManager are processed as normal.
     */
    public void chain_sync_completed() {
        for (TwoTuple<ChannelMonitor, byte[]> monitor: channel_monitors) {
            this.chain_watch.watch_channel(monitor.a.get_funding_txo().a, monitor.a);
        }
    }
}
