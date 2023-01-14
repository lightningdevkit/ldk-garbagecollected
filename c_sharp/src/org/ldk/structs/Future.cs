using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A simple future which can complete once, and calls some callback(s) when it does so.
 */
public class Future : CommonBase {
	internal Future(object _dummy, long ptr) : base(ptr) { }
	~Future() {
		if (ptr != 0) { bindings.Future_free(ptr); }
	}

	/**
	 * Registers a callback to be called upon completion of this future. If the future has already
	 * completed, the callback will be called immediately.
	 */
	public void register_callback_fn(org.ldk.structs.FutureCallback callback) {
		bindings.Future_register_callback_fn(this.ptr, callback == null ? 0 : callback.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(callback);
		if (this != null) { this.ptrs_to.AddLast(callback); };
	}

}
} } }
