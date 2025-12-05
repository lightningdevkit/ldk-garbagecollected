
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NoneAPIErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NoneAPIErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NoneAPIErrorZ {
		if (bindings.CResult_NoneAPIErrorZ_is_ok(ptr)) {
			return new Result_NoneAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneAPIErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NoneAPIErrorZ in the success state.
	 */
	public static constructor_ok(): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.CResult_NoneAPIErrorZ_ok();
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneAPIErrorZ in the error state.
	 */
	public static constructor_err(e: APIError): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.CResult_NoneAPIErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NoneAPIErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_NoneAPIErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_NoneAPIErrorZ {
		const ret: bigint = bindings.CResult_NoneAPIErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_NoneAPIErrorZ = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_NoneAPIErrorZ_OK extends Result_NoneAPIErrorZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NoneAPIErrorZ_Err extends Result_NoneAPIErrorZ {
	public err: APIError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_NoneAPIErrorZ_get_err(ptr);
		const err_hu_conv: APIError = APIError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}