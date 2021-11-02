package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
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

	public static interface ScoreInterface {
		/**
		 * Returns the fee in msats willing to be paid to avoid routing through the given channel
		 * in the direction from `source` to `target`.
		 */
		long channel_penalty_msat(long short_channel_id, NodeId source, NodeId target);
		/**
		 * Handles updating channel penalties after failing to route through a channel.
		 */
		void payment_path_failed(RouteHop[] path, long short_channel_id);
	}
	private static class LDKScoreHolder { Score held; }
	public static Score new_impl(ScoreInterface arg) {
		final LDKScoreHolder impl_holder = new LDKScoreHolder();
		impl_holder.held = new Score(new bindings.LDKScore() {
			@Override public long channel_penalty_msat(long short_channel_id, long source, long target) {
				NodeId source_hu_conv = null; if (source < 0 || source > 4096) { source_hu_conv = new NodeId(null, source); }
				NodeId target_hu_conv = null; if (target < 0 || target > 4096) { target_hu_conv = new NodeId(null, target); }
				long ret = arg.channel_penalty_msat(short_channel_id, source_hu_conv, target_hu_conv);
				return ret;
			}
			@Override public void payment_path_failed(long[] path, long short_channel_id) {
				RouteHop[] path_conv_10_arr = new RouteHop[path.length];
				for (int k = 0; k < path.length; k++) {
					long path_conv_10 = path[k];
					RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new RouteHop(null, path_conv_10); }
					path_conv_10_hu_conv.ptrs_to.add(this);
					path_conv_10_arr[k] = path_conv_10_hu_conv;
				}
				arg.payment_path_failed(path_conv_10_arr, short_channel_id);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the fee in msats willing to be paid to avoid routing through the given channel
	 * in the direction from `source` to `target`.
	 */
	public long channel_penalty_msat(long short_channel_id, NodeId source, NodeId target) {
		long ret = bindings.Score_channel_penalty_msat(this.ptr, short_channel_id, source == null ? 0 : source.ptr & ~1, target == null ? 0 : target.ptr & ~1);
		this.ptrs_to.add(source);
		this.ptrs_to.add(target);
		return ret;
	}

	/**
	 * Handles updating channel penalties after failing to route through a channel.
	 */
	public void payment_path_failed(RouteHop[] path, long short_channel_id) {
		bindings.Score_payment_path_failed(this.ptr, path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr & ~1).toArray() : null, short_channel_id);
	}

}
