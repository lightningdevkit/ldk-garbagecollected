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
 * responsible for maintaining a set of monitors such that they can be updated as channel state
 * changes. On each update, *all copies* of a [`ChannelMonitor`] must be updated and the update
 * persisted to disk to ensure that the latest [`ChannelMonitor`] state can be reloaded if the
 * application crashes.
 * 
 * See method documentation and [`ChannelMonitorUpdateStatus`] for specific requirements.
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
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.Watch_free(ptr); }
		ptr = 0;
	}
	public static interface WatchInterface {
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
		Result_ChannelMonitorUpdateStatusNoneZ watch_channel(ChannelId channel_id, ChannelMonitor monitor);
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
		ChannelMonitorUpdateStatus update_channel(ChannelId channel_id, ChannelMonitorUpdate update);
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
		FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] release_pending_monitor_events();
	}
	private static class LDKWatchHolder { Watch held; }
	public static Watch new_impl(WatchInterface arg) {
		final LDKWatchHolder impl_holder = new LDKWatchHolder();
		impl_holder.held = new Watch(new bindings.LDKWatch() {
			@Override public long watch_channel(long channel_id, long monitor) {
				org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
				if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitor monitor_hu_conv = null; if (monitor < 0 || monitor > 4096) { monitor_hu_conv = new org.ldk.structs.ChannelMonitor(null, monitor); }
				if (monitor_hu_conv != null) { monitor_hu_conv.ptrs_to.add(this); };
				Result_ChannelMonitorUpdateStatusNoneZ ret = arg.watch_channel(channel_id_hu_conv, monitor_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public ChannelMonitorUpdateStatus update_channel(long channel_id, long update) {
				org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
				if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitorUpdate update_hu_conv = null; if (update < 0 || update > 4096) { update_hu_conv = new org.ldk.structs.ChannelMonitorUpdate(null, update); }
				ChannelMonitorUpdateStatus ret = arg.update_channel(channel_id_hu_conv, update_hu_conv);
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public long[] release_pending_monitor_events() {
				FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] ret = arg.release_pending_monitor_events();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_57 -> ret_conv_57.clone_ptr()).toArray() : null;
				return result;
			}
		});
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
	public Result_ChannelMonitorUpdateStatusNoneZ watch_channel(org.ldk.structs.ChannelId channel_id, org.ldk.structs.ChannelMonitor monitor) {
		long ret = bindings.Watch_watch_channel(this.ptr, channel_id.ptr, monitor.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(monitor);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(update);
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
		long[] ret = bindings.Watch_release_pending_monitor_events(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_57_len = ret.length;
		FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] ret_conv_57_arr = new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[ret_conv_57_len];
		for (int f = 0; f < ret_conv_57_len; f++) {
			long ret_conv_57 = ret[f];
			FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ ret_conv_57_hu_conv = new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ(null, ret_conv_57);
			if (ret_conv_57_hu_conv != null) { ret_conv_57_hu_conv.ptrs_to.add(this); };
			ret_conv_57_arr[f] = ret_conv_57_hu_conv;
		}
		return ret_conv_57_arr;
	}

}
