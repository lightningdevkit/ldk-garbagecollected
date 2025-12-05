
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_u32GraphSyncErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_u32GraphSyncErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_u32GraphSyncErrorZ {
		if (bindings.CResult_u32GraphSyncErrorZ_is_ok(ptr)) {
			return new Result_u32GraphSyncErrorZ_OK(null, ptr);
		} else {
			return new Result_u32GraphSyncErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_u32GraphSyncErrorZ in the success state.
	 */
	public static constructor_ok(o: number): Result_u32GraphSyncErrorZ {
		const ret: bigint = bindings.CResult_u32GraphSyncErrorZ_ok(o);
		const ret_hu_conv: Result_u32GraphSyncErrorZ = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_u32GraphSyncErrorZ in the error state.
	 */
	public static constructor_err(e: GraphSyncError): Result_u32GraphSyncErrorZ {
		const ret: bigint = bindings.CResult_u32GraphSyncErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_u32GraphSyncErrorZ = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_u32GraphSyncErrorZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_u32GraphSyncErrorZ_OK extends Result_u32GraphSyncErrorZ {
	public res: number;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.res = bindings.CResult_u32GraphSyncErrorZ_get_ok(ptr);
	}
}
export class Result_u32GraphSyncErrorZ_Err extends Result_u32GraphSyncErrorZ {
	public err: GraphSyncError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_u32GraphSyncErrorZ_get_err(ptr);
		const err_hu_conv: GraphSyncError = GraphSyncError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}