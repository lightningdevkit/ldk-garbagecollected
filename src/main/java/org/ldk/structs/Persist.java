package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

/**
 * `Persist` defines behavior for persisting channel monitors: this could mean
 * writing once to disk, and/or uploading to one or more backup services.
 * 
 * Note that for every new monitor, you **must** persist the new `ChannelMonitor`
 * to disk/backups. And, on every update, you **must** persist either the
 * `ChannelMonitorUpdate` or the updated monitor itself. Otherwise, there is risk
 * of situations such as revoking a transaction, then crashing before this
 * revocation can be persisted, then unintentionally broadcasting a revoked
 * transaction and losing money. This is a risk because previous channel states
 * are toxic, so it's important that whatever channel state is persisted is
 * kept up-to-date.
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
		 * Persist a new channel's data. The data can be stored any way you want, but
		 * the identifier provided by Rust-Lightning is the channel's outpoint (and
		 * it is up to you to maintain a correct mapping between the outpoint and the
		 * stored channel data). Note that you **must** persist every new monitor to
		 * disk. See the `Persist` trait documentation for more details.
		 * 
		 * See [`ChannelMonitor::serialize_for_disk`] for writing out a `ChannelMonitor`,
		 * and [`ChannelMonitorUpdateErr`] for requirements when returning errors.
		 * 
		 * [`ChannelMonitor::serialize_for_disk`]: struct.ChannelMonitor.html#method.serialize_for_disk
		 * [`ChannelMonitorUpdateErr`]: enum.ChannelMonitorUpdateErr.html
		 */
		Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint id, ChannelMonitor data);
		/**
		 * Update one channel's data. The provided `ChannelMonitor` has already
		 * applied the given update.
		 * 
		 * Note that on every update, you **must** persist either the
		 * `ChannelMonitorUpdate` or the updated monitor itself to disk/backups. See
		 * the `Persist` trait documentation for more details.
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
		 * See [`ChannelMonitor::serialize_for_disk`] for writing out a `ChannelMonitor`,
		 * [`ChannelMonitorUpdate::write`] for writing out an update, and
		 * [`ChannelMonitorUpdateErr`] for requirements when returning errors.
		 * 
		 * [`ChannelMonitor::update_monitor`]: struct.ChannelMonitor.html#impl-1
		 * [`ChannelMonitor::serialize_for_disk`]: struct.ChannelMonitor.html#method.serialize_for_disk
		 * [`ChannelMonitorUpdate::write`]: struct.ChannelMonitorUpdate.html#method.write
		 * [`ChannelMonitorUpdateErr`]: enum.ChannelMonitorUpdateErr.html
		 */
		Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint id, ChannelMonitorUpdate update, ChannelMonitor data);
	}
	private static class LDKPersistHolder { Persist held; }
	public static Persist new_impl(PersistInterface arg) {
		final LDKPersistHolder impl_holder = new LDKPersistHolder();
		impl_holder.held = new Persist(new bindings.LDKPersist() {
			@Override public long persist_new_channel(long id, long data) {
				OutPoint id_hu_conv = new OutPoint(null, id);
				id_hu_conv.ptrs_to.add(this);
				ChannelMonitor data_hu_conv = new ChannelMonitor(null, data);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.persist_new_channel(id_hu_conv, data_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long update_persisted_channel(long id, long update, long data) {
				OutPoint id_hu_conv = new OutPoint(null, id);
				id_hu_conv.ptrs_to.add(this);
				ChannelMonitorUpdate update_hu_conv = new ChannelMonitorUpdate(null, update);
				ChannelMonitor data_hu_conv = new ChannelMonitor(null, data);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.update_persisted_channel(id_hu_conv, update_hu_conv, data_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Persist a new channel's data. The data can be stored any way you want, but
	 * the identifier provided by Rust-Lightning is the channel's outpoint (and
	 * it is up to you to maintain a correct mapping between the outpoint and the
	 * stored channel data). Note that you **must** persist every new monitor to
	 * disk. See the `Persist` trait documentation for more details.
	 * 
	 * See [`ChannelMonitor::serialize_for_disk`] for writing out a `ChannelMonitor`,
	 * and [`ChannelMonitorUpdateErr`] for requirements when returning errors.
	 * 
	 * [`ChannelMonitor::serialize_for_disk`]: struct.ChannelMonitor.html#method.serialize_for_disk
	 * [`ChannelMonitorUpdateErr`]: enum.ChannelMonitorUpdateErr.html
	 */
	public Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint id, ChannelMonitor data) {
		long ret = bindings.Persist_persist_new_channel(this.ptr, id == null ? 0 : id.ptr & ~1, data == null ? 0 : data.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(id);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

	/**
	 * Update one channel's data. The provided `ChannelMonitor` has already
	 * applied the given update.
	 * 
	 * Note that on every update, you **must** persist either the
	 * `ChannelMonitorUpdate` or the updated monitor itself to disk/backups. See
	 * the `Persist` trait documentation for more details.
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
	 * See [`ChannelMonitor::serialize_for_disk`] for writing out a `ChannelMonitor`,
	 * [`ChannelMonitorUpdate::write`] for writing out an update, and
	 * [`ChannelMonitorUpdateErr`] for requirements when returning errors.
	 * 
	 * [`ChannelMonitor::update_monitor`]: struct.ChannelMonitor.html#impl-1
	 * [`ChannelMonitor::serialize_for_disk`]: struct.ChannelMonitor.html#method.serialize_for_disk
	 * [`ChannelMonitorUpdate::write`]: struct.ChannelMonitorUpdate.html#method.write
	 * [`ChannelMonitorUpdateErr`]: enum.ChannelMonitorUpdateErr.html
	 */
	public Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint id, ChannelMonitorUpdate update, ChannelMonitor data) {
		long ret = bindings.Persist_update_persisted_channel(this.ptr, id == null ? 0 : id.ptr & ~1, update == null ? 0 : update.ptr & ~1, data == null ? 0 : data.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(id);
		this.ptrs_to.add(update);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

}
