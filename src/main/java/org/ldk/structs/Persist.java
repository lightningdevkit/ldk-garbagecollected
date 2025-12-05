package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Persist extends CommonBase {
	final bindings.LDKPersist bindings_instance;
	Persist(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Persist(bindings.LDKPersist arg) {
		super(bindings.LDKPersist_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Persist_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.Persist_free(ptr); }
		ptr = 0;
	}
	public static interface PersistInterface {
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
		ChannelMonitorUpdateStatus persist_new_channel(MonitorName monitor_name, ChannelMonitor monitor);
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
		ChannelMonitorUpdateStatus update_persisted_channel(MonitorName monitor_name, ChannelMonitorUpdate monitor_update, ChannelMonitor monitor);
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
		void archive_persisted_channel(MonitorName monitor_name);
		/**
		 * Fetches the set of [`ChannelMonitorUpdate`]s, previously persisted with
		 * [`Self::update_persisted_channel`], which have completed.
		 * 
		 * Returning an update here is equivalent to calling
		 * [`ChainMonitor::channel_monitor_updated`]. Because of this, this method is defaulted and
		 * hidden in the docs.
		 */
		TwoTuple_ChannelIdu64Z[] get_and_clear_completed_updates();
	}
	private static class LDKPersistHolder { Persist held; }
	public static Persist new_impl(PersistInterface arg) {
		final LDKPersistHolder impl_holder = new LDKPersistHolder();
		impl_holder.held = new Persist(new bindings.LDKPersist() {
			@Override public ChannelMonitorUpdateStatus persist_new_channel(long monitor_name, long monitor) {
				org.ldk.structs.MonitorName monitor_name_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(monitor_name);
				if (monitor_name_hu_conv != null) { monitor_name_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitor monitor_hu_conv = null; if (monitor < 0 || monitor > 4096) { monitor_hu_conv = new org.ldk.structs.ChannelMonitor(null, monitor); }
				ChannelMonitorUpdateStatus ret = arg.persist_new_channel(monitor_name_hu_conv, monitor_hu_conv);
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public ChannelMonitorUpdateStatus update_persisted_channel(long monitor_name, long monitor_update, long monitor) {
				org.ldk.structs.MonitorName monitor_name_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(monitor_name);
				if (monitor_name_hu_conv != null) { monitor_name_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitorUpdate monitor_update_hu_conv = null; if (monitor_update < 0 || monitor_update > 4096) { monitor_update_hu_conv = new org.ldk.structs.ChannelMonitorUpdate(null, monitor_update); }
				if (monitor_update_hu_conv != null) { monitor_update_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ChannelMonitor monitor_hu_conv = null; if (monitor < 0 || monitor > 4096) { monitor_hu_conv = new org.ldk.structs.ChannelMonitor(null, monitor); }
				ChannelMonitorUpdateStatus ret = arg.update_persisted_channel(monitor_name_hu_conv, monitor_update_hu_conv, monitor_hu_conv);
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public void archive_persisted_channel(long monitor_name) {
				org.ldk.structs.MonitorName monitor_name_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(monitor_name);
				if (monitor_name_hu_conv != null) { monitor_name_hu_conv.ptrs_to.add(this); };
				arg.archive_persisted_channel(monitor_name_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public long[] get_and_clear_completed_updates() {
				TwoTuple_ChannelIdu64Z[] ret = arg.get_and_clear_completed_updates();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_24 -> ret_conv_24.clone_ptr()).toArray() : null;
				return result;
			}
		});
		return impl_holder.held;
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
	public ChannelMonitorUpdateStatus persist_new_channel(org.ldk.structs.MonitorName monitor_name, org.ldk.structs.ChannelMonitor monitor) {
		ChannelMonitorUpdateStatus ret = bindings.Persist_persist_new_channel(this.ptr, monitor_name.ptr, monitor.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(monitor_name);
		Reference.reachabilityFence(monitor);
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
	public ChannelMonitorUpdateStatus update_persisted_channel(org.ldk.structs.MonitorName monitor_name, @Nullable org.ldk.structs.ChannelMonitorUpdate monitor_update, org.ldk.structs.ChannelMonitor monitor) {
		ChannelMonitorUpdateStatus ret = bindings.Persist_update_persisted_channel(this.ptr, monitor_name.ptr, monitor_update == null ? 0 : monitor_update.ptr, monitor.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(monitor_name);
		Reference.reachabilityFence(monitor_update);
		Reference.reachabilityFence(monitor);
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
	public void archive_persisted_channel(org.ldk.structs.MonitorName monitor_name) {
		bindings.Persist_archive_persisted_channel(this.ptr, monitor_name.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(monitor_name);
	}

	/**
	 * Fetches the set of [`ChannelMonitorUpdate`]s, previously persisted with
	 * [`Self::update_persisted_channel`], which have completed.
	 * 
	 * Returning an update here is equivalent to calling
	 * [`ChainMonitor::channel_monitor_updated`]. Because of this, this method is defaulted and
	 * hidden in the docs.
	 */
	public TwoTuple_ChannelIdu64Z[] get_and_clear_completed_updates() {
		long[] ret = bindings.Persist_get_and_clear_completed_updates(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_24_len = ret.length;
		TwoTuple_ChannelIdu64Z[] ret_conv_24_arr = new TwoTuple_ChannelIdu64Z[ret_conv_24_len];
		for (int y = 0; y < ret_conv_24_len; y++) {
			long ret_conv_24 = ret[y];
			TwoTuple_ChannelIdu64Z ret_conv_24_hu_conv = new TwoTuple_ChannelIdu64Z(null, ret_conv_24);
			if (ret_conv_24_hu_conv != null) { ret_conv_24_hu_conv.ptrs_to.add(this); };
			ret_conv_24_arr[y] = ret_conv_24_hu_conv;
		}
		return ret_conv_24_arr;
	}

}
