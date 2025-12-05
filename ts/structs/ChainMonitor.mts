
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An implementation of [`chain::Watch`] for monitoring channels.
 * 
 * Connected and disconnected blocks must be provided to `ChainMonitor` as documented by
 * [`chain::Watch`]. May be used in conjunction with [`ChannelManager`] to monitor channels locally
 * or used independently to monitor channels remotely. See the [module-level documentation] for
 * details.
 * 
 * Note that `ChainMonitor` should regularly trigger rebroadcasts/fee bumps of pending claims from
 * a force-closed channel. This is crucial in preventing certain classes of pinning attacks,
 * detecting substantial mempool feerate changes between blocks, and ensuring reliability if
 * broadcasting fails. We recommend invoking this every 30 seconds, or lower if running in an
 * environment with spotty connections, like on mobile.
 * 
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [module-level documentation]: crate::chain::chainmonitor
 * [`rebroadcast_pending_claims`]: Self::rebroadcast_pending_claims
 */
export class ChainMonitor extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChainMonitor_free);
	}

	/**
	 * Creates a new `ChainMonitor` used to watch on-chain activity pertaining to channels.
	 * 
	 * When an optional chain source implementing [`chain::Filter`] is provided, the chain monitor
	 * will call back to it indicating transactions and outputs of interest. This allows clients to
	 * pre-filter blocks or only fetch blocks matching a compact filter. Otherwise, clients may
	 * always need to fetch full blocks absent another means for determining which blocks contain
	 * transactions relevant to the watched channels.
	 * 
	 * # Note
	 * `our_peerstorage_encryption_key` must be obtained from [`NodeSigner::get_peer_storage_key`].
	 * This key is used to encrypt peer storage backups.
	 * 
	 * Important**: This key should not be set arbitrarily or changed after initialization. The same key
	 * is obtained by the [`ChannelManager`] through [`NodeSigner`] to decrypt peer backups.
	 * Using an inconsistent or incorrect key will result in the inability to decrypt previously encrypted backups.
	 * 
	 * [`NodeSigner`]: crate::sign::NodeSigner
	 * [`NodeSigner::get_peer_storage_key`]: crate::sign::NodeSigner::get_peer_storage_key
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public static constructor_new(chain_source: Option_FilterZ, broadcaster: BroadcasterInterface, logger: Logger, feeest: FeeEstimator, persister: Persist, _entropy_source: EntropySource, _our_peerstorage_encryption_key: PeerStorageKey): ChainMonitor {
		const ret: bigint = bindings.ChainMonitor_new(CommonBase.get_ptr_of(chain_source), CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(feeest), CommonBase.get_ptr_of(persister), CommonBase.get_ptr_of(_entropy_source), CommonBase.get_ptr_of(_our_peerstorage_encryption_key));
		const ret_hu_conv: ChainMonitor = new ChainMonitor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, chain_source);
		CommonBase.add_ref_from(ret_hu_conv, broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, feeest);
		CommonBase.add_ref_from(ret_hu_conv, persister);
		CommonBase.add_ref_from(ret_hu_conv, _entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Gets the balances in the contained [`ChannelMonitor`]s which are claimable on-chain or
	 * claims which are awaiting confirmation.
	 * 
	 * Includes the balances from each [`ChannelMonitor`] *except* those included in
	 * `ignored_channels`.
	 * 
	 * See [`ChannelMonitor::get_claimable_balances`] for more details on the exact criteria for
	 * inclusion in the return value.
	 */
	public get_claimable_balances(ignored_channels: ChannelDetails[]): Balance[] {
		const ret: number = bindings.ChainMonitor_get_claimable_balances(this.ptr, bindings.encodeUint64Array(ignored_channels.map(ignored_channels_conv_16 => CommonBase.get_ptr_of(ignored_channels_conv_16))));
		const ret_conv_9_len: number = bindings.getArrayLength(ret);
		const ret_conv_9_arr: Balance[] = new Array(ret_conv_9_len).fill(null);
		for (var j = 0; j < ret_conv_9_len; j++) {
			const ret_conv_9: bigint = bindings.getU64ArrayElem(ret, j);
			const ret_conv_9_hu_conv: Balance = Balance.constr_from_ptr(ret_conv_9);
			CommonBase.add_ref_from(ret_conv_9_hu_conv, this);
			ret_conv_9_arr[j] = ret_conv_9_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_9_arr;
	}

	/**
	 * Gets the [`LockedChannelMonitor`] for a given funding outpoint, returning an `Err` if no
	 * such [`ChannelMonitor`] is currently being monitored for.
	 * 
	 * Note that the result holds a mutex over our monitor set, and should not be held
	 * indefinitely.
	 */
	public get_monitor(channel_id: ChannelId): Result_LockedChannelMonitorNoneZ {
		const ret: bigint = bindings.ChainMonitor_get_monitor(this.ptr, CommonBase.get_ptr_of(channel_id));
		const ret_hu_conv: Result_LockedChannelMonitorNoneZ = Result_LockedChannelMonitorNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Lists the funding outpoint and channel ID of each [`ChannelMonitor`] being monitored.
	 * 
	 * Note that [`ChannelMonitor`]s are not removed when a channel is closed as they are always
	 * monitoring for on-chain state resolutions.
	 */
	public list_monitors(): ChannelId[] {
		const ret: number = bindings.ChainMonitor_list_monitors(this.ptr);
		const ret_conv_11_len: number = bindings.getArrayLength(ret);
		const ret_conv_11_arr: ChannelId[] = new Array(ret_conv_11_len).fill(null);
		for (var l = 0; l < ret_conv_11_len; l++) {
			const ret_conv_11: bigint = bindings.getU64ArrayElem(ret, l);
			const ret_conv_11_hu_conv: ChannelId = new ChannelId(null, ret_conv_11);
			CommonBase.add_ref_from(ret_conv_11_hu_conv, this);
			ret_conv_11_arr[l] = ret_conv_11_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_11_arr;
	}

	/**
	 * Lists the pending updates for each [`ChannelMonitor`] (by `ChannelId` being monitored).
	 * Each `Vec<u64>` contains `update_id`s from [`ChannelMonitor::get_latest_update_id`] for updates
	 * that have not yet been fully persisted. Note that if a full monitor is persisted all the pending
	 * monitor updates must be individually marked completed by calling [`ChainMonitor::channel_monitor_updated`].
	 */
	public list_pending_monitor_updates(): TwoTuple_ChannelIdCVec_u64ZZ[] {
		const ret: number = bindings.ChainMonitor_list_pending_monitor_updates(this.ptr);
		const ret_conv_30_len: number = bindings.getArrayLength(ret);
		const ret_conv_30_arr: TwoTuple_ChannelIdCVec_u64ZZ[] = new Array(ret_conv_30_len).fill(null);
		for (var e = 0; e < ret_conv_30_len; e++) {
			const ret_conv_30: bigint = bindings.getU64ArrayElem(ret, e);
			const ret_conv_30_hu_conv: TwoTuple_ChannelIdCVec_u64ZZ = new TwoTuple_ChannelIdCVec_u64ZZ(null, ret_conv_30);
			CommonBase.add_ref_from(ret_conv_30_hu_conv, this);
			ret_conv_30_arr[e] = ret_conv_30_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_30_arr;
	}

	/**
	 * Indicates the persistence of a [`ChannelMonitor`] has completed after
	 * [`ChannelMonitorUpdateStatus::InProgress`] was returned from an update operation.
	 * 
	 * Thus, the anticipated use is, at a high level:
	 * 1) This [`ChainMonitor`] calls [`Persist::update_persisted_channel`] which stores the
	 * update to disk and begins updating any remote (e.g. watchtower/backup) copies,
	 * returning [`ChannelMonitorUpdateStatus::InProgress`],
	 * 2) once all remote copies are updated, you call this function with [`ChannelMonitor::get_latest_update_id`]
	 * or [`ChannelMonitorUpdate::update_id`] as the `completed_update_id`, and once all pending
	 * updates have completed the channel will be re-enabled.
	 * 
	 * It is only necessary to call [`ChainMonitor::channel_monitor_updated`] when you return [`ChannelMonitorUpdateStatus::InProgress`]
	 * from [`Persist`] and either:
	 * 1. A new [`ChannelMonitor`] was added in [`Persist::persist_new_channel`], or
	 * 2. A [`ChannelMonitorUpdate`] was provided as part of [`Persist::update_persisted_channel`].
	 * Note that we don't care about calls to [`Persist::update_persisted_channel`] where no
	 * [`ChannelMonitorUpdate`] was provided.
	 * 
	 * Returns an [`APIError::APIMisuseError`] if `funding_txo` does not match any currently
	 * registered [`ChannelMonitor`]s.
	 */
	public channel_monitor_updated(channel_id: ChannelId, completed_update_id: bigint): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.ChainMonitor_channel_monitor_updated(this.ptr, CommonBase.get_ptr_of(channel_id), completed_update_id);
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets a [`Future`] that completes when an event is available either via
	 * [`chain::Watch::release_pending_monitor_events`] or
	 * [`EventsProvider::process_pending_events`].
	 * 
	 * Note that callbacks registered on the [`Future`] MUST NOT call back into this
	 * [`ChainMonitor`] and should instead register actions to be taken later.
	 * 
	 * [`EventsProvider::process_pending_events`]: crate::events::EventsProvider::process_pending_events
	 */
	public get_update_future(): Future {
		const ret: bigint = bindings.ChainMonitor_get_update_future(this.ptr);
		const ret_hu_conv: Future = new Future(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Triggers rebroadcasts/fee-bumps of pending claims from a force-closed channel. This is
	 * crucial in preventing certain classes of pinning attacks, detecting substantial mempool
	 * feerate changes between blocks, and ensuring reliability if broadcasting fails. We recommend
	 * invoking this every 30 seconds, or lower if running in an environment with spotty
	 * connections, like on mobile.
	 */
	public rebroadcast_pending_claims(): void {
		bindings.ChainMonitor_rebroadcast_pending_claims(this.ptr);
	}

	/**
	 * Triggers rebroadcasts of pending claims from force-closed channels after a transaction
	 * signature generation failure.
	 * 
	 * `monitor_opt` can be used as a filter to only trigger them for a specific channel monitor.
	 * 
	 * Note that monitor_opt (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public signer_unblocked(monitor_opt: ChannelId|null): void {
		bindings.ChainMonitor_signer_unblocked(this.ptr, monitor_opt == null ? 0n : CommonBase.get_ptr_of(monitor_opt));
	}

	/**
	 * Archives fully resolved channel monitors by calling [`Persist::archive_persisted_channel`].
	 * 
	 * This is useful for pruning fully resolved monitors from the monitor set and primary
	 * storage so they are not kept in memory and reloaded on restart.
	 * 
	 * Should be called occasionally (once every handful of blocks or on startup).
	 * 
	 * Depending on the implementation of [`Persist::archive_persisted_channel`] the monitor
	 * data could be moved to an archive location or removed entirely.
	 */
	public archive_fully_resolved_channel_monitors(): void {
		bindings.ChainMonitor_archive_fully_resolved_channel_monitors(this.ptr);
	}

	/**
	 * Loads a [`ChannelMonitor`] which already exists on disk after startup.
	 * 
	 * Using this over [`chain::Watch::watch_channel`] avoids re-persisting a [`ChannelMonitor`]
	 * that hasn't changed, slowing down startup.
	 * 
	 * Note that this method *can* be used if additional blocks were replayed against the
	 * [`ChannelMonitor`] or if a [`ChannelMonitorUpdate`] loaded from disk was replayed such that
	 * it will replayed on startup, and in general can only *not* be used if you directly accessed
	 * the [`ChannelMonitor`] and changed its state in some way that will not be replayed again on
	 * a restart. Such direct access should generally never occur for most LDK-based nodes.
	 * 
	 * For [`ChannelMonitor`]s which were last serialized by an LDK version prior to 0.1 this will
	 * fall back to calling [`chain::Watch::watch_channel`] and persisting the [`ChannelMonitor`].
	 * See the release notes for LDK 0.1 for more information on this requirement.
	 * 
	 * [`ChannelMonitor`]s which do not need to be persisted (i.e. were last written by LDK 0.1 or
	 * later) will be loaded without persistence and this method will return
	 * [`ChannelMonitorUpdateStatus::Completed`].
	 */
	public load_existing_monitor(channel_id: ChannelId, monitor: ChannelMonitor): Result_ChannelMonitorUpdateStatusNoneZ {
		const ret: bigint = bindings.ChainMonitor_load_existing_monitor(this.ptr, CommonBase.get_ptr_of(channel_id), CommonBase.get_ptr_of(monitor));
		const ret_hu_conv: Result_ChannelMonitorUpdateStatusNoneZ = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public as_BaseMessageHandler(): BaseMessageHandler {
		const ret: bigint = bindings.ChainMonitor_as_BaseMessageHandler(this.ptr);
		const ret_hu_conv: BaseMessageHandler = new BaseMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SendOnlyMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SendOnlyMessageHandler must be freed before this_arg is
	 */
	public as_SendOnlyMessageHandler(): SendOnlyMessageHandler {
		const ret: bigint = bindings.ChainMonitor_as_SendOnlyMessageHandler(this.ptr);
		const ret_hu_conv: SendOnlyMessageHandler = new SendOnlyMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public as_Listen(): Listen {
		const ret: bigint = bindings.ChainMonitor_as_Listen(this.ptr);
		const ret_hu_conv: Listen = new Listen(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public as_Confirm(): Confirm {
		const ret: bigint = bindings.ChainMonitor_as_Confirm(this.ptr);
		const ret_hu_conv: Confirm = new Confirm(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Watch which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Watch must be freed before this_arg is
	 */
	public as_Watch(): Watch {
		const ret: bigint = bindings.ChainMonitor_as_Watch(this.ptr);
		const ret_hu_conv: Watch = new Watch(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public as_EventsProvider(): EventsProvider {
		const ret: bigint = bindings.ChainMonitor_as_EventsProvider(this.ptr);
		const ret_hu_conv: EventsProvider = new EventsProvider(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
