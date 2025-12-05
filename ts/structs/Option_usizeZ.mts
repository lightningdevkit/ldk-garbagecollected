
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a usize or not
 */
export class Option_usizeZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_usizeZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_usizeZ {
		const raw_ty: number = bindings.LDKCOption_usizeZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_usizeZ_Some(ptr);
			case 1: return new Option_usizeZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_usizeZ containing a usize
	 */
	public static constructor_some(o: number): Option_usizeZ {
		const ret: bigint = bindings.COption_usizeZ_some(o);
		const ret_hu_conv: Option_usizeZ = Option_usizeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_usizeZ containing nothing
	 */
	public static constructor_none(): Option_usizeZ {
		const ret: bigint = bindings.COption_usizeZ_none();
		const ret_hu_conv: Option_usizeZ = Option_usizeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_usizeZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_usizeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_usizeZ {
		const ret: bigint = bindings.COption_usizeZ_clone(this.ptr);
		const ret_hu_conv: Option_usizeZ = Option_usizeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_usizeZ of type Some */
export class Option_usizeZ_Some extends Option_usizeZ {
	public some: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.some = bindings.LDKCOption_usizeZ_Some_get_some(ptr);
	}
}
/** A Option_usizeZ of type None */
export class Option_usizeZ_None extends Option_usizeZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
