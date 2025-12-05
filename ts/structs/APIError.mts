
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Indicates an error on the client's part (usually some variant of attempting to use too-low or
 * too-high values)
 */
export class APIError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.APIError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): APIError {
		const raw_ty: number = bindings.LDKAPIError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new APIError_APIMisuseError(ptr);
			case 1: return new APIError_FeeRateTooHigh(ptr);
			case 2: return new APIError_InvalidRoute(ptr);
			case 3: return new APIError_ChannelUnavailable(ptr);
			case 4: return new APIError_MonitorUpdateInProgress(ptr);
			case 5: return new APIError_IncompatibleShutdownScript(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.APIError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the APIError
	 */
	public clone(): APIError {
		const ret: bigint = bindings.APIError_clone(this.ptr);
		const ret_hu_conv: APIError = APIError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new APIMisuseError-variant APIError
	 */
	public static constructor_apimisuse_error(err: string): APIError {
		const ret: bigint = bindings.APIError_apimisuse_error(bindings.encodeString(err));
		const ret_hu_conv: APIError = APIError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeRateTooHigh-variant APIError
	 */
	public static constructor_fee_rate_too_high(err: string, feerate: number): APIError {
		const ret: bigint = bindings.APIError_fee_rate_too_high(bindings.encodeString(err), feerate);
		const ret_hu_conv: APIError = APIError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidRoute-variant APIError
	 */
	public static constructor_invalid_route(err: string): APIError {
		const ret: bigint = bindings.APIError_invalid_route(bindings.encodeString(err));
		const ret_hu_conv: APIError = APIError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelUnavailable-variant APIError
	 */
	public static constructor_channel_unavailable(err: string): APIError {
		const ret: bigint = bindings.APIError_channel_unavailable(bindings.encodeString(err));
		const ret_hu_conv: APIError = APIError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MonitorUpdateInProgress-variant APIError
	 */
	public static constructor_monitor_update_in_progress(): APIError {
		const ret: bigint = bindings.APIError_monitor_update_in_progress();
		const ret_hu_conv: APIError = APIError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncompatibleShutdownScript-variant APIError
	 */
	public static constructor_incompatible_shutdown_script(script: ShutdownScript): APIError {
		const ret: bigint = bindings.APIError_incompatible_shutdown_script(CommonBase.get_ptr_of(script));
		const ret_hu_conv: APIError = APIError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two APIErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: APIError): boolean {
		const ret: boolean = bindings.APIError_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the APIError object into a byte array which can be read by APIError_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.APIError_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A APIError of type APIMisuseError */
export class APIError_APIMisuseError extends APIError {
	/**
	 * A human-readable error message
	 */
	public err: string;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const err: number = bindings.LDKAPIError_APIMisuseError_get_err(ptr);
		const err_conv: string = bindings.decodeString(err);
		this.err = err_conv;
	}
}
/** A APIError of type FeeRateTooHigh */
export class APIError_FeeRateTooHigh extends APIError {
	/**
	 * A human-readable error message
	 */
	public err: string;
	/**
	 * The feerate which was too high.
	 */
	public feerate: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const err: number = bindings.LDKAPIError_FeeRateTooHigh_get_err(ptr);
		const err_conv: string = bindings.decodeString(err);
		this.err = err_conv;
		this.feerate = bindings.LDKAPIError_FeeRateTooHigh_get_feerate(ptr);
	}
}
/** A APIError of type InvalidRoute */
export class APIError_InvalidRoute extends APIError {
	/**
	 * A human-readable error message
	 */
	public err: string;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const err: number = bindings.LDKAPIError_InvalidRoute_get_err(ptr);
		const err_conv: string = bindings.decodeString(err);
		this.err = err_conv;
	}
}
/** A APIError of type ChannelUnavailable */
export class APIError_ChannelUnavailable extends APIError {
	/**
	 * A human-readable error message
	 */
	public err: string;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const err: number = bindings.LDKAPIError_ChannelUnavailable_get_err(ptr);
		const err_conv: string = bindings.decodeString(err);
		this.err = err_conv;
	}
}
/** A APIError of type MonitorUpdateInProgress */
export class APIError_MonitorUpdateInProgress extends APIError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A APIError of type IncompatibleShutdownScript */
export class APIError_IncompatibleShutdownScript extends APIError {
	/**
	 * The incompatible shutdown script.
	 */
	public script: ShutdownScript;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const script: bigint = bindings.LDKAPIError_IncompatibleShutdownScript_get_script(ptr);
		const script_hu_conv: ShutdownScript = new ShutdownScript(null, script);
			CommonBase.add_ref_from(script_hu_conv, this);
		this.script = script_hu_conv;
	}
}
