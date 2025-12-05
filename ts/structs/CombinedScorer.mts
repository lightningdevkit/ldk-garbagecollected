
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A probabilistic scorer that combines local and external information to score channels. This scorer is
 * shadow-tracking local only scores, so that it becomes possible to cleanly merge external scores when they become
 * available.
 * 
 * This is useful for nodes that have a limited local view of the network and need to augment their view with scores
 * from an external source to improve payment reliability. The external source may use something like background
 * probing to gather a more complete view of the network. Merging reduces the likelihood of losing unique local data on
 * particular channels.
 * 
 * Note that only the locally acquired data is persisted. After a restart, the external scores will be lost and must be
 * resupplied.
 */
export class CombinedScorer extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CombinedScorer_free);
	}

	/**
	 * Create a new combined scorer with the given local scorer.
	 */
	public static constructor_new(local_scorer_decay_params: ProbabilisticScoringDecayParameters, local_scorer_network_graph: NetworkGraph, local_scorer_logger: Logger): CombinedScorer {
		const ret: bigint = bindings.CombinedScorer_new(bindings.ProbabilisticScorer_new(CommonBase.get_ptr_of(local_scorer_decay_params), CommonBase.get_ptr_of(local_scorer_network_graph), CommonBase.get_ptr_of(local_scorer_logger)));
		const ret_hu_conv: CombinedScorer = new CombinedScorer(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		;
		CommonBase.add_ref_from(ret_hu_conv, local_scorer_network_graph);
		CommonBase.add_ref_from(ret_hu_conv, local_scorer_logger);
		return ret_hu_conv;
	}

	/**
	 * Merge external channel liquidity information into the scorer.
	 */
	public merge(external_scores: ChannelLiquidities, duration_since_epoch: bigint): void {
		bindings.CombinedScorer_merge(this.ptr, CommonBase.get_ptr_of(external_scores), duration_since_epoch);
	}

	/**
	 * Overwrite the scorer state with the given external scores.
	 */
	public set_scores(external_scores: ChannelLiquidities): void {
		bindings.CombinedScorer_set_scores(this.ptr, CommonBase.get_ptr_of(external_scores));
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public as_ScoreLookUp(): ScoreLookUp {
		const ret: bigint = bindings.CombinedScorer_as_ScoreLookUp(this.ptr);
		const ret_hu_conv: ScoreLookUp = new ScoreLookUp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public as_ScoreUpdate(): ScoreUpdate {
		const ret: bigint = bindings.CombinedScorer_as_ScoreUpdate(this.ptr);
		const ret_hu_conv: ScoreUpdate = new ScoreUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the CombinedScorer object into a byte array which can be read by CombinedScorer_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.CombinedScorer_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
