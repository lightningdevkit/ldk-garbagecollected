
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NonePeerHandleErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NonePeerHandleErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NonePeerHandleErrorZ {
		if (bindings.CResult_NonePeerHandleErrorZ_is_ok(ptr)) {
			return new Result_NonePeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_NonePeerHandleErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NonePeerHandleErrorZ in the success state.
	 */
	public static constructor_ok(): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.CResult_NonePeerHandleErrorZ_ok();
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NonePeerHandleErrorZ in the error state.
	 */
	public static constructor_err(e: PeerHandleError): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.CResult_NonePeerHandleErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NonePeerHandleErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_NonePeerHandleErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NonePeerHandleErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.CResult_NonePeerHandleErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_NonePeerHandleErrorZ_OK extends Result_NonePeerHandleErrorZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}
export class Result_NonePeerHandleErrorZ_Err extends Result_NonePeerHandleErrorZ {
	public err: PeerHandleError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_NonePeerHandleErrorZ_get_err(ptr);
		const err_hu_conv: PeerHandleError = new PeerHandleError(null, err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}