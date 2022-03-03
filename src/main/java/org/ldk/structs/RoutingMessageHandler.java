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
		 * Gets a subset of the channel announcements and updates required to dump our routing table
		 * to a remote node, starting at the short_channel_id indicated by starting_point and
		 * including the batch_amount entries immediately higher in numerical value than starting_point.
		 */
		ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] get_next_channel_announcements(long starting_point, byte batch_amount);
		/**
		 * Gets a subset of the node announcements required to dump our routing table to a remote node,
		 * starting at the node *after* the provided publickey and including batch_amount entries
		 * immediately higher (as defined by <PublicKey as Ord>::cmp) than starting_point.
		 * If None is provided for starting_point, we start at the first node.
		 * 
		 * Note that starting_point (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		NodeAnnouncement[] get_next_node_announcements(byte[] starting_point, byte batch_amount);
		/**
		 * Called when a connection is established with a peer. This can be used to
		 * perform routing table synchronization using a strategy defined by the
		 * implementor.
		 */
		void sync_routing_table(byte[] their_node_id, Init init);
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
	}
	private static class LDKRoutingMessageHandlerHolder { RoutingMessageHandler held; }
	public static RoutingMessageHandler new_impl(RoutingMessageHandlerInterface arg, MessageSendEventsProvider.MessageSendEventsProviderInterface MessageSendEventsProvider_impl) {
		final LDKRoutingMessageHandlerHolder impl_holder = new LDKRoutingMessageHandlerHolder();
		impl_holder.held = new RoutingMessageHandler(new bindings.LDKRoutingMessageHandler() {
			@Override public long handle_node_announcement(long msg) {
				NodeAnnouncement msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new NodeAnnouncement(null, msg); }
				Result_boolLightningErrorZ ret = arg.handle_node_announcement(msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_channel_announcement(long msg) {
				ChannelAnnouncement msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ChannelAnnouncement(null, msg); }
				Result_boolLightningErrorZ ret = arg.handle_channel_announcement(msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_channel_update(long msg) {
				ChannelUpdate msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ChannelUpdate(null, msg); }
				Result_boolLightningErrorZ ret = arg.handle_channel_update(msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long[] get_next_channel_announcements(long starting_point, byte batch_amount) {
				ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] ret = arg.get_next_channel_announcements(starting_point, batch_amount);
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_59 -> ret_conv_59 == null ? 0 : ret_conv_59.clone_ptr()).toArray() : null;
				return result;
			}
			@Override public long[] get_next_node_announcements(byte[] starting_point, byte batch_amount) {
				NodeAnnouncement[] ret = arg.get_next_node_announcements(starting_point, batch_amount);
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_18 -> ret_conv_18 == null ? 0 : ret_conv_18.clone_ptr()).toArray() : null;
				return result;
			}
			@Override public void sync_routing_table(byte[] their_node_id, long init) {
				Init init_hu_conv = null; if (init < 0 || init > 4096) { init_hu_conv = new Init(null, init); }
				arg.sync_routing_table(their_node_id, init_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public long handle_reply_channel_range(byte[] their_node_id, long msg) {
				ReplyChannelRange msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ReplyChannelRange(null, msg); }
				msg_hu_conv.ptrs_to.add(this);
				Result_NoneLightningErrorZ ret = arg.handle_reply_channel_range(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_reply_short_channel_ids_end(byte[] their_node_id, long msg) {
				ReplyShortChannelIdsEnd msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ReplyShortChannelIdsEnd(null, msg); }
				msg_hu_conv.ptrs_to.add(this);
				Result_NoneLightningErrorZ ret = arg.handle_reply_short_channel_ids_end(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_query_channel_range(byte[] their_node_id, long msg) {
				QueryChannelRange msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new QueryChannelRange(null, msg); }
				msg_hu_conv.ptrs_to.add(this);
				Result_NoneLightningErrorZ ret = arg.handle_query_channel_range(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long handle_query_short_channel_ids(byte[] their_node_id, long msg) {
				QueryShortChannelIds msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new QueryShortChannelIds(null, msg); }
				msg_hu_conv.ptrs_to.add(this);
				Result_NoneLightningErrorZ ret = arg.handle_query_short_channel_ids(their_node_id, msg_hu_conv);
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
		long ret = bindings.RoutingMessageHandler_handle_node_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	/**
	 * Handle a channel_announcement message, returning true if it should be forwarded on, false
	 * or returning an Err otherwise.
	 */
	public Result_boolLightningErrorZ handle_channel_announcement(ChannelAnnouncement msg) {
		long ret = bindings.RoutingMessageHandler_handle_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	/**
	 * Handle an incoming channel_update message, returning true if it should be forwarded on,
	 * false or returning an Err otherwise.
	 */
	public Result_boolLightningErrorZ handle_channel_update(ChannelUpdate msg) {
		long ret = bindings.RoutingMessageHandler_handle_channel_update(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	/**
	 * Gets a subset of the channel announcements and updates required to dump our routing table
	 * to a remote node, starting at the short_channel_id indicated by starting_point and
	 * including the batch_amount entries immediately higher in numerical value than starting_point.
	 */
	public ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] get_next_channel_announcements(long starting_point, byte batch_amount) {
		long[] ret = bindings.RoutingMessageHandler_get_next_channel_announcements(this.ptr, starting_point, batch_amount);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(starting_point);
		Reference.reachabilityFence(batch_amount);
		int ret_conv_59_len = ret.length;
		ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[] ret_conv_59_arr = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ[ret_conv_59_len];
		for (int h = 0; h < ret_conv_59_len; h++) {
			long ret_conv_59 = ret[h];
			ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ ret_conv_59_hu_conv = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret_conv_59);
			ret_conv_59_hu_conv.ptrs_to.add(this);
			ret_conv_59_arr[h] = ret_conv_59_hu_conv;
		}
		return ret_conv_59_arr;
	}

	/**
	 * Gets a subset of the node announcements required to dump our routing table to a remote node,
	 * starting at the node *after* the provided publickey and including batch_amount entries
	 * immediately higher (as defined by <PublicKey as Ord>::cmp) than starting_point.
	 * If None is provided for starting_point, we start at the first node.
	 * 
	 * Note that starting_point (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public NodeAnnouncement[] get_next_node_announcements(@Nullable byte[] starting_point, byte batch_amount) {
		long[] ret = bindings.RoutingMessageHandler_get_next_node_announcements(this.ptr, InternalUtils.check_arr_len(starting_point, 33), batch_amount);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(starting_point);
		Reference.reachabilityFence(batch_amount);
		int ret_conv_18_len = ret.length;
		NodeAnnouncement[] ret_conv_18_arr = new NodeAnnouncement[ret_conv_18_len];
		for (int s = 0; s < ret_conv_18_len; s++) {
			long ret_conv_18 = ret[s];
			NodeAnnouncement ret_conv_18_hu_conv = null; if (ret_conv_18 < 0 || ret_conv_18 > 4096) { ret_conv_18_hu_conv = new NodeAnnouncement(null, ret_conv_18); }
			ret_conv_18_hu_conv.ptrs_to.add(this);
			ret_conv_18_arr[s] = ret_conv_18_hu_conv;
		}
		return ret_conv_18_arr;
	}

	/**
	 * Called when a connection is established with a peer. This can be used to
	 * perform routing table synchronization using a strategy defined by the
	 * implementor.
	 */
	public void sync_routing_table(byte[] their_node_id, Init init) {
		bindings.RoutingMessageHandler_sync_routing_table(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), init == null ? 0 : init.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(init);
		this.ptrs_to.add(init);
	}

	/**
	 * Handles the reply of a query we initiated to learn about channels
	 * for a given range of blocks. We can expect to receive one or more
	 * replies to a single query.
	 */
	public Result_NoneLightningErrorZ handle_reply_channel_range(byte[] their_node_id, ReplyChannelRange msg) {
		long ret = bindings.RoutingMessageHandler_handle_reply_channel_range(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Handles the reply of a query we initiated asking for routing gossip
	 * messages for a list of channels. We should receive this message when
	 * a node has completed its best effort to send us the pertaining routing
	 * gossip messages.
	 */
	public Result_NoneLightningErrorZ handle_reply_short_channel_ids_end(byte[] their_node_id, ReplyShortChannelIdsEnd msg) {
		long ret = bindings.RoutingMessageHandler_handle_reply_short_channel_ids_end(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Handles when a peer asks us to send a list of short_channel_ids
	 * for the requested range of blocks.
	 */
	public Result_NoneLightningErrorZ handle_query_channel_range(byte[] their_node_id, QueryChannelRange msg) {
		long ret = bindings.RoutingMessageHandler_handle_query_channel_range(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Handles when a peer asks us to send routing gossip messages for a
	 * list of short_channel_ids.
	 */
	public Result_NoneLightningErrorZ handle_query_short_channel_ids(byte[] their_node_id, QueryShortChannelIds msg) {
		long ret = bindings.RoutingMessageHandler_handle_query_short_channel_ids(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
