package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Information used to forward or fail this HTLC that is being forwarded within a blinded path.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BlindedForward extends CommonBase {
	BlindedForward(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BlindedForward_free(ptr); }
	}

	/**
	 * The `blinding_point` that was set in the inbound [`msgs::UpdateAddHTLC`], or in the inbound
	 * onion payload if we're the introduction node. Useful for calculating the next hop's
	 * [`msgs::UpdateAddHTLC::blinding_point`].
	 */
	public byte[] get_inbound_blinding_point() {
		byte[] ret = bindings.BlindedForward_get_inbound_blinding_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The `blinding_point` that was set in the inbound [`msgs::UpdateAddHTLC`], or in the inbound
	 * onion payload if we're the introduction node. Useful for calculating the next hop's
	 * [`msgs::UpdateAddHTLC::blinding_point`].
	 */
	public void set_inbound_blinding_point(byte[] val) {
		bindings.BlindedForward_set_inbound_blinding_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * If needed, this determines how this HTLC should be failed backwards, based on whether we are
	 * the introduction node.
	 */
	public BlindedFailure get_failure() {
		BlindedFailure ret = bindings.BlindedForward_get_failure(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * If needed, this determines how this HTLC should be failed backwards, based on whether we are
	 * the introduction node.
	 */
	public void set_failure(org.ldk.enums.BlindedFailure val) {
		bindings.BlindedForward_set_failure(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new BlindedForward given each field
	 */
	public static BlindedForward of(byte[] inbound_blinding_point_arg, org.ldk.enums.BlindedFailure failure_arg) {
		long ret = bindings.BlindedForward_new(InternalUtils.check_arr_len(inbound_blinding_point_arg, 33), failure_arg);
		Reference.reachabilityFence(inbound_blinding_point_arg);
		Reference.reachabilityFence(failure_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedForward ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedForward(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.BlindedForward_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedForward
	 */
	public BlindedForward clone() {
		long ret = bindings.BlindedForward_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedForward ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedForward(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedForward.
	 */
	public long hash() {
		long ret = bindings.BlindedForward_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BlindedForwards contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.BlindedForward b) {
		boolean ret = bindings.BlindedForward_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof BlindedForward)) return false;
		return this.eq((BlindedForward)o);
	}
	/**
	 * Serialize the BlindedForward object into a byte array which can be read by BlindedForward_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedForward_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a BlindedForward from a byte array, created by BlindedForward_write
	 */
	public static Result_BlindedForwardDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedForward_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedForwardDecodeErrorZ ret_hu_conv = Result_BlindedForwardDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
