using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

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
public class LockableScore : CommonBase {
	internal readonly bindings.LDKLockableScore bindings_instance;
	internal LockableScore(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private LockableScore(bindings.LDKLockableScore arg) : base(bindings.LDKLockableScore_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~LockableScore() {
		if (ptr != 0) { bindings.LockableScore_free(ptr); }
	}

	public interface LockableScoreInterface {
		/**
		 * Returns the locked scorer.
		 */
		Score do_lock();
	}
	private class LDKLockableScoreHolder { internal LockableScore held; }
	private class LDKLockableScoreImpl : bindings.LDKLockableScore {
		internal LDKLockableScoreImpl(LockableScoreInterface arg, LDKLockableScoreHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private LockableScoreInterface arg;
		private LDKLockableScoreHolder impl_holder;
		public long do_lock() {
			Score ret = arg.do_lock();
				GC.KeepAlive(arg);
			long result = ret.ptr;
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
	}
	public static LockableScore new_impl(LockableScoreInterface arg) {
		LDKLockableScoreHolder impl_holder = new LDKLockableScoreHolder();
		impl_holder.held = new LockableScore(new LDKLockableScoreImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Returns the locked scorer.
	 */
	public Score do_lock() {
		long ret = bindings.LockableScore_lock(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
