package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Information about an HTLC as it appears in a commitment transaction
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HTLCOutputInCommitment extends CommonBase {
	HTLCOutputInCommitment(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HTLCOutputInCommitment_free(ptr); }
	}

	/**
	 * Whether the HTLC was \"offered\" (ie outbound in relation to this commitment transaction).
	 * Note that this is not the same as whether it is ountbound *from us*. To determine that you
	 * need to compare this value to whether the commitment transaction in question is that of
	 * the counterparty or our own.
	 */
	public boolean get_offered() {
		boolean ret = bindings.HTLCOutputInCommitment_get_offered(this.ptr);
		return ret;
	}

	/**
	 * Whether the HTLC was \"offered\" (ie outbound in relation to this commitment transaction).
	 * Note that this is not the same as whether it is ountbound *from us*. To determine that you
	 * need to compare this value to whether the commitment transaction in question is that of
	 * the counterparty or our own.
	 */
	public void set_offered(boolean val) {
		bindings.HTLCOutputInCommitment_set_offered(this.ptr, val);
	}

	/**
	 * The value, in msat, of the HTLC. The value as it appears in the commitment transaction is
	 * this divided by 1000.
	 */
	public long get_amount_msat() {
		long ret = bindings.HTLCOutputInCommitment_get_amount_msat(this.ptr);
		return ret;
	}

	/**
	 * The value, in msat, of the HTLC. The value as it appears in the commitment transaction is
	 * this divided by 1000.
	 */
	public void set_amount_msat(long val) {
		bindings.HTLCOutputInCommitment_set_amount_msat(this.ptr, val);
	}

	/**
	 * The CLTV lock-time at which this HTLC expires.
	 */
	public int get_cltv_expiry() {
		int ret = bindings.HTLCOutputInCommitment_get_cltv_expiry(this.ptr);
		return ret;
	}

	/**
	 * The CLTV lock-time at which this HTLC expires.
	 */
	public void set_cltv_expiry(int val) {
		bindings.HTLCOutputInCommitment_set_cltv_expiry(this.ptr, val);
	}

	/**
	 * The hash of the preimage which unlocks this HTLC.
	 */
	public byte[] get_payment_hash() {
		byte[] ret = bindings.HTLCOutputInCommitment_get_payment_hash(this.ptr);
		return ret;
	}

	/**
	 * The hash of the preimage which unlocks this HTLC.
	 */
	public void set_payment_hash(byte[] val) {
		bindings.HTLCOutputInCommitment_set_payment_hash(this.ptr, val);
	}

	/**
	 * Creates a copy of the HTLCOutputInCommitment
	 */
	public HTLCOutputInCommitment clone() {
		long ret = bindings.HTLCOutputInCommitment_clone(this.ptr);
		HTLCOutputInCommitment ret_hu_conv = new HTLCOutputInCommitment(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the HTLCOutputInCommitment object into a byte array which can be read by HTLCOutputInCommitment_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HTLCOutputInCommitment_write(this.ptr);
		return ret;
	}

	/**
	 * Read a HTLCOutputInCommitment from a byte array, created by HTLCOutputInCommitment_write
	 */
	public static Result_HTLCOutputInCommitmentDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.HTLCOutputInCommitment_read(ser);
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
