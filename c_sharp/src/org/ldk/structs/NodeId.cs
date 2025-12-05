using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A compressed pubkey which a node uses to sign announcements and decode HTLCs routed through it.
 * 
 * This type stores a simple byte array which is not checked for validity (i.e. that it describes
 * a point which lies on the secp256k1 curve), unlike [`PublicKey`], as validity checking would
 * otherwise represent a large portion of [`NetworkGraph`] deserialization time (and RGS
 * application).
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
	public org.ldk.structs.NodeId clone() {
		long ret = bindings.NodeId_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two NodeIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.NodeId b) {
		bool ret = bindings.NodeId_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is NodeId)) return false;
		return this.eq((NodeId)o);
	}
	/**
	 * Create a new NodeId from a public key
	 */
	public static org.ldk.structs.NodeId from_pubkey(byte[] pubkey) {
		long ret = bindings.NodeId_from_pubkey(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(pubkey, 33)));
		GC.KeepAlive(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Create a new NodeId from a slice of bytes
	 */
	public static org.ldk.structs.Result_NodeIdDecodeErrorZ from_slice(byte[] bytes) {
		long ret = bindings.NodeId_from_slice(InternalUtils.encodeUint8Array(bytes));
		GC.KeepAlive(bytes);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the public key slice from this NodeId
	 */
	public byte[] as_slice() {
		long ret = bindings.NodeId_as_slice(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Get the public key as an array from this NodeId
	 */
	public byte[] as_array() {
		long ret = bindings.NodeId_as_array(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Get the public key from this NodeId
	 */
	public org.ldk.structs.Result_PublicKeySecp256k1ErrorZ as_pubkey() {
		long ret = bindings.NodeId_as_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeySecp256k1ErrorZ ret_hu_conv = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a NodeId object
	 */
	public string to_str() {
		long ret = bindings.NodeId_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
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
		long ret = bindings.NodeId_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NodeId from a byte array, created by NodeId_write
	 */
	public static org.ldk.structs.Result_NodeIdDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NodeId_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Build a NodeId from a PublicKey
	 */
	public static org.ldk.structs.NodeId from_PublicKey(byte[] f) {
		long ret = bindings.NodeId_from_PublicKey(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(f, 33)));
		GC.KeepAlive(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
