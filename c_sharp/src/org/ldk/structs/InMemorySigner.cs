using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A simple implementation of [`WriteableEcdsaChannelSigner`] that just keeps the private keys in memory.
 * 
 * This implementation performs no policy checks and is insufficient by itself as
 * a secure external signer.
 */
public class InMemorySigner : CommonBase {
	internal InMemorySigner(object _dummy, long ptr) : base(ptr) { }
	~InMemorySigner() {
		if (ptr != 0) { bindings.InMemorySigner_free(ptr); }
	}

	/**
	 * Holder secret key in the 2-of-2 multisig script of a channel. This key also backs the
	 * holder's anchor output in a commitment transaction, if one is present.
	 */
	public byte[] get_funding_key() {
		long ret = bindings.InMemorySigner_get_funding_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Holder secret key in the 2-of-2 multisig script of a channel. This key also backs the
	 * holder's anchor output in a commitment transaction, if one is present.
	 */
	public void set_funding_key(byte[] val) {
		bindings.InMemorySigner_set_funding_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Holder secret key for blinded revocation pubkey.
	 */
	public byte[] get_revocation_base_key() {
		long ret = bindings.InMemorySigner_get_revocation_base_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Holder secret key for blinded revocation pubkey.
	 */
	public void set_revocation_base_key(byte[] val) {
		bindings.InMemorySigner_set_revocation_base_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Holder secret key used for our balance in counterparty-broadcasted commitment transactions.
	 */
	public byte[] get_payment_key() {
		long ret = bindings.InMemorySigner_get_payment_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Holder secret key used for our balance in counterparty-broadcasted commitment transactions.
	 */
	public void set_payment_key(byte[] val) {
		bindings.InMemorySigner_set_payment_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Holder secret key used in an HTLC transaction.
	 */
	public byte[] get_delayed_payment_base_key() {
		long ret = bindings.InMemorySigner_get_delayed_payment_base_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Holder secret key used in an HTLC transaction.
	 */
	public void set_delayed_payment_base_key(byte[] val) {
		bindings.InMemorySigner_set_delayed_payment_base_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Holder HTLC secret key used in commitment transaction HTLC outputs.
	 */
	public byte[] get_htlc_base_key() {
		long ret = bindings.InMemorySigner_get_htlc_base_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Holder HTLC secret key used in commitment transaction HTLC outputs.
	 */
	public void set_htlc_base_key(byte[] val) {
		bindings.InMemorySigner_set_htlc_base_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Commitment seed.
	 */
	public byte[] get_commitment_seed() {
		long ret = bindings.InMemorySigner_get_commitment_seed(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Commitment seed.
	 */
	public void set_commitment_seed(byte[] val) {
		bindings.InMemorySigner_set_commitment_seed(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.InMemorySigner_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the InMemorySigner
	 */
	public InMemorySigner clone() {
		long ret = bindings.InMemorySigner_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InMemorySigner ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InMemorySigner(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`InMemorySigner`].
	 */
	public static InMemorySigner of(byte[] funding_key, byte[] revocation_base_key, byte[] payment_key, byte[] delayed_payment_base_key, byte[] htlc_base_key, byte[] commitment_seed, long channel_value_satoshis, byte[] channel_keys_id, byte[] rand_bytes_unique_start) {
		long ret = bindings.InMemorySigner_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(funding_key, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(revocation_base_key, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_key, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(delayed_payment_base_key, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(htlc_base_key, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(commitment_seed, 32)), channel_value_satoshis, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_keys_id, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(rand_bytes_unique_start, 32)));
		GC.KeepAlive(funding_key);
		GC.KeepAlive(revocation_base_key);
		GC.KeepAlive(payment_key);
		GC.KeepAlive(delayed_payment_base_key);
		GC.KeepAlive(htlc_base_key);
		GC.KeepAlive(commitment_seed);
		GC.KeepAlive(channel_value_satoshis);
		GC.KeepAlive(channel_keys_id);
		GC.KeepAlive(rand_bytes_unique_start);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InMemorySigner ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InMemorySigner(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the counterparty's pubkeys.
	 * 
	 * Will return `None` if [`ChannelSigner::provide_channel_parameters`] has not been called.
	 * In general, this is safe to `unwrap` only in [`ChannelSigner`] implementation.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ChannelPublicKeys counterparty_pubkeys() {
		long ret = bindings.InMemorySigner_counterparty_pubkeys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the `contest_delay` value specified by our counterparty and applied on holder-broadcastable
	 * transactions, i.e., the amount of time that we have to wait to recover our funds if we
	 * broadcast a transaction.
	 * 
	 * Will return `None` if [`ChannelSigner::provide_channel_parameters`] has not been called.
	 * In general, this is safe to `unwrap` only in [`ChannelSigner`] implementation.
	 */
	public Option_u16Z counterparty_selected_contest_delay() {
		long ret = bindings.InMemorySigner_counterparty_selected_contest_delay(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u16Z ret_hu_conv = org.ldk.structs.Option_u16Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the `contest_delay` value specified by us and applied on transactions broadcastable
	 * by our counterparty, i.e., the amount of time that they have to wait to recover their funds
	 * if they broadcast a transaction.
	 * 
	 * Will return `None` if [`ChannelSigner::provide_channel_parameters`] has not been called.
	 * In general, this is safe to `unwrap` only in [`ChannelSigner`] implementation.
	 */
	public Option_u16Z holder_selected_contest_delay() {
		long ret = bindings.InMemorySigner_holder_selected_contest_delay(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u16Z ret_hu_conv = org.ldk.structs.Option_u16Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns whether the holder is the initiator.
	 * 
	 * Will return `None` if [`ChannelSigner::provide_channel_parameters`] has not been called.
	 * In general, this is safe to `unwrap` only in [`ChannelSigner`] implementation.
	 */
	public Option_boolZ is_outbound() {
		long ret = bindings.InMemorySigner_is_outbound(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_boolZ ret_hu_conv = org.ldk.structs.Option_boolZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Funding outpoint
	 * 
	 * Will return `None` if [`ChannelSigner::provide_channel_parameters`] has not been called.
	 * In general, this is safe to `unwrap` only in [`ChannelSigner`] implementation.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public OutPoint funding_outpoint() {
		long ret = bindings.InMemorySigner_funding_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns a [`ChannelTransactionParameters`] for this channel, to be used when verifying or
	 * building transactions.
	 * 
	 * Will return `None` if [`ChannelSigner::provide_channel_parameters`] has not been called.
	 * In general, this is safe to `unwrap` only in [`ChannelSigner`] implementation.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ChannelTransactionParameters get_channel_parameters() {
		long ret = bindings.InMemorySigner_get_channel_parameters(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the channel type features of the channel parameters. Should be helpful for
	 * determining a channel's category, i. e. legacy/anchors/taproot/etc.
	 * 
	 * Will return `None` if [`ChannelSigner::provide_channel_parameters`] has not been called.
	 * In general, this is safe to `unwrap` only in [`ChannelSigner`] implementation.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ChannelTypeFeatures channel_type_features() {
		long ret = bindings.InMemorySigner_channel_type_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Sign the single input of `spend_tx` at index `input_idx`, which spends the output described
	 * by `descriptor`, returning the witness stack for the input.
	 * 
	 * Returns an error if the input at `input_idx` does not exist, has a non-empty `script_sig`,
	 * is not spending the outpoint described by [`descriptor.outpoint`],
	 * or if an output descriptor `script_pubkey` does not match the one we can spend.
	 * 
	 * [`descriptor.outpoint`]: StaticPaymentOutputDescriptor::outpoint
	 */
	public Result_WitnessNoneZ sign_counterparty_payment_input(byte[] spend_tx, long input_idx, org.ldk.structs.StaticPaymentOutputDescriptor descriptor) {
		long ret = bindings.InMemorySigner_sign_counterparty_payment_input(this.ptr, InternalUtils.encodeUint8Array(spend_tx), input_idx, descriptor == null ? 0 : descriptor.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(spend_tx);
		GC.KeepAlive(input_idx);
		GC.KeepAlive(descriptor);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(descriptor); };
		return ret_hu_conv;
	}

	/**
	 * Sign the single input of `spend_tx` at index `input_idx` which spends the output
	 * described by `descriptor`, returning the witness stack for the input.
	 * 
	 * Returns an error if the input at `input_idx` does not exist, has a non-empty `script_sig`,
	 * is not spending the outpoint described by [`descriptor.outpoint`], does not have a
	 * sequence set to [`descriptor.to_self_delay`], or if an output descriptor
	 * `script_pubkey` does not match the one we can spend.
	 * 
	 * [`descriptor.outpoint`]: DelayedPaymentOutputDescriptor::outpoint
	 * [`descriptor.to_self_delay`]: DelayedPaymentOutputDescriptor::to_self_delay
	 */
	public Result_WitnessNoneZ sign_dynamic_p2wsh_input(byte[] spend_tx, long input_idx, org.ldk.structs.DelayedPaymentOutputDescriptor descriptor) {
		long ret = bindings.InMemorySigner_sign_dynamic_p2wsh_input(this.ptr, InternalUtils.encodeUint8Array(spend_tx), input_idx, descriptor == null ? 0 : descriptor.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(spend_tx);
		GC.KeepAlive(input_idx);
		GC.KeepAlive(descriptor);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(descriptor); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public EntropySource as_EntropySource() {
		long ret = bindings.InMemorySigner_as_EntropySource(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EntropySource ret_hu_conv = new EntropySource(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelSigner must be freed before this_arg is
	 */
	public ChannelSigner as_ChannelSigner() {
		long ret = bindings.InMemorySigner_as_ChannelSigner(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelSigner ret_hu_conv = new ChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EcdsaChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EcdsaChannelSigner must be freed before this_arg is
	 */
	public EcdsaChannelSigner as_EcdsaChannelSigner() {
		long ret = bindings.InMemorySigner_as_EcdsaChannelSigner(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EcdsaChannelSigner ret_hu_conv = new EcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new WriteableEcdsaChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned WriteableEcdsaChannelSigner must be freed before this_arg is
	 */
	public WriteableEcdsaChannelSigner as_WriteableEcdsaChannelSigner() {
		long ret = bindings.InMemorySigner_as_WriteableEcdsaChannelSigner(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		WriteableEcdsaChannelSigner ret_hu_conv = new WriteableEcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the InMemorySigner object into a byte array which can be read by InMemorySigner_read
	 */
	public byte[] write() {
		long ret = bindings.InMemorySigner_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InMemorySigner from a byte array, created by InMemorySigner_write
	 */
	public static Result_InMemorySignerDecodeErrorZ read(byte[] ser, org.ldk.structs.EntropySource arg) {
		long ret = bindings.InMemorySigner_read(InternalUtils.encodeUint8Array(ser), arg.ptr);
		GC.KeepAlive(ser);
		GC.KeepAlive(arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InMemorySignerDecodeErrorZ ret_hu_conv = Result_InMemorySignerDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(arg); };
		return ret_hu_conv;
	}

}
} } }
