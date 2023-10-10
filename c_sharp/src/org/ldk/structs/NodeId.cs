using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Represents the compressed public key of a node
 */
public class NodeId : CommonBase {
	internal NodeId(object _dummy, long ptr) : base(ptr) { }
	~NodeId() {
		if (ptr != 0) { bindings.NodeId_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.NodeId_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the NodeId
	 */
	public NodeId clone() {
		long ret = bindings.NodeId_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Create a new NodeId from a public key
	 */
	public static NodeId from_pubkey(byte[] pubkey) {
		long ret = bindings.NodeId_from_pubkey(InternalUtils.check_arr_len(pubkey, 33));
		GC.KeepAlive(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Get the public key slice from this NodeId
	 */
	public byte[] as_slice() {
		byte[] ret = bindings.NodeId_as_slice(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Get the public key from this NodeId
	 */
	public Result_PublicKeyErrorZ as_pubkey() {
		long ret = bindings.NodeId_as_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NodeId.
	 */
	public long hash() {
		long ret = bindings.NodeId_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Serialize the NodeId object into a byte array which can be read by NodeId_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NodeId_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a NodeId from a byte array, created by NodeId_write
	 */
	public static Result_NodeIdDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NodeId_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
