
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CollectionLengthDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CollectionLengthDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CollectionLengthDecodeErrorZ {
		if (bindings.CResult_CollectionLengthDecodeErrorZ_is_ok(ptr)) {
			return new Result_CollectionLengthDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CollectionLengthDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CollectionLengthDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o_a_arg: bigint): Result_CollectionLengthDecodeErrorZ {
		const ret: bigint = bindings.CResult_CollectionLengthDecodeErrorZ_ok(bindings.CollectionLength_new(o_a_arg));
		const ret_hu_conv: Result_CollectionLengthDecodeErrorZ = Result_CollectionLengthDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CollectionLengthDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_CollectionLengthDecodeErrorZ {
		const ret: bigint = bindings.CResult_CollectionLengthDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_CollectionLengthDecodeErrorZ = Result_CollectionLengthDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CollectionLengthDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_CollectionLengthDecodeErrorZ_OK extends Result_CollectionLengthDecodeErrorZ {
	public res: CollectionLength;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_CollectionLengthDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: CollectionLength = new CollectionLength(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_CollectionLengthDecodeErrorZ_Err extends Result_CollectionLengthDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_CollectionLengthDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}