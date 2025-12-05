
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CVec_u8ZPeerHandleErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CVec_u8ZPeerHandleErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CVec_u8ZPeerHandleErrorZ {
		if (bindings.CResult_CVec_u8ZPeerHandleErrorZ_is_ok(ptr)) {
			return new Result_CVec_u8ZPeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_u8ZPeerHandleErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ in the success state.
	 */
	public static constructor_ok(o: Uint8Array): Result_CVec_u8ZPeerHandleErrorZ {
		const ret: bigint = bindings.CResult_CVec_u8ZPeerHandleErrorZ_ok(bindings.encodeUint8Array(o));
		const ret_hu_conv: Result_CVec_u8ZPeerHandleErrorZ = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ in the error state.
	 */
	public static constructor_err(e: PeerHandleError): Result_CVec_u8ZPeerHandleErrorZ {
		const ret: bigint = bindings.CResult_CVec_u8ZPeerHandleErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_CVec_u8ZPeerHandleErrorZ = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CVec_u8ZPeerHandleErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CVec_u8ZPeerHandleErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CVec_u8ZPeerHandleErrorZ {
		const ret: bigint = bindings.CResult_CVec_u8ZPeerHandleErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_CVec_u8ZPeerHandleErrorZ = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CVec_u8ZPeerHandleErrorZ_OK extends Result_CVec_u8ZPeerHandleErrorZ {
	public res: Uint8Array;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: number = bindings.CResult_CVec_u8ZPeerHandleErrorZ_get_ok(ptr);
		const res_conv: Uint8Array = bindings.decodeUint8Array(res);
		this.res = res_conv;
	}
}
export class Result_CVec_u8ZPeerHandleErrorZ_Err extends Result_CVec_u8ZPeerHandleErrorZ {
	public err: PeerHandleError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_CVec_u8ZPeerHandleErrorZ_get_err(ptr);
		const err_hu_conv: PeerHandleError = new PeerHandleError(null, err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}