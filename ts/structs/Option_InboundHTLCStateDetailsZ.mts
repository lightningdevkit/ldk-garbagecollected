
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::ln::channel_state::InboundHTLCStateDetails or not
 */
export class Option_InboundHTLCStateDetailsZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_InboundHTLCStateDetailsZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_InboundHTLCStateDetailsZ {
		const raw_ty: number = bindings.LDKCOption_InboundHTLCStateDetailsZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_InboundHTLCStateDetailsZ_Some(ptr);
			case 1: return new Option_InboundHTLCStateDetailsZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_InboundHTLCStateDetailsZ containing a crate::lightning::ln::channel_state::InboundHTLCStateDetails
	 */
	public static constructor_some(o: InboundHTLCStateDetails): Option_InboundHTLCStateDetailsZ {
		const ret: bigint = bindings.COption_InboundHTLCStateDetailsZ_some(o);
		const ret_hu_conv: Option_InboundHTLCStateDetailsZ = Option_InboundHTLCStateDetailsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_InboundHTLCStateDetailsZ containing nothing
	 */
	public static constructor_none(): Option_InboundHTLCStateDetailsZ {
		const ret: bigint = bindings.COption_InboundHTLCStateDetailsZ_none();
		const ret_hu_conv: Option_InboundHTLCStateDetailsZ = Option_InboundHTLCStateDetailsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_InboundHTLCStateDetailsZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_InboundHTLCStateDetailsZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_InboundHTLCStateDetailsZ {
		const ret: bigint = bindings.COption_InboundHTLCStateDetailsZ_clone(this.ptr);
		const ret_hu_conv: Option_InboundHTLCStateDetailsZ = Option_InboundHTLCStateDetailsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_InboundHTLCStateDetailsZ of type Some */
export class Option_InboundHTLCStateDetailsZ_Some extends Option_InboundHTLCStateDetailsZ {
	public some: InboundHTLCStateDetails;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.some = bindings.LDKCOption_InboundHTLCStateDetailsZ_Some_get_some(ptr);
	}
}
/** A Option_InboundHTLCStateDetailsZ of type None */
export class Option_InboundHTLCStateDetailsZ_None extends Option_InboundHTLCStateDetailsZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
