
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An error when attempting to pay a [`Bolt12Invoice`].
 */
export class Bolt12PaymentError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Bolt12PaymentError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Bolt12PaymentError {
		const raw_ty: number = bindings.LDKBolt12PaymentError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Bolt12PaymentError_UnexpectedInvoice(ptr);
			case 1: return new Bolt12PaymentError_DuplicateInvoice(ptr);
			case 2: return new Bolt12PaymentError_UnknownRequiredFeatures(ptr);
			case 3: return new Bolt12PaymentError_SendingFailed(ptr);
			case 4: return new Bolt12PaymentError_BlindedPathCreationFailed(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt12PaymentError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12PaymentError
	 */
	public clone(): Bolt12PaymentError {
		const ret: bigint = bindings.Bolt12PaymentError_clone(this.ptr);
		const ret_hu_conv: Bolt12PaymentError = Bolt12PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnexpectedInvoice-variant Bolt12PaymentError
	 */
	public static constructor_unexpected_invoice(): Bolt12PaymentError {
		const ret: bigint = bindings.Bolt12PaymentError_unexpected_invoice();
		const ret_hu_conv: Bolt12PaymentError = Bolt12PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DuplicateInvoice-variant Bolt12PaymentError
	 */
	public static constructor_duplicate_invoice(): Bolt12PaymentError {
		const ret: bigint = bindings.Bolt12PaymentError_duplicate_invoice();
		const ret_hu_conv: Bolt12PaymentError = Bolt12PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownRequiredFeatures-variant Bolt12PaymentError
	 */
	public static constructor_unknown_required_features(): Bolt12PaymentError {
		const ret: bigint = bindings.Bolt12PaymentError_unknown_required_features();
		const ret_hu_conv: Bolt12PaymentError = Bolt12PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendingFailed-variant Bolt12PaymentError
	 */
	public static constructor_sending_failed(a: RetryableSendFailure): Bolt12PaymentError {
		const ret: bigint = bindings.Bolt12PaymentError_sending_failed(a);
		const ret_hu_conv: Bolt12PaymentError = Bolt12PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BlindedPathCreationFailed-variant Bolt12PaymentError
	 */
	public static constructor_blinded_path_creation_failed(): Bolt12PaymentError {
		const ret: bigint = bindings.Bolt12PaymentError_blinded_path_creation_failed();
		const ret_hu_conv: Bolt12PaymentError = Bolt12PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt12PaymentErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Bolt12PaymentError): boolean {
		const ret: boolean = bindings.Bolt12PaymentError_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A Bolt12PaymentError of type UnexpectedInvoice */
export class Bolt12PaymentError_UnexpectedInvoice extends Bolt12PaymentError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Bolt12PaymentError of type DuplicateInvoice */
export class Bolt12PaymentError_DuplicateInvoice extends Bolt12PaymentError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Bolt12PaymentError of type UnknownRequiredFeatures */
export class Bolt12PaymentError_UnknownRequiredFeatures extends Bolt12PaymentError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Bolt12PaymentError of type SendingFailed */
export class Bolt12PaymentError_SendingFailed extends Bolt12PaymentError {
	public sending_failed: RetryableSendFailure;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.sending_failed = bindings.LDKBolt12PaymentError_SendingFailed_get_sending_failed(ptr);
	}
}
/** A Bolt12PaymentError of type BlindedPathCreationFailed */
export class Bolt12PaymentError_BlindedPathCreationFailed extends Bolt12PaymentError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
