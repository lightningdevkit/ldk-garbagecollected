
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_HumanReadableNameNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_HumanReadableNameNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_HumanReadableNameNoneZ {
		if (bindings.CResult_HumanReadableNameNoneZ_is_ok(ptr)) {
			return new Result_HumanReadableNameNoneZ_OK(null, ptr);
		} else {
			return new Result_HumanReadableNameNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_HumanReadableNameNoneZ in the success state.
	 */
	public static constructor_ok(o: HumanReadableName): Result_HumanReadableNameNoneZ {
		const ret: bigint = bindings.CResult_HumanReadableNameNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_HumanReadableNameNoneZ = Result_HumanReadableNameNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_HumanReadableNameNoneZ in the error state.
	 */
	public static constructor_err(): Result_HumanReadableNameNoneZ {
		const ret: bigint = bindings.CResult_HumanReadableNameNoneZ_err();
		const ret_hu_conv: Result_HumanReadableNameNoneZ = Result_HumanReadableNameNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_HumanReadableNameNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_HumanReadableNameNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_HumanReadableNameNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_HumanReadableNameNoneZ {
		const ret: bigint = bindings.CResult_HumanReadableNameNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_HumanReadableNameNoneZ = Result_HumanReadableNameNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_HumanReadableNameNoneZ_OK extends Result_HumanReadableNameNoneZ {
	public res: HumanReadableName;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_HumanReadableNameNoneZ_get_ok(ptr);
		const res_hu_conv: HumanReadableName = new HumanReadableName(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_HumanReadableNameNoneZ_Err extends Result_HumanReadableNameNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}