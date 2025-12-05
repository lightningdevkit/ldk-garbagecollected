
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::events::PaymentFailureReason or not
 */
export class Option_PaymentFailureReasonZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_PaymentFailureReasonZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_PaymentFailureReasonZ {
		const raw_ty: number = bindings.LDKCOption_PaymentFailureReasonZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PaymentFailureReasonZ_Some(ptr);
			case 1: return new Option_PaymentFailureReasonZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_PaymentFailureReasonZ containing a crate::lightning::events::PaymentFailureReason
	 */
	public static constructor_some(o: PaymentFailureReason): Option_PaymentFailureReasonZ {
		const ret: bigint = bindings.COption_PaymentFailureReasonZ_some(o);
		const ret_hu_conv: Option_PaymentFailureReasonZ = Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaymentFailureReasonZ containing nothing
	 */
	public static constructor_none(): Option_PaymentFailureReasonZ {
		const ret: bigint = bindings.COption_PaymentFailureReasonZ_none();
		const ret_hu_conv: Option_PaymentFailureReasonZ = Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_PaymentFailureReasonZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_PaymentFailureReasonZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_PaymentFailureReasonZ {
		const ret: bigint = bindings.COption_PaymentFailureReasonZ_clone(this.ptr);
		const ret_hu_conv: Option_PaymentFailureReasonZ = Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_PaymentFailureReasonZ of type Some */
export class Option_PaymentFailureReasonZ_Some extends Option_PaymentFailureReasonZ {
	public some: PaymentFailureReason;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.some = bindings.LDKCOption_PaymentFailureReasonZ_Some_get_some(ptr);
	}
}
/** A Option_PaymentFailureReasonZ of type None */
export class Option_PaymentFailureReasonZ_None extends Option_PaymentFailureReasonZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
