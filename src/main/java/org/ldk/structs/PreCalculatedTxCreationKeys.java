package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PreCalculatedTxCreationKeys extends CommonBase {
	PreCalculatedTxCreationKeys(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PreCalculatedTxCreationKeys_free(ptr); }
	}

	public static PreCalculatedTxCreationKeys constructor_clone(PreCalculatedTxCreationKeys orig) {
		long ret = bindings.PreCalculatedTxCreationKeys_clone(orig == null ? 0 : orig.ptr & ~1);
		PreCalculatedTxCreationKeys ret_hu_conv = new PreCalculatedTxCreationKeys(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public static PreCalculatedTxCreationKeys constructor_new(TxCreationKeys keys) {
		long ret = bindings.PreCalculatedTxCreationKeys_new(keys == null ? 0 : keys.ptr & ~1);
		PreCalculatedTxCreationKeys ret_hu_conv = new PreCalculatedTxCreationKeys(null, ret);
		ret_hu_conv.ptrs_to.add(keys);
		return ret_hu_conv;
	}

	public TxCreationKeys trust_key_derivation() {
		long ret = bindings.PreCalculatedTxCreationKeys_trust_key_derivation(this.ptr);
		TxCreationKeys ret_hu_conv = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public byte[] per_commitment_point() {
		byte[] ret = bindings.PreCalculatedTxCreationKeys_per_commitment_point(this.ptr);
		return ret;
	}

}
