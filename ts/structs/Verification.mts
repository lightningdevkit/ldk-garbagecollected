

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Verification */
export interface VerificationInterface {
	/**Constructs an HMAC to include in [`OffersContext`] for the data along with the given
	 * [`Nonce`].
	 */
	hmac_for_offer_payment(nonce: Nonce, expanded_key: ExpandedKey): Uint8Array;
	/**Authenticates the data using an HMAC and a [`Nonce`] taken from an [`OffersContext`].
	 */
	verify_for_offer_payment(hmac: Uint8Array, nonce: Nonce, expanded_key: ExpandedKey): Result_NoneNoneZ;
}

class LDKVerificationHolder {
	held: Verification|null = null;
}

/**
 * A trait defining behavior for creating and verifing the HMAC for authenticating a given data.
 */
export class Verification extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKVerification|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Verification_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Verification from a given implementation */
	public static new_impl(arg: VerificationInterface): Verification {
		const impl_holder: LDKVerificationHolder = new LDKVerificationHolder();
		let structImplementation = {
			hmac_for_offer_payment (nonce: bigint, expanded_key: bigint): number {
				const nonce_hu_conv: Nonce = new Nonce(null, nonce);
				CommonBase.add_ref_from(nonce_hu_conv, this);
				const expanded_key_hu_conv: ExpandedKey = new ExpandedKey(null, expanded_key);
				const ret: Uint8Array = arg.hmac_for_offer_payment(nonce_hu_conv, expanded_key_hu_conv);
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
			verify_for_offer_payment (hmac: number, nonce: bigint, expanded_key: bigint): bigint {
				const hmac_conv: Uint8Array = bindings.decodeUint8Array(hmac);
				const nonce_hu_conv: Nonce = new Nonce(null, nonce);
				CommonBase.add_ref_from(nonce_hu_conv, this);
				const expanded_key_hu_conv: ExpandedKey = new ExpandedKey(null, expanded_key);
				const ret: Result_NoneNoneZ = arg.verify_for_offer_payment(hmac_conv, nonce_hu_conv, expanded_key_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKVerification;
		const ptr_idx: [bigint, number] = bindings.LDKVerification_new(structImplementation);

		impl_holder.held = new Verification(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Constructs an HMAC to include in [`OffersContext`] for the data along with the given
	 * [`Nonce`].
	 */
	public hmac_for_offer_payment(nonce: Nonce, expanded_key: ExpandedKey): Uint8Array {
		const ret: number = bindings.Verification_hmac_for_offer_payment(this.ptr, CommonBase.get_ptr_of(nonce), CommonBase.get_ptr_of(expanded_key));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Authenticates the data using an HMAC and a [`Nonce`] taken from an [`OffersContext`].
	 */
	public verify_for_offer_payment(hmac: Uint8Array, nonce: Nonce, expanded_key: ExpandedKey): Result_NoneNoneZ {
		const ret: bigint = bindings.Verification_verify_for_offer_payment(this.ptr, bindings.encodeUint8Array(hmac), CommonBase.get_ptr_of(nonce), CommonBase.get_ptr_of(expanded_key));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
