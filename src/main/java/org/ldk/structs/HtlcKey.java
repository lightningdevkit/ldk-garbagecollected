package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A derived key built from a [`HtlcBasepoint`] and `per_commitment_point`.
 * 
 * HTLC keys are used to ensure only the recipient of an HTLC can claim it on-chain with the HTLC
 * preimage and that only the sender of an HTLC can claim it on-chain after it has timed out.
 * Thus, both channel counterparties' HTLC keys will appears in each HTLC output's script.
 * 
 * [See the BOLT specs]
 * (https://github.com/lightning/bolts/blob/master/03-transactions.md#localpubkey-local_htlcpubkey-remote_htlcpubkey-local_delayedpubkey-and-remote_delayedpubkey-derivation)
 * for more information on key derivation details.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HtlcKey extends CommonBase {
	HtlcKey(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HtlcKey_free(ptr); }
	}

	public byte[] get_a() {
		byte[] ret = bindings.HtlcKey_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.HtlcKey_set_a(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new HtlcKey given each field
	 */
	public static HtlcKey of(byte[] a_arg) {
		long ret = bindings.HtlcKey_new(InternalUtils.check_arr_len(a_arg, 33));
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HtlcKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HtlcKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HtlcKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.HtlcKey b) {
		boolean ret = bindings.HtlcKey_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof HtlcKey)) return false;
		return this.eq((HtlcKey)o);
	}
	long clone_ptr() {
		long ret = bindings.HtlcKey_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the HtlcKey
	 */
	public HtlcKey clone() {
		long ret = bindings.HtlcKey_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HtlcKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HtlcKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Derive a public htlcpubkey using one node\'s `per_commitment_point` and its countersignatory\'s `basepoint`
	 */
	public static HtlcKey from_basepoint(org.ldk.structs.HtlcBasepoint countersignatory_basepoint, byte[] per_commitment_point) {
		long ret = bindings.HtlcKey_from_basepoint(countersignatory_basepoint == null ? 0 : countersignatory_basepoint.ptr, InternalUtils.check_arr_len(per_commitment_point, 33));
		Reference.reachabilityFence(countersignatory_basepoint);
		Reference.reachabilityFence(per_commitment_point);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HtlcKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HtlcKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(countersignatory_basepoint); };
		return ret_hu_conv;
	}

	/**
	 * Build a htlcpubkey directly from an already-derived private key
	 */
	public static HtlcKey from_secret_key(byte[] sk) {
		long ret = bindings.HtlcKey_from_secret_key(InternalUtils.check_arr_len(sk, 32));
		Reference.reachabilityFence(sk);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HtlcKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HtlcKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Get inner Public Key
	 */
	public byte[] to_public_key() {
		byte[] ret = bindings.HtlcKey_to_public_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the HtlcKey object into a byte array which can be read by HtlcKey_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HtlcKey_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a HtlcKey from a byte array, created by HtlcKey_write
	 */
	public static Result_HtlcKeyDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HtlcKey_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HtlcKeyDecodeErrorZ ret_hu_conv = Result_HtlcKeyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
