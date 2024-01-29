using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class ProbabilisticScorer : CommonBase {
	internal ProbabilisticScorer(object _dummy, long ptr) : base(ptr) { }
	~ProbabilisticScorer() {
		if (ptr != 0) { bindings.ProbabilisticScorer_free(ptr); }
	}

	/**
	 * Creates a new scorer using the given scoring parameters for sending payments from a node
	 * through a network graph.
	 */
	public static ProbabilisticScorer of(org.ldk.structs.ProbabilisticScoringDecayParameters decay_params, org.ldk.structs.NetworkGraph network_graph, org.ldk.structs.Logger logger) {
		long ret = bindings.ProbabilisticScorer_new(decay_params == null ? 0 : decay_params.ptr, network_graph == null ? 0 : network_graph.ptr, logger.ptr);
		GC.KeepAlive(decay_params);
		GC.KeepAlive(network_graph);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScorer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(decay_params); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		return ret_hu_conv;
	}

	/**
	 * Dump the contents of this scorer into the configured logger.
	 * 
	 * Note that this writes roughly one line per channel for which we have a liquidity estimate,
	 * which may be a substantial amount of log output.
	 */
	public void debug_log_liquidity_stats() {
		bindings.ProbabilisticScorer_debug_log_liquidity_stats(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Query the estimated minimum and maximum liquidity available for sending a payment over the
	 * channel with `scid` towards the given `target` node.
	 */
	public Option_C2Tuple_u64u64ZZ estimated_channel_liquidity_range(long scid, org.ldk.structs.NodeId target) {
		long ret = bindings.ProbabilisticScorer_estimated_channel_liquidity_range(this.ptr, scid, target == null ? 0 : target.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(scid);
		GC.KeepAlive(target);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_u64u64ZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_u64u64ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(target); };
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
	public Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ historical_estimated_channel_liquidity_probabilities(long scid, org.ldk.structs.NodeId target) {
		long ret = bindings.ProbabilisticScorer_historical_estimated_channel_liquidity_probabilities(this.ptr, scid, target == null ? 0 : target.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(scid);
		GC.KeepAlive(target);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(target); };
		return ret_hu_conv;
	}

	/**
	 * Query the probability of payment success sending the given `amount_msat` over the channel
	 * with `scid` towards the given `target` node, based on the historical estimated liquidity
	 * bounds.
	 * 
	 * These are the same bounds as returned by
	 * [`Self::historical_estimated_channel_liquidity_probabilities`] (but not those returned by
	 * [`Self::estimated_channel_liquidity_range`]).
	 */
	public Option_f64Z historical_estimated_payment_success_probability(long scid, org.ldk.structs.NodeId target, long amount_msat, org.ldk.structs.ProbabilisticScoringFeeParameters _params) {
		long ret = bindings.ProbabilisticScorer_historical_estimated_payment_success_probability(this.ptr, scid, target == null ? 0 : target.ptr, amount_msat, _params == null ? 0 : _params.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(scid);
		GC.KeepAlive(target);
		GC.KeepAlive(amount_msat);
		GC.KeepAlive(_params);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_f64Z ret_hu_conv = org.ldk.structs.Option_f64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(target); };
		if (this != null) { this.ptrs_to.AddLast(_params); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public ScoreLookUp as_ScoreLookUp() {
		long ret = bindings.ProbabilisticScorer_as_ScoreLookUp(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreLookUp ret_hu_conv = new ScoreLookUp(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public ScoreUpdate as_ScoreUpdate() {
		long ret = bindings.ProbabilisticScorer_as_ScoreUpdate(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreUpdate ret_hu_conv = new ScoreUpdate(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.ProbabilisticScorer_as_Score(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ProbabilisticScorer object into a byte array which can be read by ProbabilisticScorer_read
	 */
	public byte[] write() {
		long ret = bindings.ProbabilisticScorer_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ProbabilisticScorer from a byte array, created by ProbabilisticScorer_write
	 */
	public static Result_ProbabilisticScorerDecodeErrorZ read(byte[] ser, org.ldk.structs.ProbabilisticScoringDecayParameters arg_a, org.ldk.structs.NetworkGraph arg_b, org.ldk.structs.Logger arg_c) {
		long ret = bindings.ProbabilisticScorer_read(InternalUtils.encodeUint8Array(ser), arg_a == null ? 0 : arg_a.ptr, arg_b == null ? 0 : arg_b.ptr, arg_c.ptr);
		GC.KeepAlive(ser);
		GC.KeepAlive(arg_a);
		GC.KeepAlive(arg_b);
		GC.KeepAlive(arg_c);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ProbabilisticScorerDecodeErrorZ ret_hu_conv = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(arg_a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(arg_b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(arg_c); };
		return ret_hu_conv;
	}

}
} } }
