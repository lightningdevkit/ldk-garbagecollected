
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::chain::transaction::OutPoint or not
 */
export class Option_OutPointZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_OutPointZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_OutPointZ {
		const raw_ty: number = bindings.LDKCOption_OutPointZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_OutPointZ_Some(ptr);
			case 1: return new Option_OutPointZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_OutPointZ containing a crate::lightning::chain::transaction::OutPoint
	 */
	public static constructor_some(o: OutPoint): Option_OutPointZ {
		const ret: bigint = bindings.COption_OutPointZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_OutPointZ = Option_OutPointZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OutPointZ containing nothing
	 */
	public static constructor_none(): Option_OutPointZ {
		const ret: bigint = bindings.COption_OutPointZ_none();
		const ret_hu_conv: Option_OutPointZ = Option_OutPointZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_OutPointZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_OutPointZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_OutPointZ {
		const ret: bigint = bindings.COption_OutPointZ_clone(this.ptr);
		const ret_hu_conv: Option_OutPointZ = Option_OutPointZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_OutPointZ of type Some */
export class Option_OutPointZ_Some extends Option_OutPointZ {
	public some: OutPoint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_OutPointZ_Some_get_some(ptr);
		const some_hu_conv: OutPoint = new OutPoint(null, some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_OutPointZ of type None */
export class Option_OutPointZ_None extends Option_OutPointZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
