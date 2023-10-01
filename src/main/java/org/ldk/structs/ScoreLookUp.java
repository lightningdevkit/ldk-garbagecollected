package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * An interface used to score payment channels for path finding.
 * 
 * `ScoreLookUp` is used to determine the penalty for a given channel.
 * 
 * Scoring is in terms of fees willing to be paid in order to avoid routing through a channel.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ScoreLookUp extends CommonBase {
	final bindings.LDKScoreLookUp bindings_instance;
	ScoreLookUp(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private ScoreLookUp(bindings.LDKScoreLookUp arg) {
		super(bindings.LDKScoreLookUp_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.ScoreLookUp_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.ScoreLookUp_free(ptr); }
		ptr = 0;
	}
	public static interface ScoreLookUpInterface {
		/**
		 * Returns the fee in msats willing to be paid to avoid routing `send_amt_msat` through the
		 * given channel in the direction from `source` to `target`.
		 * 
		 * The channel's capacity (less any other MPP parts that are also being considered for use in
		 * the same payment) is given by `capacity_msat`. It may be determined from various sources
		 * such as a chain data, network gossip, or invoice hints. For invoice hints, a capacity near
		 * [`u64::max_value`] is given to indicate sufficient capacity for the invoice's full amount.
		 * Thus, implementations should be overflow-safe.
		 */
		long channel_penalty_msat(long short_channel_id, NodeId source, NodeId target, ChannelUsage usage, ProbabilisticScoringFeeParameters score_params);
	}
	private static class LDKScoreLookUpHolder { ScoreLookUp held; }
	public static ScoreLookUp new_impl(ScoreLookUpInterface arg) {
		final LDKScoreLookUpHolder impl_holder = new LDKScoreLookUpHolder();
		impl_holder.held = new ScoreLookUp(new bindings.LDKScoreLookUp() {
			@Override public long channel_penalty_msat(long short_channel_id, long source, long target, long usage, long score_params) {
				org.ldk.structs.NodeId source_hu_conv = null; if (source < 0 || source > 4096) { source_hu_conv = new org.ldk.structs.NodeId(null, source); }
				org.ldk.structs.NodeId target_hu_conv = null; if (target < 0 || target > 4096) { target_hu_conv = new org.ldk.structs.NodeId(null, target); }
				org.ldk.structs.ChannelUsage usage_hu_conv = null; if (usage < 0 || usage > 4096) { usage_hu_conv = new org.ldk.structs.ChannelUsage(null, usage); }
				if (usage_hu_conv != null) { usage_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.ProbabilisticScoringFeeParameters score_params_hu_conv = null; if (score_params < 0 || score_params > 4096) { score_params_hu_conv = new org.ldk.structs.ProbabilisticScoringFeeParameters(null, score_params); }
				long ret = arg.channel_penalty_msat(short_channel_id, source_hu_conv, target_hu_conv, usage_hu_conv, score_params_hu_conv);
				Reference.reachabilityFence(arg);
				return ret;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the fee in msats willing to be paid to avoid routing `send_amt_msat` through the
	 * given channel in the direction from `source` to `target`.
	 * 
	 * The channel's capacity (less any other MPP parts that are also being considered for use in
	 * the same payment) is given by `capacity_msat`. It may be determined from various sources
	 * such as a chain data, network gossip, or invoice hints. For invoice hints, a capacity near
	 * [`u64::max_value`] is given to indicate sufficient capacity for the invoice's full amount.
	 * Thus, implementations should be overflow-safe.
	 */
	public long channel_penalty_msat(long short_channel_id, org.ldk.structs.NodeId source, org.ldk.structs.NodeId target, org.ldk.structs.ChannelUsage usage, org.ldk.structs.ProbabilisticScoringFeeParameters score_params) {
		long ret = bindings.ScoreLookUp_channel_penalty_msat(this.ptr, short_channel_id, source == null ? 0 : source.ptr, target == null ? 0 : target.ptr, usage == null ? 0 : usage.ptr, score_params == null ? 0 : score_params.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(source);
		Reference.reachabilityFence(target);
		Reference.reachabilityFence(usage);
		Reference.reachabilityFence(score_params);
		if (this != null) { this.ptrs_to.add(source); };
		if (this != null) { this.ptrs_to.add(target); };
		if (this != null) { this.ptrs_to.add(usage); };
		if (this != null) { this.ptrs_to.add(score_params); };
		return ret;
	}

}
