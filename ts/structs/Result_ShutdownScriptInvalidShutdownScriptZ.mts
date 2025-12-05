
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_ShutdownScriptInvalidShutdownScriptZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_ShutdownScriptInvalidShutdownScriptZ {
		if (bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_is_ok(ptr)) {
			return new Result_ShutdownScriptInvalidShutdownScriptZ_OK(null, ptr);
		} else {
			return new Result_ShutdownScriptInvalidShutdownScriptZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_ShutdownScriptInvalidShutdownScriptZ in the success state.
	 */
	public static constructor_ok(o: ShutdownScript): Result_ShutdownScriptInvalidShutdownScriptZ {
		const ret: bigint = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_ShutdownScriptInvalidShutdownScriptZ = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ShutdownScriptInvalidShutdownScriptZ in the error state.
	 */
	public static constructor_err(e: InvalidShutdownScript): Result_ShutdownScriptInvalidShutdownScriptZ {
		const ret: bigint = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_ShutdownScriptInvalidShutdownScriptZ = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_ShutdownScriptInvalidShutdownScriptZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_ShutdownScriptInvalidShutdownScriptZ {
		const ret: bigint = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_clone(this.ptr);
		const ret_hu_conv: Result_ShutdownScriptInvalidShutdownScriptZ = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_ShutdownScriptInvalidShutdownScriptZ_OK extends Result_ShutdownScriptInvalidShutdownScriptZ {
	public res: ShutdownScript;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_get_ok(ptr);
		const res_hu_conv: ShutdownScript = new ShutdownScript(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_ShutdownScriptInvalidShutdownScriptZ_Err extends Result_ShutdownScriptInvalidShutdownScriptZ {
	public err: InvalidShutdownScript;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_get_err(ptr);
		const err_hu_conv: InvalidShutdownScript = new InvalidShutdownScript(null, err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}