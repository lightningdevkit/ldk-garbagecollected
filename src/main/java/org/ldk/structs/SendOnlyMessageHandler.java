package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A handler which can only be used to send messages.
 * 
 * This is implemented by [`ChainMonitor`].
 * 
 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SendOnlyMessageHandler extends CommonBase {
	final bindings.LDKSendOnlyMessageHandler bindings_instance;
	SendOnlyMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private SendOnlyMessageHandler(bindings.LDKSendOnlyMessageHandler arg, bindings.LDKBaseMessageHandler BaseMessageHandler) {
		super(bindings.LDKSendOnlyMessageHandler_new(arg, BaseMessageHandler));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(BaseMessageHandler);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.SendOnlyMessageHandler_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.SendOnlyMessageHandler_free(ptr); }
		ptr = 0;
	}
	public static interface SendOnlyMessageHandlerInterface {
	}
	private static class LDKSendOnlyMessageHandlerHolder { SendOnlyMessageHandler held; }
	public static SendOnlyMessageHandler new_impl(SendOnlyMessageHandlerInterface arg, BaseMessageHandler.BaseMessageHandlerInterface BaseMessageHandler_impl) {
		final LDKSendOnlyMessageHandlerHolder impl_holder = new LDKSendOnlyMessageHandlerHolder();
		impl_holder.held = new SendOnlyMessageHandler(new bindings.LDKSendOnlyMessageHandler() {
		}, BaseMessageHandler.new_impl(BaseMessageHandler_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying BaseMessageHandler.
	 */
	public BaseMessageHandler get_base_message_handler() {
		BaseMessageHandler res = new BaseMessageHandler(null, bindings.LDKSendOnlyMessageHandler_get_BaseMessageHandler(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}

}
