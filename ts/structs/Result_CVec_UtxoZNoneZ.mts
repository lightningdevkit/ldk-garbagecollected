
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CVec_UtxoZNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CVec_UtxoZNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CVec_UtxoZNoneZ {
		if (bindings.CResult_CVec_UtxoZNoneZ_is_ok(ptr)) {
			return new Result_CVec_UtxoZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_UtxoZNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CVec_UtxoZNoneZ in the success state.
	 */
	public static constructor_ok(o: Utxo[]): Result_CVec_UtxoZNoneZ {
		const ret: bigint = bindings.CResult_CVec_UtxoZNoneZ_ok(bindings.encodeUint64Array(o.map(o_conv_6 => CommonBase.get_ptr_of(o_conv_6))));
		const ret_hu_conv: Result_CVec_UtxoZNoneZ = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_UtxoZNoneZ in the error state.
	 */
	public static constructor_err(): Result_CVec_UtxoZNoneZ {
		const ret: bigint = bindings.CResult_CVec_UtxoZNoneZ_err();
		const ret_hu_conv: Result_CVec_UtxoZNoneZ = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CVec_UtxoZNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CVec_UtxoZNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_UtxoZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CVec_UtxoZNoneZ {
		const ret: bigint = bindings.CResult_CVec_UtxoZNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_CVec_UtxoZNoneZ = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CVec_UtxoZNoneZ_OK extends Result_CVec_UtxoZNoneZ {
	public res: Utxo[];

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_CVec_UtxoZNoneZ_get_ok(ptr);
		const res_conv_6_len: number = bindings.getArrayLength(res);
		const res_conv_6_arr: Utxo[] = new Array(res_conv_6_len).fill(null);
		for (var g = 0; g < res_conv_6_len; g++) {
			const res_conv_6: bigint = bindings.getU64ArrayElem(res, g);
			const res_conv_6_hu_conv: Utxo = new Utxo(null, res_conv_6);
			CommonBase.add_ref_from(res_conv_6_hu_conv, this);
			res_conv_6_arr[g] = res_conv_6_hu_conv;
		}
		bindings.freeWasmMemory(res)
		this.res = res_conv_6_arr;
	}
}
export class Result_CVec_UtxoZNoneZ_Err extends Result_CVec_UtxoZNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}