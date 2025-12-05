
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_OutPointDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_OutPointDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_OutPointDecodeErrorZ {
		if (bindings.CResult_OutPointDecodeErrorZ_is_ok(ptr)) {
			return new Result_OutPointDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_OutPointDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_OutPointDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o: OutPoint): Result_OutPointDecodeErrorZ {
		const ret: bigint = bindings.CResult_OutPointDecodeErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_OutPointDecodeErrorZ = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OutPointDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_OutPointDecodeErrorZ {
		const ret: bigint = bindings.CResult_OutPointDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_OutPointDecodeErrorZ = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_OutPointDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_OutPointDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_OutPointDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_OutPointDecodeErrorZ {
		const ret: bigint = bindings.CResult_OutPointDecodeErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_OutPointDecodeErrorZ = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_OutPointDecodeErrorZ_OK extends Result_OutPointDecodeErrorZ {
	public res: OutPoint;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_OutPointDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: OutPoint = new OutPoint(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_OutPointDecodeErrorZ_Err extends Result_OutPointDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_OutPointDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}