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
 * \tScoring is in terms of fees willing to be paid in order to avoid routing through a channel.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Score extends CommonBase {
	final bindings.LDKScore bindings_instance;
	Score(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Score(bindings.LDKScore arg) {
		super(bindings.LDKScore_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Score_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.Score_free(ptr); }
		ptr = 0;
	}
	public static interface ScoreInterface {
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
		long channel_penalty_msat(long short_channel_id, NodeId source, NodeId target, ChannelUsage usage);
		/**
		 * Handles updating channel penalties after failing to route through a channel.
		 */
		void payment_path_failed(Path path, long short_channel_id);
		/**
		 * Handles updating channel penalties after successfully routing along a path.
		 */
		void payment_path_successful(Path path);
		/**
		 * Handles updating channel penalties after a probe over the given path failed.
		 */
		void probe_failed(Path path, long short_channel_id);
		/**
		 * Handles updating channel penalties after a probe over the given path succeeded.
		 */
		void probe_successful(Path path);
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private static class LDKScoreHolder { Score held; }
	public static Score new_impl(ScoreInterface arg) {
		final LDKScoreHolder impl_holder = new LDKScoreHolder();
		impl_holder.held = new Score(new bindings.LDKScore() {
			@Override public long channel_penalty_msat(long short_channel_id, long source, long target, long usage) {
				org.ldk.structs.NodeId source_hu_conv = null; if (source < 0 || source > 4096) { source_hu_conv = new org.ldk.structs.NodeId(null, source); }
				org.ldk.structs.NodeId target_hu_conv = null; if (target < 0 || target > 4096) { target_hu_conv = new org.ldk.structs.NodeId(null, target); }
				org.ldk.structs.ChannelUsage usage_hu_conv = null; if (usage < 0 || usage > 4096) { usage_hu_conv = new org.ldk.structs.ChannelUsage(null, usage); }
				if (usage_hu_conv != null) { usage_hu_conv.ptrs_to.add(this); };
				long ret = arg.channel_penalty_msat(short_channel_id, source_hu_conv, target_hu_conv, usage_hu_conv);
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public void payment_path_failed(long path, long short_channel_id) {
				org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
				arg.payment_path_failed(path_hu_conv, short_channel_id);
				Reference.reachabilityFence(arg);
			}
			@Override public void payment_path_successful(long path) {
				org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
				arg.payment_path_successful(path_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void probe_failed(long path, long short_channel_id) {
				org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
				arg.probe_failed(path_hu_conv, short_channel_id);
				Reference.reachabilityFence(arg);
			}
			@Override public void probe_successful(long path) {
				org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
				arg.probe_successful(path_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public byte[] write() {
				byte[] ret = arg.write();
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
	public long channel_penalty_msat(long short_channel_id, org.ldk.structs.NodeId source, org.ldk.structs.NodeId target, org.ldk.structs.ChannelUsage usage) {
		long ret = bindings.Score_channel_penalty_msat(this.ptr, short_channel_id, source == null ? 0 : source.ptr, target == null ? 0 : target.ptr, usage == null ? 0 : usage.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(source);
		Reference.reachabilityFence(target);
		Reference.reachabilityFence(usage);
		if (this != null) { this.ptrs_to.add(source); };
		if (this != null) { this.ptrs_to.add(target); };
		if (this != null) { this.ptrs_to.add(usage); };
		return ret;
	}

	/**
	 * Handles updating channel penalties after failing to route through a channel.
	 */
	public void payment_path_failed(org.ldk.structs.Path path, long short_channel_id) {
		bindings.Score_payment_path_failed(this.ptr, path == null ? 0 : path.ptr, short_channel_id);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		if (this != null) { this.ptrs_to.add(path); };
	}

	/**
	 * Handles updating channel penalties after successfully routing along a path.
	 */
	public void payment_path_successful(org.ldk.structs.Path path) {
		bindings.Score_payment_path_successful(this.ptr, path == null ? 0 : path.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		if (this != null) { this.ptrs_to.add(path); };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path failed.
	 */
	public void probe_failed(org.ldk.structs.Path path, long short_channel_id) {
		bindings.Score_probe_failed(this.ptr, path == null ? 0 : path.ptr, short_channel_id);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		if (this != null) { this.ptrs_to.add(path); };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path succeeded.
	 */
	public void probe_successful(org.ldk.structs.Path path) {
		bindings.Score_probe_successful(this.ptr, path == null ? 0 : path.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		if (this != null) { this.ptrs_to.add(path); };
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.Score_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
