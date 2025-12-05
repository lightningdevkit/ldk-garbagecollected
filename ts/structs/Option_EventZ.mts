
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::events::Event or not
 */
export class Option_EventZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_EventZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_EventZ {
		const raw_ty: number = bindings.LDKCOption_EventZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_EventZ_Some(ptr);
			case 1: return new Option_EventZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_EventZ containing a crate::lightning::events::Event
	 */
	public static constructor_some(o: Event): Option_EventZ {
		const ret: bigint = bindings.COption_EventZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_EventZ = Option_EventZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_EventZ containing nothing
	 */
	public static constructor_none(): Option_EventZ {
		const ret: bigint = bindings.COption_EventZ_none();
		const ret_hu_conv: Option_EventZ = Option_EventZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_EventZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_EventZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_EventZ {
		const ret: bigint = bindings.COption_EventZ_clone(this.ptr);
		const ret_hu_conv: Option_EventZ = Option_EventZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_EventZ of type Some */
export class Option_EventZ_Some extends Option_EventZ {
	public some: Event;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_EventZ_Some_get_some(ptr);
		const some_hu_conv: Event = Event.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_EventZ of type None */
export class Option_EventZ_None extends Option_EventZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
