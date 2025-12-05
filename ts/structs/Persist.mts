

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Persist */
export interface PersistInterface {
	/**Persist a new channel's data in response to a [`chain::Watch::watch_channel`] call. This is
	 * called by [`ChannelManager`] for new channels, or may be called directly, e.g. on startup,
	 * with the `monitor_name` returned by [`ChannelMonitor::persistence_key`].
	 * 
	 * The data can be stored any way you want, so long as `monitor_name` is used to maintain a
	 * correct mapping with the stored channel data (i.e., calls to `update_persisted_channel` with
	 * the same `monitor_name` must be applied to or overwrite this data). Note that you **must
	 * persist every new monitor to disk.
	 * 
	 * The [`ChannelMonitor::get_latest_update_id`] uniquely links this call to [`ChainMonitor::channel_monitor_updated`].
	 * For [`Persist::persist_new_channel`], it is only necessary to call [`ChainMonitor::channel_monitor_updated`]
	 * when you return [`ChannelMonitorUpdateStatus::InProgress`].
	 * 
	 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`
	 * and [`ChannelMonitorUpdateStatus`] for requirements when returning errors.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`Writeable::write`]: crate::util::ser::Writeable::write
	 */
	persist_new_channel(monitor_name: MonitorName, monitor: ChannelMonitor): ChannelMonitorUpdateStatus;
	/**Update one channel's data. The provided [`ChannelMonitor`] has already applied the given
	 * update.
	 * 
	 * Note that on every update, you **must** persist either the [`ChannelMonitorUpdate`] or the
	 * updated monitor itself to disk/backups. See the [`Persist`] trait documentation for more
	 * details.
	 * 
	 * During blockchain synchronization operations, and in some rare cases, this may be called with
	 * no [`ChannelMonitorUpdate`], in which case the full [`ChannelMonitor`] needs to be persisted.
	 * Note that after the full [`ChannelMonitor`] is persisted any previous
	 * [`ChannelMonitorUpdate`]s which were persisted should be discarded - they can no longer be
	 * applied to the persisted [`ChannelMonitor`] as they were already applied.
	 * 
	 * If an implementer chooses to persist the updates only, they need to make
	 * sure that all the updates are applied to the `ChannelMonitors` *before
	 * the set of channel monitors is given to the `ChannelManager`
	 * deserialization routine. If there are any gaps in the persisted [`ChannelMonitorUpdate`]s,
	 * implementer can safely ignore [`ChannelMonitorUpdate`]s after the gap and load without them.
	 * See [`ChannelMonitor::update_monitor`] for
	 * applying a monitor update to a monitor. If full `ChannelMonitors` are
	 * persisted, then there is no need to persist individual updates.
	 * 
	 * Note that there could be a performance tradeoff between persisting complete
	 * channel monitors on every update vs. persisting only updates and applying
	 * them in batches. The size of each monitor grows `O(number of state updates)`
	 * whereas updates are small and `O(1)`.
	 * 
	 * The [`ChannelMonitorUpdate::update_id`] or [`ChannelMonitor::get_latest_update_id`] uniquely
	 * links this call to [`ChainMonitor::channel_monitor_updated`].
	 * For [`Persist::update_persisted_channel`], it is only necessary to call [`ChainMonitor::channel_monitor_updated`]
	 * when a [`ChannelMonitorUpdate`] is provided and when you return [`ChannelMonitorUpdateStatus::InProgress`].
	 * 
	 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`,
	 * [`Writeable::write`] on [`ChannelMonitorUpdate`] for writing out an update, and
	 * [`ChannelMonitorUpdateStatus`] for requirements when returning errors.
	 * 
	 * [`Writeable::write`]: crate::util::ser::Writeable::write
	 * 
	 * Note that monitor_update (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	update_persisted_channel(monitor_name: MonitorName, monitor_update: ChannelMonitorUpdate, monitor: ChannelMonitor): ChannelMonitorUpdateStatus;
	/**Prevents the channel monitor from being loaded on startup.
	 * 
	 * Archiving the data in a backup location (rather than deleting it fully) is useful for
	 * hedging against data loss in case of unexpected failure.
	 * 
	 * Note that if a crash occurs during the archiving process, and its implementation is not
	 * atomic, a state may emerge with the archival operation only being partially complete. In
	 * that scenario, the monitor may still be loaded on startup pending successful completion of
	 * the archive process. Additionally, because the archive operation could be retried on
	 * restart, this method must in that case be idempotent, ensuring it can handle scenarios where
	 * the monitor already exists in the archive.
	 */
	archive_persisted_channel(monitor_name: MonitorName): void;
	/**Fetches the set of [`ChannelMonitorUpdate`]s, previously persisted with
	 * [`Self::update_persisted_channel`], which have completed.
	 * 
	 * Returning an update here is equivalent to calling
	 * [`ChainMonitor::channel_monitor_updated`]. Because of this, this method is defaulted and
	 * hidden in the docs.
	 */
	get_and_clear_completed_updates(): TwoTuple_ChannelIdu64Z[];
}

class LDKPersistHolder {
	held: Persist|null = null;
}

/**
 * `Persist` defines behavior for persisting channel monitors: this could mean
 * writing once to disk, and/or uploading to one or more backup services.
 * 
 * Persistence can happen in one of two ways - synchronously completing before the trait method
 * calls return or asynchronously in the background.
 * 
 * # For those implementing synchronous persistence
 * 
 * If persistence completes fully (including any relevant `fsync()` calls), the implementation
 * should return [`ChannelMonitorUpdateStatus::Completed`], indicating normal channel operation
 * should continue.
 * 
 * If persistence fails for some reason, implementations should consider returning
 * [`ChannelMonitorUpdateStatus::InProgress`] and retry all pending persistence operations in
 * the background with [`ChainMonitor::list_pending_monitor_updates`] and
 * [`ChainMonitor::get_monitor`].
 * 
 * Once a full [`ChannelMonitor`] has been persisted, all pending updates for that channel can
 * be marked as complete via [`ChainMonitor::channel_monitor_updated`].
 * 
 * If at some point no further progress can be made towards persisting the pending updates, the
 * node should simply shut down.
 * 
 * If the persistence has failed and cannot be retried further (e.g. because of an outage),
 * [`ChannelMonitorUpdateStatus::UnrecoverableError`] can be used, though this will result in
 * an immediate panic and future operations in LDK generally failing.
 * 
 * # For those implementing asynchronous persistence
 * 
 * All calls should generally spawn a background task and immediately return
 * [`ChannelMonitorUpdateStatus::InProgress`]. Once the update completes,
 * [`ChainMonitor::channel_monitor_updated`] should be called with the corresponding
 * [`ChannelMonitor::get_latest_update_id`] or [`ChannelMonitorUpdate::update_id`].
 * 
 * Note that unlike the direct [`chain::Watch`] interface,
 * [`ChainMonitor::channel_monitor_updated`] must be called once for *each* update which occurs.
 * 
 * If at some point no further progress can be made towards persisting a pending update, the node
 * should simply shut down. Until then, the background task should either loop indefinitely, or
 * persistence should be regularly retried with [`ChainMonitor::list_pending_monitor_updates`]
 * and [`ChainMonitor::get_monitor`] (note that if a full monitor is persisted all pending
 * monitor updates may be marked completed).
 * 
 * # Using remote watchtowers
 * 
 * Watchtowers may be updated as a part of an implementation of this trait, utilizing the async
 * update process described above while the watchtower is being updated. The following methods are
 * provided for bulding transactions for a watchtower:
 * [`ChannelMonitor::initial_counterparty_commitment_tx`],
 * [`ChannelMonitor::counterparty_commitment_txs_from_update`],
 * [`ChannelMonitor::sign_to_local_justice_tx`], [`TrustedCommitmentTransaction::revokeable_output_index`],
 * [`TrustedCommitmentTransaction::build_to_local_justice_tx`].
 * 
 * [`TrustedCommitmentTransaction::revokeable_output_index`]: crate::ln::chan_utils::TrustedCommitmentTransaction::revokeable_output_index
 * [`TrustedCommitmentTransaction::build_to_local_justice_tx`]: crate::ln::chan_utils::TrustedCommitmentTransaction::build_to_local_justice_tx
 */
export class Persist extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKPersist|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Persist_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Persist from a given implementation */
	public static new_impl(arg: PersistInterface): Persist {
		const impl_holder: LDKPersistHolder = new LDKPersistHolder();
		let structImplementation = {
			persist_new_channel (monitor_name: bigint, monitor: bigint): ChannelMonitorUpdateStatus {
				const monitor_name_hu_conv: MonitorName = MonitorName.constr_from_ptr(monitor_name);
				CommonBase.add_ref_from(monitor_name_hu_conv, this);
				const monitor_hu_conv: ChannelMonitor = new ChannelMonitor(null, monitor);
				const ret: ChannelMonitorUpdateStatus = arg.persist_new_channel(monitor_name_hu_conv, monitor_hu_conv);
				return ret;
			},
			update_persisted_channel (monitor_name: bigint, monitor_update: bigint, monitor: bigint): ChannelMonitorUpdateStatus {
				const monitor_name_hu_conv: MonitorName = MonitorName.constr_from_ptr(monitor_name);
				CommonBase.add_ref_from(monitor_name_hu_conv, this);
				const monitor_update_hu_conv: ChannelMonitorUpdate = new ChannelMonitorUpdate(null, monitor_update);
				CommonBase.add_ref_from(monitor_update_hu_conv, this);
				const monitor_hu_conv: ChannelMonitor = new ChannelMonitor(null, monitor);
				const ret: ChannelMonitorUpdateStatus = arg.update_persisted_channel(monitor_name_hu_conv, monitor_update_hu_conv, monitor_hu_conv);
				return ret;
			},
			archive_persisted_channel (monitor_name: bigint): void {
				const monitor_name_hu_conv: MonitorName = MonitorName.constr_from_ptr(monitor_name);
				CommonBase.add_ref_from(monitor_name_hu_conv, this);
				arg.archive_persisted_channel(monitor_name_hu_conv);
			},
			get_and_clear_completed_updates (): number {
				const ret: TwoTuple_ChannelIdu64Z[] = arg.get_and_clear_completed_updates();
				const result: number = bindings.encodeUint64Array(ret.map(ret_conv_24 => ret_conv_24.clone_ptr()));
				return result;
			},
		} as bindings.LDKPersist;
		const ptr_idx: [bigint, number] = bindings.LDKPersist_new(structImplementation);

		impl_holder.held = new Persist(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Persist a new channel's data in response to a [`chain::Watch::watch_channel`] call. This is
	 * called by [`ChannelManager`] for new channels, or may be called directly, e.g. on startup,
	 * with the `monitor_name` returned by [`ChannelMonitor::persistence_key`].
	 * 
	 * The data can be stored any way you want, so long as `monitor_name` is used to maintain a
	 * correct mapping with the stored channel data (i.e., calls to `update_persisted_channel` with
	 * the same `monitor_name` must be applied to or overwrite this data). Note that you **must
	 * persist every new monitor to disk.
	 * 
	 * The [`ChannelMonitor::get_latest_update_id`] uniquely links this call to [`ChainMonitor::channel_monitor_updated`].
	 * For [`Persist::persist_new_channel`], it is only necessary to call [`ChainMonitor::channel_monitor_updated`]
	 * when you return [`ChannelMonitorUpdateStatus::InProgress`].
	 * 
	 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`
	 * and [`ChannelMonitorUpdateStatus`] for requirements when returning errors.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`Writeable::write`]: crate::util::ser::Writeable::write
	 */
	public persist_new_channel(monitor_name: MonitorName, monitor: ChannelMonitor): ChannelMonitorUpdateStatus {
		const ret: ChannelMonitorUpdateStatus = bindings.Persist_persist_new_channel(this.ptr, CommonBase.get_ptr_of(monitor_name), CommonBase.get_ptr_of(monitor));
		return ret;
	}

	/**
	 * Update one channel's data. The provided [`ChannelMonitor`] has already applied the given
	 * update.
	 * 
	 * Note that on every update, you **must** persist either the [`ChannelMonitorUpdate`] or the
	 * updated monitor itself to disk/backups. See the [`Persist`] trait documentation for more
	 * details.
	 * 
	 * During blockchain synchronization operations, and in some rare cases, this may be called with
	 * no [`ChannelMonitorUpdate`], in which case the full [`ChannelMonitor`] needs to be persisted.
	 * Note that after the full [`ChannelMonitor`] is persisted any previous
	 * [`ChannelMonitorUpdate`]s which were persisted should be discarded - they can no longer be
	 * applied to the persisted [`ChannelMonitor`] as they were already applied.
	 * 
	 * If an implementer chooses to persist the updates only, they need to make
	 * sure that all the updates are applied to the `ChannelMonitors` *before
	 * the set of channel monitors is given to the `ChannelManager`
	 * deserialization routine. If there are any gaps in the persisted [`ChannelMonitorUpdate`]s,
	 * implementer can safely ignore [`ChannelMonitorUpdate`]s after the gap and load without them.
	 * See [`ChannelMonitor::update_monitor`] for
	 * applying a monitor update to a monitor. If full `ChannelMonitors` are
	 * persisted, then there is no need to persist individual updates.
	 * 
	 * Note that there could be a performance tradeoff between persisting complete
	 * channel monitors on every update vs. persisting only updates and applying
	 * them in batches. The size of each monitor grows `O(number of state updates)`
	 * whereas updates are small and `O(1)`.
	 * 
	 * The [`ChannelMonitorUpdate::update_id`] or [`ChannelMonitor::get_latest_update_id`] uniquely
	 * links this call to [`ChainMonitor::channel_monitor_updated`].
	 * For [`Persist::update_persisted_channel`], it is only necessary to call [`ChainMonitor::channel_monitor_updated`]
	 * when a [`ChannelMonitorUpdate`] is provided and when you return [`ChannelMonitorUpdateStatus::InProgress`].
	 * 
	 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`,
	 * [`Writeable::write`] on [`ChannelMonitorUpdate`] for writing out an update, and
	 * [`ChannelMonitorUpdateStatus`] for requirements when returning errors.
	 * 
	 * [`Writeable::write`]: crate::util::ser::Writeable::write
	 * 
	 * Note that monitor_update (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public update_persisted_channel(monitor_name: MonitorName, monitor_update: ChannelMonitorUpdate|null, monitor: ChannelMonitor): ChannelMonitorUpdateStatus {
		const ret: ChannelMonitorUpdateStatus = bindings.Persist_update_persisted_channel(this.ptr, CommonBase.get_ptr_of(monitor_name), monitor_update == null ? 0n : CommonBase.get_ptr_of(monitor_update), CommonBase.get_ptr_of(monitor));
		return ret;
	}

	/**
	 * Prevents the channel monitor from being loaded on startup.
	 * 
	 * Archiving the data in a backup location (rather than deleting it fully) is useful for
	 * hedging against data loss in case of unexpected failure.
	 * 
	 * Note that if a crash occurs during the archiving process, and its implementation is not
	 * atomic, a state may emerge with the archival operation only being partially complete. In
	 * that scenario, the monitor may still be loaded on startup pending successful completion of
	 * the archive process. Additionally, because the archive operation could be retried on
	 * restart, this method must in that case be idempotent, ensuring it can handle scenarios where
	 * the monitor already exists in the archive.
	 */
	public archive_persisted_channel(monitor_name: MonitorName): void {
		bindings.Persist_archive_persisted_channel(this.ptr, CommonBase.get_ptr_of(monitor_name));
	}

	/**
	 * Fetches the set of [`ChannelMonitorUpdate`]s, previously persisted with
	 * [`Self::update_persisted_channel`], which have completed.
	 * 
	 * Returning an update here is equivalent to calling
	 * [`ChainMonitor::channel_monitor_updated`]. Because of this, this method is defaulted and
	 * hidden in the docs.
	 */
	public get_and_clear_completed_updates(): TwoTuple_ChannelIdu64Z[] {
		const ret: number = bindings.Persist_get_and_clear_completed_updates(this.ptr);
		const ret_conv_24_len: number = bindings.getArrayLength(ret);
		const ret_conv_24_arr: TwoTuple_ChannelIdu64Z[] = new Array(ret_conv_24_len).fill(null);
		for (var y = 0; y < ret_conv_24_len; y++) {
			const ret_conv_24: bigint = bindings.getU64ArrayElem(ret, y);
			const ret_conv_24_hu_conv: TwoTuple_ChannelIdu64Z = new TwoTuple_ChannelIdu64Z(null, ret_conv_24);
			CommonBase.add_ref_from(ret_conv_24_hu_conv, this);
			ret_conv_24_arr[y] = ret_conv_24_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_24_arr;
	}

}
