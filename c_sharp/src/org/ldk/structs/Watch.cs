
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Watch */
public interface WatchInterface {
	/**Watches a channel identified by `channel_id` using `monitor`.
	 * 
	 * Implementations are responsible for watching the chain for the funding transaction along
	 * with any spends of outputs returned by [`get_outputs_to_watch`]. In practice, this means
	 * calling [`block_connected`] and [`blocks_disconnected`] on the monitor.
	 * 
	 * A return of `Err(())` indicates that the channel should immediately be force-closed without
	 * broadcasting the funding transaction.
	 * 
	 * If the given `channel_id` has previously been registered via `watch_channel`, `Err(())`
	 * must be returned.
	 * 
	 * [`get_outputs_to_watch`]: channelmonitor::ChannelMonitor::get_outputs_to_watch
	 * [`block_connected`]: channelmonitor::ChannelMonitor::block_connected
	 * [`blocks_disconnected`]: channelmonitor::ChannelMonitor::blocks_disconnected
	 */
	Result_ChannelMonitorUpdateStatusNoneZ watch_channel(org.ldk.structs.ChannelId channel_id, org.ldk.structs.ChannelMonitor monitor);
	/**Updates a channel identified by `channel_id` by applying `update` to its monitor.
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
	ChannelMonitorUpdateStatus update_channel(org.ldk.structs.ChannelId channel_id, org.ldk.structs.ChannelMonitorUpdate update);
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
	FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] release_pending_monitor_events();
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
		public long watch_channel(long _channel_id, long _monitor) {
			org.ldk.structs.ChannelId _channel_id_hu_conv = null; if (_channel_id < 0 || _channel_id > 4096) { _channel_id_hu_conv = new org.ldk.structs.ChannelId(null, _channel_id); }
			if (_channel_id_hu_conv != null) { _channel_id_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ChannelMonitor _monitor_hu_conv = null; if (_monitor < 0 || _monitor > 4096) { _monitor_hu_conv = new org.ldk.structs.ChannelMonitor(null, _monitor); }
			if (_monitor_hu_conv != null) { _monitor_hu_conv.ptrs_to.AddLast(this); };
			Result_ChannelMonitorUpdateStatusNoneZ ret = arg.watch_channel(_channel_id_hu_conv, _monitor_hu_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public ChannelMonitorUpdateStatus update_channel(long _channel_id, long _update) {
			org.ldk.structs.ChannelId _channel_id_hu_conv = null; if (_channel_id < 0 || _channel_id > 4096) { _channel_id_hu_conv = new org.ldk.structs.ChannelId(null, _channel_id); }
			if (_channel_id_hu_conv != null) { _channel_id_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ChannelMonitorUpdate _update_hu_conv = null; if (_update < 0 || _update > 4096) { _update_hu_conv = new org.ldk.structs.ChannelMonitorUpdate(null, _update); }
			ChannelMonitorUpdateStatus ret = arg.update_channel(_channel_id_hu_conv, _update_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
		public long release_pending_monitor_events() {
			FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] ret = arg.release_pending_monitor_events();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint64Array(InternalUtils.mapArray(ret, ret_conv_57 => ret_conv_57.clone_ptr()));
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
	 * Watches a channel identified by `channel_id` using `monitor`.
	 * 
	 * Implementations are responsible for watching the chain for the funding transaction along
	 * with any spends of outputs returned by [`get_outputs_to_watch`]. In practice, this means
	 * calling [`block_connected`] and [`blocks_disconnected`] on the monitor.
	 * 
	 * A return of `Err(())` indicates that the channel should immediately be force-closed without
	 * broadcasting the funding transaction.
	 * 
	 * If the given `channel_id` has previously been registered via `watch_channel`, `Err(())`
	 * must be returned.
	 * 
	 * [`get_outputs_to_watch`]: channelmonitor::ChannelMonitor::get_outputs_to_watch
	 * [`block_connected`]: channelmonitor::ChannelMonitor::block_connected
	 * [`blocks_disconnected`]: channelmonitor::ChannelMonitor::blocks_disconnected
	 */
	public org.ldk.structs.Result_ChannelMonitorUpdateStatusNoneZ watch_channel(org.ldk.structs.ChannelId channel_id, org.ldk.structs.ChannelMonitor monitor) {
		long ret = bindings.Watch_watch_channel(this.ptr, channel_id.ptr, monitor.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(monitor);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Updates a channel identified by `channel_id` by applying `update` to its monitor.
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
	public ChannelMonitorUpdateStatus update_channel(org.ldk.structs.ChannelId channel_id, org.ldk.structs.ChannelMonitorUpdate update) {
		ChannelMonitorUpdateStatus ret = bindings.Watch_update_channel(this.ptr, channel_id.ptr, update.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(update);
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
	public FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] release_pending_monitor_events() {
		long ret = bindings.Watch_release_pending_monitor_events(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_57_len = InternalUtils.getArrayLength(ret);
		FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] ret_conv_57_arr = new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[ret_conv_57_len];
		for (int f = 0; f < ret_conv_57_len; f++) {
			long ret_conv_57 = InternalUtils.getU64ArrayElem(ret, f);
			FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ ret_conv_57_hu_conv = new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ(null, ret_conv_57);
			if (ret_conv_57_hu_conv != null) { ret_conv_57_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_57_arr[f] = ret_conv_57_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_57_arr;
	}

}
} } }
