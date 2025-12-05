

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of SignBolt12InvoiceFn */
export interface SignBolt12InvoiceFnInterface {
	/**Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	sign_invoice(message: UnsignedBolt12Invoice): Result_SchnorrSignatureNoneZ;
}

class LDKSignBolt12InvoiceFnHolder {
	held: SignBolt12InvoiceFn|null = null;
}

/**
 * A function for signing an [`UnsignedBolt12Invoice`].
 */
export class SignBolt12InvoiceFn extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKSignBolt12InvoiceFn|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SignBolt12InvoiceFn_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of SignBolt12InvoiceFn from a given implementation */
	public static new_impl(arg: SignBolt12InvoiceFnInterface): SignBolt12InvoiceFn {
		const impl_holder: LDKSignBolt12InvoiceFnHolder = new LDKSignBolt12InvoiceFnHolder();
		let structImplementation = {
			sign_invoice (message: bigint): bigint {
				const message_hu_conv: UnsignedBolt12Invoice = new UnsignedBolt12Invoice(null, message);
				const ret: Result_SchnorrSignatureNoneZ = arg.sign_invoice(message_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKSignBolt12InvoiceFn;
		const ptr_idx: [bigint, number] = bindings.LDKSignBolt12InvoiceFn_new(structImplementation);

		impl_holder.held = new SignBolt12InvoiceFn(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	public sign_invoice(message: UnsignedBolt12Invoice): Result_SchnorrSignatureNoneZ {
		const ret: bigint = bindings.SignBolt12InvoiceFn_sign_invoice(this.ptr, CommonBase.get_ptr_of(message));
		const ret_hu_conv: Result_SchnorrSignatureNoneZ = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
