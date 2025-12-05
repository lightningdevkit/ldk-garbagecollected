
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::events::HTLCHandlingFailureType or not
 */
export class Option_HTLCHandlingFailureTypeZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_HTLCHandlingFailureTypeZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_HTLCHandlingFailureTypeZ {
		const raw_ty: number = bindings.LDKCOption_HTLCHandlingFailureTypeZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_HTLCHandlingFailureTypeZ_Some(ptr);
			case 1: return new Option_HTLCHandlingFailureTypeZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_HTLCHandlingFailureTypeZ containing a crate::lightning::events::HTLCHandlingFailureType
	 */
	public static constructor_some(o: HTLCHandlingFailureType): Option_HTLCHandlingFailureTypeZ {
		const ret: bigint = bindings.COption_HTLCHandlingFailureTypeZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_HTLCHandlingFailureTypeZ = Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCHandlingFailureTypeZ containing nothing
	 */
	public static constructor_none(): Option_HTLCHandlingFailureTypeZ {
		const ret: bigint = bindings.COption_HTLCHandlingFailureTypeZ_none();
		const ret_hu_conv: Option_HTLCHandlingFailureTypeZ = Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_HTLCHandlingFailureTypeZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_HTLCHandlingFailureTypeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_HTLCHandlingFailureTypeZ {
		const ret: bigint = bindings.COption_HTLCHandlingFailureTypeZ_clone(this.ptr);
		const ret_hu_conv: Option_HTLCHandlingFailureTypeZ = Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_HTLCHandlingFailureTypeZ of type Some */
export class Option_HTLCHandlingFailureTypeZ_Some extends Option_HTLCHandlingFailureTypeZ {
	public some: HTLCHandlingFailureType;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_HTLCHandlingFailureTypeZ_Some_get_some(ptr);
		const some_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_HTLCHandlingFailureTypeZ of type None */
export class Option_HTLCHandlingFailureTypeZ_None extends Option_HTLCHandlingFailureTypeZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
