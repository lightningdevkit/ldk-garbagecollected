
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::routing::utxo::UtxoLookup or not
 */
export class Option_UtxoLookupZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_UtxoLookupZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_UtxoLookupZ {
		const raw_ty: number = bindings.LDKCOption_UtxoLookupZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_UtxoLookupZ_Some(ptr);
			case 1: return new Option_UtxoLookupZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_UtxoLookupZ containing a crate::lightning::routing::utxo::UtxoLookup
	 */
	public static constructor_some(o: UtxoLookup): Option_UtxoLookupZ {
		const ret: bigint = bindings.COption_UtxoLookupZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_UtxoLookupZ = Option_UtxoLookupZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, o);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_UtxoLookupZ containing nothing
	 */
	public static constructor_none(): Option_UtxoLookupZ {
		const ret: bigint = bindings.COption_UtxoLookupZ_none();
		const ret_hu_conv: Option_UtxoLookupZ = Option_UtxoLookupZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A Option_UtxoLookupZ of type Some */
export class Option_UtxoLookupZ_Some extends Option_UtxoLookupZ {
	public some: UtxoLookup;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_UtxoLookupZ_Some_get_some(ptr);
		const ret_hu_conv: UtxoLookup = new UtxoLookup(null, some);
			CommonBase.add_ref_from(ret_hu_conv, this);
		this.some = ret_hu_conv;
	}
}
/** A Option_UtxoLookupZ of type None */
export class Option_UtxoLookupZ_None extends Option_UtxoLookupZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
