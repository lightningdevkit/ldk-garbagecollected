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
 * Messages MAY be called in parallel when they originate from different their_node_ids, however
 * they MUST NOT be called in parallel when the two calls have the same their_node_id.
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

	public static interface ChannelMessageHandlerInterface {
		/**
		 * Handle an incoming open_channel message from the given peer.
		 */
		void handle_open_channel(byte[] their_node_id, InitFeatures their_features, OpenChannel msg);
		/**
		 * Handle an incoming accept_channel message from the given peer.
		 */
		void handle_accept_channel(byte[] their_node_id, InitFeatures their_features, AcceptChannel msg);
		/**
		 * Handle an incoming funding_created message from the given peer.
		 */
		void handle_funding_created(byte[] their_node_id, FundingCreated msg);
		/**
		 * Handle an incoming funding_signed message from the given peer.
		 */
		void handle_funding_signed(byte[] their_node_id, FundingSigned msg);
		/**
		 * Handle an incoming funding_locked message from the given peer.
		 */
		void handle_funding_locked(byte[] their_node_id, FundingLocked msg);
		/**
		 * Handle an incoming shutdown message from the given peer.
		 */
		void handle_shutdown(byte[] their_node_id, InitFeatures their_features, Shutdown msg);
		/**
		 * Handle an incoming closing_signed message from the given peer.
		 */
		void handle_closing_signed(byte[] their_node_id, ClosingSigned msg);
		/**
		 * Handle an incoming update_add_htlc message from the given peer.
		 */
		void handle_update_add_htlc(byte[] their_node_id, UpdateAddHTLC msg);
		/**
		 * Handle an incoming update_fulfill_htlc message from the given peer.
		 */
		void handle_update_fulfill_htlc(byte[] their_node_id, UpdateFulfillHTLC msg);
		/**
		 * Handle an incoming update_fail_htlc message from the given peer.
		 */
		void handle_update_fail_htlc(byte[] their_node_id, UpdateFailHTLC msg);
		/**
		 * Handle an incoming update_fail_malformed_htlc message from the given peer.
		 */
		void handle_update_fail_malformed_htlc(byte[] their_node_id, UpdateFailMalformedHTLC msg);
		/**
		 * Handle an incoming commitment_signed message from the given peer.
		 */
		void handle_commitment_signed(byte[] their_node_id, CommitmentSigned msg);
		/**
		 * Handle an incoming revoke_and_ack message from the given peer.
		 */
		void handle_revoke_and_ack(byte[] their_node_id, RevokeAndACK msg);
		/**
		 * Handle an incoming update_fee message from the given peer.
		 */
		void handle_update_fee(byte[] their_node_id, UpdateFee msg);
		/**
		 * Handle an incoming announcement_signatures message from the given peer.
		 */
		void handle_announcement_signatures(byte[] their_node_id, AnnouncementSignatures msg);
		/**
		 * Indicates a connection to the peer failed/an existing connection was lost. If no connection
		 * is believed to be possible in the future (eg they're sending us messages we don't
		 * understand or indicate they require unknown feature bits), no_connection_possible is set
		 * and any outstanding channels should be failed.
		 */
		void peer_disconnected(byte[] their_node_id, boolean no_connection_possible);
		/**
		 * Handle a peer reconnecting, possibly generating channel_reestablish message(s).
		 */
		void peer_connected(byte[] their_node_id, Init msg);
		/**
		 * Handle an incoming channel_reestablish message from the given peer.
		 */
		void handle_channel_reestablish(byte[] their_node_id, ChannelReestablish msg);
		/**
		 * Handle an incoming channel update from the given peer.
		 */
		void handle_channel_update(byte[] their_node_id, ChannelUpdate msg);
		/**
		 * Handle an incoming error message from the given peer.
		 */
		void handle_error(byte[] their_node_id, ErrorMessage msg);
	}
	private static class LDKChannelMessageHandlerHolder { ChannelMessageHandler held; }
	public static ChannelMessageHandler new_impl(ChannelMessageHandlerInterface arg, MessageSendEventsProvider.MessageSendEventsProviderInterface MessageSendEventsProvider_impl) {
		final LDKChannelMessageHandlerHolder impl_holder = new LDKChannelMessageHandlerHolder();
		impl_holder.held = new ChannelMessageHandler(new bindings.LDKChannelMessageHandler() {
			@Override public void handle_open_channel(byte[] their_node_id, long their_features, long msg) {
				InitFeatures their_features_hu_conv = null; if (their_features < 0 || their_features > 4096) { their_features_hu_conv = new InitFeatures(null, their_features); }
				their_features_hu_conv.ptrs_to.add(this);
				OpenChannel msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new OpenChannel(null, msg); }
				arg.handle_open_channel(their_node_id, their_features_hu_conv, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_accept_channel(byte[] their_node_id, long their_features, long msg) {
				InitFeatures their_features_hu_conv = null; if (their_features < 0 || their_features > 4096) { their_features_hu_conv = new InitFeatures(null, their_features); }
				their_features_hu_conv.ptrs_to.add(this);
				AcceptChannel msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new AcceptChannel(null, msg); }
				arg.handle_accept_channel(their_node_id, their_features_hu_conv, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_funding_created(byte[] their_node_id, long msg) {
				FundingCreated msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new FundingCreated(null, msg); }
				arg.handle_funding_created(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_funding_signed(byte[] their_node_id, long msg) {
				FundingSigned msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new FundingSigned(null, msg); }
				arg.handle_funding_signed(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_funding_locked(byte[] their_node_id, long msg) {
				FundingLocked msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new FundingLocked(null, msg); }
				arg.handle_funding_locked(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_shutdown(byte[] their_node_id, long their_features, long msg) {
				InitFeatures their_features_hu_conv = null; if (their_features < 0 || their_features > 4096) { their_features_hu_conv = new InitFeatures(null, their_features); }
				Shutdown msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new Shutdown(null, msg); }
				arg.handle_shutdown(their_node_id, their_features_hu_conv, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_closing_signed(byte[] their_node_id, long msg) {
				ClosingSigned msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ClosingSigned(null, msg); }
				arg.handle_closing_signed(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_add_htlc(byte[] their_node_id, long msg) {
				UpdateAddHTLC msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new UpdateAddHTLC(null, msg); }
				arg.handle_update_add_htlc(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_fulfill_htlc(byte[] their_node_id, long msg) {
				UpdateFulfillHTLC msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new UpdateFulfillHTLC(null, msg); }
				arg.handle_update_fulfill_htlc(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_fail_htlc(byte[] their_node_id, long msg) {
				UpdateFailHTLC msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new UpdateFailHTLC(null, msg); }
				arg.handle_update_fail_htlc(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_fail_malformed_htlc(byte[] their_node_id, long msg) {
				UpdateFailMalformedHTLC msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new UpdateFailMalformedHTLC(null, msg); }
				arg.handle_update_fail_malformed_htlc(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_commitment_signed(byte[] their_node_id, long msg) {
				CommitmentSigned msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new CommitmentSigned(null, msg); }
				arg.handle_commitment_signed(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_revoke_and_ack(byte[] their_node_id, long msg) {
				RevokeAndACK msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new RevokeAndACK(null, msg); }
				arg.handle_revoke_and_ack(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_update_fee(byte[] their_node_id, long msg) {
				UpdateFee msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new UpdateFee(null, msg); }
				arg.handle_update_fee(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_announcement_signatures(byte[] their_node_id, long msg) {
				AnnouncementSignatures msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new AnnouncementSignatures(null, msg); }
				arg.handle_announcement_signatures(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void peer_disconnected(byte[] their_node_id, boolean no_connection_possible) {
				arg.peer_disconnected(their_node_id, no_connection_possible);
				Reference.reachabilityFence(arg);
			}
			@Override public void peer_connected(byte[] their_node_id, long msg) {
				Init msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new Init(null, msg); }
				arg.peer_connected(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_channel_reestablish(byte[] their_node_id, long msg) {
				ChannelReestablish msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ChannelReestablish(null, msg); }
				arg.handle_channel_reestablish(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_channel_update(byte[] their_node_id, long msg) {
				ChannelUpdate msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ChannelUpdate(null, msg); }
				arg.handle_channel_update(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
			@Override public void handle_error(byte[] their_node_id, long msg) {
				ErrorMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ErrorMessage(null, msg); }
				arg.handle_error(their_node_id, msg_hu_conv);
				Reference.reachabilityFence(arg);
			}
		}, MessageSendEventsProvider.new_impl(MessageSendEventsProvider_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying MessageSendEventsProvider.
	 */
	public MessageSendEventsProvider get_message_send_events_provider() {
		MessageSendEventsProvider res = new MessageSendEventsProvider(null, bindings.LDKChannelMessageHandler_get_MessageSendEventsProvider(this.ptr));
		this.ptrs_to.add(res);
		return res;
	}

	/**
	 * Handle an incoming open_channel message from the given peer.
	 */
	public void handle_open_channel(byte[] their_node_id, InitFeatures their_features, OpenChannel msg) {
		bindings.ChannelMessageHandler_handle_open_channel(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), their_features == null ? 0 : their_features.ptr & ~1, msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(their_features);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming accept_channel message from the given peer.
	 */
	public void handle_accept_channel(byte[] their_node_id, InitFeatures their_features, AcceptChannel msg) {
		bindings.ChannelMessageHandler_handle_accept_channel(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), their_features == null ? 0 : their_features.ptr & ~1, msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(their_features);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming funding_created message from the given peer.
	 */
	public void handle_funding_created(byte[] their_node_id, FundingCreated msg) {
		bindings.ChannelMessageHandler_handle_funding_created(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming funding_signed message from the given peer.
	 */
	public void handle_funding_signed(byte[] their_node_id, FundingSigned msg) {
		bindings.ChannelMessageHandler_handle_funding_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming funding_locked message from the given peer.
	 */
	public void handle_funding_locked(byte[] their_node_id, FundingLocked msg) {
		bindings.ChannelMessageHandler_handle_funding_locked(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming shutdown message from the given peer.
	 */
	public void handle_shutdown(byte[] their_node_id, InitFeatures their_features, Shutdown msg) {
		bindings.ChannelMessageHandler_handle_shutdown(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), their_features == null ? 0 : their_features.ptr & ~1, msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(their_features);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(their_features);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming closing_signed message from the given peer.
	 */
	public void handle_closing_signed(byte[] their_node_id, ClosingSigned msg) {
		bindings.ChannelMessageHandler_handle_closing_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming update_add_htlc message from the given peer.
	 */
	public void handle_update_add_htlc(byte[] their_node_id, UpdateAddHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_add_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming update_fulfill_htlc message from the given peer.
	 */
	public void handle_update_fulfill_htlc(byte[] their_node_id, UpdateFulfillHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fulfill_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming update_fail_htlc message from the given peer.
	 */
	public void handle_update_fail_htlc(byte[] their_node_id, UpdateFailHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming update_fail_malformed_htlc message from the given peer.
	 */
	public void handle_update_fail_malformed_htlc(byte[] their_node_id, UpdateFailMalformedHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_malformed_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming commitment_signed message from the given peer.
	 */
	public void handle_commitment_signed(byte[] their_node_id, CommitmentSigned msg) {
		bindings.ChannelMessageHandler_handle_commitment_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming revoke_and_ack message from the given peer.
	 */
	public void handle_revoke_and_ack(byte[] their_node_id, RevokeAndACK msg) {
		bindings.ChannelMessageHandler_handle_revoke_and_ack(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming update_fee message from the given peer.
	 */
	public void handle_update_fee(byte[] their_node_id, UpdateFee msg) {
		bindings.ChannelMessageHandler_handle_update_fee(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming announcement_signatures message from the given peer.
	 */
	public void handle_announcement_signatures(byte[] their_node_id, AnnouncementSignatures msg) {
		bindings.ChannelMessageHandler_handle_announcement_signatures(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Indicates a connection to the peer failed/an existing connection was lost. If no connection
	 * is believed to be possible in the future (eg they're sending us messages we don't
	 * understand or indicate they require unknown feature bits), no_connection_possible is set
	 * and any outstanding channels should be failed.
	 */
	public void peer_disconnected(byte[] their_node_id, boolean no_connection_possible) {
		bindings.ChannelMessageHandler_peer_disconnected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), no_connection_possible);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(no_connection_possible);
	}

	/**
	 * Handle a peer reconnecting, possibly generating channel_reestablish message(s).
	 */
	public void peer_connected(byte[] their_node_id, Init msg) {
		bindings.ChannelMessageHandler_peer_connected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming channel_reestablish message from the given peer.
	 */
	public void handle_channel_reestablish(byte[] their_node_id, ChannelReestablish msg) {
		bindings.ChannelMessageHandler_handle_channel_reestablish(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming channel update from the given peer.
	 */
	public void handle_channel_update(byte[] their_node_id, ChannelUpdate msg) {
		bindings.ChannelMessageHandler_handle_channel_update(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

	/**
	 * Handle an incoming error message from the given peer.
	 */
	public void handle_error(byte[] their_node_id, ErrorMessage msg) {
		bindings.ChannelMessageHandler_handle_error(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_node_id);
		Reference.reachabilityFence(msg);
		this.ptrs_to.add(msg);
	}

}
