using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An interface used to score payment channels for path finding.
 * 
 * \tScoring is in terms of fees willing to be paid in order to avoid routing through a channel.
 */
public class Score : CommonBase {
	internal readonly bindings.LDKScore bindings_instance;
	internal Score(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Score(bindings.LDKScore arg) : base(bindings.LDKScore_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Score() {
		if (ptr != 0) { bindings.Score_free(ptr); }
	}

	public interface ScoreInterface {
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
		long channel_penalty_msat(long _short_channel_id, NodeId _source, NodeId _target, ChannelUsage _usage, ProbabilisticScoringFeeParameters _score_params);
		/**
		 * Handles updating channel penalties after failing to route through a channel.
		 */
		void payment_path_failed(Path _path, long _short_channel_id);
		/**
		 * Handles updating channel penalties after successfully routing along a path.
		 */
		void payment_path_successful(Path _path);
		/**
		 * Handles updating channel penalties after a probe over the given path failed.
		 */
		void probe_failed(Path _path, long _short_channel_id);
		/**
		 * Handles updating channel penalties after a probe over the given path succeeded.
		 */
		void probe_successful(Path _path);
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private class LDKScoreHolder { internal Score held; }
	private class LDKScoreImpl : bindings.LDKScore {
		internal LDKScoreImpl(ScoreInterface arg, LDKScoreHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ScoreInterface arg;
		private LDKScoreHolder impl_holder;
		public long channel_penalty_msat(long _short_channel_id, long _source, long _target, long _usage, long _score_params) {
			org.ldk.structs.NodeId _source_hu_conv = null; if (_source < 0 || _source > 4096) { _source_hu_conv = new org.ldk.structs.NodeId(null, _source); }
			org.ldk.structs.NodeId _target_hu_conv = null; if (_target < 0 || _target > 4096) { _target_hu_conv = new org.ldk.structs.NodeId(null, _target); }
			org.ldk.structs.ChannelUsage _usage_hu_conv = null; if (_usage < 0 || _usage > 4096) { _usage_hu_conv = new org.ldk.structs.ChannelUsage(null, _usage); }
			if (_usage_hu_conv != null) { _usage_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.ProbabilisticScoringFeeParameters _score_params_hu_conv = null; if (_score_params < 0 || _score_params > 4096) { _score_params_hu_conv = new org.ldk.structs.ProbabilisticScoringFeeParameters(null, _score_params); }
			long ret = arg.channel_penalty_msat(_short_channel_id, _source_hu_conv, _target_hu_conv, _usage_hu_conv, _score_params_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
		public void payment_path_failed(long _path, long _short_channel_id) {
			org.ldk.structs.Path _path_hu_conv = null; if (_path < 0 || _path > 4096) { _path_hu_conv = new org.ldk.structs.Path(null, _path); }
			arg.payment_path_failed(_path_hu_conv, _short_channel_id);
				GC.KeepAlive(arg);
		}
		public void payment_path_successful(long _path) {
			org.ldk.structs.Path _path_hu_conv = null; if (_path < 0 || _path > 4096) { _path_hu_conv = new org.ldk.structs.Path(null, _path); }
			arg.payment_path_successful(_path_hu_conv);
				GC.KeepAlive(arg);
		}
		public void probe_failed(long _path, long _short_channel_id) {
			org.ldk.structs.Path _path_hu_conv = null; if (_path < 0 || _path > 4096) { _path_hu_conv = new org.ldk.structs.Path(null, _path); }
			arg.probe_failed(_path_hu_conv, _short_channel_id);
				GC.KeepAlive(arg);
		}
		public void probe_successful(long _path) {
			org.ldk.structs.Path _path_hu_conv = null; if (_path < 0 || _path > 4096) { _path_hu_conv = new org.ldk.structs.Path(null, _path); }
			arg.probe_successful(_path_hu_conv);
				GC.KeepAlive(arg);
		}
		public byte[] write() {
			byte[] ret = arg.write();
				GC.KeepAlive(arg);
			return ret;
		}
	}
	public static Score new_impl(ScoreInterface arg) {
		LDKScoreHolder impl_holder = new LDKScoreHolder();
		impl_holder.held = new Score(new LDKScoreImpl(arg, impl_holder));
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
		long ret = bindings.Score_channel_penalty_msat(this.ptr, short_channel_id, source == null ? 0 : source.ptr, target == null ? 0 : target.ptr, usage == null ? 0 : usage.ptr, score_params == null ? 0 : score_params.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(short_channel_id);
		GC.KeepAlive(source);
		GC.KeepAlive(target);
		GC.KeepAlive(usage);
		GC.KeepAlive(score_params);
		if (this != null) { this.ptrs_to.AddLast(source); };
		if (this != null) { this.ptrs_to.AddLast(target); };
		if (this != null) { this.ptrs_to.AddLast(usage); };
		if (this != null) { this.ptrs_to.AddLast(score_params); };
		return ret;
	}

	/**
	 * Handles updating channel penalties after failing to route through a channel.
	 */
	public void payment_path_failed(org.ldk.structs.Path path, long short_channel_id) {
		bindings.Score_payment_path_failed(this.ptr, path == null ? 0 : path.ptr, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		GC.KeepAlive(short_channel_id);
		if (this != null) { this.ptrs_to.AddLast(path); };
	}

	/**
	 * Handles updating channel penalties after successfully routing along a path.
	 */
	public void payment_path_successful(org.ldk.structs.Path path) {
		bindings.Score_payment_path_successful(this.ptr, path == null ? 0 : path.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		if (this != null) { this.ptrs_to.AddLast(path); };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path failed.
	 */
	public void probe_failed(org.ldk.structs.Path path, long short_channel_id) {
		bindings.Score_probe_failed(this.ptr, path == null ? 0 : path.ptr, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		GC.KeepAlive(short_channel_id);
		if (this != null) { this.ptrs_to.AddLast(path); };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path succeeded.
	 */
	public void probe_successful(org.ldk.structs.Path path) {
		bindings.Score_probe_successful(this.ptr, path == null ? 0 : path.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		if (this != null) { this.ptrs_to.AddLast(path); };
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.Score_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
