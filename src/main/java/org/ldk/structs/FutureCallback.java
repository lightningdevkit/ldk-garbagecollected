package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FutureCallback extends CommonBase {
	final bindings.LDKFutureCallback bindings_instance;
	FutureCallback(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private FutureCallback(bindings.LDKFutureCallback arg) {
		super(bindings.LDKFutureCallback_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.FutureCallback_free(ptr); } super.finalize();
	}

	public static interface FutureCallbackInterface {
		/**
		 * The method which is called.
		 */
		void call();
	}
	private static class LDKFutureCallbackHolder { FutureCallback held; }
	public static FutureCallback new_impl(FutureCallbackInterface arg) {
		final LDKFutureCallbackHolder impl_holder = new LDKFutureCallbackHolder();
		impl_holder.held = new FutureCallback(new bindings.LDKFutureCallback() {
			@Override public void call() {
				arg.call();
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
	/**
	 * The method which is called.
	 */
	public void call() {
		bindings.FutureCallback_call(this.ptr);
		Reference.reachabilityFence(this);
	}

}
