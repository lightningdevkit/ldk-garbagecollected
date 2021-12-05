package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Represents the compressed public key of a node
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
		NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeId(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a new NodeId from a public key
	 */
	public static NodeId from_pubkey(byte[] pubkey) {
		long ret = bindings.NodeId_from_pubkey(InternalUtils.check_arr_len(pubkey, 33));
		Reference.reachabilityFence(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeId(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
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
	 * Checks if two NodeIds contain equal inner contents.
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

}
