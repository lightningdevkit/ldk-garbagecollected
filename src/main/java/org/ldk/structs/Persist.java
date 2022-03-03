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
 * Each method can return three possible values:
 * If persistence (including any relevant `fsync()` calls) happens immediately, the
 * implementation should return `Ok(())`, indicating normal channel operation should continue.
 * If persistence happens asynchronously, implementations should first ensure the
 * [`ChannelMonitor`] or [`ChannelMonitorUpdate`] are written durably to disk, and then return
 * `Err(ChannelMonitorUpdateErr::TemporaryFailure)` while the update continues in the
 * background. Once the update completes, [`ChainMonitor::channel_monitor_updated`] should be
 * called with the corresponding [`MonitorUpdateId`].
 * 
 * Note that unlike the direct [`chain::Watch`] interface,
 * [`ChainMonitor::channel_monitor_updated`] must be called once for *each* update which occurs.
 * 
 * If persistence fails for some reason, implementations should return
 * `Err(ChannelMonitorUpdateErr::PermanentFailure)`, in which case the channel will likely be
 * closed without broadcasting the latest state. See
 * [`ChannelMonitorUpdateErr::PermanentFailure`] for more details.
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

	public static interface PersistInterface {
		/**
		 * Persist a new channel's data in response to a [`chain::Watch::watch_channel`] call. This is
		 * called by [`ChannelManager`] for new channels, or may be called directly, e.g. on startup.
		 * 
		 * The data can be stored any way you want, but the identifier provided by LDK is the
		 * channel's outpoint (and it is up to you to maintain a correct mapping between the outpoint
		 * and the stored channel data). Note that you **must** persist every new monitor to disk.
		 * 
		 * The `update_id` is used to identify this call to [`ChainMonitor::channel_monitor_updated`],
		 * if you return [`ChannelMonitorUpdateErr::TemporaryFailure`].
		 * 
		 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`
		 * and [`ChannelMonitorUpdateErr`] for requirements when returning errors.
		 * 
		 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
		 * [`Writeable::write`]: crate::util::ser::Writeable::write
		 */
		Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint channel_id, ChannelMonitor data, MonitorUpdateId update_id);
		/**
		 * Update one channel's data. The provided [`ChannelMonitor`] has already applied the given
		 * update.
		 * 
		 * Note that on every update, you **must** persist either the [`ChannelMonitorUpdate`] or the
		 * updated monitor itself to disk/backups. See the [`Persist`] trait documentation for more
		 * details.
		 * 
		 * During blockchain synchronization operations, this may be called with no
		 * [`ChannelMonitorUpdate`], in which case the full [`ChannelMonitor`] needs to be persisted.
		 * Note that after the full [`ChannelMonitor`] is persisted any previous
		 * [`ChannelMonitorUpdate`]s which were persisted should be discarded - they can no longer be
		 * applied to the persisted [`ChannelMonitor`] as they were already applied.
		 * 
		 * If an implementer chooses to persist the updates only, they need to make
		 * sure that all the updates are applied to the `ChannelMonitors` *before
		 * the set of channel monitors is given to the `ChannelManager`
		 * deserialization routine. See [`ChannelMonitor::update_monitor`] for
		 * applying a monitor update to a monitor. If full `ChannelMonitors` are
		 * persisted, then there is no need to persist individual updates.
		 * 
		 * Note that there could be a performance tradeoff between persisting complete
		 * channel monitors on every update vs. persisting only updates and applying
		 * them in batches. The size of each monitor grows `O(number of state updates)`
		 * whereas updates are small and `O(1)`.
		 * 
		 * The `update_id` is used to identify this call to [`ChainMonitor::channel_monitor_updated`],
		 * if you return [`ChannelMonitorUpdateErr::TemporaryFailure`].
		 * 
		 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`,
		 * [`Writeable::write`] on [`ChannelMonitorUpdate`] for writing out an update, and
		 * [`ChannelMonitorUpdateErr`] for requirements when returning errors.
		 * 
		 * [`Writeable::write`]: crate::util::ser::Writeable::write
		 * 
		 * Note that update (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint channel_id, ChannelMonitorUpdate update, ChannelMonitor data, MonitorUpdateId update_id);
	}
	private static class LDKPersistHolder { Persist held; }
	public static Persist new_impl(PersistInterface arg) {
		final LDKPersistHolder impl_holder = new LDKPersistHolder();
		impl_holder.held = new Persist(new bindings.LDKPersist() {
			@Override public long persist_new_channel(long channel_id, long data, long update_id) {
				OutPoint channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new OutPoint(null, channel_id); }
				channel_id_hu_conv.ptrs_to.add(this);
				ChannelMonitor data_hu_conv = null; if (data < 0 || data > 4096) { data_hu_conv = new ChannelMonitor(null, data); }
				MonitorUpdateId update_id_hu_conv = null; if (update_id < 0 || update_id > 4096) { update_id_hu_conv = new MonitorUpdateId(null, update_id); }
				update_id_hu_conv.ptrs_to.add(this);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.persist_new_channel(channel_id_hu_conv, data_hu_conv, update_id_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long update_persisted_channel(long channel_id, long update, long data, long update_id) {
				OutPoint channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new OutPoint(null, channel_id); }
				channel_id_hu_conv.ptrs_to.add(this);
				ChannelMonitorUpdate update_hu_conv = null; if (update < 0 || update > 4096) { update_hu_conv = new ChannelMonitorUpdate(null, update); }
				ChannelMonitor data_hu_conv = null; if (data < 0 || data > 4096) { data_hu_conv = new ChannelMonitor(null, data); }
				MonitorUpdateId update_id_hu_conv = null; if (update_id < 0 || update_id > 4096) { update_id_hu_conv = new MonitorUpdateId(null, update_id); }
				update_id_hu_conv.ptrs_to.add(this);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.update_persisted_channel(channel_id_hu_conv, update_hu_conv, data_hu_conv, update_id_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Persist a new channel's data in response to a [`chain::Watch::watch_channel`] call. This is
	 * called by [`ChannelManager`] for new channels, or may be called directly, e.g. on startup.
	 * 
	 * The data can be stored any way you want, but the identifier provided by LDK is the
	 * channel's outpoint (and it is up to you to maintain a correct mapping between the outpoint
	 * and the stored channel data). Note that you **must** persist every new monitor to disk.
	 * 
	 * The `update_id` is used to identify this call to [`ChainMonitor::channel_monitor_updated`],
	 * if you return [`ChannelMonitorUpdateErr::TemporaryFailure`].
	 * 
	 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`
	 * and [`ChannelMonitorUpdateErr`] for requirements when returning errors.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`Writeable::write`]: crate::util::ser::Writeable::write
	 */
	public Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint channel_id, ChannelMonitor data, MonitorUpdateId update_id) {
		long ret = bindings.Persist_persist_new_channel(this.ptr, channel_id == null ? 0 : channel_id.ptr & ~1, data == null ? 0 : data.ptr & ~1, update_id == null ? 0 : update_id.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(data);
		Reference.reachabilityFence(update_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

	/**
	 * Update one channel's data. The provided [`ChannelMonitor`] has already applied the given
	 * update.
	 * 
	 * Note that on every update, you **must** persist either the [`ChannelMonitorUpdate`] or the
	 * updated monitor itself to disk/backups. See the [`Persist`] trait documentation for more
	 * details.
	 * 
	 * During blockchain synchronization operations, this may be called with no
	 * [`ChannelMonitorUpdate`], in which case the full [`ChannelMonitor`] needs to be persisted.
	 * Note that after the full [`ChannelMonitor`] is persisted any previous
	 * [`ChannelMonitorUpdate`]s which were persisted should be discarded - they can no longer be
	 * applied to the persisted [`ChannelMonitor`] as they were already applied.
	 * 
	 * If an implementer chooses to persist the updates only, they need to make
	 * sure that all the updates are applied to the `ChannelMonitors` *before
	 * the set of channel monitors is given to the `ChannelManager`
	 * deserialization routine. See [`ChannelMonitor::update_monitor`] for
	 * applying a monitor update to a monitor. If full `ChannelMonitors` are
	 * persisted, then there is no need to persist individual updates.
	 * 
	 * Note that there could be a performance tradeoff between persisting complete
	 * channel monitors on every update vs. persisting only updates and applying
	 * them in batches. The size of each monitor grows `O(number of state updates)`
	 * whereas updates are small and `O(1)`.
	 * 
	 * The `update_id` is used to identify this call to [`ChainMonitor::channel_monitor_updated`],
	 * if you return [`ChannelMonitorUpdateErr::TemporaryFailure`].
	 * 
	 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`,
	 * [`Writeable::write`] on [`ChannelMonitorUpdate`] for writing out an update, and
	 * [`ChannelMonitorUpdateErr`] for requirements when returning errors.
	 * 
	 * [`Writeable::write`]: crate::util::ser::Writeable::write
	 * 
	 * Note that update (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint channel_id, @Nullable ChannelMonitorUpdate update, ChannelMonitor data, MonitorUpdateId update_id) {
		long ret = bindings.Persist_update_persisted_channel(this.ptr, channel_id == null ? 0 : channel_id.ptr & ~1, update == null ? 0 : update.ptr & ~1, data == null ? 0 : data.ptr & ~1, update_id == null ? 0 : update_id.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(update);
		Reference.reachabilityFence(data);
		Reference.reachabilityFence(update_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(update);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

}
