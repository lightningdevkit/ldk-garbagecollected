
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::TxOut or not
 */
export class Option_TxOutZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_TxOutZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_TxOutZ {
		const raw_ty: number = bindings.LDKCOption_TxOutZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_TxOutZ_Some(ptr);
			case 1: return new Option_TxOutZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_TxOutZ containing a crate::c_types::TxOut
	 */
	public static constructor_some(o: TxOut): Option_TxOutZ {
		const ret: bigint = bindings.COption_TxOutZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_TxOutZ = Option_TxOutZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_TxOutZ containing nothing
	 */
	public static constructor_none(): Option_TxOutZ {
		const ret: bigint = bindings.COption_TxOutZ_none();
		const ret_hu_conv: Option_TxOutZ = Option_TxOutZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_TxOutZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_TxOutZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_TxOutZ {
		const ret: bigint = bindings.COption_TxOutZ_clone(this.ptr);
		const ret_hu_conv: Option_TxOutZ = Option_TxOutZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_TxOutZ of type Some */
export class Option_TxOutZ_Some extends Option_TxOutZ {
	public some: TxOut;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_TxOutZ_Some_get_some(ptr);
		const some_conv: TxOut = new TxOut(null, some);
		this.some = some_conv;
	}
}
/** A Option_TxOutZ of type None */
export class Option_TxOutZ_None extends Option_TxOutZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
