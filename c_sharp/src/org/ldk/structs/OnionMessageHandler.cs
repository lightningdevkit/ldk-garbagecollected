using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait to describe an object that can receive onion messages.
 */
public class OnionMessageHandler : CommonBase {
	internal readonly bindings.LDKOnionMessageHandler bindings_instance;
	internal OnionMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private OnionMessageHandler(bindings.LDKOnionMessageHandler arg, bindings.LDKOnionMessageProvider OnionMessageProvider) : base(bindings.LDKOnionMessageHandler_new(arg, OnionMessageProvider)) {
		this.ptrs_to.AddLast(arg);
		this.ptrs_to.AddLast(OnionMessageProvider);
		this.bindings_instance = arg;
	}
	~OnionMessageHandler() {
		if (ptr != 0) { bindings.OnionMessageHandler_free(ptr); }
	}

	public interface OnionMessageHandlerInterface {
		/**
		 * Handle an incoming onion_message message from the given peer.
		 */
		void handle_onion_message(byte[] _peer_node_id, OnionMessage _msg);
		/**
		 * Called when a connection is established with a peer. Can be used to track which peers
		 * advertise onion message support and are online.
		 * 
		 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
		 * with us. Implementors should be somewhat conservative about doing so, however, as other
		 * message handlers may still wish to communicate with this peer.
		 */
		Result_NoneNoneZ peer_connected(byte[] _their_node_id, Init _init);
		/**
		 * Indicates a connection to the peer failed/an existing connection was lost. Allows handlers to
		 * drop and refuse to forward onion messages to this peer.
		 * 
		 * Note that in some rare cases this may be called without a corresponding
		 * [`Self::peer_connected`].
		 */
		void peer_disconnected(byte[] _their_node_id, bool _no_connection_possible);
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
		InitFeatures provided_init_features(byte[] _their_node_id);
	}
	private class LDKOnionMessageHandlerHolder { internal OnionMessageHandler held; }
	private class LDKOnionMessageHandlerImpl : bindings.LDKOnionMessageHandler {
		internal LDKOnionMessageHandlerImpl(OnionMessageHandlerInterface arg, LDKOnionMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private OnionMessageHandlerInterface arg;
		private LDKOnionMessageHandlerHolder impl_holder;
		public void handle_onion_message(byte[] _peer_node_id, long _msg) {
			org.ldk.structs.OnionMessage _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.OnionMessage(null, _msg); }
			arg.handle_onion_message(_peer_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public long peer_connected(byte[] _their_node_id, long _init) {
			org.ldk.structs.Init _init_hu_conv = null; if (_init < 0 || _init > 4096) { _init_hu_conv = new org.ldk.structs.Init(null, _init); }
			Result_NoneNoneZ ret = arg.peer_connected(_their_node_id, _init_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public void peer_disconnected(byte[] _their_node_id, bool _no_connection_possible) {
			arg.peer_disconnected(_their_node_id, _no_connection_possible);
				GC.KeepAlive(arg);
		}
		public long provided_node_features() {
			NodeFeatures ret = arg.provided_node_features();
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long provided_init_features(byte[] _their_node_id) {
			InitFeatures ret = arg.provided_init_features(_their_node_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static OnionMessageHandler new_impl(OnionMessageHandlerInterface arg, OnionMessageProvider.OnionMessageProviderInterface OnionMessageProvider_impl) {
		LDKOnionMessageHandlerHolder impl_holder = new LDKOnionMessageHandlerHolder();
		impl_holder.held = new OnionMessageHandler(new LDKOnionMessageHandlerImpl(arg, impl_holder), OnionMessageProvider.new_impl(OnionMessageProvider_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying OnionMessageProvider.
	 */
	public OnionMessageProvider get_onion_message_provider() {
		OnionMessageProvider res = new OnionMessageProvider(null, bindings.LDKOnionMessageHandler_get_OnionMessageProvider(this.ptr));
		this.ptrs_to.AddLast(res);
		return res;
	}

	/**
	 * Handle an incoming onion_message message from the given peer.
	 */
	public void handle_onion_message(byte[] peer_node_id, org.ldk.structs.OnionMessage msg) {
		bindings.OnionMessageHandler_handle_onion_message(this.ptr, InternalUtils.check_arr_len(peer_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(peer_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
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
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(init);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(init); };
		return ret_hu_conv;
	}

	/**
	 * Indicates a connection to the peer failed/an existing connection was lost. Allows handlers to
	 * drop and refuse to forward onion messages to this peer.
	 * 
	 * Note that in some rare cases this may be called without a corresponding
	 * [`Self::peer_connected`].
	 */
	public void peer_disconnected(byte[] their_node_id, bool no_connection_possible) {
		bindings.OnionMessageHandler_peer_disconnected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), no_connection_possible);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(no_connection_possible);
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
		long ret = bindings.OnionMessageHandler_provided_init_features(this.ptr, InternalUtils.check_arr_len(their_node_id, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
