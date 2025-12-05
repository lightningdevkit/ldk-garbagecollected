
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_OnionMessagePathNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_OnionMessagePathNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_OnionMessagePathNoneZ {
		if (bindings.CResult_OnionMessagePathNoneZ_is_ok(ptr)) {
			return new Result_OnionMessagePathNoneZ_OK(null, ptr);
		} else {
			return new Result_OnionMessagePathNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_OnionMessagePathNoneZ in the success state.
	 */
	public static constructor_ok(o: OnionMessagePath): Result_OnionMessagePathNoneZ {
		const ret: bigint = bindings.CResult_OnionMessagePathNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_OnionMessagePathNoneZ = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OnionMessagePathNoneZ in the error state.
	 */
	public static constructor_err(): Result_OnionMessagePathNoneZ {
		const ret: bigint = bindings.CResult_OnionMessagePathNoneZ_err();
		const ret_hu_conv: Result_OnionMessagePathNoneZ = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_OnionMessagePathNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_OnionMessagePathNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_OnionMessagePathNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_OnionMessagePathNoneZ {
		const ret: bigint = bindings.CResult_OnionMessagePathNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_OnionMessagePathNoneZ = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_OnionMessagePathNoneZ_OK extends Result_OnionMessagePathNoneZ {
	public res: OnionMessagePath;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_OnionMessagePathNoneZ_get_ok(ptr);
		const res_hu_conv: OnionMessagePath = new OnionMessagePath(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_OnionMessagePathNoneZ_Err extends Result_OnionMessagePathNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}