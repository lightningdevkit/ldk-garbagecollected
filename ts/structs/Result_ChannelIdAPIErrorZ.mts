
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_ChannelIdAPIErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_ChannelIdAPIErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_ChannelIdAPIErrorZ {
		if (bindings.CResult_ChannelIdAPIErrorZ_is_ok(ptr)) {
			return new Result_ChannelIdAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelIdAPIErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_ChannelIdAPIErrorZ in the success state.
	 */
	public static constructor_ok(o: ChannelId): Result_ChannelIdAPIErrorZ {
		const ret: bigint = bindings.CResult_ChannelIdAPIErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_ChannelIdAPIErrorZ = Result_ChannelIdAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelIdAPIErrorZ in the error state.
	 */
	public static constructor_err(e: APIError): Result_ChannelIdAPIErrorZ {
		const ret: bigint = bindings.CResult_ChannelIdAPIErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_ChannelIdAPIErrorZ = Result_ChannelIdAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_ChannelIdAPIErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_ChannelIdAPIErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelIdAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_ChannelIdAPIErrorZ {
		const ret: bigint = bindings.CResult_ChannelIdAPIErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_ChannelIdAPIErrorZ = Result_ChannelIdAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_ChannelIdAPIErrorZ_OK extends Result_ChannelIdAPIErrorZ {
	public res: ChannelId;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_ChannelIdAPIErrorZ_get_ok(ptr);
		const res_hu_conv: ChannelId = new ChannelId(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_ChannelIdAPIErrorZ_Err extends Result_ChannelIdAPIErrorZ {
	public err: APIError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_ChannelIdAPIErrorZ_get_err(ptr);
		const err_hu_conv: APIError = APIError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}