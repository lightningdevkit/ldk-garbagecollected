
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_DNSResolverMessageResponseInstructionZ or not
 */
export class Option_C2Tuple_DNSResolverMessageResponseInstructionZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_C2Tuple_DNSResolverMessageResponseInstructionZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_C2Tuple_DNSResolverMessageResponseInstructionZZ {
		const raw_ty: number = bindings.LDKCOption_C2Tuple_DNSResolverMessageResponseInstructionZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_DNSResolverMessageResponseInstructionZZ_Some(ptr);
			case 1: return new Option_C2Tuple_DNSResolverMessageResponseInstructionZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_C2Tuple_DNSResolverMessageResponseInstructionZZ containing a crate::c_types::derived::C2Tuple_DNSResolverMessageResponseInstructionZ
	 */
	public static constructor_some(o: TwoTuple_DNSResolverMessageResponseInstructionZ): Option_C2Tuple_DNSResolverMessageResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_DNSResolverMessageResponseInstructionZZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_C2Tuple_DNSResolverMessageResponseInstructionZZ = Option_C2Tuple_DNSResolverMessageResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_DNSResolverMessageResponseInstructionZZ containing nothing
	 */
	public static constructor_none(): Option_C2Tuple_DNSResolverMessageResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_DNSResolverMessageResponseInstructionZZ_none();
		const ret_hu_conv: Option_C2Tuple_DNSResolverMessageResponseInstructionZZ = Option_C2Tuple_DNSResolverMessageResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_C2Tuple_DNSResolverMessageResponseInstructionZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_DNSResolverMessageResponseInstructionZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_C2Tuple_DNSResolverMessageResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_DNSResolverMessageResponseInstructionZZ_clone(this.ptr);
		const ret_hu_conv: Option_C2Tuple_DNSResolverMessageResponseInstructionZZ = Option_C2Tuple_DNSResolverMessageResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_C2Tuple_DNSResolverMessageResponseInstructionZZ of type Some */
export class Option_C2Tuple_DNSResolverMessageResponseInstructionZZ_Some extends Option_C2Tuple_DNSResolverMessageResponseInstructionZZ {
	public some: TwoTuple_DNSResolverMessageResponseInstructionZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_C2Tuple_DNSResolverMessageResponseInstructionZZ_Some_get_some(ptr);
		const some_hu_conv: TwoTuple_DNSResolverMessageResponseInstructionZ = new TwoTuple_DNSResolverMessageResponseInstructionZ(null, some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_C2Tuple_DNSResolverMessageResponseInstructionZZ of type None */
export class Option_C2Tuple_DNSResolverMessageResponseInstructionZZ_None extends Option_C2Tuple_DNSResolverMessageResponseInstructionZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
