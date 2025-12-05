
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * When signing using a fallible method either an user-supplied `SignError` or a [`CreationError`]
 * may occur.
 */
export class SignOrCreationError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.SignOrCreationError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): SignOrCreationError {
		const raw_ty: number = bindings.LDKSignOrCreationError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SignOrCreationError_SignError(ptr);
			case 1: return new SignOrCreationError_CreationError(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SignOrCreationError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SignOrCreationError
	 */
	public clone(): SignOrCreationError {
		const ret: bigint = bindings.SignOrCreationError_clone(this.ptr);
		const ret_hu_conv: SignOrCreationError = SignOrCreationError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SignError-variant SignOrCreationError
	 */
	public static constructor_sign_error(): SignOrCreationError {
		const ret: bigint = bindings.SignOrCreationError_sign_error();
		const ret_hu_conv: SignOrCreationError = SignOrCreationError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CreationError-variant SignOrCreationError
	 */
	public static constructor_creation_error(a: CreationError): SignOrCreationError {
		const ret: bigint = bindings.SignOrCreationError_creation_error(a);
		const ret_hu_conv: SignOrCreationError = SignOrCreationError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two SignOrCreationErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: SignOrCreationError): boolean {
		const ret: boolean = bindings.SignOrCreationError_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Get the string representation of a SignOrCreationError object
	 */
	public to_str(): string {
		const ret: number = bindings.SignOrCreationError_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
/** A SignOrCreationError of type SignError */
export class SignOrCreationError_SignError extends SignOrCreationError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SignOrCreationError of type CreationError */
export class SignOrCreationError_CreationError extends SignOrCreationError {
	public creation_error: CreationError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.creation_error = bindings.LDKSignOrCreationError_CreationError_get_creation_error(ptr);
	}
}
