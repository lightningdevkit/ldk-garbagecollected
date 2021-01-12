
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
		Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint id, ChannelMonitor data);
		Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint id, ChannelMonitorUpdate update, ChannelMonitor data);
	}
	private static class LDKPersistHolder { Persist held; }
	public static Persist new_impl(PersistInterface arg) {
		final LDKPersistHolder impl_holder = new LDKPersistHolder();
		impl_holder.held = new Persist(new bindings.LDKPersist() {
			@Override public uint32_t persist_new_channel(uint32_t id, uint32_t data) {
				OutPoint id_hu_conv = new OutPoint(null, id);
				ChannelMonitor data_hu_conv = new ChannelMonitor(null, data);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.persist_new_channel(id_hu_conv, data_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t update_persisted_channel(uint32_t id, uint32_t update, uint32_t data) {
				OutPoint id_hu_conv = new OutPoint(null, id);
				ChannelMonitorUpdate update_hu_conv = new ChannelMonitorUpdate(null, update);
				ChannelMonitor data_hu_conv = new ChannelMonitor(null, data);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.update_persisted_channel(id_hu_conv, update_hu_conv, data_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
		});
		return impl_holder.held;
	}
	public Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint id, ChannelMonitor data) {
		uint32_t ret = bindings.Persist_persist_new_channel(this.ptr, id == null ? 0 : id.ptr & ~1, data == null ? 0 : data.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(id);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

	public Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint id, ChannelMonitorUpdate update, ChannelMonitor data) {
		uint32_t ret = bindings.Persist_update_persisted_channel(this.ptr, id == null ? 0 : id.ptr & ~1, update == null ? 0 : update.ptr & ~1, data == null ? 0 : data.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(id);
		this.ptrs_to.add(update);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

}
