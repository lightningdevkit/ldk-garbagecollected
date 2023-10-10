using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A handler for an [`OnionMessage`] containing a BOLT 12 Offers message as its payload.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
public class OffersMessageHandler : CommonBase {
	internal readonly bindings.LDKOffersMessageHandler bindings_instance;
	internal OffersMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private OffersMessageHandler(bindings.LDKOffersMessageHandler arg) : base(bindings.LDKOffersMessageHandler_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~OffersMessageHandler() {
		if (ptr != 0) { bindings.OffersMessageHandler_free(ptr); }
	}

	public interface OffersMessageHandlerInterface {
		/**
		 * Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
		 * or replying with an error.
		 */
		Option_OffersMessageZ handle_message(OffersMessage _message);
	}
	private class LDKOffersMessageHandlerHolder { internal OffersMessageHandler held; }
	private class LDKOffersMessageHandlerImpl : bindings.LDKOffersMessageHandler {
		internal LDKOffersMessageHandlerImpl(OffersMessageHandlerInterface arg, LDKOffersMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private OffersMessageHandlerInterface arg;
		private LDKOffersMessageHandlerHolder impl_holder;
		public long handle_message(long _message) {
			org.ldk.structs.OffersMessage _message_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(_message);
			if (_message_hu_conv != null) { _message_hu_conv.ptrs_to.AddLast(this); };
			Option_OffersMessageZ ret = arg.handle_message(_message_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
	}
	public static OffersMessageHandler new_impl(OffersMessageHandlerInterface arg) {
		LDKOffersMessageHandlerHolder impl_holder = new LDKOffersMessageHandlerHolder();
		impl_holder.held = new OffersMessageHandler(new LDKOffersMessageHandlerImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
	 * or replying with an error.
	 */
	public Option_OffersMessageZ handle_message(org.ldk.structs.OffersMessage message) {
		long ret = bindings.OffersMessageHandler_handle_message(this.ptr, message.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(message); };
		return ret_hu_conv;
	}

}
} } }
