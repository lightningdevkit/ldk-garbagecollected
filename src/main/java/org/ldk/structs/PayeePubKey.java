package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Payee public key
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PayeePubKey extends CommonBase {
	PayeePubKey(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PayeePubKey_free(ptr); }
	}

	/**
	 * Creates a copy of the PayeePubKey
	 */
	public PayeePubKey clone() {
		long ret = bindings.PayeePubKey_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		PayeePubKey ret_hu_conv = new PayeePubKey(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PayeePubKeys contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.PayeePubKey_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two PayeePubKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(PayeePubKey b) {
		boolean ret = bindings.PayeePubKey_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
