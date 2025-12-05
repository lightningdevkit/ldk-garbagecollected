

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of ScoreLookUp */
export interface ScoreLookUpInterface {
	/**Returns the fee in msats willing to be paid to avoid routing `send_amt_msat` through the
	 * given channel in the direction from `source` to `target`.
	 * 
	 * The channel's capacity (less any other MPP parts that are also being considered for use in
	 * the same payment) is given by `capacity_msat`. It may be determined from various sources
	 * such as a chain data, network gossip, or invoice hints. For invoice hints, a capacity near
	 * [`u64::max_value`] is given to indicate sufficient capacity for the invoice's full amount.
	 * Thus, implementations should be overflow-safe.
	 */
	channel_penalty_msat(candidate: CandidateRouteHop, usage: ChannelUsage, score_params: ProbabilisticScoringFeeParameters): bigint;
}

class LDKScoreLookUpHolder {
	held: ScoreLookUp|null = null;
}

/**
 * An interface used to score payment channels for path finding.
 * 
 * `ScoreLookUp` is used to determine the penalty for a given channel.
 * 
 * Scoring is in terms of fees willing to be paid in order to avoid routing through a channel.
 */
export class ScoreLookUp extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKScoreLookUp|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ScoreLookUp_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of ScoreLookUp from a given implementation */
	public static new_impl(arg: ScoreLookUpInterface): ScoreLookUp {
		const impl_holder: LDKScoreLookUpHolder = new LDKScoreLookUpHolder();
		let structImplementation = {
			channel_penalty_msat (candidate: bigint, usage: bigint, score_params: bigint): bigint {
				const candidate_hu_conv: CandidateRouteHop = CandidateRouteHop.constr_from_ptr(candidate);
				const usage_hu_conv: ChannelUsage = new ChannelUsage(null, usage);
				CommonBase.add_ref_from(usage_hu_conv, this);
				const score_params_hu_conv: ProbabilisticScoringFeeParameters = new ProbabilisticScoringFeeParameters(null, score_params);
				const ret: bigint = arg.channel_penalty_msat(candidate_hu_conv, usage_hu_conv, score_params_hu_conv);
				return ret;
			},
		} as bindings.LDKScoreLookUp;
		const ptr_idx: [bigint, number] = bindings.LDKScoreLookUp_new(structImplementation);

		impl_holder.held = new ScoreLookUp(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns the fee in msats willing to be paid to avoid routing `send_amt_msat` through the
	 * given channel in the direction from `source` to `target`.
	 * 
	 * The channel's capacity (less any other MPP parts that are also being considered for use in
	 * the same payment) is given by `capacity_msat`. It may be determined from various sources
	 * such as a chain data, network gossip, or invoice hints. For invoice hints, a capacity near
	 * [`u64::max_value`] is given to indicate sufficient capacity for the invoice's full amount.
	 * Thus, implementations should be overflow-safe.
	 */
	public channel_penalty_msat(candidate: CandidateRouteHop, usage: ChannelUsage, score_params: ProbabilisticScoringFeeParameters): bigint {
		const ret: bigint = bindings.ScoreLookUp_channel_penalty_msat(this.ptr, CommonBase.get_ptr_of(candidate), CommonBase.get_ptr_of(usage), CommonBase.get_ptr_of(score_params));
		return ret;
	}

}
