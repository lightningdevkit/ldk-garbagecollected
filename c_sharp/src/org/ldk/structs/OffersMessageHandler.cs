
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of OffersMessageHandler */
public interface OffersMessageHandlerInterface {
	/**Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
	 * or replying with an error.
	 * 
	 * If the provided [`OffersContext`] is `Some`, then the message was sent to a blinded path that we
	 * created and was authenticated as such by the [`OnionMessenger`]. There is one exception to
	 * this: [`OffersContext::InvoiceRequest`].
	 * 
	 * In order to support offers created prior to LDK 0.2, [`OffersContext::InvoiceRequest`]s are
	 * not authenticated by the [`OnionMessenger`]. It is the responsibility of message handling code
	 * to authenticate the provided [`OffersContext`] in this case.
	 * 
	 * The returned [`OffersMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	Option_C2Tuple_OffersMessageResponseInstructionZZ handle_message(org.ldk.structs.OffersMessage message, org.ldk.structs.Option_OffersContextZ context, org.ldk.structs.Responder responder);
	/**Releases any [`OffersMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a payment flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_message`].
	 */
	TwoTuple_OffersMessageMessageSendInstructionsZ[] release_pending_messages();
}

/**
 * A handler for an [`OnionMessage`] containing a BOLT 12 Offers message as its payload.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
public class OffersMessageHandler : CommonBase {
	internal bindings.LDKOffersMessageHandler bindings_instance;
	internal long instance_idx;

	internal OffersMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~OffersMessageHandler() {
		if (ptr != 0) { bindings.OffersMessageHandler_free(ptr); }
	}

	private class LDKOffersMessageHandlerHolder { internal OffersMessageHandler held; }
	private class LDKOffersMessageHandlerImpl : bindings.LDKOffersMessageHandler {
		internal LDKOffersMessageHandlerImpl(OffersMessageHandlerInterface arg, LDKOffersMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private OffersMessageHandlerInterface arg;
		private LDKOffersMessageHandlerHolder impl_holder;
		public long handle_message(long _message, long _context, long _responder) {
			org.ldk.structs.OffersMessage _message_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(_message);
			if (_message_hu_conv != null) { _message_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.Option_OffersContextZ _context_hu_conv = org.ldk.structs.Option_OffersContextZ.constr_from_ptr(_context);
			if (_context_hu_conv != null) { _context_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.Responder _responder_hu_conv = null; if (_responder < 0 || _responder > 4096) { _responder_hu_conv = new org.ldk.structs.Responder(null, _responder); }
			if (_responder_hu_conv != null) { _responder_hu_conv.ptrs_to.AddLast(this); };
			Option_C2Tuple_OffersMessageResponseInstructionZZ ret = arg.handle_message(_message_hu_conv, _context_hu_conv, _responder_hu_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long release_pending_messages() {
			TwoTuple_OffersMessageMessageSendInstructionsZ[] ret = arg.release_pending_messages();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint64Array(InternalUtils.mapArray(ret, ret_conv_48 => ret_conv_48.clone_ptr()));
			return result;
		}
	}

	/** Creates a new instance of OffersMessageHandler from a given implementation */
	public static OffersMessageHandler new_impl(OffersMessageHandlerInterface arg) {
		LDKOffersMessageHandlerHolder impl_holder = new LDKOffersMessageHandlerHolder();
		LDKOffersMessageHandlerImpl impl = new LDKOffersMessageHandlerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKOffersMessageHandler_new(impl);

		impl_holder.held = new OffersMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
	 * or replying with an error.
	 * 
	 * If the provided [`OffersContext`] is `Some`, then the message was sent to a blinded path that we
	 * created and was authenticated as such by the [`OnionMessenger`]. There is one exception to
	 * this: [`OffersContext::InvoiceRequest`].
	 * 
	 * In order to support offers created prior to LDK 0.2, [`OffersContext::InvoiceRequest`]s are
	 * not authenticated by the [`OnionMessenger`]. It is the responsibility of message handling code
	 * to authenticate the provided [`OffersContext`] in this case.
	 * 
	 * The returned [`OffersMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.Option_C2Tuple_OffersMessageResponseInstructionZZ handle_message(org.ldk.structs.OffersMessage message, org.ldk.structs.Option_OffersContextZ context, org.ldk.structs.Responder responder) {
		long ret = bindings.OffersMessageHandler_handle_message(this.ptr, message.ptr, context.ptr, responder == null ? 0 : responder.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		GC.KeepAlive(context);
		GC.KeepAlive(responder);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_OffersMessageResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_OffersMessageResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Releases any [`OffersMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a payment flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_message`].
	 */
	public TwoTuple_OffersMessageMessageSendInstructionsZ[] release_pending_messages() {
		long ret = bindings.OffersMessageHandler_release_pending_messages(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_48_len = InternalUtils.getArrayLength(ret);
		TwoTuple_OffersMessageMessageSendInstructionsZ[] ret_conv_48_arr = new TwoTuple_OffersMessageMessageSendInstructionsZ[ret_conv_48_len];
		for (int w = 0; w < ret_conv_48_len; w++) {
			long ret_conv_48 = InternalUtils.getU64ArrayElem(ret, w);
			TwoTuple_OffersMessageMessageSendInstructionsZ ret_conv_48_hu_conv = new TwoTuple_OffersMessageMessageSendInstructionsZ(null, ret_conv_48);
			if (ret_conv_48_hu_conv != null) { ret_conv_48_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_48_arr[w] = ret_conv_48_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_48_arr;
	}

}
} } }
