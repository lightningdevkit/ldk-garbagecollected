
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_HTLCDescriptorDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_HTLCDescriptorDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_HTLCDescriptorDecodeErrorZ {
		if (bindings.CResult_HTLCDescriptorDecodeErrorZ_is_ok(ptr)) {
			return new Result_HTLCDescriptorDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HTLCDescriptorDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_HTLCDescriptorDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o: HTLCDescriptor): Result_HTLCDescriptorDecodeErrorZ {
		const ret: bigint = bindings.CResult_HTLCDescriptorDecodeErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_HTLCDescriptorDecodeErrorZ = Result_HTLCDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_HTLCDescriptorDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_HTLCDescriptorDecodeErrorZ {
		const ret: bigint = bindings.CResult_HTLCDescriptorDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_HTLCDescriptorDecodeErrorZ = Result_HTLCDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_HTLCDescriptorDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_HTLCDescriptorDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_HTLCDescriptorDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_HTLCDescriptorDecodeErrorZ {
		const ret: bigint = bindings.CResult_HTLCDescriptorDecodeErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_HTLCDescriptorDecodeErrorZ = Result_HTLCDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_HTLCDescriptorDecodeErrorZ_OK extends Result_HTLCDescriptorDecodeErrorZ {
	public res: HTLCDescriptor;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_HTLCDescriptorDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: HTLCDescriptor = new HTLCDescriptor(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_HTLCDescriptorDecodeErrorZ_Err extends Result_HTLCDescriptorDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_HTLCDescriptorDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}