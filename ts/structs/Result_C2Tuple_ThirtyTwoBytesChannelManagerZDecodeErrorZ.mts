
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ {
		if (bindings.CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o: TwoTuple_ThirtyTwoBytesChannelManagerZ): Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ {
		const ret: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ = Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ {
		const ret: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ = Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_OK extends Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ {
	public res: TwoTuple_ThirtyTwoBytesChannelManagerZ;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: TwoTuple_ThirtyTwoBytesChannelManagerZ = new TwoTuple_ThirtyTwoBytesChannelManagerZ(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_Err extends Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}