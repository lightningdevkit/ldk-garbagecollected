
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NoneIOErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NoneIOErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NoneIOErrorZ {
		if (bindings.CResult_NoneIOErrorZ_is_ok(ptr)) {
			return new Result_NoneIOErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneIOErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NoneIOErrorZ in the success state.
	 */
	public static constructor_ok(): Result_NoneIOErrorZ {
		const ret: bigint = bindings.CResult_NoneIOErrorZ_ok();
		const ret_hu_conv: Result_NoneIOErrorZ = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneIOErrorZ in the error state.
	 */
	public static constructor_err(e: IOError): Result_NoneIOErrorZ {
		const ret: bigint = bindings.CResult_NoneIOErrorZ_err(e);
		const ret_hu_conv: Result_NoneIOErrorZ = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NoneIOErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_NoneIOErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_NoneIOErrorZ {
		const ret: bigint = bindings.CResult_NoneIOErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_NoneIOErrorZ = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_NoneIOErrorZ_OK extends Result_NoneIOErrorZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NoneIOErrorZ_Err extends Result_NoneIOErrorZ {
	public err: IOError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_NoneIOErrorZ_get_err(ptr);
	}
}