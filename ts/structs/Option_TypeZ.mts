
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::ln::wire::Type or not
 */
export class Option_TypeZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_TypeZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_TypeZ {
		const raw_ty: number = bindings.LDKCOption_TypeZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_TypeZ_Some(ptr);
			case 1: return new Option_TypeZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_TypeZ containing a crate::lightning::ln::wire::Type
	 */
	public static constructor_some(o: Type): Option_TypeZ {
		const ret: bigint = bindings.COption_TypeZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_TypeZ = Option_TypeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, o);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_TypeZ containing nothing
	 */
	public static constructor_none(): Option_TypeZ {
		const ret: bigint = bindings.COption_TypeZ_none();
		const ret_hu_conv: Option_TypeZ = Option_TypeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_TypeZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_TypeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_TypeZ {
		const ret: bigint = bindings.COption_TypeZ_clone(this.ptr);
		const ret_hu_conv: Option_TypeZ = Option_TypeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_TypeZ of type Some */
export class Option_TypeZ_Some extends Option_TypeZ {
	public some: Type;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_TypeZ_Some_get_some(ptr);
		const ret_hu_conv: Type = new Type(null, some);
			CommonBase.add_ref_from(ret_hu_conv, this);
		this.some = ret_hu_conv;
	}
}
/** A Option_TypeZ of type None */
export class Option_TypeZ_None extends Option_TypeZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
