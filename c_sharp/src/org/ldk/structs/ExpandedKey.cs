using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A set of keys that were HKDF-expanded. Returned by [`NodeSigner::get_expanded_key`].
 * 
 * [`NodeSigner::get_expanded_key`]: crate::sign::NodeSigner::get_expanded_key
 */
public class ExpandedKey : CommonBase {
	internal ExpandedKey(object _dummy, long ptr) : base(ptr) { }
	~ExpandedKey() {
		if (ptr != 0) { bindings.ExpandedKey_free(ptr); }
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ExpandedKey.
	 */
	public long hash() {
		long ret = bindings.ExpandedKey_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	internal long clone_ptr() {
		long ret = bindings.ExpandedKey_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ExpandedKey
	 */
	public org.ldk.structs.ExpandedKey clone() {
		long ret = bindings.ExpandedKey_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpandedKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpandedKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ExpandedKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ExpandedKey b) {
		bool ret = bindings.ExpandedKey_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ExpandedKey)) return false;
		return this.eq((ExpandedKey)o);
	}
	/**
	 * Create a  new [`ExpandedKey`] for generating an inbound payment hash and secret.
	 * 
	 * It is recommended to cache this value and not regenerate it for each new inbound payment.
	 */
	public static org.ldk.structs.ExpandedKey of(byte[] key_material) {
		long ret = bindings.ExpandedKey_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(key_material, 32)));
		GC.KeepAlive(key_material);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpandedKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpandedKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
