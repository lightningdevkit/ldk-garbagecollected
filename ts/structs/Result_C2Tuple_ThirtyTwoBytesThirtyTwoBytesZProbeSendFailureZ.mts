
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ {
		if (bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_is_ok(ptr)) {
			return new Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ in the success state.
	 */
	public static constructor_ok(o: TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ): Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ {
		const ret: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ in the error state.
	 */
	public static constructor_err(e: ProbeSendFailure): Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ {
		const ret: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ {
		const ret: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_clone(this.ptr);
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_OK extends Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ {
	public res: TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_get_ok(ptr);
		const res_hu_conv: TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_Err extends Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ {
	public err: ProbeSendFailure;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZProbeSendFailureZ_get_err(ptr);
		const err_hu_conv: ProbeSendFailure = ProbeSendFailure.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}