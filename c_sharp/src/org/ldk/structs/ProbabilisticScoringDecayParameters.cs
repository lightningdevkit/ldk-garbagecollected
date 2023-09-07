using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Parameters for configuring [`ProbabilisticScorer`].
 * 
 * Used to configure decay parameters that are static throughout the lifetime of the scorer.
 * these decay parameters affect the score of the channel penalty and are not changed on a
 * per-route penalty cost call.
 */
public class ProbabilisticScoringDecayParameters : CommonBase {
	internal ProbabilisticScoringDecayParameters(object _dummy, long ptr) : base(ptr) { }
	~ProbabilisticScoringDecayParameters() {
		if (ptr != 0) { bindings.ProbabilisticScoringDecayParameters_free(ptr); }
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
	 * [`historical_estimated_channel_liquidity_probabilities`]: ProbabilisticScorerUsingTime::historical_estimated_channel_liquidity_probabilities
	 */
	public long get_historical_no_updates_half_life() {
		long ret = bindings.ProbabilisticScoringDecayParameters_get_historical_no_updates_half_life(this.ptr);
		GC.KeepAlive(this);
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
	 * [`historical_estimated_channel_liquidity_probabilities`]: ProbabilisticScorerUsingTime::historical_estimated_channel_liquidity_probabilities
	 */
	public void set_historical_no_updates_half_life(long val) {
		bindings.ProbabilisticScoringDecayParameters_set_historical_no_updates_half_life(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	 * Default value: 6 hours
	 * 
	 * # Note
	 * 
	 * When built with the `no-std` feature, time will never elapse. Therefore, the channel
	 * liquidity knowledge will never decay except when the bounds cross.
	 */
	public long get_liquidity_offset_half_life() {
		long ret = bindings.ProbabilisticScoringDecayParameters_get_liquidity_offset_half_life(this.ptr);
		GC.KeepAlive(this);
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
	 * Default value: 6 hours
	 * 
	 * # Note
	 * 
	 * When built with the `no-std` feature, time will never elapse. Therefore, the channel
	 * liquidity knowledge will never decay except when the bounds cross.
	 */
	public void set_liquidity_offset_half_life(long val) {
		bindings.ProbabilisticScoringDecayParameters_set_liquidity_offset_half_life(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ProbabilisticScoringDecayParameters given each field
	 */
	public static ProbabilisticScoringDecayParameters of(long historical_no_updates_half_life_arg, long liquidity_offset_half_life_arg) {
		long ret = bindings.ProbabilisticScoringDecayParameters_new(historical_no_updates_half_life_arg, liquidity_offset_half_life_arg);
		GC.KeepAlive(historical_no_updates_half_life_arg);
		GC.KeepAlive(liquidity_offset_half_life_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringDecayParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringDecayParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ProbabilisticScoringDecayParameters_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbabilisticScoringDecayParameters
	 */
	public ProbabilisticScoringDecayParameters clone() {
		long ret = bindings.ProbabilisticScoringDecayParameters_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringDecayParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringDecayParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ProbabilisticScoringDecayParameters. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ProbabilisticScoringDecayParameters with_default() {
		long ret = bindings.ProbabilisticScoringDecayParameters_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringDecayParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringDecayParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
