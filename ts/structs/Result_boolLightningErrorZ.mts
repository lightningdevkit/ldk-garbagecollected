
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_boolLightningErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_boolLightningErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_boolLightningErrorZ {
		if (bindings.CResult_boolLightningErrorZ_is_ok(ptr)) {
			return new Result_boolLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_boolLightningErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_boolLightningErrorZ in the success state.
	 */
	public static constructor_ok(o: boolean): Result_boolLightningErrorZ {
		const ret: bigint = bindings.CResult_boolLightningErrorZ_ok(o);
		const ret_hu_conv: Result_boolLightningErrorZ = Result_boolLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_boolLightningErrorZ in the error state.
	 */
	public static constructor_err(e: LightningError): Result_boolLightningErrorZ {
		const ret: bigint = bindings.CResult_boolLightningErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_boolLightningErrorZ = Result_boolLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_boolLightningErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_boolLightningErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_boolLightningErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_boolLightningErrorZ {
		const ret: bigint = bindings.CResult_boolLightningErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_boolLightningErrorZ = Result_boolLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_boolLightningErrorZ_OK extends Result_boolLightningErrorZ {
	public res: boolean;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.res = bindings.CResult_boolLightningErrorZ_get_ok(ptr);
	}
}
export class Result_boolLightningErrorZ_Err extends Result_boolLightningErrorZ {
	public err: LightningError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_boolLightningErrorZ_get_err(ptr);
		const err_hu_conv: LightningError = new LightningError(null, err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}