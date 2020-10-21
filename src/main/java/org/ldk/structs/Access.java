package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Access extends CommonBase {
	Access(Object _dummy, long ptr) { super(ptr); }
	public Access(bindings.LDKAccess arg) {
		super(bindings.LDKAccess_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Access_free(ptr); super.finalize();
	}

	public Result_TxOutAccessErrorZ get_utxo(byte[] genesis_hash, long short_channel_id) {
		long ret = bindings.Access_get_utxo(this.ptr, genesis_hash, short_channel_id);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
