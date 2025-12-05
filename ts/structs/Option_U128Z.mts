
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::U128 or not
 */
export class Option_U128Z extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_U128Z_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_U128Z {
		const raw_ty: number = bindings.LDKCOption_U128Z_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_U128Z_Some(ptr);
			case 1: return new Option_U128Z_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_U128Z containing a crate::c_types::U128
	 */
	public static constructor_some(o: bigint): Option_U128Z {
		const ret: bigint = bindings.COption_U128Z_some(bindings.encodeUint128(o));
		const ret_hu_conv: Option_U128Z = Option_U128Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_U128Z containing nothing
	 */
	public static constructor_none(): Option_U128Z {
		const ret: bigint = bindings.COption_U128Z_none();
		const ret_hu_conv: Option_U128Z = Option_U128Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_U128Z_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_U128Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_U128Z {
		const ret: bigint = bindings.COption_U128Z_clone(this.ptr);
		const ret_hu_conv: Option_U128Z = Option_U128Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_U128Z of type Some */
export class Option_U128Z_Some extends Option_U128Z {
	public some: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: number = bindings.LDKCOption_U128Z_Some_get_some(ptr);
		const some_conv: bigint = bindings.decodeUint128(some);
		this.some = some_conv;
	}
}
/** A Option_U128Z of type None */
export class Option_U128Z_None extends Option_U128Z {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
