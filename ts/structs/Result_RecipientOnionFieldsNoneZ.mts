
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_RecipientOnionFieldsNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_RecipientOnionFieldsNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_RecipientOnionFieldsNoneZ {
		if (bindings.CResult_RecipientOnionFieldsNoneZ_is_ok(ptr)) {
			return new Result_RecipientOnionFieldsNoneZ_OK(null, ptr);
		} else {
			return new Result_RecipientOnionFieldsNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_RecipientOnionFieldsNoneZ in the success state.
	 */
	public static constructor_ok(o: RecipientOnionFields): Result_RecipientOnionFieldsNoneZ {
		const ret: bigint = bindings.CResult_RecipientOnionFieldsNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_RecipientOnionFieldsNoneZ = Result_RecipientOnionFieldsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RecipientOnionFieldsNoneZ in the error state.
	 */
	public static constructor_err(): Result_RecipientOnionFieldsNoneZ {
		const ret: bigint = bindings.CResult_RecipientOnionFieldsNoneZ_err();
		const ret_hu_conv: Result_RecipientOnionFieldsNoneZ = Result_RecipientOnionFieldsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_RecipientOnionFieldsNoneZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_RecipientOnionFieldsNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_RecipientOnionFieldsNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_RecipientOnionFieldsNoneZ {
		const ret: bigint = bindings.CResult_RecipientOnionFieldsNoneZ_clone(this.ptr);
		const ret_hu_conv: Result_RecipientOnionFieldsNoneZ = Result_RecipientOnionFieldsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_RecipientOnionFieldsNoneZ_OK extends Result_RecipientOnionFieldsNoneZ {
	public res: RecipientOnionFields;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_RecipientOnionFieldsNoneZ_get_ok(ptr);
		const res_hu_conv: RecipientOnionFields = new RecipientOnionFields(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_RecipientOnionFieldsNoneZ_Err extends Result_RecipientOnionFieldsNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}