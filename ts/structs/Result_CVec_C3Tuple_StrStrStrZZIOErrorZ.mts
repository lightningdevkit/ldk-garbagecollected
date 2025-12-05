
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CVec_C3Tuple_StrStrStrZZIOErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CVec_C3Tuple_StrStrStrZZIOErrorZ {
		if (bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_is_ok(ptr)) {
			return new Result_CVec_C3Tuple_StrStrStrZZIOErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_C3Tuple_StrStrStrZZIOErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ in the success state.
	 */
	public static constructor_ok(o: ThreeTuple_StrStrStrZ[]): Result_CVec_C3Tuple_StrStrStrZZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_ok(bindings.encodeUint64Array(o.map(o_conv_23 => CommonBase.get_ptr_of(o_conv_23))));
		const ret_hu_conv: Result_CVec_C3Tuple_StrStrStrZZIOErrorZ = Result_CVec_C3Tuple_StrStrStrZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ in the error state.
	 */
	public static constructor_err(e: IOError): Result_CVec_C3Tuple_StrStrStrZZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_err(e);
		const ret_hu_conv: Result_CVec_C3Tuple_StrStrStrZZIOErrorZ = Result_CVec_C3Tuple_StrStrStrZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CVec_C3Tuple_StrStrStrZZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_CVec_C3Tuple_StrStrStrZZIOErrorZ = Result_CVec_C3Tuple_StrStrStrZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CVec_C3Tuple_StrStrStrZZIOErrorZ_OK extends Result_CVec_C3Tuple_StrStrStrZZIOErrorZ {
	public res: ThreeTuple_StrStrStrZ[];

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_get_ok(ptr);
		const res_conv_23_len: number = bindings.getArrayLength(res);
		const res_conv_23_arr: ThreeTuple_StrStrStrZ[] = new Array(res_conv_23_len).fill(null);
		for (var x = 0; x < res_conv_23_len; x++) {
			const res_conv_23: bigint = bindings.getU64ArrayElem(res, x);
			const res_conv_23_hu_conv: ThreeTuple_StrStrStrZ = new ThreeTuple_StrStrStrZ(null, res_conv_23);
			CommonBase.add_ref_from(res_conv_23_hu_conv, this);
			res_conv_23_arr[x] = res_conv_23_hu_conv;
		}
		bindings.freeWasmMemory(res)
		this.res = res_conv_23_arr;
	}
}
export class Result_CVec_C3Tuple_StrStrStrZZIOErrorZ_Err extends Result_CVec_C3Tuple_StrStrStrZZIOErrorZ {
	public err: IOError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_CVec_C3Tuple_StrStrStrZZIOErrorZ_get_err(ptr);
	}
}