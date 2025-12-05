
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_ChannelMonitorUpdateStatusNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_ChannelMonitorUpdateStatusNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_ChannelMonitorUpdateStatusNoneZ {
		if (bindings.CResult_ChannelMonitorUpdateStatusNoneZ_is_ok(ptr)) {
			return new Result_ChannelMonitorUpdateStatusNoneZ_OK(null, ptr);
		} else {
			return new Result_ChannelMonitorUpdateStatusNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ in the success state.
	 */
	public static constructor_ok(o: ChannelMonitorUpdateStatus): Result_ChannelMonitorUpdateStatusNoneZ {
		const ret: bigint = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_ok(o);
		const ret_hu_conv: Result_ChannelMonitorUpdateStatusNoneZ = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ in the error state.
	 */
	public static constructor_err(): Result_ChannelMonitorUpdateStatusNoneZ {
		const ret: bigint = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_err();
		const ret_hu_conv: Result_ChannelMonitorUpdateStatusNoneZ = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_ChannelMonitorUpdateStatusNoneZ {
		const ret: bigint = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_ChannelMonitorUpdateStatusNoneZ = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_ChannelMonitorUpdateStatusNoneZ_OK extends Result_ChannelMonitorUpdateStatusNoneZ {
	public res: ChannelMonitorUpdateStatus;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.res = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_get_ok(ptr);
	}
}
export class Result_ChannelMonitorUpdateStatusNoneZ_Err extends Result_ChannelMonitorUpdateStatusNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}