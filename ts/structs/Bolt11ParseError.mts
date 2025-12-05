
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Errors that indicate what is wrong with the invoice. They have some granularity for debug
 * reasons, but should generally result in an \"invalid BOLT11 invoice\" message for the user.
 */
export class Bolt11ParseError extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt11ParseError_free);
	}

	/**
	 * Checks if two Bolt11ParseErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Bolt11ParseError): boolean {
		const ret: boolean = bindings.Bolt11ParseError_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt11ParseError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11ParseError
	 */
	public clone(): Bolt11ParseError {
		const ret: bigint = bindings.Bolt11ParseError_clone(this.ptr);
		const ret_hu_conv: Bolt11ParseError = new Bolt11ParseError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Bolt11ParseError object
	 */
	public to_str(): string {
		const ret: number = bindings.Bolt11ParseError_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Build a Bolt11ParseError from a Secp256k1Error
	 */
	public static constructor_from_Secp256k1Error(f: Secp256k1Error): Bolt11ParseError {
		const ret: bigint = bindings.Bolt11ParseError_from_Secp256k1Error(f);
		const ret_hu_conv: Bolt11ParseError = new Bolt11ParseError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a Bolt11ParseError from a Error
	 */
	public static constructor_from_Error(f: UnqualifiedError): Bolt11ParseError {
		const ret: bigint = bindings.Bolt11ParseError_from_Error(0);
		const ret_hu_conv: Bolt11ParseError = new Bolt11ParseError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
