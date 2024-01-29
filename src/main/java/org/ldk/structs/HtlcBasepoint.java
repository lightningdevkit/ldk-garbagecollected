package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Base key used in conjunction with a `per_commitment_point` to generate an [`HtlcKey`].
 * 
 * HTLC keys are used to ensure only the recipient of an HTLC can claim it on-chain with the HTLC
 * preimage and that only the sender of an HTLC can claim it on-chain after it has timed out.
 * Thus, both channel counterparties' HTLC keys will appears in each HTLC output's script.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HtlcBasepoint extends CommonBase {
	HtlcBasepoint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HtlcBasepoint_free(ptr); }
	}

	public byte[] get_a() {
		byte[] ret = bindings.HtlcBasepoint_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.HtlcBasepoint_set_a(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new HtlcBasepoint given each field
	 */
	public static HtlcBasepoint of(byte[] a_arg) {
		long ret = bindings.HtlcBasepoint_new(InternalUtils.check_arr_len(a_arg, 33));
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HtlcBasepoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HtlcBasepoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HtlcBasepoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.HtlcBasepoint b) {
		boolean ret = bindings.HtlcBasepoint_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof HtlcBasepoint)) return false;
		return this.eq((HtlcBasepoint)o);
	}
	long clone_ptr() {
		long ret = bindings.HtlcBasepoint_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the HtlcBasepoint
	 */
	public HtlcBasepoint clone() {
		long ret = bindings.HtlcBasepoint_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HtlcBasepoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HtlcBasepoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the HtlcBasepoint.
	 */
	public long hash() {
		long ret = bindings.HtlcBasepoint_hash(this.ptr);
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
		byte[] ret = bindings.HtlcBasepoint_to_public_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the HtlcBasepoint object into a byte array which can be read by HtlcBasepoint_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HtlcBasepoint_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a HtlcBasepoint from a byte array, created by HtlcBasepoint_write
	 */
	public static Result_HtlcBasepointDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HtlcBasepoint_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HtlcBasepointDecodeErrorZ ret_hu_conv = Result_HtlcBasepointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
