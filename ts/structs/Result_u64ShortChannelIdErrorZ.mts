
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_u64ShortChannelIdErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_u64ShortChannelIdErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_u64ShortChannelIdErrorZ {
		if (bindings.CResult_u64ShortChannelIdErrorZ_is_ok(ptr)) {
			return new Result_u64ShortChannelIdErrorZ_OK(null, ptr);
		} else {
			return new Result_u64ShortChannelIdErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_u64ShortChannelIdErrorZ in the success state.
	 */
	public static constructor_ok(o: bigint): Result_u64ShortChannelIdErrorZ {
		const ret: bigint = bindings.CResult_u64ShortChannelIdErrorZ_ok(o);
		const ret_hu_conv: Result_u64ShortChannelIdErrorZ = Result_u64ShortChannelIdErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_u64ShortChannelIdErrorZ in the error state.
	 */
	public static constructor_err(e: ShortChannelIdError): Result_u64ShortChannelIdErrorZ {
		const ret: bigint = bindings.CResult_u64ShortChannelIdErrorZ_err(e);
		const ret_hu_conv: Result_u64ShortChannelIdErrorZ = Result_u64ShortChannelIdErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_u64ShortChannelIdErrorZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_u64ShortChannelIdErrorZ_OK extends Result_u64ShortChannelIdErrorZ {
	public res: bigint;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.res = bindings.CResult_u64ShortChannelIdErrorZ_get_ok(ptr);
	}
}
export class Result_u64ShortChannelIdErrorZ_Err extends Result_u64ShortChannelIdErrorZ {
	public err: ShortChannelIdError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_u64ShortChannelIdErrorZ_get_err(ptr);
	}
}