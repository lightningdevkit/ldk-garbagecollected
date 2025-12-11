package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A handler for received [`OnionMessage`]s and for providing generated ones to send.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OnionMessageHandler extends CommonBase {
	final bindings.LDKOnionMessageHandler bindings_instance;
	OnionMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private OnionMessageHandler(bindings.LDKOnionMessageHandler arg, bindings.LDKBaseMessageHandler BaseMessageHandler) {
		super(bindings.LDKOnionMessageHandler_new(arg, BaseMessageHandler));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(BaseMessageHandler);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.OnionMessageHandler_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.OnionMessageHandler_free(ptr); }
		ptr = 0;
	}
	public static interface OnionMessageHandlerInterface {
		/**
		 * Handle an incoming `onion_message` message from the given peer.
		 */
		void handle_onion_message(byte[] peer_node_id, OnionMessage msg);
		/**
		 * Returns the next pending onion message for the peer with the given node id.
		 * 
		 * Note that onion messages can only be provided upstream via this method and *not* via
		 * [`BaseMessageHandler::get_and_clear_pending_msg_events`].
		 * 
		 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		OnionMessage next_onion_message_for_peer(byte[] peer_node_id);
		/**
		 * Performs actions that should happen roughly every ten seconds after startup. Allows handlers
		 * to drop any buffered onion messages intended for prospective peerst.
		 */
		void timer_tick_occurred();
	}
	private static class LDKOnionMessageHandlerHolder { OnionMessageHandler held; }
	public static OnionMessageHandler new_impl(OnionMessageHandlerInterface arg, BaseMessageHandler.BaseMessageHandlerInterface BaseMessageHandler_impl) {
		final LDKOnionMessageHandlerHolder impl_holder = new LDKOnionMessageHandlerHolder();
		impl_holder.held = new OnionMessageHandler(new bindings.LDKOnionMessageHandler() {
			@Override public void handle_onion_message(byte[] peer_node_id, long msg) {
				org.ldk.structs.OnionMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.OnionMessage(null, msg); }
				arg.handle_onion_message(peer_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public long next_onion_message_for_peer(byte[] peer_node_id) {
				OnionMessage ret = arg.next_onion_message_for_peer(peer_node_id);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public void timer_tick_occurred() {
				arg.timer_tick_occurred();
				Reference.reachabilityFence(arg);
			}
		}, BaseMessageHandler.new_impl(BaseMessageHandler_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying BaseMessageHandler.
	 */
	public BaseMessageHandler get_base_message_handler() {
		BaseMessageHandler res = new BaseMessageHandler(null, bindings.LDKOnionMessageHandler_get_BaseMessageHandler(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}

	/**
	 * Handle an incoming `onion_message` message from the given peer.
	 */
	public void handle_onion_message(byte[] peer_node_id, org.ldk.structs.OnionMessage msg) {
		bindings.OnionMessageHandler_handle_onion_message(this.ptr, InternalUtils.check_arr_len(peer_node_id, 33), msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(peer_node_id);
		Reference.reachabilityFence(msg);
	}

	/**
	 * Returns the next pending onion message for the peer with the given node id.
	 * 
	 * Note that onion messages can only be provided upstream via this method and *not* via
	 * [`BaseMessageHandler::get_and_clear_pending_msg_events`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public OnionMessage next_onion_message_for_peer(byte[] peer_node_id) {
		long ret = bindings.OnionMessageHandler_next_onion_message_for_peer(this.ptr, InternalUtils.check_arr_len(peer_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(peer_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Performs actions that should happen roughly every ten seconds after startup. Allows handlers
	 * to drop any buffered onion messages intended for prospective peerst.
	 */
	public void timer_tick_occurred() {
		bindings.OnionMessageHandler_timer_tick_occurred(this.ptr);
		Reference.reachabilityFence(this);
	}

}
