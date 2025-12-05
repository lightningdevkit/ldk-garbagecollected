
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_SpendableOutputDescriptorDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_SpendableOutputDescriptorDecodeErrorZ {
		if (bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_is_ok(ptr)) {
			return new Result_SpendableOutputDescriptorDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_SpendableOutputDescriptorDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_SpendableOutputDescriptorDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o: SpendableOutputDescriptor): Result_SpendableOutputDescriptorDecodeErrorZ {
		const ret: bigint = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_SpendableOutputDescriptorDecodeErrorZ = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SpendableOutputDescriptorDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_SpendableOutputDescriptorDecodeErrorZ {
		const ret: bigint = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_SpendableOutputDescriptorDecodeErrorZ = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_SpendableOutputDescriptorDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_SpendableOutputDescriptorDecodeErrorZ {
		const ret: bigint = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_SpendableOutputDescriptorDecodeErrorZ = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_SpendableOutputDescriptorDecodeErrorZ_OK extends Result_SpendableOutputDescriptorDecodeErrorZ {
	public res: SpendableOutputDescriptor;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_SpendableOutputDescriptorDecodeErrorZ_Err extends Result_SpendableOutputDescriptorDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}