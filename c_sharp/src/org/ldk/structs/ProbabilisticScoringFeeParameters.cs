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
public class ProbabilisticScoringFeeParameters : CommonBase {
	internal ProbabilisticScoringFeeParameters(object _dummy, long ptr) : base(ptr) { }
	~ProbabilisticScoringFeeParameters() {
		if (ptr != 0) { bindings.ProbabilisticScoringFeeParameters_free(ptr); }
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 * 
	 * In testing, a value of roughly 1/10th of [`historical_liquidity_penalty_multiplier_msat`]
	 * (implying scaling all estimated probabilities down by a factor of ~79%) resulted in the
	 * most accurate total success probabilities.
	 * 
	 * Default value: 1,024 msat (i.e. we're willing to pay 1 sat to avoid each additional hop).
	 * 
	 * [`historical_liquidity_penalty_multiplier_msat`]: Self::historical_liquidity_penalty_multiplier_msat
	 */
	public long get_base_penalty_msat() {
		long ret = bindings.ProbabilisticScoringFeeParameters_get_base_penalty_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 * 
	 * In testing, a value of roughly 1/10th of [`historical_liquidity_penalty_multiplier_msat`]
	 * (implying scaling all estimated probabilities down by a factor of ~79%) resulted in the
	 * most accurate total success probabilities.
	 * 
	 * Default value: 1,024 msat (i.e. we're willing to pay 1 sat to avoid each additional hop).
	 * 
	 * [`historical_liquidity_penalty_multiplier_msat`]: Self::historical_liquidity_penalty_multiplier_msat
	 */
	public void set_base_penalty_msat(long val) {
		bindings.ProbabilisticScoringFeeParameters_set_base_penalty_msat(this.ptr, val);
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
	 * In testing, a value of roughly ~100x (1/10th * 2^10) of
	 * [`historical_liquidity_penalty_amount_multiplier_msat`] (implying scaling all estimated
	 * probabilities down by a factor of ~79%) resulted in the most accurate total success
	 * probabilities.
	 * 
	 * Default value: 131,072 msat (i.e. we're willing to pay 0.125bps to avoid each additional
	 * hop).
	 * 
	 * [`base_penalty_msat`]: Self::base_penalty_msat
	 * [`historical_liquidity_penalty_amount_multiplier_msat`]: Self::historical_liquidity_penalty_amount_multiplier_msat
	 */
	public long get_base_penalty_amount_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringFeeParameters_get_base_penalty_amount_multiplier_msat(this.ptr);
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
	 * In testing, a value of roughly ~100x (1/10th * 2^10) of
	 * [`historical_liquidity_penalty_amount_multiplier_msat`] (implying scaling all estimated
	 * probabilities down by a factor of ~79%) resulted in the most accurate total success
	 * probabilities.
	 * 
	 * Default value: 131,072 msat (i.e. we're willing to pay 0.125bps to avoid each additional
	 * hop).
	 * 
	 * [`base_penalty_msat`]: Self::base_penalty_msat
	 * [`historical_liquidity_penalty_amount_multiplier_msat`]: Self::historical_liquidity_penalty_amount_multiplier_msat
	 */
	public void set_base_penalty_amount_multiplier_msat(long val) {
		bindings.ProbabilisticScoringFeeParameters_set_base_penalty_amount_multiplier_msat(this.ptr, val);
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
	 * In testing, this scoring model performs much worse than the historical scoring model
	 * configured with the [`historical_liquidity_penalty_multiplier_msat`] and thus is disabled
	 * by default.
	 * 
	 * Default value: 0 msat
	 * 
	 * [`liquidity_offset_half_life`]: ProbabilisticScoringDecayParameters::liquidity_offset_half_life
	 * [`historical_liquidity_penalty_multiplier_msat`]: Self::historical_liquidity_penalty_multiplier_msat
	 */
	public long get_liquidity_penalty_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringFeeParameters_get_liquidity_penalty_multiplier_msat(this.ptr);
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
	 * In testing, this scoring model performs much worse than the historical scoring model
	 * configured with the [`historical_liquidity_penalty_multiplier_msat`] and thus is disabled
	 * by default.
	 * 
	 * Default value: 0 msat
	 * 
	 * [`liquidity_offset_half_life`]: ProbabilisticScoringDecayParameters::liquidity_offset_half_life
	 * [`historical_liquidity_penalty_multiplier_msat`]: Self::historical_liquidity_penalty_multiplier_msat
	 */
	public void set_liquidity_penalty_multiplier_msat(long val) {
		bindings.ProbabilisticScoringFeeParameters_set_liquidity_penalty_multiplier_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A multiplier used in conjunction with the payment amount and the negative `log10` of the
	 * channel's success probability for the total amount flowing over a channel, as determined by
	 * our latest estimates of the channel's liquidity, to determine the amount penalty.
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
	 * In testing, this scoring model performs much worse than the historical scoring model
	 * configured with the [`historical_liquidity_penalty_amount_multiplier_msat`] and thus is
	 * disabled by default.
	 * 
	 * Default value: 0 msat
	 * 
	 * [`historical_liquidity_penalty_amount_multiplier_msat`]: Self::historical_liquidity_penalty_amount_multiplier_msat
	 */
	public long get_liquidity_penalty_amount_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringFeeParameters_get_liquidity_penalty_amount_multiplier_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A multiplier used in conjunction with the payment amount and the negative `log10` of the
	 * channel's success probability for the total amount flowing over a channel, as determined by
	 * our latest estimates of the channel's liquidity, to determine the amount penalty.
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
	 * In testing, this scoring model performs much worse than the historical scoring model
	 * configured with the [`historical_liquidity_penalty_amount_multiplier_msat`] and thus is
	 * disabled by default.
	 * 
	 * Default value: 0 msat
	 * 
	 * [`historical_liquidity_penalty_amount_multiplier_msat`]: Self::historical_liquidity_penalty_amount_multiplier_msat
	 */
	public void set_liquidity_penalty_amount_multiplier_msat(long val) {
		bindings.ProbabilisticScoringFeeParameters_set_liquidity_penalty_amount_multiplier_msat(this.ptr, val);
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
	 * Default value: 10,000 msat (i.e. willing to pay 1 sat to avoid an 80% probability channel,
	 * or 6 sats to avoid a 25% probability channel).
	 * 
	 * [`liquidity_penalty_multiplier_msat`]: Self::liquidity_penalty_multiplier_msat
	 */
	public long get_historical_liquidity_penalty_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringFeeParameters_get_historical_liquidity_penalty_multiplier_msat(this.ptr);
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
	 * Default value: 10,000 msat (i.e. willing to pay 1 sat to avoid an 80% probability channel,
	 * or 6 sats to avoid a 25% probability channel).
	 * 
	 * [`liquidity_penalty_multiplier_msat`]: Self::liquidity_penalty_multiplier_msat
	 */
	public void set_historical_liquidity_penalty_multiplier_msat(long val) {
		bindings.ProbabilisticScoringFeeParameters_set_historical_liquidity_penalty_multiplier_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A multiplier used in conjunction with the payment amount and the negative `log10` of the
	 * channel's success probability for the total amount flowing over a channel, as determined
	 * based on the history of our estimates of the channel's available liquidity, to determine a
	 * penalty.
	 * 
	 * The purpose of the amount penalty is to avoid having fees dominate the channel cost for
	 * large payments. The penalty is computed as the product of this multiplier and `2^20`ths
	 * of the payment amount, weighted by the negative `log10` of the success probability.
	 * 
	 * This penalty is similar to [`liquidity_penalty_amount_multiplier_msat`], however, instead
	 * of using only our latest estimate for the current liquidity available in the channel, it
	 * estimates success probability based on the estimated liquidity available in the channel
	 * through history. Specifically, every time we update our liquidity bounds on a given
	 * channel, we track which of several buckets those bounds fall into, exponentially decaying
	 * the probability of each bucket as new samples are added.
	 * 
	 * Default value: 1,250 msat (i.e. willing to pay about 0.125 bps per hop to avoid 78%
	 * probability channels, or 0.5bps to avoid a 38% probability
	 * channel).
	 * 
	 * [`liquidity_penalty_amount_multiplier_msat`]: Self::liquidity_penalty_amount_multiplier_msat
	 */
	public long get_historical_liquidity_penalty_amount_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringFeeParameters_get_historical_liquidity_penalty_amount_multiplier_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A multiplier used in conjunction with the payment amount and the negative `log10` of the
	 * channel's success probability for the total amount flowing over a channel, as determined
	 * based on the history of our estimates of the channel's available liquidity, to determine a
	 * penalty.
	 * 
	 * The purpose of the amount penalty is to avoid having fees dominate the channel cost for
	 * large payments. The penalty is computed as the product of this multiplier and `2^20`ths
	 * of the payment amount, weighted by the negative `log10` of the success probability.
	 * 
	 * This penalty is similar to [`liquidity_penalty_amount_multiplier_msat`], however, instead
	 * of using only our latest estimate for the current liquidity available in the channel, it
	 * estimates success probability based on the estimated liquidity available in the channel
	 * through history. Specifically, every time we update our liquidity bounds on a given
	 * channel, we track which of several buckets those bounds fall into, exponentially decaying
	 * the probability of each bucket as new samples are added.
	 * 
	 * Default value: 1,250 msat (i.e. willing to pay about 0.125 bps per hop to avoid 78%
	 * probability channels, or 0.5bps to avoid a 38% probability
	 * channel).
	 * 
	 * [`liquidity_penalty_amount_multiplier_msat`]: Self::liquidity_penalty_amount_multiplier_msat
	 */
	public void set_historical_liquidity_penalty_amount_multiplier_msat(long val) {
		bindings.ProbabilisticScoringFeeParameters_set_historical_liquidity_penalty_amount_multiplier_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * This penalty is applied when `htlc_maximum_msat` is equal to or larger than half of the
	 * channel's capacity, (ie. htlc_maximum_msat >= 0.5 * channel_capacity) which makes us
	 * prefer nodes with a smaller `htlc_maximum_msat`. We treat such nodes preferentially
	 * as this makes balance discovery attacks harder to execute, thereby creating an incentive
	 * to restrict `htlc_maximum_msat` and improve privacy.
	 * 
	 * Default value: 250 msat
	 */
	public long get_anti_probing_penalty_msat() {
		long ret = bindings.ProbabilisticScoringFeeParameters_get_anti_probing_penalty_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * This penalty is applied when `htlc_maximum_msat` is equal to or larger than half of the
	 * channel's capacity, (ie. htlc_maximum_msat >= 0.5 * channel_capacity) which makes us
	 * prefer nodes with a smaller `htlc_maximum_msat`. We treat such nodes preferentially
	 * as this makes balance discovery attacks harder to execute, thereby creating an incentive
	 * to restrict `htlc_maximum_msat` and improve privacy.
	 * 
	 * Default value: 250 msat
	 */
	public void set_anti_probing_penalty_msat(long val) {
		bindings.ProbabilisticScoringFeeParameters_set_anti_probing_penalty_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * This penalty is applied when the total amount flowing over a channel exceeds our current
	 * estimate of the channel's available liquidity. The total amount is the amount of the
	 * current HTLC plus any HTLCs which we've sent over the same channel.
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
		long ret = bindings.ProbabilisticScoringFeeParameters_get_considered_impossible_penalty_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * This penalty is applied when the total amount flowing over a channel exceeds our current
	 * estimate of the channel's available liquidity. The total amount is the amount of the
	 * current HTLC plus any HTLCs which we've sent over the same channel.
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
		bindings.ProbabilisticScoringFeeParameters_set_considered_impossible_penalty_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * In order to calculate most of the scores above, we must first convert a lower and upper
	 * bound on the available liquidity in a channel into the probability that we think a payment
	 * will succeed. That probability is derived from a Probability Density Function for where we
	 * think the liquidity in a channel likely lies, given such bounds.
	 * 
	 * If this flag is set, that PDF is simply a constant - we assume that the actual available
	 * liquidity in a channel is just as likely to be at any point between our lower and upper
	 * bounds.
	 * 
	 * If this flag is *not* set, that PDF is `(x - 0.5*capacity) ^ 2`. That is, we use an
	 * exponential curve which expects the liquidity of a channel to lie \"at the edges\". This
	 * matches experimental results - most routing nodes do not aggressively rebalance their
	 * channels and flows in the network are often unbalanced, leaving liquidity usually
	 * unavailable.
	 * 
	 * Thus, for the \"best\" routes, leave this flag `false`. However, the flag does imply a number
	 * of floating-point multiplications in the hottest routing code, which may lead to routing
	 * performance degradation on some machines.
	 * 
	 * Default value: false
	 */
	public bool get_linear_success_probability() {
		bool ret = bindings.ProbabilisticScoringFeeParameters_get_linear_success_probability(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * In order to calculate most of the scores above, we must first convert a lower and upper
	 * bound on the available liquidity in a channel into the probability that we think a payment
	 * will succeed. That probability is derived from a Probability Density Function for where we
	 * think the liquidity in a channel likely lies, given such bounds.
	 * 
	 * If this flag is set, that PDF is simply a constant - we assume that the actual available
	 * liquidity in a channel is just as likely to be at any point between our lower and upper
	 * bounds.
	 * 
	 * If this flag is *not* set, that PDF is `(x - 0.5*capacity) ^ 2`. That is, we use an
	 * exponential curve which expects the liquidity of a channel to lie \"at the edges\". This
	 * matches experimental results - most routing nodes do not aggressively rebalance their
	 * channels and flows in the network are often unbalanced, leaving liquidity usually
	 * unavailable.
	 * 
	 * Thus, for the \"best\" routes, leave this flag `false`. However, the flag does imply a number
	 * of floating-point multiplications in the hottest routing code, which may lead to routing
	 * performance degradation on some machines.
	 * 
	 * Default value: false
	 */
	public void set_linear_success_probability(bool val) {
		bindings.ProbabilisticScoringFeeParameters_set_linear_success_probability(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * In order to ensure we have knowledge for as many paths as possible, when probing it makes
	 * sense to bias away from channels for which we have very recent data.
	 * 
	 * This value is a penalty that is applied based on the last time that we updated the bounds
	 * on the available liquidity in a channel. The specified value is the maximum penalty that
	 * will be applied.
	 * 
	 * It obviously does not make sense to assign a non-0 value here unless you are using the
	 * pathfinding result for background probing.
	 * 
	 * Specifically, the following penalty is applied
	 * `probing_diversity_penalty_msat * max(0, (86400 - current time + last update))^2 / 86400^2` is
	 * 
	 * As this is a maximum value, when setting this you should consider it in relation to the
	 * other values set to ensure that, at maximum, we strongly avoid paths which we recently
	 * tried (similar to if they have a low success probability). For example, you might set this
	 * to be the sum of [`Self::base_penalty_msat`] and
	 * [`Self::historical_liquidity_penalty_multiplier_msat`] (plus some multiple of their
	 * corresponding `amount_multiplier`s).
	 * 
	 * Default value: 0
	 */
	public long get_probing_diversity_penalty_msat() {
		long ret = bindings.ProbabilisticScoringFeeParameters_get_probing_diversity_penalty_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * In order to ensure we have knowledge for as many paths as possible, when probing it makes
	 * sense to bias away from channels for which we have very recent data.
	 * 
	 * This value is a penalty that is applied based on the last time that we updated the bounds
	 * on the available liquidity in a channel. The specified value is the maximum penalty that
	 * will be applied.
	 * 
	 * It obviously does not make sense to assign a non-0 value here unless you are using the
	 * pathfinding result for background probing.
	 * 
	 * Specifically, the following penalty is applied
	 * `probing_diversity_penalty_msat * max(0, (86400 - current time + last update))^2 / 86400^2` is
	 * 
	 * As this is a maximum value, when setting this you should consider it in relation to the
	 * other values set to ensure that, at maximum, we strongly avoid paths which we recently
	 * tried (similar to if they have a low success probability). For example, you might set this
	 * to be the sum of [`Self::base_penalty_msat`] and
	 * [`Self::historical_liquidity_penalty_multiplier_msat`] (plus some multiple of their
	 * corresponding `amount_multiplier`s).
	 * 
	 * Default value: 0
	 */
	public void set_probing_diversity_penalty_msat(long val) {
		bindings.ProbabilisticScoringFeeParameters_set_probing_diversity_penalty_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.ProbabilisticScoringFeeParameters_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbabilisticScoringFeeParameters
	 */
	public org.ldk.structs.ProbabilisticScoringFeeParameters clone() {
		long ret = bindings.ProbabilisticScoringFeeParameters_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringFeeParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringFeeParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ProbabilisticScoringFeeParameters. See struct and individual field documentaiton for details on which values are used.
	 */
	public static org.ldk.structs.ProbabilisticScoringFeeParameters with_default() {
		long ret = bindings.ProbabilisticScoringFeeParameters_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringFeeParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringFeeParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Marks the node with the given `node_id` as banned,
	 * i.e it will be avoided during path finding.
	 */
	public void add_banned(org.ldk.structs.NodeId node_id) {
		bindings.ProbabilisticScoringFeeParameters_add_banned(this.ptr, node_id.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(node_id);
	}

	/**
	 * Marks all nodes in the given list as banned, i.e.,
	 * they will be avoided during path finding.
	 */
	public void add_banned_from_list(NodeId[] node_ids) {
		bindings.ProbabilisticScoringFeeParameters_add_banned_from_list(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(node_ids, node_ids_conv_8 => node_ids_conv_8.ptr)));
		GC.KeepAlive(this);
		GC.KeepAlive(node_ids);
	}

	/**
	 * Removes the node with the given `node_id` from the list of nodes to avoid.
	 */
	public void remove_banned(org.ldk.structs.NodeId node_id) {
		bindings.ProbabilisticScoringFeeParameters_remove_banned(this.ptr, node_id.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(node_id);
	}

	/**
	 * Sets a manual penalty for the given node.
	 */
	public void set_manual_penalty(org.ldk.structs.NodeId node_id, long penalty) {
		bindings.ProbabilisticScoringFeeParameters_set_manual_penalty(this.ptr, node_id.ptr, penalty);
		GC.KeepAlive(this);
		GC.KeepAlive(node_id);
		GC.KeepAlive(penalty);
	}

	/**
	 * Removes the node with the given `node_id` from the list of manual penalties.
	 */
	public void remove_manual_penalty(org.ldk.structs.NodeId node_id) {
		bindings.ProbabilisticScoringFeeParameters_remove_manual_penalty(this.ptr, node_id.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(node_id);
	}

	/**
	 * Clears the list of manual penalties that are applied during path finding.
	 */
	public void clear_manual_penalties() {
		bindings.ProbabilisticScoringFeeParameters_clear_manual_penalties(this.ptr);
		GC.KeepAlive(this);
	}

}
} } }
