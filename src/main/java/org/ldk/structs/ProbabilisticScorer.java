package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * [`Score`] implementation using channel success probability distributions.
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
 * # Note
 * 
 * Mixing the `no-std` feature between serialization and deserialization results in undefined
 * behavior.
 * 
 * [1]: https://arxiv.org/abs/2107.05322
 * [`liquidity_penalty_multiplier_msat`]: ProbabilisticScoringParameters::liquidity_penalty_multiplier_msat
 * [`liquidity_penalty_amount_multiplier_msat`]: ProbabilisticScoringParameters::liquidity_penalty_amount_multiplier_msat
 * [`liquidity_offset_half_life`]: ProbabilisticScoringParameters::liquidity_offset_half_life
 * [`historical_liquidity_penalty_multiplier_msat`]: ProbabilisticScoringParameters::historical_liquidity_penalty_multiplier_msat
 * [`historical_liquidity_penalty_amount_multiplier_msat`]: ProbabilisticScoringParameters::historical_liquidity_penalty_amount_multiplier_msat
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ProbabilisticScorer extends CommonBase {
	ProbabilisticScorer(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ProbabilisticScorer_free(ptr); }
	}

	/**
	 * Creates a new scorer using the given scoring parameters for sending payments from a node
	 * through a network graph.
	 */
	public static ProbabilisticScorer of(org.ldk.structs.ProbabilisticScoringParameters params, org.ldk.structs.NetworkGraph network_graph, org.ldk.structs.Logger logger) {
		long ret = bindings.ProbabilisticScorer_new(params == null ? 0 : params.ptr, network_graph == null ? 0 : network_graph.ptr, logger == null ? 0 : logger.ptr);
		Reference.reachabilityFence(params);
		Reference.reachabilityFence(network_graph);
		Reference.reachabilityFence(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbabilisticScorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ProbabilisticScorer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(params); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
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
		Reference.reachabilityFence(this);
	}

	/**
	 * Query the estimated minimum and maximum liquidity available for sending a payment over the
	 * channel with `scid` towards the given `target` node.
	 */
	public Option_C2Tuple_u64u64ZZ estimated_channel_liquidity_range(long scid, org.ldk.structs.NodeId target) {
		long ret = bindings.ProbabilisticScorer_estimated_channel_liquidity_range(this.ptr, scid, target == null ? 0 : target.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(scid);
		Reference.reachabilityFence(target);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_u64u64ZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_u64u64ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(target); };
		return ret_hu_conv;
	}

	/**
	 * Query the historical estimated minimum and maximum liquidity available for sending a
	 * payment over the channel with `scid` towards the given `target` node.
	 * 
	 * Returns two sets of 8 buckets. The first set describes the octiles for lower-bound
	 * liquidity estimates, the second set describes the octiles for upper-bound liquidity
	 * estimates. Each bucket describes the relative frequency at which we've seen a liquidity
	 * bound in the octile relative to the channel's total capacity, on an arbitrary scale.
	 * Because the values are slowly decayed, more recent data points are weighted more heavily
	 * than older datapoints.
	 * 
	 * When scoring, the estimated probability that an upper-/lower-bound lies in a given octile
	 * relative to the channel's total capacity is calculated by dividing that bucket's value with
	 * the total of all buckets for the given bound.
	 * 
	 * For example, a value of `[0, 0, 0, 0, 0, 0, 32]` indicates that we believe the probability
	 * of a bound being in the top octile to be 100%, and have never (recently) seen it in any
	 * other octiles. A value of `[31, 0, 0, 0, 0, 0, 0, 32]` indicates we've seen the bound being
	 * both in the top and bottom octile, and roughly with similar (recent) frequency.
	 * 
	 * Because the datapoints are decayed slowly over time, values will eventually return to
	 * `Some(([0; 8], [0; 8]))`.
	 */
	public Option_C2Tuple_EightU16sEightU16sZZ historical_estimated_channel_liquidity_probabilities(long scid, org.ldk.structs.NodeId target) {
		long ret = bindings.ProbabilisticScorer_historical_estimated_channel_liquidity_probabilities(this.ptr, scid, target == null ? 0 : target.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(scid);
		Reference.reachabilityFence(target);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_EightU16sEightU16sZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_EightU16sEightU16sZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(target); };
		return ret_hu_conv;
	}

	/**
	 * Marks the node with the given `node_id` as banned, i.e.,
	 * it will be avoided during path finding.
	 */
	public void add_banned(org.ldk.structs.NodeId node_id) {
		bindings.ProbabilisticScorer_add_banned(this.ptr, node_id == null ? 0 : node_id.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(node_id);
		if (this != null) { this.ptrs_to.add(node_id); };
	}

	/**
	 * Removes the node with the given `node_id` from the list of nodes to avoid.
	 */
	public void remove_banned(org.ldk.structs.NodeId node_id) {
		bindings.ProbabilisticScorer_remove_banned(this.ptr, node_id == null ? 0 : node_id.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(node_id);
		if (this != null) { this.ptrs_to.add(node_id); };
	}

	/**
	 * Sets a manual penalty for the given node.
	 */
	public void set_manual_penalty(org.ldk.structs.NodeId node_id, long penalty) {
		bindings.ProbabilisticScorer_set_manual_penalty(this.ptr, node_id == null ? 0 : node_id.ptr, penalty);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(node_id);
		Reference.reachabilityFence(penalty);
		if (this != null) { this.ptrs_to.add(node_id); };
	}

	/**
	 * Removes the node with the given `node_id` from the list of manual penalties.
	 */
	public void remove_manual_penalty(org.ldk.structs.NodeId node_id) {
		bindings.ProbabilisticScorer_remove_manual_penalty(this.ptr, node_id == null ? 0 : node_id.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(node_id);
		if (this != null) { this.ptrs_to.add(node_id); };
	}

	/**
	 * Clears the list of manual penalties that are applied during path finding.
	 */
	public void clear_manual_penalties() {
		bindings.ProbabilisticScorer_clear_manual_penalties(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.ProbabilisticScorer_as_Score(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ProbabilisticScorer object into a byte array which can be read by ProbabilisticScorer_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ProbabilisticScorer_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ProbabilisticScorer from a byte array, created by ProbabilisticScorer_write
	 */
	public static Result_ProbabilisticScorerDecodeErrorZ read(byte[] ser, org.ldk.structs.ProbabilisticScoringParameters arg_a, org.ldk.structs.NetworkGraph arg_b, org.ldk.structs.Logger arg_c) {
		long ret = bindings.ProbabilisticScorer_read(ser, arg_a == null ? 0 : arg_a.ptr, arg_b == null ? 0 : arg_b.ptr, arg_c == null ? 0 : arg_c.ptr);
		Reference.reachabilityFence(ser);
		Reference.reachabilityFence(arg_a);
		Reference.reachabilityFence(arg_b);
		Reference.reachabilityFence(arg_c);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ProbabilisticScorerDecodeErrorZ ret_hu_conv = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_c); };
		return ret_hu_conv;
	}

}
