
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::events::PaidBolt12Invoice or not
 */
export class Option_PaidBolt12InvoiceZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_PaidBolt12InvoiceZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_PaidBolt12InvoiceZ {
		const raw_ty: number = bindings.LDKCOption_PaidBolt12InvoiceZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PaidBolt12InvoiceZ_Some(ptr);
			case 1: return new Option_PaidBolt12InvoiceZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_PaidBolt12InvoiceZ containing a crate::lightning::events::PaidBolt12Invoice
	 */
	public static constructor_some(o: PaidBolt12Invoice): Option_PaidBolt12InvoiceZ {
		const ret: bigint = bindings.COption_PaidBolt12InvoiceZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_PaidBolt12InvoiceZ = Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaidBolt12InvoiceZ containing nothing
	 */
	public static constructor_none(): Option_PaidBolt12InvoiceZ {
		const ret: bigint = bindings.COption_PaidBolt12InvoiceZ_none();
		const ret_hu_conv: Option_PaidBolt12InvoiceZ = Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_PaidBolt12InvoiceZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_PaidBolt12InvoiceZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_PaidBolt12InvoiceZ {
		const ret: bigint = bindings.COption_PaidBolt12InvoiceZ_clone(this.ptr);
		const ret_hu_conv: Option_PaidBolt12InvoiceZ = Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_PaidBolt12InvoiceZ of type Some */
export class Option_PaidBolt12InvoiceZ_Some extends Option_PaidBolt12InvoiceZ {
	public some: PaidBolt12Invoice;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_PaidBolt12InvoiceZ_Some_get_some(ptr);
		const some_hu_conv: PaidBolt12Invoice = PaidBolt12Invoice.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_PaidBolt12InvoiceZ of type None */
export class Option_PaidBolt12InvoiceZ_None extends Option_PaidBolt12InvoiceZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
