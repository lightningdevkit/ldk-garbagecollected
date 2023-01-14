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
		long channel_penalty_msat(long _short_channel_id, NodeId _source, NodeId _target, ChannelUsage _usage);
		/**
		 * Handles updating channel penalties after failing to route through a channel.
		 */
		void payment_path_failed(RouteHop[] _path, long _short_channel_id);
		/**
		 * Handles updating channel penalties after successfully routing along a path.
		 */
		void payment_path_successful(RouteHop[] _path);
		/**
		 * Handles updating channel penalties after a probe over the given path failed.
		 */
		void probe_failed(RouteHop[] _path, long _short_channel_id);
		/**
		 * Handles updating channel penalties after a probe over the given path succeeded.
		 */
		void probe_successful(RouteHop[] _path);
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
		public long channel_penalty_msat(long _short_channel_id, long _source, long _target, long _usage) {
			org.ldk.structs.NodeId _source_hu_conv = null; if (_source < 0 || _source > 4096) { _source_hu_conv = new org.ldk.structs.NodeId(null, _source); }
			org.ldk.structs.NodeId _target_hu_conv = null; if (_target < 0 || _target > 4096) { _target_hu_conv = new org.ldk.structs.NodeId(null, _target); }
			org.ldk.structs.ChannelUsage _usage_hu_conv = null; if (_usage < 0 || _usage > 4096) { _usage_hu_conv = new org.ldk.structs.ChannelUsage(null, _usage); }
			if (_usage_hu_conv != null) { _usage_hu_conv.ptrs_to.AddLast(this); };
			long ret = arg.channel_penalty_msat(_short_channel_id, _source_hu_conv, _target_hu_conv, _usage_hu_conv);
				GC.KeepAlive(arg);
			return ret;
		}
		public void payment_path_failed(long[] _path, long _short_channel_id) {
			int _path_conv_10_len = _path.Length;
			RouteHop[] _path_conv_10_arr = new RouteHop[_path_conv_10_len];
			for (int k = 0; k < _path_conv_10_len; k++) {
				long _path_conv_10 = _path[k];
				org.ldk.structs.RouteHop _path_conv_10_hu_conv = null; if (_path_conv_10 < 0 || _path_conv_10 > 4096) { _path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, _path_conv_10); }
				if (_path_conv_10_hu_conv != null) { _path_conv_10_hu_conv.ptrs_to.AddLast(this); };
				_path_conv_10_arr[k] = _path_conv_10_hu_conv;
			}
			arg.payment_path_failed(_path_conv_10_arr, _short_channel_id);
				GC.KeepAlive(arg);
		}
		public void payment_path_successful(long[] _path) {
			int _path_conv_10_len = _path.Length;
			RouteHop[] _path_conv_10_arr = new RouteHop[_path_conv_10_len];
			for (int k = 0; k < _path_conv_10_len; k++) {
				long _path_conv_10 = _path[k];
				org.ldk.structs.RouteHop _path_conv_10_hu_conv = null; if (_path_conv_10 < 0 || _path_conv_10 > 4096) { _path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, _path_conv_10); }
				if (_path_conv_10_hu_conv != null) { _path_conv_10_hu_conv.ptrs_to.AddLast(this); };
				_path_conv_10_arr[k] = _path_conv_10_hu_conv;
			}
			arg.payment_path_successful(_path_conv_10_arr);
				GC.KeepAlive(arg);
		}
		public void probe_failed(long[] _path, long _short_channel_id) {
			int _path_conv_10_len = _path.Length;
			RouteHop[] _path_conv_10_arr = new RouteHop[_path_conv_10_len];
			for (int k = 0; k < _path_conv_10_len; k++) {
				long _path_conv_10 = _path[k];
				org.ldk.structs.RouteHop _path_conv_10_hu_conv = null; if (_path_conv_10 < 0 || _path_conv_10 > 4096) { _path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, _path_conv_10); }
				if (_path_conv_10_hu_conv != null) { _path_conv_10_hu_conv.ptrs_to.AddLast(this); };
				_path_conv_10_arr[k] = _path_conv_10_hu_conv;
			}
			arg.probe_failed(_path_conv_10_arr, _short_channel_id);
				GC.KeepAlive(arg);
		}
		public void probe_successful(long[] _path) {
			int _path_conv_10_len = _path.Length;
			RouteHop[] _path_conv_10_arr = new RouteHop[_path_conv_10_len];
			for (int k = 0; k < _path_conv_10_len; k++) {
				long _path_conv_10 = _path[k];
				org.ldk.structs.RouteHop _path_conv_10_hu_conv = null; if (_path_conv_10 < 0 || _path_conv_10 > 4096) { _path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, _path_conv_10); }
				if (_path_conv_10_hu_conv != null) { _path_conv_10_hu_conv.ptrs_to.AddLast(this); };
				_path_conv_10_arr[k] = _path_conv_10_hu_conv;
			}
			arg.probe_successful(_path_conv_10_arr);
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
	public long channel_penalty_msat(long short_channel_id, org.ldk.structs.NodeId source, org.ldk.structs.NodeId target, org.ldk.structs.ChannelUsage usage) {
		long ret = bindings.Score_channel_penalty_msat(this.ptr, short_channel_id, source == null ? 0 : source.ptr, target == null ? 0 : target.ptr, usage == null ? 0 : usage.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(short_channel_id);
		GC.KeepAlive(source);
		GC.KeepAlive(target);
		GC.KeepAlive(usage);
		if (this != null) { this.ptrs_to.AddLast(source); };
		if (this != null) { this.ptrs_to.AddLast(target); };
		if (this != null) { this.ptrs_to.AddLast(usage); };
		return ret;
	}

	/**
	 * Handles updating channel penalties after failing to route through a channel.
	 */
	public void payment_path_failed(RouteHop[] path, long short_channel_id) {
		bindings.Score_payment_path_failed(this.ptr, path != null ? InternalUtils.mapArray(path, path_conv_10 => path_conv_10 == null ? 0 : path_conv_10.ptr) : null, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		GC.KeepAlive(short_channel_id);
		foreach (RouteHop path_conv_10 in path) { if (this != null) { this.ptrs_to.AddLast(path_conv_10); }; };
	}

	/**
	 * Handles updating channel penalties after successfully routing along a path.
	 */
	public void payment_path_successful(RouteHop[] path) {
		bindings.Score_payment_path_successful(this.ptr, path != null ? InternalUtils.mapArray(path, path_conv_10 => path_conv_10 == null ? 0 : path_conv_10.ptr) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		foreach (RouteHop path_conv_10 in path) { if (this != null) { this.ptrs_to.AddLast(path_conv_10); }; };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path failed.
	 */
	public void probe_failed(RouteHop[] path, long short_channel_id) {
		bindings.Score_probe_failed(this.ptr, path != null ? InternalUtils.mapArray(path, path_conv_10 => path_conv_10 == null ? 0 : path_conv_10.ptr) : null, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		GC.KeepAlive(short_channel_id);
		foreach (RouteHop path_conv_10 in path) { if (this != null) { this.ptrs_to.AddLast(path_conv_10); }; };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path succeeded.
	 */
	public void probe_successful(RouteHop[] path) {
		bindings.Score_probe_successful(this.ptr, path != null ? InternalUtils.mapArray(path, path_conv_10 => path_conv_10 == null ? 0 : path_conv_10.ptr) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		foreach (RouteHop path_conv_10 in path) { if (this != null) { this.ptrs_to.AddLast(path_conv_10); }; };
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
