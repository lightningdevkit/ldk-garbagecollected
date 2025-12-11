package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A handler for an [`OnionMessage`] containing a BOLT 12 Offers message as its payload.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OffersMessageHandler extends CommonBase {
	final bindings.LDKOffersMessageHandler bindings_instance;
	OffersMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private OffersMessageHandler(bindings.LDKOffersMessageHandler arg) {
		super(bindings.LDKOffersMessageHandler_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.OffersMessageHandler_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.OffersMessageHandler_free(ptr); }
		ptr = 0;
	}
	public static interface OffersMessageHandlerInterface {
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
		Option_C2Tuple_OffersMessageResponseInstructionZZ handle_message(OffersMessage message, Option_OffersContextZ context, Responder responder);
		/**
		 * Releases any [`OffersMessage`]s that need to be sent.
		 * 
		 * Typically, this is used for messages initiating a payment flow rather than in response to
		 * another message. The latter should use the return value of [`Self::handle_message`].
		 */
		TwoTuple_OffersMessageMessageSendInstructionsZ[] release_pending_messages();
	}
	private static class LDKOffersMessageHandlerHolder { OffersMessageHandler held; }
	public static OffersMessageHandler new_impl(OffersMessageHandlerInterface arg) {
		final LDKOffersMessageHandlerHolder impl_holder = new LDKOffersMessageHandlerHolder();
		impl_holder.held = new OffersMessageHandler(new bindings.LDKOffersMessageHandler() {
			@Override public long handle_message(long message, long context, long responder) {
				org.ldk.structs.OffersMessage message_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(message);
				if (message_hu_conv != null) { message_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.Option_OffersContextZ context_hu_conv = org.ldk.structs.Option_OffersContextZ.constr_from_ptr(context);
				if (context_hu_conv != null) { context_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.Responder responder_hu_conv = null; if (responder < 0 || responder > 4096) { responder_hu_conv = new org.ldk.structs.Responder(null, responder); }
				if (responder_hu_conv != null) { responder_hu_conv.ptrs_to.add(this); };
				Option_C2Tuple_OffersMessageResponseInstructionZZ ret = arg.handle_message(message_hu_conv, context_hu_conv, responder_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long[] release_pending_messages() {
				TwoTuple_OffersMessageMessageSendInstructionsZ[] ret = arg.release_pending_messages();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_48 -> ret_conv_48.clone_ptr()).toArray() : null;
				return result;
			}
		});
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
	public Option_C2Tuple_OffersMessageResponseInstructionZZ handle_message(org.ldk.structs.OffersMessage message, org.ldk.structs.Option_OffersContextZ context, @Nullable org.ldk.structs.Responder responder) {
		long ret = bindings.OffersMessageHandler_handle_message(this.ptr, message.ptr, context.ptr, responder == null ? 0 : responder.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(responder);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_OffersMessageResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_OffersMessageResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Releases any [`OffersMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a payment flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_message`].
	 */
	public TwoTuple_OffersMessageMessageSendInstructionsZ[] release_pending_messages() {
		long[] ret = bindings.OffersMessageHandler_release_pending_messages(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_48_len = ret.length;
		TwoTuple_OffersMessageMessageSendInstructionsZ[] ret_conv_48_arr = new TwoTuple_OffersMessageMessageSendInstructionsZ[ret_conv_48_len];
		for (int w = 0; w < ret_conv_48_len; w++) {
			long ret_conv_48 = ret[w];
			TwoTuple_OffersMessageMessageSendInstructionsZ ret_conv_48_hu_conv = new TwoTuple_OffersMessageMessageSendInstructionsZ(null, ret_conv_48);
			if (ret_conv_48_hu_conv != null) { ret_conv_48_hu_conv.ptrs_to.add(this); };
			ret_conv_48_arr[w] = ret_conv_48_hu_conv;
		}
		return ret_conv_48_arr;
	}

}
