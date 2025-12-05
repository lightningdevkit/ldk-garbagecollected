
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Error when signing messages.
 */
export class SignError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.SignError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): SignError {
		const raw_ty: number = bindings.LDKSignError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SignError_Signing(ptr);
			case 1: return new SignError_Verification(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SignError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SignError
	 */
	public clone(): SignError {
		const ret: bigint = bindings.SignError_clone(this.ptr);
		const ret_hu_conv: SignError = SignError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Signing-variant SignError
	 */
	public static constructor_signing(): SignError {
		const ret: bigint = bindings.SignError_signing();
		const ret_hu_conv: SignError = SignError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Verification-variant SignError
	 */
	public static constructor_verification(a: Secp256k1Error): SignError {
		const ret: bigint = bindings.SignError_verification(a);
		const ret_hu_conv: SignError = SignError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A SignError of type Signing */
export class SignError_Signing extends SignError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A SignError of type Verification */
export class SignError_Verification extends SignError {
	public verification: Secp256k1Error;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.verification = bindings.LDKSignError_Verification_get_verification(ptr);
	}
}
