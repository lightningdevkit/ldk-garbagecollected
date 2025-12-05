
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_VerifiedInvoiceRequestNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_VerifiedInvoiceRequestNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_VerifiedInvoiceRequestNoneZ {
		if (bindings.CResult_VerifiedInvoiceRequestNoneZ_is_ok(ptr)) {
			return new Result_VerifiedInvoiceRequestNoneZ_OK(null, ptr);
		} else {
			return new Result_VerifiedInvoiceRequestNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_VerifiedInvoiceRequestNoneZ in the success state.
	 */
	public static constructor_ok(o: VerifiedInvoiceRequest): Result_VerifiedInvoiceRequestNoneZ {
		const ret: bigint = bindings.CResult_VerifiedInvoiceRequestNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_VerifiedInvoiceRequestNoneZ = Result_VerifiedInvoiceRequestNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_VerifiedInvoiceRequestNoneZ in the error state.
	 */
	public static constructor_err(): Result_VerifiedInvoiceRequestNoneZ {
		const ret: bigint = bindings.CResult_VerifiedInvoiceRequestNoneZ_err();
		const ret_hu_conv: Result_VerifiedInvoiceRequestNoneZ = Result_VerifiedInvoiceRequestNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_VerifiedInvoiceRequestNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_VerifiedInvoiceRequestNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_VerifiedInvoiceRequestNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_VerifiedInvoiceRequestNoneZ {
		const ret: bigint = bindings.CResult_VerifiedInvoiceRequestNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_VerifiedInvoiceRequestNoneZ = Result_VerifiedInvoiceRequestNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_VerifiedInvoiceRequestNoneZ_OK extends Result_VerifiedInvoiceRequestNoneZ {
	public res: VerifiedInvoiceRequest;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_VerifiedInvoiceRequestNoneZ_get_ok(ptr);
		const res_hu_conv: VerifiedInvoiceRequest = new VerifiedInvoiceRequest(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_VerifiedInvoiceRequestNoneZ_Err extends Result_VerifiedInvoiceRequestNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}