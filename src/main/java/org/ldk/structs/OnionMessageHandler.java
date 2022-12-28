package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait to describe an object that can receive onion messages.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OnionMessageHandler extends CommonBase {
	final bindings.LDKOnionMessageHandler bindings_instance;
	OnionMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private OnionMessageHandler(bindings.LDKOnionMessageHandler arg, bindings.LDKOnionMessageProvider OnionMessageProvider) {
		super(bindings.LDKOnionMessageHandler_new(arg, OnionMessageProvider));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(OnionMessageProvider);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.OnionMessageHandler_free(ptr); } super.finalize();
	}

	public static interface OnionMessageHandlerInterface {
		/**
		 * Handle an incoming onion_message message from the given peer.
		 */
		void handle_onion_message(byte[] peer_node_id, OnionMessage msg);
		/**
		 * Called when a connection is established with a peer. Can be used to track which peers
		 * advertise onion message support and are online.
		 * 
		 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
		 * with us. Implementors should be somewhat conservative about doing so, however, as other
		 * message handlers may still wish to communicate with this peer.
		 */
		Result_NoneNoneZ peer_connected(byte[] their_node_id, Init init);
		/**
		 * Indicates a connection to the peer failed/an existing connection was lost. Allows handlers to
		 * drop and refuse to forward onion messages to this peer.
		 * 
		 * Note that in some rare cases this may be called without a corresponding
		 * [`Self::peer_connected`].
		 */
		void peer_disconnected(byte[] their_node_id, boolean no_connection_possible);
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
	public static OnionMessageHandler new_impl(OnionMessageHandlerInterface arg, OnionMessageProvider.OnionMessageProviderInterface OnionMessageProvider_impl) {
		final LDKOnionMessageHandlerHolder impl_holder = new LDKOnionMessageHandlerHolder();
		impl_holder.held = new OnionMessageHandler(new bindings.LDKOnionMessageHandler() {
			@Override public void handle_onion_message(byte[] peer_node_id, long msg) {
				org.ldk.structs.OnionMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.OnionMessage(null, msg); }
				arg.handle_onion_message(peer_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public long peer_connected(byte[] their_node_id, long init) {
				org.ldk.structs.Init init_hu_conv = null; if (init < 0 || init > 4096) { init_hu_conv = new org.ldk.structs.Init(null, init); }
				Result_NoneNoneZ ret = arg.peer_connected(their_node_id, init_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public void peer_disconnected(byte[] their_node_id, boolean no_connection_possible) {
				arg.peer_disconnected(their_node_id, no_connection_possible);
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
		}, OnionMessageProvider.new_impl(OnionMessageProvider_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying OnionMessageProvider.
	 */
	public OnionMessageProvider get_onion_message_provider() {
		OnionMessageProvider res = new OnionMessageProvider(null, bindings.LDKOnionMessageHandler_get_OnionMessageProvider(this.ptr));
		this.ptrs_to.add(res);
		return res;
	}

	/**
	 * Handle an incoming onion_message message from the given peer.
	 */
	public void handle_onion_message(byte[] peer_node_id, org.ldk.structs.OnionMessage msg) {
		bindings.OnionMessageHandler_handle_onion_message(this.ptr, InternalUtils.check_arr_len(peer_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(peer_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Called when a connection is established with a peer. Can be used to track which peers
	 * advertise onion message support and are online.
	 * 
	 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
	 * with us. Implementors should be somewhat conservative about doing so, however, as other
	 * message handlers may still wish to communicate with this peer.
	 */
	public Result_NoneNoneZ peer_connected(byte[] their_node_id, org.ldk.structs.Init init) {
		long ret = bindings.OnionMessageHandler_peer_connected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), init == null ? 0 : init.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(init);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(init); };
		return ret_hu_conv;
	}

	/**
	 * Indicates a connection to the peer failed/an existing connection was lost. Allows handlers to
	 * drop and refuse to forward onion messages to this peer.
	 * 
	 * Note that in some rare cases this may be called without a corresponding
	 * [`Self::peer_connected`].
	 */
	public void peer_disconnected(byte[] their_node_id, boolean no_connection_possible) {
		bindings.OnionMessageHandler_peer_disconnected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), no_connection_possible);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(no_connection_possible);
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
