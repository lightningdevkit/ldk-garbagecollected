
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_PeeledOnionNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_PeeledOnionNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_PeeledOnionNoneZ {
		if (bindings.CResult_PeeledOnionNoneZ_is_ok(ptr)) {
			return new Result_PeeledOnionNoneZ_OK(null, ptr);
		} else {
			return new Result_PeeledOnionNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_PeeledOnionNoneZ in the success state.
	 */
	public static constructor_ok(o: PeeledOnion): Result_PeeledOnionNoneZ {
		const ret: bigint = bindings.CResult_PeeledOnionNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_PeeledOnionNoneZ = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PeeledOnionNoneZ in the error state.
	 */
	public static constructor_err(): Result_PeeledOnionNoneZ {
		const ret: bigint = bindings.CResult_PeeledOnionNoneZ_err();
		const ret_hu_conv: Result_PeeledOnionNoneZ = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_PeeledOnionNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_PeeledOnionNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_PeeledOnionNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_PeeledOnionNoneZ {
		const ret: bigint = bindings.CResult_PeeledOnionNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_PeeledOnionNoneZ = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_PeeledOnionNoneZ_OK extends Result_PeeledOnionNoneZ {
	public res: PeeledOnion;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_PeeledOnionNoneZ_get_ok(ptr);
		const res_hu_conv: PeeledOnion = PeeledOnion.constr_from_ptr(res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_PeeledOnionNoneZ_Err extends Result_PeeledOnionNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}