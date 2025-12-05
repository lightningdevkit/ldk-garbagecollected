
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_ServeStaticInvoiceResponseInstructionZ or not
 */
export class Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
		const raw_ty: number = bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_Some(ptr);
			case 1: return new Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ containing a crate::c_types::derived::C2Tuple_ServeStaticInvoiceResponseInstructionZ
	 */
	public static constructor_some(o: TwoTuple_ServeStaticInvoiceResponseInstructionZ): Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ = Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ containing nothing
	 */
	public static constructor_none(): Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_none();
		const ret_hu_conv: Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ = Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
		const ret: bigint = bindings.COption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_clone(this.ptr);
		const ret_hu_conv: Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ = Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ of type Some */
export class Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_Some extends Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
	public some: TwoTuple_ServeStaticInvoiceResponseInstructionZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_Some_get_some(ptr);
		const some_hu_conv: TwoTuple_ServeStaticInvoiceResponseInstructionZ = new TwoTuple_ServeStaticInvoiceResponseInstructionZ(null, some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ of type None */
export class Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ_None extends Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
