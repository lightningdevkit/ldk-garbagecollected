package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * The `Watch` trait defines behavior for watching on-chain activity pertaining to channels as
 * blocks are connected and disconnected.
 * 
 * Each channel is associated with a [`ChannelMonitor`]. Implementations of this trait are
 * responsible for maintaining a set of monitors such that they can be updated accordingly as
 * channel state changes and HTLCs are resolved. See method documentation for specific
 * requirements.
 * 
 * Implementations **must** ensure that updates are successfully applied and persisted upon method
 * completion. If an update fails with a [`PermanentFailure`], then it must immediately shut down
 * without taking any further action such as persisting the current state.
 * 
 * If an implementation maintains multiple instances of a channel's monitor (e.g., by storing
 * backup copies), then it must ensure that updates are applied across all instances. Otherwise, it
 * could result in a revoked transaction being broadcast, allowing the counterparty to claim all
 * funds in the channel. See [`ChannelMonitorUpdateStatus`] for more details about how to handle
 * multiple instances.
 * 
 * [`PermanentFailure`]: ChannelMonitorUpdateStatus::PermanentFailure
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Watch extends CommonBase {
	final bindings.LDKWatch bindings_instance;
	Watch(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Watch(bindings.LDKWatch arg) {
		super(bindings.LDKWatch_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Watch_free(ptr); } super.finalize();
	}

	public static interface WatchInterface {
		/**
		 * Watches a channel identified by `funding_txo` using `monitor`.
		 * 
		 * Implementations are responsible for watching the chain for the funding transaction along
		 * with any spends of outputs returned by [`get_outputs_to_watch`]. In practice, this means
		 * calling [`block_connected`] and [`block_disconnected`] on the monitor.
		 * 
		 * Note: this interface MUST error with [`ChannelMonitorUpdateStatus::PermanentFailure`] if
		 * the given `funding_txo` has previously been registered via `watch_channel`.
		 * 
		 * [`get_outputs_to_watch`]: channelmonitor::ChannelMonitor::get_outputs_to_watch
		 * [`block_connected`]: channelmonitor::ChannelMonitor::block_connected
		 * [`block_disconnected`]: channelmonitor::ChannelMonitor::block_disconnected
		 */
		ChannelMonitorUpdateStatus watch_channel(OutPoint funding_txo, ChannelMonitor monitor);
		/**
		 * Updates a channel identified by `funding_txo` by applying `update` to its monitor.
		 * 
		 * Implementations must call [`update_monitor`] with the given update. See
		 * [`ChannelMonitorUpdateStatus`] for invariants around returning an error.
		 * 
		 * [`update_monitor`]: channelmonitor::ChannelMonitor::update_monitor
		 */
		ChannelMonitorUpdateStatus update_channel(OutPoint funding_txo, ChannelMonitorUpdate update);
		/**
		 * Returns any monitor events since the last call. Subsequent calls must only return new
		 * events.
		 * 
		 * Note that after any block- or transaction-connection calls to a [`ChannelMonitor`], no
		 * further events may be returned here until the [`ChannelMonitor`] has been fully persisted
		 * to disk.
		 * 
		 * For details on asynchronous [`ChannelMonitor`] updating and returning
		 * [`MonitorEvent::Completed`] here, see [`ChannelMonitorUpdateStatus::InProgress`].
		 */
		ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[] release_pending_monitor_events();
	}
	private static class LDKWatchHolder { Watch held; }
	public static Watch new_impl(WatchInterface arg) {
		final LDKWatchHolder impl_holder = new LDKWatchHolder();
		impl_holder.held = new Watch(new bindings.LDKWatch() {
			@Override public ChannelMonitorUpdateStatus watch_channel(long funding_txo, long monitor) {
				org.ldk.structs.OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, funding_txo); }
				if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitor monitor_hu_conv = null; if (monitor < 0 || monitor > 4096) { monitor_hu_conv = new org.ldk.structs.ChannelMonitor(null, monitor); }
				if (monitor_hu_conv != null) { monitor_hu_conv.ptrs_to.add(this); };
				ChannelMonitorUpdateStatus ret = arg.watch_channel(funding_txo_hu_conv, monitor_hu_conv);
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public ChannelMonitorUpdateStatus update_channel(long funding_txo, long update) {
				org.ldk.structs.OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, funding_txo); }
				if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitorUpdate update_hu_conv = null; if (update < 0 || update > 4096) { update_hu_conv = new org.ldk.structs.ChannelMonitorUpdate(null, update); }
				if (update_hu_conv != null) { update_hu_conv.ptrs_to.add(this); };
				ChannelMonitorUpdateStatus ret = arg.update_channel(funding_txo_hu_conv, update_hu_conv);
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public long[] release_pending_monitor_events() {
				ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[] ret = arg.release_pending_monitor_events();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_49 -> ret_conv_49 == null ? 0 : ret_conv_49.clone_ptr()).toArray() : null;
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Watches a channel identified by `funding_txo` using `monitor`.
	 * 
	 * Implementations are responsible for watching the chain for the funding transaction along
	 * with any spends of outputs returned by [`get_outputs_to_watch`]. In practice, this means
	 * calling [`block_connected`] and [`block_disconnected`] on the monitor.
	 * 
	 * Note: this interface MUST error with [`ChannelMonitorUpdateStatus::PermanentFailure`] if
	 * the given `funding_txo` has previously been registered via `watch_channel`.
	 * 
	 * [`get_outputs_to_watch`]: channelmonitor::ChannelMonitor::get_outputs_to_watch
	 * [`block_connected`]: channelmonitor::ChannelMonitor::block_connected
	 * [`block_disconnected`]: channelmonitor::ChannelMonitor::block_disconnected
	 */
	public ChannelMonitorUpdateStatus watch_channel(org.ldk.structs.OutPoint funding_txo, org.ldk.structs.ChannelMonitor monitor) {
		ChannelMonitorUpdateStatus ret = bindings.Watch_watch_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr, monitor == null ? 0 : monitor.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(monitor);
		if (this != null) { this.ptrs_to.add(funding_txo); };
		if (this != null) { this.ptrs_to.add(monitor); };
		return ret;
	}

	/**
	 * Updates a channel identified by `funding_txo` by applying `update` to its monitor.
	 * 
	 * Implementations must call [`update_monitor`] with the given update. See
	 * [`ChannelMonitorUpdateStatus`] for invariants around returning an error.
	 * 
	 * [`update_monitor`]: channelmonitor::ChannelMonitor::update_monitor
	 */
	public ChannelMonitorUpdateStatus update_channel(org.ldk.structs.OutPoint funding_txo, org.ldk.structs.ChannelMonitorUpdate update) {
		ChannelMonitorUpdateStatus ret = bindings.Watch_update_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr, update == null ? 0 : update.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(update);
		if (this != null) { this.ptrs_to.add(funding_txo); };
		if (this != null) { this.ptrs_to.add(update); };
		return ret;
	}

	/**
	 * Returns any monitor events since the last call. Subsequent calls must only return new
	 * events.
	 * 
	 * Note that after any block- or transaction-connection calls to a [`ChannelMonitor`], no
	 * further events may be returned here until the [`ChannelMonitor`] has been fully persisted
	 * to disk.
	 * 
	 * For details on asynchronous [`ChannelMonitor`] updating and returning
	 * [`MonitorEvent::Completed`] here, see [`ChannelMonitorUpdateStatus::InProgress`].
	 */
	public ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[] release_pending_monitor_events() {
		long[] ret = bindings.Watch_release_pending_monitor_events(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_49_len = ret.length;
		ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[] ret_conv_49_arr = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = ret[x];
			ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ ret_conv_49_hu_conv = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.add(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		return ret_conv_49_arr;
	}

}
