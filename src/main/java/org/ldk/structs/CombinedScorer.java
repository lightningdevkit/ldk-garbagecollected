package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A probabilistic scorer that combines local and external information to score channels. This scorer is
 * shadow-tracking local only scores, so that it becomes possible to cleanly merge external scores when they become
 * available.
 * 
 * This is useful for nodes that have a limited local view of the network and need to augment their view with scores
 * from an external source to improve payment reliability. The external source may use something like background
 * probing to gather a more complete view of the network. Merging reduces the likelihood of losing unique local data on
 * particular channels.
 * 
 * Note that only the locally acquired data is persisted. After a restart, the external scores will be lost and must be
 * resupplied.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CombinedScorer extends CommonBase {
	CombinedScorer(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CombinedScorer_free(ptr); }
	}

	/**
	 * Create a new combined scorer with the given local scorer.
	 */
	public static CombinedScorer of(ProbabilisticScoringDecayParameters local_scorer_decay_params, NetworkGraph local_scorer_network_graph, Logger local_scorer_logger) {
		long ret = bindings.CombinedScorer_new(bindings.ProbabilisticScorer_new(local_scorer_decay_params.ptr, local_scorer_network_graph.ptr, local_scorer_logger.ptr));
		Reference.reachabilityFence(local_scorer_decay_params);
		Reference.reachabilityFence(local_scorer_network_graph);
		Reference.reachabilityFence(local_scorer_logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CombinedScorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CombinedScorer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		;
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(local_scorer_network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(local_scorer_logger); };
		return ret_hu_conv;
	}

	/**
	 * Merge external channel liquidity information into the scorer.
	 */
	public void merge(org.ldk.structs.ChannelLiquidities external_scores, long duration_since_epoch) {
		bindings.CombinedScorer_merge(this.ptr, external_scores.ptr, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(external_scores);
		Reference.reachabilityFence(duration_since_epoch);
	}

	/**
	 * Overwrite the scorer state with the given external scores.
	 */
	public void set_scores(org.ldk.structs.ChannelLiquidities external_scores) {
		bindings.CombinedScorer_set_scores(this.ptr, external_scores.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(external_scores);
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public ScoreLookUp as_ScoreLookUp() {
		long ret = bindings.CombinedScorer_as_ScoreLookUp(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreLookUp ret_hu_conv = new ScoreLookUp(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public ScoreUpdate as_ScoreUpdate() {
		long ret = bindings.CombinedScorer_as_ScoreUpdate(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreUpdate ret_hu_conv = new ScoreUpdate(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the CombinedScorer object into a byte array which can be read by CombinedScorer_read
	 */
	public byte[] write() {
		byte[] ret = bindings.CombinedScorer_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
