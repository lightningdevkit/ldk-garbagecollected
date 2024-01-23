package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A derived key built from a [`DelayedPaymentBasepoint`] and `per_commitment_point`.
 * 
 * The delayed payment key is used to pay the commitment state broadcaster their
 * non-HTLC-encumbered funds after a delay. This delay gives their counterparty a chance to
 * punish and claim all the channel funds if the state broadcasted was previously revoked.
 * 
 * [See the BOLT specs]
 * (https://github.com/lightning/bolts/blob/master/03-transactions.md#localpubkey-local_htlcpubkey-remote_htlcpubkey-local_delayedpubkey-and-remote_delayedpubkey-derivation)
 * for more information on key derivation details.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DelayedPaymentKey extends CommonBase {
	DelayedPaymentKey(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DelayedPaymentKey_free(ptr); }
	}

	public byte[] get_a() {
		byte[] ret = bindings.DelayedPaymentKey_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.DelayedPaymentKey_set_a(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new DelayedPaymentKey given each field
	 */
	public static DelayedPaymentKey of(byte[] a_arg) {
		long ret = bindings.DelayedPaymentKey_new(InternalUtils.check_arr_len(a_arg, 33));
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two DelayedPaymentKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.DelayedPaymentKey b) {
		boolean ret = bindings.DelayedPaymentKey_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof DelayedPaymentKey)) return false;
		return this.eq((DelayedPaymentKey)o);
	}
	long clone_ptr() {
		long ret = bindings.DelayedPaymentKey_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the DelayedPaymentKey
	 */
	public DelayedPaymentKey clone() {
		long ret = bindings.DelayedPaymentKey_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Derive a public delayedpubkey using one node\'s `per_commitment_point` and its countersignatory\'s `basepoint`
	 */
	public static DelayedPaymentKey from_basepoint(org.ldk.structs.DelayedPaymentBasepoint countersignatory_basepoint, byte[] per_commitment_point) {
		long ret = bindings.DelayedPaymentKey_from_basepoint(countersignatory_basepoint == null ? 0 : countersignatory_basepoint.ptr, InternalUtils.check_arr_len(per_commitment_point, 33));
		Reference.reachabilityFence(countersignatory_basepoint);
		Reference.reachabilityFence(per_commitment_point);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(countersignatory_basepoint); };
		return ret_hu_conv;
	}

	/**
	 * Build a delayedpubkey directly from an already-derived private key
	 */
	public static DelayedPaymentKey from_secret_key(byte[] sk) {
		long ret = bindings.DelayedPaymentKey_from_secret_key(InternalUtils.check_arr_len(sk, 32));
		Reference.reachabilityFence(sk);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Get inner Public Key
	 */
	public byte[] to_public_key() {
		byte[] ret = bindings.DelayedPaymentKey_to_public_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the DelayedPaymentKey object into a byte array which can be read by DelayedPaymentKey_read
	 */
	public byte[] write() {
		byte[] ret = bindings.DelayedPaymentKey_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a DelayedPaymentKey from a byte array, created by DelayedPaymentKey_write
	 */
	public static Result_DelayedPaymentKeyDecodeErrorZ read(byte[] ser) {
		long ret = bindings.DelayedPaymentKey_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DelayedPaymentKeyDecodeErrorZ ret_hu_conv = Result_DelayedPaymentKeyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
