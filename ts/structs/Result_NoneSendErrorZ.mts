
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NoneSendErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NoneSendErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NoneSendErrorZ {
		if (bindings.CResult_NoneSendErrorZ_is_ok(ptr)) {
			return new Result_NoneSendErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneSendErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NoneSendErrorZ in the success state.
	 */
	public static constructor_ok(): Result_NoneSendErrorZ {
		const ret: bigint = bindings.CResult_NoneSendErrorZ_ok();
		const ret_hu_conv: Result_NoneSendErrorZ = Result_NoneSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneSendErrorZ in the error state.
	 */
	public static constructor_err(e: SendError): Result_NoneSendErrorZ {
		const ret: bigint = bindings.CResult_NoneSendErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_NoneSendErrorZ = Result_NoneSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NoneSendErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_NoneSendErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneSendErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_NoneSendErrorZ {
		const ret: bigint = bindings.CResult_NoneSendErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_NoneSendErrorZ = Result_NoneSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_NoneSendErrorZ_OK extends Result_NoneSendErrorZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NoneSendErrorZ_Err extends Result_NoneSendErrorZ {
	public err: SendError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_NoneSendErrorZ_get_err(ptr);
		const err_hu_conv: SendError = SendError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}