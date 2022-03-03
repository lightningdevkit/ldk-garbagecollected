package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * An interface to send a transaction to the Bitcoin network.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BroadcasterInterface extends CommonBase {
	final bindings.LDKBroadcasterInterface bindings_instance;
	BroadcasterInterface(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private BroadcasterInterface(bindings.LDKBroadcasterInterface arg) {
		super(bindings.LDKBroadcasterInterface_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.BroadcasterInterface_free(ptr); } super.finalize();
	}

	public static interface BroadcasterInterfaceInterface {
		/**
		 * Sends a transaction out to (hopefully) be mined.
		 */
		void broadcast_transaction(byte[] tx);
	}
	private static class LDKBroadcasterInterfaceHolder { BroadcasterInterface held; }
	public static BroadcasterInterface new_impl(BroadcasterInterfaceInterface arg) {
		final LDKBroadcasterInterfaceHolder impl_holder = new LDKBroadcasterInterfaceHolder();
		impl_holder.held = new BroadcasterInterface(new bindings.LDKBroadcasterInterface() {
			@Override public void broadcast_transaction(byte[] tx) {
				arg.broadcast_transaction(tx);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Sends a transaction out to (hopefully) be mined.
	 */
	public void broadcast_transaction(byte[] tx) {
		bindings.BroadcasterInterface_broadcast_transaction(this.ptr, tx);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(tx);
	}

}
