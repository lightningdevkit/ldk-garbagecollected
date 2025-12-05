
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CVec_StrZIOErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CVec_StrZIOErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CVec_StrZIOErrorZ {
		if (bindings.CResult_CVec_StrZIOErrorZ_is_ok(ptr)) {
			return new Result_CVec_StrZIOErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_StrZIOErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CVec_StrZIOErrorZ in the success state.
	 */
	public static constructor_ok(o: string[]): Result_CVec_StrZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_StrZIOErrorZ_ok(bindings.encodeUint32Array(o.map(o_conv_8 => bindings.encodeString(o_conv_8))));
		const ret_hu_conv: Result_CVec_StrZIOErrorZ = Result_CVec_StrZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_StrZIOErrorZ in the error state.
	 */
	public static constructor_err(e: IOError): Result_CVec_StrZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_StrZIOErrorZ_err(e);
		const ret_hu_conv: Result_CVec_StrZIOErrorZ = Result_CVec_StrZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CVec_StrZIOErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CVec_StrZIOErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_StrZIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CVec_StrZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_StrZIOErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_CVec_StrZIOErrorZ = Result_CVec_StrZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CVec_StrZIOErrorZ_OK extends Result_CVec_StrZIOErrorZ {
	public res: string[];

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_CVec_StrZIOErrorZ_get_ok(ptr);
		const res_conv_8_len: number = bindings.getArrayLength(res);
		const res_conv_8_arr: string[] = new Array(res_conv_8_len).fill(null);
		for (var i = 0; i < res_conv_8_len; i++) {
			const res_conv_8: number = bindings.getU32ArrayElem(res, i);
			const res_conv_8_conv: string = bindings.decodeString(res_conv_8);
			res_conv_8_arr[i] = res_conv_8_conv;
		}
		bindings.freeWasmMemory(res)
		this.res = res_conv_8_arr;
	}
}
export class Result_CVec_StrZIOErrorZ_Err extends Result_CVec_StrZIOErrorZ {
	public err: IOError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_CVec_StrZIOErrorZ_get_err(ptr);
	}
}