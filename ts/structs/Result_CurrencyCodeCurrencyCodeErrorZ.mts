
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CurrencyCodeCurrencyCodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CurrencyCodeCurrencyCodeErrorZ {
		if (bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_is_ok(ptr)) {
			return new Result_CurrencyCodeCurrencyCodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CurrencyCodeCurrencyCodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CurrencyCodeCurrencyCodeErrorZ in the success state.
	 */
	public static constructor_ok(o: CurrencyCode): Result_CurrencyCodeCurrencyCodeErrorZ {
		const ret: bigint = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_CurrencyCodeCurrencyCodeErrorZ = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CurrencyCodeCurrencyCodeErrorZ in the error state.
	 */
	public static constructor_err(e: CurrencyCodeError): Result_CurrencyCodeCurrencyCodeErrorZ {
		const ret: bigint = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_CurrencyCodeCurrencyCodeErrorZ = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CurrencyCodeCurrencyCodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CurrencyCodeCurrencyCodeErrorZ {
		const ret: bigint = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_CurrencyCodeCurrencyCodeErrorZ = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CurrencyCodeCurrencyCodeErrorZ_OK extends Result_CurrencyCodeCurrencyCodeErrorZ {
	public res: CurrencyCode;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_get_ok(ptr);
		const res_hu_conv: CurrencyCode = new CurrencyCode(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_CurrencyCodeCurrencyCodeErrorZ_Err extends Result_CurrencyCodeCurrencyCodeErrorZ {
	public err: CurrencyCodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_get_err(ptr);
		const err_hu_conv: CurrencyCodeError = new CurrencyCodeError(null, err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}