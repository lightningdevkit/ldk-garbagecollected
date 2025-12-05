
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_StrNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_StrNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_StrNoneZ {
		if (bindings.CResult_StrNoneZ_is_ok(ptr)) {
			return new Result_StrNoneZ_OK(null, ptr);
		} else {
			return new Result_StrNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_StrNoneZ in the success state.
	 */
	public static constructor_ok(o: string): Result_StrNoneZ {
		const ret: bigint = bindings.CResult_StrNoneZ_ok(bindings.encodeString(o));
		const ret_hu_conv: Result_StrNoneZ = Result_StrNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_StrNoneZ in the error state.
	 */
	public static constructor_err(): Result_StrNoneZ {
		const ret: bigint = bindings.CResult_StrNoneZ_err();
		const ret_hu_conv: Result_StrNoneZ = Result_StrNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_StrNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_StrNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_StrNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_StrNoneZ {
		const ret: bigint = bindings.CResult_StrNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_StrNoneZ = Result_StrNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_StrNoneZ_OK extends Result_StrNoneZ {
	public res: string;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_StrNoneZ_get_ok(ptr);
		const res_conv: string = bindings.decodeString(res);
		this.res = res_conv;
	}
}
export class Result_StrNoneZ_Err extends Result_StrNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}