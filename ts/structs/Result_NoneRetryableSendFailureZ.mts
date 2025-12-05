
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NoneRetryableSendFailureZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NoneRetryableSendFailureZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NoneRetryableSendFailureZ {
		if (bindings.CResult_NoneRetryableSendFailureZ_is_ok(ptr)) {
			return new Result_NoneRetryableSendFailureZ_OK(null, ptr);
		} else {
			return new Result_NoneRetryableSendFailureZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NoneRetryableSendFailureZ in the success state.
	 */
	public static constructor_ok(): Result_NoneRetryableSendFailureZ {
		const ret: bigint = bindings.CResult_NoneRetryableSendFailureZ_ok();
		const ret_hu_conv: Result_NoneRetryableSendFailureZ = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneRetryableSendFailureZ in the error state.
	 */
	public static constructor_err(e: RetryableSendFailure): Result_NoneRetryableSendFailureZ {
		const ret: bigint = bindings.CResult_NoneRetryableSendFailureZ_err(e);
		const ret_hu_conv: Result_NoneRetryableSendFailureZ = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NoneRetryableSendFailureZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_NoneRetryableSendFailureZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneRetryableSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_NoneRetryableSendFailureZ {
		const ret: bigint = bindings.CResult_NoneRetryableSendFailureZ_clone(this.ptr);
		const ret_hu_conv: Result_NoneRetryableSendFailureZ = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_NoneRetryableSendFailureZ_OK extends Result_NoneRetryableSendFailureZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NoneRetryableSendFailureZ_Err extends Result_NoneRetryableSendFailureZ {
	public err: RetryableSendFailure;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_NoneRetryableSendFailureZ_get_err(ptr);
	}
}