package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Arguments for the creation of a ChannelManager that are not deserialized.
 * 
 * At a high-level, the process for deserializing a ChannelManager and resuming normal operation
 * is:
 * 1) Deserialize all stored ChannelMonitors.
 * 2) Deserialize the ChannelManager by filling in this struct and calling:
 * <(BlockHash, ChannelManager)>::read(reader, args)
 * This may result in closing some Channels if the ChannelMonitor is newer than the stored
 * ChannelManager state to ensure no loss of funds. Thus, transactions may be broadcasted.
 * 3) If you are not fetching full blocks, register all relevant ChannelMonitor outpoints the same
 * way you would handle a `chain::Filter` call using ChannelMonitor::get_outputs_to_watch() and
 * ChannelMonitor::get_funding_txo().
 * 4) Reconnect blocks on your ChannelMonitors.
 * 5) Disconnect/connect blocks on the ChannelManager.
 * 6) Move the ChannelMonitors into your local chain::Watch.
 * 
 * Note that the ordering of #4-6 is not of importance, however all three must occur before you
 * call any other methods on the newly-deserialized ChannelManager.
 * 
 * Note that because some channels may be closed during deserialization, it is critical that you
 * always deserialize only the latest version of a ChannelManager and ChannelMonitors available to
 * you. If you deserialize an old ChannelManager (during which force-closure transactions may be
 * broadcast), and then later deserialize a newer version of the same ChannelManager (which will
 * not force-close the same channels but consider them live), you may end up revoking a state for
 * which you've already broadcasted the transaction.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelManagerReadArgs extends CommonBase {
	ChannelManagerReadArgs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelManagerReadArgs_free(ptr); }
	}

	/**
	 * The keys provider which will give us relevant keys. Some keys will be loaded during
	 * deserialization and KeysInterface::read_chan_signer will be used to read per-Channel
	 * signing data.
	 */
	public KeysInterface get_keys_manager() {
		long ret = bindings.ChannelManagerReadArgs_get_keys_manager(this.ptr);
		KeysInterface ret_hu_conv = new KeysInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The keys provider which will give us relevant keys. Some keys will be loaded during
	 * deserialization and KeysInterface::read_chan_signer will be used to read per-Channel
	 * signing data.
	 */
	public void set_keys_manager(KeysInterface val) {
		bindings.ChannelManagerReadArgs_set_keys_manager(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	/**
	 * The fee_estimator for use in the ChannelManager in the future.
	 * 
	 * No calls to the FeeEstimator will be made during deserialization.
	 */
	public FeeEstimator get_fee_estimator() {
		long ret = bindings.ChannelManagerReadArgs_get_fee_estimator(this.ptr);
		FeeEstimator ret_hu_conv = new FeeEstimator(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The fee_estimator for use in the ChannelManager in the future.
	 * 
	 * No calls to the FeeEstimator will be made during deserialization.
	 */
	public void set_fee_estimator(FeeEstimator val) {
		bindings.ChannelManagerReadArgs_set_fee_estimator(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	/**
	 * The chain::Watch for use in the ChannelManager in the future.
	 * 
	 * No calls to the chain::Watch will be made during deserialization. It is assumed that
	 * you have deserialized ChannelMonitors separately and will add them to your
	 * chain::Watch after deserializing this ChannelManager.
	 */
	public Watch get_chain_monitor() {
		long ret = bindings.ChannelManagerReadArgs_get_chain_monitor(this.ptr);
		Watch ret_hu_conv = new Watch(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The chain::Watch for use in the ChannelManager in the future.
	 * 
	 * No calls to the chain::Watch will be made during deserialization. It is assumed that
	 * you have deserialized ChannelMonitors separately and will add them to your
	 * chain::Watch after deserializing this ChannelManager.
	 */
	public void set_chain_monitor(Watch val) {
		bindings.ChannelManagerReadArgs_set_chain_monitor(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	/**
	 * The BroadcasterInterface which will be used in the ChannelManager in the future and may be
	 * used to broadcast the latest local commitment transactions of channels which must be
	 * force-closed during deserialization.
	 */
	public BroadcasterInterface get_tx_broadcaster() {
		long ret = bindings.ChannelManagerReadArgs_get_tx_broadcaster(this.ptr);
		BroadcasterInterface ret_hu_conv = new BroadcasterInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The BroadcasterInterface which will be used in the ChannelManager in the future and may be
	 * used to broadcast the latest local commitment transactions of channels which must be
	 * force-closed during deserialization.
	 */
	public void set_tx_broadcaster(BroadcasterInterface val) {
		bindings.ChannelManagerReadArgs_set_tx_broadcaster(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	/**
	 * The Logger for use in the ChannelManager and which may be used to log information during
	 * deserialization.
	 */
	public Logger get_logger() {
		long ret = bindings.ChannelManagerReadArgs_get_logger(this.ptr);
		Logger ret_hu_conv = new Logger(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The Logger for use in the ChannelManager and which may be used to log information during
	 * deserialization.
	 */
	public void set_logger(Logger val) {
		bindings.ChannelManagerReadArgs_set_logger(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	/**
	 * Default settings used for new channels. Any existing channels will continue to use the
	 * runtime settings which were stored when the ChannelManager was serialized.
	 */
	public UserConfig get_default_config() {
		long ret = bindings.ChannelManagerReadArgs_get_default_config(this.ptr);
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Default settings used for new channels. Any existing channels will continue to use the
	 * runtime settings which were stored when the ChannelManager was serialized.
	 */
	public void set_default_config(UserConfig val) {
		bindings.ChannelManagerReadArgs_set_default_config(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Simple utility function to create a ChannelManagerReadArgs which creates the monitor
	 * HashMap for you. This is primarily useful for C bindings where it is not practical to
	 * populate a HashMap directly from C.
	 */
	public static ChannelManagerReadArgs of(KeysInterface keys_manager, FeeEstimator fee_estimator, Watch chain_monitor, BroadcasterInterface tx_broadcaster, Logger logger, UserConfig default_config, ChannelMonitor[] channel_monitors) {
		long ret = bindings.ChannelManagerReadArgs_new(keys_manager == null ? 0 : keys_manager.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, chain_monitor == null ? 0 : chain_monitor.ptr, tx_broadcaster == null ? 0 : tx_broadcaster.ptr, logger == null ? 0 : logger.ptr, default_config == null ? 0 : default_config.ptr & ~1, Arrays.stream(channel_monitors).mapToLong(channel_monitors_conv_16 -> channel_monitors_conv_16 == null ? 0 : channel_monitors_conv_16.ptr & ~1).toArray());
		ChannelManagerReadArgs ret_hu_conv = new ChannelManagerReadArgs(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(keys_manager);
		ret_hu_conv.ptrs_to.add(fee_estimator);
		ret_hu_conv.ptrs_to.add(chain_monitor);
		ret_hu_conv.ptrs_to.add(tx_broadcaster);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(default_config);
		/* TODO 2 ChannelMonitor  */;
		return ret_hu_conv;
	}

}
