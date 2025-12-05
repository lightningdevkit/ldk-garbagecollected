
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a bool or not
 */
export class Option_boolZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_boolZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_boolZ {
		const raw_ty: number = bindings.LDKCOption_boolZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_boolZ_Some(ptr);
			case 1: return new Option_boolZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_boolZ containing a bool
	 */
	public static constructor_some(o: boolean): Option_boolZ {
		const ret: bigint = bindings.COption_boolZ_some(o);
		const ret_hu_conv: Option_boolZ = Option_boolZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_boolZ containing nothing
	 */
	public static constructor_none(): Option_boolZ {
		const ret: bigint = bindings.COption_boolZ_none();
		const ret_hu_conv: Option_boolZ = Option_boolZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_boolZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_boolZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_boolZ {
		const ret: bigint = bindings.COption_boolZ_clone(this.ptr);
		const ret_hu_conv: Option_boolZ = Option_boolZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_boolZ of type Some */
export class Option_boolZ_Some extends Option_boolZ {
	public some: boolean;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.some = bindings.LDKCOption_boolZ_Some_get_some(ptr);
	}
}
/** A Option_boolZ of type None */
export class Option_boolZ_None extends Option_boolZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
