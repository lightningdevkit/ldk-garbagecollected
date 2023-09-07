using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A simple future which can complete once, and calls some callback(s) when it does so.
 * 
 * Clones can be made and all futures cloned from the same source will complete at the same time.
 */
public class Future : CommonBase {
	internal Future(object _dummy, long ptr) : base(ptr) { }
	~Future() {
		if (ptr != 0) { bindings.Future_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Future_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Future
	 */
	public Future clone() {
		long ret = bindings.Future_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Future ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Future(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Registers a callback to be called upon completion of this future. If the future has already
	 * completed, the callback will be called immediately.
	 */
	public void register_callback_fn(org.ldk.structs.FutureCallback callback) {
		bindings.Future_register_callback_fn(this.ptr, callback.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(callback);
		if (this != null) { this.ptrs_to.AddLast(callback); };
	}

	/**
	 * Waits until this [`Future`] completes.
	 */
	public void wait() {
		bindings.Future_wait(this.ptr);
		GC.KeepAlive(this);
		if (this != null) { this.ptrs_to.AddLast(this); };
	}

	/**
	 * Waits until this [`Future`] completes or the given amount of time has elapsed.
	 * 
	 * Returns true if the [`Future`] completed, false if the time elapsed.
	 */
	public bool wait_timeout(long max_wait) {
		bool ret = bindings.Future_wait_timeout(this.ptr, max_wait);
		GC.KeepAlive(this);
		GC.KeepAlive(max_wait);
		if (this != null) { this.ptrs_to.AddLast(this); };
		return ret;
	}

}
} } }
