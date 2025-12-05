package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A set of keys that were HKDF-expanded. Returned by [`NodeSigner::get_expanded_key`].
 * 
 * [`NodeSigner::get_expanded_key`]: crate::sign::NodeSigner::get_expanded_key
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ExpandedKey extends CommonBase {
	ExpandedKey(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ExpandedKey_free(ptr); }
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ExpandedKey.
	 */
	public long hash() {
		long ret = bindings.ExpandedKey_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	long clone_ptr() {
		long ret = bindings.ExpandedKey_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ExpandedKey
	 */
	public ExpandedKey clone() {
		long ret = bindings.ExpandedKey_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpandedKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpandedKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ExpandedKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.ExpandedKey b) {
		boolean ret = bindings.ExpandedKey_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ExpandedKey)) return false;
		return this.eq((ExpandedKey)o);
	}
	/**
	 * Create a  new [`ExpandedKey`] for generating an inbound payment hash and secret.
	 * 
	 * It is recommended to cache this value and not regenerate it for each new inbound payment.
	 */
	public static ExpandedKey of(byte[] key_material) {
		long ret = bindings.ExpandedKey_new(InternalUtils.check_arr_len(key_material, 32));
		Reference.reachabilityFence(key_material);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpandedKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpandedKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
