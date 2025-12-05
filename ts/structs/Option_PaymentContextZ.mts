
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::blinded_path::payment::PaymentContext or not
 */
export class Option_PaymentContextZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_PaymentContextZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_PaymentContextZ {
		const raw_ty: number = bindings.LDKCOption_PaymentContextZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PaymentContextZ_Some(ptr);
			case 1: return new Option_PaymentContextZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_PaymentContextZ containing a crate::lightning::blinded_path::payment::PaymentContext
	 */
	public static constructor_some(o: PaymentContext): Option_PaymentContextZ {
		const ret: bigint = bindings.COption_PaymentContextZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_PaymentContextZ = Option_PaymentContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaymentContextZ containing nothing
	 */
	public static constructor_none(): Option_PaymentContextZ {
		const ret: bigint = bindings.COption_PaymentContextZ_none();
		const ret_hu_conv: Option_PaymentContextZ = Option_PaymentContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_PaymentContextZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_PaymentContextZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_PaymentContextZ {
		const ret: bigint = bindings.COption_PaymentContextZ_clone(this.ptr);
		const ret_hu_conv: Option_PaymentContextZ = Option_PaymentContextZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_PaymentContextZ of type Some */
export class Option_PaymentContextZ_Some extends Option_PaymentContextZ {
	public some: PaymentContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_PaymentContextZ_Some_get_some(ptr);
		const some_hu_conv: PaymentContext = PaymentContext.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_PaymentContextZ of type None */
export class Option_PaymentContextZ_None extends Option_PaymentContextZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
