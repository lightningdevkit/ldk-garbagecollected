
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::BigEndianScalar or not
 */
export class Option_BigEndianScalarZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_BigEndianScalarZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_BigEndianScalarZ {
		const raw_ty: number = bindings.LDKCOption_BigEndianScalarZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_BigEndianScalarZ_Some(ptr);
			case 1: return new Option_BigEndianScalarZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_BigEndianScalarZ containing a crate::c_types::BigEndianScalar
	 */
	public static constructor_some(o: BigEndianScalar): Option_BigEndianScalarZ {
		const ret: bigint = bindings.COption_BigEndianScalarZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_BigEndianScalarZ = Option_BigEndianScalarZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_BigEndianScalarZ containing nothing
	 */
	public static constructor_none(): Option_BigEndianScalarZ {
		const ret: bigint = bindings.COption_BigEndianScalarZ_none();
		const ret_hu_conv: Option_BigEndianScalarZ = Option_BigEndianScalarZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_BigEndianScalarZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_BigEndianScalarZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_BigEndianScalarZ {
		const ret: bigint = bindings.COption_BigEndianScalarZ_clone(this.ptr);
		const ret_hu_conv: Option_BigEndianScalarZ = Option_BigEndianScalarZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_BigEndianScalarZ of type Some */
export class Option_BigEndianScalarZ_Some extends Option_BigEndianScalarZ {
	public some: BigEndianScalar;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_BigEndianScalarZ_Some_get_some(ptr);
		const some_conv: BigEndianScalar = new BigEndianScalar(null, some);
		this.some = some_conv;
	}
}
/** A Option_BigEndianScalarZ of type None */
export class Option_BigEndianScalarZ_None extends Option_BigEndianScalarZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
