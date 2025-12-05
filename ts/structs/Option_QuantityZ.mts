
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::offers::offer::Quantity or not
 */
export class Option_QuantityZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_QuantityZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_QuantityZ {
		const raw_ty: number = bindings.LDKCOption_QuantityZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_QuantityZ_Some(ptr);
			case 1: return new Option_QuantityZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_QuantityZ containing a crate::lightning::offers::offer::Quantity
	 */
	public static constructor_some(o: Quantity): Option_QuantityZ {
		const ret: bigint = bindings.COption_QuantityZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_QuantityZ = Option_QuantityZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_QuantityZ containing nothing
	 */
	public static constructor_none(): Option_QuantityZ {
		const ret: bigint = bindings.COption_QuantityZ_none();
		const ret_hu_conv: Option_QuantityZ = Option_QuantityZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_QuantityZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_QuantityZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_QuantityZ {
		const ret: bigint = bindings.COption_QuantityZ_clone(this.ptr);
		const ret_hu_conv: Option_QuantityZ = Option_QuantityZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_QuantityZ of type Some */
export class Option_QuantityZ_Some extends Option_QuantityZ {
	public some: Quantity;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_QuantityZ_Some_get_some(ptr);
		const some_hu_conv: Quantity = Quantity.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_QuantityZ of type None */
export class Option_QuantityZ_None extends Option_QuantityZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
