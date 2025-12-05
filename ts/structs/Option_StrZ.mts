
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::Str or not
 */
export class Option_StrZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_StrZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_StrZ {
		const raw_ty: number = bindings.LDKCOption_StrZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_StrZ_Some(ptr);
			case 1: return new Option_StrZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_StrZ containing a crate::c_types::Str
	 */
	public static constructor_some(o: string): Option_StrZ {
		const ret: bigint = bindings.COption_StrZ_some(bindings.encodeString(o));
		const ret_hu_conv: Option_StrZ = Option_StrZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_StrZ containing nothing
	 */
	public static constructor_none(): Option_StrZ {
		const ret: bigint = bindings.COption_StrZ_none();
		const ret_hu_conv: Option_StrZ = Option_StrZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_StrZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_StrZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_StrZ {
		const ret: bigint = bindings.COption_StrZ_clone(this.ptr);
		const ret_hu_conv: Option_StrZ = Option_StrZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_StrZ of type Some */
export class Option_StrZ_Some extends Option_StrZ {
	public some: string;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: number = bindings.LDKCOption_StrZ_Some_get_some(ptr);
		const some_conv: string = bindings.decodeString(some);
		this.some = some_conv;
	}
}
/** A Option_StrZ of type None */
export class Option_StrZ_None extends Option_StrZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
