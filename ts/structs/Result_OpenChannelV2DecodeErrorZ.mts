
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_OpenChannelV2DecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_OpenChannelV2DecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_OpenChannelV2DecodeErrorZ {
		if (bindings.CResult_OpenChannelV2DecodeErrorZ_is_ok(ptr)) {
			return new Result_OpenChannelV2DecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_OpenChannelV2DecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_OpenChannelV2DecodeErrorZ in the success state.
	 */
	public static constructor_ok(o: OpenChannelV2): Result_OpenChannelV2DecodeErrorZ {
		const ret: bigint = bindings.CResult_OpenChannelV2DecodeErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_OpenChannelV2DecodeErrorZ = Result_OpenChannelV2DecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OpenChannelV2DecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_OpenChannelV2DecodeErrorZ {
		const ret: bigint = bindings.CResult_OpenChannelV2DecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_OpenChannelV2DecodeErrorZ = Result_OpenChannelV2DecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_OpenChannelV2DecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_OpenChannelV2DecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_OpenChannelV2DecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_OpenChannelV2DecodeErrorZ {
		const ret: bigint = bindings.CResult_OpenChannelV2DecodeErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_OpenChannelV2DecodeErrorZ = Result_OpenChannelV2DecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_OpenChannelV2DecodeErrorZ_OK extends Result_OpenChannelV2DecodeErrorZ {
	public res: OpenChannelV2;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_OpenChannelV2DecodeErrorZ_get_ok(ptr);
		const res_hu_conv: OpenChannelV2 = new OpenChannelV2(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_OpenChannelV2DecodeErrorZ_Err extends Result_OpenChannelV2DecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_OpenChannelV2DecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}