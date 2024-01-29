
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of ScoreLookUp */
public interface ScoreLookUpInterface {
	/**Returns the fee in msats willing to be paid to avoid routing `send_amt_msat` through the
	 * given channel in the direction from `source` to `target`.
	 * 
	 * The channel's capacity (less any other MPP parts that are also being considered for use in
	 * the same payment) is given by `capacity_msat`. It may be determined from various sources
	 * such as a chain data, network gossip, or invoice hints. For invoice hints, a capacity near
	 * [`u64::max_value`] is given to indicate sufficient capacity for the invoice's full amount.
	 * Thus, implementations should be overflow-safe.
	 */
	long channel_penalty_msat(CandidateRouteHop candidate, ChannelUsage usage, ProbabilisticScoringFeeParameters score_params);
}

/**
 * An interface used to score payment channels for path finding.
 * 
 * `ScoreLookUp` is used to determine the penalty for a given channel.
 * 
 * Scoring is in terms of fees willing to be paid in order to avoid routing through a channel.
 */
public class ScoreLookUp : CommonBase {
	internal bindings.LDKScoreLookUp bindings_instance;
	internal long instance_idx;

	internal ScoreLookUp(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~ScoreLookUp() {
		if (ptr != 0) { bindings.ScoreLookUp_free(ptr); }
	}

	private class LDKScoreLookUpHolder { internal ScoreLookUp held; }
	private class LDKScoreLookUpImpl : bindings.LDKScoreLookUp {
		internal LDKScoreLookUpImpl(ScoreLookUpInterface arg, LDKScoreLookUpHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ScoreLookUpInterface arg;
		private LDKScoreLookUpHolder impl_holder;
		public long channel_penalty_msat(long _candidate, long _usage, long _score_params) {
			CandidateRouteHop _candidate_hu_conv = CandidateRouteHop.constr_from_ptr(_candidate);
			org.ldk.structs.ChannelUsage _usage_hu_conv = null; if (_usage < 0 || _usage > 4096) { _usage_hu_conv = new org.ldk.structs.ChannelUsage(null, _usage); }
			if (_usage_hu_conv != null) { _usage_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ProbabilisticScoringFeeParameters _score_params_hu_conv = null; if (_score_params < 0 || _score_params > 4096) { _score_params_hu_conv = new org.ldk.structs.ProbabilisticScoringFeeParameters(null, _score_params); }
			long ret = arg.channel_penalty_msat(_candidate_hu_conv, _usage_hu_conv, _score_params_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
	}

	/** Creates a new instance of ScoreLookUp from a given implementation */
	public static ScoreLookUp new_impl(ScoreLookUpInterface arg) {
		LDKScoreLookUpHolder impl_holder = new LDKScoreLookUpHolder();
		LDKScoreLookUpImpl impl = new LDKScoreLookUpImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKScoreLookUp_new(impl);

		impl_holder.held = new ScoreLookUp(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
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
	public long channel_penalty_msat(org.ldk.structs.CandidateRouteHop candidate, org.ldk.structs.ChannelUsage usage, org.ldk.structs.ProbabilisticScoringFeeParameters score_params) {
		long ret = bindings.ScoreLookUp_channel_penalty_msat(this.ptr, candidate == null ? 0 : candidate.ptr, usage == null ? 0 : usage.ptr, score_params == null ? 0 : score_params.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(candidate);
		GC.KeepAlive(usage);
		GC.KeepAlive(score_params);
		if (this != null) { this.ptrs_to.AddLast(usage); };
		if (this != null) { this.ptrs_to.AddLast(score_params); };
		return ret;
	}

}
} } }
