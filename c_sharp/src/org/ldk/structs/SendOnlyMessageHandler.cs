
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of SendOnlyMessageHandler */
public interface SendOnlyMessageHandlerInterface {
}

/**
 * A handler which can only be used to send messages.
 * 
 * This is implemented by [`ChainMonitor`].
 * 
 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
 */
public class SendOnlyMessageHandler : CommonBase {
	internal bindings.LDKSendOnlyMessageHandler bindings_instance;
	internal long instance_idx;

	internal SendOnlyMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~SendOnlyMessageHandler() {
		if (ptr != 0) { bindings.SendOnlyMessageHandler_free(ptr); }
	}

	private class LDKSendOnlyMessageHandlerHolder { internal SendOnlyMessageHandler held; }
	private class LDKSendOnlyMessageHandlerImpl : bindings.LDKSendOnlyMessageHandler {
		internal LDKSendOnlyMessageHandlerImpl(SendOnlyMessageHandlerInterface arg, LDKSendOnlyMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private SendOnlyMessageHandlerInterface arg;
		private LDKSendOnlyMessageHandlerHolder impl_holder;
	}

	/** Creates a new instance of SendOnlyMessageHandler from a given implementation */
	public static SendOnlyMessageHandler new_impl(SendOnlyMessageHandlerInterface arg, BaseMessageHandlerInterface baseMessageHandler_impl) {
		LDKSendOnlyMessageHandlerHolder impl_holder = new LDKSendOnlyMessageHandlerHolder();
		LDKSendOnlyMessageHandlerImpl impl = new LDKSendOnlyMessageHandlerImpl(arg, impl_holder);
		BaseMessageHandler baseMessageHandler = BaseMessageHandler.new_impl(baseMessageHandler_impl);
		long[] ptr_idx = bindings.LDKSendOnlyMessageHandler_new(impl, baseMessageHandler.instance_idx);

		impl_holder.held = new SendOnlyMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		impl_holder.held.ptrs_to.AddLast(baseMessageHandler);
		return impl_holder.held;
	}

}
} } }
