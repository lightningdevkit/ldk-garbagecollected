using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Parameters for configuring [`ProbabilisticScorer`].
 * 
 * Used to configure base, liquidity, and amount penalties, the sum of which comprises the channel
 * penalty (i.e., the amount in msats willing to be paid to avoid routing through the channel).
 * 
 * The penalty applied to any channel by the [`ProbabilisticScorer`] is the sum of each of the
 * parameters here.
 */
public class ProbabilisticScoringParameters : CommonBase {
	internal ProbabilisticScoringParameters(object _dummy, long ptr) : base(ptr) { }
	~ProbabilisticScoringParameters() {
		if (ptr != 0) { bindings.ProbabilisticScoringParameters_free(ptr); }
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 * 
	 * Default value: 500 msat
	 */
	public long get_base_penalty_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_base_penalty_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 * 
	 * Default value: 500 msat
	 */
	public void set_base_penalty_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_base_penalty_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A multiplier used with the payment amount to calculate a fixed penalty applied to each
	 * channel, in excess of the [`base_penalty_msat`].
	 * 
	 * The purpose of the amount penalty is to avoid having fees dominate the channel cost (i.e.,
	 * fees plus penalty) for large payments. The penalty is computed as the product of this
	 * multiplier and `2^30`ths of the payment amount.
	 * 
	 * ie `base_penalty_amount_multiplier_msat * amount_msat / 2^30`
	 * 
	 * Default value: 8,192 msat
	 * 
	 * [`base_penalty_msat`]: Self::base_penalty_msat
	 */
	public long get_base_penalty_amount_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_base_penalty_amount_multiplier_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A multiplier used with the payment amount to calculate a fixed penalty applied to each
	 * channel, in excess of the [`base_penalty_msat`].
	 * 
	 * The purpose of the amount penalty is to avoid having fees dominate the channel cost (i.e.,
	 * fees plus penalty) for large payments. The penalty is computed as the product of this
	 * multiplier and `2^30`ths of the payment amount.
	 * 
	 * ie `base_penalty_amount_multiplier_msat * amount_msat / 2^30`
	 * 
	 * Default value: 8,192 msat
	 * 
	 * [`base_penalty_msat`]: Self::base_penalty_msat
	 */
	public void set_base_penalty_amount_multiplier_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_base_penalty_amount_multiplier_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A multiplier used in conjunction with the negative `log10` of the channel's success
	 * probability for a payment, as determined by our latest estimates of the channel's
	 * liquidity, to determine the liquidity penalty.
	 * 
	 * The penalty is based in part on the knowledge learned from prior successful and unsuccessful
	 * payments. This knowledge is decayed over time based on [`liquidity_offset_half_life`]. The
	 * penalty is effectively limited to `2 * liquidity_penalty_multiplier_msat` (corresponding to
	 * lower bounding the success probability to `0.01`) when the amount falls within the
	 * uncertainty bounds of the channel liquidity balance. Amounts above the upper bound will
	 * result in a `u64::max_value` penalty, however.
	 * 
	 * `-log10(success_probability) * liquidity_penalty_multiplier_msat`
	 * 
	 * Default value: 30,000 msat
	 * 
	 * [`liquidity_offset_half_life`]: Self::liquidity_offset_half_life
	 */
	public long get_liquidity_penalty_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_liquidity_penalty_multiplier_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A multiplier used in conjunction with the negative `log10` of the channel's success
	 * probability for a payment, as determined by our latest estimates of the channel's
	 * liquidity, to determine the liquidity penalty.
	 * 
	 * The penalty is based in part on the knowledge learned from prior successful and unsuccessful
	 * payments. This knowledge is decayed over time based on [`liquidity_offset_half_life`]. The
	 * penalty is effectively limited to `2 * liquidity_penalty_multiplier_msat` (corresponding to
	 * lower bounding the success probability to `0.01`) when the amount falls within the
	 * uncertainty bounds of the channel liquidity balance. Amounts above the upper bound will
	 * result in a `u64::max_value` penalty, however.
	 * 
	 * `-log10(success_probability) * liquidity_penalty_multiplier_msat`
	 * 
	 * Default value: 30,000 msat
	 * 
	 * [`liquidity_offset_half_life`]: Self::liquidity_offset_half_life
	 */
	public void set_liquidity_penalty_multiplier_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_liquidity_penalty_multiplier_msat(this.ptr, val);
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
		long ret = bindings.ProbabilisticScoringParameters_get_liquidity_offset_half_life(this.ptr);
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
		bindings.ProbabilisticScoringParameters_set_liquidity_offset_half_life(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A multiplier used in conjunction with a payment amount and the negative `log10` of the
	 * channel's success probability for the payment, as determined by our latest estimates of the
	 * channel's liquidity, to determine the amount penalty.
	 * 
	 * The purpose of the amount penalty is to avoid having fees dominate the channel cost (i.e.,
	 * fees plus penalty) for large payments. The penalty is computed as the product of this
	 * multiplier and `2^20`ths of the payment amount, weighted by the negative `log10` of the
	 * success probability.
	 * 
	 * `-log10(success_probability) * liquidity_penalty_amount_multiplier_msat * amount_msat / 2^20`
	 * 
	 * In practice, this means for 0.1 success probability (`-log10(0.1) == 1`) each `2^20`th of
	 * the amount will result in a penalty of the multiplier. And, as the success probability
	 * decreases, the negative `log10` weighting will increase dramatically. For higher success
	 * probabilities, the multiplier will have a decreasing effect as the negative `log10` will
	 * fall below `1`.
	 * 
	 * Default value: 192 msat
	 */
	public long get_liquidity_penalty_amount_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_liquidity_penalty_amount_multiplier_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A multiplier used in conjunction with a payment amount and the negative `log10` of the
	 * channel's success probability for the payment, as determined by our latest estimates of the
	 * channel's liquidity, to determine the amount penalty.
	 * 
	 * The purpose of the amount penalty is to avoid having fees dominate the channel cost (i.e.,
	 * fees plus penalty) for large payments. The penalty is computed as the product of this
	 * multiplier and `2^20`ths of the payment amount, weighted by the negative `log10` of the
	 * success probability.
	 * 
	 * `-log10(success_probability) * liquidity_penalty_amount_multiplier_msat * amount_msat / 2^20`
	 * 
	 * In practice, this means for 0.1 success probability (`-log10(0.1) == 1`) each `2^20`th of
	 * the amount will result in a penalty of the multiplier. And, as the success probability
	 * decreases, the negative `log10` weighting will increase dramatically. For higher success
	 * probabilities, the multiplier will have a decreasing effect as the negative `log10` will
	 * fall below `1`.
	 * 
	 * Default value: 192 msat
	 */
	public void set_liquidity_penalty_amount_multiplier_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_liquidity_penalty_amount_multiplier_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A multiplier used in conjunction with the negative `log10` of the channel's success
	 * probability for the payment, as determined based on the history of our estimates of the
	 * channel's available liquidity, to determine a penalty.
	 * 
	 * This penalty is similar to [`liquidity_penalty_multiplier_msat`], however, instead of using
	 * only our latest estimate for the current liquidity available in the channel, it estimates
	 * success probability based on the estimated liquidity available in the channel through
	 * history. Specifically, every time we update our liquidity bounds on a given channel, we
	 * track which of several buckets those bounds fall into, exponentially decaying the
	 * probability of each bucket as new samples are added.
	 * 
	 * Default value: 10,000 msat
	 * 
	 * [`liquidity_penalty_multiplier_msat`]: Self::liquidity_penalty_multiplier_msat
	 */
	public long get_historical_liquidity_penalty_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_historical_liquidity_penalty_multiplier_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A multiplier used in conjunction with the negative `log10` of the channel's success
	 * probability for the payment, as determined based on the history of our estimates of the
	 * channel's available liquidity, to determine a penalty.
	 * 
	 * This penalty is similar to [`liquidity_penalty_multiplier_msat`], however, instead of using
	 * only our latest estimate for the current liquidity available in the channel, it estimates
	 * success probability based on the estimated liquidity available in the channel through
	 * history. Specifically, every time we update our liquidity bounds on a given channel, we
	 * track which of several buckets those bounds fall into, exponentially decaying the
	 * probability of each bucket as new samples are added.
	 * 
	 * Default value: 10,000 msat
	 * 
	 * [`liquidity_penalty_multiplier_msat`]: Self::liquidity_penalty_multiplier_msat
	 */
	public void set_historical_liquidity_penalty_multiplier_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_historical_liquidity_penalty_multiplier_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A multiplier used in conjunction with the payment amount and the negative `log10` of the
	 * channel's success probability for the payment, as determined based on the history of our
	 * estimates of the channel's available liquidity, to determine a penalty.
	 * 
	 * The purpose of the amount penalty is to avoid having fees dominate the channel cost for
	 * large payments. The penalty is computed as the product of this multiplier and the `2^20`ths
	 * of the payment amount, weighted by the negative `log10` of the success probability.
	 * 
	 * This penalty is similar to [`liquidity_penalty_amount_multiplier_msat`], however, instead
	 * of using only our latest estimate for the current liquidity available in the channel, it
	 * estimates success probability based on the estimated liquidity available in the channel
	 * through history. Specifically, every time we update our liquidity bounds on a given
	 * channel, we track which of several buckets those bounds fall into, exponentially decaying
	 * the probability of each bucket as new samples are added.
	 * 
	 * Default value: 64 msat
	 * 
	 * [`liquidity_penalty_amount_multiplier_msat`]: Self::liquidity_penalty_amount_multiplier_msat
	 */
	public long get_historical_liquidity_penalty_amount_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_historical_liquidity_penalty_amount_multiplier_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A multiplier used in conjunction with the payment amount and the negative `log10` of the
	 * channel's success probability for the payment, as determined based on the history of our
	 * estimates of the channel's available liquidity, to determine a penalty.
	 * 
	 * The purpose of the amount penalty is to avoid having fees dominate the channel cost for
	 * large payments. The penalty is computed as the product of this multiplier and the `2^20`ths
	 * of the payment amount, weighted by the negative `log10` of the success probability.
	 * 
	 * This penalty is similar to [`liquidity_penalty_amount_multiplier_msat`], however, instead
	 * of using only our latest estimate for the current liquidity available in the channel, it
	 * estimates success probability based on the estimated liquidity available in the channel
	 * through history. Specifically, every time we update our liquidity bounds on a given
	 * channel, we track which of several buckets those bounds fall into, exponentially decaying
	 * the probability of each bucket as new samples are added.
	 * 
	 * Default value: 64 msat
	 * 
	 * [`liquidity_penalty_amount_multiplier_msat`]: Self::liquidity_penalty_amount_multiplier_msat
	 */
	public void set_historical_liquidity_penalty_amount_multiplier_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_historical_liquidity_penalty_amount_multiplier_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * If we aren't learning any new datapoints for a channel, the historical liquidity bounds
	 * tracking can simply live on with increasingly stale data. Instead, when a channel has not
	 * seen a liquidity estimate update for this amount of time, the historical datapoints are
	 * decayed by half.
	 * 
	 * Note that after 16 or more half lives all historical data will be completely gone.
	 * 
	 * Default value: 14 days
	 */
	public long get_historical_no_updates_half_life() {
		long ret = bindings.ProbabilisticScoringParameters_get_historical_no_updates_half_life(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * If we aren't learning any new datapoints for a channel, the historical liquidity bounds
	 * tracking can simply live on with increasingly stale data. Instead, when a channel has not
	 * seen a liquidity estimate update for this amount of time, the historical datapoints are
	 * decayed by half.
	 * 
	 * Note that after 16 or more half lives all historical data will be completely gone.
	 * 
	 * Default value: 14 days
	 */
	public void set_historical_no_updates_half_life(long val) {
		bindings.ProbabilisticScoringParameters_set_historical_no_updates_half_life(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * This penalty is applied when `htlc_maximum_msat` is equal to or larger than half of the
	 * channel's capacity, which makes us prefer nodes with a smaller `htlc_maximum_msat`. We
	 * treat such nodes preferentially as this makes balance discovery attacks harder to execute,
	 * thereby creating an incentive to restrict `htlc_maximum_msat` and improve privacy.
	 * 
	 * Default value: 250 msat
	 */
	public long get_anti_probing_penalty_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_anti_probing_penalty_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * This penalty is applied when `htlc_maximum_msat` is equal to or larger than half of the
	 * channel's capacity, which makes us prefer nodes with a smaller `htlc_maximum_msat`. We
	 * treat such nodes preferentially as this makes balance discovery attacks harder to execute,
	 * thereby creating an incentive to restrict `htlc_maximum_msat` and improve privacy.
	 * 
	 * Default value: 250 msat
	 */
	public void set_anti_probing_penalty_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_anti_probing_penalty_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * This penalty is applied when the amount we're attempting to send over a channel exceeds our
	 * current estimate of the channel's available liquidity.
	 * 
	 * Note that in this case all other penalties, including the
	 * [`liquidity_penalty_multiplier_msat`] and [`liquidity_penalty_amount_multiplier_msat`]-based
	 * penalties, as well as the [`base_penalty_msat`] and the [`anti_probing_penalty_msat`], if
	 * applicable, are still included in the overall penalty.
	 * 
	 * If you wish to avoid creating paths with such channels entirely, setting this to a value of
	 * `u64::max_value()` will guarantee that.
	 * 
	 * Default value: 1_0000_0000_000 msat (1 Bitcoin)
	 * 
	 * [`liquidity_penalty_multiplier_msat`]: Self::liquidity_penalty_multiplier_msat
	 * [`liquidity_penalty_amount_multiplier_msat`]: Self::liquidity_penalty_amount_multiplier_msat
	 * [`base_penalty_msat`]: Self::base_penalty_msat
	 * [`anti_probing_penalty_msat`]: Self::anti_probing_penalty_msat
	 */
	public long get_considered_impossible_penalty_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_considered_impossible_penalty_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * This penalty is applied when the amount we're attempting to send over a channel exceeds our
	 * current estimate of the channel's available liquidity.
	 * 
	 * Note that in this case all other penalties, including the
	 * [`liquidity_penalty_multiplier_msat`] and [`liquidity_penalty_amount_multiplier_msat`]-based
	 * penalties, as well as the [`base_penalty_msat`] and the [`anti_probing_penalty_msat`], if
	 * applicable, are still included in the overall penalty.
	 * 
	 * If you wish to avoid creating paths with such channels entirely, setting this to a value of
	 * `u64::max_value()` will guarantee that.
	 * 
	 * Default value: 1_0000_0000_000 msat (1 Bitcoin)
	 * 
	 * [`liquidity_penalty_multiplier_msat`]: Self::liquidity_penalty_multiplier_msat
	 * [`liquidity_penalty_amount_multiplier_msat`]: Self::liquidity_penalty_amount_multiplier_msat
	 * [`base_penalty_msat`]: Self::base_penalty_msat
	 * [`anti_probing_penalty_msat`]: Self::anti_probing_penalty_msat
	 */
	public void set_considered_impossible_penalty_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_considered_impossible_penalty_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.ProbabilisticScoringParameters_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbabilisticScoringParameters
	 */
	public ProbabilisticScoringParameters clone() {
		long ret = bindings.ProbabilisticScoringParameters_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Marks all nodes in the given list as banned, i.e.,
	 * they will be avoided during path finding.
	 */
	public void add_banned_from_list(NodeId[] node_ids) {
		bindings.ProbabilisticScoringParameters_add_banned_from_list(this.ptr, node_ids != null ? InternalUtils.mapArray(node_ids, node_ids_conv_8 => node_ids_conv_8 == null ? 0 : node_ids_conv_8.ptr) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(node_ids);
		foreach (NodeId node_ids_conv_8 in node_ids) { if (this != null) { this.ptrs_to.AddLast(node_ids_conv_8); }; };
	}

	/**
	 * Creates a "default" ProbabilisticScoringParameters. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ProbabilisticScoringParameters with_default() {
		long ret = bindings.ProbabilisticScoringParameters_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
