
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		if (bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_is_ok(ptr)) {
			return new Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_OK(null, ptr);
		} else {
			return new Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ in the success state.
	 */
	public static constructor_ok(o: ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ): Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		const ret: bigint = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ in the error state.
	 */
	public static constructor_err(e: SendError): Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		const ret: bigint = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		const ret: bigint = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_OK extends Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
	public res: ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_get_ok(ptr);
		const res_hu_conv: ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_Err extends Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
	public err: SendError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_get_err(ptr);
		const err_hu_conv: SendError = SendError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}