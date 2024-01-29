package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Master key used in conjunction with per_commitment_point to generate [htlcpubkey](https://github.com/lightning/bolts/blob/master/03-transactions.md#key-derivation) for the latest state of a channel.
 * A watcher can be given a [RevocationBasepoint] to generate per commitment [RevocationKey] to create justice transactions.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RevocationBasepoint extends CommonBase {
	RevocationBasepoint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RevocationBasepoint_free(ptr); }
	}

	public byte[] get_a() {
		byte[] ret = bindings.RevocationBasepoint_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.RevocationBasepoint_set_a(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new RevocationBasepoint given each field
	 */
	public static RevocationBasepoint of(byte[] a_arg) {
		long ret = bindings.RevocationBasepoint_new(InternalUtils.check_arr_len(a_arg, 33));
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationBasepoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationBasepoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RevocationBasepoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.RevocationBasepoint b) {
		boolean ret = bindings.RevocationBasepoint_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof RevocationBasepoint)) return false;
		return this.eq((RevocationBasepoint)o);
	}
	long clone_ptr() {
		long ret = bindings.RevocationBasepoint_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RevocationBasepoint
	 */
	public RevocationBasepoint clone() {
		long ret = bindings.RevocationBasepoint_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationBasepoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationBasepoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RevocationBasepoint.
	 */
	public long hash() {
		long ret = bindings.RevocationBasepoint_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Get inner Public Key
	 */
	public byte[] to_public_key() {
		byte[] ret = bindings.RevocationBasepoint_to_public_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the RevocationBasepoint object into a byte array which can be read by RevocationBasepoint_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RevocationBasepoint_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a RevocationBasepoint from a byte array, created by RevocationBasepoint_write
	 */
	public static Result_RevocationBasepointDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RevocationBasepoint_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RevocationBasepointDecodeErrorZ ret_hu_conv = Result_RevocationBasepointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
