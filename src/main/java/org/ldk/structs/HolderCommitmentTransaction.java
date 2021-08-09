package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
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
		return ret;
	}

	/**
	 * Our counterparty's signature for the transaction
	 */
	public void set_counterparty_sig(byte[] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this.ptr, val);
	}

	/**
	 * All non-dust counterparty HTLC signatures, in the order they appear in the transaction
	 */
	public void set_counterparty_htlc_sigs(byte[][] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_htlc_sigs(this.ptr, val);
	}

	/**
	 * Creates a copy of the HolderCommitmentTransaction
	 */
	public HolderCommitmentTransaction clone() {
		long ret = bindings.HolderCommitmentTransaction_clone(this.ptr);
		if (ret < 1024) { return null; }
		HolderCommitmentTransaction ret_hu_conv = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the HolderCommitmentTransaction object into a byte array which can be read by HolderCommitmentTransaction_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HolderCommitmentTransaction_write(this.ptr);
		return ret;
	}

	/**
	 * Read a HolderCommitmentTransaction from a byte array, created by HolderCommitmentTransaction_write
	 */
	public static Result_HolderCommitmentTransactionDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HolderCommitmentTransaction_read(ser);
		if (ret < 1024) { return null; }
		Result_HolderCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_HolderCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a new holder transaction with the given counterparty signatures.
	 * The funding keys are used to figure out which signature should go first when building the transaction for broadcast.
	 */
	public static HolderCommitmentTransaction of(CommitmentTransaction commitment_tx, byte[] counterparty_sig, byte[][] counterparty_htlc_sigs, byte[] holder_funding_key, byte[] counterparty_funding_key) {
		long ret = bindings.HolderCommitmentTransaction_new(commitment_tx == null ? 0 : commitment_tx.ptr & ~1, counterparty_sig, counterparty_htlc_sigs, holder_funding_key, counterparty_funding_key);
		if (ret < 1024) { return null; }
		HolderCommitmentTransaction ret_hu_conv = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

}
