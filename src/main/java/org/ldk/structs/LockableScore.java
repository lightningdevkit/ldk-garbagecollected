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
 * Needed so that calls to [`ScoreLookUp::channel_penalty_msat`] in [`find_route`] can be made while
 * having shared ownership of a scorer but without requiring internal locking in [`ScoreUpdate`]
 * implementations. Internal locking would be detrimental to route finding performance and could
 * result in [`ScoreLookUp::channel_penalty_msat`] returning a different value for the same channel.
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
		if (ptr != 0) { bindings.LockableScore_free(ptr); }
		ptr = 0;
	}
	public static interface LockableScoreInterface {
		/**
		 * Returns read locked scorer.
		 */
		ScoreLookUp read_lock();
		/**
		 * Returns write locked scorer.
		 */
		ScoreUpdate write_lock();
	}
	private static class LDKLockableScoreHolder { LockableScore held; }
	public static LockableScore new_impl(LockableScoreInterface arg) {
		final LDKLockableScoreHolder impl_holder = new LDKLockableScoreHolder();
		impl_holder.held = new LockableScore(new bindings.LDKLockableScore() {
			@Override public long read_lock() {
				ScoreLookUp ret = arg.read_lock();
				Reference.reachabilityFence(arg);
				long result = ret.ptr;
				if (impl_holder.held != null) { impl_holder.held.ptrs_to.add(ret); };
				return result;
			}
			@Override public long write_lock() {
				ScoreUpdate ret = arg.write_lock();
				Reference.reachabilityFence(arg);
				long result = ret.ptr;
				if (impl_holder.held != null) { impl_holder.held.ptrs_to.add(ret); };
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns read locked scorer.
	 */
	public ScoreLookUp read_lock() {
		long ret = bindings.LockableScore_read_lock(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreLookUp ret_hu_conv = new ScoreLookUp(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns write locked scorer.
	 */
	public ScoreUpdate write_lock() {
		long ret = bindings.LockableScore_write_lock(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreUpdate ret_hu_conv = new ScoreUpdate(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
