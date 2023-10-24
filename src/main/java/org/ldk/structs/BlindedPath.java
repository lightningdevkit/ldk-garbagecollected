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

	/**
	 * To send to a blinded path, the sender first finds a route to the unblinded
	 * `introduction_node_id`, which can unblind its [`encrypted_payload`] to find out the onion
	 * message or payment's next hop and forward it along.
	 * 
	 * [`encrypted_payload`]: BlindedHop::encrypted_payload
	 */
	public byte[] get_introduction_node_id() {
		byte[] ret = bindings.BlindedPath_get_introduction_node_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * To send to a blinded path, the sender first finds a route to the unblinded
	 * `introduction_node_id`, which can unblind its [`encrypted_payload`] to find out the onion
	 * message or payment's next hop and forward it along.
	 * 
	 * [`encrypted_payload`]: BlindedHop::encrypted_payload
	 */
	public void set_introduction_node_id(byte[] val) {
		bindings.BlindedPath_set_introduction_node_id(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used by the introduction node to decrypt its [`encrypted_payload`] to forward the onion
	 * message or payment.
	 * 
	 * [`encrypted_payload`]: BlindedHop::encrypted_payload
	 */
	public byte[] get_blinding_point() {
		byte[] ret = bindings.BlindedPath_get_blinding_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used by the introduction node to decrypt its [`encrypted_payload`] to forward the onion
	 * message or payment.
	 * 
	 * [`encrypted_payload`]: BlindedHop::encrypted_payload
	 */
	public void set_blinding_point(byte[] val) {
		bindings.BlindedPath_set_blinding_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The hops composing the blinded path.
	 */
	public BlindedHop[] get_blinded_hops() {
		long[] ret = bindings.BlindedPath_get_blinded_hops(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_12_len = ret.length;
		BlindedHop[] ret_conv_12_arr = new BlindedHop[ret_conv_12_len];
		for (int m = 0; m < ret_conv_12_len; m++) {
			long ret_conv_12 = ret[m];
			org.ldk.structs.BlindedHop ret_conv_12_hu_conv = null; if (ret_conv_12 < 0 || ret_conv_12 > 4096) { ret_conv_12_hu_conv = new org.ldk.structs.BlindedHop(null, ret_conv_12); }
			if (ret_conv_12_hu_conv != null) { ret_conv_12_hu_conv.ptrs_to.add(this); };
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		return ret_conv_12_arr;
	}

	/**
	 * The hops composing the blinded path.
	 */
	public void set_blinded_hops(BlindedHop[] val) {
		bindings.BlindedPath_set_blinded_hops(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_12 -> val_conv_12 == null ? 0 : val_conv_12.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		for (BlindedHop val_conv_12: val) { if (this != null) { this.ptrs_to.add(val_conv_12); }; };
	}

	/**
	 * Constructs a new BlindedPath given each field
	 */
	public static BlindedPath of(byte[] introduction_node_id_arg, byte[] blinding_point_arg, BlindedHop[] blinded_hops_arg) {
		long ret = bindings.BlindedPath_new(InternalUtils.check_arr_len(introduction_node_id_arg, 33), InternalUtils.check_arr_len(blinding_point_arg, 33), blinded_hops_arg != null ? Arrays.stream(blinded_hops_arg).mapToLong(blinded_hops_arg_conv_12 -> blinded_hops_arg_conv_12 == null ? 0 : blinded_hops_arg_conv_12.ptr).toArray() : null);
		Reference.reachabilityFence(introduction_node_id_arg);
		Reference.reachabilityFence(blinding_point_arg);
		Reference.reachabilityFence(blinded_hops_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (BlindedHop blinded_hops_arg_conv_12: blinded_hops_arg) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(blinded_hops_arg_conv_12); }; };
		return ret_hu_conv;
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
	 * Create a one-hop blinded path for a message.
	 */
	public static Result_BlindedPathNoneZ one_hop_for_message(byte[] recipient_node_id, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.BlindedPath_one_hop_for_message(InternalUtils.check_arr_len(recipient_node_id, 33), entropy_source.ptr);
		Reference.reachabilityFence(recipient_node_id);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Create a blinded path for an onion message, to be forwarded along `node_pks`. The last node
	 * pubkey in `node_pks` will be the destination node.
	 * 
	 * Errors if no hops are provided or if `node_pk`(s) are invalid.
	 */
	public static Result_BlindedPathNoneZ new_for_message(byte[][] node_pks, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.BlindedPath_new_for_message(node_pks != null ? Arrays.stream(node_pks).map(node_pks_conv_8 -> InternalUtils.check_arr_len(node_pks_conv_8, 33)).toArray(byte[][]::new) : null, entropy_source.ptr);
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
