using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A descriptor used to sign for a commitment transaction's HTLC output.
 */
public class HTLCDescriptor : CommonBase {
	internal HTLCDescriptor(object _dummy, long ptr) : base(ptr) { }
	~HTLCDescriptor() {
		if (ptr != 0) { bindings.HTLCDescriptor_free(ptr); }
	}

	/**
	 * The parameters required to derive the signer for the HTLC input.
	 */
	public ChannelDerivationParameters get_channel_derivation_parameters() {
		long ret = bindings.HTLCDescriptor_get_channel_derivation_parameters(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelDerivationParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDerivationParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The parameters required to derive the signer for the HTLC input.
	 */
	public void set_channel_derivation_parameters(org.ldk.structs.ChannelDerivationParameters val) {
		bindings.HTLCDescriptor_set_channel_derivation_parameters(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The number of the commitment transaction in which the HTLC output lives.
	 */
	public long get_per_commitment_number() {
		long ret = bindings.HTLCDescriptor_get_per_commitment_number(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The number of the commitment transaction in which the HTLC output lives.
	 */
	public void set_per_commitment_number(long val) {
		bindings.HTLCDescriptor_set_per_commitment_number(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The key tweak corresponding to the number of the commitment transaction in which the HTLC
	 * output lives. This tweak is applied to all the basepoints for both parties in the channel to
	 * arrive at unique keys per commitment.
	 * 
	 * See <https://github.com/lightning/bolts/blob/master/03-transactions.md#keys> for more info.
	 */
	public byte[] get_per_commitment_point() {
		long ret = bindings.HTLCDescriptor_get_per_commitment_point(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The key tweak corresponding to the number of the commitment transaction in which the HTLC
	 * output lives. This tweak is applied to all the basepoints for both parties in the channel to
	 * arrive at unique keys per commitment.
	 * 
	 * See <https://github.com/lightning/bolts/blob/master/03-transactions.md#keys> for more info.
	 */
	public void set_per_commitment_point(byte[] val) {
		bindings.HTLCDescriptor_set_per_commitment_point(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The feerate to use on the HTLC claiming transaction. This is always `0` for HTLCs
	 * originating from a channel supporting anchor outputs, otherwise it is the channel's
	 * negotiated feerate at the time the commitment transaction was built.
	 */
	public int get_feerate_per_kw() {
		int ret = bindings.HTLCDescriptor_get_feerate_per_kw(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The feerate to use on the HTLC claiming transaction. This is always `0` for HTLCs
	 * originating from a channel supporting anchor outputs, otherwise it is the channel's
	 * negotiated feerate at the time the commitment transaction was built.
	 */
	public void set_feerate_per_kw(int val) {
		bindings.HTLCDescriptor_set_feerate_per_kw(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The details of the HTLC as it appears in the commitment transaction.
	 */
	public HTLCOutputInCommitment get_htlc() {
		long ret = bindings.HTLCDescriptor_get_htlc(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCOutputInCommitment ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HTLCOutputInCommitment(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The details of the HTLC as it appears in the commitment transaction.
	 */
	public void set_htlc(org.ldk.structs.HTLCOutputInCommitment val) {
		bindings.HTLCDescriptor_set_htlc(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The preimage, if `Some`, to claim the HTLC output with. If `None`, the timeout path must be
	 * taken.
	 */
	public Option_ThirtyTwoBytesZ get_preimage() {
		long ret = bindings.HTLCDescriptor_get_preimage(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The preimage, if `Some`, to claim the HTLC output with. If `None`, the timeout path must be
	 * taken.
	 */
	public void set_preimage(org.ldk.structs.Option_ThirtyTwoBytesZ val) {
		bindings.HTLCDescriptor_set_preimage(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The counterparty's signature required to spend the HTLC output.
	 */
	public byte[] get_counterparty_sig() {
		long ret = bindings.HTLCDescriptor_get_counterparty_sig(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The counterparty's signature required to spend the HTLC output.
	 */
	public void set_counterparty_sig(byte[] val) {
		bindings.HTLCDescriptor_set_counterparty_sig(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 64)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.HTLCDescriptor_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCDescriptor
	 */
	public HTLCDescriptor clone() {
		long ret = bindings.HTLCDescriptor_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HTLCDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.HTLCDescriptor b) {
		bool ret = bindings.HTLCDescriptor_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is HTLCDescriptor)) return false;
		return this.eq((HTLCDescriptor)o);
	}
	/**
	 * Serialize the HTLCDescriptor object into a byte array which can be read by HTLCDescriptor_read
	 */
	public byte[] write() {
		long ret = bindings.HTLCDescriptor_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HTLCDescriptor from a byte array, created by HTLCDescriptor_write
	 */
	public static Result_HTLCDescriptorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HTLCDescriptor_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCDescriptorDecodeErrorZ ret_hu_conv = Result_HTLCDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the outpoint of the HTLC output in the commitment transaction. This is the outpoint
	 * being spent by the HTLC input in the HTLC transaction.
	 */
	public OutPoint outpoint() {
		long ret = bindings.HTLCDescriptor_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the UTXO to be spent by the HTLC input, which can be obtained via
	 * [`Self::unsigned_tx_input`].
	 */
	public TxOut previous_utxo() {
		long ret = bindings.HTLCDescriptor_previous_utxo(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the unsigned transaction input spending the HTLC output in the commitment
	 * transaction.
	 */
	public TxIn unsigned_tx_input() {
		long ret = bindings.HTLCDescriptor_unsigned_tx_input(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxIn ret_conv = new TxIn(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the delayed output created as a result of spending the HTLC output in the commitment
	 * transaction.
	 */
	public TxOut tx_output() {
		long ret = bindings.HTLCDescriptor_tx_output(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the witness script of the HTLC output in the commitment transaction.
	 */
	public byte[] witness_script() {
		long ret = bindings.HTLCDescriptor_witness_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the fully signed witness required to spend the HTLC output in the commitment
	 * transaction.
	 */
	public byte[] tx_input_witness(byte[] signature, byte[] witness_script) {
		long ret = bindings.HTLCDescriptor_tx_input_witness(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(signature, 64)), InternalUtils.encodeUint8Array(witness_script));
		GC.KeepAlive(this);
		GC.KeepAlive(signature);
		GC.KeepAlive(witness_script);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives the channel signer required to sign the HTLC input.
	 */
	public WriteableEcdsaChannelSigner derive_channel_signer(org.ldk.structs.SignerProvider signer_provider) {
		long ret = bindings.HTLCDescriptor_derive_channel_signer(this.ptr, signer_provider.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(signer_provider);
		if (ret >= 0 && ret <= 4096) { return null; }
		WriteableEcdsaChannelSigner ret_hu_conv = new WriteableEcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(signer_provider); };
		return ret_hu_conv;
	}

}
} } }
