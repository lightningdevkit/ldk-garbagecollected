package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * Handler for custom onion messages. If you are using [`SimpleArcOnionMessenger`],
 * [`SimpleRefOnionMessenger`], or prefer to ignore inbound custom onion messages,
 * [`IgnoringMessageHandler`] must be provided to [`OnionMessenger::new`]. Otherwise, a custom
 * implementation of this trait must be provided, with [`CustomMessage`] specifying the supported
 * message types.
 * 
 * See [`OnionMessenger`] for example usage.
 * 
 * [`IgnoringMessageHandler`]: crate::ln::peer_handler::IgnoringMessageHandler
 * [`CustomMessage`]: Self::CustomMessage
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CustomOnionMessageHandler extends CommonBase {
	final bindings.LDKCustomOnionMessageHandler bindings_instance;
	CustomOnionMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private CustomOnionMessageHandler(bindings.LDKCustomOnionMessageHandler arg) {
		super(bindings.LDKCustomOnionMessageHandler_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CustomOnionMessageHandler_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.CustomOnionMessageHandler_free(ptr); }
		ptr = 0;
	}
	public static interface CustomOnionMessageHandlerInterface {
		/**
		 * Called with the custom message that was received, returning a response to send, if any.
		 * 
		 * If the provided `context` is `Some`, then the message was sent to a blinded path that we
		 * created and was authenticated as such by the [`OnionMessenger`].
		 * 
		 * The returned [`Self::CustomMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
		 * 
		 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Option_C2Tuple_OnionMessageContentsResponseInstructionZZ handle_custom_message(OnionMessageContents message, Option_CVec_u8ZZ context, Responder responder);
		/**
		 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
		 * message type is unknown.
		 */
		Result_COption_OnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer);
		/**
		 * Releases any [`Self::CustomMessage`]s that need to be sent.
		 * 
		 * Typically, this is used for messages initiating a message flow rather than in response to
		 * another message. The latter should use the return value of [`Self::handle_custom_message`].
		 */
		TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] release_pending_custom_messages();
	}
	private static class LDKCustomOnionMessageHandlerHolder { CustomOnionMessageHandler held; }
	public static CustomOnionMessageHandler new_impl(CustomOnionMessageHandlerInterface arg) {
		final LDKCustomOnionMessageHandlerHolder impl_holder = new LDKCustomOnionMessageHandlerHolder();
		impl_holder.held = new CustomOnionMessageHandler(new bindings.LDKCustomOnionMessageHandler() {
			@Override public long handle_custom_message(long message, long context, long responder) {
				OnionMessageContents ret_hu_conv = new OnionMessageContents(null, message);
				if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.Option_CVec_u8ZZ context_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(context);
				if (context_hu_conv != null) { context_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.Responder responder_hu_conv = null; if (responder < 0 || responder > 4096) { responder_hu_conv = new org.ldk.structs.Responder(null, responder); }
				if (responder_hu_conv != null) { responder_hu_conv.ptrs_to.add(this); };
				Option_C2Tuple_OnionMessageContentsResponseInstructionZZ ret = arg.handle_custom_message(ret_hu_conv, context_hu_conv, responder_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long read_custom_message(long message_type, byte[] buffer) {
				Result_COption_OnionMessageContentsZDecodeErrorZ ret = arg.read_custom_message(message_type, buffer);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long[] release_pending_custom_messages() {
				TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] ret = arg.release_pending_custom_messages();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_55 -> ret_conv_55.clone_ptr()).toArray() : null;
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Called with the custom message that was received, returning a response to send, if any.
	 * 
	 * If the provided `context` is `Some`, then the message was sent to a blinded path that we
	 * created and was authenticated as such by the [`OnionMessenger`].
	 * 
	 * The returned [`Self::CustomMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Option_C2Tuple_OnionMessageContentsResponseInstructionZZ handle_custom_message(org.ldk.structs.OnionMessageContents message, org.ldk.structs.Option_CVec_u8ZZ context, @Nullable org.ldk.structs.Responder responder) {
		long ret = bindings.CustomOnionMessageHandler_handle_custom_message(this.ptr, message.ptr, context.ptr, responder == null ? 0 : responder.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(responder);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_OnionMessageContentsResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_OnionMessageContentsResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(message); };
		return ret_hu_conv;
	}

	/**
	 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	public Result_COption_OnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer) {
		long ret = bindings.CustomOnionMessageHandler_read_custom_message(this.ptr, message_type, buffer);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message_type);
		Reference.reachabilityFence(buffer);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_OnionMessageContentsZDecodeErrorZ ret_hu_conv = Result_COption_OnionMessageContentsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Releases any [`Self::CustomMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a message flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_custom_message`].
	 */
	public TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] release_pending_custom_messages() {
		long[] ret = bindings.CustomOnionMessageHandler_release_pending_custom_messages(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_55_len = ret.length;
		TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] ret_conv_55_arr = new TwoTuple_OnionMessageContentsMessageSendInstructionsZ[ret_conv_55_len];
		for (int d = 0; d < ret_conv_55_len; d++) {
			long ret_conv_55 = ret[d];
			TwoTuple_OnionMessageContentsMessageSendInstructionsZ ret_conv_55_hu_conv = new TwoTuple_OnionMessageContentsMessageSendInstructionsZ(null, ret_conv_55);
			if (ret_conv_55_hu_conv != null) { ret_conv_55_hu_conv.ptrs_to.add(this); };
			ret_conv_55_arr[d] = ret_conv_55_hu_conv;
		}
		return ret_conv_55_arr;
	}

}
