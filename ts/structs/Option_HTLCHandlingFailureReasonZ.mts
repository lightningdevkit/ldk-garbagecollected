
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::events::HTLCHandlingFailureReason or not
 */
export class Option_HTLCHandlingFailureReasonZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_HTLCHandlingFailureReasonZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_HTLCHandlingFailureReasonZ {
		const raw_ty: number = bindings.LDKCOption_HTLCHandlingFailureReasonZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_HTLCHandlingFailureReasonZ_Some(ptr);
			case 1: return new Option_HTLCHandlingFailureReasonZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_HTLCHandlingFailureReasonZ containing a crate::lightning::events::HTLCHandlingFailureReason
	 */
	public static constructor_some(o: HTLCHandlingFailureReason): Option_HTLCHandlingFailureReasonZ {
		const ret: bigint = bindings.COption_HTLCHandlingFailureReasonZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_HTLCHandlingFailureReasonZ = Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCHandlingFailureReasonZ containing nothing
	 */
	public static constructor_none(): Option_HTLCHandlingFailureReasonZ {
		const ret: bigint = bindings.COption_HTLCHandlingFailureReasonZ_none();
		const ret_hu_conv: Option_HTLCHandlingFailureReasonZ = Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_HTLCHandlingFailureReasonZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_HTLCHandlingFailureReasonZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_HTLCHandlingFailureReasonZ {
		const ret: bigint = bindings.COption_HTLCHandlingFailureReasonZ_clone(this.ptr);
		const ret_hu_conv: Option_HTLCHandlingFailureReasonZ = Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_HTLCHandlingFailureReasonZ of type Some */
export class Option_HTLCHandlingFailureReasonZ_Some extends Option_HTLCHandlingFailureReasonZ {
	public some: HTLCHandlingFailureReason;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_HTLCHandlingFailureReasonZ_Some_get_some(ptr);
		const some_hu_conv: HTLCHandlingFailureReason = HTLCHandlingFailureReason.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_HTLCHandlingFailureReasonZ of type None */
export class Option_HTLCHandlingFailureReasonZ_None extends Option_HTLCHandlingFailureReasonZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
