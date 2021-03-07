package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * A simple implementation of Sign that just keeps the private keys in memory.
 * 
 * This implementation performs no policy checks and is insufficient by itself as
 * a secure external signer.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InMemorySigner extends CommonBase {
	InMemorySigner(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InMemorySigner_free(ptr); }
	}

	/**
	 * Private key of anchor tx
	 */
	public byte[] get_funding_key() {
		byte[] ret = bindings.InMemorySigner_get_funding_key(this.ptr);
		return ret;
	}

	/**
	 * Private key of anchor tx
	 */
	public void set_funding_key(byte[] val) {
		bindings.InMemorySigner_set_funding_key(this.ptr, val);
	}

	/**
	 * Holder secret key for blinded revocation pubkey
	 */
	public byte[] get_revocation_base_key() {
		byte[] ret = bindings.InMemorySigner_get_revocation_base_key(this.ptr);
		return ret;
	}

	/**
	 * Holder secret key for blinded revocation pubkey
	 */
	public void set_revocation_base_key(byte[] val) {
		bindings.InMemorySigner_set_revocation_base_key(this.ptr, val);
	}

	/**
	 * Holder secret key used for our balance in counterparty-broadcasted commitment transactions
	 */
	public byte[] get_payment_key() {
		byte[] ret = bindings.InMemorySigner_get_payment_key(this.ptr);
		return ret;
	}

	/**
	 * Holder secret key used for our balance in counterparty-broadcasted commitment transactions
	 */
	public void set_payment_key(byte[] val) {
		bindings.InMemorySigner_set_payment_key(this.ptr, val);
	}

	/**
	 * Holder secret key used in HTLC tx
	 */
	public byte[] get_delayed_payment_base_key() {
		byte[] ret = bindings.InMemorySigner_get_delayed_payment_base_key(this.ptr);
		return ret;
	}

	/**
	 * Holder secret key used in HTLC tx
	 */
	public void set_delayed_payment_base_key(byte[] val) {
		bindings.InMemorySigner_set_delayed_payment_base_key(this.ptr, val);
	}

	/**
	 * Holder htlc secret key used in commitment tx htlc outputs
	 */
	public byte[] get_htlc_base_key() {
		byte[] ret = bindings.InMemorySigner_get_htlc_base_key(this.ptr);
		return ret;
	}

	/**
	 * Holder htlc secret key used in commitment tx htlc outputs
	 */
	public void set_htlc_base_key(byte[] val) {
		bindings.InMemorySigner_set_htlc_base_key(this.ptr, val);
	}

	/**
	 * Commitment seed
	 */
	public byte[] get_commitment_seed() {
		byte[] ret = bindings.InMemorySigner_get_commitment_seed(this.ptr);
		return ret;
	}

	/**
	 * Commitment seed
	 */
	public void set_commitment_seed(byte[] val) {
		bindings.InMemorySigner_set_commitment_seed(this.ptr, val);
	}

	/**
	 * Creates a copy of the InMemorySigner
	 */
	public InMemorySigner clone() {
		long ret = bindings.InMemorySigner_clone(this.ptr);
		InMemorySigner ret_hu_conv = new InMemorySigner(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a new InMemorySigner
	 */
	public static InMemorySigner constructor_new(byte[] funding_key, byte[] revocation_base_key, byte[] payment_key, byte[] delayed_payment_base_key, byte[] htlc_base_key, byte[] commitment_seed, long channel_value_satoshis, byte[] channel_keys_id) {
		long ret = bindings.InMemorySigner_new(funding_key, revocation_base_key, payment_key, delayed_payment_base_key, htlc_base_key, commitment_seed, channel_value_satoshis, channel_keys_id);
		InMemorySigner ret_hu_conv = new InMemorySigner(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Counterparty pubkeys.
	 * Will panic if ready_channel wasn't called.
	 */
	public ChannelPublicKeys counterparty_pubkeys() {
		long ret = bindings.InMemorySigner_counterparty_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The contest_delay value specified by our counterparty and applied on holder-broadcastable
	 * transactions, ie the amount of time that we have to wait to recover our funds if we
	 * broadcast a transaction.
	 * Will panic if ready_channel wasn't called.
	 */
	public short counterparty_selected_contest_delay() {
		short ret = bindings.InMemorySigner_counterparty_selected_contest_delay(this.ptr);
		return ret;
	}

	/**
	 * The contest_delay value specified by us and applied on transactions broadcastable
	 * by our counterparty, ie the amount of time that they have to wait to recover their funds
	 * if they broadcast a transaction.
	 * Will panic if ready_channel wasn't called.
	 */
	public short holder_selected_contest_delay() {
		short ret = bindings.InMemorySigner_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	/**
	 * Whether the holder is the initiator
	 * Will panic if ready_channel wasn't called.
	 */
	public boolean is_outbound() {
		boolean ret = bindings.InMemorySigner_is_outbound(this.ptr);
		return ret;
	}

	/**
	 * Funding outpoint
	 * Will panic if ready_channel wasn't called.
	 */
	public OutPoint funding_outpoint() {
		long ret = bindings.InMemorySigner_funding_outpoint(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Obtain a ChannelTransactionParameters for this channel, to be used when verifying or
	 * building transactions.
	 * 
	 * Will panic if ready_channel wasn't called.
	 */
	public ChannelTransactionParameters get_channel_parameters() {
		long ret = bindings.InMemorySigner_get_channel_parameters(this.ptr);
		ChannelTransactionParameters ret_hu_conv = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Sign the single input of spend_tx at index `input_idx` which spends the output
	 * described by descriptor, returning the witness stack for the input.
	 * 
	 * Returns an Err if the input at input_idx does not exist, has a non-empty script_sig,
	 * or is not spending the outpoint described by `descriptor.outpoint`.
	 */
	public Result_CVec_CVec_u8ZZNoneZ sign_counterparty_payment_input(byte[] spend_tx, long input_idx, StaticPaymentOutputDescriptor descriptor) {
		long ret = bindings.InMemorySigner_sign_counterparty_payment_input(this.ptr, spend_tx, input_idx, descriptor == null ? 0 : descriptor.ptr & ~1);
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	/**
	 * Sign the single input of spend_tx at index `input_idx` which spends the output
	 * described by descriptor, returning the witness stack for the input.
	 * 
	 * Returns an Err if the input at input_idx does not exist, has a non-empty script_sig,
	 * is not spending the outpoint described by `descriptor.outpoint`, or does not have a
	 * sequence set to `descriptor.to_self_delay`.
	 */
	public Result_CVec_CVec_u8ZZNoneZ sign_dynamic_p2wsh_input(byte[] spend_tx, long input_idx, DelayedPaymentOutputDescriptor descriptor) {
		long ret = bindings.InMemorySigner_sign_dynamic_p2wsh_input(this.ptr, spend_tx, input_idx, descriptor == null ? 0 : descriptor.ptr & ~1);
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Sign which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Sign must be freed before this_arg is
	 */
	public Sign as_Sign() {
		long ret = bindings.InMemorySigner_as_Sign(this.ptr);
		Sign ret_hu_conv = new Sign(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the InMemorySigner object into a byte array which can be read by InMemorySigner_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InMemorySigner_write(this.ptr);
		return ret;
	}

	/**
	 * Read a InMemorySigner from a byte array, created by InMemorySigner_write
	 */
	public static Result_InMemorySignerDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.InMemorySigner_read(ser);
		Result_InMemorySignerDecodeErrorZ ret_hu_conv = Result_InMemorySignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
