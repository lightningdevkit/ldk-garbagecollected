
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of CustomOnionMessageHandler */
public interface CustomOnionMessageHandlerInterface {
	/**Called with the custom message that was received, returning a response to send, if any.
	 * 
	 * The returned [`Self::CustomMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 */
	Option_OnionMessageContentsZ handle_custom_message(OnionMessageContents msg);
	/**Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	Result_COption_OnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer);
	/**Releases any [`Self::CustomMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a message flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_custom_message`].
	 */
	ThreeTuple_OnionMessageContentsDestinationBlindedPathZ[] release_pending_custom_messages();
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
		public long handle_custom_message(long _msg) {
			OnionMessageContents ret_hu_conv = new OnionMessageContents(null, _msg);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			Option_OnionMessageContentsZ ret = arg.handle_custom_message(ret_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
		public long read_custom_message(long _message_type, long _buffer) {
			byte[] _buffer_conv = InternalUtils.decodeUint8Array(_buffer);
			Result_COption_OnionMessageContentsZDecodeErrorZ ret = arg.read_custom_message(_message_type, _buffer_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long release_pending_custom_messages() {
			ThreeTuple_OnionMessageContentsDestinationBlindedPathZ[] ret = arg.release_pending_custom_messages();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint64Array(InternalUtils.mapArray(ret, ret_conv_56 => ret_conv_56 == null ? 0 : ret_conv_56.clone_ptr()));
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
	 * The returned [`Self::CustomMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 */
	public Option_OnionMessageContentsZ handle_custom_message(org.ldk.structs.OnionMessageContents msg) {
		long ret = bindings.CustomOnionMessageHandler_handle_custom_message(this.ptr, msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_OnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

	/**
	 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	public Result_COption_OnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer) {
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
	public ThreeTuple_OnionMessageContentsDestinationBlindedPathZ[] release_pending_custom_messages() {
		long ret = bindings.CustomOnionMessageHandler_release_pending_custom_messages(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_56_len = InternalUtils.getArrayLength(ret);
		ThreeTuple_OnionMessageContentsDestinationBlindedPathZ[] ret_conv_56_arr = new ThreeTuple_OnionMessageContentsDestinationBlindedPathZ[ret_conv_56_len];
		for (int e = 0; e < ret_conv_56_len; e++) {
			long ret_conv_56 = InternalUtils.getU64ArrayElem(ret, e);
			ThreeTuple_OnionMessageContentsDestinationBlindedPathZ ret_conv_56_hu_conv = new ThreeTuple_OnionMessageContentsDestinationBlindedPathZ(null, ret_conv_56);
			if (ret_conv_56_hu_conv != null) { ret_conv_56_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_56_arr[e] = ret_conv_56_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_56_arr;
	}

}
} } }
