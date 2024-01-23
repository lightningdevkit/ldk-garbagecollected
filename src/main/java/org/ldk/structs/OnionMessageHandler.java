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
	private OnionMessageHandler(bindings.LDKOnionMessageHandler arg) {
		super(bindings.LDKOnionMessageHandler_new(arg));
		this.ptrs_to.add(arg);
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
		 * Because much of the lightning network does not yet support forwarding onion messages, we
		 * may need to directly connect to a node which will forward a message for us. In such a case,
		 * this method will return the set of nodes which need connection by node_id and the
		 * corresponding socket addresses where they may accept incoming connections.
		 * 
		 * Thus, this method should be polled regularly to detect messages await such a direct
		 * connection.
		 */
		TwoTuple_PublicKeyCVec_SocketAddressZZ[] get_and_clear_connections_needed();
		/**
		 * Handle an incoming `onion_message` message from the given peer.
		 */
		void handle_onion_message(byte[] peer_node_id, OnionMessage msg);
		/**
		 * Returns the next pending onion message for the peer with the given node id.
		 * 
		 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		OnionMessage next_onion_message_for_peer(byte[] peer_node_id);
		/**
		 * Called when a connection is established with a peer. Can be used to track which peers
		 * advertise onion message support and are online.
		 * 
		 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
		 * with us. Implementors should be somewhat conservative about doing so, however, as other
		 * message handlers may still wish to communicate with this peer.
		 */
		Result_NoneNoneZ peer_connected(byte[] their_node_id, Init init, boolean inbound);
		/**
		 * Indicates a connection to the peer failed/an existing connection was lost. Allows handlers to
		 * drop and refuse to forward onion messages to this peer.
		 */
		void peer_disconnected(byte[] their_node_id);
		/**
		 * Performs actions that should happen roughly every ten seconds after startup. Allows handlers
		 * to drop any buffered onion messages intended for prospective peers.
		 */
		void timer_tick_occurred();
		/**
		 * Gets the node feature flags which this handler itself supports. All available handlers are
		 * queried similarly and their feature flags are OR'd together to form the [`NodeFeatures`]
		 * which are broadcasted in our [`NodeAnnouncement`] message.
		 */
		NodeFeatures provided_node_features();
		/**
		 * Gets the init feature flags which should be sent to the given peer. All available handlers
		 * are queried similarly and their feature flags are OR'd together to form the [`InitFeatures`]
		 * which are sent in our [`Init`] message.
		 * 
		 * Note that this method is called before [`Self::peer_connected`].
		 */
		InitFeatures provided_init_features(byte[] their_node_id);
	}
	private static class LDKOnionMessageHandlerHolder { OnionMessageHandler held; }
	public static OnionMessageHandler new_impl(OnionMessageHandlerInterface arg) {
		final LDKOnionMessageHandlerHolder impl_holder = new LDKOnionMessageHandlerHolder();
		impl_holder.held = new OnionMessageHandler(new bindings.LDKOnionMessageHandler() {
			@Override public long[] get_and_clear_connections_needed() {
				TwoTuple_PublicKeyCVec_SocketAddressZZ[] ret = arg.get_and_clear_connections_needed();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_40 -> ret_conv_40 == null ? 0 : ret_conv_40.clone_ptr()).toArray() : null;
				return result;
			}
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
			@Override public long peer_connected(byte[] their_node_id, long init, boolean inbound) {
				org.ldk.structs.Init init_hu_conv = null; if (init < 0 || init > 4096) { init_hu_conv = new org.ldk.structs.Init(null, init); }
				Result_NoneNoneZ ret = arg.peer_connected(their_node_id, init_hu_conv, inbound);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public void peer_disconnected(byte[] their_node_id) {
				arg.peer_disconnected(their_node_id);
				Reference.reachabilityFence(arg);
			}
			@Override public void timer_tick_occurred() {
				arg.timer_tick_occurred();
				Reference.reachabilityFence(arg);
			}
			@Override public long provided_node_features() {
				NodeFeatures ret = arg.provided_node_features();
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long provided_init_features(byte[] their_node_id) {
				InitFeatures ret = arg.provided_init_features(their_node_id);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
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
		long[] ret = bindings.OnionMessageHandler_get_and_clear_connections_needed(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_40_len = ret.length;
		TwoTuple_PublicKeyCVec_SocketAddressZZ[] ret_conv_40_arr = new TwoTuple_PublicKeyCVec_SocketAddressZZ[ret_conv_40_len];
		for (int o = 0; o < ret_conv_40_len; o++) {
			long ret_conv_40 = ret[o];
			TwoTuple_PublicKeyCVec_SocketAddressZZ ret_conv_40_hu_conv = new TwoTuple_PublicKeyCVec_SocketAddressZZ(null, ret_conv_40);
			if (ret_conv_40_hu_conv != null) { ret_conv_40_hu_conv.ptrs_to.add(this); };
			ret_conv_40_arr[o] = ret_conv_40_hu_conv;
		}
		return ret_conv_40_arr;
	}

	/**
	 * Handle an incoming `onion_message` message from the given peer.
	 */
	public void handle_onion_message(byte[] peer_node_id, org.ldk.structs.OnionMessage msg) {
		bindings.OnionMessageHandler_handle_onion_message(this.ptr, InternalUtils.check_arr_len(peer_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(peer_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Returns the next pending onion message for the peer with the given node id.
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
	 * Called when a connection is established with a peer. Can be used to track which peers
	 * advertise onion message support and are online.
	 * 
	 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
	 * with us. Implementors should be somewhat conservative about doing so, however, as other
	 * message handlers may still wish to communicate with this peer.
	 */
	public Result_NoneNoneZ peer_connected(byte[] their_node_id, org.ldk.structs.Init init, boolean inbound) {
		long ret = bindings.OnionMessageHandler_peer_connected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), init == null ? 0 : init.ptr, inbound);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(init);
		Reference.reachabilityFence(inbound);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(init); };
		return ret_hu_conv;
	}

	/**
	 * Indicates a connection to the peer failed/an existing connection was lost. Allows handlers to
	 * drop and refuse to forward onion messages to this peer.
	 */
	public void peer_disconnected(byte[] their_node_id) {
		bindings.OnionMessageHandler_peer_disconnected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
	}

	/**
	 * Performs actions that should happen roughly every ten seconds after startup. Allows handlers
	 * to drop any buffered onion messages intended for prospective peers.
	 */
	public void timer_tick_occurred() {
		bindings.OnionMessageHandler_timer_tick_occurred(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Gets the node feature flags which this handler itself supports. All available handlers are
	 * queried similarly and their feature flags are OR'd together to form the [`NodeFeatures`]
	 * which are broadcasted in our [`NodeAnnouncement`] message.
	 */
	public NodeFeatures provided_node_features() {
		long ret = bindings.OnionMessageHandler_provided_node_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
		long ret = bindings.OnionMessageHandler_provided_init_features(this.ptr, InternalUtils.check_arr_len(their_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
