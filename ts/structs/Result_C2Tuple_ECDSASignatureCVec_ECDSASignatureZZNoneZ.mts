
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ {
		if (bindings.CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_is_ok(ptr)) {
			return new Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ in the success state.
	 */
	public static constructor_ok(o: TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ): Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ {
		const ret: bigint = bindings.CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ = Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ in the error state.
	 */
	public static constructor_err(): Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ {
		const ret: bigint = bindings.CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_err();
		const ret_hu_conv: Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ = Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ {
		const ret: bigint = bindings.CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ = Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_OK extends Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ {
	public res: TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_get_ok(ptr);
		const res_hu_conv: TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ = new TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ_Err extends Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}