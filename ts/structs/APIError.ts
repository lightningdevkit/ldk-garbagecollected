
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class APIError extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.APIError_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): APIError {
		const raw_val: bindings.LDKAPIError = bindings.LDKAPIError_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKAPIError.APIMisuseError) {
			return new APIMisuseError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKAPIError.FeeRateTooHigh) {
			return new FeeRateTooHigh(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKAPIError.RouteError) {
			return new RouteError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKAPIError.ChannelUnavailable) {
			return new ChannelUnavailable(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKAPIError.MonitorUpdateFailed) {
			return new MonitorUpdateFailed(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class APIMisuseError extends APIError {
	public err: String;
	private constructor(ptr: number, obj: bindings.LDKAPIError.APIMisuseError) {
		super(null, ptr);
		this.err = obj.err;
	}
}
export class FeeRateTooHigh extends APIError {
	public err: String;
	public feerate: number;
	private constructor(ptr: number, obj: bindings.LDKAPIError.FeeRateTooHigh) {
		super(null, ptr);
		this.err = obj.err;
		this.feerate = obj.feerate;
	}
}
export class RouteError extends APIError {
	public err: String;
	private constructor(ptr: number, obj: bindings.LDKAPIError.RouteError) {
		super(null, ptr);
		this.err = obj.err;
	}
}
export class ChannelUnavailable extends APIError {
	public err: String;
	private constructor(ptr: number, obj: bindings.LDKAPIError.ChannelUnavailable) {
		super(null, ptr);
		this.err = obj.err;
	}
}
export class MonitorUpdateFailed extends APIError {
	private constructor(ptr: number, obj: bindings.LDKAPIError.MonitorUpdateFailed) {
		super(null, ptr);
	}
}
	public APIError clone() {
		number ret = bindings.APIError_clone(this.ptr);
		APIError ret_hu_conv = APIError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
