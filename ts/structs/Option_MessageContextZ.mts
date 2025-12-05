
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::blinded_path::message::MessageContext or not
 */
export class Option_MessageContextZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_MessageContextZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_MessageContextZ {
		const raw_ty: number = bindings.LDKCOption_MessageContextZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_MessageContextZ_Some(ptr);
			case 1: return new Option_MessageContextZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_MessageContextZ containing a crate::lightning::blinded_path::message::MessageContext
	 */
	public static constructor_some(o: MessageContext): Option_MessageContextZ {
		const ret: bigint = bindings.COption_MessageContextZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_MessageContextZ = Option_MessageContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_MessageContextZ containing nothing
	 */
	public static constructor_none(): Option_MessageContextZ {
		const ret: bigint = bindings.COption_MessageContextZ_none();
		const ret_hu_conv: Option_MessageContextZ = Option_MessageContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_MessageContextZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_MessageContextZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_MessageContextZ {
		const ret: bigint = bindings.COption_MessageContextZ_clone(this.ptr);
		const ret_hu_conv: Option_MessageContextZ = Option_MessageContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_MessageContextZ of type Some */
export class Option_MessageContextZ_Some extends Option_MessageContextZ {
	public some: MessageContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_MessageContextZ_Some_get_some(ptr);
		const some_hu_conv: MessageContext = MessageContext.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_MessageContextZ of type None */
export class Option_MessageContextZ_None extends Option_MessageContextZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
