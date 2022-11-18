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

	public static interface CustomOnionMessageHandlerInterface {
		/**
		 * Called with the custom message that was received.
		 */
		void handle_custom_message(CustomOnionMessageContents msg);
		/**
		 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
		 * message type is unknown.
		 */
		Result_COption_CustomOnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer);
	}
	private static class LDKCustomOnionMessageHandlerHolder { CustomOnionMessageHandler held; }
	public static CustomOnionMessageHandler new_impl(CustomOnionMessageHandlerInterface arg) {
		final LDKCustomOnionMessageHandlerHolder impl_holder = new LDKCustomOnionMessageHandlerHolder();
		impl_holder.held = new CustomOnionMessageHandler(new bindings.LDKCustomOnionMessageHandler() {
			@Override public void handle_custom_message(long msg) {
				CustomOnionMessageContents ret_hu_conv = new CustomOnionMessageContents(null, msg);
				if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
				arg.handle_custom_message(ret_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public long read_custom_message(long message_type, byte[] buffer) {
				Result_COption_CustomOnionMessageContentsZDecodeErrorZ ret = arg.read_custom_message(message_type, buffer);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Called with the custom message that was received.
	 */
	public void handle_custom_message(CustomOnionMessageContents msg) {
		bindings.CustomOnionMessageHandler_handle_custom_message(this.ptr, msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	public Result_COption_CustomOnionMessageContentsZDecodeErrorZ read_custom_message(long message_type, byte[] buffer) {
		long ret = bindings.CustomOnionMessageHandler_read_custom_message(this.ptr, message_type, buffer);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message_type);
		Reference.reachabilityFence(buffer);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_CustomOnionMessageContentsZDecodeErrorZ ret_hu_conv = Result_COption_CustomOnionMessageContentsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}