package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
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
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The pre-built Bitcoin commitment transaction
	 */
	public BuiltCommitmentTransaction built_transaction() {
		long ret = bindings.TrustedCommitmentTransaction_built_transaction(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BuiltCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BuiltCommitmentTransaction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The pre-calculated transaction creation public keys.
	 */
	public TxCreationKeys keys() {
		long ret = bindings.TrustedCommitmentTransaction_keys(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxCreationKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxCreationKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Should anchors be used.
	 */
	public ChannelTypeFeatures channel_type_features() {
		long ret = bindings.TrustedCommitmentTransaction_channel_type_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Get a signature for each HTLC which was included in the commitment transaction (ie for
	 * which HTLCOutputInCommitment::transaction_output_index.is_some()).
	 * 
	 * The returned Vec has one entry for each HTLC, and in the same order.
	 * 
	 * This function is only valid in the holder commitment context, it always uses EcdsaSighashType::All.
	 */
	public Result_CVec_ECDSASignatureZNoneZ get_htlc_sigs(byte[] htlc_base_key, org.ldk.structs.DirectedChannelTransactionParameters channel_parameters, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.TrustedCommitmentTransaction_get_htlc_sigs(this.ptr, InternalUtils.check_arr_len(htlc_base_key, 32), channel_parameters == null ? 0 : channel_parameters.ptr, entropy_source.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(htlc_base_key);
		Reference.reachabilityFence(channel_parameters);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_ECDSASignatureZNoneZ ret_hu_conv = Result_CVec_ECDSASignatureZNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(channel_parameters); };
		if (this != null) { this.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Returns the index of the revokeable output, i.e. the `to_local` output sending funds to
	 * the broadcaster, in the built transaction, if any exists.
	 * 
	 * There are two cases where this may return `None`:
	 * - The balance of the revokeable output is below the dust limit (only found on commitments
	 * early in the channel's lifetime, i.e. before the channel reserve is met).
	 * - This commitment was created before LDK 0.0.117. In this case, the
	 * commitment transaction previously didn't contain enough information to locate the
	 * revokeable output.
	 */
	public Option_usizeZ revokeable_output_index() {
		long ret = bindings.TrustedCommitmentTransaction_revokeable_output_index(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_usizeZ ret_hu_conv = org.ldk.structs.Option_usizeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Helper method to build an unsigned justice transaction spending the revokeable
	 * `to_local` output to a destination script. Fee estimation accounts for the expected
	 * revocation witness data that will be added when signed.
	 * 
	 * This method will error if the given fee rate results in a fee greater than the value
	 * of the output being spent, or if there exists no revokeable `to_local` output on this
	 * commitment transaction. See [`Self::revokeable_output_index`] for more details.
	 * 
	 * The built transaction will allow fee bumping with RBF, and this method takes
	 * `feerate_per_kw` as an input such that multiple copies of a justice transaction at different
	 * fee rates may be built.
	 */
	public Result_TransactionNoneZ build_to_local_justice_tx(long feerate_per_kw, byte[] destination_script) {
		long ret = bindings.TrustedCommitmentTransaction_build_to_local_justice_tx(this.ptr, feerate_per_kw, destination_script);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(feerate_per_kw);
		Reference.reachabilityFence(destination_script);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
