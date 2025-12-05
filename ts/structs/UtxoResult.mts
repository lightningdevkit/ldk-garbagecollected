
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The result of a [`UtxoLookup::get_utxo`] call. A call may resolve either synchronously,
 * returning the `Sync` variant, or asynchronously, returning an [`UtxoFuture`] in the `Async`
 * variant.
 */
export class UtxoResult extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.UtxoResult_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): UtxoResult {
		const raw_ty: number = bindings.LDKUtxoResult_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new UtxoResult_Sync(ptr);
			case 1: return new UtxoResult_Async(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UtxoResult_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UtxoResult
	 */
	public clone(): UtxoResult {
		const ret: bigint = bindings.UtxoResult_clone(this.ptr);
		const ret_hu_conv: UtxoResult = UtxoResult.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Sync-variant UtxoResult
	 */
	public static constructor_sync(a: Result_TxOutUtxoLookupErrorZ): UtxoResult {
		const ret: bigint = bindings.UtxoResult_sync(CommonBase.get_ptr_of(a));
		const ret_hu_conv: UtxoResult = UtxoResult.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Async-variant UtxoResult
	 */
	public static constructor_async(a: UtxoFuture): UtxoResult {
		const ret: bigint = bindings.UtxoResult_async(CommonBase.get_ptr_of(a));
		const ret_hu_conv: UtxoResult = UtxoResult.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A UtxoResult of type Sync */
export class UtxoResult_Sync extends UtxoResult {
	public sync: Result_TxOutUtxoLookupErrorZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const sync: bigint = bindings.LDKUtxoResult_Sync_get_sync(ptr);
		const sync_hu_conv: Result_TxOutUtxoLookupErrorZ = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(sync);
		this.sync = sync_hu_conv;
	}
}
/** A UtxoResult of type Async */
export class UtxoResult_Async extends UtxoResult {
	public async: UtxoFuture;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const async: bigint = bindings.LDKUtxoResult_Async_get_async(ptr);
		const async_hu_conv: UtxoFuture = new UtxoFuture(null, async);
			CommonBase.add_ref_from(async_hu_conv, this);
		this.async = async_hu_conv;
	}
}
