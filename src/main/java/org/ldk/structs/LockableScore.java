package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A scorer that is accessed under a lock.
 * 
 * Needed so that calls to [`Score::channel_penalty_msat`] in [`find_route`] can be made while
 * having shared ownership of a scorer but without requiring internal locking in [`Score`]
 * implementations. Internal locking would be detrimental to route finding performance and could
 * result in [`Score::channel_penalty_msat`] returning a different value for the same channel.
 * 
 * [`find_route`]: crate::routing::router::find_route
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class LockableScore extends CommonBase {
	final bindings.LDKLockableScore bindings_instance;
	LockableScore(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private LockableScore(bindings.LDKLockableScore arg) {
		super(bindings.LDKLockableScore_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.LockableScore_free(ptr); } super.finalize();
	}

	public static interface LockableScoreInterface {
		/**
		 * Returns the locked scorer.
		 */
		Score lock();
	}
	private static class LDKLockableScoreHolder { LockableScore held; }
	public static LockableScore new_impl(LockableScoreInterface arg) {
		final LDKLockableScoreHolder impl_holder = new LDKLockableScoreHolder();
		impl_holder.held = new LockableScore(new bindings.LDKLockableScore() {
			@Override public long lock() {
				Score ret = arg.lock();
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.ptr;
				impl_holder.held.ptrs_to.add(ret);
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the locked scorer.
	 */
	public Score lock() {
		long ret = bindings.LockableScore_lock(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
