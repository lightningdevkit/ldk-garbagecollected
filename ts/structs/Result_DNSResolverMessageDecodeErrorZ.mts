
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_DNSResolverMessageDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_DNSResolverMessageDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_DNSResolverMessageDecodeErrorZ {
		if (bindings.CResult_DNSResolverMessageDecodeErrorZ_is_ok(ptr)) {
			return new Result_DNSResolverMessageDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_DNSResolverMessageDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_DNSResolverMessageDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o: DNSResolverMessage): Result_DNSResolverMessageDecodeErrorZ {
		const ret: bigint = bindings.CResult_DNSResolverMessageDecodeErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_DNSResolverMessageDecodeErrorZ = Result_DNSResolverMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_DNSResolverMessageDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_DNSResolverMessageDecodeErrorZ {
		const ret: bigint = bindings.CResult_DNSResolverMessageDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_DNSResolverMessageDecodeErrorZ = Result_DNSResolverMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_DNSResolverMessageDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_DNSResolverMessageDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_DNSResolverMessageDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_DNSResolverMessageDecodeErrorZ {
		const ret: bigint = bindings.CResult_DNSResolverMessageDecodeErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_DNSResolverMessageDecodeErrorZ = Result_DNSResolverMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_DNSResolverMessageDecodeErrorZ_OK extends Result_DNSResolverMessageDecodeErrorZ {
	public res: DNSResolverMessage;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_DNSResolverMessageDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: DNSResolverMessage = DNSResolverMessage.constr_from_ptr(res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_DNSResolverMessageDecodeErrorZ_Err extends Result_DNSResolverMessageDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_DNSResolverMessageDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}