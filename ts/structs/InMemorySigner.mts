
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A simple implementation of [`EcdsaChannelSigner`] that just keeps the private keys in memory.
 * 
 * This implementation performs no policy checks and is insufficient by itself as
 * a secure external signer.
 */
export class InMemorySigner extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InMemorySigner_free);
	}

	/**
	 * Holder secret key for blinded revocation pubkey.
	 */
	public get_revocation_base_key(): Uint8Array {
		const ret: number = bindings.InMemorySigner_get_revocation_base_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Holder secret key for blinded revocation pubkey.
	 */
	public set_revocation_base_key(val: Uint8Array): void {
		bindings.InMemorySigner_set_revocation_base_key(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Holder secret key used in an HTLC transaction.
	 */
	public get_delayed_payment_base_key(): Uint8Array {
		const ret: number = bindings.InMemorySigner_get_delayed_payment_base_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Holder secret key used in an HTLC transaction.
	 */
	public set_delayed_payment_base_key(val: Uint8Array): void {
		bindings.InMemorySigner_set_delayed_payment_base_key(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Holder HTLC secret key used in commitment transaction HTLC outputs.
	 */
	public get_htlc_base_key(): Uint8Array {
		const ret: number = bindings.InMemorySigner_get_htlc_base_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Holder HTLC secret key used in commitment transaction HTLC outputs.
	 */
	public set_htlc_base_key(val: Uint8Array): void {
		bindings.InMemorySigner_set_htlc_base_key(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Commitment seed.
	 */
	public get_commitment_seed(): Uint8Array {
		const ret: number = bindings.InMemorySigner_get_commitment_seed(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Commitment seed.
	 */
	public set_commitment_seed(val: Uint8Array): void {
		bindings.InMemorySigner_set_commitment_seed(this.ptr, bindings.encodeUint8Array(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InMemorySigner_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InMemorySigner
	 */
	public clone(): InMemorySigner {
		const ret: bigint = bindings.InMemorySigner_clone(this.ptr);
		const ret_hu_conv: InMemorySigner = new InMemorySigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Holder secret key in the 2-of-2 multisig script of a channel. This key also backs the
	 * holder's anchor output in a commitment transaction, if one is present.
	 */
	public funding_key(splice_parent_funding_txid: Option_ThirtyTwoBytesZ): Uint8Array {
		const ret: number = bindings.InMemorySigner_funding_key(this.ptr, CommonBase.get_ptr_of(splice_parent_funding_txid));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
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
	public sign_counterparty_payment_input(spend_tx: Uint8Array, input_idx: number, descriptor: StaticPaymentOutputDescriptor): Result_WitnessNoneZ {
		const ret: bigint = bindings.InMemorySigner_sign_counterparty_payment_input(this.ptr, bindings.encodeUint8Array(spend_tx), input_idx, CommonBase.get_ptr_of(descriptor));
		const ret_hu_conv: Result_WitnessNoneZ = Result_WitnessNoneZ.constr_from_ptr(ret);
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
	public sign_dynamic_p2wsh_input(spend_tx: Uint8Array, input_idx: number, descriptor: DelayedPaymentOutputDescriptor): Result_WitnessNoneZ {
		const ret: bigint = bindings.InMemorySigner_sign_dynamic_p2wsh_input(this.ptr, bindings.encodeUint8Array(spend_tx), input_idx, CommonBase.get_ptr_of(descriptor));
		const ret_hu_conv: Result_WitnessNoneZ = Result_WitnessNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public as_EntropySource(): EntropySource {
		const ret: bigint = bindings.InMemorySigner_as_EntropySource(this.ptr);
		const ret_hu_conv: EntropySource = new EntropySource(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelSigner must be freed before this_arg is
	 */
	public as_ChannelSigner(): ChannelSigner {
		const ret: bigint = bindings.InMemorySigner_as_ChannelSigner(this.ptr);
		const ret_hu_conv: ChannelSigner = new ChannelSigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EcdsaChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EcdsaChannelSigner must be freed before this_arg is
	 */
	public as_EcdsaChannelSigner(): EcdsaChannelSigner {
		const ret: bigint = bindings.InMemorySigner_as_EcdsaChannelSigner(this.ptr);
		const ret_hu_conv: EcdsaChannelSigner = new EcdsaChannelSigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseEcdsaChannelSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseEcdsaChannelSigner must be freed before this_arg is
	 */
	public as_BaseEcdsaChannelSigner(): BaseEcdsaChannelSigner {
		const ret: bigint = bindings.InMemorySigner_as_BaseEcdsaChannelSigner(this.ptr);
		const ret_hu_conv: BaseEcdsaChannelSigner = new BaseEcdsaChannelSigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
