package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * `ScoreUpdate` is used to update the scorer's internal state after a payment attempt.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ScoreUpdate extends CommonBase {
	final bindings.LDKScoreUpdate bindings_instance;
	ScoreUpdate(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private ScoreUpdate(bindings.LDKScoreUpdate arg) {
		super(bindings.LDKScoreUpdate_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.ScoreUpdate_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.ScoreUpdate_free(ptr); }
		ptr = 0;
	}
	public static interface ScoreUpdateInterface {
		/**
		 * Handles updating channel penalties after failing to route through a channel.
		 */
		void payment_path_failed(Path path, long short_channel_id, long duration_since_epoch);
		/**
		 * Handles updating channel penalties after successfully routing along a path.
		 */
		void payment_path_successful(Path path, long duration_since_epoch);
		/**
		 * Handles updating channel penalties after a probe over the given path failed.
		 */
		void probe_failed(Path path, long short_channel_id, long duration_since_epoch);
		/**
		 * Handles updating channel penalties after a probe over the given path succeeded.
		 */
		void probe_successful(Path path, long duration_since_epoch);
		/**
		 * Scorers may wish to reduce their certainty of channel liquidity information over time.
		 * Thus, this method is provided to allow scorers to observe the passage of time - the holder
		 * of this object should call this method regularly (generally via the
		 * `lightning-background-processor` crate).
		 */
		void time_passed(long duration_since_epoch);
	}
	private static class LDKScoreUpdateHolder { ScoreUpdate held; }
	public static ScoreUpdate new_impl(ScoreUpdateInterface arg) {
		final LDKScoreUpdateHolder impl_holder = new LDKScoreUpdateHolder();
		impl_holder.held = new ScoreUpdate(new bindings.LDKScoreUpdate() {
			@Override public void payment_path_failed(long path, long short_channel_id, long duration_since_epoch) {
				org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
				arg.payment_path_failed(path_hu_conv, short_channel_id, duration_since_epoch);
				Reference.reachabilityFence(arg);
			}
			@Override public void payment_path_successful(long path, long duration_since_epoch) {
				org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
				arg.payment_path_successful(path_hu_conv, duration_since_epoch);
				Reference.reachabilityFence(arg);
			}
			@Override public void probe_failed(long path, long short_channel_id, long duration_since_epoch) {
				org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
				arg.probe_failed(path_hu_conv, short_channel_id, duration_since_epoch);
				Reference.reachabilityFence(arg);
			}
			@Override public void probe_successful(long path, long duration_since_epoch) {
				org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
				arg.probe_successful(path_hu_conv, duration_since_epoch);
				Reference.reachabilityFence(arg);
			}
			@Override public void time_passed(long duration_since_epoch) {
				arg.time_passed(duration_since_epoch);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Handles updating channel penalties after failing to route through a channel.
	 */
	public void payment_path_failed(org.ldk.structs.Path path, long short_channel_id, long duration_since_epoch) {
		bindings.ScoreUpdate_payment_path_failed(this.ptr, path == null ? 0 : path.ptr, short_channel_id, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(duration_since_epoch);
		if (this != null) { this.ptrs_to.add(path); };
	}

	/**
	 * Handles updating channel penalties after successfully routing along a path.
	 */
	public void payment_path_successful(org.ldk.structs.Path path, long duration_since_epoch) {
		bindings.ScoreUpdate_payment_path_successful(this.ptr, path == null ? 0 : path.ptr, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(duration_since_epoch);
		if (this != null) { this.ptrs_to.add(path); };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path failed.
	 */
	public void probe_failed(org.ldk.structs.Path path, long short_channel_id, long duration_since_epoch) {
		bindings.ScoreUpdate_probe_failed(this.ptr, path == null ? 0 : path.ptr, short_channel_id, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(duration_since_epoch);
		if (this != null) { this.ptrs_to.add(path); };
	}

	/**
	 * Handles updating channel penalties after a probe over the given path succeeded.
	 */
	public void probe_successful(org.ldk.structs.Path path, long duration_since_epoch) {
		bindings.ScoreUpdate_probe_successful(this.ptr, path == null ? 0 : path.ptr, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(duration_since_epoch);
		if (this != null) { this.ptrs_to.add(path); };
	}

	/**
	 * Scorers may wish to reduce their certainty of channel liquidity information over time.
	 * Thus, this method is provided to allow scorers to observe the passage of time - the holder
	 * of this object should call this method regularly (generally via the
	 * `lightning-background-processor` crate).
	 */
	public void time_passed(long duration_since_epoch) {
		bindings.ScoreUpdate_time_passed(this.ptr, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(duration_since_epoch);
	}

}
