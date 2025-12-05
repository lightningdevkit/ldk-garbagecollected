
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ {
		if (bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_is_ok(ptr)) {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ in the success state.
	 */
	public static constructor_ok(o: TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[]): Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ {
		const ret: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_ok(bindings.encodeUint64Array(o.map(o_conv_40 => CommonBase.get_ptr_of(o_conv_40))));
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ in the error state.
	 */
	public static constructor_err(e: ProbeSendFailure): Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ {
		const ret: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ {
		const ret: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_clone(this.ptr);
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_OK extends Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ {
	public res: TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[];

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_get_ok(ptr);
		const res_conv_40_len: number = bindings.getArrayLength(res);
		const res_conv_40_arr: TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[] = new Array(res_conv_40_len).fill(null);
		for (var o = 0; o < res_conv_40_len; o++) {
			const res_conv_40: bigint = bindings.getU64ArrayElem(res, o);
			const res_conv_40_hu_conv: TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(null, res_conv_40);
			CommonBase.add_ref_from(res_conv_40_hu_conv, this);
			res_conv_40_arr[o] = res_conv_40_hu_conv;
		}
		bindings.freeWasmMemory(res)
		this.res = res_conv_40_arr;
	}
}
export class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_Err extends Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ {
	public err: ProbeSendFailure;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ_get_err(ptr);
		const err_hu_conv: ProbeSendFailure = ProbeSendFailure.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}