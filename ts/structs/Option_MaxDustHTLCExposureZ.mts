
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::util::config::MaxDustHTLCExposure or not
 */
export class Option_MaxDustHTLCExposureZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_MaxDustHTLCExposureZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_MaxDustHTLCExposureZ {
		const raw_ty: number = bindings.LDKCOption_MaxDustHTLCExposureZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_MaxDustHTLCExposureZ_Some(ptr);
			case 1: return new Option_MaxDustHTLCExposureZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_MaxDustHTLCExposureZ containing a crate::lightning::util::config::MaxDustHTLCExposure
	 */
	public static constructor_some(o: MaxDustHTLCExposure): Option_MaxDustHTLCExposureZ {
		const ret: bigint = bindings.COption_MaxDustHTLCExposureZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_MaxDustHTLCExposureZ = Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_MaxDustHTLCExposureZ containing nothing
	 */
	public static constructor_none(): Option_MaxDustHTLCExposureZ {
		const ret: bigint = bindings.COption_MaxDustHTLCExposureZ_none();
		const ret_hu_conv: Option_MaxDustHTLCExposureZ = Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_MaxDustHTLCExposureZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_MaxDustHTLCExposureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_MaxDustHTLCExposureZ {
		const ret: bigint = bindings.COption_MaxDustHTLCExposureZ_clone(this.ptr);
		const ret_hu_conv: Option_MaxDustHTLCExposureZ = Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_MaxDustHTLCExposureZ of type Some */
export class Option_MaxDustHTLCExposureZ_Some extends Option_MaxDustHTLCExposureZ {
	public some: MaxDustHTLCExposure;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_MaxDustHTLCExposureZ_Some_get_some(ptr);
		const some_hu_conv: MaxDustHTLCExposure = MaxDustHTLCExposure.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_MaxDustHTLCExposureZ of type None */
export class Option_MaxDustHTLCExposureZ_None extends Option_MaxDustHTLCExposureZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
