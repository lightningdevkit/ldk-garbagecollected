
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple__u1632_u1632Z or not
 */
export class Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ {
		const raw_ty: number = bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_Some(ptr);
			case 1: return new Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ containing a crate::c_types::derived::C2Tuple__u1632_u1632Z
	 */
	public static constructor_some(o: TwoTuple__u1632_u1632Z): Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ {
		const ret: bigint = bindings.COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ = Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, o);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ containing nothing
	 */
	public static constructor_none(): Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ {
		const ret: bigint = bindings.COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_none();
		const ret_hu_conv: Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ = Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ of type Some */
export class Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_Some extends Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ {
	public some: TwoTuple__u1632_u1632Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_Some_get_some(ptr);
		const some_hu_conv: TwoTuple__u1632_u1632Z = new TwoTuple__u1632_u1632Z(null, some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ of type None */
export class Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_None extends Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
