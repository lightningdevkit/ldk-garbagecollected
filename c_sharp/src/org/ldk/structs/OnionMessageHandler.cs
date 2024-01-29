
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of OnionMessageHandler */
public interface OnionMessageHandlerInterface {
	/**Because much of the lightning network does not yet support forwarding onion messages, we
	 * may need to directly connect to a node which will forward a message for us. In such a case,
	 * this method will return the set of nodes which need connection by node_id and the
	 * corresponding socket addresses where they may accept incoming connections.
	 * 
	 * Thus, this method should be polled regularly to detect messages await such a direct
	 * connection.
	 */
	TwoTuple_PublicKeyCVec_SocketAddressZZ[] get_and_clear_connections_needed();
	/**Handle an incoming `onion_message` message from the given peer.
	 */
	void handle_onion_message(byte[] peer_node_id, OnionMessage msg);
	/**Returns the next pending onion message for the peer with the given node id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	OnionMessage next_onion_message_for_peer(byte[] peer_node_id);
	/**Called when a connection is established with a peer. Can be used to track which peers
	 * advertise onion message support and are online.
	 * 
	 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
	 * with us. Implementors should be somewhat conservative about doing so, however, as other
	 * message handlers may still wish to communicate with this peer.
	 */
	Result_NoneNoneZ peer_connected(byte[] their_node_id, Init init, bool inbound);
	/**Indicates a connection to the peer failed/an existing connection was lost. Allows handlers to
	 * drop and refuse to forward onion messages to this peer.
	 */
	void peer_disconnected(byte[] their_node_id);
	/**Performs actions that should happen roughly every ten seconds after startup. Allows handlers
	 * to drop any buffered onion messages intended for prospective peers.
	 */
	void timer_tick_occurred();
	/**Gets the node feature flags which this handler itself supports. All available handlers are
	 * queried similarly and their feature flags are OR'd together to form the [`NodeFeatures`]
	 * which are broadcasted in our [`NodeAnnouncement`] message.
	 */
	NodeFeatures provided_node_features();
	/**Gets the init feature flags which should be sent to the given peer. All available handlers
	 * are queried similarly and their feature flags are OR'd together to form the [`InitFeatures`]
	 * which are sent in our [`Init`] message.
	 * 
	 * Note that this method is called before [`Self::peer_connected`].
	 */
	InitFeatures provided_init_features(byte[] their_node_id);
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
		public long get_and_clear_connections_needed() {
			TwoTuple_PublicKeyCVec_SocketAddressZZ[] ret = arg.get_and_clear_connections_needed();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint64Array(InternalUtils.mapArray(ret, ret_conv_40 => ret_conv_40 == null ? 0 : ret_conv_40.clone_ptr()));
			return result;
		}
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
		public long peer_connected(long _their_node_id, long _init, bool _inbound) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			org.ldk.structs.Init _init_hu_conv = null; if (_init < 0 || _init > 4096) { _init_hu_conv = new org.ldk.structs.Init(null, _init); }
			Result_NoneNoneZ ret = arg.peer_connected(_their_node_id_conv, _init_hu_conv, _inbound);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public void peer_disconnected(long _their_node_id) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			arg.peer_disconnected(_their_node_id_conv);
				GC.KeepAlive(arg);
		}
		public void timer_tick_occurred() {
			arg.timer_tick_occurred();
				GC.KeepAlive(arg);
		}
		public long provided_node_features() {
			NodeFeatures ret = arg.provided_node_features();
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long provided_init_features(long _their_node_id) {
			byte[] _their_node_id_conv = InternalUtils.decodeUint8Array(_their_node_id);
			InitFeatures ret = arg.provided_init_features(_their_node_id_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of OnionMessageHandler from a given implementation */
	public static OnionMessageHandler new_impl(OnionMessageHandlerInterface arg) {
		LDKOnionMessageHandlerHolder impl_holder = new LDKOnionMessageHandlerHolder();
		LDKOnionMessageHandlerImpl impl = new LDKOnionMessageHandlerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKOnionMessageHandler_new(impl);

		impl_holder.held = new OnionMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Because much of the lightning network does not yet support forwarding onion messages, we
	 * may need to directly connect to a node which will forward a message for us. In such a case,
	 * this method will return the set of nodes which need connection by node_id and the
	 * corresponding socket addresses where they may accept incoming connections.
	 * 
	 * Thus, this method should be polled regularly to detect messages await such a direct
	 * connection.
	 */
	public TwoTuple_PublicKeyCVec_SocketAddressZZ[] get_and_clear_connections_needed() {
		long ret = bindings.OnionMessageHandler_get_and_clear_connections_needed(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_40_len = InternalUtils.getArrayLength(ret);
		TwoTuple_PublicKeyCVec_SocketAddressZZ[] ret_conv_40_arr = new TwoTuple_PublicKeyCVec_SocketAddressZZ[ret_conv_40_len];
		for (int o = 0; o < ret_conv_40_len; o++) {
			long ret_conv_40 = InternalUtils.getU64ArrayElem(ret, o);
			TwoTuple_PublicKeyCVec_SocketAddressZZ ret_conv_40_hu_conv = new TwoTuple_PublicKeyCVec_SocketAddressZZ(null, ret_conv_40);
			if (ret_conv_40_hu_conv != null) { ret_conv_40_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_40_arr[o] = ret_conv_40_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_40_arr;
	}

	/**
	 * Handle an incoming `onion_message` message from the given peer.
	 */
	public void handle_onion_message(byte[] peer_node_id, org.ldk.structs.OnionMessage msg) {
		bindings.OnionMessageHandler_handle_onion_message(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(peer_node_id, 33)), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(peer_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Returns the next pending onion message for the peer with the given node id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public OnionMessage next_onion_message_for_peer(byte[] peer_node_id) {
		long ret = bindings.OnionMessageHandler_next_onion_message_for_peer(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(peer_node_id, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(peer_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Called when a connection is established with a peer. Can be used to track which peers
	 * advertise onion message support and are online.
	 * 
	 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
	 * with us. Implementors should be somewhat conservative about doing so, however, as other
	 * message handlers may still wish to communicate with this peer.
	 */
	public Result_NoneNoneZ peer_connected(byte[] their_node_id, org.ldk.structs.Init init, bool inbound) {
		long ret = bindings.OnionMessageHandler_peer_connected(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)), init == null ? 0 : init.ptr, inbound);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(init);
		GC.KeepAlive(inbound);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(init); };
		return ret_hu_conv;
	}

	/**
	 * Indicates a connection to the peer failed/an existing connection was lost. Allows handlers to
	 * drop and refuse to forward onion messages to this peer.
	 */
	public void peer_disconnected(byte[] their_node_id) {
		bindings.OnionMessageHandler_peer_disconnected(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
	}

	/**
	 * Performs actions that should happen roughly every ten seconds after startup. Allows handlers
	 * to drop any buffered onion messages intended for prospective peers.
	 */
	public void timer_tick_occurred() {
		bindings.OnionMessageHandler_timer_tick_occurred(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Gets the node feature flags which this handler itself supports. All available handlers are
	 * queried similarly and their feature flags are OR'd together to form the [`NodeFeatures`]
	 * which are broadcasted in our [`NodeAnnouncement`] message.
	 */
	public NodeFeatures provided_node_features() {
		long ret = bindings.OnionMessageHandler_provided_node_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets the init feature flags which should be sent to the given peer. All available handlers
	 * are queried similarly and their feature flags are OR'd together to form the [`InitFeatures`]
	 * which are sent in our [`Init`] message.
	 * 
	 * Note that this method is called before [`Self::peer_connected`].
	 */
	public InitFeatures provided_init_features(byte[] their_node_id) {
		long ret = bindings.OnionMessageHandler_provided_init_features(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(their_node_id, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
