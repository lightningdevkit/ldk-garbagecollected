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

	public byte[] get_a() {
		byte[] ret = bindings.PayeePubKey_get_a(this.ptr);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.PayeePubKey_set_a(this.ptr, val);
	}

	/**
	 * Constructs a new PayeePubKey given each field
	 */
	public static PayeePubKey of(byte[] a_arg) {
		long ret = bindings.PayeePubKey_new(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		PayeePubKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PayeePubKey(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the PayeePubKey
	 */
	public PayeePubKey clone() {
		long ret = bindings.PayeePubKey_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		PayeePubKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PayeePubKey(null, ret); }
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
