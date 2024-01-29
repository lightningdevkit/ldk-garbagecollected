package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Base key used in conjunction with a `per_commitment_point` to generate a [`DelayedPaymentKey`].
 * 
 * The delayed payment key is used to pay the commitment state broadcaster their
 * non-HTLC-encumbered funds after a delay to give their counterparty a chance to punish if the
 * state broadcasted was previously revoked.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DelayedPaymentBasepoint extends CommonBase {
	DelayedPaymentBasepoint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DelayedPaymentBasepoint_free(ptr); }
	}

	public byte[] get_a() {
		byte[] ret = bindings.DelayedPaymentBasepoint_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.DelayedPaymentBasepoint_set_a(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new DelayedPaymentBasepoint given each field
	 */
	public static DelayedPaymentBasepoint of(byte[] a_arg) {
		long ret = bindings.DelayedPaymentBasepoint_new(InternalUtils.check_arr_len(a_arg, 33));
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentBasepoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentBasepoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two DelayedPaymentBasepoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.DelayedPaymentBasepoint b) {
		boolean ret = bindings.DelayedPaymentBasepoint_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof DelayedPaymentBasepoint)) return false;
		return this.eq((DelayedPaymentBasepoint)o);
	}
	long clone_ptr() {
		long ret = bindings.DelayedPaymentBasepoint_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the DelayedPaymentBasepoint
	 */
	public DelayedPaymentBasepoint clone() {
		long ret = bindings.DelayedPaymentBasepoint_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentBasepoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentBasepoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DelayedPaymentBasepoint.
	 */
	public long hash() {
		long ret = bindings.DelayedPaymentBasepoint_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Get inner Public Key
	 */
	public byte[] to_public_key() {
		byte[] ret = bindings.DelayedPaymentBasepoint_to_public_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the DelayedPaymentBasepoint object into a byte array which can be read by DelayedPaymentBasepoint_read
	 */
	public byte[] write() {
		byte[] ret = bindings.DelayedPaymentBasepoint_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a DelayedPaymentBasepoint from a byte array, created by DelayedPaymentBasepoint_write
	 */
	public static Result_DelayedPaymentBasepointDecodeErrorZ read(byte[] ser) {
		long ret = bindings.DelayedPaymentBasepoint_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DelayedPaymentBasepointDecodeErrorZ ret_hu_conv = Result_DelayedPaymentBasepointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
