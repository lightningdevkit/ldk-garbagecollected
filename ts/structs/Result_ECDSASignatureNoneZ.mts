
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_ECDSASignatureNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_ECDSASignatureNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_ECDSASignatureNoneZ {
		if (bindings.CResult_ECDSASignatureNoneZ_is_ok(ptr)) {
			return new Result_ECDSASignatureNoneZ_OK(null, ptr);
		} else {
			return new Result_ECDSASignatureNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_ECDSASignatureNoneZ in the success state.
	 */
	public static constructor_ok(o: Uint8Array): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.CResult_ECDSASignatureNoneZ_ok(bindings.encodeUint8Array(o));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ECDSASignatureNoneZ in the error state.
	 */
	public static constructor_err(): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.CResult_ECDSASignatureNoneZ_err();
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_ECDSASignatureNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_ECDSASignatureNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_ECDSASignatureNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.CResult_ECDSASignatureNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_ECDSASignatureNoneZ_OK extends Result_ECDSASignatureNoneZ {
	public res: Uint8Array;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_ECDSASignatureNoneZ_get_ok(ptr);
		const res_conv: Uint8Array = bindings.decodeUint8Array(res);
		this.res = res_conv;
	}
}
export class Result_ECDSASignatureNoneZ_Err extends Result_ECDSASignatureNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}