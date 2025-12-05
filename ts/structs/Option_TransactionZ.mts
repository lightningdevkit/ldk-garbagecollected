
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::Transaction or not
 */
export class Option_TransactionZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_TransactionZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_TransactionZ {
		const raw_ty: number = bindings.LDKCOption_TransactionZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_TransactionZ_Some(ptr);
			case 1: return new Option_TransactionZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_TransactionZ containing a crate::c_types::Transaction
	 */
	public static constructor_some(o: Uint8Array): Option_TransactionZ {
		const ret: bigint = bindings.COption_TransactionZ_some(bindings.encodeUint8Array(o));
		const ret_hu_conv: Option_TransactionZ = Option_TransactionZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_TransactionZ containing nothing
	 */
	public static constructor_none(): Option_TransactionZ {
		const ret: bigint = bindings.COption_TransactionZ_none();
		const ret_hu_conv: Option_TransactionZ = Option_TransactionZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_TransactionZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_TransactionZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_TransactionZ {
		const ret: bigint = bindings.COption_TransactionZ_clone(this.ptr);
		const ret_hu_conv: Option_TransactionZ = Option_TransactionZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_TransactionZ of type Some */
export class Option_TransactionZ_Some extends Option_TransactionZ {
	public some: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: number = bindings.LDKCOption_TransactionZ_Some_get_some(ptr);
		const some_conv: Uint8Array = bindings.decodeUint8Array(some);
		this.some = some_conv;
	}
}
/** A Option_TransactionZ of type None */
export class Option_TransactionZ_None extends Option_TransactionZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
