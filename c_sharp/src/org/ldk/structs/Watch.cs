using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

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
public class Watch : CommonBase {
	internal readonly bindings.LDKWatch bindings_instance;
	internal Watch(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Watch(bindings.LDKWatch arg) : base(bindings.LDKWatch_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Watch() {
		if (ptr != 0) { bindings.Watch_free(ptr); }
	}

	public interface WatchInterface {
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
		ChannelMonitorUpdateStatus watch_channel(OutPoint _funding_txo, ChannelMonitor _monitor);
		/**
		 * Updates a channel identified by `funding_txo` by applying `update` to its monitor.
		 * 
		 * Implementations must call [`update_monitor`] with the given update. See
		 * [`ChannelMonitorUpdateStatus`] for invariants around returning an error.
		 * 
		 * [`update_monitor`]: channelmonitor::ChannelMonitor::update_monitor
		 */
		ChannelMonitorUpdateStatus update_channel(OutPoint _funding_txo, ChannelMonitorUpdate _update);
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
	private class LDKWatchHolder { internal Watch held; }
	private class LDKWatchImpl : bindings.LDKWatch {
		internal LDKWatchImpl(WatchInterface arg, LDKWatchHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private WatchInterface arg;
		private LDKWatchHolder impl_holder;
		public ChannelMonitorUpdateStatus watch_channel(long _funding_txo, long _monitor) {
			org.ldk.structs.OutPoint _funding_txo_hu_conv = null; if (_funding_txo < 0 || _funding_txo > 4096) { _funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, _funding_txo); }
			if (_funding_txo_hu_conv != null) { _funding_txo_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ChannelMonitor _monitor_hu_conv = null; if (_monitor < 0 || _monitor > 4096) { _monitor_hu_conv = new org.ldk.structs.ChannelMonitor(null, _monitor); }
			if (_monitor_hu_conv != null) { _monitor_hu_conv.ptrs_to.AddLast(this); };
			ChannelMonitorUpdateStatus ret = arg.watch_channel(_funding_txo_hu_conv, _monitor_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
		public ChannelMonitorUpdateStatus update_channel(long _funding_txo, long _update) {
			org.ldk.structs.OutPoint _funding_txo_hu_conv = null; if (_funding_txo < 0 || _funding_txo > 4096) { _funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, _funding_txo); }
			if (_funding_txo_hu_conv != null) { _funding_txo_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ChannelMonitorUpdate _update_hu_conv = null; if (_update < 0 || _update > 4096) { _update_hu_conv = new org.ldk.structs.ChannelMonitorUpdate(null, _update); }
			ChannelMonitorUpdateStatus ret = arg.update_channel(_funding_txo_hu_conv, _update_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
		public long[] release_pending_monitor_events() {
			ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[] ret = arg.release_pending_monitor_events();
				GC.KeepAlive(arg);
			long[] result = ret != null ? InternalUtils.mapArray(ret, ret_conv_49 => ret_conv_49 == null ? 0 : ret_conv_49.clone_ptr()) : null;
			return result;
		}
	}
	public static Watch new_impl(WatchInterface arg) {
		LDKWatchHolder impl_holder = new LDKWatchHolder();
		impl_holder.held = new Watch(new LDKWatchImpl(arg, impl_holder));
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
		GC.KeepAlive(this);
		GC.KeepAlive(funding_txo);
		GC.KeepAlive(monitor);
		if (this != null) { this.ptrs_to.AddLast(funding_txo); };
		if (this != null) { this.ptrs_to.AddLast(monitor); };
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
		GC.KeepAlive(this);
		GC.KeepAlive(funding_txo);
		GC.KeepAlive(update);
		if (this != null) { this.ptrs_to.AddLast(funding_txo); };
		if (this != null) { this.ptrs_to.AddLast(update); };
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
		GC.KeepAlive(this);
		int ret_conv_49_len = ret.Length;
		ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[] ret_conv_49_arr = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = ret[x];
			ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ ret_conv_49_hu_conv = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		return ret_conv_49_arr;
	}

}
} } }
