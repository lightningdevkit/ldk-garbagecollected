

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Watch */
export interface WatchInterface {
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
	watch_channel(channel_id: ChannelId, monitor: ChannelMonitor): Result_ChannelMonitorUpdateStatusNoneZ;
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
	update_channel(channel_id: ChannelId, update: ChannelMonitorUpdate): ChannelMonitorUpdateStatus;
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
	release_pending_monitor_events(): FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[];
}

class LDKWatchHolder {
	held: Watch|null = null;
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
export class Watch extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKWatch|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Watch_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Watch from a given implementation */
	public static new_impl(arg: WatchInterface): Watch {
		const impl_holder: LDKWatchHolder = new LDKWatchHolder();
		let structImplementation = {
			watch_channel (channel_id: bigint, monitor: bigint): bigint {
				const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
				CommonBase.add_ref_from(channel_id_hu_conv, this);
				const monitor_hu_conv: ChannelMonitor = new ChannelMonitor(null, monitor);
				CommonBase.add_ref_from(monitor_hu_conv, this);
				const ret: Result_ChannelMonitorUpdateStatusNoneZ = arg.watch_channel(channel_id_hu_conv, monitor_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			update_channel (channel_id: bigint, update: bigint): ChannelMonitorUpdateStatus {
				const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
				CommonBase.add_ref_from(channel_id_hu_conv, this);
				const update_hu_conv: ChannelMonitorUpdate = new ChannelMonitorUpdate(null, update);
				const ret: ChannelMonitorUpdateStatus = arg.update_channel(channel_id_hu_conv, update_hu_conv);
				return ret;
			},
			release_pending_monitor_events (): number {
				const ret: FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] = arg.release_pending_monitor_events();
				const result: number = bindings.encodeUint64Array(ret.map(ret_conv_57 => ret_conv_57.clone_ptr()));
				return result;
			},
		} as bindings.LDKWatch;
		const ptr_idx: [bigint, number] = bindings.LDKWatch_new(structImplementation);

		impl_holder.held = new Watch(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
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
	public watch_channel(channel_id: ChannelId, monitor: ChannelMonitor): Result_ChannelMonitorUpdateStatusNoneZ {
		const ret: bigint = bindings.Watch_watch_channel(this.ptr, CommonBase.get_ptr_of(channel_id), CommonBase.get_ptr_of(monitor));
		const ret_hu_conv: Result_ChannelMonitorUpdateStatusNoneZ = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
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
	public update_channel(channel_id: ChannelId, update: ChannelMonitorUpdate): ChannelMonitorUpdateStatus {
		const ret: ChannelMonitorUpdateStatus = bindings.Watch_update_channel(this.ptr, CommonBase.get_ptr_of(channel_id), CommonBase.get_ptr_of(update));
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
	public release_pending_monitor_events(): FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] {
		const ret: number = bindings.Watch_release_pending_monitor_events(this.ptr);
		const ret_conv_57_len: number = bindings.getArrayLength(ret);
		const ret_conv_57_arr: FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ[] = new Array(ret_conv_57_len).fill(null);
		for (var f = 0; f < ret_conv_57_len; f++) {
			const ret_conv_57: bigint = bindings.getU64ArrayElem(ret, f);
			const ret_conv_57_hu_conv: FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ = new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ(null, ret_conv_57);
			CommonBase.add_ref_from(ret_conv_57_hu_conv, this);
			ret_conv_57_arr[f] = ret_conv_57_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_57_arr;
	}

}
