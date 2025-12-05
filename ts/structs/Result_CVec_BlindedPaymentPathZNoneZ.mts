
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CVec_BlindedPaymentPathZNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CVec_BlindedPaymentPathZNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CVec_BlindedPaymentPathZNoneZ {
		if (bindings.CResult_CVec_BlindedPaymentPathZNoneZ_is_ok(ptr)) {
			return new Result_CVec_BlindedPaymentPathZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_BlindedPaymentPathZNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CVec_BlindedPaymentPathZNoneZ in the success state.
	 */
	public static constructor_ok(o: BlindedPaymentPath[]): Result_CVec_BlindedPaymentPathZNoneZ {
		const ret: bigint = bindings.CResult_CVec_BlindedPaymentPathZNoneZ_ok(bindings.encodeUint64Array(o.map(o_conv_20 => CommonBase.get_ptr_of(o_conv_20))));
		const ret_hu_conv: Result_CVec_BlindedPaymentPathZNoneZ = Result_CVec_BlindedPaymentPathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_BlindedPaymentPathZNoneZ in the error state.
	 */
	public static constructor_err(): Result_CVec_BlindedPaymentPathZNoneZ {
		const ret: bigint = bindings.CResult_CVec_BlindedPaymentPathZNoneZ_err();
		const ret_hu_conv: Result_CVec_BlindedPaymentPathZNoneZ = Result_CVec_BlindedPaymentPathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CVec_BlindedPaymentPathZNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CVec_BlindedPaymentPathZNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_BlindedPaymentPathZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CVec_BlindedPaymentPathZNoneZ {
		const ret: bigint = bindings.CResult_CVec_BlindedPaymentPathZNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_CVec_BlindedPaymentPathZNoneZ = Result_CVec_BlindedPaymentPathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CVec_BlindedPaymentPathZNoneZ_OK extends Result_CVec_BlindedPaymentPathZNoneZ {
	public res: BlindedPaymentPath[];

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_CVec_BlindedPaymentPathZNoneZ_get_ok(ptr);
		const res_conv_20_len: number = bindings.getArrayLength(res);
		const res_conv_20_arr: BlindedPaymentPath[] = new Array(res_conv_20_len).fill(null);
		for (var u = 0; u < res_conv_20_len; u++) {
			const res_conv_20: bigint = bindings.getU64ArrayElem(res, u);
			const res_conv_20_hu_conv: BlindedPaymentPath = new BlindedPaymentPath(null, res_conv_20);
			CommonBase.add_ref_from(res_conv_20_hu_conv, this);
			res_conv_20_arr[u] = res_conv_20_hu_conv;
		}
		bindings.freeWasmMemory(res)
		this.res = res_conv_20_arr;
	}
}
export class Result_CVec_BlindedPaymentPathZNoneZ_Err extends Result_CVec_BlindedPaymentPathZNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}