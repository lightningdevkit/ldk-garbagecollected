
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::blinded_path::message::OffersContext or not
 */
export class Option_OffersContextZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_OffersContextZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_OffersContextZ {
		const raw_ty: number = bindings.LDKCOption_OffersContextZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_OffersContextZ_Some(ptr);
			case 1: return new Option_OffersContextZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_OffersContextZ containing a crate::lightning::blinded_path::message::OffersContext
	 */
	public static constructor_some(o: OffersContext): Option_OffersContextZ {
		const ret: bigint = bindings.COption_OffersContextZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_OffersContextZ = Option_OffersContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OffersContextZ containing nothing
	 */
	public static constructor_none(): Option_OffersContextZ {
		const ret: bigint = bindings.COption_OffersContextZ_none();
		const ret_hu_conv: Option_OffersContextZ = Option_OffersContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_OffersContextZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_OffersContextZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_OffersContextZ {
		const ret: bigint = bindings.COption_OffersContextZ_clone(this.ptr);
		const ret_hu_conv: Option_OffersContextZ = Option_OffersContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_OffersContextZ of type Some */
export class Option_OffersContextZ_Some extends Option_OffersContextZ {
	public some: OffersContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_OffersContextZ_Some_get_some(ptr);
		const some_hu_conv: OffersContext = OffersContext.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_OffersContextZ of type None */
export class Option_OffersContextZ_None extends Option_OffersContextZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
