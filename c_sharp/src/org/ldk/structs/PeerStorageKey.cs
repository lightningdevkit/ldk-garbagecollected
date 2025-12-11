using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Represents the secret key material used for encrypting Peer Storage.
 */
public class PeerStorageKey : CommonBase {
	internal PeerStorageKey(object _dummy, long ptr) : base(ptr) { }
	~PeerStorageKey() {
		if (ptr != 0) { bindings.PeerStorageKey_free(ptr); }
	}

	/**
	 * Represents the key used to encrypt and decrypt Peer Storage.
	 */
	public byte[] get_inner() {
		long ret = bindings.PeerStorageKey_get_inner(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Represents the key used to encrypt and decrypt Peer Storage.
	 */
	public void set_inner(byte[] val) {
		bindings.PeerStorageKey_set_inner(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new PeerStorageKey given each field
	 */
	public static org.ldk.structs.PeerStorageKey of(byte[] inner_arg) {
		long ret = bindings.PeerStorageKey_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(inner_arg, 32)));
		GC.KeepAlive(inner_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.PeerStorageKey_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeerStorageKey
	 */
	public org.ldk.structs.PeerStorageKey clone() {
		long ret = bindings.PeerStorageKey_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PeerStorageKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.PeerStorageKey b) {
		bool ret = bindings.PeerStorageKey_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PeerStorageKey)) return false;
		return this.eq((PeerStorageKey)o);
	}
}
} } }
