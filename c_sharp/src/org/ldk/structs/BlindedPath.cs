using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Onion messages and payments can be sent and received to blinded paths, which serve to hide the
 * identity of the recipient.
 */
public class BlindedPath : CommonBase {
	internal BlindedPath(object _dummy, long ptr) : base(ptr) { }
	~BlindedPath() {
		if (ptr != 0) { bindings.BlindedPath_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.BlindedPath_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedPath
	 */
	public BlindedPath clone() {
		long ret = bindings.BlindedPath_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedPath.
	 */
	public long hash() {
		long ret = bindings.BlindedPath_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BlindedPaths contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.BlindedPath b) {
		bool ret = bindings.BlindedPath_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is BlindedPath)) return false;
		return this.eq((BlindedPath)o);
	}
	/**
	 * Create a blinded path for an onion message, to be forwarded along `node_pks`. The last node
	 * pubkey in `node_pks` will be the destination node.
	 * 
	 * Errors if less than two hops are provided or if `node_pk`(s) are invalid.
	 */
	public static Result_BlindedPathNoneZ new_for_message(byte[][] node_pks, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.BlindedPath_new_for_message(node_pks != null ? InternalUtils.mapArray(node_pks, node_pks_conv_8 => InternalUtils.check_arr_len(node_pks_conv_8, 33)) : null, entropy_source.ptr);
		GC.KeepAlive(node_pks);
		GC.KeepAlive(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the BlindedPath object into a byte array which can be read by BlindedPath_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedPath_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a BlindedPath from a byte array, created by BlindedPath_write
	 */
	public static Result_BlindedPathDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedPath_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathDecodeErrorZ ret_hu_conv = Result_BlindedPathDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
