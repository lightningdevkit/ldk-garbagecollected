
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
		if (bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_is_ok(ptr)) {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ in the success state.
	 */
	public static constructor_ok(o: TwoTuple_ThirtyTwoBytesChannelMonitorZ[]): Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_ok(bindings.encodeUint64Array(o.map(o_conv_40 => CommonBase.get_ptr_of(o_conv_40))));
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ in the error state.
	 */
	public static constructor_err(e: IOError): Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_err(e);
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
		const ret: bigint = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_OK extends Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
	public res: TwoTuple_ThirtyTwoBytesChannelMonitorZ[];

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_get_ok(ptr);
		const res_conv_40_len: number = bindings.getArrayLength(res);
		const res_conv_40_arr: TwoTuple_ThirtyTwoBytesChannelMonitorZ[] = new Array(res_conv_40_len).fill(null);
		for (var o = 0; o < res_conv_40_len; o++) {
			const res_conv_40: bigint = bindings.getU64ArrayElem(res, o);
			const res_conv_40_hu_conv: TwoTuple_ThirtyTwoBytesChannelMonitorZ = new TwoTuple_ThirtyTwoBytesChannelMonitorZ(null, res_conv_40);
			CommonBase.add_ref_from(res_conv_40_hu_conv, this);
			res_conv_40_arr[o] = res_conv_40_hu_conv;
		}
		bindings.freeWasmMemory(res)
		this.res = res_conv_40_arr;
	}
}
export class Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_Err extends Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
	public err: IOError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_get_err(ptr);
	}
}