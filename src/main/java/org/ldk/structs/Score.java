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
		 * Returns the fee in msats willing to be paid to avoid routing through the given channel.
		 */
		long channel_penalty_msat(long short_channel_id);
	}
	private static class LDKScoreHolder { Score held; }
	public static Score new_impl(ScoreInterface arg) {
		final LDKScoreHolder impl_holder = new LDKScoreHolder();
		impl_holder.held = new Score(new bindings.LDKScore() {
			@Override public long channel_penalty_msat(long short_channel_id) {
				long ret = arg.channel_penalty_msat(short_channel_id);
				return ret;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the fee in msats willing to be paid to avoid routing through the given channel.
	 */
	public long channel_penalty_msat(long short_channel_id) {
		long ret = bindings.Score_channel_penalty_msat(this.ptr, short_channel_id);
		return ret;
	}

}
