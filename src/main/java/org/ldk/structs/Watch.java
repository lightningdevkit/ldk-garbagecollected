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
		Result_ChannelMonitorUpdateStatusNoneZ watch_channel(OutPoint funding_txo, ChannelMonitor monitor);
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
			@Override public long watch_channel(long funding_txo, long monitor) {
				org.ldk.structs.OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, funding_txo); }
				if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitor monitor_hu_conv = null; if (monitor < 0 || monitor > 4096) { monitor_hu_conv = new org.ldk.structs.ChannelMonitor(null, monitor); }
				if (monitor_hu_conv != null) { monitor_hu_conv.ptrs_to.add(this); };
				Result_ChannelMonitorUpdateStatusNoneZ ret = arg.watch_channel(funding_txo_hu_conv, monitor_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public ChannelMonitorUpdateStatus update_channel(long funding_txo, long update) {
				org.ldk.structs.OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, funding_txo); }
				if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitorUpdate update_hu_conv = null; if (update < 0 || update > 4096) { update_hu_conv = new org.ldk.structs.ChannelMonitorUpdate(null, update); }
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(monitor);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(funding_txo); };
		if (this != null) { this.ptrs_to.add(monitor); };
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
