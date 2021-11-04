package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A wrapper on CommitmentTransaction indicating that the derived fields (the built bitcoin
 * transaction and the transaction creation keys) are trusted.
 * 
 * See trust() and verify() functions on CommitmentTransaction.
 * 
 * This structure implements Deref.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TrustedCommitmentTransaction extends CommonBase {
	TrustedCommitmentTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TrustedCommitmentTransaction_free(ptr); }
	}

	/**
	 * The transaction ID of the built Bitcoin transaction
	 */
	public byte[] txid() {
		byte[] ret = bindings.TrustedCommitmentTransaction_txid(this.ptr);
		return ret;
	}

	/**
	 * The pre-built Bitcoin commitment transaction
	 */
	public BuiltCommitmentTransaction built_transaction() {
		long ret = bindings.TrustedCommitmentTransaction_built_transaction(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		BuiltCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new BuiltCommitmentTransaction(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The pre-calculated transaction creation public keys.
	 */
	public TxCreationKeys keys() {
		long ret = bindings.TrustedCommitmentTransaction_keys(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxCreationKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new TxCreationKeys(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Get a signature for each HTLC which was included in the commitment transaction (ie for
	 * which HTLCOutputInCommitment::transaction_output_index.is_some()).
	 * 
	 * The returned Vec has one entry for each HTLC, and in the same order.
	 */
	public Result_CVec_SignatureZNoneZ get_htlc_sigs(byte[] htlc_base_key, DirectedChannelTransactionParameters channel_parameters) {
		long ret = bindings.TrustedCommitmentTransaction_get_htlc_sigs(this.ptr, htlc_base_key, channel_parameters == null ? 0 : channel_parameters.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(channel_parameters);
		return ret_hu_conv;
	}

}
