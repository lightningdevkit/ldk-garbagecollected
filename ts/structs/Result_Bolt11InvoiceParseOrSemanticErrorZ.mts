
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_Bolt11InvoiceParseOrSemanticErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_Bolt11InvoiceParseOrSemanticErrorZ {
		if (bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_is_ok(ptr)) {
			return new Result_Bolt11InvoiceParseOrSemanticErrorZ_OK(null, ptr);
		} else {
			return new Result_Bolt11InvoiceParseOrSemanticErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_Bolt11InvoiceParseOrSemanticErrorZ in the success state.
	 */
	public static constructor_ok(o: Bolt11Invoice): Result_Bolt11InvoiceParseOrSemanticErrorZ {
		const ret: bigint = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_Bolt11InvoiceParseOrSemanticErrorZ = Result_Bolt11InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_Bolt11InvoiceParseOrSemanticErrorZ in the error state.
	 */
	public static constructor_err(e: ParseOrSemanticError): Result_Bolt11InvoiceParseOrSemanticErrorZ {
		const ret: bigint = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_Bolt11InvoiceParseOrSemanticErrorZ = Result_Bolt11InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_Bolt11InvoiceParseOrSemanticErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_Bolt11InvoiceParseOrSemanticErrorZ {
		const ret: bigint = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_Bolt11InvoiceParseOrSemanticErrorZ = Result_Bolt11InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_Bolt11InvoiceParseOrSemanticErrorZ_OK extends Result_Bolt11InvoiceParseOrSemanticErrorZ {
	public res: Bolt11Invoice;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_get_ok(ptr);
		const res_hu_conv: Bolt11Invoice = new Bolt11Invoice(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_Bolt11InvoiceParseOrSemanticErrorZ_Err extends Result_Bolt11InvoiceParseOrSemanticErrorZ {
	public err: ParseOrSemanticError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_get_err(ptr);
		const err_hu_conv: ParseOrSemanticError = ParseOrSemanticError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}