
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_TrustedCommitmentTransactionNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_TrustedCommitmentTransactionNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_TrustedCommitmentTransactionNoneZ {
		if (bindings.CResult_TrustedCommitmentTransactionNoneZ_is_ok(ptr)) {
			return new Result_TrustedCommitmentTransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TrustedCommitmentTransactionNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_TrustedCommitmentTransactionNoneZ in the success state.
	 */
	public static constructor_ok(o: TrustedCommitmentTransaction): Result_TrustedCommitmentTransactionNoneZ {
		const ret: bigint = bindings.CResult_TrustedCommitmentTransactionNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_TrustedCommitmentTransactionNoneZ = Result_TrustedCommitmentTransactionNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, o);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, o is reset to null and is now a dummy object.
		CommonBase.set_null_skip_free(o);;
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TrustedCommitmentTransactionNoneZ in the error state.
	 */
	public static constructor_err(): Result_TrustedCommitmentTransactionNoneZ {
		const ret: bigint = bindings.CResult_TrustedCommitmentTransactionNoneZ_err();
		const ret_hu_conv: Result_TrustedCommitmentTransactionNoneZ = Result_TrustedCommitmentTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_TrustedCommitmentTransactionNoneZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_TrustedCommitmentTransactionNoneZ_OK extends Result_TrustedCommitmentTransactionNoneZ {
	public res: TrustedCommitmentTransaction;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_TrustedCommitmentTransactionNoneZ_get_ok(ptr);
		const res_hu_conv: TrustedCommitmentTransaction = new TrustedCommitmentTransaction(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_TrustedCommitmentTransactionNoneZ_Err extends Result_TrustedCommitmentTransactionNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}