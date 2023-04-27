package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * `min_final_cltv_expiry_delta` to use for the last HTLC in the route
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MinFinalCltvExpiryDelta extends CommonBase {
	MinFinalCltvExpiryDelta(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MinFinalCltvExpiryDelta_free(ptr); }
	}

	public long get_a() {
		long ret = bindings.MinFinalCltvExpiryDelta_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(long val) {
		bindings.MinFinalCltvExpiryDelta_set_a(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new MinFinalCltvExpiryDelta given each field
	 */
	public static MinFinalCltvExpiryDelta of(long a_arg) {
		long ret = bindings.MinFinalCltvExpiryDelta_new(a_arg);
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MinFinalCltvExpiryDelta ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MinFinalCltvExpiryDelta(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.MinFinalCltvExpiryDelta_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the MinFinalCltvExpiryDelta
	 */
	public MinFinalCltvExpiryDelta clone() {
		long ret = bindings.MinFinalCltvExpiryDelta_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MinFinalCltvExpiryDelta ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MinFinalCltvExpiryDelta(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the MinFinalCltvExpiryDelta.
	 */
	public long hash() {
		long ret = bindings.MinFinalCltvExpiryDelta_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two MinFinalCltvExpiryDeltas contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.MinFinalCltvExpiryDelta b) {
		boolean ret = bindings.MinFinalCltvExpiryDelta_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof MinFinalCltvExpiryDelta)) return false;
		return this.eq((MinFinalCltvExpiryDelta)o);
	}
}
