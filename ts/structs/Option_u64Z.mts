
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a u64 or not
 */
export class Option_u64Z extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_u64Z_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_u64Z {
		const raw_ty: number = bindings.LDKCOption_u64Z_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_u64Z_Some(ptr);
			case 1: return new Option_u64Z_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_u64Z containing a u64
	 */
	public static constructor_some(o: bigint): Option_u64Z {
		const ret: bigint = bindings.COption_u64Z_some(o);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_u64Z containing nothing
	 */
	public static constructor_none(): Option_u64Z {
		const ret: bigint = bindings.COption_u64Z_none();
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_u64Z_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_u64Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_u64Z {
		const ret: bigint = bindings.COption_u64Z_clone(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_u64Z of type Some */
export class Option_u64Z_Some extends Option_u64Z {
	public some: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.some = bindings.LDKCOption_u64Z_Some_get_some(ptr);
	}
}
/** A Option_u64Z of type None */
export class Option_u64Z_None extends Option_u64Z {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
