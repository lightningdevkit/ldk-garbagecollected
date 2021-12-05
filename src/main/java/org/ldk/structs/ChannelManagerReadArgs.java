package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Arguments for the creation of a ChannelManager that are not deserialized.
 * 
 * At a high-level, the process for deserializing a ChannelManager and resuming normal operation
 * is:
 * 1) Deserialize all stored [`ChannelMonitor`]s.
 * 2) Deserialize the [`ChannelManager`] by filling in this struct and calling:
 * `<(BlockHash, ChannelManager)>::read(reader, args)`
 * This may result in closing some channels if the [`ChannelMonitor`] is newer than the stored
 * [`ChannelManager`] state to ensure no loss of funds. Thus, transactions may be broadcasted.
 * 3) If you are not fetching full blocks, register all relevant [`ChannelMonitor`] outpoints the
 * same way you would handle a [`chain::Filter`] call using
 * [`ChannelMonitor::get_outputs_to_watch`] and [`ChannelMonitor::get_funding_txo`].
 * 4) Reconnect blocks on your [`ChannelMonitor`]s.
 * 5) Disconnect/connect blocks on the [`ChannelManager`].
 * 6) Re-persist the [`ChannelMonitor`]s to ensure the latest state is on disk.
 * Note that if you're using a [`ChainMonitor`] for your [`chain::Watch`] implementation, you
 * will likely accomplish this as a side-effect of calling [`chain::Watch::watch_channel`] in
 * the next step.
 * 7) Move the [`ChannelMonitor`]s into your local [`chain::Watch`]. If you're using a
 * [`ChainMonitor`], this is done by calling [`chain::Watch::watch_channel`].
 * 
 * Note that the ordering of #4-7 is not of importance, however all four must occur before you
 * call any other methods on the newly-deserialized [`ChannelManager`].
 * 
 * Note that because some channels may be closed during deserialization, it is critical that you
 * always deserialize only the latest version of a ChannelManager and ChannelMonitors available to
 * you. If you deserialize an old ChannelManager (during which force-closure transactions may be
 * broadcast), and then later deserialize a newer version of the same ChannelManager (which will
 * not force-close the same channels but consider them live), you may end up revoking a state for
 * which you've already broadcasted the transaction.
 * 
 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
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
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		this.ptrs_to.add(val);
	}

	/**
	 * The fee_estimator for use in the ChannelManager in the future.
	 * 
	 * No calls to the FeeEstimator will be made during deserialization.
	 */
	public FeeEstimator get_fee_estimator() {
		long ret = bindings.ChannelManagerReadArgs_get_fee_estimator(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		this.ptrs_to.add(val);
	}

	/**
	 * The BroadcasterInterface which will be used in the ChannelManager in the future and may be
	 * used to broadcast the latest local commitment transactions of channels which must be
	 * force-closed during deserialization.
	 */
	public BroadcasterInterface get_tx_broadcaster() {
		long ret = bindings.ChannelManagerReadArgs_get_tx_broadcaster(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		this.ptrs_to.add(val);
	}

	/**
	 * The Logger for use in the ChannelManager and which may be used to log information during
	 * deserialization.
	 */
	public Logger get_logger() {
		long ret = bindings.ChannelManagerReadArgs_get_logger(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		this.ptrs_to.add(val);
	}

	/**
	 * Default settings used for new channels. Any existing channels will continue to use the
	 * runtime settings which were stored when the ChannelManager was serialized.
	 */
	public UserConfig get_default_config() {
		long ret = bindings.ChannelManagerReadArgs_get_default_config(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UserConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Default settings used for new channels. Any existing channels will continue to use the
	 * runtime settings which were stored when the ChannelManager was serialized.
	 */
	public void set_default_config(UserConfig val) {
		bindings.ChannelManagerReadArgs_set_default_config(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Simple utility function to create a ChannelManagerReadArgs which creates the monitor
	 * HashMap for you. This is primarily useful for C bindings where it is not practical to
	 * populate a HashMap directly from C.
	 */
	public static ChannelManagerReadArgs of(KeysInterface keys_manager, FeeEstimator fee_estimator, Watch chain_monitor, BroadcasterInterface tx_broadcaster, Logger logger, UserConfig default_config, ChannelMonitor[] channel_monitors) {
		long ret = bindings.ChannelManagerReadArgs_new(keys_manager == null ? 0 : keys_manager.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, chain_monitor == null ? 0 : chain_monitor.ptr, tx_broadcaster == null ? 0 : tx_broadcaster.ptr, logger == null ? 0 : logger.ptr, default_config == null ? 0 : default_config.ptr & ~1, channel_monitors != null ? Arrays.stream(channel_monitors).mapToLong(channel_monitors_conv_16 -> channel_monitors_conv_16 == null ? 0 : channel_monitors_conv_16.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(keys_manager);
		Reference.reachabilityFence(fee_estimator);
		Reference.reachabilityFence(chain_monitor);
		Reference.reachabilityFence(tx_broadcaster);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(default_config);
		Reference.reachabilityFence(channel_monitors);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelManagerReadArgs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelManagerReadArgs(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(keys_manager);
		ret_hu_conv.ptrs_to.add(fee_estimator);
		ret_hu_conv.ptrs_to.add(chain_monitor);
		ret_hu_conv.ptrs_to.add(tx_broadcaster);
		ret_hu_conv.ptrs_to.add(logger);
		for (ChannelMonitor channel_monitors_conv_16: channel_monitors) { ret_hu_conv.ptrs_to.add(channel_monitors_conv_16); };
		return ret_hu_conv;
	}

}
