
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Access extends CommonBase {
	final bindings.LDKAccess bindings_instance;
	Access(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Access(bindings.LDKAccess arg) {
		super(bindings.LDKAccess_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Access_free(ptr); } super.finalize();
	}

	public static interface AccessInterface {
		Result_TxOutAccessErrorZ get_utxo(byte[] genesis_hash, long short_channel_id);
	}
	private static class LDKAccessHolder { Access held; }
	public static Access new_impl(AccessInterface arg) {
		final LDKAccessHolder impl_holder = new LDKAccessHolder();
		impl_holder.held = new Access(new bindings.LDKAccess() {
			@Override public uint32_t get_utxo(byte[] genesis_hash, long short_channel_id) {
				Result_TxOutAccessErrorZ ret = arg.get_utxo(genesis_hash, short_channel_id);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
		});
		return impl_holder.held;
	}
	public Result_TxOutAccessErrorZ get_utxo(byte[] genesis_hash, long short_channel_id) {
		uint32_t ret = bindings.Access_get_utxo(this.ptr, genesis_hash, short_channel_id);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
