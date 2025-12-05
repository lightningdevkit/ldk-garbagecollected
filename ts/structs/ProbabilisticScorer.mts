
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * [`ScoreLookUp`] implementation using channel success probability distributions.
 * 
 * Channels are tracked with upper and lower liquidity bounds - when an HTLC fails at a channel,
 * we learn that the upper-bound on the available liquidity is lower than the amount of the HTLC.
 * When a payment is forwarded through a channel (but fails later in the route), we learn the
 * lower-bound on the channel's available liquidity must be at least the value of the HTLC.
 * 
 * These bounds are then used to determine a success probability using the formula from
 * Optimally Reliable & Cheap Payment Flows on the Lightning Network* by Rene Pickhardt
 * and Stefan Richter [[1]] (i.e. `(upper_bound - payment_amount) / (upper_bound - lower_bound)`).
 * 
 * This probability is combined with the [`liquidity_penalty_multiplier_msat`] and
 * [`liquidity_penalty_amount_multiplier_msat`] parameters to calculate a concrete penalty in
 * milli-satoshis. The penalties, when added across all hops, have the property of being linear in
 * terms of the entire path's success probability. This allows the router to directly compare
 * penalties for different paths. See the documentation of those parameters for the exact formulas.
 * 
 * The liquidity bounds are decayed by halving them every [`liquidity_offset_half_life`].
 * 
 * Further, we track the history of our upper and lower liquidity bounds for each channel,
 * allowing us to assign a second penalty (using [`historical_liquidity_penalty_multiplier_msat`]
 * and [`historical_liquidity_penalty_amount_multiplier_msat`]) based on the same probability
 * formula, but using the history of a channel rather than our latest estimates for the liquidity
 * bounds.
 * 
 * [1]: https://arxiv.org/abs/2107.05322
 * [`liquidity_penalty_multiplier_msat`]: ProbabilisticScoringFeeParameters::liquidity_penalty_multiplier_msat
 * [`liquidity_penalty_amount_multiplier_msat`]: ProbabilisticScoringFeeParameters::liquidity_penalty_amount_multiplier_msat
 * [`liquidity_offset_half_life`]: ProbabilisticScoringDecayParameters::liquidity_offset_half_life
 * [`historical_liquidity_penalty_multiplier_msat`]: ProbabilisticScoringFeeParameters::historical_liquidity_penalty_multiplier_msat
 * [`historical_liquidity_penalty_amount_multiplier_msat`]: ProbabilisticScoringFeeParameters::historical_liquidity_penalty_amount_multiplier_msat
 */
export class ProbabilisticScorer extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ProbabilisticScorer_free);
	}

	/**
	 * Creates a new scorer using the given scoring parameters for sending payments from a node
	 * through a network graph.
	 */
	public static constructor_new(decay_params: ProbabilisticScoringDecayParameters, network_graph: NetworkGraph, logger: Logger): ProbabilisticScorer {
		const ret: bigint = bindings.ProbabilisticScorer_new(CommonBase.get_ptr_of(decay_params), CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: ProbabilisticScorer = new ProbabilisticScorer(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Dump the contents of this scorer into the configured logger.
	 * 
	 * Note that this writes roughly one line per channel for which we have a liquidity estimate,
	 * which may be a substantial amount of log output.
	 */
	public debug_log_liquidity_stats(): void {
		bindings.ProbabilisticScorer_debug_log_liquidity_stats(this.ptr);
	}

	/**
	 * Query the estimated minimum and maximum liquidity available for sending a payment over the
	 * channel with `scid` towards the given `target` node.
	 */
	public estimated_channel_liquidity_range(scid: bigint, target: NodeId): Option_C2Tuple_u64u64ZZ {
		const ret: bigint = bindings.ProbabilisticScorer_estimated_channel_liquidity_range(this.ptr, scid, CommonBase.get_ptr_of(target));
		const ret_hu_conv: Option_C2Tuple_u64u64ZZ = Option_C2Tuple_u64u64ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Query the historical estimated minimum and maximum liquidity available for sending a
	 * payment over the channel with `scid` towards the given `target` node.
	 * 
	 * Returns two sets of 32 buckets. The first set describes the lower-bound liquidity history,
	 * the second set describes the upper-bound liquidity history. Each bucket describes the
	 * relative frequency at which we've seen a liquidity bound in the bucket's range relative to
	 * the channel's total capacity, on an arbitrary scale. Because the values are slowly decayed,
	 * more recent data points are weighted more heavily than older datapoints.
	 * 
	 * Note that the range of each bucket varies by its location to provide more granular results
	 * at the edges of a channel's capacity, where it is more likely to sit.
	 * 
	 * When scoring, the estimated probability that an upper-/lower-bound lies in a given bucket
	 * is calculated by dividing that bucket's value with the total value of all buckets.
	 * 
	 * For example, using a lower bucket count for illustrative purposes, a value of
	 * `[0, 0, 0, ..., 0, 32]` indicates that we believe the probability of a bound being very
	 * close to the channel's capacity to be 100%, and have never (recently) seen it in any other
	 * bucket. A value of `[31, 0, 0, ..., 0, 0, 32]` indicates we've seen the bound being both
	 * in the top and bottom bucket, and roughly with similar (recent) frequency.
	 * 
	 * Because the datapoints are decayed slowly over time, values will eventually return to
	 * `Some(([0; 32], [0; 32]))` or `None` if no data remains for a channel.
	 * 
	 * In order to fetch a single success probability from the buckets provided here, as used in
	 * the scoring model, see [`Self::historical_estimated_payment_success_probability`].
	 */
	public historical_estimated_channel_liquidity_probabilities(scid: bigint, target: NodeId): Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ {
		const ret: bigint = bindings.ProbabilisticScorer_historical_estimated_channel_liquidity_probabilities(this.ptr, scid, CommonBase.get_ptr_of(target));
		const ret_hu_conv: Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ = Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Query the probability of payment success sending the given `amount_msat` over the channel
	 * with `scid` towards the given `target` node, based on the historical estimated liquidity
	 * bounds.
	 * 
	 * Returns `None` if:
	 * - the given channel is not in the network graph, the provided `target` is not a party to
	 * the channel, or we don't have forwarding parameters for either direction in the channel.
	 * - `allow_fallback_estimation` is *not* set and there is no (or insufficient) historical
	 * data for the given channel.
	 * 
	 * These are the same bounds as returned by
	 * [`Self::historical_estimated_channel_liquidity_probabilities`] (but not those returned by
	 * [`Self::estimated_channel_liquidity_range`]).
	 */
	public historical_estimated_payment_success_probability(scid: bigint, target: NodeId, amount_msat: bigint, params: ProbabilisticScoringFeeParameters, allow_fallback_estimation: boolean): Option_f64Z {
		const ret: bigint = bindings.ProbabilisticScorer_historical_estimated_payment_success_probability(this.ptr, scid, CommonBase.get_ptr_of(target), amount_msat, CommonBase.get_ptr_of(params), allow_fallback_estimation);
		const ret_hu_conv: Option_f64Z = Option_f64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Query the probability of payment success sending the given `amount_msat` over the channel
	 * with `scid` towards the given `target` node, based on the live estimated liquidity bounds.
	 * 
	 * This will return `Some` for any channel which is present in the [`NetworkGraph`], including
	 * if we have no bound information beside the channel's capacity.
	 */
	public live_estimated_payment_success_probability(scid: bigint, target: NodeId, amount_msat: bigint, params: ProbabilisticScoringFeeParameters): Option_f64Z {
		const ret: bigint = bindings.ProbabilisticScorer_live_estimated_payment_success_probability(this.ptr, scid, CommonBase.get_ptr_of(target), amount_msat, CommonBase.get_ptr_of(params));
		const ret_hu_conv: Option_f64Z = Option_f64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Overwrite the scorer state with the given external scores.
	 */
	public set_scores(external_scores: ChannelLiquidities): void {
		bindings.ProbabilisticScorer_set_scores(this.ptr, CommonBase.get_ptr_of(external_scores));
	}

	/**
	 * Returns the current scores.
	 */
	public scores(): ChannelLiquidities {
		const ret: bigint = bindings.ProbabilisticScorer_scores(this.ptr);
		const ret_hu_conv: ChannelLiquidities = new ChannelLiquidities(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public as_ScoreLookUp(): ScoreLookUp {
		const ret: bigint = bindings.ProbabilisticScorer_as_ScoreLookUp(this.ptr);
		const ret_hu_conv: ScoreLookUp = new ScoreLookUp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public as_ScoreUpdate(): ScoreUpdate {
		const ret: bigint = bindings.ProbabilisticScorer_as_ScoreUpdate(this.ptr);
		const ret_hu_conv: ScoreUpdate = new ScoreUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public as_Score(): Score {
		const ret: bigint = bindings.ProbabilisticScorer_as_Score(this.ptr);
		const ret_hu_conv: Score = new Score(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ProbabilisticScorer object into a byte array which can be read by ProbabilisticScorer_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ProbabilisticScorer_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ProbabilisticScorer from a byte array, created by ProbabilisticScorer_write
	 */
	public static constructor_read(ser: Uint8Array, arg_a: ProbabilisticScoringDecayParameters, arg_b: NetworkGraph, arg_c: Logger): Result_ProbabilisticScorerDecodeErrorZ {
		const ret: bigint = bindings.ProbabilisticScorer_read(bindings.encodeUint8Array(ser), CommonBase.get_ptr_of(arg_a), CommonBase.get_ptr_of(arg_b), CommonBase.get_ptr_of(arg_c));
		const ret_hu_conv: Result_ProbabilisticScorerDecodeErrorZ = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, arg_b);
		CommonBase.add_ref_from(ret_hu_conv, arg_c);
		return ret_hu_conv;
	}

}
