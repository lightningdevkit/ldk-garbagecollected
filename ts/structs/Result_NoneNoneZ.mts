
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NoneNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NoneNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NoneNoneZ {
		if (bindings.CResult_NoneNoneZ_is_ok(ptr)) {
			return new Result_NoneNoneZ_OK(null, ptr);
		} else {
			return new Result_NoneNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NoneNoneZ in the success state.
	 */
	public static constructor_ok(): Result_NoneNoneZ {
		const ret: bigint = bindings.CResult_NoneNoneZ_ok();
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneNoneZ in the error state.
	 */
	public static constructor_err(): Result_NoneNoneZ {
		const ret: bigint = bindings.CResult_NoneNoneZ_err();
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NoneNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_NoneNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_NoneNoneZ {
		const ret: bigint = bindings.CResult_NoneNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_NoneNoneZ_OK extends Result_NoneNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NoneNoneZ_Err extends Result_NoneNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}