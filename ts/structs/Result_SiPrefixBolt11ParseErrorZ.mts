
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_SiPrefixBolt11ParseErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_SiPrefixBolt11ParseErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_SiPrefixBolt11ParseErrorZ {
		if (bindings.CResult_SiPrefixBolt11ParseErrorZ_is_ok(ptr)) {
			return new Result_SiPrefixBolt11ParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SiPrefixBolt11ParseErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_SiPrefixBolt11ParseErrorZ in the success state.
	 */
	public static constructor_ok(o: SiPrefix): Result_SiPrefixBolt11ParseErrorZ {
		const ret: bigint = bindings.CResult_SiPrefixBolt11ParseErrorZ_ok(o);
		const ret_hu_conv: Result_SiPrefixBolt11ParseErrorZ = Result_SiPrefixBolt11ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SiPrefixBolt11ParseErrorZ in the error state.
	 */
	public static constructor_err(e: Bolt11ParseError): Result_SiPrefixBolt11ParseErrorZ {
		const ret: bigint = bindings.CResult_SiPrefixBolt11ParseErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_SiPrefixBolt11ParseErrorZ = Result_SiPrefixBolt11ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_SiPrefixBolt11ParseErrorZ_is_ok(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CResult_SiPrefixBolt11ParseErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_SiPrefixBolt11ParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Result_SiPrefixBolt11ParseErrorZ {
		const ret: bigint = bindings.CResult_SiPrefixBolt11ParseErrorZ_clone(this.ptr);
		const ret_hu_conv: Result_SiPrefixBolt11ParseErrorZ = Result_SiPrefixBolt11ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
export class Result_SiPrefixBolt11ParseErrorZ_OK extends Result_SiPrefixBolt11ParseErrorZ {
	public res: SiPrefix;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		this.res = bindings.CResult_SiPrefixBolt11ParseErrorZ_get_ok(ptr);
	}
}
export class Result_SiPrefixBolt11ParseErrorZ_Err extends Result_SiPrefixBolt11ParseErrorZ {
	public err: Bolt11ParseError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_SiPrefixBolt11ParseErrorZ_get_err(ptr);
		const err_hu_conv: Bolt11ParseError = new Bolt11ParseError(null, err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}