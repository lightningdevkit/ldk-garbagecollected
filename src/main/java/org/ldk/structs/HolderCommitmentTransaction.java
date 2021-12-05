package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Information needed to build and sign a holder's commitment transaction.
 * 
 * The transaction is only signed once we are ready to broadcast.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HolderCommitmentTransaction extends CommonBase {
	HolderCommitmentTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HolderCommitmentTransaction_free(ptr); }
	}

	/**
	 * Our counterparty's signature for the transaction
	 */
	public byte[] get_counterparty_sig() {
		byte[] ret = bindings.HolderCommitmentTransaction_get_counterparty_sig(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Our counterparty's signature for the transaction
	 */
	public void set_counterparty_sig(byte[] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this.ptr, InternalUtils.check_arr_len(val, 64));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * All non-dust counterparty HTLC signatures, in the order they appear in the transaction
	 */
	public void set_counterparty_htlc_sigs(byte[][] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_htlc_sigs(this.ptr, val != null ? Arrays.stream(val).map(val_conv_8 -> InternalUtils.check_arr_len(val_conv_8, 64)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.HolderCommitmentTransaction_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the HolderCommitmentTransaction
	 */
	public HolderCommitmentTransaction clone() {
		long ret = bindings.HolderCommitmentTransaction_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		HolderCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new HolderCommitmentTransaction(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the HolderCommitmentTransaction object into a byte array which can be read by HolderCommitmentTransaction_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HolderCommitmentTransaction_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a HolderCommitmentTransaction from a byte array, created by HolderCommitmentTransaction_write
	 */
	public static Result_HolderCommitmentTransactionDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HolderCommitmentTransaction_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HolderCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_HolderCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a new holder transaction with the given counterparty signatures.
	 * The funding keys are used to figure out which signature should go first when building the transaction for broadcast.
	 */
	public static HolderCommitmentTransaction of(CommitmentTransaction commitment_tx, byte[] counterparty_sig, byte[][] counterparty_htlc_sigs, byte[] holder_funding_key, byte[] counterparty_funding_key) {
		long ret = bindings.HolderCommitmentTransaction_new(commitment_tx == null ? 0 : commitment_tx.ptr & ~1, InternalUtils.check_arr_len(counterparty_sig, 64), counterparty_htlc_sigs != null ? Arrays.stream(counterparty_htlc_sigs).map(counterparty_htlc_sigs_conv_8 -> InternalUtils.check_arr_len(counterparty_htlc_sigs_conv_8, 64)).toArray(byte[][]::new) : null, InternalUtils.check_arr_len(holder_funding_key, 33), InternalUtils.check_arr_len(counterparty_funding_key, 33));
		Reference.reachabilityFence(commitment_tx);
		Reference.reachabilityFence(counterparty_sig);
		Reference.reachabilityFence(counterparty_htlc_sigs);
		Reference.reachabilityFence(holder_funding_key);
		Reference.reachabilityFence(counterparty_funding_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		HolderCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new HolderCommitmentTransaction(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
