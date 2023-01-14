using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Onion messages can be sent and received to blinded paths, which serve to hide the identity of
 * the recipient.
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
	 * Create a blinded path to be forwarded along `node_pks`. The last node pubkey in `node_pks`
	 * will be the destination node.
	 * 
	 * Errors if less than two hops are provided or if `node_pk`(s) are invalid.
	 */
	public static Result_BlindedPathNoneZ of(byte[][] node_pks, org.ldk.structs.KeysInterface keys_manager) {
		long ret = bindings.BlindedPath_new(node_pks != null ? InternalUtils.mapArray(node_pks, node_pks_conv_8 => InternalUtils.check_arr_len(node_pks_conv_8, 33)) : null, keys_manager == null ? 0 : keys_manager.ptr);
		GC.KeepAlive(node_pks);
		GC.KeepAlive(keys_manager);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(keys_manager); };
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
