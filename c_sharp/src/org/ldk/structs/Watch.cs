
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Watch */
public interface WatchInterface {
	/**Watches a channel identified by `funding_txo` using `monitor`.
	 * 
	 * Implementations are responsible for watching the chain for the funding transaction along
	 * with any spends of outputs returned by [`get_outputs_to_watch`]. In practice, this means
	 * calling [`block_connected`] and [`block_disconnected`] on the monitor.
	 * 
	 * A return of `Err(())` indicates that the channel should immediately be force-closed without
	 * broadcasting the funding transaction.
	 * 
	 * If the given `funding_txo` has previously been registered via `watch_channel`, `Err(())`
	 * must be returned.
	 * 
	 * [`get_outputs_to_watch`]: channelmonitor::ChannelMonitor::get_outputs_to_watch
	 * [`block_connected`]: channelmonitor::ChannelMonitor::block_connected
	 * [`block_disconnected`]: channelmonitor::ChannelMonitor::block_disconnected
	 */
	Result_ChannelMonitorUpdateStatusNoneZ watch_channel(OutPoint funding_txo, ChannelMonitor monitor);
	/**Updates a channel identified by `funding_txo` by applying `update` to its monitor.
	 * 
	 * Implementations must call [`ChannelMonitor::update_monitor`] with the given update. This
	 * may fail (returning an `Err(())`), in which case this should return
	 * [`ChannelMonitorUpdateStatus::InProgress`] (and the update should never complete). This
	 * generally implies the channel has been closed (either by the funding outpoint being spent
	 * on-chain or the [`ChannelMonitor`] having decided to do so and broadcasted a transaction),
	 * and the [`ChannelManager`] state will be updated once it sees the funding spend on-chain.
	 * 
	 * In general, persistence failures should be retried after returning
	 * [`ChannelMonitorUpdateStatus::InProgress`] and eventually complete. If a failure truly
	 * cannot be retried, the node should shut down immediately after returning
	 * [`ChannelMonitorUpdateStatus::UnrecoverableError`], see its documentation for more info.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	ChannelMonitorUpdateStatus update_channel(OutPoint funding_txo, ChannelMonitorUpdate update);
	/**Returns any monitor events since the last call. Subsequent calls must only return new
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

/**
 * The `Watch` trait defines behavior for watching on-chain activity pertaining to channels as
 * blocks are connected and disconnected.
 * 
 * Each channel is associated with a [`ChannelMonitor`]. Implementations of this trait are
 * responsible for maintaining a set of monitors such that they can be updated as channel state
 * changes. On each update, *all copies* of a [`ChannelMonitor`] must be updated and the update
 * persisted to disk to ensure that the latest [`ChannelMonitor`] state can be reloaded if the
 * application crashes.
 * 
 * See method documentation and [`ChannelMonitorUpdateStatus`] for specific requirements.
 */
public class Watch : CommonBase {
	internal bindings.LDKWatch bindings_instance;
	internal long instance_idx;

	internal Watch(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~Watch() {
		if (ptr != 0) { bindings.Watch_free(ptr); }
	}

	private class LDKWatchHolder { internal Watch held; }
	private class LDKWatchImpl : bindings.LDKWatch {
		internal LDKWatchImpl(WatchInterface arg, LDKWatchHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private WatchInterface arg;
		private LDKWatchHolder impl_holder;
		public long watch_channel(long _funding_txo, long _monitor) {
			org.ldk.structs.OutPoint _funding_txo_hu_conv = null; if (_funding_txo < 0 || _funding_txo > 4096) { _funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, _funding_txo); }
			if (_funding_txo_hu_conv != null) { _funding_txo_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ChannelMonitor _monitor_hu_conv = null; if (_monitor < 0 || _monitor > 4096) { _monitor_hu_conv = new org.ldk.structs.ChannelMonitor(null, _monitor); }
			if (_monitor_hu_conv != null) { _monitor_hu_conv.ptrs_to.AddLast(this); };
			Result_ChannelMonitorUpdateStatusNoneZ ret = arg.watch_channel(_funding_txo_hu_conv, _monitor_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public ChannelMonitorUpdateStatus update_channel(long _funding_txo, long _update) {
			org.ldk.structs.OutPoint _funding_txo_hu_conv = null; if (_funding_txo < 0 || _funding_txo > 4096) { _funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, _funding_txo); }
			if (_funding_txo_hu_conv != null) { _funding_txo_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ChannelMonitorUpdate _update_hu_conv = null; if (_update < 0 || _update > 4096) { _update_hu_conv = new org.ldk.structs.ChannelMonitorUpdate(null, _update); }
			ChannelMonitorUpdateStatus ret = arg.update_channel(_funding_txo_hu_conv, _update_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
		public long release_pending_monitor_events() {
			ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[] ret = arg.release_pending_monitor_events();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint64Array(InternalUtils.mapArray(ret, ret_conv_49 => ret_conv_49 == null ? 0 : ret_conv_49.clone_ptr()));
			return result;
		}
	}

	/** Creates a new instance of Watch from a given implementation */
	public static Watch new_impl(WatchInterface arg) {
		LDKWatchHolder impl_holder = new LDKWatchHolder();
		LDKWatchImpl impl = new LDKWatchImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKWatch_new(impl);

		impl_holder.held = new Watch(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Watches a channel identified by `funding_txo` using `monitor`.
	 * 
	 * Implementations are responsible for watching the chain for the funding transaction along
	 * with any spends of outputs returned by [`get_outputs_to_watch`]. In practice, this means
	 * calling [`block_connected`] and [`block_disconnected`] on the monitor.
	 * 
	 * A return of `Err(())` indicates that the channel should immediately be force-closed without
	 * broadcasting the funding transaction.
	 * 
	 * If the given `funding_txo` has previously been registered via `watch_channel`, `Err(())`
	 * must be returned.
	 * 
	 * [`get_outputs_to_watch`]: channelmonitor::ChannelMonitor::get_outputs_to_watch
	 * [`block_connected`]: channelmonitor::ChannelMonitor::block_connected
	 * [`block_disconnected`]: channelmonitor::ChannelMonitor::block_disconnected
	 */
	public Result_ChannelMonitorUpdateStatusNoneZ watch_channel(org.ldk.structs.OutPoint funding_txo, org.ldk.structs.ChannelMonitor monitor) {
		long ret = bindings.Watch_watch_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr, monitor == null ? 0 : monitor.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(funding_txo);
		GC.KeepAlive(monitor);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(funding_txo); };
		if (this != null) { this.ptrs_to.AddLast(monitor); };
		return ret_hu_conv;
	}

	/**
	 * Updates a channel identified by `funding_txo` by applying `update` to its monitor.
	 * 
	 * Implementations must call [`ChannelMonitor::update_monitor`] with the given update. This
	 * may fail (returning an `Err(())`), in which case this should return
	 * [`ChannelMonitorUpdateStatus::InProgress`] (and the update should never complete). This
	 * generally implies the channel has been closed (either by the funding outpoint being spent
	 * on-chain or the [`ChannelMonitor`] having decided to do so and broadcasted a transaction),
	 * and the [`ChannelManager`] state will be updated once it sees the funding spend on-chain.
	 * 
	 * In general, persistence failures should be retried after returning
	 * [`ChannelMonitorUpdateStatus::InProgress`] and eventually complete. If a failure truly
	 * cannot be retried, the node should shut down immediately after returning
	 * [`ChannelMonitorUpdateStatus::UnrecoverableError`], see its documentation for more info.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
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
		long ret = bindings.Watch_release_pending_monitor_events(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_49_len = InternalUtils.getArrayLength(ret);
		ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[] ret_conv_49_arr = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = InternalUtils.getU64ArrayElem(ret, x);
			ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ ret_conv_49_hu_conv = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_49_arr;
	}

}
} } }
