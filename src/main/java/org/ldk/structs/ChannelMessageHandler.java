package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait to describe an object which can receive channel messages.
 * 
 * Messages MAY be called in parallel when they originate from different `their_node_ids`, however
 * they MUST NOT be called in parallel when the two calls have the same `their_node_id`.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelMessageHandler extends CommonBase {
	final bindings.LDKChannelMessageHandler bindings_instance;
	ChannelMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private ChannelMessageHandler(bindings.LDKChannelMessageHandler arg, bindings.LDKMessageSendEventsProvider MessageSendEventsProvider) {
		super(bindings.LDKChannelMessageHandler_new(arg, MessageSendEventsProvider));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(MessageSendEventsProvider);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.ChannelMessageHandler_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.ChannelMessageHandler_free(ptr); }
		ptr = 0;
	}
	public static interface ChannelMessageHandlerInterface {
		/**
		 * Handle an incoming `open_channel` message from the given peer.
		 */
		void handle_open_channel(byte[] their_node_id, OpenChannel msg);
		/**
		 * Handle an incoming `accept_channel` message from the given peer.
		 */
		void handle_accept_channel(byte[] their_node_id, AcceptChannel msg);
		/**
		 * Handle an incoming `funding_created` message from the given peer.
		 */
		void handle_funding_created(byte[] their_node_id, FundingCreated msg);
		/**
		 * Handle an incoming `funding_signed` message from the given peer.
		 */
		void handle_funding_signed(byte[] their_node_id, FundingSigned msg);
		/**
		 * Handle an incoming `channel_ready` message from the given peer.
		 */
		void handle_channel_ready(byte[] their_node_id, ChannelReady msg);
		/**
		 * Handle an incoming `shutdown` message from the given peer.
		 */
		void handle_shutdown(byte[] their_node_id, Shutdown msg);
		/**
		 * Handle an incoming `closing_signed` message from the given peer.
		 */
		void handle_closing_signed(byte[] their_node_id, ClosingSigned msg);
		/**
		 * Handle an incoming `update_add_htlc` message from the given peer.
		 */
		void handle_update_add_htlc(byte[] their_node_id, UpdateAddHTLC msg);
		/**
		 * Handle an incoming `update_fulfill_htlc` message from the given peer.
		 */
		void handle_update_fulfill_htlc(byte[] their_node_id, UpdateFulfillHTLC msg);
		/**
		 * Handle an incoming `update_fail_htlc` message from the given peer.
		 */
		void handle_update_fail_htlc(byte[] their_node_id, UpdateFailHTLC msg);
		/**
		 * Handle an incoming `update_fail_malformed_htlc` message from the given peer.
		 */
		void handle_update_fail_malformed_htlc(byte[] their_node_id, UpdateFailMalformedHTLC msg);
		/**
		 * Handle an incoming `commitment_signed` message from the given peer.
		 */
		void handle_commitment_signed(byte[] their_node_id, CommitmentSigned msg);
		/**
		 * Handle an incoming `revoke_and_ack` message from the given peer.
		 */
		void handle_revoke_and_ack(byte[] their_node_id, RevokeAndACK msg);
		/**
		 * Handle an incoming `update_fee` message from the given peer.
		 */
		void handle_update_fee(byte[] their_node_id, UpdateFee msg);
		/**
		 * Handle an incoming `announcement_signatures` message from the given peer.
		 */
		void handle_announcement_signatures(byte[] their_node_id, AnnouncementSignatures msg);
		/**
		 * Indicates a connection to the peer failed/an existing connection was lost.
		 */
		void peer_disconnected(byte[] their_node_id);
		/**
		 * Handle a peer reconnecting, possibly generating `channel_reestablish` message(s).
		 * 
		 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
		 * with us. Implementors should be somewhat conservative about doing so, however, as other
		 * message handlers may still wish to communicate with this peer.
		 */
		Result_NoneNoneZ peer_connected(byte[] their_node_id, Init msg, boolean inbound);
		/**
		 * Handle an incoming `channel_reestablish` message from the given peer.
		 */
		void handle_channel_reestablish(byte[] their_node_id, ChannelReestablish msg);
		/**
		 * Handle an incoming `channel_update` message from the given peer.
		 */
		void handle_channel_update(byte[] their_node_id, ChannelUpdate msg);
		/**
		 * Handle an incoming `error` message from the given peer.
		 */
		void handle_error(byte[] their_node_id, ErrorMessage msg);
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
	private static class LDKChannelMessageHandlerHolder { ChannelMessageHandler held; }
	public static ChannelMessageHandler new_impl(ChannelMessageHandlerInterface arg, MessageSendEventsProvider.MessageSendEventsProviderInterface MessageSendEventsProvider_impl) {
		final LDKChannelMessageHandlerHolder impl_holder = new LDKChannelMessageHandlerHolder();
		impl_holder.held = new ChannelMessageHandler(new bindings.LDKChannelMessageHandler() {
			@Override public void handle_open_channel(byte[] their_node_id, long msg) {
				org.ldk.structs.OpenChannel msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.OpenChannel(null, msg); }
				arg.handle_open_channel(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_accept_channel(byte[] their_node_id, long msg) {
				org.ldk.structs.AcceptChannel msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.AcceptChannel(null, msg); }
				arg.handle_accept_channel(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_funding_created(byte[] their_node_id, long msg) {
				org.ldk.structs.FundingCreated msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.FundingCreated(null, msg); }
				arg.handle_funding_created(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_funding_signed(byte[] their_node_id, long msg) {
				org.ldk.structs.FundingSigned msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.FundingSigned(null, msg); }
				arg.handle_funding_signed(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_channel_ready(byte[] their_node_id, long msg) {
				org.ldk.structs.ChannelReady msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ChannelReady(null, msg); }
				arg.handle_channel_ready(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_shutdown(byte[] their_node_id, long msg) {
				org.ldk.structs.Shutdown msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.Shutdown(null, msg); }
				arg.handle_shutdown(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_closing_signed(byte[] their_node_id, long msg) {
				org.ldk.structs.ClosingSigned msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ClosingSigned(null, msg); }
				arg.handle_closing_signed(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_add_htlc(byte[] their_node_id, long msg) {
				org.ldk.structs.UpdateAddHTLC msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.UpdateAddHTLC(null, msg); }
				arg.handle_update_add_htlc(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_fulfill_htlc(byte[] their_node_id, long msg) {
				org.ldk.structs.UpdateFulfillHTLC msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.UpdateFulfillHTLC(null, msg); }
				arg.handle_update_fulfill_htlc(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_fail_htlc(byte[] their_node_id, long msg) {
				org.ldk.structs.UpdateFailHTLC msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.UpdateFailHTLC(null, msg); }
				arg.handle_update_fail_htlc(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_fail_malformed_htlc(byte[] their_node_id, long msg) {
				org.ldk.structs.UpdateFailMalformedHTLC msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.UpdateFailMalformedHTLC(null, msg); }
				arg.handle_update_fail_malformed_htlc(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_commitment_signed(byte[] their_node_id, long msg) {
				org.ldk.structs.CommitmentSigned msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.CommitmentSigned(null, msg); }
				arg.handle_commitment_signed(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_revoke_and_ack(byte[] their_node_id, long msg) {
				org.ldk.structs.RevokeAndACK msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.RevokeAndACK(null, msg); }
				arg.handle_revoke_and_ack(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_fee(byte[] their_node_id, long msg) {
				org.ldk.structs.UpdateFee msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.UpdateFee(null, msg); }
				arg.handle_update_fee(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_announcement_signatures(byte[] their_node_id, long msg) {
				org.ldk.structs.AnnouncementSignatures msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.AnnouncementSignatures(null, msg); }
				arg.handle_announcement_signatures(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void peer_disconnected(byte[] their_node_id) {
				arg.peer_disconnected(their_node_id);
				Reference.reachabilityFence(arg);
			}
			@Override public long peer_connected(byte[] their_node_id, long msg, boolean inbound) {
				org.ldk.structs.Init msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.Init(null, msg); }
				Result_NoneNoneZ ret = arg.peer_connected(their_node_id, msg_hu_conv, inbound);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public void handle_channel_reestablish(byte[] their_node_id, long msg) {
				org.ldk.structs.ChannelReestablish msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ChannelReestablish(null, msg); }
				arg.handle_channel_reestablish(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_channel_update(byte[] their_node_id, long msg) {
				org.ldk.structs.ChannelUpdate msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ChannelUpdate(null, msg); }
				arg.handle_channel_update(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_error(byte[] their_node_id, long msg) {
				org.ldk.structs.ErrorMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ErrorMessage(null, msg); }
				arg.handle_error(their_node_id, msg_hu_conv);
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
		}, MessageSendEventsProvider.new_impl(MessageSendEventsProvider_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying MessageSendEventsProvider.
	 */
	public MessageSendEventsProvider get_message_send_events_provider() {
		MessageSendEventsProvider res = new MessageSendEventsProvider(null, bindings.LDKChannelMessageHandler_get_MessageSendEventsProvider(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}

	/**
	 * Handle an incoming `open_channel` message from the given peer.
	 */
	public void handle_open_channel(byte[] their_node_id, org.ldk.structs.OpenChannel msg) {
		bindings.ChannelMessageHandler_handle_open_channel(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `accept_channel` message from the given peer.
	 */
	public void handle_accept_channel(byte[] their_node_id, org.ldk.structs.AcceptChannel msg) {
		bindings.ChannelMessageHandler_handle_accept_channel(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `funding_created` message from the given peer.
	 */
	public void handle_funding_created(byte[] their_node_id, org.ldk.structs.FundingCreated msg) {
		bindings.ChannelMessageHandler_handle_funding_created(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `funding_signed` message from the given peer.
	 */
	public void handle_funding_signed(byte[] their_node_id, org.ldk.structs.FundingSigned msg) {
		bindings.ChannelMessageHandler_handle_funding_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `channel_ready` message from the given peer.
	 */
	public void handle_channel_ready(byte[] their_node_id, org.ldk.structs.ChannelReady msg) {
		bindings.ChannelMessageHandler_handle_channel_ready(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `shutdown` message from the given peer.
	 */
	public void handle_shutdown(byte[] their_node_id, org.ldk.structs.Shutdown msg) {
		bindings.ChannelMessageHandler_handle_shutdown(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `closing_signed` message from the given peer.
	 */
	public void handle_closing_signed(byte[] their_node_id, org.ldk.structs.ClosingSigned msg) {
		bindings.ChannelMessageHandler_handle_closing_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `update_add_htlc` message from the given peer.
	 */
	public void handle_update_add_htlc(byte[] their_node_id, org.ldk.structs.UpdateAddHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_add_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `update_fulfill_htlc` message from the given peer.
	 */
	public void handle_update_fulfill_htlc(byte[] their_node_id, org.ldk.structs.UpdateFulfillHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fulfill_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `update_fail_htlc` message from the given peer.
	 */
	public void handle_update_fail_htlc(byte[] their_node_id, org.ldk.structs.UpdateFailHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `update_fail_malformed_htlc` message from the given peer.
	 */
	public void handle_update_fail_malformed_htlc(byte[] their_node_id, org.ldk.structs.UpdateFailMalformedHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_malformed_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `commitment_signed` message from the given peer.
	 */
	public void handle_commitment_signed(byte[] their_node_id, org.ldk.structs.CommitmentSigned msg) {
		bindings.ChannelMessageHandler_handle_commitment_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `revoke_and_ack` message from the given peer.
	 */
	public void handle_revoke_and_ack(byte[] their_node_id, org.ldk.structs.RevokeAndACK msg) {
		bindings.ChannelMessageHandler_handle_revoke_and_ack(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `update_fee` message from the given peer.
	 */
	public void handle_update_fee(byte[] their_node_id, org.ldk.structs.UpdateFee msg) {
		bindings.ChannelMessageHandler_handle_update_fee(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `announcement_signatures` message from the given peer.
	 */
	public void handle_announcement_signatures(byte[] their_node_id, org.ldk.structs.AnnouncementSignatures msg) {
		bindings.ChannelMessageHandler_handle_announcement_signatures(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Indicates a connection to the peer failed/an existing connection was lost.
	 */
	public void peer_disconnected(byte[] their_node_id) {
		bindings.ChannelMessageHandler_peer_disconnected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
	}

	/**
	 * Handle a peer reconnecting, possibly generating `channel_reestablish` message(s).
	 * 
	 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
	 * with us. Implementors should be somewhat conservative about doing so, however, as other
	 * message handlers may still wish to communicate with this peer.
	 */
	public Result_NoneNoneZ peer_connected(byte[] their_node_id, org.ldk.structs.Init msg, boolean inbound) {
		long ret = bindings.ChannelMessageHandler_peer_connected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr, inbound);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(inbound);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Handle an incoming `channel_reestablish` message from the given peer.
	 */
	public void handle_channel_reestablish(byte[] their_node_id, org.ldk.structs.ChannelReestablish msg) {
		bindings.ChannelMessageHandler_handle_channel_reestablish(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `channel_update` message from the given peer.
	 */
	public void handle_channel_update(byte[] their_node_id, org.ldk.structs.ChannelUpdate msg) {
		bindings.ChannelMessageHandler_handle_channel_update(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Handle an incoming `error` message from the given peer.
	 */
	public void handle_error(byte[] their_node_id, org.ldk.structs.ErrorMessage msg) {
		bindings.ChannelMessageHandler_handle_error(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		if (this != null) { this.ptrs_to.add(msg); };
	}

	/**
	 * Gets the node feature flags which this handler itself supports. All available handlers are
	 * queried similarly and their feature flags are OR'd together to form the [`NodeFeatures`]
	 * which are broadcasted in our [`NodeAnnouncement`] message.
	 */
	public NodeFeatures provided_node_features() {
		long ret = bindings.ChannelMessageHandler_provided_node_features(this.ptr);
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
		long ret = bindings.ChannelMessageHandler_provided_init_features(this.ptr, InternalUtils.check_arr_len(their_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
