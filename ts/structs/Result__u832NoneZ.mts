
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result__u832NoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult__u832NoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result__u832NoneZ {
		if (bindings.CResult__u832NoneZ_is_ok(ptr)) {
			return new Result__u832NoneZ_OK(null, ptr);
		} else {
			return new Result__u832NoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult__u832NoneZ in the success state.
	 */
	public static constructor_ok(o: Uint8Array): Result__u832NoneZ {
		const ret: bigint = bindings.CResult__u832NoneZ_ok(bindings.encodeUint8Array(o));
		const ret_hu_conv: Result__u832NoneZ = Result__u832NoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult__u832NoneZ in the error state.
	 */
	public static constructor_err(): Result__u832NoneZ {
		const ret: bigint = bindings.CResult__u832NoneZ_err();
		const ret_hu_conv: Result__u832NoneZ = Result__u832NoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult__u832NoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult__u832NoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult__u832NoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result__u832NoneZ {
		const ret: bigint = bindings.CResult__u832NoneZ_clone(this.ptr);
		const ret_hu_conv: Result__u832NoneZ = Result__u832NoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result__u832NoneZ_OK extends Result__u832NoneZ {
	public res: Uint8Array;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult__u832NoneZ_get_ok(ptr);
		const res_conv: Uint8Array = bindings.decodeUint8Array(res);
		this.res = res_conv;
	}
}
export class Result__u832NoneZ_Err extends Result__u832NoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}