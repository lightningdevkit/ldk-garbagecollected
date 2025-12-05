
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::offers::offer::Amount or not
 */
export class Option_AmountZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_AmountZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_AmountZ {
		const raw_ty: number = bindings.LDKCOption_AmountZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_AmountZ_Some(ptr);
			case 1: return new Option_AmountZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_AmountZ containing a crate::lightning::offers::offer::Amount
	 */
	public static constructor_some(o: Amount): Option_AmountZ {
		const ret: bigint = bindings.COption_AmountZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_AmountZ = Option_AmountZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_AmountZ containing nothing
	 */
	public static constructor_none(): Option_AmountZ {
		const ret: bigint = bindings.COption_AmountZ_none();
		const ret_hu_conv: Option_AmountZ = Option_AmountZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_AmountZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_AmountZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_AmountZ {
		const ret: bigint = bindings.COption_AmountZ_clone(this.ptr);
		const ret_hu_conv: Option_AmountZ = Option_AmountZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_AmountZ of type Some */
export class Option_AmountZ_Some extends Option_AmountZ {
	public some: Amount;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_AmountZ_Some_get_some(ptr);
		const some_hu_conv: Amount = Amount.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_AmountZ of type None */
export class Option_AmountZ_None extends Option_AmountZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
