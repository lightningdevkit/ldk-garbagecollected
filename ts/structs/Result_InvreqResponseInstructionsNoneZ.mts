
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_InvreqResponseInstructionsNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_InvreqResponseInstructionsNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_InvreqResponseInstructionsNoneZ {
		if (bindings.CResult_InvreqResponseInstructionsNoneZ_is_ok(ptr)) {
			return new Result_InvreqResponseInstructionsNoneZ_OK(null, ptr);
		} else {
			return new Result_InvreqResponseInstructionsNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_InvreqResponseInstructionsNoneZ in the success state.
	 */
	public static constructor_ok(o: InvreqResponseInstructions): Result_InvreqResponseInstructionsNoneZ {
		const ret: bigint = bindings.CResult_InvreqResponseInstructionsNoneZ_ok(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Result_InvreqResponseInstructionsNoneZ = Result_InvreqResponseInstructionsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InvreqResponseInstructionsNoneZ in the error state.
	 */
	public static constructor_err(): Result_InvreqResponseInstructionsNoneZ {
		const ret: bigint = bindings.CResult_InvreqResponseInstructionsNoneZ_err();
		const ret_hu_conv: Result_InvreqResponseInstructionsNoneZ = Result_InvreqResponseInstructionsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_InvreqResponseInstructionsNoneZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_InvreqResponseInstructionsNoneZ_OK extends Result_InvreqResponseInstructionsNoneZ {
	public res: InvreqResponseInstructions;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_InvreqResponseInstructionsNoneZ_get_ok(ptr);
		const res_hu_conv: InvreqResponseInstructions = InvreqResponseInstructions.constr_from_ptr(res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_InvreqResponseInstructionsNoneZ_Err extends Result_InvreqResponseInstructionsNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}