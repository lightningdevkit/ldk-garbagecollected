
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NoneBolt11PaymentErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NoneBolt11PaymentErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NoneBolt11PaymentErrorZ {
		if (bindings.CResult_NoneBolt11PaymentErrorZ_is_ok(ptr)) {
			return new Result_NoneBolt11PaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneBolt11PaymentErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NoneBolt11PaymentErrorZ in the success state.
	 */
	public static constructor_ok(): Result_NoneBolt11PaymentErrorZ {
		const ret: bigint = bindings.CResult_NoneBolt11PaymentErrorZ_ok();
		const ret_hu_conv: Result_NoneBolt11PaymentErrorZ = Result_NoneBolt11PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneBolt11PaymentErrorZ in the error state.
	 */
	public static constructor_err(e: Bolt11PaymentError): Result_NoneBolt11PaymentErrorZ {
		const ret: bigint = bindings.CResult_NoneBolt11PaymentErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_NoneBolt11PaymentErrorZ = Result_NoneBolt11PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NoneBolt11PaymentErrorZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_NoneBolt11PaymentErrorZ_OK extends Result_NoneBolt11PaymentErrorZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NoneBolt11PaymentErrorZ_Err extends Result_NoneBolt11PaymentErrorZ {
	public err: Bolt11PaymentError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_NoneBolt11PaymentErrorZ_get_err(ptr);
		const err_hu_conv: Bolt11PaymentError = Bolt11PaymentError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}