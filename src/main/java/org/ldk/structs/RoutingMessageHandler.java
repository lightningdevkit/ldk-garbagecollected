package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait to describe an object which can receive routing messages.
 * 
 * # Implementor DoS Warnings
 * 
 * For `gossip_queries` messages there are potential DoS vectors when handling
 * inbound queries. Implementors using an on-disk network graph should be aware of
 * repeated disk I/O for queries accessing different parts of the network graph.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RoutingMessageHandler extends CommonBase {
	final bindings.LDKRoutingMessageHandler bindings_instance;
	RoutingMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private RoutingMessageHandler(bindings.LDKRoutingMessageHandler arg, bindings.LDKMessageSendEventsProvider MessageSendEventsProvider) {
		super(bindings.LDKRoutingMessageHandler_new(arg, MessageSendEventsProvider));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(MessageSendEventsProvider);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.RoutingMessageHandler_free(ptr); } super.finalize();
	}

	public static interface RoutingMessageHandlerInterface {
		/**
		 * Handle an incoming node_announcement message, returning true if it should be forwarded on,
		 * false or returning an Err otherwise.
		 */
		Result_boolLightningErrorZ handle_node_announcement(NodeAnnouncement msg);
		/**
		 * Handle a channel_announcement message, returning true if it should be forwarded on, false
		 * or returning an Err otherwise.
		 */
		Result_boolLightningErrorZ handle_channel_announcement(ChannelAnnouncement msg);
		/**
		 * Handle an incoming channel_update message, returning true if it should be forwarded on,
		 * false or returning an Err otherwise.
		 */
		Result_boolLightningErrorZ handle_channel_update(ChannelUpdate msg);
		/**
		 * Gets channel announcements and updates required to dump our routing table to a remote node,
		 * starting at the short_channel_id indicated by starting_point and including announcements
		 * for a single channel.
		 */
		Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ get_next_channel_announcement(long starting_point);
		/**
		 * Gets a node announcement required to dump our routing table to a remote node, starting at
		 * the node *after* the provided pubkey and including up to one announcement immediately
		 * higher (as defined by <PublicKey as Ord>::cmp) than starting_point.
		 * If None is provided for starting_point, we start at the first node.
		 * 
		 * Note that starting_point (or a relevant inner pointer) may be NULL or all-0s to represent None
		 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		NodeAnnouncement get_next_node_announcement(byte[] starting_point);
		/**
		 * Called when a connection is established with a peer. This can be used to
		 * perform routing table synchronization using a strategy defined by the
		 * implementor.
		 * 
		 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
		 * with us. Implementors should be somewhat conservative about doing so, however, as other
		 * message handlers may still wish to communicate with this peer.
		 */
		Result_NoneNoneZ peer_connected(byte[] their_node_id, Init init);
		/**
		 * Handles the reply of a query we initiated to learn about channels
		 * for a given range of blocks. We can expect to receive one or more
		 * replies to a single query.
		 */
		Result_NoneLightningErrorZ handle_reply_channel_range(byte[] their_node_id, ReplyChannelRange msg);
		/**
		 * Handles the reply of a query we initiated asking for routing gossip
		 * messages for a list of channels. We should receive this message when
		 * a node has completed its best effort to send us the pertaining routing
		 * gossip messages.
		 */
		Result_NoneLightningErrorZ handle_reply_short_channel_ids_end(byte[] their_node_id, ReplyShortChannelIdsEnd msg);
		/**
		 * Handles when a peer asks us to send a list of short_channel_ids
		 * for the requested range of blocks.
		 */
		Result_NoneLightningErrorZ handle_query_channel_range(byte[] their_node_id, QueryChannelRange msg);
		/**
		 * Handles when a peer asks us to send routing gossip messages for a
		 * list of short_channel_ids.
		 */
		Result_NoneLightningErrorZ handle_query_short_channel_ids(byte[] their_node_id, QueryShortChannelIds msg);
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
	private static class LDKRoutingMessageHandlerHolder { RoutingMessageHandler held; }
	public static RoutingMessageHandler new_impl(RoutingMessageHandlerInterface arg, MessageSendEventsProvider.MessageSendEventsProviderInterface MessageSendEventsProvider_impl) {
		final LDKRoutingMessageHandlerHolder impl_holder = new LDKRoutingMessageHandlerHolder();
		impl_holder.held = new RoutingMessageHandler(new bindings.LDKRoutingMessageHandler() {
			@Override public long handle_node_announcement(long msg) {
				org.ldk.structs.NodeAnnouncement msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.NodeAnnouncement(null, msg); }
				Result_boolLightningErrorZ ret = arg.handle_node_announcement(msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_channel_announcement(long msg) {
				org.ldk.structs.ChannelAnnouncement msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ChannelAnnouncement(null, msg); }
				Result_boolLightningErrorZ ret = arg.handle_channel_announcement(msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_channel_update(long msg) {
				org.ldk.structs.ChannelUpdate msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ChannelUpdate(null, msg); }
				Result_boolLightningErrorZ ret = arg.handle_channel_update(msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long get_next_channel_announcement(long starting_point) {
				Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret = arg.get_next_channel_announcement(starting_point);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long get_next_node_announcement(byte[] starting_point) {
				NodeAnnouncement ret = arg.get_next_node_announcement(starting_point);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long peer_connected(byte[] their_node_id, long init) {
				org.ldk.structs.Init init_hu_conv = null; if (init < 0 || init > 4096) { init_hu_conv = new org.ldk.structs.Init(null, init); }
				Result_NoneNoneZ ret = arg.peer_connected(their_node_id, init_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_reply_channel_range(byte[] their_node_id, long msg) {
				org.ldk.structs.ReplyChannelRange msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ReplyChannelRange(null, msg); }
				if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.add(this); };
				Result_NoneLightningErrorZ ret = arg.handle_reply_channel_range(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_reply_short_channel_ids_end(byte[] their_node_id, long msg) {
				org.ldk.structs.ReplyShortChannelIdsEnd msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ReplyShortChannelIdsEnd(null, msg); }
				if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.add(this); };
				Result_NoneLightningErrorZ ret = arg.handle_reply_short_channel_ids_end(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_query_channel_range(byte[] their_node_id, long msg) {
				org.ldk.structs.QueryChannelRange msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.QueryChannelRange(null, msg); }
				if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.add(this); };
				Result_NoneLightningErrorZ ret = arg.handle_query_channel_range(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_query_short_channel_ids(byte[] their_node_id, long msg) {
				org.ldk.structs.QueryShortChannelIds msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.QueryShortChannelIds(null, msg); }
				if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.add(this); };
				Result_NoneLightningErrorZ ret = arg.handle_query_short_channel_ids(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
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
		}, MessageSendEventsProvider.new_impl(MessageSendEventsProvider_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying MessageSendEventsProvider.
	 */
	public MessageSendEventsProvider get_message_send_events_provider() {
		MessageSendEventsProvider res = new MessageSendEventsProvider(null, bindings.LDKRoutingMessageHandler_get_MessageSendEventsProvider(this.ptr));
		this.ptrs_to.add(res);
		return res;
	}

	/**
	 * Handle an incoming node_announcement message, returning true if it should be forwarded on,
	 * false or returning an Err otherwise.
	 */
	public Result_boolLightningErrorZ handle_node_announcement(NodeAnnouncement msg) {
		long ret = bindings.RoutingMessageHandler_handle_node_announcement(this.ptr, msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Handle a channel_announcement message, returning true if it should be forwarded on, false
	 * or returning an Err otherwise.
	 */
	public Result_boolLightningErrorZ handle_channel_announcement(ChannelAnnouncement msg) {
		long ret = bindings.RoutingMessageHandler_handle_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Handle an incoming channel_update message, returning true if it should be forwarded on,
	 * false or returning an Err otherwise.
	 */
	public Result_boolLightningErrorZ handle_channel_update(ChannelUpdate msg) {
		long ret = bindings.RoutingMessageHandler_handle_channel_update(this.ptr, msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Gets channel announcements and updates required to dump our routing table to a remote node,
	 * starting at the short_channel_id indicated by starting_point and including announcements
	 * for a single channel.
	 */
	public Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ get_next_channel_announcement(long starting_point) {
		long ret = bindings.RoutingMessageHandler_get_next_channel_announcement(this.ptr, starting_point);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(starting_point);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_hu_conv = org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets a node announcement required to dump our routing table to a remote node, starting at
	 * the node *after* the provided pubkey and including up to one announcement immediately
	 * higher (as defined by <PublicKey as Ord>::cmp) than starting_point.
	 * If None is provided for starting_point, we start at the first node.
	 * 
	 * Note that starting_point (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public NodeAnnouncement get_next_node_announcement(@Nullable byte[] starting_point) {
		long ret = bindings.RoutingMessageHandler_get_next_node_announcement(this.ptr, InternalUtils.check_arr_len(starting_point, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(starting_point);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Called when a connection is established with a peer. This can be used to
	 * perform routing table synchronization using a strategy defined by the
	 * implementor.
	 * 
	 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
	 * with us. Implementors should be somewhat conservative about doing so, however, as other
	 * message handlers may still wish to communicate with this peer.
	 */
	public Result_NoneNoneZ peer_connected(byte[] their_node_id, Init init) {
		long ret = bindings.RoutingMessageHandler_peer_connected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), init == null ? 0 : init.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(init);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(init); };
		return ret_hu_conv;
	}

	/**
	 * Handles the reply of a query we initiated to learn about channels
	 * for a given range of blocks. We can expect to receive one or more
	 * replies to a single query.
	 */
	public Result_NoneLightningErrorZ handle_reply_channel_range(byte[] their_node_id, ReplyChannelRange msg) {
		long ret = bindings.RoutingMessageHandler_handle_reply_channel_range(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Handles the reply of a query we initiated asking for routing gossip
	 * messages for a list of channels. We should receive this message when
	 * a node has completed its best effort to send us the pertaining routing
	 * gossip messages.
	 */
	public Result_NoneLightningErrorZ handle_reply_short_channel_ids_end(byte[] their_node_id, ReplyShortChannelIdsEnd msg) {
		long ret = bindings.RoutingMessageHandler_handle_reply_short_channel_ids_end(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Handles when a peer asks us to send a list of short_channel_ids
	 * for the requested range of blocks.
	 */
	public Result_NoneLightningErrorZ handle_query_channel_range(byte[] their_node_id, QueryChannelRange msg) {
		long ret = bindings.RoutingMessageHandler_handle_query_channel_range(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Handles when a peer asks us to send routing gossip messages for a
	 * list of short_channel_ids.
	 */
	public Result_NoneLightningErrorZ handle_query_short_channel_ids(byte[] their_node_id, QueryShortChannelIds msg) {
		long ret = bindings.RoutingMessageHandler_handle_query_short_channel_ids(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Gets the node feature flags which this handler itself supports. All available handlers are
	 * queried similarly and their feature flags are OR'd together to form the [`NodeFeatures`]
	 * which are broadcasted in our [`NodeAnnouncement`] message.
	 */
	public NodeFeatures provided_node_features() {
		long ret = bindings.RoutingMessageHandler_provided_node_features(this.ptr);
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
		long ret = bindings.RoutingMessageHandler_provided_init_features(this.ptr, InternalUtils.check_arr_len(their_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
