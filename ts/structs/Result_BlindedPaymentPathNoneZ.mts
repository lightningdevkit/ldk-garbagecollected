
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_BlindedPaymentPathNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_BlindedPaymentPathNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_BlindedPaymentPathNoneZ {
		if (bindings.CResult_BlindedPaymentPathNoneZ_is_ok(ptr)) {
			return new Result_BlindedPaymentPathNoneZ_OK(null, ptr);
		} else {
			return new Result_BlindedPaymentPathNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_BlindedPaymentPathNoneZ in the success state.
	 */
	public static constructor_ok(o: BlindedPaymentPath): Result_BlindedPaymentPathNoneZ {
		const ret: bigint = bindings.CResult_BlindedPaymentPathNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_BlindedPaymentPathNoneZ = Result_BlindedPaymentPathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_BlindedPaymentPathNoneZ in the error state.
	 */
	public static constructor_err(): Result_BlindedPaymentPathNoneZ {
		const ret: bigint = bindings.CResult_BlindedPaymentPathNoneZ_err();
		const ret_hu_conv: Result_BlindedPaymentPathNoneZ = Result_BlindedPaymentPathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_BlindedPaymentPathNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_BlindedPaymentPathNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_BlindedPaymentPathNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_BlindedPaymentPathNoneZ {
		const ret: bigint = bindings.CResult_BlindedPaymentPathNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_BlindedPaymentPathNoneZ = Result_BlindedPaymentPathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_BlindedPaymentPathNoneZ_OK extends Result_BlindedPaymentPathNoneZ {
	public res: BlindedPaymentPath;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_BlindedPaymentPathNoneZ_get_ok(ptr);
		const res_hu_conv: BlindedPaymentPath = new BlindedPaymentPath(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_BlindedPaymentPathNoneZ_Err extends Result_BlindedPaymentPathNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}