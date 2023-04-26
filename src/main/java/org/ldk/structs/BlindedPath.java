package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Onion messages and payments can be sent and received to blinded paths, which serve to hide the
 * identity of the recipient.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BlindedPath extends CommonBase {
	BlindedPath(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BlindedPath_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.BlindedPath_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedPath
	 */
	public BlindedPath clone() {
		long ret = bindings.BlindedPath_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedPath.
	 */
	public long hash() {
		long ret = bindings.BlindedPath_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BlindedPaths contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.BlindedPath b) {
		boolean ret = bindings.BlindedPath_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof BlindedPath)) return false;
		return this.eq((BlindedPath)o);
	}
	/**
	 * Create a blinded path for an onion message, to be forwarded along `node_pks`. The last node
	 * pubkey in `node_pks` will be the destination node.
	 * 
	 * Errors if less than two hops are provided or if `node_pk`(s) are invalid.
	 */
	public static Result_BlindedPathNoneZ new_for_message(byte[][] node_pks, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.BlindedPath_new_for_message(node_pks != null ? Arrays.stream(node_pks).map(node_pks_conv_8 -> InternalUtils.check_arr_len(node_pks_conv_8, 33)).toArray(byte[][]::new) : null, entropy_source == null ? 0 : entropy_source.ptr);
		Reference.reachabilityFence(node_pks);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the BlindedPath object into a byte array which can be read by BlindedPath_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedPath_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a BlindedPath from a byte array, created by BlindedPath_write
	 */
	public static Result_BlindedPathDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedPath_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathDecodeErrorZ ret_hu_conv = Result_BlindedPathDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
