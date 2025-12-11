package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A compressed pubkey which a node uses to sign announcements and decode HTLCs routed through it.
 * 
 * This type stores a simple byte array which is not checked for validity (i.e. that it describes
 * a point which lies on the secp256k1 curve), unlike [`PublicKey`], as validity checking would
 * otherwise represent a large portion of [`NetworkGraph`] deserialization time (and RGS
 * application).
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeId extends CommonBase {
	NodeId(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeId_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.NodeId_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the NodeId
	 */
	public NodeId clone() {
		long ret = bindings.NodeId_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two NodeIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.NodeId b) {
		boolean ret = bindings.NodeId_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof NodeId)) return false;
		return this.eq((NodeId)o);
	}
	/**
	 * Create a new NodeId from a public key
	 */
	public static NodeId from_pubkey(byte[] pubkey) {
		long ret = bindings.NodeId_from_pubkey(InternalUtils.check_arr_len(pubkey, 33));
		Reference.reachabilityFence(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Create a new NodeId from a slice of bytes
	 */
	public static Result_NodeIdDecodeErrorZ from_slice(byte[] bytes) {
		long ret = bindings.NodeId_from_slice(bytes);
		Reference.reachabilityFence(bytes);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the public key slice from this NodeId
	 */
	public byte[] as_slice() {
		byte[] ret = bindings.NodeId_as_slice(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Get the public key as an array from this NodeId
	 */
	public byte[] as_array() {
		byte[] ret = bindings.NodeId_as_array(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Get the public key from this NodeId
	 */
	public Result_PublicKeySecp256k1ErrorZ as_pubkey() {
		long ret = bindings.NodeId_as_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeySecp256k1ErrorZ ret_hu_conv = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a NodeId object
	 */
	public String to_str() {
		String ret = bindings.NodeId_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NodeId.
	 */
	public long hash() {
		long ret = bindings.NodeId_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Serialize the NodeId object into a byte array which can be read by NodeId_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NodeId_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a NodeId from a byte array, created by NodeId_write
	 */
	public static Result_NodeIdDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NodeId_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Build a NodeId from a PublicKey
	 */
	public static NodeId from_PublicKey(byte[] f) {
		long ret = bindings.NodeId_from_PublicKey(InternalUtils.check_arr_len(f, 33));
		Reference.reachabilityFence(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
