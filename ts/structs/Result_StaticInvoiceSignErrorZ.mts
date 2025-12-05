
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_StaticInvoiceSignErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_StaticInvoiceSignErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_StaticInvoiceSignErrorZ {
		if (bindings.CResult_StaticInvoiceSignErrorZ_is_ok(ptr)) {
			return new Result_StaticInvoiceSignErrorZ_OK(null, ptr);
		} else {
			return new Result_StaticInvoiceSignErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_StaticInvoiceSignErrorZ in the success state.
	 */
	public static constructor_ok(o: StaticInvoice): Result_StaticInvoiceSignErrorZ {
		const ret: bigint = bindings.CResult_StaticInvoiceSignErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_StaticInvoiceSignErrorZ = Result_StaticInvoiceSignErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_StaticInvoiceSignErrorZ in the error state.
	 */
	public static constructor_err(e: SignError): Result_StaticInvoiceSignErrorZ {
		const ret: bigint = bindings.CResult_StaticInvoiceSignErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_StaticInvoiceSignErrorZ = Result_StaticInvoiceSignErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_StaticInvoiceSignErrorZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_StaticInvoiceSignErrorZ_OK extends Result_StaticInvoiceSignErrorZ {
	public res: StaticInvoice;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_StaticInvoiceSignErrorZ_get_ok(ptr);
		const res_hu_conv: StaticInvoice = new StaticInvoice(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_StaticInvoiceSignErrorZ_Err extends Result_StaticInvoiceSignErrorZ {
	public err: SignError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_StaticInvoiceSignErrorZ_get_err(ptr);
		const err_hu_conv: SignError = SignError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}