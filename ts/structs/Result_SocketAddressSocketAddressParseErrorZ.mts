
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_SocketAddressSocketAddressParseErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_SocketAddressSocketAddressParseErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_SocketAddressSocketAddressParseErrorZ {
		if (bindings.CResult_SocketAddressSocketAddressParseErrorZ_is_ok(ptr)) {
			return new Result_SocketAddressSocketAddressParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SocketAddressSocketAddressParseErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ in the success state.
	 */
	public static constructor_ok(o: SocketAddress): Result_SocketAddressSocketAddressParseErrorZ {
		const ret: bigint = bindings.CResult_SocketAddressSocketAddressParseErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_SocketAddressSocketAddressParseErrorZ = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ in the error state.
	 */
	public static constructor_err(e: SocketAddressParseError): Result_SocketAddressSocketAddressParseErrorZ {
		const ret: bigint = bindings.CResult_SocketAddressSocketAddressParseErrorZ_err(e);
		const ret_hu_conv: Result_SocketAddressSocketAddressParseErrorZ = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_SocketAddressSocketAddressParseErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_SocketAddressSocketAddressParseErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_SocketAddressSocketAddressParseErrorZ {
		const ret: bigint = bindings.CResult_SocketAddressSocketAddressParseErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_SocketAddressSocketAddressParseErrorZ = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_SocketAddressSocketAddressParseErrorZ_OK extends Result_SocketAddressSocketAddressParseErrorZ {
	public res: SocketAddress;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_SocketAddressSocketAddressParseErrorZ_get_ok(ptr);
		const res_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_SocketAddressSocketAddressParseErrorZ_Err extends Result_SocketAddressSocketAddressParseErrorZ {
	public err: SocketAddressParseError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_SocketAddressSocketAddressParseErrorZ_get_err(ptr);
	}
}