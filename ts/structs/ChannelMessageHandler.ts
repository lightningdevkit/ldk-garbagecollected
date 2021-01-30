
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class ChannelMessageHandler extends CommonBase {

                bindings_instance?: bindings.LDKChannelMessageHandler;

                constructor(ptr?: number, arg?: bindings.LDKChannelMessageHandler, messageSendEventsProvider?: bindings.LDKMessageSendEventsProvider) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKChannelMessageHandler_new(arg, messageSendEventsProvider));
				        this.ptrs_to.push(arg);
				        this.ptrs_to.push(messageSendEventsProvider);

				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.ChannelMessageHandler_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: ChannelMessageHandlerInterface, messageSendEventsProvider_impl: MessageSendEventsProvider.MessageSendEventsProviderInterface): ChannelMessageHandler {
                    const impl_holder: LDKChannelMessageHandlerHolder = new LDKChannelMessageHandlerHolder();
                    let structImplementation = <bindings.LDKChannelMessageHandler>{
                        // todo: in-line interface filling
                        handle_open_channel (their_node_id: Uint8Array, their_features: number, msg: number): void {
							const their_features_hu_conv: InitFeatures = new InitFeatures(null, their_features);
				their_features_hu_conv.ptrs_to.add(this);
							const msg_hu_conv: OpenChannel = new OpenChannel(null, msg);
							arg.handle_open_channel(their_node_id, their_features_hu_conv, msg_hu_conv);
						},

						handle_accept_channel (their_node_id: Uint8Array, their_features: number, msg: number): void {
							const their_features_hu_conv: InitFeatures = new InitFeatures(null, their_features);
				their_features_hu_conv.ptrs_to.add(this);
							const msg_hu_conv: AcceptChannel = new AcceptChannel(null, msg);
							arg.handle_accept_channel(their_node_id, their_features_hu_conv, msg_hu_conv);
						},

						handle_funding_created (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: FundingCreated = new FundingCreated(null, msg);
							arg.handle_funding_created(their_node_id, msg_hu_conv);
						},

						handle_funding_signed (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: FundingSigned = new FundingSigned(null, msg);
							arg.handle_funding_signed(their_node_id, msg_hu_conv);
						},

						handle_funding_locked (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: FundingLocked = new FundingLocked(null, msg);
							arg.handle_funding_locked(their_node_id, msg_hu_conv);
						},

						handle_shutdown (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: Shutdown = new Shutdown(null, msg);
							arg.handle_shutdown(their_node_id, msg_hu_conv);
						},

						handle_closing_signed (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: ClosingSigned = new ClosingSigned(null, msg);
							arg.handle_closing_signed(their_node_id, msg_hu_conv);
						},

						handle_update_add_htlc (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, msg);
							arg.handle_update_add_htlc(their_node_id, msg_hu_conv);
						},

						handle_update_fulfill_htlc (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, msg);
							arg.handle_update_fulfill_htlc(their_node_id, msg_hu_conv);
						},

						handle_update_fail_htlc (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: UpdateFailHTLC = new UpdateFailHTLC(null, msg);
							arg.handle_update_fail_htlc(their_node_id, msg_hu_conv);
						},

						handle_update_fail_malformed_htlc (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: UpdateFailMalformedHTLC = new UpdateFailMalformedHTLC(null, msg);
							arg.handle_update_fail_malformed_htlc(their_node_id, msg_hu_conv);
						},

						handle_commitment_signed (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: CommitmentSigned = new CommitmentSigned(null, msg);
							arg.handle_commitment_signed(their_node_id, msg_hu_conv);
						},

						handle_revoke_and_ack (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: RevokeAndACK = new RevokeAndACK(null, msg);
							arg.handle_revoke_and_ack(their_node_id, msg_hu_conv);
						},

						handle_update_fee (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: UpdateFee = new UpdateFee(null, msg);
							arg.handle_update_fee(their_node_id, msg_hu_conv);
						},

						handle_announcement_signatures (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, msg);
							arg.handle_announcement_signatures(their_node_id, msg_hu_conv);
						},

						peer_disconnected (their_node_id: Uint8Array, no_connection_possible: boolean): void {
							arg.peer_disconnected(their_node_id, no_connection_possible);
						},

						peer_connected (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: Init = new Init(null, msg);
							arg.peer_connected(their_node_id, msg_hu_conv);
						},

						handle_channel_reestablish (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: ChannelReestablish = new ChannelReestablish(null, msg);
							arg.handle_channel_reestablish(their_node_id, msg_hu_conv);
						},

						handle_error (their_node_id: Uint8Array, msg: number): void {
							const msg_hu_conv: ErrorMessage = new ErrorMessage(null, msg);
							arg.handle_error(their_node_id, msg_hu_conv);
						},

						
                    };
                    impl_holder.held = new ChannelMessageHandler (null, structImplementation, MessageSendEventsProvider.new_impl(MessageSendEventsProvider_impl).bindings_instance);
                }
            }

            export interface ChannelMessageHandlerInterface {
                handle_open_channel(their_node_id: Uint8Array, their_features: InitFeatures, msg: OpenChannel): void;
				handle_accept_channel(their_node_id: Uint8Array, their_features: InitFeatures, msg: AcceptChannel): void;
				handle_funding_created(their_node_id: Uint8Array, msg: FundingCreated): void;
				handle_funding_signed(their_node_id: Uint8Array, msg: FundingSigned): void;
				handle_funding_locked(their_node_id: Uint8Array, msg: FundingLocked): void;
				handle_shutdown(their_node_id: Uint8Array, msg: Shutdown): void;
				handle_closing_signed(their_node_id: Uint8Array, msg: ClosingSigned): void;
				handle_update_add_htlc(their_node_id: Uint8Array, msg: UpdateAddHTLC): void;
				handle_update_fulfill_htlc(their_node_id: Uint8Array, msg: UpdateFulfillHTLC): void;
				handle_update_fail_htlc(their_node_id: Uint8Array, msg: UpdateFailHTLC): void;
				handle_update_fail_malformed_htlc(their_node_id: Uint8Array, msg: UpdateFailMalformedHTLC): void;
				handle_commitment_signed(their_node_id: Uint8Array, msg: CommitmentSigned): void;
				handle_revoke_and_ack(their_node_id: Uint8Array, msg: RevokeAndACK): void;
				handle_update_fee(their_node_id: Uint8Array, msg: UpdateFee): void;
				handle_announcement_signatures(their_node_id: Uint8Array, msg: AnnouncementSignatures): void;
				peer_disconnected(their_node_id: Uint8Array, no_connection_possible: boolean): void;
				peer_connected(their_node_id: Uint8Array, msg: Init): void;
				handle_channel_reestablish(their_node_id: Uint8Array, msg: ChannelReestablish): void;
				handle_error(their_node_id: Uint8Array, msg: ErrorMessage): void;
				
            }

            class LDKChannelMessageHandlerHolder {
                held: ChannelMessageHandler;
            }
	public void handle_open_channel(Uint8Array their_node_id, InitFeatures their_features, OpenChannel msg) {
		bindings.ChannelMessageHandler_handle_open_channel(this.ptr, their_node_id, their_features == null ? 0 : their_features.ptr & ~1, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(their_features);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, their_features is reset to null and is now a dummy object.
		their_features.ptr = 0;
		this.ptrs_to.add(msg);
	}

	public void handle_accept_channel(Uint8Array their_node_id, InitFeatures their_features, AcceptChannel msg) {
		bindings.ChannelMessageHandler_handle_accept_channel(this.ptr, their_node_id, their_features == null ? 0 : their_features.ptr & ~1, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(their_features);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, their_features is reset to null and is now a dummy object.
		their_features.ptr = 0;
		this.ptrs_to.add(msg);
	}

	public void handle_funding_created(Uint8Array their_node_id, FundingCreated msg) {
		bindings.ChannelMessageHandler_handle_funding_created(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_funding_signed(Uint8Array their_node_id, FundingSigned msg) {
		bindings.ChannelMessageHandler_handle_funding_signed(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_funding_locked(Uint8Array their_node_id, FundingLocked msg) {
		bindings.ChannelMessageHandler_handle_funding_locked(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_shutdown(Uint8Array their_node_id, Shutdown msg) {
		bindings.ChannelMessageHandler_handle_shutdown(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_closing_signed(Uint8Array their_node_id, ClosingSigned msg) {
		bindings.ChannelMessageHandler_handle_closing_signed(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_add_htlc(Uint8Array their_node_id, UpdateAddHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_add_htlc(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_fulfill_htlc(Uint8Array their_node_id, UpdateFulfillHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fulfill_htlc(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_fail_htlc(Uint8Array their_node_id, UpdateFailHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_htlc(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_fail_malformed_htlc(Uint8Array their_node_id, UpdateFailMalformedHTLC msg) {
		bindings.ChannelMessageHandler_handle_update_fail_malformed_htlc(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_commitment_signed(Uint8Array their_node_id, CommitmentSigned msg) {
		bindings.ChannelMessageHandler_handle_commitment_signed(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_revoke_and_ack(Uint8Array their_node_id, RevokeAndACK msg) {
		bindings.ChannelMessageHandler_handle_revoke_and_ack(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_update_fee(Uint8Array their_node_id, UpdateFee msg) {
		bindings.ChannelMessageHandler_handle_update_fee(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_announcement_signatures(Uint8Array their_node_id, AnnouncementSignatures msg) {
		bindings.ChannelMessageHandler_handle_announcement_signatures(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void peer_disconnected(Uint8Array their_node_id, boolean no_connection_possible) {
		bindings.ChannelMessageHandler_peer_disconnected(this.ptr, their_node_id, no_connection_possible);
	}

	public void peer_connected(Uint8Array their_node_id, Init msg) {
		bindings.ChannelMessageHandler_peer_connected(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_channel_reestablish(Uint8Array their_node_id, ChannelReestablish msg) {
		bindings.ChannelMessageHandler_handle_channel_reestablish(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

	public void handle_error(Uint8Array their_node_id, ErrorMessage msg) {
		bindings.ChannelMessageHandler_handle_error(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		this.ptrs_to.add(msg);
	}

}
