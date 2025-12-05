
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::CVec_u8Z or not
 */
export class Option_CVec_u8ZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_CVec_u8ZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_CVec_u8ZZ {
		const raw_ty: number = bindings.LDKCOption_CVec_u8ZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_CVec_u8ZZ_Some(ptr);
			case 1: return new Option_CVec_u8ZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_CVec_u8ZZ containing a crate::c_types::derived::CVec_u8Z
	 */
	public static constructor_some(o: Uint8Array): Option_CVec_u8ZZ {
		const ret: bigint = bindings.COption_CVec_u8ZZ_some(bindings.encodeUint8Array(o));
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_u8ZZ containing nothing
	 */
	public static constructor_none(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.COption_CVec_u8ZZ_none();
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_CVec_u8ZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_u8ZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.COption_CVec_u8ZZ_clone(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_CVec_u8ZZ of type Some */
export class Option_CVec_u8ZZ_Some extends Option_CVec_u8ZZ {
	public some: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: number = bindings.LDKCOption_CVec_u8ZZ_Some_get_some(ptr);
		const some_conv: Uint8Array = bindings.decodeUint8Array(some);
		this.some = some_conv;
	}
}
/** A Option_CVec_u8ZZ of type None */
export class Option_CVec_u8ZZ_None extends Option_CVec_u8ZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
