using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait to describe an object which can receive channel messages.
 * 
 * Messages MAY be called in parallel when they originate from different their_node_ids, however
 * they MUST NOT be called in parallel when the two calls have the same their_node_id.
 */
public class ChannelMessageHandler : CommonBase {
	internal readonly bindings.LDKChannelMessageHandler bindings_instance;
	internal ChannelMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private ChannelMessageHandler(bindings.LDKChannelMessageHandler arg, bindings.LDKMessageSendEventsProvider MessageSendEventsProvider) : base(bindings.LDKChannelMessageHandler_new(arg, MessageSendEventsProvider)) {
		this.ptrs_to.AddLast(arg);
		this.ptrs_to.AddLast(MessageSendEventsProvider);
		this.bindings_instance = arg;
	}
	~ChannelMessageHandler() {
		if (ptr != 0) { bindings.ChannelMessageHandler_free(ptr); }
	}

	public interface ChannelMessageHandlerInterface {
		/**
		 * Handle an incoming open_channel message from the given peer.
		 */
		void handle_open_channel(byte[] _their_node_id, InitFeatures _their_features, OpenChannel _msg);
		/**
		 * Handle an incoming accept_channel message from the given peer.
		 */
		void handle_accept_channel(byte[] _their_node_id, InitFeatures _their_features, AcceptChannel _msg);
		/**
		 * Handle an incoming funding_created message from the given peer.
		 */
		void handle_funding_created(byte[] _their_node_id, FundingCreated _msg);
		/**
		 * Handle an incoming funding_signed message from the given peer.
		 */
		void handle_funding_signed(byte[] _their_node_id, FundingSigned _msg);
		/**
		 * Handle an incoming channel_ready message from the given peer.
		 */
		void handle_channel_ready(byte[] _their_node_id, ChannelReady _msg);
		/**
		 * Handle an incoming shutdown message from the given peer.
		 */
		void handle_shutdown(byte[] _their_node_id, InitFeatures _their_features, Shutdown _msg);
		/**
		 * Handle an incoming closing_signed message from the given peer.
		 */
		void handle_closing_signed(byte[] _their_node_id, ClosingSigned _msg);
		/**
		 * Handle an incoming update_add_htlc message from the given peer.
		 */
		void handle_update_add_htlc(byte[] _their_node_id, UpdateAddHTLC _msg);
		/**
		 * Handle an incoming update_fulfill_htlc message from the given peer.
		 */
		void handle_update_fulfill_htlc(byte[] _their_node_id, UpdateFulfillHTLC _msg);
		/**
		 * Handle an incoming update_fail_htlc message from the given peer.
		 */
		void handle_update_fail_htlc(byte[] _their_node_id, UpdateFailHTLC _msg);
		/**
		 * Handle an incoming update_fail_malformed_htlc message from the given peer.
		 */
		void handle_update_fail_malformed_htlc(byte[] _their_node_id, UpdateFailMalformedHTLC _msg);
		/**
		 * Handle an incoming commitment_signed message from the given peer.
		 */
		void handle_commitment_signed(byte[] _their_node_id, CommitmentSigned _msg);
		/**
		 * Handle an incoming revoke_and_ack message from the given peer.
		 */
		void handle_revoke_and_ack(byte[] _their_node_id, RevokeAndACK _msg);
		/**
		 * Handle an incoming update_fee message from the given peer.
		 */
		void handle_update_fee(byte[] _their_node_id, UpdateFee _msg);
		/**
		 * Handle an incoming announcement_signatures message from the given peer.
		 */
		void handle_announcement_signatures(byte[] _their_node_id, AnnouncementSignatures _msg);
		/**
		 * Indicates a connection to the peer failed/an existing connection was lost. If no connection
		 * is believed to be possible in the future (eg they're sending us messages we don't
		 * understand or indicate they require unknown feature bits), no_connection_possible is set
		 * and any outstanding channels should be failed.
		 * 
		 * Note that in some rare cases this may be called without a corresponding
		 * [`Self::peer_connected`].
		 */
		void peer_disconnected(byte[] _their_node_id, bool _no_connection_possible);
		/**
		 * Handle a peer reconnecting, possibly generating channel_reestablish message(s).
		 * 
		 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
		 * with us. Implementors should be somewhat conservative about doing so, however, as other
		 * message handlers may still wish to communicate with this peer.
		 */
		Result_NoneNoneZ peer_connected(byte[] _their_node_id, Init _msg);
		/**
		 * Handle an incoming channel_reestablish message from the given peer.
		 */
		void handle_channel_reestablish(byte[] _their_node_id, ChannelReestablish _msg);
		/**
		 * Handle an incoming channel update from the given peer.
		 */
		void handle_channel_update(byte[] _their_node_id, ChannelUpdate _msg);
		/**
		 * Handle an incoming error message from the given peer.
		 */
		void handle_error(byte[] _their_node_id, ErrorMessage _msg);
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
	private class LDKChannelMessageHandlerHolder { internal ChannelMessageHandler held; }
	private class LDKChannelMessageHandlerImpl : bindings.LDKChannelMessageHandler {
		internal LDKChannelMessageHandlerImpl(ChannelMessageHandlerInterface arg, LDKChannelMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ChannelMessageHandlerInterface arg;
		private LDKChannelMessageHandlerHolder impl_holder;
		public void handle_open_channel(byte[] _their_node_id, long _their_features, long _msg) {
			org.ldk.structs.InitFeatures _their_features_hu_conv = null; if (_their_features < 0 || _their_features > 4096) { _their_features_hu_conv = new org.ldk.structs.InitFeatures(null, _their_features); }
			if (_their_features_hu_conv != null) { _their_features_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.OpenChannel _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.OpenChannel(null, _msg); }
			arg.handle_open_channel(_their_node_id, _their_features_hu_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_accept_channel(byte[] _their_node_id, long _their_features, long _msg) {
			org.ldk.structs.InitFeatures _their_features_hu_conv = null; if (_their_features < 0 || _their_features > 4096) { _their_features_hu_conv = new org.ldk.structs.InitFeatures(null, _their_features); }
			if (_their_features_hu_conv != null) { _their_features_hu_conv.ptrs_to.AddLast(this); };
			org.ldk.structs.AcceptChannel _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.AcceptChannel(null, _msg); }
			arg.handle_accept_channel(_their_node_id, _their_features_hu_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_funding_created(byte[] _their_node_id, long _msg) {
			org.ldk.structs.FundingCreated _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.FundingCreated(null, _msg); }
			arg.handle_funding_created(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_funding_signed(byte[] _their_node_id, long _msg) {
			org.ldk.structs.FundingSigned _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.FundingSigned(null, _msg); }
			arg.handle_funding_signed(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_channel_ready(byte[] _their_node_id, long _msg) {
			org.ldk.structs.ChannelReady _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ChannelReady(null, _msg); }
			arg.handle_channel_ready(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_shutdown(byte[] _their_node_id, long _their_features, long _msg) {
			org.ldk.structs.InitFeatures _their_features_hu_conv = null; if (_their_features < 0 || _their_features > 4096) { _their_features_hu_conv = new org.ldk.structs.InitFeatures(null, _their_features); }
			org.ldk.structs.Shutdown _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.Shutdown(null, _msg); }
			arg.handle_shutdown(_their_node_id, _their_features_hu_conv, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_closing_signed(byte[] _their_node_id, long _msg) {
			org.ldk.structs.ClosingSigned _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ClosingSigned(null, _msg); }
			arg.handle_closing_signed(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_add_htlc(byte[] _their_node_id, long _msg) {
			org.ldk.structs.UpdateAddHTLC _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateAddHTLC(null, _msg); }
			arg.handle_update_add_htlc(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_fulfill_htlc(byte[] _their_node_id, long _msg) {
			org.ldk.structs.UpdateFulfillHTLC _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateFulfillHTLC(null, _msg); }
			arg.handle_update_fulfill_htlc(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_fail_htlc(byte[] _their_node_id, long _msg) {
			org.ldk.structs.UpdateFailHTLC _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateFailHTLC(null, _msg); }
			arg.handle_update_fail_htlc(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_fail_malformed_htlc(byte[] _their_node_id, long _msg) {
			org.ldk.structs.UpdateFailMalformedHTLC _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateFailMalformedHTLC(null, _msg); }
			arg.handle_update_fail_malformed_htlc(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_commitment_signed(byte[] _their_node_id, long _msg) {
			org.ldk.structs.CommitmentSigned _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.CommitmentSigned(null, _msg); }
			arg.handle_commitment_signed(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_revoke_and_ack(byte[] _their_node_id, long _msg) {
			org.ldk.structs.RevokeAndACK _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.RevokeAndACK(null, _msg); }
			arg.handle_revoke_and_ack(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_update_fee(byte[] _their_node_id, long _msg) {
			org.ldk.structs.UpdateFee _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UpdateFee(null, _msg); }
			arg.handle_update_fee(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_announcement_signatures(byte[] _their_node_id, long _msg) {
			org.ldk.structs.AnnouncementSignatures _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.AnnouncementSignatures(null, _msg); }
			arg.handle_announcement_signatures(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void peer_disconnected(byte[] _their_node_id, bool _no_connection_possible) {
			arg.peer_disconnected(_their_node_id, _no_connection_possible);
				GC.KeepAlive(arg);
		}
		public long peer_connected(byte[] _their_node_id, long _msg) {
			org.ldk.structs.Init _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.Init(null, _msg); }
			Result_NoneNoneZ ret = arg.peer_connected(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public void handle_channel_reestablish(byte[] _their_node_id, long _msg) {
			org.ldk.structs.ChannelReestablish _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ChannelReestablish(null, _msg); }
			arg.handle_channel_reestablish(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_channel_update(byte[] _their_node_id, long _msg) {
			org.ldk.structs.ChannelUpdate _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ChannelUpdate(null, _msg); }
			arg.handle_channel_update(_their_node_id, _msg_hu_conv);
				GC.KeepAlive(arg);
		}
		public void handle_error(byte[] _their_node_id, long _msg) {
			org.ldk.structs.ErrorMessage _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.ErrorMessage(null, _msg); }
			arg.handle_error(_their_node_id, _msg_hu_conv);
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
	public static ChannelMessageHandler new_impl(ChannelMessageHandlerInterface arg, MessageSendEventsProvider.MessageSendEventsProviderInterface MessageSendEventsProvider_impl) {
		LDKChannelMessageHandlerHolder impl_holder = new LDKChannelMessageHandlerHolder();
		impl_holder.held = new ChannelMessageHandler(new LDKChannelMessageHandlerImpl(arg, impl_holder), MessageSendEventsProvider.new_impl(MessageSendEventsProvider_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying MessageSendEventsProvider.
	 */
	public MessageSendEventsProvider get_message_send_events_provider() {
		MessageSendEventsProvider res = new MessageSendEventsProvider(null, bindings.LDKChannelMessageHandler_get_MessageSendEventsProvider(this.ptr));
		this.ptrs_to.AddLast(res);
		return res;
	}

	/**
	 * Handle an incoming open_channel message from the given peer.
	 */
	public void handle_open_channel(byte[] their_node_id, org.ldk.structs.InitFeatures their_features, org.ldk.structs.OpenChannel msg) {
		bindings.ChannelMessageHandler_handle_open_channel(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), their_features == null ? 0 : their_features.ptr, msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(their_features);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(their_features); };
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming accept_channel message from the given peer.
	 */
	public void handle_accept_channel(byte[] their_node_id, org.ldk.structs.InitFeatures their_features, org.ldk.structs.AcceptChannel msg) {
		bindings.ChannelMessageHandler_handle_accept_channel(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), their_features == null ? 0 : their_features.ptr, msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(their_features);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(their_features); };
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming funding_created message from the given peer.
	 */
	public void handle_funding_created(byte[] their_node_id, org.ldk.structs.FundingCreated msg) {
		bindings.ChannelMessageHandler_handle_funding_created(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming funding_signed message from the given peer.
	 */
	public void handle_funding_signed(byte[] their_node_id, org.ldk.structs.FundingSigned msg) {
		bindings.ChannelMessageHandler_handle_funding_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming channel_ready message from the given peer.
	 */
	public void handle_channel_ready(byte[] their_node_id, org.ldk.structs.ChannelReady msg) {
		bindings.ChannelMessageHandler_handle_channel_ready(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming shutdown message from the given peer.
	 */
	public void handle_shutdown(byte[] their_node_id, org.ldk.structs.InitFeatures their_features, org.ldk.structs.Shutdown msg) {
		bindings.ChannelMessageHandler_handle_shutdown(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), their_features == null ? 0 : their_features.ptr, msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(their_features);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(their_features); };
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming closing_signed message from the given peer.
	 */
	public void handle_closing_signed(byte[] their_node_id, org.ldk.structs.ClosingSigned msg) {
		bindings.ChannelMessageHandler_handle_closing_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming update_add_htlc message from the given peer.
	 */
	public void handle_update_add_htlc(byte[] their_node_id, org.ldk.structs.UpdateAddHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_add_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming update_fulfill_htlc message from the given peer.
	 */
	public void handle_update_fulfill_htlc(byte[] their_node_id, org.ldk.structs.UpdateFulfillHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fulfill_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming update_fail_htlc message from the given peer.
	 */
	public void handle_update_fail_htlc(byte[] their_node_id, org.ldk.structs.UpdateFailHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming update_fail_malformed_htlc message from the given peer.
	 */
	public void handle_update_fail_malformed_htlc(byte[] their_node_id, org.ldk.structs.UpdateFailMalformedHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_malformed_htlc(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming commitment_signed message from the given peer.
	 */
	public void handle_commitment_signed(byte[] their_node_id, org.ldk.structs.CommitmentSigned msg) {
		bindings.ChannelMessageHandler_handle_commitment_signed(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming revoke_and_ack message from the given peer.
	 */
	public void handle_revoke_and_ack(byte[] their_node_id, org.ldk.structs.RevokeAndACK msg) {
		bindings.ChannelMessageHandler_handle_revoke_and_ack(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming update_fee message from the given peer.
	 */
	public void handle_update_fee(byte[] their_node_id, org.ldk.structs.UpdateFee msg) {
		bindings.ChannelMessageHandler_handle_update_fee(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming announcement_signatures message from the given peer.
	 */
	public void handle_announcement_signatures(byte[] their_node_id, org.ldk.structs.AnnouncementSignatures msg) {
		bindings.ChannelMessageHandler_handle_announcement_signatures(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Indicates a connection to the peer failed/an existing connection was lost. If no connection
	 * is believed to be possible in the future (eg they're sending us messages we don't
	 * understand or indicate they require unknown feature bits), no_connection_possible is set
	 * and any outstanding channels should be failed.
	 * 
	 * Note that in some rare cases this may be called without a corresponding
	 * [`Self::peer_connected`].
	 */
	public void peer_disconnected(byte[] their_node_id, bool no_connection_possible) {
		bindings.ChannelMessageHandler_peer_disconnected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), no_connection_possible);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(no_connection_possible);
	}

	/**
	 * Handle a peer reconnecting, possibly generating channel_reestablish message(s).
	 * 
	 * May return an `Err(())` if the features the peer supports are not sufficient to communicate
	 * with us. Implementors should be somewhat conservative about doing so, however, as other
	 * message handlers may still wish to communicate with this peer.
	 */
	public Result_NoneNoneZ peer_connected(byte[] their_node_id, org.ldk.structs.Init msg) {
		long ret = bindings.ChannelMessageHandler_peer_connected(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

	/**
	 * Handle an incoming channel_reestablish message from the given peer.
	 */
	public void handle_channel_reestablish(byte[] their_node_id, org.ldk.structs.ChannelReestablish msg) {
		bindings.ChannelMessageHandler_handle_channel_reestablish(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming channel update from the given peer.
	 */
	public void handle_channel_update(byte[] their_node_id, org.ldk.structs.ChannelUpdate msg) {
		bindings.ChannelMessageHandler_handle_channel_update(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Handle an incoming error message from the given peer.
	 */
	public void handle_error(byte[] their_node_id, org.ldk.structs.ErrorMessage msg) {
		bindings.ChannelMessageHandler_handle_error(this.ptr, InternalUtils.check_arr_len(their_node_id, 33), msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		GC.KeepAlive(msg);
		if (this != null) { this.ptrs_to.AddLast(msg); };
	}

	/**
	 * Gets the node feature flags which this handler itself supports. All available handlers are
	 * queried similarly and their feature flags are OR'd together to form the [`NodeFeatures`]
	 * which are broadcasted in our [`NodeAnnouncement`] message.
	 */
	public NodeFeatures provided_node_features() {
		long ret = bindings.ChannelMessageHandler_provided_node_features(this.ptr);
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
		long ret = bindings.ChannelMessageHandler_provided_init_features(this.ptr, InternalUtils.check_arr_len(their_node_id, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(their_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
