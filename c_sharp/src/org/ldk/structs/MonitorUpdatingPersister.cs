using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Implements [`Persist`] in a way that writes and reads both [`ChannelMonitor`]s and
 * [`ChannelMonitorUpdate`]s.
 * 
 * # Overview
 * 
 * The main benefit this provides over the [`KVStore`]'s [`Persist`] implementation is decreased
 * I/O bandwidth and storage churn, at the expense of more IOPS (including listing, reading, and
 * deleting) and complexity. This is because it writes channel monitor differential updates,
 * whereas the other (default) implementation rewrites the entire monitor on each update. For
 * routing nodes, updates can happen many times per second to a channel, and monitors can be tens
 * of megabytes (or more). Updates can be as small as a few hundred bytes.
 * 
 * Note that monitors written with `MonitorUpdatingPersister` are _not_ backward-compatible with
 * the default [`KVStore`]'s [`Persist`] implementation. They have a prepended byte sequence,
 * [`MONITOR_UPDATING_PERSISTER_PREPEND_SENTINEL`], applied to prevent deserialization with other
 * persisters. This is because monitors written by this struct _may_ have unapplied updates. In
 * order to downgrade, you must ensure that all updates are applied to the monitor, and remove the
 * sentinel bytes.
 * 
 * # Storing monitors
 * 
 * Monitors are stored by implementing the [`Persist`] trait, which has two functions:
 * 
 * - [`Persist::persist_new_channel`], which persists whole [`ChannelMonitor`]s.
 * - [`Persist::update_persisted_channel`], which persists only a [`ChannelMonitorUpdate`]
 * 
 * Whole [`ChannelMonitor`]s are stored in the [`CHANNEL_MONITOR_PERSISTENCE_PRIMARY_NAMESPACE`],
 * using the familiar encoding of an [`OutPoint`] (for example, `[SOME-64-CHAR-HEX-STRING]_1`).
 * 
 * Each [`ChannelMonitorUpdate`] is stored in a dynamic secondary namespace, as follows:
 * 
 * - primary namespace: [`CHANNEL_MONITOR_UPDATE_PERSISTENCE_PRIMARY_NAMESPACE`]
 * - secondary namespace: [the monitor's encoded outpoint name]
 * 
 * Under that secondary namespace, each update is stored with a number string, like `21`, which
 * represents its `update_id` value.
 * 
 * For example, consider this channel, named for its transaction ID and index, or [`OutPoint`]:
 * 
 * - Transaction ID: `deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef`
 * - Index: `1`
 * 
 * Full channel monitors would be stored at a single key:
 * 
 * `[CHANNEL_MONITOR_PERSISTENCE_PRIMARY_NAMESPACE]/deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef_1`
 * 
 * Updates would be stored as follows (with `/` delimiting primary_namespace/secondary_namespace/key):
 * 
 * ```text
 * [CHANNEL_MONITOR_UPDATE_PERSISTENCE_PRIMARY_NAMESPACE]/deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef_1/1
 * [CHANNEL_MONITOR_UPDATE_PERSISTENCE_PRIMARY_NAMESPACE]/deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef_1/2
 * [CHANNEL_MONITOR_UPDATE_PERSISTENCE_PRIMARY_NAMESPACE]/deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef_1/3
 * ```
 * ... and so on.
 * 
 * # Reading channel state from storage
 * 
 * Channel state can be reconstructed by calling
 * [`MonitorUpdatingPersister::read_all_channel_monitors_with_updates`]. Alternatively, users can
 * list channel monitors themselves and load channels individually using
 * [`MonitorUpdatingPersister::read_channel_monitor_with_updates`].
 * 
 * ## EXTREMELY IMPORTANT
 * 
 * It is extremely important that your [`KVStore::read`] implementation uses the
 * [`io::ErrorKind::NotFound`] variant correctly: that is, when a file is not found, and _only_ in
 * that circumstance (not when there is really a permissions error, for example). This is because
 * neither channel monitor reading function lists updates. Instead, either reads the monitor, and
 * using its stored `update_id`, synthesizes update storage keys, and tries them in sequence until
 * one is not found. All _other_ errors will be bubbled up in the function's [`Result`].
 * 
 * # Pruning stale channel updates
 * 
 * Stale updates are pruned when a full monitor is written. The old monitor is first read, and if
 * that succeeds, updates in the range between the old and new monitors are deleted. The `lazy`
 * flag is used on the [`KVStore::remove`] method, so there are no guarantees that the deletions
 * will complete. However, stale updates are not a problem for data integrity, since updates are
 * only read that are higher than the stored [`ChannelMonitor`]'s `update_id`.
 * 
 * If you have many stale updates stored (such as after a crash with pending lazy deletes), and
 * would like to get rid of them, consider using the
 * [`MonitorUpdatingPersister::cleanup_stale_updates`] function.
 */
public class MonitorUpdatingPersister : CommonBase {
	internal MonitorUpdatingPersister(object _dummy, long ptr) : base(ptr) { }
	~MonitorUpdatingPersister() {
		if (ptr != 0) { bindings.MonitorUpdatingPersister_free(ptr); }
	}

	/**
	 * Constructs a new [`MonitorUpdatingPersister`].
	 * 
	 * The `maximum_pending_updates` parameter controls how many updates may be stored before a
	 * [`MonitorUpdatingPersister`] consolidates updates by writing a full monitor. Note that
	 * consolidation will frequently occur with fewer updates than what you set here; this number
	 * is merely the maximum that may be stored. When setting this value, consider that for higher
	 * values of `maximum_pending_updates`:
	 * 
	 * - [`MonitorUpdatingPersister`] will tend to write more [`ChannelMonitorUpdate`]s than
	 * [`ChannelMonitor`]s, approaching one [`ChannelMonitor`] write for every
	 * `maximum_pending_updates` [`ChannelMonitorUpdate`]s.
	 * - [`MonitorUpdatingPersister`] will issue deletes differently. Lazy deletes will come in
	 * \"waves\" for each [`ChannelMonitor`] write. A larger `maximum_pending_updates` means bigger,
	 * less frequent \"waves.\"
	 * - [`MonitorUpdatingPersister`] will potentially have more listing to do if you need to run
	 * [`MonitorUpdatingPersister::cleanup_stale_updates`].
	 */
	public static MonitorUpdatingPersister of(org.ldk.structs.KVStore kv_store, org.ldk.structs.Logger logger, long maximum_pending_updates, org.ldk.structs.EntropySource entropy_source, org.ldk.structs.SignerProvider signer_provider) {
		long ret = bindings.MonitorUpdatingPersister_new(kv_store.ptr, logger.ptr, maximum_pending_updates, entropy_source.ptr, signer_provider.ptr);
		GC.KeepAlive(kv_store);
		GC.KeepAlive(logger);
		GC.KeepAlive(maximum_pending_updates);
		GC.KeepAlive(entropy_source);
		GC.KeepAlive(signer_provider);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorUpdatingPersister ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MonitorUpdatingPersister(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(kv_store); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(signer_provider); };
		return ret_hu_conv;
	}

	/**
	 * Reads all stored channel monitors, along with any stored updates for them.
	 * 
	 * It is extremely important that your [`KVStore::read`] implementation uses the
	 * [`io::ErrorKind::NotFound`] variant correctly. For more information, please see the
	 * documentation for [`MonitorUpdatingPersister`].
	 */
	public Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ read_all_channel_monitors_with_updates(org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator) {
		long ret = bindings.MonitorUpdatingPersister_read_all_channel_monitors_with_updates(this.ptr, broadcaster.ptr, fee_estimator.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
		return ret_hu_conv;
	}

	/**
	 * Read a single channel monitor, along with any stored updates for it.
	 * 
	 * It is extremely important that your [`KVStore::read`] implementation uses the
	 * [`io::ErrorKind::NotFound`] variant correctly. For more information, please see the
	 * documentation for [`MonitorUpdatingPersister`].
	 * 
	 * For `monitor_key`, channel storage keys be the channel's transaction ID and index, or
	 * [`OutPoint`], with an underscore `_` between them. For example, given:
	 * 
	 * - Transaction ID: `deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef`
	 * - Index: `1`
	 * 
	 * The correct `monitor_key` would be:
	 * `deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef_1`
	 * 
	 * Loading a large number of monitors will be faster if done in parallel. You can use this
	 * function to accomplish this. Take care to limit the number of parallel readers.
	 */
	public Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ read_channel_monitor_with_updates(org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, string monitor_key) {
		long ret = bindings.MonitorUpdatingPersister_read_channel_monitor_with_updates(this.ptr, broadcaster.ptr, fee_estimator.ptr, InternalUtils.encodeString(monitor_key));
		GC.KeepAlive(this);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(monitor_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
		return ret_hu_conv;
	}

	/**
	 * Cleans up stale updates for all monitors.
	 * 
	 * This function works by first listing all monitors, and then for each of them, listing all
	 * updates. The updates that have an `update_id` less than or equal to than the stored monitor
	 * are deleted. The deletion can either be lazy or non-lazy based on the `lazy` flag; this will
	 * be passed to [`KVStore::remove`].
	 */
	public Result_NoneIOErrorZ cleanup_stale_updates(bool lazy) {
		long ret = bindings.MonitorUpdatingPersister_cleanup_stale_updates(this.ptr, lazy);
		GC.KeepAlive(this);
		GC.KeepAlive(lazy);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Persist which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Persist must be freed before this_arg is
	 */
	public Persist as_Persist() {
		long ret = bindings.MonitorUpdatingPersister_as_Persist(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Persist ret_hu_conv = new Persist(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
