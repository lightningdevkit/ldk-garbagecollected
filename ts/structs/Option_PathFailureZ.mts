
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::events::PathFailure or not
 */
export class Option_PathFailureZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_PathFailureZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_PathFailureZ {
		const raw_ty: number = bindings.LDKCOption_PathFailureZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PathFailureZ_Some(ptr);
			case 1: return new Option_PathFailureZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_PathFailureZ containing a crate::lightning::events::PathFailure
	 */
	public static constructor_some(o: PathFailure): Option_PathFailureZ {
		const ret: bigint = bindings.COption_PathFailureZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_PathFailureZ = Option_PathFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PathFailureZ containing nothing
	 */
	public static constructor_none(): Option_PathFailureZ {
		const ret: bigint = bindings.COption_PathFailureZ_none();
		const ret_hu_conv: Option_PathFailureZ = Option_PathFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_PathFailureZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_PathFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_PathFailureZ {
		const ret: bigint = bindings.COption_PathFailureZ_clone(this.ptr);
		const ret_hu_conv: Option_PathFailureZ = Option_PathFailureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_PathFailureZ of type Some */
export class Option_PathFailureZ_Some extends Option_PathFailureZ {
	public some: PathFailure;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_PathFailureZ_Some_get_some(ptr);
		const some_hu_conv: PathFailure = PathFailure.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_PathFailureZ of type None */
export class Option_PathFailureZ_None extends Option_PathFailureZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
