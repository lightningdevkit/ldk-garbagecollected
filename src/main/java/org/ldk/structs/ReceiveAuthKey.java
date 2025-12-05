package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A secret key used to authenticate message contexts in received [`BlindedMessagePath`]s.
 * 
 * This key ensures that a node only accepts incoming messages delivered through
 * blinded paths that it constructed itself.
 * 
 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ReceiveAuthKey extends CommonBase {
	ReceiveAuthKey(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ReceiveAuthKey_free(ptr); }
	}

	public byte[] get_a() {
		byte[] ret = bindings.ReceiveAuthKey_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.ReceiveAuthKey_set_a(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ReceiveAuthKey given each field
	 */
	public static ReceiveAuthKey of(byte[] a_arg) {
		long ret = bindings.ReceiveAuthKey_new(InternalUtils.check_arr_len(a_arg, 32));
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReceiveAuthKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReceiveAuthKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ReceiveAuthKey_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ReceiveAuthKey
	 */
	public ReceiveAuthKey clone() {
		long ret = bindings.ReceiveAuthKey_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReceiveAuthKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReceiveAuthKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ReceiveAuthKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.ReceiveAuthKey b) {
		boolean ret = bindings.ReceiveAuthKey_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ReceiveAuthKey)) return false;
		return this.eq((ReceiveAuthKey)o);
	}
}
