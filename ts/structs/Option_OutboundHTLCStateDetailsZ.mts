
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::ln::channel_state::OutboundHTLCStateDetails or not
 */
export class Option_OutboundHTLCStateDetailsZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_OutboundHTLCStateDetailsZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_OutboundHTLCStateDetailsZ {
		const raw_ty: number = bindings.LDKCOption_OutboundHTLCStateDetailsZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_OutboundHTLCStateDetailsZ_Some(ptr);
			case 1: return new Option_OutboundHTLCStateDetailsZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_OutboundHTLCStateDetailsZ containing a crate::lightning::ln::channel_state::OutboundHTLCStateDetails
	 */
	public static constructor_some(o: OutboundHTLCStateDetails): Option_OutboundHTLCStateDetailsZ {
		const ret: bigint = bindings.COption_OutboundHTLCStateDetailsZ_some(o);
		const ret_hu_conv: Option_OutboundHTLCStateDetailsZ = Option_OutboundHTLCStateDetailsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OutboundHTLCStateDetailsZ containing nothing
	 */
	public static constructor_none(): Option_OutboundHTLCStateDetailsZ {
		const ret: bigint = bindings.COption_OutboundHTLCStateDetailsZ_none();
		const ret_hu_conv: Option_OutboundHTLCStateDetailsZ = Option_OutboundHTLCStateDetailsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_OutboundHTLCStateDetailsZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_OutboundHTLCStateDetailsZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_OutboundHTLCStateDetailsZ {
		const ret: bigint = bindings.COption_OutboundHTLCStateDetailsZ_clone(this.ptr);
		const ret_hu_conv: Option_OutboundHTLCStateDetailsZ = Option_OutboundHTLCStateDetailsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_OutboundHTLCStateDetailsZ of type Some */
export class Option_OutboundHTLCStateDetailsZ_Some extends Option_OutboundHTLCStateDetailsZ {
	public some: OutboundHTLCStateDetails;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.some = bindings.LDKCOption_OutboundHTLCStateDetailsZ_Some_get_some(ptr);
	}
}
/** A Option_OutboundHTLCStateDetailsZ of type None */
export class Option_OutboundHTLCStateDetailsZ_None extends Option_OutboundHTLCStateDetailsZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
