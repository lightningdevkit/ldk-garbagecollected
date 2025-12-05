
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CVec_ECDSASignatureZNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CVec_ECDSASignatureZNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CVec_ECDSASignatureZNoneZ {
		if (bindings.CResult_CVec_ECDSASignatureZNoneZ_is_ok(ptr)) {
			return new Result_CVec_ECDSASignatureZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_ECDSASignatureZNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CVec_ECDSASignatureZNoneZ in the success state.
	 */
	public static constructor_ok(o: Uint8Array[]): Result_CVec_ECDSASignatureZNoneZ {
		const ret: bigint = bindings.CResult_CVec_ECDSASignatureZNoneZ_ok(bindings.encodeUint32Array(o.map(o_conv_12 => bindings.encodeUint8Array(o_conv_12))));
		const ret_hu_conv: Result_CVec_ECDSASignatureZNoneZ = Result_CVec_ECDSASignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_ECDSASignatureZNoneZ in the error state.
	 */
	public static constructor_err(): Result_CVec_ECDSASignatureZNoneZ {
		const ret: bigint = bindings.CResult_CVec_ECDSASignatureZNoneZ_err();
		const ret_hu_conv: Result_CVec_ECDSASignatureZNoneZ = Result_CVec_ECDSASignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CVec_ECDSASignatureZNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CVec_ECDSASignatureZNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_ECDSASignatureZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CVec_ECDSASignatureZNoneZ {
		const ret: bigint = bindings.CResult_CVec_ECDSASignatureZNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_CVec_ECDSASignatureZNoneZ = Result_CVec_ECDSASignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CVec_ECDSASignatureZNoneZ_OK extends Result_CVec_ECDSASignatureZNoneZ {
	public res: Uint8Array[];

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_CVec_ECDSASignatureZNoneZ_get_ok(ptr);
		const res_conv_12_len: number = bindings.getArrayLength(res);
		const res_conv_12_arr: Uint8Array[] = new Array(res_conv_12_len).fill(null);
		for (var m = 0; m < res_conv_12_len; m++) {
			const res_conv_12: number = bindings.getU32ArrayElem(res, m);
			const res_conv_12_conv: Uint8Array = bindings.decodeUint8Array(res_conv_12);
			res_conv_12_arr[m] = res_conv_12_conv;
		}
		bindings.freeWasmMemory(res)
		this.res = res_conv_12_arr;
	}
}
export class Result_CVec_ECDSASignatureZNoneZ_Err extends Result_CVec_ECDSASignatureZNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}