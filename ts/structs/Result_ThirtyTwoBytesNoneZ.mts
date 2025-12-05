
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_ThirtyTwoBytesNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_ThirtyTwoBytesNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_ThirtyTwoBytesNoneZ {
		if (bindings.CResult_ThirtyTwoBytesNoneZ_is_ok(ptr)) {
			return new Result_ThirtyTwoBytesNoneZ_OK(null, ptr);
		} else {
			return new Result_ThirtyTwoBytesNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ in the success state.
	 */
	public static constructor_ok(o: Uint8Array): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.CResult_ThirtyTwoBytesNoneZ_ok(bindings.encodeUint8Array(o));
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ in the error state.
	 */
	public static constructor_err(): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.CResult_ThirtyTwoBytesNoneZ_err();
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_ThirtyTwoBytesNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_ThirtyTwoBytesNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.CResult_ThirtyTwoBytesNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_ThirtyTwoBytesNoneZ_OK extends Result_ThirtyTwoBytesNoneZ {
	public res: Uint8Array;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_ThirtyTwoBytesNoneZ_get_ok(ptr);
		const res_conv: Uint8Array = bindings.decodeUint8Array(res);
		this.res = res_conv;
	}
}
export class Result_ThirtyTwoBytesNoneZ_Err extends Result_ThirtyTwoBytesNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}