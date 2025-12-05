

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of ChannelMessageHandler */
export interface ChannelMessageHandlerInterface {
	/**Handle an incoming `open_channel` message from the given peer.
	 */
	handle_open_channel(their_node_id: Uint8Array, msg: OpenChannel): void;
	/**Handle an incoming `open_channel2` message from the given peer.
	 */
	handle_open_channel_v2(their_node_id: Uint8Array, msg: OpenChannelV2): void;
	/**Handle an incoming `accept_channel` message from the given peer.
	 */
	handle_accept_channel(their_node_id: Uint8Array, msg: AcceptChannel): void;
	/**Handle an incoming `accept_channel2` message from the given peer.
	 */
	handle_accept_channel_v2(their_node_id: Uint8Array, msg: AcceptChannelV2): void;
	/**Handle an incoming `funding_created` message from the given peer.
	 */
	handle_funding_created(their_node_id: Uint8Array, msg: FundingCreated): void;
	/**Handle an incoming `funding_signed` message from the given peer.
	 */
	handle_funding_signed(their_node_id: Uint8Array, msg: FundingSigned): void;
	/**Handle an incoming `channel_ready` message from the given peer.
	 */
	handle_channel_ready(their_node_id: Uint8Array, msg: ChannelReady): void;
	/**Handle an incoming `peer_storage` message from the given peer.
	 */
	handle_peer_storage(their_node_id: Uint8Array, msg: PeerStorage): void;
	/**Handle an incoming `peer_storage_retrieval` message from the given peer.
	 */
	handle_peer_storage_retrieval(their_node_id: Uint8Array, msg: PeerStorageRetrieval): void;
	/**Handle an incoming `shutdown` message from the given peer.
	 */
	handle_shutdown(their_node_id: Uint8Array, msg: Shutdown): void;
	/**Handle an incoming `closing_signed` message from the given peer.
	 */
	handle_closing_signed(their_node_id: Uint8Array, msg: ClosingSigned): void;
	/**Handle an incoming `stfu` message from the given peer.
	 */
	handle_stfu(their_node_id: Uint8Array, msg: Stfu): void;
	/**Handle an incoming `splice_init` message from the given peer.
	 */
	handle_splice_init(their_node_id: Uint8Array, msg: SpliceInit): void;
	/**Handle an incoming `splice_ack` message from the given peer.
	 */
	handle_splice_ack(their_node_id: Uint8Array, msg: SpliceAck): void;
	/**Handle an incoming `splice_locked` message from the given peer.
	 */
	handle_splice_locked(their_node_id: Uint8Array, msg: SpliceLocked): void;
	/**Handle an incoming `tx_add_input message` from the given peer.
	 */
	handle_tx_add_input(their_node_id: Uint8Array, msg: TxAddInput): void;
	/**Handle an incoming `tx_add_output` message from the given peer.
	 */
	handle_tx_add_output(their_node_id: Uint8Array, msg: TxAddOutput): void;
	/**Handle an incoming `tx_remove_input` message from the given peer.
	 */
	handle_tx_remove_input(their_node_id: Uint8Array, msg: TxRemoveInput): void;
	/**Handle an incoming `tx_remove_output` message from the given peer.
	 */
	handle_tx_remove_output(their_node_id: Uint8Array, msg: TxRemoveOutput): void;
	/**Handle an incoming `tx_complete message` from the given peer.
	 */
	handle_tx_complete(their_node_id: Uint8Array, msg: TxComplete): void;
	/**Handle an incoming `tx_signatures` message from the given peer.
	 */
	handle_tx_signatures(their_node_id: Uint8Array, msg: TxSignatures): void;
	/**Handle an incoming `tx_init_rbf` message from the given peer.
	 */
	handle_tx_init_rbf(their_node_id: Uint8Array, msg: TxInitRbf): void;
	/**Handle an incoming `tx_ack_rbf` message from the given peer.
	 */
	handle_tx_ack_rbf(their_node_id: Uint8Array, msg: TxAckRbf): void;
	/**Handle an incoming `tx_abort message` from the given peer.
	 */
	handle_tx_abort(their_node_id: Uint8Array, msg: TxAbort): void;
	/**Handle an incoming `update_add_htlc` message from the given peer.
	 */
	handle_update_add_htlc(their_node_id: Uint8Array, msg: UpdateAddHTLC): void;
	/**Handle an incoming `update_fulfill_htlc` message from the given peer.
	 */
	handle_update_fulfill_htlc(their_node_id: Uint8Array, msg: UpdateFulfillHTLC): void;
	/**Handle an incoming `update_fail_htlc` message from the given peer.
	 */
	handle_update_fail_htlc(their_node_id: Uint8Array, msg: UpdateFailHTLC): void;
	/**Handle an incoming `update_fail_malformed_htlc` message from the given peer.
	 */
	handle_update_fail_malformed_htlc(their_node_id: Uint8Array, msg: UpdateFailMalformedHTLC): void;
	/**Handle an incoming `commitment_signed` message from the given peer.
	 */
	handle_commitment_signed(their_node_id: Uint8Array, msg: CommitmentSigned): void;
	/**Handle a batch of incoming `commitment_signed` message from the given peer.
	 */
	handle_commitment_signed_batch(their_node_id: Uint8Array, channel_id: ChannelId, batch: CommitmentSigned[]): void;
	/**Handle an incoming `revoke_and_ack` message from the given peer.
	 */
	handle_revoke_and_ack(their_node_id: Uint8Array, msg: RevokeAndACK): void;
	/**Handle an incoming `update_fee` message from the given peer.
	 */
	handle_update_fee(their_node_id: Uint8Array, msg: UpdateFee): void;
	/**Handle an incoming `announcement_signatures` message from the given peer.
	 */
	handle_announcement_signatures(their_node_id: Uint8Array, msg: AnnouncementSignatures): void;
	/**Handle an incoming `channel_reestablish` message from the given peer.
	 */
	handle_channel_reestablish(their_node_id: Uint8Array, msg: ChannelReestablish): void;
	/**Handle an incoming `channel_update` message from the given peer.
	 */
	handle_channel_update(their_node_id: Uint8Array, msg: ChannelUpdate): void;
	/**Handle an incoming `error` message from the given peer.
	 */
	handle_error(their_node_id: Uint8Array, msg: ErrorMessage): void;
	/**Gets the chain hashes for this `ChannelMessageHandler` indicating which chains it supports.
	 * 
	 * If it's `None`, then no particular network chain hash compatibility will be enforced when
	 * connecting to peers.
	 */
	get_chain_hashes(): Option_CVec_ThirtyTwoBytesZZ;
	/**Indicates that a message was received from any peer for any handler.
	 * Called before the message is passed to the appropriate handler.
	 * Useful for indicating that a network connection is active.
	 * 
	 * Note: Since this function is called frequently, it should be as
	 * efficient as possible for its intended purpose.
	 */
	message_received(): void;
}

class LDKChannelMessageHandlerHolder {
	held: ChannelMessageHandler|null = null;
}

/**
 * A trait to describe an object which can receive channel messages.
 * 
 * Messages MAY be called in parallel when they originate from different `their_node_ids`, however
 * they MUST NOT be called in parallel when the two calls have the same `their_node_id`.
 */
export class ChannelMessageHandler extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKChannelMessageHandler|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelMessageHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of ChannelMessageHandler from a given implementation */
	public static new_impl(arg: ChannelMessageHandlerInterface, baseMessageHandler_impl: BaseMessageHandlerInterface): ChannelMessageHandler {
		const impl_holder: LDKChannelMessageHandlerHolder = new LDKChannelMessageHandlerHolder();
		let structImplementation = {
			handle_open_channel (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: OpenChannel = new OpenChannel(null, msg);
				arg.handle_open_channel(their_node_id_conv, msg_hu_conv);
			},
			handle_open_channel_v2 (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: OpenChannelV2 = new OpenChannelV2(null, msg);
				arg.handle_open_channel_v2(their_node_id_conv, msg_hu_conv);
			},
			handle_accept_channel (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: AcceptChannel = new AcceptChannel(null, msg);
				arg.handle_accept_channel(their_node_id_conv, msg_hu_conv);
			},
			handle_accept_channel_v2 (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: AcceptChannelV2 = new AcceptChannelV2(null, msg);
				arg.handle_accept_channel_v2(their_node_id_conv, msg_hu_conv);
			},
			handle_funding_created (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: FundingCreated = new FundingCreated(null, msg);
				arg.handle_funding_created(their_node_id_conv, msg_hu_conv);
			},
			handle_funding_signed (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: FundingSigned = new FundingSigned(null, msg);
				arg.handle_funding_signed(their_node_id_conv, msg_hu_conv);
			},
			handle_channel_ready (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: ChannelReady = new ChannelReady(null, msg);
				arg.handle_channel_ready(their_node_id_conv, msg_hu_conv);
			},
			handle_peer_storage (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: PeerStorage = new PeerStorage(null, msg);
				CommonBase.add_ref_from(msg_hu_conv, this);
				arg.handle_peer_storage(their_node_id_conv, msg_hu_conv);
			},
			handle_peer_storage_retrieval (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: PeerStorageRetrieval = new PeerStorageRetrieval(null, msg);
				CommonBase.add_ref_from(msg_hu_conv, this);
				arg.handle_peer_storage_retrieval(their_node_id_conv, msg_hu_conv);
			},
			handle_shutdown (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: Shutdown = new Shutdown(null, msg);
				arg.handle_shutdown(their_node_id_conv, msg_hu_conv);
			},
			handle_closing_signed (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: ClosingSigned = new ClosingSigned(null, msg);
				arg.handle_closing_signed(their_node_id_conv, msg_hu_conv);
			},
			handle_stfu (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: Stfu = new Stfu(null, msg);
				arg.handle_stfu(their_node_id_conv, msg_hu_conv);
			},
			handle_splice_init (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: SpliceInit = new SpliceInit(null, msg);
				arg.handle_splice_init(their_node_id_conv, msg_hu_conv);
			},
			handle_splice_ack (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: SpliceAck = new SpliceAck(null, msg);
				arg.handle_splice_ack(their_node_id_conv, msg_hu_conv);
			},
			handle_splice_locked (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: SpliceLocked = new SpliceLocked(null, msg);
				arg.handle_splice_locked(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_add_input (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxAddInput = new TxAddInput(null, msg);
				arg.handle_tx_add_input(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_add_output (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxAddOutput = new TxAddOutput(null, msg);
				arg.handle_tx_add_output(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_remove_input (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxRemoveInput = new TxRemoveInput(null, msg);
				arg.handle_tx_remove_input(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_remove_output (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxRemoveOutput = new TxRemoveOutput(null, msg);
				arg.handle_tx_remove_output(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_complete (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxComplete = new TxComplete(null, msg);
				arg.handle_tx_complete(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_signatures (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxSignatures = new TxSignatures(null, msg);
				arg.handle_tx_signatures(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_init_rbf (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxInitRbf = new TxInitRbf(null, msg);
				arg.handle_tx_init_rbf(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_ack_rbf (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxAckRbf = new TxAckRbf(null, msg);
				arg.handle_tx_ack_rbf(their_node_id_conv, msg_hu_conv);
			},
			handle_tx_abort (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: TxAbort = new TxAbort(null, msg);
				arg.handle_tx_abort(their_node_id_conv, msg_hu_conv);
			},
			handle_update_add_htlc (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, msg);
				arg.handle_update_add_htlc(their_node_id_conv, msg_hu_conv);
			},
			handle_update_fulfill_htlc (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, msg);
				CommonBase.add_ref_from(msg_hu_conv, this);
				arg.handle_update_fulfill_htlc(their_node_id_conv, msg_hu_conv);
			},
			handle_update_fail_htlc (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: UpdateFailHTLC = new UpdateFailHTLC(null, msg);
				arg.handle_update_fail_htlc(their_node_id_conv, msg_hu_conv);
			},
			handle_update_fail_malformed_htlc (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: UpdateFailMalformedHTLC = new UpdateFailMalformedHTLC(null, msg);
				arg.handle_update_fail_malformed_htlc(their_node_id_conv, msg_hu_conv);
			},
			handle_commitment_signed (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: CommitmentSigned = new CommitmentSigned(null, msg);
				arg.handle_commitment_signed(their_node_id_conv, msg_hu_conv);
			},
			handle_commitment_signed_batch (their_node_id: number, channel_id: bigint, batch: number): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
				CommonBase.add_ref_from(channel_id_hu_conv, this);
				const batch_conv_18_len: number = bindings.getArrayLength(batch);
				const batch_conv_18_arr: CommitmentSigned[] = new Array(batch_conv_18_len).fill(null);
				for (var s = 0; s < batch_conv_18_len; s++) {
					const batch_conv_18: bigint = bindings.getU64ArrayElem(batch, s);
					const batch_conv_18_hu_conv: CommitmentSigned = new CommitmentSigned(null, batch_conv_18);
					CommonBase.add_ref_from(batch_conv_18_hu_conv, this);
					batch_conv_18_arr[s] = batch_conv_18_hu_conv;
				}
				bindings.freeWasmMemory(batch)
				arg.handle_commitment_signed_batch(their_node_id_conv, channel_id_hu_conv, batch_conv_18_arr);
			},
			handle_revoke_and_ack (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: RevokeAndACK = new RevokeAndACK(null, msg);
				arg.handle_revoke_and_ack(their_node_id_conv, msg_hu_conv);
			},
			handle_update_fee (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: UpdateFee = new UpdateFee(null, msg);
				arg.handle_update_fee(their_node_id_conv, msg_hu_conv);
			},
			handle_announcement_signatures (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, msg);
				arg.handle_announcement_signatures(their_node_id_conv, msg_hu_conv);
			},
			handle_channel_reestablish (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: ChannelReestablish = new ChannelReestablish(null, msg);
				arg.handle_channel_reestablish(their_node_id_conv, msg_hu_conv);
			},
			handle_channel_update (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: ChannelUpdate = new ChannelUpdate(null, msg);
				arg.handle_channel_update(their_node_id_conv, msg_hu_conv);
			},
			handle_error (their_node_id: number, msg: bigint): void {
				const their_node_id_conv: Uint8Array = bindings.decodeUint8Array(their_node_id);
				const msg_hu_conv: ErrorMessage = new ErrorMessage(null, msg);
				arg.handle_error(their_node_id_conv, msg_hu_conv);
			},
			get_chain_hashes (): bigint {
				const ret: Option_CVec_ThirtyTwoBytesZZ = arg.get_chain_hashes();
				const result: bigint = ret.clone_ptr();
				return result;
			},
			message_received (): void {
				arg.message_received();
			},
		} as bindings.LDKChannelMessageHandler;
		const baseMessageHandler = BaseMessageHandler.new_impl(baseMessageHandler_impl);
		const ptr_idx: [bigint, number] = bindings.LDKChannelMessageHandler_new(structImplementation, baseMessageHandler.instance_idx!);

		impl_holder.held = new ChannelMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(baseMessageHandler);
		return impl_holder.held!;
	}

	/**
	 * Handle an incoming `open_channel` message from the given peer.
	 */
	public handle_open_channel(their_node_id: Uint8Array, msg: OpenChannel): void {
		bindings.ChannelMessageHandler_handle_open_channel(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `open_channel2` message from the given peer.
	 */
	public handle_open_channel_v2(their_node_id: Uint8Array, msg: OpenChannelV2): void {
		bindings.ChannelMessageHandler_handle_open_channel_v2(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `accept_channel` message from the given peer.
	 */
	public handle_accept_channel(their_node_id: Uint8Array, msg: AcceptChannel): void {
		bindings.ChannelMessageHandler_handle_accept_channel(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `accept_channel2` message from the given peer.
	 */
	public handle_accept_channel_v2(their_node_id: Uint8Array, msg: AcceptChannelV2): void {
		bindings.ChannelMessageHandler_handle_accept_channel_v2(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `funding_created` message from the given peer.
	 */
	public handle_funding_created(their_node_id: Uint8Array, msg: FundingCreated): void {
		bindings.ChannelMessageHandler_handle_funding_created(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `funding_signed` message from the given peer.
	 */
	public handle_funding_signed(their_node_id: Uint8Array, msg: FundingSigned): void {
		bindings.ChannelMessageHandler_handle_funding_signed(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `channel_ready` message from the given peer.
	 */
	public handle_channel_ready(their_node_id: Uint8Array, msg: ChannelReady): void {
		bindings.ChannelMessageHandler_handle_channel_ready(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `peer_storage` message from the given peer.
	 */
	public handle_peer_storage(their_node_id: Uint8Array, msg: PeerStorage): void {
		bindings.ChannelMessageHandler_handle_peer_storage(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `peer_storage_retrieval` message from the given peer.
	 */
	public handle_peer_storage_retrieval(their_node_id: Uint8Array, msg: PeerStorageRetrieval): void {
		bindings.ChannelMessageHandler_handle_peer_storage_retrieval(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `shutdown` message from the given peer.
	 */
	public handle_shutdown(their_node_id: Uint8Array, msg: Shutdown): void {
		bindings.ChannelMessageHandler_handle_shutdown(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `closing_signed` message from the given peer.
	 */
	public handle_closing_signed(their_node_id: Uint8Array, msg: ClosingSigned): void {
		bindings.ChannelMessageHandler_handle_closing_signed(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `stfu` message from the given peer.
	 */
	public handle_stfu(their_node_id: Uint8Array, msg: Stfu): void {
		bindings.ChannelMessageHandler_handle_stfu(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `splice_init` message from the given peer.
	 */
	public handle_splice_init(their_node_id: Uint8Array, msg: SpliceInit): void {
		bindings.ChannelMessageHandler_handle_splice_init(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `splice_ack` message from the given peer.
	 */
	public handle_splice_ack(their_node_id: Uint8Array, msg: SpliceAck): void {
		bindings.ChannelMessageHandler_handle_splice_ack(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `splice_locked` message from the given peer.
	 */
	public handle_splice_locked(their_node_id: Uint8Array, msg: SpliceLocked): void {
		bindings.ChannelMessageHandler_handle_splice_locked(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_add_input message` from the given peer.
	 */
	public handle_tx_add_input(their_node_id: Uint8Array, msg: TxAddInput): void {
		bindings.ChannelMessageHandler_handle_tx_add_input(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_add_output` message from the given peer.
	 */
	public handle_tx_add_output(their_node_id: Uint8Array, msg: TxAddOutput): void {
		bindings.ChannelMessageHandler_handle_tx_add_output(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_remove_input` message from the given peer.
	 */
	public handle_tx_remove_input(their_node_id: Uint8Array, msg: TxRemoveInput): void {
		bindings.ChannelMessageHandler_handle_tx_remove_input(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_remove_output` message from the given peer.
	 */
	public handle_tx_remove_output(their_node_id: Uint8Array, msg: TxRemoveOutput): void {
		bindings.ChannelMessageHandler_handle_tx_remove_output(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_complete message` from the given peer.
	 */
	public handle_tx_complete(their_node_id: Uint8Array, msg: TxComplete): void {
		bindings.ChannelMessageHandler_handle_tx_complete(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_signatures` message from the given peer.
	 */
	public handle_tx_signatures(their_node_id: Uint8Array, msg: TxSignatures): void {
		bindings.ChannelMessageHandler_handle_tx_signatures(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_init_rbf` message from the given peer.
	 */
	public handle_tx_init_rbf(their_node_id: Uint8Array, msg: TxInitRbf): void {
		bindings.ChannelMessageHandler_handle_tx_init_rbf(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_ack_rbf` message from the given peer.
	 */
	public handle_tx_ack_rbf(their_node_id: Uint8Array, msg: TxAckRbf): void {
		bindings.ChannelMessageHandler_handle_tx_ack_rbf(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `tx_abort message` from the given peer.
	 */
	public handle_tx_abort(their_node_id: Uint8Array, msg: TxAbort): void {
		bindings.ChannelMessageHandler_handle_tx_abort(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `update_add_htlc` message from the given peer.
	 */
	public handle_update_add_htlc(their_node_id: Uint8Array, msg: UpdateAddHTLC): void {
		bindings.ChannelMessageHandler_handle_update_add_htlc(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `update_fulfill_htlc` message from the given peer.
	 */
	public handle_update_fulfill_htlc(their_node_id: Uint8Array, msg: UpdateFulfillHTLC): void {
		bindings.ChannelMessageHandler_handle_update_fulfill_htlc(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `update_fail_htlc` message from the given peer.
	 */
	public handle_update_fail_htlc(their_node_id: Uint8Array, msg: UpdateFailHTLC): void {
		bindings.ChannelMessageHandler_handle_update_fail_htlc(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `update_fail_malformed_htlc` message from the given peer.
	 */
	public handle_update_fail_malformed_htlc(their_node_id: Uint8Array, msg: UpdateFailMalformedHTLC): void {
		bindings.ChannelMessageHandler_handle_update_fail_malformed_htlc(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `commitment_signed` message from the given peer.
	 */
	public handle_commitment_signed(their_node_id: Uint8Array, msg: CommitmentSigned): void {
		bindings.ChannelMessageHandler_handle_commitment_signed(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle a batch of incoming `commitment_signed` message from the given peer.
	 */
	public handle_commitment_signed_batch(their_node_id: Uint8Array, channel_id: ChannelId, batch: CommitmentSigned[]): void {
		bindings.ChannelMessageHandler_handle_commitment_signed_batch(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(channel_id), bindings.encodeUint64Array(batch.map(batch_conv_18 => CommonBase.get_ptr_of(batch_conv_18))));
	}

	/**
	 * Handle an incoming `revoke_and_ack` message from the given peer.
	 */
	public handle_revoke_and_ack(their_node_id: Uint8Array, msg: RevokeAndACK): void {
		bindings.ChannelMessageHandler_handle_revoke_and_ack(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `update_fee` message from the given peer.
	 */
	public handle_update_fee(their_node_id: Uint8Array, msg: UpdateFee): void {
		bindings.ChannelMessageHandler_handle_update_fee(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `announcement_signatures` message from the given peer.
	 */
	public handle_announcement_signatures(their_node_id: Uint8Array, msg: AnnouncementSignatures): void {
		bindings.ChannelMessageHandler_handle_announcement_signatures(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `channel_reestablish` message from the given peer.
	 */
	public handle_channel_reestablish(their_node_id: Uint8Array, msg: ChannelReestablish): void {
		bindings.ChannelMessageHandler_handle_channel_reestablish(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `channel_update` message from the given peer.
	 */
	public handle_channel_update(their_node_id: Uint8Array, msg: ChannelUpdate): void {
		bindings.ChannelMessageHandler_handle_channel_update(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Handle an incoming `error` message from the given peer.
	 */
	public handle_error(their_node_id: Uint8Array, msg: ErrorMessage): void {
		bindings.ChannelMessageHandler_handle_error(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Gets the chain hashes for this `ChannelMessageHandler` indicating which chains it supports.
	 * 
	 * If it's `None`, then no particular network chain hash compatibility will be enforced when
	 * connecting to peers.
	 */
	public get_chain_hashes(): Option_CVec_ThirtyTwoBytesZZ {
		const ret: bigint = bindings.ChannelMessageHandler_get_chain_hashes(this.ptr);
		const ret_hu_conv: Option_CVec_ThirtyTwoBytesZZ = Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Indicates that a message was received from any peer for any handler.
	 * Called before the message is passed to the appropriate handler.
	 * Useful for indicating that a network connection is active.
	 * 
	 * Note: Since this function is called frequently, it should be as
	 * efficient as possible for its intended purpose.
	 */
	public message_received(): void {
		bindings.ChannelMessageHandler_message_received(this.ptr);
	}

}
