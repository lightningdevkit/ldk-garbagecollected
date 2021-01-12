
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
		void handle_open_channel(byte[] their_node_id, InitFeatures their_features, OpenChannel msg);
		void handle_accept_channel(byte[] their_node_id, InitFeatures their_features, AcceptChannel msg);
		void handle_funding_created(byte[] their_node_id, FundingCreated msg);
		void handle_funding_signed(byte[] their_node_id, FundingSigned msg);
		void handle_funding_locked(byte[] their_node_id, FundingLocked msg);
		void handle_shutdown(byte[] their_node_id, Shutdown msg);
		void handle_closing_signed(byte[] their_node_id, ClosingSigned msg);
		void handle_update_add_htlc(byte[] their_node_id, UpdateAddHTLC msg);
		void handle_update_fulfill_htlc(byte[] their_node_id, UpdateFulfillHTLC msg);
		void handle_update_fail_htlc(byte[] their_node_id, UpdateFailHTLC msg);
		void handle_update_fail_malformed_htlc(byte[] their_node_id, UpdateFailMalformedHTLC msg);
		void handle_commitment_signed(byte[] their_node_id, CommitmentSigned msg);
		void handle_revoke_and_ack(byte[] their_node_id, RevokeAndACK msg);
		void handle_update_fee(byte[] their_node_id, UpdateFee msg);
		void handle_announcement_signatures(byte[] their_node_id, AnnouncementSignatures msg);
		void peer_disconnected(byte[] their_node_id, boolean no_connection_possible);
		void peer_connected(byte[] their_node_id, Init msg);
		void handle_channel_reestablish(byte[] their_node_id, ChannelReestablish msg);
		void handle_error(byte[] their_node_id, ErrorMessage msg);
	}
	private static class LDKChannelMessageHandlerHolder { ChannelMessageHandler held; }
	public static ChannelMessageHandler new_impl(ChannelMessageHandlerInterface arg, MessageSendEventsProvider.MessageSendEventsProviderInterface MessageSendEventsProvider_impl) {
		final LDKChannelMessageHandlerHolder impl_holder = new LDKChannelMessageHandlerHolder();
		impl_holder.held = new ChannelMessageHandler(new bindings.LDKChannelMessageHandler() {
			@Override public void handle_open_channel(byte[] their_node_id, uint32_t their_features, uint32_t msg) {
				InitFeatures their_features_hu_conv = new InitFeatures(null, their_features);
				OpenChannel msg_hu_conv = new OpenChannel(null, msg);
				arg.handle_open_channel(their_node_id, their_features_hu_conv, msg_hu_conv);
			}
			@Override public void handle_accept_channel(byte[] their_node_id, uint32_t their_features, uint32_t msg) {
				InitFeatures their_features_hu_conv = new InitFeatures(null, their_features);
				AcceptChannel msg_hu_conv = new AcceptChannel(null, msg);
				arg.handle_accept_channel(their_node_id, their_features_hu_conv, msg_hu_conv);
			}
			@Override public void handle_funding_created(byte[] their_node_id, uint32_t msg) {
				FundingCreated msg_hu_conv = new FundingCreated(null, msg);
				arg.handle_funding_created(their_node_id, msg_hu_conv);
			}
			@Override public void handle_funding_signed(byte[] their_node_id, uint32_t msg) {
				FundingSigned msg_hu_conv = new FundingSigned(null, msg);
				arg.handle_funding_signed(their_node_id, msg_hu_conv);
			}
			@Override public void handle_funding_locked(byte[] their_node_id, uint32_t msg) {
				FundingLocked msg_hu_conv = new FundingLocked(null, msg);
				arg.handle_funding_locked(their_node_id, msg_hu_conv);
			}
			@Override public void handle_shutdown(byte[] their_node_id, uint32_t msg) {
				Shutdown msg_hu_conv = new Shutdown(null, msg);
				arg.handle_shutdown(their_node_id, msg_hu_conv);
			}
			@Override public void handle_closing_signed(byte[] their_node_id, uint32_t msg) {
				ClosingSigned msg_hu_conv = new ClosingSigned(null, msg);
				arg.handle_closing_signed(their_node_id, msg_hu_conv);
			}
			@Override public void handle_update_add_htlc(byte[] their_node_id, uint32_t msg) {
				UpdateAddHTLC msg_hu_conv = new UpdateAddHTLC(null, msg);
				arg.handle_update_add_htlc(their_node_id, msg_hu_conv);
			}
			@Override public void handle_update_fulfill_htlc(byte[] their_node_id, uint32_t msg) {
				UpdateFulfillHTLC msg_hu_conv = new UpdateFulfillHTLC(null, msg);
				arg.handle_update_fulfill_htlc(their_node_id, msg_hu_conv);
			}
			@Override public void handle_update_fail_htlc(byte[] their_node_id, uint32_t msg) {
				UpdateFailHTLC msg_hu_conv = new UpdateFailHTLC(null, msg);
				arg.handle_update_fail_htlc(their_node_id, msg_hu_conv);
			}
			@Override public void handle_update_fail_malformed_htlc(byte[] their_node_id, uint32_t msg) {
				UpdateFailMalformedHTLC msg_hu_conv = new UpdateFailMalformedHTLC(null, msg);
				arg.handle_update_fail_malformed_htlc(their_node_id, msg_hu_conv);
			}
			@Override public void handle_commitment_signed(byte[] their_node_id, uint32_t msg) {
				CommitmentSigned msg_hu_conv = new CommitmentSigned(null, msg);
				arg.handle_commitment_signed(their_node_id, msg_hu_conv);
			}
			@Override public void handle_revoke_and_ack(byte[] their_node_id, uint32_t msg) {
				RevokeAndACK msg_hu_conv = new RevokeAndACK(null, msg);
				arg.handle_revoke_and_ack(their_node_id, msg_hu_conv);
			}
			@Override public void handle_update_fee(byte[] their_node_id, uint32_t msg) {
				UpdateFee msg_hu_conv = new UpdateFee(null, msg);
				arg.handle_update_fee(their_node_id, msg_hu_conv);
			}
			@Override public void handle_announcement_signatures(byte[] their_node_id, uint32_t msg) {
				AnnouncementSignatures msg_hu_conv = new AnnouncementSignatures(null, msg);
				arg.handle_announcement_signatures(their_node_id, msg_hu_conv);
			}
			@Override public void peer_disconnected(byte[] their_node_id, boolean no_connection_possible) {
				arg.peer_disconnected(their_node_id, no_connection_possible);
			}
			@Override public void peer_connected(byte[] their_node_id, uint32_t msg) {
				Init msg_hu_conv = new Init(null, msg);
				arg.peer_connected(their_node_id, msg_hu_conv);
			}
			@Override public void handle_channel_reestablish(byte[] their_node_id, uint32_t msg) {
				ChannelReestablish msg_hu_conv = new ChannelReestablish(null, msg);
				arg.handle_channel_reestablish(their_node_id, msg_hu_conv);
			}
			@Override public void handle_error(byte[] their_node_id, uint32_t msg) {
				ErrorMessage msg_hu_conv = new ErrorMessage(null, msg);
				arg.handle_error(their_node_id, msg_hu_conv);
			}
		}, MessageSendEventsProvider.new_impl(MessageSendEventsProvider_impl).bindings_instance);
		return impl_holder.held;
	}
	public void handle_open_channel(byte[] their_node_id, InitFeatures their_features, OpenChannel msg) {
		bindings.ChannelMessageHandler_handle_open_channel(this.ptr, their_node_id, their_features == null ? 0 : their_features.ptr & ~1, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(their_features);
		this.ptrs_to.add(msg);
	}

	public void handle_accept_channel(byte[] their_node_id, InitFeatures their_features, AcceptChannel msg) {
		bindings.ChannelMessageHandler_handle_accept_channel(this.ptr, their_node_id, their_features == null ? 0 : their_features.ptr & ~1, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(their_features);
		this.ptrs_to.add(msg);
	}

	public void handle_funding_created(byte[] their_node_id, FundingCreated msg) {
		bindings.ChannelMessageHandler_handle_funding_created(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_funding_signed(byte[] their_node_id, FundingSigned msg) {
		bindings.ChannelMessageHandler_handle_funding_signed(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_funding_locked(byte[] their_node_id, FundingLocked msg) {
		bindings.ChannelMessageHandler_handle_funding_locked(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_shutdown(byte[] their_node_id, Shutdown msg) {
		bindings.ChannelMessageHandler_handle_shutdown(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_closing_signed(byte[] their_node_id, ClosingSigned msg) {
		bindings.ChannelMessageHandler_handle_closing_signed(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_add_htlc(byte[] their_node_id, UpdateAddHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_add_htlc(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_fulfill_htlc(byte[] their_node_id, UpdateFulfillHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fulfill_htlc(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_fail_htlc(byte[] their_node_id, UpdateFailHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_htlc(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_fail_malformed_htlc(byte[] their_node_id, UpdateFailMalformedHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_malformed_htlc(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_commitment_signed(byte[] their_node_id, CommitmentSigned msg) {
		bindings.ChannelMessageHandler_handle_commitment_signed(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_revoke_and_ack(byte[] their_node_id, RevokeAndACK msg) {
		bindings.ChannelMessageHandler_handle_revoke_and_ack(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_fee(byte[] their_node_id, UpdateFee msg) {
		bindings.ChannelMessageHandler_handle_update_fee(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_announcement_signatures(byte[] their_node_id, AnnouncementSignatures msg) {
		bindings.ChannelMessageHandler_handle_announcement_signatures(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void peer_disconnected(byte[] their_node_id, boolean no_connection_possible) {
		bindings.ChannelMessageHandler_peer_disconnected(this.ptr, their_node_id, no_connection_possible);
	}

	public void peer_connected(byte[] their_node_id, Init msg) {
		bindings.ChannelMessageHandler_peer_connected(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_channel_reestablish(byte[] their_node_id, ChannelReestablish msg) {
		bindings.ChannelMessageHandler_handle_channel_reestablish(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_error(byte[] their_node_id, ErrorMessage msg) {
		bindings.ChannelMessageHandler_handle_error(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

}
