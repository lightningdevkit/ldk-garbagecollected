
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ or not
 */
export class Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ {
		const raw_ty: number = bindings.LDKCOption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_Some(ptr);
			case 1: return new Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ containing a crate::c_types::derived::C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ
	 */
	public static constructor_some(o: TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ): Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ {
		const ret: bigint = bindings.COption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ = Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ containing nothing
	 */
	public static constructor_none(): Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ {
		const ret: bigint = bindings.COption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_none();
		const ret_hu_conv: Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ = Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ {
		const ret: bigint = bindings.COption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_clone(this.ptr);
		const ret_hu_conv: Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ = Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ of type Some */
export class Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_Some extends Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ {
	public some: TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_Some_get_some(ptr);
		const some_hu_conv: TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ = new TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ(null, some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ of type None */
export class Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ_None extends Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
