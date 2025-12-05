
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_OfferNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_OfferNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_OfferNoneZ {
		if (bindings.CResult_OfferNoneZ_is_ok(ptr)) {
			return new Result_OfferNoneZ_OK(null, ptr);
		} else {
			return new Result_OfferNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_OfferNoneZ in the success state.
	 */
	public static constructor_ok(o: Offer): Result_OfferNoneZ {
		const ret: bigint = bindings.CResult_OfferNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_OfferNoneZ = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OfferNoneZ in the error state.
	 */
	public static constructor_err(): Result_OfferNoneZ {
		const ret: bigint = bindings.CResult_OfferNoneZ_err();
		const ret_hu_conv: Result_OfferNoneZ = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_OfferNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_OfferNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_OfferNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_OfferNoneZ {
		const ret: bigint = bindings.CResult_OfferNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_OfferNoneZ = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_OfferNoneZ_OK extends Result_OfferNoneZ {
	public res: Offer;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_OfferNoneZ_get_ok(ptr);
		const res_hu_conv: Offer = new Offer(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_OfferNoneZ_Err extends Result_OfferNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}