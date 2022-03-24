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
 * Based on *Optimally Reliable & Cheap Payment Flows on the Lightning Network* by Rene Pickhardt
 * and Stefan Richter [[1]]. Given the uncertainty of channel liquidity balances, probability
 * distributions are defined based on knowledge learned from successful and unsuccessful attempts.
 * Then the negative `log10` of the success probability is used to determine the cost of routing a
 * specific HTLC amount through a channel.
 * 
 * Knowledge about channel liquidity balances takes the form of upper and lower bounds on the
 * possible liquidity. Certainty of the bounds is decreased over time using a decay function. See
 * [`ProbabilisticScoringParameters`] for details.
 * 
 * Since the scorer aims to learn the current channel liquidity balances, it works best for nodes
 * with high payment volume or that actively probe the [`NetworkGraph`]. Nodes with low payment
 * volume are more likely to experience failed payment paths, which would need to be retried.
 * 
 * # Note
 * 
 * Mixing the `no-std` feature between serialization and deserialization results in undefined
 * behavior.
 * 
 * [1]: https://arxiv.org/abs/2107.05322
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
	public static ProbabilisticScorer of(ProbabilisticScoringParameters params, NetworkGraph network_graph) {
		long ret = bindings.ProbabilisticScorer_new(params == null ? 0 : params.ptr & ~1, network_graph == null ? 0 : network_graph.ptr & ~1);
		Reference.reachabilityFence(params);
		Reference.reachabilityFence(network_graph);
		if (ret >= 0 && ret <= 4096) { return null; }
		ProbabilisticScorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ProbabilisticScorer(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(network_graph);
		return ret_hu_conv;
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
		ret_hu_conv.ptrs_to.add(this);
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
	public static Result_ProbabilisticScorerDecodeErrorZ read(byte[] ser, TwoTuple_ProbabilisticScoringParametersNetworkGraphZ arg) {
		long ret = bindings.ProbabilisticScorer_read(ser, arg != null ? arg.ptr : 0);
		Reference.reachabilityFence(ser);
		Reference.reachabilityFence(arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ProbabilisticScorerDecodeErrorZ ret_hu_conv = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
