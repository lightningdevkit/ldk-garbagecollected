
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of OnionMessageHandler */
public interface OnionMessageHandlerInterface {
	/**Handle an incoming `onion_message` message from the given peer.
	 */
	void handle_onion_message(byte[] peer_node_id, org.ldk.structs.OnionMessage msg);
	/**Returns the next pending onion message for the peer with the given node id.
	 * 
	 * Note that onion messages can only be provided upstream via this method and *not* via
	 * [`BaseMessageHandler::get_and_clear_pending_msg_events`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	OnionMessage next_onion_message_for_peer(byte[] peer_node_id);
	/**Performs actions that should happen roughly every ten seconds after startup. Allows handlers
	 * to drop any buffered onion messages intended for prospective peerst.
	 */
	void timer_tick_occurred();
}

/**
 * A handler for received [`OnionMessage`]s and for providing generated ones to send.
 */
public class OnionMessageHandler : CommonBase {
	internal bindings.LDKOnionMessageHandler bindings_instance;
	internal long instance_idx;

	internal OnionMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~OnionMessageHandler() {
		if (ptr != 0) { bindings.OnionMessageHandler_free(ptr); }
	}

	private class LDKOnionMessageHandlerHolder { internal OnionMessageHandler held; }
	private class LDKOnionMessageHandlerImpl : bindings.LDKOnionMessageHandler {
		internal LDKOnionMessageHandlerImpl(OnionMessageHandlerInterface arg, LDKOnionMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private OnionMessageHandlerInterface arg;
		private LDKOnionMessageHandlerHolder impl_holder;
		public void handle_onion_message(long _peer_node_id, long _msg) {
			byte[] _peer_node_id_conv = InternalUtils.decodeUint8Array(_peer_node_id);
			org.ldk.structs.OnionMessage _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.OnionMessage(null, _msg); }
			arg.handle_onion_message(_peer_node_id_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public long next_onion_message_for_peer(long _peer_node_id) {
			byte[] _peer_node_id_conv = InternalUtils.decodeUint8Array(_peer_node_id);
			OnionMessage ret = arg.next_onion_message_for_peer(_peer_node_id_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public void timer_tick_occurred() {
			arg.timer_tick_occurred();
				GC.KeepAlive(arg);
		}
	}

	/** Creates a new instance of OnionMessageHandler from a given implementation */
	public static OnionMessageHandler new_impl(OnionMessageHandlerInterface arg, BaseMessageHandlerInterface baseMessageHandler_impl) {
		LDKOnionMessageHandlerHolder impl_holder = new LDKOnionMessageHandlerHolder();
		LDKOnionMessageHandlerImpl impl = new LDKOnionMessageHandlerImpl(arg, impl_holder);
		BaseMessageHandler baseMessageHandler = BaseMessageHandler.new_impl(baseMessageHandler_impl);
		long[] ptr_idx = bindings.LDKOnionMessageHandler_new(impl, baseMessageHandler.instance_idx);

		impl_holder.held = new OnionMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		impl_holder.held.ptrs_to.AddLast(baseMessageHandler);
		return impl_holder.held;
	}

	/**
	 * Handle an incoming `onion_message` message from the given peer.
	 */
	public void handle_onion_message(byte[] peer_node_id, org.ldk.structs.OnionMessage msg) {
		bindings.OnionMessageHandler_handle_onion_message(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(peer_node_id, 33)), msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(peer_node_id);
		GC.KeepAlive(msg);
	}

	/**
	 * Returns the next pending onion message for the peer with the given node id.
	 * 
	 * Note that onion messages can only be provided upstream via this method and *not* via
	 * [`BaseMessageHandler::get_and_clear_pending_msg_events`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.OnionMessage next_onion_message_for_peer(byte[] peer_node_id) {
		long ret = bindings.OnionMessageHandler_next_onion_message_for_peer(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(peer_node_id, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(peer_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Performs actions that should happen roughly every ten seconds after startup. Allows handlers
	 * to drop any buffered onion messages intended for prospective peerst.
	 */
	public void timer_tick_occurred() {
		bindings.OnionMessageHandler_timer_tick_occurred(this.ptr);
		GC.KeepAlive(this);
	}

}
} } }
