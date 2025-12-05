
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::ln::chan_utils::HTLCClaim or not
 */
export class Option_HTLCClaimZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_HTLCClaimZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_HTLCClaimZ {
		const raw_ty: number = bindings.LDKCOption_HTLCClaimZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_HTLCClaimZ_Some(ptr);
			case 1: return new Option_HTLCClaimZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_HTLCClaimZ containing a crate::lightning::ln::chan_utils::HTLCClaim
	 */
	public static constructor_some(o: HTLCClaim): Option_HTLCClaimZ {
		const ret: bigint = bindings.COption_HTLCClaimZ_some(o);
		const ret_hu_conv: Option_HTLCClaimZ = Option_HTLCClaimZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCClaimZ containing nothing
	 */
	public static constructor_none(): Option_HTLCClaimZ {
		const ret: bigint = bindings.COption_HTLCClaimZ_none();
		const ret_hu_conv: Option_HTLCClaimZ = Option_HTLCClaimZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A Option_HTLCClaimZ of type Some */
export class Option_HTLCClaimZ_Some extends Option_HTLCClaimZ {
	public some: HTLCClaim;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.some = bindings.LDKCOption_HTLCClaimZ_Some_get_some(ptr);
	}
}
/** A Option_HTLCClaimZ of type None */
export class Option_HTLCClaimZ_None extends Option_HTLCClaimZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
