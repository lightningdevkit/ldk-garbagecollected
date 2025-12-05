
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_PendingHTLCInfoDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_PendingHTLCInfoDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_PendingHTLCInfoDecodeErrorZ {
		if (bindings.CResult_PendingHTLCInfoDecodeErrorZ_is_ok(ptr)) {
			return new Result_PendingHTLCInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PendingHTLCInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_PendingHTLCInfoDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o: PendingHTLCInfo): Result_PendingHTLCInfoDecodeErrorZ {
		const ret: bigint = bindings.CResult_PendingHTLCInfoDecodeErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_PendingHTLCInfoDecodeErrorZ = Result_PendingHTLCInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_PendingHTLCInfoDecodeErrorZ {
		const ret: bigint = bindings.CResult_PendingHTLCInfoDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_PendingHTLCInfoDecodeErrorZ = Result_PendingHTLCInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_PendingHTLCInfoDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_PendingHTLCInfoDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_PendingHTLCInfoDecodeErrorZ {
		const ret: bigint = bindings.CResult_PendingHTLCInfoDecodeErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_PendingHTLCInfoDecodeErrorZ = Result_PendingHTLCInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_PendingHTLCInfoDecodeErrorZ_OK extends Result_PendingHTLCInfoDecodeErrorZ {
	public res: PendingHTLCInfo;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_PendingHTLCInfoDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: PendingHTLCInfo = new PendingHTLCInfo(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_PendingHTLCInfoDecodeErrorZ_Err extends Result_PendingHTLCInfoDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_PendingHTLCInfoDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}