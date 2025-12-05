

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of SignInvoiceRequestFn */
export interface SignInvoiceRequestFnInterface {
	/**Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	sign_invoice_request(message: UnsignedInvoiceRequest): Result_SchnorrSignatureNoneZ;
}

class LDKSignInvoiceRequestFnHolder {
	held: SignInvoiceRequestFn|null = null;
}

/**
 * A function for signing an [`UnsignedInvoiceRequest`].
 */
export class SignInvoiceRequestFn extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKSignInvoiceRequestFn|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SignInvoiceRequestFn_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of SignInvoiceRequestFn from a given implementation */
	public static new_impl(arg: SignInvoiceRequestFnInterface): SignInvoiceRequestFn {
		const impl_holder: LDKSignInvoiceRequestFnHolder = new LDKSignInvoiceRequestFnHolder();
		let structImplementation = {
			sign_invoice_request (message: bigint): bigint {
				const message_hu_conv: UnsignedInvoiceRequest = new UnsignedInvoiceRequest(null, message);
				const ret: Result_SchnorrSignatureNoneZ = arg.sign_invoice_request(message_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKSignInvoiceRequestFn;
		const ptr_idx: [bigint, number] = bindings.LDKSignInvoiceRequestFn_new(structImplementation);

		impl_holder.held = new SignInvoiceRequestFn(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	public sign_invoice_request(message: UnsignedInvoiceRequest): Result_SchnorrSignatureNoneZ {
		const ret: bigint = bindings.SignInvoiceRequestFn_sign_invoice_request(this.ptr, CommonBase.get_ptr_of(message));
		const ret_hu_conv: Result_SchnorrSignatureNoneZ = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
