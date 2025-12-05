
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NoneBolt11SemanticErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NoneBolt11SemanticErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NoneBolt11SemanticErrorZ {
		if (bindings.CResult_NoneBolt11SemanticErrorZ_is_ok(ptr)) {
			return new Result_NoneBolt11SemanticErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneBolt11SemanticErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NoneBolt11SemanticErrorZ in the success state.
	 */
	public static constructor_ok(): Result_NoneBolt11SemanticErrorZ {
		const ret: bigint = bindings.CResult_NoneBolt11SemanticErrorZ_ok();
		const ret_hu_conv: Result_NoneBolt11SemanticErrorZ = Result_NoneBolt11SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneBolt11SemanticErrorZ in the error state.
	 */
	public static constructor_err(e: Bolt11SemanticError): Result_NoneBolt11SemanticErrorZ {
		const ret: bigint = bindings.CResult_NoneBolt11SemanticErrorZ_err(e);
		const ret_hu_conv: Result_NoneBolt11SemanticErrorZ = Result_NoneBolt11SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NoneBolt11SemanticErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_NoneBolt11SemanticErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneBolt11SemanticErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_NoneBolt11SemanticErrorZ {
		const ret: bigint = bindings.CResult_NoneBolt11SemanticErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_NoneBolt11SemanticErrorZ = Result_NoneBolt11SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_NoneBolt11SemanticErrorZ_OK extends Result_NoneBolt11SemanticErrorZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NoneBolt11SemanticErrorZ_Err extends Result_NoneBolt11SemanticErrorZ {
	public err: Bolt11SemanticError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_NoneBolt11SemanticErrorZ_get_err(ptr);
	}
}