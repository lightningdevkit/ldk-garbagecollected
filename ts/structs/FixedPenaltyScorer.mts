
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * [`ScoreLookUp`] implementation that uses a fixed penalty.
 */
export class FixedPenaltyScorer extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.FixedPenaltyScorer_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.FixedPenaltyScorer_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the FixedPenaltyScorer
	 */
	public clone(): FixedPenaltyScorer {
		const ret: bigint = bindings.FixedPenaltyScorer_clone(this.ptr);
		const ret_hu_conv: FixedPenaltyScorer = new FixedPenaltyScorer(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new scorer using `penalty_msat`.
	 */
	public static constructor_with_penalty(penalty_msat: bigint): FixedPenaltyScorer {
		const ret: bigint = bindings.FixedPenaltyScorer_with_penalty(penalty_msat);
		const ret_hu_conv: FixedPenaltyScorer = new FixedPenaltyScorer(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public as_ScoreLookUp(): ScoreLookUp {
		const ret: bigint = bindings.FixedPenaltyScorer_as_ScoreLookUp(this.ptr);
		const ret_hu_conv: ScoreLookUp = new ScoreLookUp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public as_ScoreUpdate(): ScoreUpdate {
		const ret: bigint = bindings.FixedPenaltyScorer_as_ScoreUpdate(this.ptr);
		const ret_hu_conv: ScoreUpdate = new ScoreUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the FixedPenaltyScorer object into a byte array which can be read by FixedPenaltyScorer_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.FixedPenaltyScorer_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a FixedPenaltyScorer from a byte array, created by FixedPenaltyScorer_write
	 */
	public static constructor_read(ser: Uint8Array, arg: bigint): Result_FixedPenaltyScorerDecodeErrorZ {
		const ret: bigint = bindings.FixedPenaltyScorer_read(bindings.encodeUint8Array(ser), arg);
		const ret_hu_conv: Result_FixedPenaltyScorerDecodeErrorZ = Result_FixedPenaltyScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
