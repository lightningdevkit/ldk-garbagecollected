package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Represents the secret key material used for encrypting Peer Storage.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PeerStorageKey extends CommonBase {
	PeerStorageKey(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PeerStorageKey_free(ptr); }
	}

	/**
	 * Represents the key used to encrypt and decrypt Peer Storage.
	 */
	public byte[] get_inner() {
		byte[] ret = bindings.PeerStorageKey_get_inner(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Represents the key used to encrypt and decrypt Peer Storage.
	 */
	public void set_inner(byte[] val) {
		bindings.PeerStorageKey_set_inner(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new PeerStorageKey given each field
	 */
	public static PeerStorageKey of(byte[] inner_arg) {
		long ret = bindings.PeerStorageKey_new(InternalUtils.check_arr_len(inner_arg, 32));
		Reference.reachabilityFence(inner_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.PeerStorageKey_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeerStorageKey
	 */
	public PeerStorageKey clone() {
		long ret = bindings.PeerStorageKey_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PeerStorageKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.PeerStorageKey b) {
		boolean ret = bindings.PeerStorageKey_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PeerStorageKey)) return false;
		return this.eq((PeerStorageKey)o);
	}
}
