package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChainMonitor extends CommonBase {
	ChainMonitor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
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
	 */
	public static ChainMonitor of(org.ldk.structs.Option_FilterZ chain_source, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.Logger logger, org.ldk.structs.FeeEstimator feeest, org.ldk.structs.Persist persister) {
		long ret = bindings.ChainMonitor_new(chain_source.ptr, broadcaster == null ? 0 : broadcaster.ptr, logger == null ? 0 : logger.ptr, feeest == null ? 0 : feeest.ptr, persister == null ? 0 : persister.ptr);
		Reference.reachabilityFence(chain_source);
		Reference.reachabilityFence(broadcaster);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(feeest);
		Reference.reachabilityFence(persister);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChainMonitor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChainMonitor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(chain_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(feeest); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(persister); };
		return ret_hu_conv;
	}

	/**
	 * Gets the balances in the contained [`ChannelMonitor`]s which are claimable on-chain or
	 * claims which are awaiting confirmation.
	 * 
	 * Includes the balances from each [`ChannelMonitor`] *except* those included in
	 * `ignored_channels`, allowing you to filter out balances from channels which are still open
	 * (and whose balance should likely be pulled from the [`ChannelDetails`]).
	 * 
	 * See [`ChannelMonitor::get_claimable_balances`] for more details on the exact criteria for
	 * inclusion in the return value.
	 */
	public Balance[] get_claimable_balances(ChannelDetails[] ignored_channels) {
		long[] ret = bindings.ChainMonitor_get_claimable_balances(this.ptr, ignored_channels != null ? Arrays.stream(ignored_channels).mapToLong(ignored_channels_conv_16 -> ignored_channels_conv_16 == null ? 0 : ignored_channels_conv_16.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(ignored_channels);
		int ret_conv_9_len = ret.length;
		Balance[] ret_conv_9_arr = new Balance[ret_conv_9_len];
		for (int j = 0; j < ret_conv_9_len; j++) {
			long ret_conv_9 = ret[j];
			org.ldk.structs.Balance ret_conv_9_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret_conv_9);
			if (ret_conv_9_hu_conv != null) { ret_conv_9_hu_conv.ptrs_to.add(this); };
			ret_conv_9_arr[j] = ret_conv_9_hu_conv;
		}
		for (ChannelDetails ignored_channels_conv_16: ignored_channels) { if (this != null) { this.ptrs_to.add(ignored_channels_conv_16); }; };
		return ret_conv_9_arr;
	}

	/**
	 * Gets the [`LockedChannelMonitor`] for a given funding outpoint, returning an `Err` if no
	 * such [`ChannelMonitor`] is currently being monitored for.
	 * 
	 * Note that the result holds a mutex over our monitor set, and should not be held
	 * indefinitely.
	 */
	public Result_LockedChannelMonitorNoneZ get_monitor(org.ldk.structs.OutPoint funding_txo) {
		long ret = bindings.ChainMonitor_get_monitor(this.ptr, funding_txo == null ? 0 : funding_txo.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_txo);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_LockedChannelMonitorNoneZ ret_hu_conv = Result_LockedChannelMonitorNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(funding_txo); };
		return ret_hu_conv;
	}

	/**
	 * Lists the funding outpoint of each [`ChannelMonitor`] being monitored.
	 * 
	 * Note that [`ChannelMonitor`]s are not removed when a channel is closed as they are always
	 * monitoring for on-chain state resolutions.
	 */
	public OutPoint[] list_monitors() {
		long[] ret = bindings.ChainMonitor_list_monitors(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_10_len = ret.length;
		OutPoint[] ret_conv_10_arr = new OutPoint[ret_conv_10_len];
		for (int k = 0; k < ret_conv_10_len; k++) {
			long ret_conv_10 = ret[k];
			org.ldk.structs.OutPoint ret_conv_10_hu_conv = null; if (ret_conv_10 < 0 || ret_conv_10 > 4096) { ret_conv_10_hu_conv = new org.ldk.structs.OutPoint(null, ret_conv_10); }
			if (ret_conv_10_hu_conv != null) { ret_conv_10_hu_conv.ptrs_to.add(this); };
			ret_conv_10_arr[k] = ret_conv_10_hu_conv;
		}
		return ret_conv_10_arr;
	}

	/**
	 * Lists the pending updates for each [`ChannelMonitor`] (by `OutPoint` being monitored).
	 */
	public TwoTuple_OutPointCVec_MonitorUpdateIdZZ[] list_pending_monitor_updates() {
		long[] ret = bindings.ChainMonitor_list_pending_monitor_updates(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_41_len = ret.length;
		TwoTuple_OutPointCVec_MonitorUpdateIdZZ[] ret_conv_41_arr = new TwoTuple_OutPointCVec_MonitorUpdateIdZZ[ret_conv_41_len];
		for (int p = 0; p < ret_conv_41_len; p++) {
			long ret_conv_41 = ret[p];
			TwoTuple_OutPointCVec_MonitorUpdateIdZZ ret_conv_41_hu_conv = new TwoTuple_OutPointCVec_MonitorUpdateIdZZ(null, ret_conv_41);
			if (ret_conv_41_hu_conv != null) { ret_conv_41_hu_conv.ptrs_to.add(this); };
			ret_conv_41_arr[p] = ret_conv_41_hu_conv;
		}
		return ret_conv_41_arr;
	}

	/**
	 * Indicates the persistence of a [`ChannelMonitor`] has completed after
	 * [`ChannelMonitorUpdateStatus::InProgress`] was returned from an update operation.
	 * 
	 * Thus, the anticipated use is, at a high level:
	 * 1) This [`ChainMonitor`] calls [`Persist::update_persisted_channel`] which stores the
	 * update to disk and begins updating any remote (e.g. watchtower/backup) copies,
	 * returning [`ChannelMonitorUpdateStatus::InProgress`],
	 * 2) once all remote copies are updated, you call this function with the
	 * `completed_update_id` that completed, and once all pending updates have completed the
	 * channel will be re-enabled.
	 * 
	 * Returns an [`APIError::APIMisuseError`] if `funding_txo` does not match any currently
	 * registered [`ChannelMonitor`]s.
	 */
	public Result_NoneAPIErrorZ channel_monitor_updated(org.ldk.structs.OutPoint funding_txo, org.ldk.structs.MonitorUpdateId completed_update_id) {
		long ret = bindings.ChainMonitor_channel_monitor_updated(this.ptr, funding_txo == null ? 0 : funding_txo.ptr, completed_update_id == null ? 0 : completed_update_id.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(completed_update_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(funding_txo); };
		if (this != null) { this.ptrs_to.add(completed_update_id); };
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
	public Future get_update_future() {
		long ret = bindings.ChainMonitor_get_update_future(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Future ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Future(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
		Reference.reachabilityFence(this);
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public Listen as_Listen() {
		long ret = bindings.ChainMonitor_as_Listen(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Listen ret_hu_conv = new Listen(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public Confirm as_Confirm() {
		long ret = bindings.ChainMonitor_as_Confirm(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Confirm ret_hu_conv = new Confirm(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Watch which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Watch must be freed before this_arg is
	 */
	public Watch as_Watch() {
		long ret = bindings.ChainMonitor_as_Watch(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Watch ret_hu_conv = new Watch(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public EventsProvider as_EventsProvider() {
		long ret = bindings.ChainMonitor_as_EventsProvider(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
