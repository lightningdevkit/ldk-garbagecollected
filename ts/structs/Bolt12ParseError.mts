
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Error when parsing a bech32 encoded message using [`str::parse`].
 */
export class Bolt12ParseError extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt12ParseError_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt12ParseError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12ParseError
	 */
	public clone(): Bolt12ParseError {
		const ret: bigint = bindings.Bolt12ParseError_clone(this.ptr);
		const ret_hu_conv: Bolt12ParseError = new Bolt12ParseError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Build a Bolt12ParseError from a DecodeError
	 */
	public static constructor_from_DecodeError(f: DecodeError): Bolt12ParseError {
		const ret: bigint = bindings.Bolt12ParseError_from_DecodeError(CommonBase.get_ptr_of(f));
		const ret_hu_conv: Bolt12ParseError = new Bolt12ParseError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a Bolt12ParseError from a Bolt12SemanticError
	 */
	public static constructor_from_Bolt12SemanticError(f: Bolt12SemanticError): Bolt12ParseError {
		const ret: bigint = bindings.Bolt12ParseError_from_Bolt12SemanticError(f);
		const ret_hu_conv: Bolt12ParseError = new Bolt12ParseError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a Bolt12ParseError from a Secp256k1Error
	 */
	public static constructor_from_Secp256k1Error(f: Secp256k1Error): Bolt12ParseError {
		const ret: bigint = bindings.Bolt12ParseError_from_Secp256k1Error(f);
		const ret_hu_conv: Bolt12ParseError = new Bolt12ParseError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
