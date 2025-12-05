
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_PublicKeyNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_PublicKeyNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_PublicKeyNoneZ {
		if (bindings.CResult_PublicKeyNoneZ_is_ok(ptr)) {
			return new Result_PublicKeyNoneZ_OK(null, ptr);
		} else {
			return new Result_PublicKeyNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_PublicKeyNoneZ in the success state.
	 */
	public static constructor_ok(o: Uint8Array): Result_PublicKeyNoneZ {
		const ret: bigint = bindings.CResult_PublicKeyNoneZ_ok(bindings.encodeUint8Array(o));
		const ret_hu_conv: Result_PublicKeyNoneZ = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PublicKeyNoneZ in the error state.
	 */
	public static constructor_err(): Result_PublicKeyNoneZ {
		const ret: bigint = bindings.CResult_PublicKeyNoneZ_err();
		const ret_hu_conv: Result_PublicKeyNoneZ = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_PublicKeyNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_PublicKeyNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_PublicKeyNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_PublicKeyNoneZ {
		const ret: bigint = bindings.CResult_PublicKeyNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_PublicKeyNoneZ = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_PublicKeyNoneZ_OK extends Result_PublicKeyNoneZ {
	public res: Uint8Array;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_PublicKeyNoneZ_get_ok(ptr);
		const res_conv: Uint8Array = bindings.decodeUint8Array(res);
		this.res = res_conv;
	}
}
export class Result_PublicKeyNoneZ_Err extends Result_PublicKeyNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}