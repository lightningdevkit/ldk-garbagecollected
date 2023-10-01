package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An encrypted payload and node id corresponding to a hop in a payment or onion message path, to
 * be encoded in the sender's onion packet. These hops cannot be identified by outside observers
 * and thus can be used to hide the identity of the recipient.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BlindedHop extends CommonBase {
	BlindedHop(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BlindedHop_free(ptr); }
	}

	/**
	 * The blinded node id of this hop in a [`BlindedPath`].
	 */
	public byte[] get_blinded_node_id() {
		byte[] ret = bindings.BlindedHop_get_blinded_node_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The blinded node id of this hop in a [`BlindedPath`].
	 */
	public void set_blinded_node_id(byte[] val) {
		bindings.BlindedHop_set_blinded_node_id(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The encrypted payload intended for this hop in a [`BlindedPath`].
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_encrypted_payload() {
		byte[] ret = bindings.BlindedHop_get_encrypted_payload(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The encrypted payload intended for this hop in a [`BlindedPath`].
	 */
	public void set_encrypted_payload(byte[] val) {
		bindings.BlindedHop_set_encrypted_payload(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new BlindedHop given each field
	 */
	public static BlindedHop of(byte[] blinded_node_id_arg, byte[] encrypted_payload_arg) {
		long ret = bindings.BlindedHop_new(InternalUtils.check_arr_len(blinded_node_id_arg, 33), encrypted_payload_arg);
		Reference.reachabilityFence(blinded_node_id_arg);
		Reference.reachabilityFence(encrypted_payload_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedHop(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.BlindedHop_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedHop
	 */
	public BlindedHop clone() {
		long ret = bindings.BlindedHop_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedHop(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedHop.
	 */
	public long hash() {
		long ret = bindings.BlindedHop_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BlindedHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.BlindedHop b) {
		boolean ret = bindings.BlindedHop_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof BlindedHop)) return false;
		return this.eq((BlindedHop)o);
	}
	/**
	 * Serialize the BlindedHop object into a byte array which can be read by BlindedHop_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedHop_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a BlindedHop from a byte array, created by BlindedHop_write
	 */
	public static Result_BlindedHopDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedHop_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedHopDecodeErrorZ ret_hu_conv = Result_BlindedHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
