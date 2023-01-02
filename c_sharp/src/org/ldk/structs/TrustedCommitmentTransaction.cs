using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A wrapper on CommitmentTransaction indicating that the derived fields (the built bitcoin
 * transaction and the transaction creation keys) are trusted.
 * 
 * See trust() and verify() functions on CommitmentTransaction.
 * 
 * This structure implements Deref.
 */
public class TrustedCommitmentTransaction : CommonBase {
	internal TrustedCommitmentTransaction(object _dummy, long ptr) : base(ptr) { }
	~TrustedCommitmentTransaction() {
		if (ptr != 0) { bindings.TrustedCommitmentTransaction_free(ptr); }
	}

	/**
	 * The transaction ID of the built Bitcoin transaction
	 */
	public byte[] txid() {
		byte[] ret = bindings.TrustedCommitmentTransaction_txid(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The pre-built Bitcoin commitment transaction
	 */
	public BuiltCommitmentTransaction built_transaction() {
		long ret = bindings.TrustedCommitmentTransaction_built_transaction(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BuiltCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BuiltCommitmentTransaction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The pre-calculated transaction creation public keys.
	 */
	public TxCreationKeys keys() {
		long ret = bindings.TrustedCommitmentTransaction_keys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxCreationKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxCreationKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Should anchors be used.
	 */
	public bool opt_anchors() {
		bool ret = bindings.TrustedCommitmentTransaction_opt_anchors(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Get a signature for each HTLC which was included in the commitment transaction (ie for
	 * which HTLCOutputInCommitment::transaction_output_index.is_some()).
	 * 
	 * The returned Vec has one entry for each HTLC, and in the same order.
	 * 
	 * This function is only valid in the holder commitment context, it always uses EcdsaSighashType::All.
	 */
	public Result_CVec_SignatureZNoneZ get_htlc_sigs(byte[] htlc_base_key, org.ldk.structs.DirectedChannelTransactionParameters channel_parameters) {
		long ret = bindings.TrustedCommitmentTransaction_get_htlc_sigs(this.ptr, InternalUtils.check_arr_len(htlc_base_key, 32), channel_parameters == null ? 0 : channel_parameters.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(htlc_base_key);
		GC.KeepAlive(channel_parameters);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(channel_parameters); };
		return ret_hu_conv;
	}

}
} } }
