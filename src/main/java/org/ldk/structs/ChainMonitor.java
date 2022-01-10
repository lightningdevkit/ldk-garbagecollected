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
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [module-level documentation]: crate::chain::chainmonitor
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
	public static ChainMonitor of(Option_FilterZ chain_source, BroadcasterInterface broadcaster, Logger logger, FeeEstimator feeest, Persist persister) {
		long ret = bindings.ChainMonitor_new(chain_source.ptr, broadcaster == null ? 0 : broadcaster.ptr, logger == null ? 0 : logger.ptr, feeest == null ? 0 : feeest.ptr, persister == null ? 0 : persister.ptr);
		Reference.reachabilityFence(chain_source);
		Reference.reachabilityFence(broadcaster);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(feeest);
		Reference.reachabilityFence(persister);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChainMonitor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChainMonitor(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(chain_source);
		ret_hu_conv.ptrs_to.add(broadcaster);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(feeest);
		ret_hu_conv.ptrs_to.add(persister);
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
		long[] ret = bindings.ChainMonitor_get_claimable_balances(this.ptr, ignored_channels != null ? Arrays.stream(ignored_channels).mapToLong(ignored_channels_conv_16 -> ignored_channels_conv_16 == null ? 0 : ignored_channels_conv_16.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(ignored_channels);
		int ret_conv_9_len = ret.length;
		Balance[] ret_conv_9_arr = new Balance[ret_conv_9_len];
		for (int j = 0; j < ret_conv_9_len; j++) {
			long ret_conv_9 = ret[j];
			Balance ret_conv_9_hu_conv = Balance.constr_from_ptr(ret_conv_9);
			ret_conv_9_hu_conv.ptrs_to.add(this);
			ret_conv_9_arr[j] = ret_conv_9_hu_conv;
		}
		return ret_conv_9_arr;
	}

	/**
	 * Gets the [`LockedChannelMonitor`] for a given funding outpoint, returning an `Err` if no
	 * such [`ChannelMonitor`] is currently being monitored for.
	 * 
	 * Note that the result holds a mutex over our monitor set, and should not be held
	 * indefinitely.
	 */
	public Result_LockedChannelMonitorNoneZ get_monitor(OutPoint funding_txo) {
		long ret = bindings.ChainMonitor_get_monitor(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_txo);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_LockedChannelMonitorNoneZ ret_hu_conv = Result_LockedChannelMonitorNoneZ.constr_from_ptr(ret);
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
			OutPoint ret_conv_10_hu_conv = null; if (ret_conv_10 < 0 || ret_conv_10 > 4096) { ret_conv_10_hu_conv = new OutPoint(null, ret_conv_10); }
			ret_conv_10_hu_conv.ptrs_to.add(this);
			ret_conv_10_arr[k] = ret_conv_10_hu_conv;
		}
		return ret_conv_10_arr;
	}

	/**
	 * Indicates the persistence of a [`ChannelMonitor`] has completed after
	 * [`ChannelMonitorUpdateErr::TemporaryFailure`] was returned from an update operation.
	 * 
	 * Thus, the anticipated use is, at a high level:
	 * 1) This [`ChainMonitor`] calls [`Persist::update_persisted_channel`] which stores the
	 * update to disk and begins updating any remote (e.g. watchtower/backup) copies,
	 * returning [`ChannelMonitorUpdateErr::TemporaryFailure`],
	 * 2) once all remote copies are updated, you call this function with the
	 * `completed_update_id` that completed, and once all pending updates have completed the
	 * channel will be re-enabled.
	 * 
	 * Returns an [`APIError::APIMisuseError`] if `funding_txo` does not match any currently
	 * registered [`ChannelMonitor`]s.
	 */
	public Result_NoneAPIErrorZ channel_monitor_updated(OutPoint funding_txo, MonitorUpdateId completed_update_id) {
		long ret = bindings.ChainMonitor_channel_monitor_updated(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, completed_update_id == null ? 0 : completed_update_id.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(completed_update_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
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
		ret_hu_conv.ptrs_to.add(this);
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
		ret_hu_conv.ptrs_to.add(this);
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
		ret_hu_conv.ptrs_to.add(this);
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
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
