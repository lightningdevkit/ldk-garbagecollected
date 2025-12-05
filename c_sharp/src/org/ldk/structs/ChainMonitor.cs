using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class ChainMonitor : CommonBase {
	internal ChainMonitor(object _dummy, long ptr) : base(ptr) { }
	~ChainMonitor() {
		if (ptr != 0) { bindings.ChainMonitor_free(ptr); }
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
	public static org.ldk.structs.ChainMonitor of(org.ldk.structs.Option_FilterZ chain_source, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.Logger logger, org.ldk.structs.FeeEstimator feeest, org.ldk.structs.Persist persister, org.ldk.structs.EntropySource _entropy_source, org.ldk.structs.PeerStorageKey _our_peerstorage_encryption_key) {
		long ret = bindings.ChainMonitor_new(chain_source.ptr, broadcaster.ptr, logger.ptr, feeest.ptr, persister.ptr, _entropy_source.ptr, _our_peerstorage_encryption_key.ptr);
		GC.KeepAlive(chain_source);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(logger);
		GC.KeepAlive(feeest);
		GC.KeepAlive(persister);
		GC.KeepAlive(_entropy_source);
		GC.KeepAlive(_our_peerstorage_encryption_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChainMonitor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChainMonitor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(chain_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(feeest); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(persister); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(_entropy_source); };
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
	public Balance[] get_claimable_balances(ChannelDetails[] ignored_channels) {
		long ret = bindings.ChainMonitor_get_claimable_balances(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(ignored_channels, ignored_channels_conv_16 => ignored_channels_conv_16.ptr)));
		GC.KeepAlive(this);
		GC.KeepAlive(ignored_channels);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_9_len = InternalUtils.getArrayLength(ret);
		Balance[] ret_conv_9_arr = new Balance[ret_conv_9_len];
		for (int j = 0; j < ret_conv_9_len; j++) {
			long ret_conv_9 = InternalUtils.getU64ArrayElem(ret, j);
			org.ldk.structs.Balance ret_conv_9_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret_conv_9);
			if (ret_conv_9_hu_conv != null) { ret_conv_9_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_9_arr[j] = ret_conv_9_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_9_arr;
	}

	/**
	 * Gets the [`LockedChannelMonitor`] for a given funding outpoint, returning an `Err` if no
	 * such [`ChannelMonitor`] is currently being monitored for.
	 * 
	 * Note that the result holds a mutex over our monitor set, and should not be held
	 * indefinitely.
	 */
	public org.ldk.structs.Result_LockedChannelMonitorNoneZ get_monitor(org.ldk.structs.ChannelId channel_id) {
		long ret = bindings.ChainMonitor_get_monitor(this.ptr, channel_id.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_LockedChannelMonitorNoneZ ret_hu_conv = Result_LockedChannelMonitorNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Lists the funding outpoint and channel ID of each [`ChannelMonitor`] being monitored.
	 * 
	 * Note that [`ChannelMonitor`]s are not removed when a channel is closed as they are always
	 * monitoring for on-chain state resolutions.
	 */
	public ChannelId[] list_monitors() {
		long ret = bindings.ChainMonitor_list_monitors(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_11_len = InternalUtils.getArrayLength(ret);
		ChannelId[] ret_conv_11_arr = new ChannelId[ret_conv_11_len];
		for (int l = 0; l < ret_conv_11_len; l++) {
			long ret_conv_11 = InternalUtils.getU64ArrayElem(ret, l);
			org.ldk.structs.ChannelId ret_conv_11_hu_conv = null; if (ret_conv_11 < 0 || ret_conv_11 > 4096) { ret_conv_11_hu_conv = new org.ldk.structs.ChannelId(null, ret_conv_11); }
			if (ret_conv_11_hu_conv != null) { ret_conv_11_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_11_arr[l] = ret_conv_11_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_11_arr;
	}

	/**
	 * Lists the pending updates for each [`ChannelMonitor`] (by `ChannelId` being monitored).
	 * Each `Vec<u64>` contains `update_id`s from [`ChannelMonitor::get_latest_update_id`] for updates
	 * that have not yet been fully persisted. Note that if a full monitor is persisted all the pending
	 * monitor updates must be individually marked completed by calling [`ChainMonitor::channel_monitor_updated`].
	 */
	public TwoTuple_ChannelIdCVec_u64ZZ[] list_pending_monitor_updates() {
		long ret = bindings.ChainMonitor_list_pending_monitor_updates(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_30_len = InternalUtils.getArrayLength(ret);
		TwoTuple_ChannelIdCVec_u64ZZ[] ret_conv_30_arr = new TwoTuple_ChannelIdCVec_u64ZZ[ret_conv_30_len];
		for (int e = 0; e < ret_conv_30_len; e++) {
			long ret_conv_30 = InternalUtils.getU64ArrayElem(ret, e);
			TwoTuple_ChannelIdCVec_u64ZZ ret_conv_30_hu_conv = new TwoTuple_ChannelIdCVec_u64ZZ(null, ret_conv_30);
			if (ret_conv_30_hu_conv != null) { ret_conv_30_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_30_arr[e] = ret_conv_30_hu_conv;
		}
		bindings.free_buffer(ret);
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
	public org.ldk.structs.Result_NoneAPIErrorZ channel_monitor_updated(org.ldk.structs.ChannelId channel_id, long completed_update_id) {
		long ret = bindings.ChainMonitor_channel_monitor_updated(this.ptr, channel_id.ptr, completed_update_id);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(completed_update_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
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
	public org.ldk.structs.Future get_update_future() {
		long ret = bindings.ChainMonitor_get_update_future(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Future ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Future(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Triggers rebroadcasts/fee-bumps of pending claims from a force-closed channel. This is
	 * crucial in preventing certain classes of pinning attacks, detecting substantial mempool
	 * feerate changes between blocks, and ensuring reliability if broadcasting fails. We recommend
	 * invoking this every 30 seconds, or lower if running in an environment with spotty
	 * connections, like on mobile.
	 */
	public void rebroadcast_pending_claims() {
		bindings.ChainMonitor_rebroadcast_pending_claims(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Triggers rebroadcasts of pending claims from force-closed channels after a transaction
	 * signature generation failure.
	 * 
	 * `monitor_opt` can be used as a filter to only trigger them for a specific channel monitor.
	 * 
	 * Note that monitor_opt (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void signer_unblocked(org.ldk.structs.ChannelId monitor_opt) {
		bindings.ChainMonitor_signer_unblocked(this.ptr, monitor_opt == null ? 0 : monitor_opt.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(monitor_opt);
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
	public void archive_fully_resolved_channel_monitors() {
		bindings.ChainMonitor_archive_fully_resolved_channel_monitors(this.ptr);
		GC.KeepAlive(this);
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
	public org.ldk.structs.Result_ChannelMonitorUpdateStatusNoneZ load_existing_monitor(org.ldk.structs.ChannelId channel_id, org.ldk.structs.ChannelMonitor monitor) {
		long ret = bindings.ChainMonitor_load_existing_monitor(this.ptr, channel_id.ptr, monitor.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(monitor);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.BaseMessageHandler as_BaseMessageHandler() {
		long ret = bindings.ChainMonitor_as_BaseMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BaseMessageHandler ret_hu_conv = new BaseMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SendOnlyMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SendOnlyMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.SendOnlyMessageHandler as_SendOnlyMessageHandler() {
		long ret = bindings.ChainMonitor_as_SendOnlyMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SendOnlyMessageHandler ret_hu_conv = new SendOnlyMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public org.ldk.structs.Listen as_Listen() {
		long ret = bindings.ChainMonitor_as_Listen(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Listen ret_hu_conv = new Listen(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public org.ldk.structs.Confirm as_Confirm() {
		long ret = bindings.ChainMonitor_as_Confirm(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Confirm ret_hu_conv = new Confirm(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Watch which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Watch must be freed before this_arg is
	 */
	public org.ldk.structs.Watch as_Watch() {
		long ret = bindings.ChainMonitor_as_Watch(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Watch ret_hu_conv = new Watch(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public org.ldk.structs.EventsProvider as_EventsProvider() {
		long ret = bindings.ChainMonitor_as_EventsProvider(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
