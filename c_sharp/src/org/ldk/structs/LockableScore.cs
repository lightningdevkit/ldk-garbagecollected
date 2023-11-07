
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of LockableScore */
public interface LockableScoreInterface {
	/**Returns read locked scorer.
	 */
	ScoreLookUp read_lock();
	/**Returns write locked scorer.
	 */
	ScoreUpdate write_lock();
}

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
public class LockableScore : CommonBase {
	internal bindings.LDKLockableScore bindings_instance;
	internal long instance_idx;

	internal LockableScore(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~LockableScore() {
		if (ptr != 0) { bindings.LockableScore_free(ptr); }
	}

	private class LDKLockableScoreHolder { internal LockableScore held; }
	private class LDKLockableScoreImpl : bindings.LDKLockableScore {
		internal LDKLockableScoreImpl(LockableScoreInterface arg, LDKLockableScoreHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private LockableScoreInterface arg;
		private LDKLockableScoreHolder impl_holder;
		public long read_lock() {
			ScoreLookUp ret = arg.read_lock();
				GC.KeepAlive(arg);
			long result = ret.ptr;
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
		public long write_lock() {
			ScoreUpdate ret = arg.write_lock();
				GC.KeepAlive(arg);
			long result = ret.ptr;
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
	}

	/** Creates a new instance of LockableScore from a given implementation */
	public static LockableScore new_impl(LockableScoreInterface arg) {
		LDKLockableScoreHolder impl_holder = new LDKLockableScoreHolder();
		LDKLockableScoreImpl impl = new LDKLockableScoreImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKLockableScore_new(impl);

		impl_holder.held = new LockableScore(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Returns read locked scorer.
	 */
	public ScoreLookUp read_lock() {
		long ret = bindings.LockableScore_read_lock(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreLookUp ret_hu_conv = new ScoreLookUp(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns write locked scorer.
	 */
	public ScoreUpdate write_lock() {
		long ret = bindings.LockableScore_write_lock(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreUpdate ret_hu_conv = new ScoreUpdate(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
