
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An error indicating that a currency code is invalid.
 * 
 * A valid currency code must follow the ISO 4217 standard:
 * - Exactly 3 characters in length.
 * - Consist only of uppercase ASCII letters (A–Z).
 */
export class CurrencyCodeError extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CurrencyCodeError_free);
	}

	/**
	 * Constructs a new CurrencyCodeError given each field
	 */
	public static constructor_new(): CurrencyCodeError {
		const ret: bigint = bindings.CurrencyCodeError_new();
		const ret_hu_conv: CurrencyCodeError = new CurrencyCodeError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CurrencyCodeError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CurrencyCodeError
	 */
	public clone(): CurrencyCodeError {
		const ret: bigint = bindings.CurrencyCodeError_clone(this.ptr);
		const ret_hu_conv: CurrencyCodeError = new CurrencyCodeError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two CurrencyCodeErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: CurrencyCodeError): boolean {
		const ret: boolean = bindings.CurrencyCodeError_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Get the string representation of a CurrencyCodeError object
	 */
	public to_str(): string {
		const ret: number = bindings.CurrencyCodeError_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
