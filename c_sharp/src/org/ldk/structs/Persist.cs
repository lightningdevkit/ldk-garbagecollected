using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * `Persist` defines behavior for persisting channel monitors: this could mean
 * writing once to disk, and/or uploading to one or more backup services.
 * 
 * Each method can return three possible values:
 * If persistence (including any relevant `fsync()` calls) happens immediately, the
 * implementation should return [`ChannelMonitorUpdateStatus::Completed`], indicating normal
 * channel operation should continue.
 * If persistence happens asynchronously, implementations should first ensure the
 * [`ChannelMonitor`] or [`ChannelMonitorUpdate`] are written durably to disk, and then return
 * [`ChannelMonitorUpdateStatus::InProgress`] while the update continues in the background.
 * Once the update completes, [`ChainMonitor::channel_monitor_updated`] should be called with
 * the corresponding [`MonitorUpdateId`].
 * 
 * Note that unlike the direct [`chain::Watch`] interface,
 * [`ChainMonitor::channel_monitor_updated`] must be called once for *each* update which occurs.
 * 
 * If persistence fails for some reason, implementations should return
 * [`ChannelMonitorUpdateStatus::PermanentFailure`], in which case the channel will likely be
 * closed without broadcasting the latest state. See
 * [`ChannelMonitorUpdateStatus::PermanentFailure`] for more details.
 */
public class Persist : CommonBase {
	internal readonly bindings.LDKPersist bindings_instance;
	internal Persist(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Persist(bindings.LDKPersist arg) : base(bindings.LDKPersist_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Persist() {
		if (ptr != 0) { bindings.Persist_free(ptr); }
	}

	public interface PersistInterface {
		/**
		 * Persist a new channel's data in response to a [`chain::Watch::watch_channel`] call. This is
		 * called by [`ChannelManager`] for new channels, or may be called directly, e.g. on startup.
		 * 
		 * The data can be stored any way you want, but the identifier provided by LDK is the
		 * channel's outpoint (and it is up to you to maintain a correct mapping between the outpoint
		 * and the stored channel data). Note that you **must** persist every new monitor to disk.
		 * 
		 * The `update_id` is used to identify this call to [`ChainMonitor::channel_monitor_updated`],
		 * if you return [`ChannelMonitorUpdateStatus::InProgress`].
		 * 
		 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`
		 * and [`ChannelMonitorUpdateStatus`] for requirements when returning errors.
		 * 
		 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
		 * [`Writeable::write`]: crate::util::ser::Writeable::write
		 */
		ChannelMonitorUpdateStatus persist_new_channel(OutPoint _channel_id, ChannelMonitor _data, MonitorUpdateId _update_id);
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
		 * if you return [`ChannelMonitorUpdateStatus::InProgress`].
		 * 
		 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`,
		 * [`Writeable::write`] on [`ChannelMonitorUpdate`] for writing out an update, and
		 * [`ChannelMonitorUpdateStatus`] for requirements when returning errors.
		 * 
		 * [`Writeable::write`]: crate::util::ser::Writeable::write
		 * 
		 * Note that update (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		ChannelMonitorUpdateStatus update_persisted_channel(OutPoint _channel_id, ChannelMonitorUpdate _update, ChannelMonitor _data, MonitorUpdateId _update_id);
	}
	private class LDKPersistHolder { internal Persist held; }
	private class LDKPersistImpl : bindings.LDKPersist {
		internal LDKPersistImpl(PersistInterface arg, LDKPersistHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private PersistInterface arg;
		private LDKPersistHolder impl_holder;
		public ChannelMonitorUpdateStatus persist_new_channel(long _channel_id, long _data, long _update_id) {
			org.ldk.structs.OutPoint _channel_id_hu_conv = null; if (_channel_id < 0 || _channel_id > 4096) { _channel_id_hu_conv = new org.ldk.structs.OutPoint(null, _channel_id); }
			if (_channel_id_hu_conv != null) { _channel_id_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ChannelMonitor _data_hu_conv = null; if (_data < 0 || _data > 4096) { _data_hu_conv = new org.ldk.structs.ChannelMonitor(null, _data); }
			org.ldk.structs.MonitorUpdateId _update_id_hu_conv = null; if (_update_id < 0 || _update_id > 4096) { _update_id_hu_conv = new org.ldk.structs.MonitorUpdateId(null, _update_id); }
			if (_update_id_hu_conv != null) { _update_id_hu_conv.ptrs_to.AddLast(this); };
			ChannelMonitorUpdateStatus ret = arg.persist_new_channel(_channel_id_hu_conv, _data_hu_conv, _update_id_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
		public ChannelMonitorUpdateStatus update_persisted_channel(long _channel_id, long _update, long _data, long _update_id) {
			org.ldk.structs.OutPoint _channel_id_hu_conv = null; if (_channel_id < 0 || _channel_id > 4096) { _channel_id_hu_conv = new org.ldk.structs.OutPoint(null, _channel_id); }
			if (_channel_id_hu_conv != null) { _channel_id_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ChannelMonitorUpdate _update_hu_conv = null; if (_update < 0 || _update > 4096) { _update_hu_conv = new org.ldk.structs.ChannelMonitorUpdate(null, _update); }
			org.ldk.structs.ChannelMonitor _data_hu_conv = null; if (_data < 0 || _data > 4096) { _data_hu_conv = new org.ldk.structs.ChannelMonitor(null, _data); }
			org.ldk.structs.MonitorUpdateId _update_id_hu_conv = null; if (_update_id < 0 || _update_id > 4096) { _update_id_hu_conv = new org.ldk.structs.MonitorUpdateId(null, _update_id); }
			if (_update_id_hu_conv != null) { _update_id_hu_conv.ptrs_to.AddLast(this); };
			ChannelMonitorUpdateStatus ret = arg.update_persisted_channel(_channel_id_hu_conv, _update_hu_conv, _data_hu_conv, _update_id_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
	}
	public static Persist new_impl(PersistInterface arg) {
		LDKPersistHolder impl_holder = new LDKPersistHolder();
		impl_holder.held = new Persist(new LDKPersistImpl(arg, impl_holder));
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
	 * if you return [`ChannelMonitorUpdateStatus::InProgress`].
	 * 
	 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`
	 * and [`ChannelMonitorUpdateStatus`] for requirements when returning errors.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`Writeable::write`]: crate::util::ser::Writeable::write
	 */
	public ChannelMonitorUpdateStatus persist_new_channel(org.ldk.structs.OutPoint channel_id, org.ldk.structs.ChannelMonitor data, org.ldk.structs.MonitorUpdateId update_id) {
		ChannelMonitorUpdateStatus ret = bindings.Persist_persist_new_channel(this.ptr, channel_id == null ? 0 : channel_id.ptr, data == null ? 0 : data.ptr, update_id == null ? 0 : update_id.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(data);
		GC.KeepAlive(update_id);
		if (this != null) { this.ptrs_to.AddLast(channel_id); };
		if (this != null) { this.ptrs_to.AddLast(data); };
		if (this != null) { this.ptrs_to.AddLast(update_id); };
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
	 * if you return [`ChannelMonitorUpdateStatus::InProgress`].
	 * 
	 * See [`Writeable::write`] on [`ChannelMonitor`] for writing out a `ChannelMonitor`,
	 * [`Writeable::write`] on [`ChannelMonitorUpdate`] for writing out an update, and
	 * [`ChannelMonitorUpdateStatus`] for requirements when returning errors.
	 * 
	 * [`Writeable::write`]: crate::util::ser::Writeable::write
	 * 
	 * Note that update (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ChannelMonitorUpdateStatus update_persisted_channel(org.ldk.structs.OutPoint channel_id, org.ldk.structs.ChannelMonitorUpdate update, org.ldk.structs.ChannelMonitor data, org.ldk.structs.MonitorUpdateId update_id) {
		ChannelMonitorUpdateStatus ret = bindings.Persist_update_persisted_channel(this.ptr, channel_id == null ? 0 : channel_id.ptr, update == null ? 0 : update.ptr, data == null ? 0 : data.ptr, update_id == null ? 0 : update_id.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(update);
		GC.KeepAlive(data);
		GC.KeepAlive(update_id);
		if (this != null) { this.ptrs_to.AddLast(channel_id); };
		if (this != null) { this.ptrs_to.AddLast(update); };
		if (this != null) { this.ptrs_to.AddLast(data); };
		if (this != null) { this.ptrs_to.AddLast(update_id); };
		return ret;
	}

}
} } }
