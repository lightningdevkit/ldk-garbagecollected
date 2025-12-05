
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_ServeStaticInvoiceMessageContextZ or not
 */
export class Option_C2Tuple_ServeStaticInvoiceMessageContextZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_C2Tuple_ServeStaticInvoiceMessageContextZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_C2Tuple_ServeStaticInvoiceMessageContextZZ {
		const raw_ty: number = bindings.LDKCOption_C2Tuple_ServeStaticInvoiceMessageContextZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_ServeStaticInvoiceMessageContextZZ_Some(ptr);
			case 1: return new Option_C2Tuple_ServeStaticInvoiceMessageContextZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_C2Tuple_ServeStaticInvoiceMessageContextZZ containing a crate::c_types::derived::C2Tuple_ServeStaticInvoiceMessageContextZ
	 */
	public static constructor_some(o: TwoTuple_ServeStaticInvoiceMessageContextZ): Option_C2Tuple_ServeStaticInvoiceMessageContextZZ {
		const ret: bigint = bindings.COption_C2Tuple_ServeStaticInvoiceMessageContextZZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_C2Tuple_ServeStaticInvoiceMessageContextZZ = Option_C2Tuple_ServeStaticInvoiceMessageContextZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_ServeStaticInvoiceMessageContextZZ containing nothing
	 */
	public static constructor_none(): Option_C2Tuple_ServeStaticInvoiceMessageContextZZ {
		const ret: bigint = bindings.COption_C2Tuple_ServeStaticInvoiceMessageContextZZ_none();
		const ret_hu_conv: Option_C2Tuple_ServeStaticInvoiceMessageContextZZ = Option_C2Tuple_ServeStaticInvoiceMessageContextZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_C2Tuple_ServeStaticInvoiceMessageContextZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_ServeStaticInvoiceMessageContextZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_C2Tuple_ServeStaticInvoiceMessageContextZZ {
		const ret: bigint = bindings.COption_C2Tuple_ServeStaticInvoiceMessageContextZZ_clone(this.ptr);
		const ret_hu_conv: Option_C2Tuple_ServeStaticInvoiceMessageContextZZ = Option_C2Tuple_ServeStaticInvoiceMessageContextZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_C2Tuple_ServeStaticInvoiceMessageContextZZ of type Some */
export class Option_C2Tuple_ServeStaticInvoiceMessageContextZZ_Some extends Option_C2Tuple_ServeStaticInvoiceMessageContextZZ {
	public some: TwoTuple_ServeStaticInvoiceMessageContextZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_C2Tuple_ServeStaticInvoiceMessageContextZZ_Some_get_some(ptr);
		const some_hu_conv: TwoTuple_ServeStaticInvoiceMessageContextZ = new TwoTuple_ServeStaticInvoiceMessageContextZ(null, some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_C2Tuple_ServeStaticInvoiceMessageContextZZ of type None */
export class Option_C2Tuple_ServeStaticInvoiceMessageContextZZ_None extends Option_C2Tuple_ServeStaticInvoiceMessageContextZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
