
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An error when attempting to pay a [`Bolt11Invoice`].
 * 
 * [`Bolt11Invoice`]: lightning_invoice::Bolt11Invoice
 */
export class Bolt11PaymentError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Bolt11PaymentError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Bolt11PaymentError {
		const raw_ty: number = bindings.LDKBolt11PaymentError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Bolt11PaymentError_InvalidAmount(ptr);
			case 1: return new Bolt11PaymentError_SendingFailed(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt11PaymentError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11PaymentError
	 */
	public clone(): Bolt11PaymentError {
		const ret: bigint = bindings.Bolt11PaymentError_clone(this.ptr);
		const ret_hu_conv: Bolt11PaymentError = Bolt11PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidAmount-variant Bolt11PaymentError
	 */
	public static constructor_invalid_amount(): Bolt11PaymentError {
		const ret: bigint = bindings.Bolt11PaymentError_invalid_amount();
		const ret_hu_conv: Bolt11PaymentError = Bolt11PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendingFailed-variant Bolt11PaymentError
	 */
	public static constructor_sending_failed(a: RetryableSendFailure): Bolt11PaymentError {
		const ret: bigint = bindings.Bolt11PaymentError_sending_failed(a);
		const ret_hu_conv: Bolt11PaymentError = Bolt11PaymentError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A Bolt11PaymentError of type InvalidAmount */
export class Bolt11PaymentError_InvalidAmount extends Bolt11PaymentError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Bolt11PaymentError of type SendingFailed */
export class Bolt11PaymentError_SendingFailed extends Bolt11PaymentError {
	public sending_failed: RetryableSendFailure;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.sending_failed = bindings.LDKBolt11PaymentError_SendingFailed_get_sending_failed(ptr);
	}
}
