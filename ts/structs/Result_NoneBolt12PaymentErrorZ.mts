
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NoneBolt12PaymentErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NoneBolt12PaymentErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NoneBolt12PaymentErrorZ {
		if (bindings.CResult_NoneBolt12PaymentErrorZ_is_ok(ptr)) {
			return new Result_NoneBolt12PaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneBolt12PaymentErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NoneBolt12PaymentErrorZ in the success state.
	 */
	public static constructor_ok(): Result_NoneBolt12PaymentErrorZ {
		const ret: bigint = bindings.CResult_NoneBolt12PaymentErrorZ_ok();
		const ret_hu_conv: Result_NoneBolt12PaymentErrorZ = Result_NoneBolt12PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneBolt12PaymentErrorZ in the error state.
	 */
	public static constructor_err(e: Bolt12PaymentError): Result_NoneBolt12PaymentErrorZ {
		const ret: bigint = bindings.CResult_NoneBolt12PaymentErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_NoneBolt12PaymentErrorZ = Result_NoneBolt12PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NoneBolt12PaymentErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_NoneBolt12PaymentErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneBolt12PaymentErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_NoneBolt12PaymentErrorZ {
		const ret: bigint = bindings.CResult_NoneBolt12PaymentErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_NoneBolt12PaymentErrorZ = Result_NoneBolt12PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_NoneBolt12PaymentErrorZ_OK extends Result_NoneBolt12PaymentErrorZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NoneBolt12PaymentErrorZ_Err extends Result_NoneBolt12PaymentErrorZ {
	public err: Bolt12PaymentError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_NoneBolt12PaymentErrorZ_get_err(ptr);
		const err_hu_conv: Bolt12PaymentError = Bolt12PaymentError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}