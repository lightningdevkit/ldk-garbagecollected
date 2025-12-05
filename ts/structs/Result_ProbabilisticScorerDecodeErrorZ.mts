
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_ProbabilisticScorerDecodeErrorZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_ProbabilisticScorerDecodeErrorZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_ProbabilisticScorerDecodeErrorZ {
		if (bindings.CResult_ProbabilisticScorerDecodeErrorZ_is_ok(ptr)) {
			return new Result_ProbabilisticScorerDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ProbabilisticScorerDecodeErrorZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_ProbabilisticScorerDecodeErrorZ in the success state.
	 */
	public static constructor_ok(o_decay_params: ProbabilisticScoringDecayParameters, o_network_graph: NetworkGraph, o_logger: Logger): Result_ProbabilisticScorerDecodeErrorZ {
		const ret: bigint = bindings.CResult_ProbabilisticScorerDecodeErrorZ_ok(bindings.ProbabilisticScorer_new(CommonBase.get_ptr_of(o_decay_params), CommonBase.get_ptr_of(o_network_graph), CommonBase.get_ptr_of(o_logger)));
		const ret_hu_conv: Result_ProbabilisticScorerDecodeErrorZ = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		;
		CommonBase.add_ref_from(ret_hu_conv, o_network_graph);
		CommonBase.add_ref_from(ret_hu_conv, o_logger);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ProbabilisticScorerDecodeErrorZ in the error state.
	 */
	public static constructor_err(e: DecodeError): Result_ProbabilisticScorerDecodeErrorZ {
		const ret: bigint = bindings.CResult_ProbabilisticScorerDecodeErrorZ_err(CommonBase.get_ptr_of(e));
		const ret_hu_conv: Result_ProbabilisticScorerDecodeErrorZ = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_ProbabilisticScorerDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_ProbabilisticScorerDecodeErrorZ_OK extends Result_ProbabilisticScorerDecodeErrorZ {
	public res: ProbabilisticScorer;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_ProbabilisticScorerDecodeErrorZ_get_ok(ptr);
		const res_hu_conv: ProbabilisticScorer = new ProbabilisticScorer(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_ProbabilisticScorerDecodeErrorZ_Err extends Result_ProbabilisticScorerDecodeErrorZ {
	public err: DecodeError;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const err: bigint = bindings.CResult_ProbabilisticScorerDecodeErrorZ_get_err(ptr);
		const err_hu_conv: DecodeError = DecodeError.constr_from_ptr(err);
		CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}