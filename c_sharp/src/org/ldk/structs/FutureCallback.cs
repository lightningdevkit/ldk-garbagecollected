using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A callback which is called when a [`Future`] completes.
 * 
 * Note that this MUST NOT call back into LDK directly, it must instead schedule actions to be
 * taken later. Rust users should use the [`std::future::Future`] implementation for [`Future`]
 * instead.
 * 
 * Note that the [`std::future::Future`] implementation may only work for runtimes which schedule
 * futures when they receive a wake, rather than immediately executing them.
 */
public class FutureCallback : CommonBase {
	internal readonly bindings.LDKFutureCallback bindings_instance;
	internal FutureCallback(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private FutureCallback(bindings.LDKFutureCallback arg) : base(bindings.LDKFutureCallback_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~FutureCallback() {
		if (ptr != 0) { bindings.FutureCallback_free(ptr); }
	}

	public interface FutureCallbackInterface {
		/**
		 * The method which is called.
		 */
		void call();
	}
	private class LDKFutureCallbackHolder { internal FutureCallback held; }
	private class LDKFutureCallbackImpl : bindings.LDKFutureCallback {
		internal LDKFutureCallbackImpl(FutureCallbackInterface arg, LDKFutureCallbackHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private FutureCallbackInterface arg;
		private LDKFutureCallbackHolder impl_holder;
		public void call() {
			arg.call();
				GC.KeepAlive(arg);
		}
	}
	public static FutureCallback new_impl(FutureCallbackInterface arg) {
		LDKFutureCallbackHolder impl_holder = new LDKFutureCallbackHolder();
		impl_holder.held = new FutureCallback(new LDKFutureCallbackImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * The method which is called.
	 */
	public void call() {
		bindings.FutureCallback_call(this.ptr);
		GC.KeepAlive(this);
	}

}
} } }
