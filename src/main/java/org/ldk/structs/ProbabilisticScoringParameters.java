package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Parameters for configuring [`ProbabilisticScorer`].
 * 
 * Used to configure base, liquidity, and amount penalties, the sum of which comprises the channel
 * penalty (i.e., the amount in msats willing to be paid to avoid routing through the channel).
 * 
 * The penalty applied to any channel by the [`ProbabilisticScorer`] is the sum of each of the
 * parameters here.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ProbabilisticScoringParameters extends CommonBase {
	ProbabilisticScoringParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ProbabilisticScoringParameters_free(ptr); }
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 * 
	 * Default value: 500 msat
	 */
	public long get_base_penalty_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_base_penalty_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 * 
	 * Default value: 500 msat
	 */
	public void set_base_penalty_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_base_penalty_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A multiplier used in conjunction with the negative `log10` of the channel's success
	 * probability for a payment to determine the liquidity penalty.
	 * 
	 * The penalty is based in part on the knowledge learned from prior successful and unsuccessful
	 * payments. This knowledge is decayed over time based on [`liquidity_offset_half_life`]. The
	 * penalty is effectively limited to `2 * liquidity_penalty_multiplier_msat` (corresponding to
	 * lower bounding the success probability to `0.01`) when the amount falls within the
	 * uncertainty bounds of the channel liquidity balance. Amounts above the upper bound will
	 * result in a `u64::max_value` penalty, however.
	 * 
	 * Default value: 40,000 msat
	 * 
	 * [`liquidity_offset_half_life`]: Self::liquidity_offset_half_life
	 */
	public long get_liquidity_penalty_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_liquidity_penalty_multiplier_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A multiplier used in conjunction with the negative `log10` of the channel's success
	 * probability for a payment to determine the liquidity penalty.
	 * 
	 * The penalty is based in part on the knowledge learned from prior successful and unsuccessful
	 * payments. This knowledge is decayed over time based on [`liquidity_offset_half_life`]. The
	 * penalty is effectively limited to `2 * liquidity_penalty_multiplier_msat` (corresponding to
	 * lower bounding the success probability to `0.01`) when the amount falls within the
	 * uncertainty bounds of the channel liquidity balance. Amounts above the upper bound will
	 * result in a `u64::max_value` penalty, however.
	 * 
	 * Default value: 40,000 msat
	 * 
	 * [`liquidity_offset_half_life`]: Self::liquidity_offset_half_life
	 */
	public void set_liquidity_penalty_multiplier_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_liquidity_penalty_multiplier_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The time required to elapse before any knowledge learned about channel liquidity balances is
	 * cut in half.
	 * 
	 * The bounds are defined in terms of offsets and are initially zero. Increasing the offsets
	 * gives tighter bounds on the channel liquidity balance. Thus, halving the offsets decreases
	 * the certainty of the channel liquidity balance.
	 * 
	 * Default value: 1 hour
	 * 
	 * # Note
	 * 
	 * When built with the `no-std` feature, time will never elapse. Therefore, the channel
	 * liquidity knowledge will never decay except when the bounds cross.
	 */
	public long get_liquidity_offset_half_life() {
		long ret = bindings.ProbabilisticScoringParameters_get_liquidity_offset_half_life(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The time required to elapse before any knowledge learned about channel liquidity balances is
	 * cut in half.
	 * 
	 * The bounds are defined in terms of offsets and are initially zero. Increasing the offsets
	 * gives tighter bounds on the channel liquidity balance. Thus, halving the offsets decreases
	 * the certainty of the channel liquidity balance.
	 * 
	 * Default value: 1 hour
	 * 
	 * # Note
	 * 
	 * When built with the `no-std` feature, time will never elapse. Therefore, the channel
	 * liquidity knowledge will never decay except when the bounds cross.
	 */
	public void set_liquidity_offset_half_life(long val) {
		bindings.ProbabilisticScoringParameters_set_liquidity_offset_half_life(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A multiplier used in conjunction with a payment amount and the negative `log10` of the
	 * channel's success probability for the payment to determine the amount penalty.
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
	 * Default value: 256 msat
	 */
	public long get_liquidity_penalty_amount_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_liquidity_penalty_amount_multiplier_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A multiplier used in conjunction with a payment amount and the negative `log10` of the
	 * channel's success probability for the payment to determine the amount penalty.
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
	 * Default value: 256 msat
	 */
	public void set_liquidity_penalty_amount_multiplier_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_liquidity_penalty_amount_multiplier_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.ProbabilisticScoringParameters_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbabilisticScoringParameters
	 */
	public ProbabilisticScoringParameters clone() {
		long ret = bindings.ProbabilisticScoringParameters_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Marks all nodes in the given list as banned, i.e.,
	 * they will be avoided during path finding.
	 */
	public void add_banned_from_list(NodeId[] node_ids) {
		bindings.ProbabilisticScoringParameters_add_banned_from_list(this.ptr, node_ids != null ? Arrays.stream(node_ids).mapToLong(node_ids_conv_8 -> node_ids_conv_8 == null ? 0 : node_ids_conv_8.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(node_ids);
	}

	/**
	 * Creates a "default" ProbabilisticScoringParameters. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ProbabilisticScoringParameters with_default() {
		long ret = bindings.ProbabilisticScoringParameters_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
