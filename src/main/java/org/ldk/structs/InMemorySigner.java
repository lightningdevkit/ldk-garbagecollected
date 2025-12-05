package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A simple implementation of [`EcdsaChannelSigner`] that just keeps the private keys in memory.
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
	 * Holder secret key for blinded revocation pubkey.
	 */
	public byte[] get_revocation_base_key() {
		byte[] ret = bindings.InMemorySigner_get_revocation_base_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Holder secret key for blinded revocation pubkey.
	 */
	public void set_revocation_base_key(byte[] val) {
		bindings.InMemorySigner_set_revocation_base_key(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Holder secret key used in an HTLC transaction.
	 */
	public byte[] get_delayed_payment_base_key() {
		byte[] ret = bindings.InMemorySigner_get_delayed_payment_base_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Holder secret key used in an HTLC transaction.
	 */
	public void set_delayed_payment_base_key(byte[] val) {
		bindings.InMemorySigner_set_delayed_payment_base_key(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Holder HTLC secret key used in commitment transaction HTLC outputs.
	 */
	public byte[] get_htlc_base_key() {
		byte[] ret = bindings.InMemorySigner_get_htlc_base_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Holder HTLC secret key used in commitment transaction HTLC outputs.
	 */
	public void set_htlc_base_key(byte[] val) {
		bindings.InMemorySigner_set_htlc_base_key(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Commitment seed.
	 */
	public byte[] get_commitment_seed() {
		byte[] ret = bindings.InMemorySigner_get_commitment_seed(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Commitment seed.
	 */
	public void set_commitment_seed(byte[] val) {
		bindings.InMemorySigner_set_commitment_seed(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.InMemorySigner_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the InMemorySigner
	 */
	public InMemorySigner clone() {
		long ret = bindings.InMemorySigner_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InMemorySigner ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InMemorySigner(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Holder secret key in the 2-of-2 multisig script of a channel. This key also backs the
	 * holder's anchor output in a commitment transaction, if one is present.
	 */
	public byte[] funding_key(org.ldk.structs.Option_ThirtyTwoBytesZ splice_parent_funding_txid) {
		byte[] ret = bindings.InMemorySigner_funding_key(this.ptr, splice_parent_funding_txid.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(splice_parent_funding_txid);
		return ret;
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
		long ret = bindings.InMemorySigner_sign_counterparty_payment_input(this.ptr, spend_tx, input_idx, descriptor.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(spend_tx);
		Reference.reachabilityFence(input_idx);
		Reference.reachabilityFence(descriptor);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
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
		long ret = bindings.InMemorySigner_sign_dynamic_p2wsh_input(this.ptr, spend_tx, input_idx, descriptor.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(spend_tx);
		Reference.reachabilityFence(input_idx);
		Reference.reachabilityFence(descriptor);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public EntropySource as_EntropySource() {
		long ret = bindings.InMemorySigner_as_EntropySource(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EntropySource ret_hu_conv = new EntropySource(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelSigner must be freed before this_arg is
	 */
	public ChannelSigner as_ChannelSigner() {
		long ret = bindings.InMemorySigner_as_ChannelSigner(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelSigner ret_hu_conv = new ChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EcdsaChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EcdsaChannelSigner must be freed before this_arg is
	 */
	public EcdsaChannelSigner as_EcdsaChannelSigner() {
		long ret = bindings.InMemorySigner_as_EcdsaChannelSigner(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EcdsaChannelSigner ret_hu_conv = new EcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseEcdsaChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseEcdsaChannelSigner must be freed before this_arg is
	 */
	public BaseEcdsaChannelSigner as_BaseEcdsaChannelSigner() {
		long ret = bindings.InMemorySigner_as_BaseEcdsaChannelSigner(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BaseEcdsaChannelSigner ret_hu_conv = new BaseEcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
