
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_NetworkGraphDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_NetworkGraphDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_NetworkGraphDecodeErrorZ {
		if (bindings.CResult_NetworkGraphDecodeErrorZ_is_ok(ptr)) {
			return new Result_NetworkGraphDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NetworkGraphDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_NetworkGraphDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o_network: Network, o_logger: Logger): Result_NetworkGraphDecodeErrorZ {
		const ret: bigint = bindings.CResult_NetworkGraphDecodeErrorZ_ok(bindings.NetworkGraph_new(o_network, CommonBase.get_ptr_of(o_logger)));
		const ret_hu_conv: Result_NetworkGraphDecodeErrorZ = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, o_logger);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NetworkGraphDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_NetworkGraphDecodeErrorZ {
		const ret: bigint = bindings.CResult_NetworkGraphDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_NetworkGraphDecodeErrorZ = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_NetworkGraphDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_NetworkGraphDecodeErrorZ_OK extends Result_NetworkGraphDecodeErrorZ {
	public res: NetworkGraph;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_NetworkGraphDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: NetworkGraph = new NetworkGraph(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_NetworkGraphDecodeErrorZ_Err extends Result_NetworkGraphDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_NetworkGraphDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}