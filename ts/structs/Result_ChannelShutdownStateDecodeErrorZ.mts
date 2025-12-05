
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_ChannelShutdownStateDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_ChannelShutdownStateDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_ChannelShutdownStateDecodeErrorZ {
		if (bindings.CResult_ChannelShutdownStateDecodeErrorZ_is_ok(ptr)) {
			return new Result_ChannelShutdownStateDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelShutdownStateDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o: ChannelShutdownState): Result_ChannelShutdownStateDecodeErrorZ {
		const ret: bigint = bindings.CResult_ChannelShutdownStateDecodeErrorZ_ok(o);
		const ret_hu_conv: Result_ChannelShutdownStateDecodeErrorZ = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_ChannelShutdownStateDecodeErrorZ {
		const ret: bigint = bindings.CResult_ChannelShutdownStateDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_ChannelShutdownStateDecodeErrorZ = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_ChannelShutdownStateDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_ChannelShutdownStateDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_ChannelShutdownStateDecodeErrorZ {
		const ret: bigint = bindings.CResult_ChannelShutdownStateDecodeErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_ChannelShutdownStateDecodeErrorZ = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_ChannelShutdownStateDecodeErrorZ_OK extends Result_ChannelShutdownStateDecodeErrorZ {
	public res: ChannelShutdownState;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.res = bindings.CResult_ChannelShutdownStateDecodeErrorZ_get_ok(ptr);
	}
}
export class Result_ChannelShutdownStateDecodeErrorZ_Err extends Result_ChannelShutdownStateDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_ChannelShutdownStateDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}