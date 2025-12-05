
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Parameters for configuring [`ProbabilisticScorer`].
 * 
 * Used to configure decay parameters that are static throughout the lifetime of the scorer.
 * these decay parameters affect the score of the channel penalty and are not changed on a
 * per-route penalty cost call.
 */
export class ProbabilisticScoringDecayParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ProbabilisticScoringDecayParameters_free);
	}

	/**
	 * If we aren't learning any new datapoints for a channel, the historical liquidity bounds
	 * tracking can simply live on with increasingly stale data. Instead, when a channel has not
	 * seen a liquidity estimate update for this amount of time, the historical datapoints are
	 * decayed by half.
	 * For an example of historical_no_updates_half_life being used see [`historical_estimated_channel_liquidity_probabilities`]
	 * 
	 * Note that after 16 or more half lives all historical data will be completely gone.
	 * 
	 * Default value: 14 days
	 * 
	 * [`historical_estimated_channel_liquidity_probabilities`]: ProbabilisticScorer::historical_estimated_channel_liquidity_probabilities
	 */
	public get_historical_no_updates_half_life(): bigint {
		const ret: bigint = bindings.ProbabilisticScoringDecayParameters_get_historical_no_updates_half_life(this.ptr);
		return ret;
	}

	/**
	 * If we aren't learning any new datapoints for a channel, the historical liquidity bounds
	 * tracking can simply live on with increasingly stale data. Instead, when a channel has not
	 * seen a liquidity estimate update for this amount of time, the historical datapoints are
	 * decayed by half.
	 * For an example of historical_no_updates_half_life being used see [`historical_estimated_channel_liquidity_probabilities`]
	 * 
	 * Note that after 16 or more half lives all historical data will be completely gone.
	 * 
	 * Default value: 14 days
	 * 
	 * [`historical_estimated_channel_liquidity_probabilities`]: ProbabilisticScorer::historical_estimated_channel_liquidity_probabilities
	 */
	public set_historical_no_updates_half_life(val: bigint): void {
		bindings.ProbabilisticScoringDecayParameters_set_historical_no_updates_half_life(this.ptr, val);
	}

	/**
	 * Whenever this amount of time elapses since the last update to a channel's liquidity bounds,
	 * the distance from the bounds to \"zero\" is cut in half. In other words, the lower-bound on
	 * the available liquidity is halved and the upper-bound moves half-way to the channel's total
	 * capacity.
	 * 
	 * Because halving the liquidity bounds grows the uncertainty on the channel's liquidity,
	 * the penalty for an amount within the new bounds may change. See the [`ProbabilisticScorer`]
	 * struct documentation for more info on the way the liquidity bounds are used.
	 * 
	 * For example, if the channel's capacity is 1 million sats, and the current upper and lower
	 * liquidity bounds are 200,000 sats and 600,000 sats, after this amount of time the upper
	 * and lower liquidity bounds will be decayed to 100,000 and 800,000 sats.
	 * 
	 * Default value: 30 minutes
	 * 
	 * # Note
	 * 
	 * When not built with the `std` feature, time will never elapse. Therefore, the channel
	 * liquidity knowledge will never decay except when the bounds cross.
	 */
	public get_liquidity_offset_half_life(): bigint {
		const ret: bigint = bindings.ProbabilisticScoringDecayParameters_get_liquidity_offset_half_life(this.ptr);
		return ret;
	}

	/**
	 * Whenever this amount of time elapses since the last update to a channel's liquidity bounds,
	 * the distance from the bounds to \"zero\" is cut in half. In other words, the lower-bound on
	 * the available liquidity is halved and the upper-bound moves half-way to the channel's total
	 * capacity.
	 * 
	 * Because halving the liquidity bounds grows the uncertainty on the channel's liquidity,
	 * the penalty for an amount within the new bounds may change. See the [`ProbabilisticScorer`]
	 * struct documentation for more info on the way the liquidity bounds are used.
	 * 
	 * For example, if the channel's capacity is 1 million sats, and the current upper and lower
	 * liquidity bounds are 200,000 sats and 600,000 sats, after this amount of time the upper
	 * and lower liquidity bounds will be decayed to 100,000 and 800,000 sats.
	 * 
	 * Default value: 30 minutes
	 * 
	 * # Note
	 * 
	 * When not built with the `std` feature, time will never elapse. Therefore, the channel
	 * liquidity knowledge will never decay except when the bounds cross.
	 */
	public set_liquidity_offset_half_life(val: bigint): void {
		bindings.ProbabilisticScoringDecayParameters_set_liquidity_offset_half_life(this.ptr, val);
	}

	/**
	 * Constructs a new ProbabilisticScoringDecayParameters given each field
	 */
	public static constructor_new(historical_no_updates_half_life_arg: bigint, liquidity_offset_half_life_arg: bigint): ProbabilisticScoringDecayParameters {
		const ret: bigint = bindings.ProbabilisticScoringDecayParameters_new(historical_no_updates_half_life_arg, liquidity_offset_half_life_arg);
		const ret_hu_conv: ProbabilisticScoringDecayParameters = new ProbabilisticScoringDecayParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ProbabilisticScoringDecayParameters_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ProbabilisticScoringDecayParameters
	 */
	public clone(): ProbabilisticScoringDecayParameters {
		const ret: bigint = bindings.ProbabilisticScoringDecayParameters_clone(this.ptr);
		const ret_hu_conv: ProbabilisticScoringDecayParameters = new ProbabilisticScoringDecayParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ProbabilisticScoringDecayParameters. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): ProbabilisticScoringDecayParameters {
		const ret: bigint = bindings.ProbabilisticScoringDecayParameters_default();
		const ret_hu_conv: ProbabilisticScoringDecayParameters = new ProbabilisticScoringDecayParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
