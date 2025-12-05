
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of CustomOnionMessageHandler */
public interface CustomOnionMessageHandlerInterface {
	/**Called with the custom message that was received, returning a response to send, if any.
	 * 
	 * If the provided `context` is `Some`, then the message was sent to a blinded path that we
	 * created and was authenticated as such by the [`OnionMessenger`].
	 * 
	 * The returned [`Self::CustomMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	Option_C2Tuple_OnionMessageContentsResponseInstructionZZ handle_custom_message(org.ldk.structs.OnionMessageContents message, org.ldk.structs.Option_CVec_u8ZZ context, org.ldk.structs.Responder responder);
	/**Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	Result_COption_OnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer);
	/**Releases any [`Self::CustomMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a message flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_custom_message`].
	 */
	TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] release_pending_custom_messages();
}

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
public class CustomOnionMessageHandler : CommonBase {
	internal bindings.LDKCustomOnionMessageHandler bindings_instance;
	internal long instance_idx;

	internal CustomOnionMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~CustomOnionMessageHandler() {
		if (ptr != 0) { bindings.CustomOnionMessageHandler_free(ptr); }
	}

	private class LDKCustomOnionMessageHandlerHolder { internal CustomOnionMessageHandler held; }
	private class LDKCustomOnionMessageHandlerImpl : bindings.LDKCustomOnionMessageHandler {
		internal LDKCustomOnionMessageHandlerImpl(CustomOnionMessageHandlerInterface arg, LDKCustomOnionMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private CustomOnionMessageHandlerInterface arg;
		private LDKCustomOnionMessageHandlerHolder impl_holder;
		public long handle_custom_message(long _message, long _context, long _responder) {
			OnionMessageContents ret_hu_conv = new OnionMessageContents(null, _message);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.Option_CVec_u8ZZ _context_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(_context);
			if (_context_hu_conv != null) { _context_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.Responder _responder_hu_conv = null; if (_responder < 0 || _responder > 4096) { _responder_hu_conv = new org.ldk.structs.Responder(null, _responder); }
			if (_responder_hu_conv != null) { _responder_hu_conv.ptrs_to.AddLast(this); };
			Option_C2Tuple_OnionMessageContentsResponseInstructionZZ ret = arg.handle_custom_message(ret_hu_conv, _context_hu_conv, _responder_hu_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long read_custom_message(long _message_type, long _buffer) {
			byte[] _buffer_conv = InternalUtils.decodeUint8Array(_buffer);
			Result_COption_OnionMessageContentsZDecodeErrorZ ret = arg.read_custom_message(_message_type, _buffer_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long release_pending_custom_messages() {
			TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] ret = arg.release_pending_custom_messages();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint64Array(InternalUtils.mapArray(ret, ret_conv_55 => ret_conv_55.clone_ptr()));
			return result;
		}
	}

	/** Creates a new instance of CustomOnionMessageHandler from a given implementation */
	public static CustomOnionMessageHandler new_impl(CustomOnionMessageHandlerInterface arg) {
		LDKCustomOnionMessageHandlerHolder impl_holder = new LDKCustomOnionMessageHandlerHolder();
		LDKCustomOnionMessageHandlerImpl impl = new LDKCustomOnionMessageHandlerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKCustomOnionMessageHandler_new(impl);

		impl_holder.held = new CustomOnionMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
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
	public org.ldk.structs.Option_C2Tuple_OnionMessageContentsResponseInstructionZZ handle_custom_message(org.ldk.structs.OnionMessageContents message, org.ldk.structs.Option_CVec_u8ZZ context, org.ldk.structs.Responder responder) {
		long ret = bindings.CustomOnionMessageHandler_handle_custom_message(this.ptr, message.ptr, context.ptr, responder == null ? 0 : responder.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		GC.KeepAlive(context);
		GC.KeepAlive(responder);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_OnionMessageContentsResponseInstructionZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_OnionMessageContentsResponseInstructionZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(message); };
		return ret_hu_conv;
	}

	/**
	 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	public org.ldk.structs.Result_COption_OnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer) {
		long ret = bindings.CustomOnionMessageHandler_read_custom_message(this.ptr, message_type, InternalUtils.encodeUint8Array(buffer));
		GC.KeepAlive(this);
		GC.KeepAlive(message_type);
		GC.KeepAlive(buffer);
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
		long ret = bindings.CustomOnionMessageHandler_release_pending_custom_messages(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_55_len = InternalUtils.getArrayLength(ret);
		TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] ret_conv_55_arr = new TwoTuple_OnionMessageContentsMessageSendInstructionsZ[ret_conv_55_len];
		for (int d = 0; d < ret_conv_55_len; d++) {
			long ret_conv_55 = InternalUtils.getU64ArrayElem(ret, d);
			TwoTuple_OnionMessageContentsMessageSendInstructionsZ ret_conv_55_hu_conv = new TwoTuple_OnionMessageContentsMessageSendInstructionsZ(null, ret_conv_55);
			if (ret_conv_55_hu_conv != null) { ret_conv_55_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_55_arr[d] = ret_conv_55_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_55_arr;
	}

}
} } }
