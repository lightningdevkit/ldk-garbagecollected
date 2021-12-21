package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The value, in msat, of the HTLC. The value as it appears in the commitment transaction is
	 * this divided by 1000.
	 */
	public long get_amount_msat() {
		long ret = bindings.HTLCOutputInCommitment_get_amount_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The value, in msat, of the HTLC. The value as it appears in the commitment transaction is
	 * this divided by 1000.
	 */
	public void set_amount_msat(long val) {
		bindings.HTLCOutputInCommitment_set_amount_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The CLTV lock-time at which this HTLC expires.
	 */
	public int get_cltv_expiry() {
		int ret = bindings.HTLCOutputInCommitment_get_cltv_expiry(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The CLTV lock-time at which this HTLC expires.
	 */
	public void set_cltv_expiry(int val) {
		bindings.HTLCOutputInCommitment_set_cltv_expiry(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The hash of the preimage which unlocks this HTLC.
	 */
	public byte[] get_payment_hash() {
		byte[] ret = bindings.HTLCOutputInCommitment_get_payment_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The hash of the preimage which unlocks this HTLC.
	 */
	public void set_payment_hash(byte[] val) {
		bindings.HTLCOutputInCommitment_set_payment_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The position within the commitment transactions' outputs. This may be None if the value is
	 * below the dust limit (in which case no output appears in the commitment transaction and the
	 * value is spent to additional transaction fees).
	 */
	public Option_u32Z get_transaction_output_index() {
		long ret = bindings.HTLCOutputInCommitment_get_transaction_output_index(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u32Z ret_hu_conv = Option_u32Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The position within the commitment transactions' outputs. This may be None if the value is
	 * below the dust limit (in which case no output appears in the commitment transaction and the
	 * value is spent to additional transaction fees).
	 */
	public void set_transaction_output_index(Option_u32Z val) {
		bindings.HTLCOutputInCommitment_set_transaction_output_index(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new HTLCOutputInCommitment given each field
	 */
	public static HTLCOutputInCommitment of(boolean offered_arg, long amount_msat_arg, int cltv_expiry_arg, byte[] payment_hash_arg, Option_u32Z transaction_output_index_arg) {
		long ret = bindings.HTLCOutputInCommitment_new(offered_arg, amount_msat_arg, cltv_expiry_arg, InternalUtils.check_arr_len(payment_hash_arg, 32), transaction_output_index_arg.ptr);
		Reference.reachabilityFence(offered_arg);
		Reference.reachabilityFence(amount_msat_arg);
		Reference.reachabilityFence(cltv_expiry_arg);
		Reference.reachabilityFence(payment_hash_arg);
		Reference.reachabilityFence(transaction_output_index_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		HTLCOutputInCommitment ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new HTLCOutputInCommitment(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.HTLCOutputInCommitment_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCOutputInCommitment
	 */
	public HTLCOutputInCommitment clone() {
		long ret = bindings.HTLCOutputInCommitment_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		HTLCOutputInCommitment ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new HTLCOutputInCommitment(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the HTLCOutputInCommitment object into a byte array which can be read by HTLCOutputInCommitment_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HTLCOutputInCommitment_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a HTLCOutputInCommitment from a byte array, created by HTLCOutputInCommitment_write
	 */
	public static Result_HTLCOutputInCommitmentDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HTLCOutputInCommitment_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
