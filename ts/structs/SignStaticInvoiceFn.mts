

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of SignStaticInvoiceFn */
export interface SignStaticInvoiceFnInterface {
	/**Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	sign_invoice(message: UnsignedStaticInvoice): Result_SchnorrSignatureNoneZ;
}

class LDKSignStaticInvoiceFnHolder {
	held: SignStaticInvoiceFn|null = null;
}

/**
 * A function for signing an [`UnsignedStaticInvoice`].
 */
export class SignStaticInvoiceFn extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKSignStaticInvoiceFn|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SignStaticInvoiceFn_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of SignStaticInvoiceFn from a given implementation */
	public static new_impl(arg: SignStaticInvoiceFnInterface): SignStaticInvoiceFn {
		const impl_holder: LDKSignStaticInvoiceFnHolder = new LDKSignStaticInvoiceFnHolder();
		let structImplementation = {
			sign_invoice (message: bigint): bigint {
				const message_hu_conv: UnsignedStaticInvoice = new UnsignedStaticInvoice(null, message);
				const ret: Result_SchnorrSignatureNoneZ = arg.sign_invoice(message_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKSignStaticInvoiceFn;
		const ptr_idx: [bigint, number] = bindings.LDKSignStaticInvoiceFn_new(structImplementation);

		impl_holder.held = new SignStaticInvoiceFn(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Signs a [`TaggedHash`] computed over the merkle root of `message`'s TLV stream.
	 */
	public sign_invoice(message: UnsignedStaticInvoice): Result_SchnorrSignatureNoneZ {
		const ret: bigint = bindings.SignStaticInvoiceFn_sign_invoice(this.ptr, CommonBase.get_ptr_of(message));
		const ret_hu_conv: Result_SchnorrSignatureNoneZ = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, message);
		return ret_hu_conv;
	}

}
