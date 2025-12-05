
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_CoinSelectionNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_CoinSelectionNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_CoinSelectionNoneZ {
		if (bindings.CResult_CoinSelectionNoneZ_is_ok(ptr)) {
			return new Result_CoinSelectionNoneZ_OK(null, ptr);
		} else {
			return new Result_CoinSelectionNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_CoinSelectionNoneZ in the success state.
	 */
	public static constructor_ok(o: CoinSelection): Result_CoinSelectionNoneZ {
		const ret: bigint = bindings.CResult_CoinSelectionNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_CoinSelectionNoneZ = Result_CoinSelectionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CoinSelectionNoneZ in the error state.
	 */
	public static constructor_err(): Result_CoinSelectionNoneZ {
		const ret: bigint = bindings.CResult_CoinSelectionNoneZ_err();
		const ret_hu_conv: Result_CoinSelectionNoneZ = Result_CoinSelectionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_CoinSelectionNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_CoinSelectionNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_CoinSelectionNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_CoinSelectionNoneZ {
		const ret: bigint = bindings.CResult_CoinSelectionNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_CoinSelectionNoneZ = Result_CoinSelectionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_CoinSelectionNoneZ_OK extends Result_CoinSelectionNoneZ {
	public res: CoinSelection;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_CoinSelectionNoneZ_get_ok(ptr);
		const res_hu_conv: CoinSelection = new CoinSelection(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_CoinSelectionNoneZ_Err extends Result_CoinSelectionNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}