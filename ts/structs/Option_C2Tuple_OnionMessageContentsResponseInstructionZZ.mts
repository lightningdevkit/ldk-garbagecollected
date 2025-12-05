
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_OnionMessageContentsResponseInstructionZ or not
 */
export class Option_C2Tuple_OnionMessageContentsResponseInstructionZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_C2Tuple_OnionMessageContentsResponseInstructionZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_C2Tuple_OnionMessageContentsResponseInstructionZZ {
		const raw_ty: number = bindings.LDKCOption_C2Tuple_OnionMessageContentsResponseInstructionZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_OnionMessageContentsResponseInstructionZZ_Some(ptr);
			case 1: return new Option_C2Tuple_OnionMessageContentsResponseInstructionZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_C2Tuple_OnionMessageContentsResponseInstructionZZ containing a crate::c_types::derived::C2Tuple_OnionMessageContentsResponseInstructionZ
	 */
	public static constructor_some(o: TwoTuple_OnionMessageContentsResponseInstructionZ): Option_C2Tuple_OnionMessageContentsResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_OnionMessageContentsResponseInstructionZZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_C2Tuple_OnionMessageContentsResponseInstructionZZ = Option_C2Tuple_OnionMessageContentsResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_OnionMessageContentsResponseInstructionZZ containing nothing
	 */
	public static constructor_none(): Option_C2Tuple_OnionMessageContentsResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_OnionMessageContentsResponseInstructionZZ_none();
		const ret_hu_conv: Option_C2Tuple_OnionMessageContentsResponseInstructionZZ = Option_C2Tuple_OnionMessageContentsResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_C2Tuple_OnionMessageContentsResponseInstructionZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_OnionMessageContentsResponseInstructionZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_C2Tuple_OnionMessageContentsResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_OnionMessageContentsResponseInstructionZZ_clone(this.ptr);
		const ret_hu_conv: Option_C2Tuple_OnionMessageContentsResponseInstructionZZ = Option_C2Tuple_OnionMessageContentsResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_C2Tuple_OnionMessageContentsResponseInstructionZZ of type Some */
export class Option_C2Tuple_OnionMessageContentsResponseInstructionZZ_Some extends Option_C2Tuple_OnionMessageContentsResponseInstructionZZ {
	public some: TwoTuple_OnionMessageContentsResponseInstructionZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_C2Tuple_OnionMessageContentsResponseInstructionZZ_Some_get_some(ptr);
		const some_hu_conv: TwoTuple_OnionMessageContentsResponseInstructionZ = new TwoTuple_OnionMessageContentsResponseInstructionZ(null, some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_C2Tuple_OnionMessageContentsResponseInstructionZZ of type None */
export class Option_C2Tuple_OnionMessageContentsResponseInstructionZZ_None extends Option_C2Tuple_OnionMessageContentsResponseInstructionZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
