
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::chain::Filter or not
 */
export class Option_FilterZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_FilterZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_FilterZ {
		const raw_ty: number = bindings.LDKCOption_FilterZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_FilterZ_Some(ptr);
			case 1: return new Option_FilterZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_FilterZ containing a crate::lightning::chain::Filter
	 */
	public static constructor_some(o: Filter): Option_FilterZ {
		const ret: bigint = bindings.COption_FilterZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_FilterZ = Option_FilterZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, o);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_FilterZ containing nothing
	 */
	public static constructor_none(): Option_FilterZ {
		const ret: bigint = bindings.COption_FilterZ_none();
		const ret_hu_conv: Option_FilterZ = Option_FilterZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A Option_FilterZ of type Some */
export class Option_FilterZ_Some extends Option_FilterZ {
	public some: Filter;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_FilterZ_Some_get_some(ptr);
		const ret_hu_conv: Filter = new Filter(null, some);
			CommonBase.add_ref_from(ret_hu_conv, this);
		this.some = ret_hu_conv;
	}
}
/** A Option_FilterZ of type None */
export class Option_FilterZ_None extends Option_FilterZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
