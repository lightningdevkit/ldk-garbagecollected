using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

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
	internal readonly bindings.LDKCustomOnionMessageHandler bindings_instance;
	internal CustomOnionMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private CustomOnionMessageHandler(bindings.LDKCustomOnionMessageHandler arg) : base(bindings.LDKCustomOnionMessageHandler_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~CustomOnionMessageHandler() {
		if (ptr != 0) { bindings.CustomOnionMessageHandler_free(ptr); }
	}

	public interface CustomOnionMessageHandlerInterface {
		/**
		 * Called with the custom message that was received, returning a response to send, if any.
		 */
		Option_CustomOnionMessageContentsZ handle_custom_message(CustomOnionMessageContents _msg);
		/**
		 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
		 * message type is unknown.
		 */
		Result_COption_CustomOnionMessageContentsZDecodeErrorZ read_custom_message(long _message_type, byte[] _buffer);
	}
	private class LDKCustomOnionMessageHandlerHolder { internal CustomOnionMessageHandler held; }
	private class LDKCustomOnionMessageHandlerImpl : bindings.LDKCustomOnionMessageHandler {
		internal LDKCustomOnionMessageHandlerImpl(CustomOnionMessageHandlerInterface arg, LDKCustomOnionMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private CustomOnionMessageHandlerInterface arg;
		private LDKCustomOnionMessageHandlerHolder impl_holder;
		public long handle_custom_message(long _msg) {
			CustomOnionMessageContents ret_hu_conv = new CustomOnionMessageContents(null, _msg);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			Option_CustomOnionMessageContentsZ ret = arg.handle_custom_message(ret_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
		public long read_custom_message(long _message_type, byte[] _buffer) {
			Result_COption_CustomOnionMessageContentsZDecodeErrorZ ret = arg.read_custom_message(_message_type, _buffer);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static CustomOnionMessageHandler new_impl(CustomOnionMessageHandlerInterface arg) {
		LDKCustomOnionMessageHandlerHolder impl_holder = new LDKCustomOnionMessageHandlerHolder();
		impl_holder.held = new CustomOnionMessageHandler(new LDKCustomOnionMessageHandlerImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Called with the custom message that was received, returning a response to send, if any.
	 */
	public Option_CustomOnionMessageContentsZ handle_custom_message(org.ldk.structs.CustomOnionMessageContents msg) {
		long ret = bindings.CustomOnionMessageHandler_handle_custom_message(this.ptr, msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CustomOnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_CustomOnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

	/**
	 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	public Result_COption_CustomOnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer) {
		long ret = bindings.CustomOnionMessageHandler_read_custom_message(this.ptr, message_type, buffer);
		GC.KeepAlive(this);
		GC.KeepAlive(message_type);
		GC.KeepAlive(buffer);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_CustomOnionMessageContentsZDecodeErrorZ ret_hu_conv = Result_COption_CustomOnionMessageContentsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
