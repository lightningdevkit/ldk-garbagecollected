
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An ISO 4217 three-letter currency code (e.g., USD).
 * 
 * Currency codes must be exactly 3 ASCII uppercase letters.
 */
export class CurrencyCode extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CurrencyCode_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CurrencyCode_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CurrencyCode
	 */
	public clone(): CurrencyCode {
		const ret: bigint = bindings.CurrencyCode_clone(this.ptr);
		const ret_hu_conv: CurrencyCode = new CurrencyCode(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two CurrencyCodes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: CurrencyCode): boolean {
		const ret: boolean = bindings.CurrencyCode_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CurrencyCode.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.CurrencyCode_hash(this.ptr);
		return ret;
	}

	/**
	 * Creates a new `CurrencyCode` from a 3-byte array.
	 * 
	 * Returns an error if the bytes are not valid UTF-8 or not all ASCII uppercase.
	 */
	public static constructor_new(code: Uint8Array): Result_CurrencyCodeCurrencyCodeErrorZ {
		const ret: bigint = bindings.CurrencyCode_new(bindings.encodeUint8Array(code));
		const ret_hu_conv: Result_CurrencyCodeCurrencyCodeErrorZ = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the currency code as a byte array.
	 */
	public as_bytes(): Uint8Array {
		const ret: number = bindings.CurrencyCode_as_bytes(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the currency code as a string slice.
	 */
	public as_str(): string {
		const ret: number = bindings.CurrencyCode_as_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Read a CurrencyCode object from a string
	 */
	public static constructor_from_str(s: string): Result_CurrencyCodeCurrencyCodeErrorZ {
		const ret: bigint = bindings.CurrencyCode_from_str(bindings.encodeString(s));
		const ret_hu_conv: Result_CurrencyCodeCurrencyCodeErrorZ = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a CurrencyCode object
	 */
	public to_str(): string {
		const ret: number = bindings.CurrencyCode_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
