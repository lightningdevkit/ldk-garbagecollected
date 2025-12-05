
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_TxOutUtxoLookupErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_TxOutUtxoLookupErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_TxOutUtxoLookupErrorZ {
		if (bindings.CResult_TxOutUtxoLookupErrorZ_is_ok(ptr)) {
			return new Result_TxOutUtxoLookupErrorZ_OK(null, ptr);
		} else {
			return new Result_TxOutUtxoLookupErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ in the success state.
	 */
	public static constructor_ok(o: TxOut): Result_TxOutUtxoLookupErrorZ {
		const ret: bigint = bindings.CResult_TxOutUtxoLookupErrorZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_TxOutUtxoLookupErrorZ = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ in the error state.
	 */
	public static constructor_err(e: UtxoLookupError): Result_TxOutUtxoLookupErrorZ {
		const ret: bigint = bindings.CResult_TxOutUtxoLookupErrorZ_err(e);
		const ret_hu_conv: Result_TxOutUtxoLookupErrorZ = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_TxOutUtxoLookupErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_TxOutUtxoLookupErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_TxOutUtxoLookupErrorZ {
		const ret: bigint = bindings.CResult_TxOutUtxoLookupErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_TxOutUtxoLookupErrorZ = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_TxOutUtxoLookupErrorZ_OK extends Result_TxOutUtxoLookupErrorZ {
	public res: TxOut;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_TxOutUtxoLookupErrorZ_get_ok(ptr);
		const res_conv: TxOut = new TxOut(null, res);
		this.res = res_conv;
	}
}
export class Result_TxOutUtxoLookupErrorZ_Err extends Result_TxOutUtxoLookupErrorZ {
	public err: UtxoLookupError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.err = bindings.CResult_TxOutUtxoLookupErrorZ_get_err(ptr);
	}
}