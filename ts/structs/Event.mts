
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An Event which you should probably take some action in response to.
 * 
 * Note that while Writeable and Readable are implemented for Event, you probably shouldn't use
 * them directly as they don't round-trip exactly (for example FundingGenerationReady is never
 * written as it makes no sense to respond to it after reconnecting to peers).
 */
export class Event extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Event_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Event {
		const raw_ty: number = bindings.LDKEvent_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Event_FundingGenerationReady(ptr);
			case 1: return new Event_FundingTxBroadcastSafe(ptr);
			case 2: return new Event_PaymentClaimable(ptr);
			case 3: return new Event_PaymentClaimed(ptr);
			case 4: return new Event_ConnectionNeeded(ptr);
			case 5: return new Event_InvoiceReceived(ptr);
			case 6: return new Event_PaymentSent(ptr);
			case 7: return new Event_PaymentFailed(ptr);
			case 8: return new Event_PaymentPathSuccessful(ptr);
			case 9: return new Event_PaymentPathFailed(ptr);
			case 10: return new Event_ProbeSuccessful(ptr);
			case 11: return new Event_ProbeFailed(ptr);
			case 12: return new Event_HTLCIntercepted(ptr);
			case 13: return new Event_SpendableOutputs(ptr);
			case 14: return new Event_PaymentForwarded(ptr);
			case 15: return new Event_ChannelPending(ptr);
			case 16: return new Event_ChannelReady(ptr);
			case 17: return new Event_ChannelClosed(ptr);
			case 18: return new Event_SplicePending(ptr);
			case 19: return new Event_SpliceFailed(ptr);
			case 20: return new Event_DiscardFunding(ptr);
			case 21: return new Event_OpenChannelRequest(ptr);
			case 22: return new Event_HTLCHandlingFailed(ptr);
			case 23: return new Event_BumpTransaction(ptr);
			case 24: return new Event_OnionMessageIntercepted(ptr);
			case 25: return new Event_OnionMessagePeerConnected(ptr);
			case 26: return new Event_PersistStaticInvoice(ptr);
			case 27: return new Event_StaticInvoiceRequested(ptr);
			case 28: return new Event_FundingTransactionReadyForSigning(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Event_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Event
	 */
	public clone(): Event {
		const ret: bigint = bindings.Event_clone(this.ptr);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingGenerationReady-variant Event
	 */
	public static constructor_funding_generation_ready(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, channel_value_satoshis: bigint, output_script: Uint8Array, user_channel_id: bigint): Event {
		const ret: bigint = bindings.Event_funding_generation_ready(CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), channel_value_satoshis, bindings.encodeUint8Array(output_script), bindings.encodeUint128(user_channel_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingTxBroadcastSafe-variant Event
	 */
	public static constructor_funding_tx_broadcast_safe(channel_id: ChannelId, user_channel_id: bigint, funding_txo: OutPoint, counterparty_node_id: Uint8Array, former_temporary_channel_id: ChannelId): Event {
		const ret: bigint = bindings.Event_funding_tx_broadcast_safe(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), CommonBase.get_ptr_of(funding_txo), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(former_temporary_channel_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimable-variant Event
	 */
	public static constructor_payment_claimable(receiver_node_id: Uint8Array, payment_hash: Uint8Array, onion_fields: RecipientOnionFields, amount_msat: bigint, counterparty_skimmed_fee_msat: bigint, purpose: PaymentPurpose, receiving_channel_ids: TwoTuple_ChannelIdCOption_U128ZZ[], claim_deadline: Option_u32Z, payment_id: Option_ThirtyTwoBytesZ): Event {
		const ret: bigint = bindings.Event_payment_claimable(bindings.encodeUint8Array(receiver_node_id), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(onion_fields), amount_msat, counterparty_skimmed_fee_msat, CommonBase.get_ptr_of(purpose), bindings.encodeUint64Array(receiving_channel_ids.map(receiving_channel_ids_conv_34 => CommonBase.get_ptr_of(receiving_channel_ids_conv_34))), CommonBase.get_ptr_of(claim_deadline), CommonBase.get_ptr_of(payment_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimed-variant Event
	 */
	public static constructor_payment_claimed(receiver_node_id: Uint8Array, payment_hash: Uint8Array, amount_msat: bigint, purpose: PaymentPurpose, htlcs: ClaimedHTLC[], sender_intended_total_msat: Option_u64Z, onion_fields: RecipientOnionFields, payment_id: Option_ThirtyTwoBytesZ): Event {
		const ret: bigint = bindings.Event_payment_claimed(bindings.encodeUint8Array(receiver_node_id), bindings.encodeUint8Array(payment_hash), amount_msat, CommonBase.get_ptr_of(purpose), bindings.encodeUint64Array(htlcs.map(htlcs_conv_13 => CommonBase.get_ptr_of(htlcs_conv_13))), CommonBase.get_ptr_of(sender_intended_total_msat), CommonBase.get_ptr_of(onion_fields), CommonBase.get_ptr_of(payment_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ConnectionNeeded-variant Event
	 */
	public static constructor_connection_needed(node_id: Uint8Array, addresses: SocketAddress[]): Event {
		const ret: bigint = bindings.Event_connection_needed(bindings.encodeUint8Array(node_id), bindings.encodeUint64Array(addresses.map(addresses_conv_15 => CommonBase.get_ptr_of(addresses_conv_15))));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoiceReceived-variant Event
	 */
	public static constructor_invoice_received(payment_id: Uint8Array, invoice: Bolt12Invoice, context: Option_OffersContextZ, responder: Responder): Event {
		const ret: bigint = bindings.Event_invoice_received(bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(context), CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSent-variant Event
	 */
	public static constructor_payment_sent(payment_id: Option_ThirtyTwoBytesZ, payment_preimage: Uint8Array, payment_hash: Uint8Array, amount_msat: Option_u64Z, fee_paid_msat: Option_u64Z, bolt12_invoice: Option_PaidBolt12InvoiceZ): Event {
		const ret: bigint = bindings.Event_payment_sent(CommonBase.get_ptr_of(payment_id), bindings.encodeUint8Array(payment_preimage), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(amount_msat), CommonBase.get_ptr_of(fee_paid_msat), CommonBase.get_ptr_of(bolt12_invoice));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentFailed-variant Event
	 */
	public static constructor_payment_failed(payment_id: Uint8Array, payment_hash: Option_ThirtyTwoBytesZ, reason: Option_PaymentFailureReasonZ): Event {
		const ret: bigint = bindings.Event_payment_failed(bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(payment_hash), CommonBase.get_ptr_of(reason));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathSuccessful-variant Event
	 */
	public static constructor_payment_path_successful(payment_id: Uint8Array, payment_hash: Option_ThirtyTwoBytesZ, path: Path, hold_times: Uint32Array): Event {
		const ret: bigint = bindings.Event_payment_path_successful(bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(payment_hash), CommonBase.get_ptr_of(path), bindings.encodeUint32Array(hold_times));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathFailed-variant Event
	 */
	public static constructor_payment_path_failed(payment_id: Option_ThirtyTwoBytesZ, payment_hash: Uint8Array, payment_failed_permanently: boolean, failure: PathFailure, path: Path, short_channel_id: Option_u64Z, hold_times: Uint32Array): Event {
		const ret: bigint = bindings.Event_payment_path_failed(CommonBase.get_ptr_of(payment_id), bindings.encodeUint8Array(payment_hash), payment_failed_permanently, CommonBase.get_ptr_of(failure), CommonBase.get_ptr_of(path), CommonBase.get_ptr_of(short_channel_id), bindings.encodeUint32Array(hold_times));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProbeSuccessful-variant Event
	 */
	public static constructor_probe_successful(payment_id: Uint8Array, payment_hash: Uint8Array, path: Path): Event {
		const ret: bigint = bindings.Event_probe_successful(bindings.encodeUint8Array(payment_id), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(path));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProbeFailed-variant Event
	 */
	public static constructor_probe_failed(payment_id: Uint8Array, payment_hash: Uint8Array, path: Path, short_channel_id: Option_u64Z): Event {
		const ret: bigint = bindings.Event_probe_failed(bindings.encodeUint8Array(payment_id), bindings.encodeUint8Array(payment_hash), CommonBase.get_ptr_of(path), CommonBase.get_ptr_of(short_channel_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCIntercepted-variant Event
	 */
	public static constructor_htlcintercepted(intercept_id: Uint8Array, requested_next_hop_scid: bigint, payment_hash: Uint8Array, inbound_amount_msat: bigint, expected_outbound_amount_msat: bigint): Event {
		const ret: bigint = bindings.Event_htlcintercepted(bindings.encodeUint8Array(intercept_id), requested_next_hop_scid, bindings.encodeUint8Array(payment_hash), inbound_amount_msat, expected_outbound_amount_msat);
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpendableOutputs-variant Event
	 */
	public static constructor_spendable_outputs(outputs: SpendableOutputDescriptor[], channel_id: ChannelId): Event {
		const ret: bigint = bindings.Event_spendable_outputs(bindings.encodeUint64Array(outputs.map(outputs_conv_27 => CommonBase.get_ptr_of(outputs_conv_27))), CommonBase.get_ptr_of(channel_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentForwarded-variant Event
	 */
	public static constructor_payment_forwarded(prev_channel_id: ChannelId, next_channel_id: ChannelId, prev_user_channel_id: Option_U128Z, next_user_channel_id: Option_U128Z, prev_node_id: Uint8Array, next_node_id: Uint8Array, total_fee_earned_msat: Option_u64Z, skimmed_fee_msat: Option_u64Z, claim_from_onchain_tx: boolean, outbound_amount_forwarded_msat: Option_u64Z): Event {
		const ret: bigint = bindings.Event_payment_forwarded(CommonBase.get_ptr_of(prev_channel_id), CommonBase.get_ptr_of(next_channel_id), CommonBase.get_ptr_of(prev_user_channel_id), CommonBase.get_ptr_of(next_user_channel_id), bindings.encodeUint8Array(prev_node_id), bindings.encodeUint8Array(next_node_id), CommonBase.get_ptr_of(total_fee_earned_msat), CommonBase.get_ptr_of(skimmed_fee_msat), claim_from_onchain_tx, CommonBase.get_ptr_of(outbound_amount_forwarded_msat));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelPending-variant Event
	 */
	public static constructor_channel_pending(channel_id: ChannelId, user_channel_id: bigint, former_temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, funding_txo: OutPoint, channel_type: ChannelTypeFeatures, funding_redeem_script: Option_CVec_u8ZZ): Event {
		const ret: bigint = bindings.Event_channel_pending(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), CommonBase.get_ptr_of(former_temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(funding_txo), CommonBase.get_ptr_of(channel_type), CommonBase.get_ptr_of(funding_redeem_script));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelReady-variant Event
	 */
	public static constructor_channel_ready(channel_id: ChannelId, user_channel_id: bigint, counterparty_node_id: Uint8Array, funding_txo: Option_OutPointZ, channel_type: ChannelTypeFeatures): Event {
		const ret: bigint = bindings.Event_channel_ready(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(funding_txo), CommonBase.get_ptr_of(channel_type));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant Event
	 */
	public static constructor_channel_closed(channel_id: ChannelId, user_channel_id: bigint, reason: ClosureReason, counterparty_node_id: Uint8Array, channel_capacity_sats: Option_u64Z, channel_funding_txo: OutPoint, last_local_balance_msat: Option_u64Z): Event {
		const ret: bigint = bindings.Event_channel_closed(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), CommonBase.get_ptr_of(reason), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(channel_capacity_sats), CommonBase.get_ptr_of(channel_funding_txo), CommonBase.get_ptr_of(last_local_balance_msat));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SplicePending-variant Event
	 */
	public static constructor_splice_pending(channel_id: ChannelId, user_channel_id: bigint, counterparty_node_id: Uint8Array, new_funding_txo: OutPoint, channel_type: ChannelTypeFeatures, new_funding_redeem_script: Uint8Array): Event {
		const ret: bigint = bindings.Event_splice_pending(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(new_funding_txo), CommonBase.get_ptr_of(channel_type), bindings.encodeUint8Array(new_funding_redeem_script));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceFailed-variant Event
	 */
	public static constructor_splice_failed(channel_id: ChannelId, user_channel_id: bigint, counterparty_node_id: Uint8Array, abandoned_funding_txo: Option_OutPointZ, channel_type: ChannelTypeFeatures, contributed_inputs: OutPoint[], contributed_outputs: TxOut[]): Event {
		const ret: bigint = bindings.Event_splice_failed(CommonBase.get_ptr_of(channel_id), bindings.encodeUint128(user_channel_id), bindings.encodeUint8Array(counterparty_node_id), CommonBase.get_ptr_of(abandoned_funding_txo), CommonBase.get_ptr_of(channel_type), bindings.encodeUint64Array(contributed_inputs.map(contributed_inputs_conv_10 => CommonBase.get_ptr_of(contributed_inputs_conv_10))), bindings.encodeUint64Array(contributed_outputs.map(contributed_outputs_conv_7 => CommonBase.get_ptr_of(contributed_outputs_conv_7))));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DiscardFunding-variant Event
	 */
	public static constructor_discard_funding(channel_id: ChannelId, funding_info: FundingInfo): Event {
		const ret: bigint = bindings.Event_discard_funding(CommonBase.get_ptr_of(channel_id), CommonBase.get_ptr_of(funding_info));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OpenChannelRequest-variant Event
	 */
	public static constructor_open_channel_request(temporary_channel_id: ChannelId, counterparty_node_id: Uint8Array, funding_satoshis: bigint, channel_negotiation_type: InboundChannelFunds, channel_type: ChannelTypeFeatures, is_announced: boolean, params: ChannelParameters): Event {
		const ret: bigint = bindings.Event_open_channel_request(CommonBase.get_ptr_of(temporary_channel_id), bindings.encodeUint8Array(counterparty_node_id), funding_satoshis, CommonBase.get_ptr_of(channel_negotiation_type), CommonBase.get_ptr_of(channel_type), is_announced, CommonBase.get_ptr_of(params));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCHandlingFailed-variant Event
	 */
	public static constructor_htlchandling_failed(prev_channel_id: ChannelId, failure_type: HTLCHandlingFailureType, failure_reason: Option_HTLCHandlingFailureReasonZ): Event {
		const ret: bigint = bindings.Event_htlchandling_failed(CommonBase.get_ptr_of(prev_channel_id), CommonBase.get_ptr_of(failure_type), CommonBase.get_ptr_of(failure_reason));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BumpTransaction-variant Event
	 */
	public static constructor_bump_transaction(a: BumpTransactionEvent): Event {
		const ret: bigint = bindings.Event_bump_transaction(CommonBase.get_ptr_of(a));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionMessageIntercepted-variant Event
	 */
	public static constructor_onion_message_intercepted(peer_node_id: Uint8Array, message: OnionMessage): Event {
		const ret: bigint = bindings.Event_onion_message_intercepted(bindings.encodeUint8Array(peer_node_id), CommonBase.get_ptr_of(message));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionMessagePeerConnected-variant Event
	 */
	public static constructor_onion_message_peer_connected(peer_node_id: Uint8Array): Event {
		const ret: bigint = bindings.Event_onion_message_peer_connected(bindings.encodeUint8Array(peer_node_id));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PersistStaticInvoice-variant Event
	 */
	public static constructor_persist_static_invoice(invoice: StaticInvoice, invoice_request_path: BlindedMessagePath, invoice_slot: number, recipient_id: Uint8Array, invoice_persisted_path: Responder): Event {
		const ret: bigint = bindings.Event_persist_static_invoice(CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(invoice_request_path), invoice_slot, bindings.encodeUint8Array(recipient_id), CommonBase.get_ptr_of(invoice_persisted_path));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoiceRequested-variant Event
	 */
	public static constructor_static_invoice_requested(recipient_id: Uint8Array, invoice_slot: number, reply_path: Responder, invoice_request: InvoiceRequest): Event {
		const ret: bigint = bindings.Event_static_invoice_requested(bindings.encodeUint8Array(recipient_id), invoice_slot, CommonBase.get_ptr_of(reply_path), CommonBase.get_ptr_of(invoice_request));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingTransactionReadyForSigning-variant Event
	 */
	public static constructor_funding_transaction_ready_for_signing(channel_id: ChannelId, counterparty_node_id: Uint8Array, user_channel_id: bigint, unsigned_transaction: Uint8Array): Event {
		const ret: bigint = bindings.Event_funding_transaction_ready_for_signing(CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint128(user_channel_id), bindings.encodeUint8Array(unsigned_transaction));
		const ret_hu_conv: Event = Event.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Events contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Event): boolean {
		const ret: boolean = bindings.Event_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Event object into a byte array which can be read by Event_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Event_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A Event of type FundingGenerationReady */
export class Event_FundingGenerationReady extends Event {
	/**
	 * The random channel_id we picked which you'll need to pass into
	 * [`ChannelManager::funding_transaction_generated`].
	 * 
	 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
	 */
	public temporary_channel_id: ChannelId;
	/**
	 * The counterparty's node_id, which you'll need to pass back into
	 * [`ChannelManager::funding_transaction_generated`].
	 * 
	 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The value, in satoshis, that the output should have.
	 */
	public channel_value_satoshis: bigint;
	/**
	 * The script which should be used in the transaction output.
	 */
	public output_script: Uint8Array;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.  This may be zero for objects
	 * serialized with LDK versions prior to 0.0.113.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const temporary_channel_id: bigint = bindings.LDKEvent_FundingGenerationReady_get_temporary_channel_id(ptr);
		const temporary_channel_id_hu_conv: ChannelId = new ChannelId(null, temporary_channel_id);
			CommonBase.add_ref_from(temporary_channel_id_hu_conv, this);
		this.temporary_channel_id = temporary_channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_FundingGenerationReady_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		this.channel_value_satoshis = bindings.LDKEvent_FundingGenerationReady_get_channel_value_satoshis(ptr);
		const output_script: number = bindings.LDKEvent_FundingGenerationReady_get_output_script(ptr);
		const output_script_conv: Uint8Array = bindings.decodeUint8Array(output_script);
		this.output_script = output_script_conv;
		const user_channel_id: number = bindings.LDKEvent_FundingGenerationReady_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
	}
}
/** A Event of type FundingTxBroadcastSafe */
export class Event_FundingTxBroadcastSafe extends Event {
	/**
	 * The `channel_id` indicating which channel has reached this stage.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`].
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 */
	public user_channel_id: bigint;
	/**
	 * The outpoint of the channel's funding transaction.
	 */
	public funding_txo: OutPoint;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The `temporary_channel_id` this channel used to be known by during channel establishment.
	 */
	public former_temporary_channel_id: ChannelId;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_FundingTxBroadcastSafe_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_FundingTxBroadcastSafe_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const funding_txo: bigint = bindings.LDKEvent_FundingTxBroadcastSafe_get_funding_txo(ptr);
		const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
			CommonBase.add_ref_from(funding_txo_hu_conv, this);
		this.funding_txo = funding_txo_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_FundingTxBroadcastSafe_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const former_temporary_channel_id: bigint = bindings.LDKEvent_FundingTxBroadcastSafe_get_former_temporary_channel_id(ptr);
		const former_temporary_channel_id_hu_conv: ChannelId = new ChannelId(null, former_temporary_channel_id);
			CommonBase.add_ref_from(former_temporary_channel_id_hu_conv, this);
		this.former_temporary_channel_id = former_temporary_channel_id_hu_conv;
	}
}
/** A Event of type PaymentClaimable */
export class Event_PaymentClaimable extends Event {
	/**
	 * The node that will receive the payment after it has been claimed.
	 * This is useful to identify payments received via [phantom nodes].
	 * This field will always be filled in when the event was generated by LDK versions
	 * 0.0.113 and above.
	 * 
	 * [phantom nodes]: crate::sign::PhantomKeysManager
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public receiver_node_id: Uint8Array;
	/**
	 * The hash for which the preimage should be handed to the ChannelManager. Note that LDK will
	 * not stop you from registering duplicate payment hashes for inbound payments.
	 */
	public payment_hash: Uint8Array;
	/**
	 * The fields in the onion which were received with each HTLC. Only fields which were
	 * identical in each HTLC involved in the payment will be included here.
	 * 
	 * Payments received on LDK versions prior to 0.0.115 will have this field unset.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public onion_fields: RecipientOnionFields;
	/**
	 * The value, in thousandths of a satoshi, that this payment is claimable for. May be greater
	 * than the invoice amount.
	 * 
	 * May be less than the invoice amount if [`ChannelConfig::accept_underpaying_htlcs`] is set
	 * and the previous hop took an extra fee.
	 * 
	 * # Note
	 * If [`ChannelConfig::accept_underpaying_htlcs`] is set and you claim without verifying this
	 * field, you may lose money!
	 * 
	 * [`ChannelConfig::accept_underpaying_htlcs`]: crate::util::config::ChannelConfig::accept_underpaying_htlcs
	 */
	public amount_msat: bigint;
	/**
	 * The value, in thousands of a satoshi, that was skimmed off of this payment as an extra fee
	 * taken by our channel counterparty.
	 * 
	 * Will always be 0 unless [`ChannelConfig::accept_underpaying_htlcs`] is set.
	 * 
	 * [`ChannelConfig::accept_underpaying_htlcs`]: crate::util::config::ChannelConfig::accept_underpaying_htlcs
	 */
	public counterparty_skimmed_fee_msat: bigint;
	/**
	 * Information for claiming this received payment, based on whether the purpose of the
	 * payment is to pay an invoice or to send a spontaneous payment.
	 */
	public purpose: PaymentPurpose;
	/**
	 * The `(channel_id, user_channel_id)` pairs over which the payment was received.
	 * 
	 * This will be an incomplete vector for MPP payment events created/serialized using LDK version 0.1.0 and prior.
	 */
	public receiving_channel_ids: TwoTuple_ChannelIdCOption_U128ZZ[];
	/**
	 * The block height at which this payment will be failed back and will no longer be
	 * eligible for claiming.
	 * 
	 * Prior to this height, a call to [`ChannelManager::claim_funds`] is guaranteed to
	 * succeed, however you should wait for [`Event::PaymentClaimed`] to be sure.
	 * 
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 */
	public claim_deadline: Option_u32Z;
	/**
	 * A unique ID describing this payment (derived from the list of HTLCs in the payment).
	 * 
	 * Payers may pay for the same [`PaymentHash`] multiple times (though this is unsafe and
	 * an intermediary node may steal the funds). Thus, in order to accurately track when
	 * payments are received and claimed, you should use this identifier.
	 * 
	 * Only filled in for payments received on LDK versions 0.1 and higher.
	 */
	public payment_id: Option_ThirtyTwoBytesZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const receiver_node_id: number = bindings.LDKEvent_PaymentClaimable_get_receiver_node_id(ptr);
		const receiver_node_id_conv: Uint8Array = bindings.decodeUint8Array(receiver_node_id);
		this.receiver_node_id = receiver_node_id_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentClaimable_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const onion_fields: bigint = bindings.LDKEvent_PaymentClaimable_get_onion_fields(ptr);
		const onion_fields_hu_conv: RecipientOnionFields = new RecipientOnionFields(null, onion_fields);
			CommonBase.add_ref_from(onion_fields_hu_conv, this);
		this.onion_fields = onion_fields_hu_conv;
		this.amount_msat = bindings.LDKEvent_PaymentClaimable_get_amount_msat(ptr);
		this.counterparty_skimmed_fee_msat = bindings.LDKEvent_PaymentClaimable_get_counterparty_skimmed_fee_msat(ptr);
		const purpose: bigint = bindings.LDKEvent_PaymentClaimable_get_purpose(ptr);
		const purpose_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(purpose);
			CommonBase.add_ref_from(purpose_hu_conv, this);
		this.purpose = purpose_hu_conv;
		const receiving_channel_ids: number = bindings.LDKEvent_PaymentClaimable_get_receiving_channel_ids(ptr);
		const receiving_channel_ids_conv_34_len: number = bindings.getArrayLength(receiving_channel_ids);
			const receiving_channel_ids_conv_34_arr: TwoTuple_ChannelIdCOption_U128ZZ[] = new Array(receiving_channel_ids_conv_34_len).fill(null);
			for (var i = 0; i < receiving_channel_ids_conv_34_len; i++) {
				const receiving_channel_ids_conv_34: bigint = bindings.getU64ArrayElem(receiving_channel_ids, i);
				const receiving_channel_ids_conv_34_hu_conv: TwoTuple_ChannelIdCOption_U128ZZ = new TwoTuple_ChannelIdCOption_U128ZZ(null, receiving_channel_ids_conv_34);
				CommonBase.add_ref_from(receiving_channel_ids_conv_34_hu_conv, this);
				receiving_channel_ids_conv_34_arr[i] = receiving_channel_ids_conv_34_hu_conv;
			}
			bindings.freeWasmMemory(receiving_channel_ids)
		this.receiving_channel_ids = receiving_channel_ids_conv_34_arr;
		const claim_deadline: bigint = bindings.LDKEvent_PaymentClaimable_get_claim_deadline(ptr);
		const claim_deadline_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(claim_deadline);
			CommonBase.add_ref_from(claim_deadline_hu_conv, this);
		this.claim_deadline = claim_deadline_hu_conv;
		const payment_id: bigint = bindings.LDKEvent_PaymentClaimable_get_payment_id(ptr);
		const payment_id_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			CommonBase.add_ref_from(payment_id_hu_conv, this);
		this.payment_id = payment_id_hu_conv;
	}
}
/** A Event of type PaymentClaimed */
export class Event_PaymentClaimed extends Event {
	/**
	 * The node that received the payment.
	 * This is useful to identify payments which were received via [phantom nodes].
	 * This field will always be filled in when the event was generated by LDK versions
	 * 0.0.113 and above.
	 * 
	 * [phantom nodes]: crate::sign::PhantomKeysManager
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public receiver_node_id: Uint8Array;
	/**
	 * The payment hash of the claimed payment. Note that LDK will not stop you from
	 * registering duplicate payment hashes for inbound payments.
	 */
	public payment_hash: Uint8Array;
	/**
	 * The value, in thousandths of a satoshi, that this payment is for. May be greater than the
	 * invoice amount.
	 */
	public amount_msat: bigint;
	/**
	 * The purpose of the claimed payment, i.e. whether the payment was for an invoice or a
	 * spontaneous payment.
	 */
	public purpose: PaymentPurpose;
	/**
	 * The HTLCs that comprise the claimed payment. This will be empty for events serialized prior
	 * to LDK version 0.0.117.
	 */
	public htlcs: ClaimedHTLC[];
	/**
	 * The sender-intended sum total of all the MPP parts. This will be `None` for events
	 * serialized prior to LDK version 0.0.117.
	 */
	public sender_intended_total_msat: Option_u64Z;
	/**
	 * The fields in the onion which were received with each HTLC. Only fields which were
	 * identical in each HTLC involved in the payment will be included here.
	 * 
	 * Payments received on LDK versions prior to 0.0.124 will have this field unset.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public onion_fields: RecipientOnionFields;
	/**
	 * A unique ID describing this payment (derived from the list of HTLCs in the payment).
	 * 
	 * Payers may pay for the same [`PaymentHash`] multiple times (though this is unsafe and
	 * an intermediary node may steal the funds). Thus, in order to accurately track when
	 * payments are received and claimed, you should use this identifier.
	 * 
	 * Only filled in for payments received on LDK versions 0.1 and higher.
	 */
	public payment_id: Option_ThirtyTwoBytesZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const receiver_node_id: number = bindings.LDKEvent_PaymentClaimed_get_receiver_node_id(ptr);
		const receiver_node_id_conv: Uint8Array = bindings.decodeUint8Array(receiver_node_id);
		this.receiver_node_id = receiver_node_id_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentClaimed_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.amount_msat = bindings.LDKEvent_PaymentClaimed_get_amount_msat(ptr);
		const purpose: bigint = bindings.LDKEvent_PaymentClaimed_get_purpose(ptr);
		const purpose_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(purpose);
			CommonBase.add_ref_from(purpose_hu_conv, this);
		this.purpose = purpose_hu_conv;
		const htlcs: number = bindings.LDKEvent_PaymentClaimed_get_htlcs(ptr);
		const htlcs_conv_13_len: number = bindings.getArrayLength(htlcs);
			const htlcs_conv_13_arr: ClaimedHTLC[] = new Array(htlcs_conv_13_len).fill(null);
			for (var n = 0; n < htlcs_conv_13_len; n++) {
				const htlcs_conv_13: bigint = bindings.getU64ArrayElem(htlcs, n);
				const htlcs_conv_13_hu_conv: ClaimedHTLC = new ClaimedHTLC(null, htlcs_conv_13);
				CommonBase.add_ref_from(htlcs_conv_13_hu_conv, this);
				htlcs_conv_13_arr[n] = htlcs_conv_13_hu_conv;
			}
			bindings.freeWasmMemory(htlcs)
		this.htlcs = htlcs_conv_13_arr;
		const sender_intended_total_msat: bigint = bindings.LDKEvent_PaymentClaimed_get_sender_intended_total_msat(ptr);
		const sender_intended_total_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(sender_intended_total_msat);
			CommonBase.add_ref_from(sender_intended_total_msat_hu_conv, this);
		this.sender_intended_total_msat = sender_intended_total_msat_hu_conv;
		const onion_fields: bigint = bindings.LDKEvent_PaymentClaimed_get_onion_fields(ptr);
		const onion_fields_hu_conv: RecipientOnionFields = new RecipientOnionFields(null, onion_fields);
			CommonBase.add_ref_from(onion_fields_hu_conv, this);
		this.onion_fields = onion_fields_hu_conv;
		const payment_id: bigint = bindings.LDKEvent_PaymentClaimed_get_payment_id(ptr);
		const payment_id_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			CommonBase.add_ref_from(payment_id_hu_conv, this);
		this.payment_id = payment_id_hu_conv;
	}
}
/** A Event of type ConnectionNeeded */
export class Event_ConnectionNeeded extends Event {
	/**
	 * The node id for the node needing a connection.
	 */
	public node_id: Uint8Array;
	/**
	 * Sockets for connecting to the node, if available. We don't require these addresses to be
	 * present in case the node id corresponds to a known peer that is offline and can be awoken,
	 * such as via the LSPS5 protocol.
	 */
	public addresses: SocketAddress[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKEvent_ConnectionNeeded_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const addresses: number = bindings.LDKEvent_ConnectionNeeded_get_addresses(ptr);
		const addresses_conv_15_len: number = bindings.getArrayLength(addresses);
			const addresses_conv_15_arr: SocketAddress[] = new Array(addresses_conv_15_len).fill(null);
			for (var p = 0; p < addresses_conv_15_len; p++) {
				const addresses_conv_15: bigint = bindings.getU64ArrayElem(addresses, p);
				const addresses_conv_15_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(addresses_conv_15);
				CommonBase.add_ref_from(addresses_conv_15_hu_conv, this);
				addresses_conv_15_arr[p] = addresses_conv_15_hu_conv;
			}
			bindings.freeWasmMemory(addresses)
		this.addresses = addresses_conv_15_arr;
	}
}
/** A Event of type InvoiceReceived */
export class Event_InvoiceReceived extends Event {
	/**
	 * The `payment_id` associated with payment for the invoice.
	 */
	public payment_id: Uint8Array;
	/**
	 * The invoice to pay.
	 */
	public invoice: Bolt12Invoice;
	/**
	 * The context of the [`BlindedMessagePath`] used to send the invoice.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 */
	public context: Option_OffersContextZ;
	/**
	 * A responder for replying with an [`InvoiceError`] if needed.
	 * 
	 * `None` if the invoice wasn't sent with a reply path.
	 * 
	 * [`InvoiceError`]: crate::offers::invoice_error::InvoiceError
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public responder: Responder;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_InvoiceReceived_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const invoice: bigint = bindings.LDKEvent_InvoiceReceived_get_invoice(ptr);
		const invoice_hu_conv: Bolt12Invoice = new Bolt12Invoice(null, invoice);
			CommonBase.add_ref_from(invoice_hu_conv, this);
		this.invoice = invoice_hu_conv;
		const context: bigint = bindings.LDKEvent_InvoiceReceived_get_context(ptr);
		const context_hu_conv: Option_OffersContextZ = Option_OffersContextZ.constr_from_ptr(context);
			CommonBase.add_ref_from(context_hu_conv, this);
		this.context = context_hu_conv;
		const responder: bigint = bindings.LDKEvent_InvoiceReceived_get_responder(ptr);
		const responder_hu_conv: Responder = new Responder(null, responder);
			CommonBase.add_ref_from(responder_hu_conv, this);
		this.responder = responder_hu_conv;
	}
}
/** A Event of type PaymentSent */
export class Event_PaymentSent extends Event {
	/**
	 * The `payment_id` passed to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_id: Option_ThirtyTwoBytesZ;
	/**
	 * The preimage to the hash given to ChannelManager::send_payment.
	 * Note that this serves as a payment receipt, if you wish to have such a thing, you must
	 * store it somehow!
	 */
	public payment_preimage: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_hash: Uint8Array;
	/**
	 * The total amount that was paid, across all paths.
	 * 
	 * Note that, like [`Route::get_total_amount`], this does *not* include the paid fees.
	 * 
	 * This is only `None` for payments initiated on LDK versions prior to 0.2.
	 * 
	 * [`Route::get_total_amount`]: crate::routing::router::Route::get_total_amount
	 */
	public amount_msat: Option_u64Z;
	/**
	 * The total fee which was spent at intermediate hops in this payment, across all paths.
	 * 
	 * Note that, like [`Route::get_total_fees`], this does *not* include any potential
	 * overpayment to the recipient node.
	 * 
	 * If the recipient or an intermediate node misbehaves and gives us free money, this may
	 * overstate the amount paid, though this is unlikely.
	 * 
	 * This is only `None` for payments initiated on LDK versions prior to 0.0.103.
	 * 
	 * [`Route::get_total_fees`]: crate::routing::router::Route::get_total_fees
	 */
	public fee_paid_msat: Option_u64Z;
	/**
	 * The BOLT 12 invoice that was paid. `None` if the payment was a non BOLT 12 payment.
	 * 
	 * The BOLT 12 invoice is useful for proof of payment because it contains the
	 * payment hash. A third party can verify that the payment was made by
	 * showing the invoice and confirming that the payment hash matches
	 * the hash of the payment preimage.
	 * 
	 * However, the [`PaidBolt12Invoice`] can also be of type [`StaticInvoice`], which
	 * is a special [`Bolt12Invoice`] where proof of payment is not possible.
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 */
	public bolt12_invoice: Option_PaidBolt12InvoiceZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: bigint = bindings.LDKEvent_PaymentSent_get_payment_id(ptr);
		const payment_id_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			CommonBase.add_ref_from(payment_id_hu_conv, this);
		this.payment_id = payment_id_hu_conv;
		const payment_preimage: number = bindings.LDKEvent_PaymentSent_get_payment_preimage(ptr);
		const payment_preimage_conv: Uint8Array = bindings.decodeUint8Array(payment_preimage);
		this.payment_preimage = payment_preimage_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentSent_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const amount_msat: bigint = bindings.LDKEvent_PaymentSent_get_amount_msat(ptr);
		const amount_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(amount_msat);
			CommonBase.add_ref_from(amount_msat_hu_conv, this);
		this.amount_msat = amount_msat_hu_conv;
		const fee_paid_msat: bigint = bindings.LDKEvent_PaymentSent_get_fee_paid_msat(ptr);
		const fee_paid_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(fee_paid_msat);
			CommonBase.add_ref_from(fee_paid_msat_hu_conv, this);
		this.fee_paid_msat = fee_paid_msat_hu_conv;
		const bolt12_invoice: bigint = bindings.LDKEvent_PaymentSent_get_bolt12_invoice(ptr);
		const bolt12_invoice_hu_conv: Option_PaidBolt12InvoiceZ = Option_PaidBolt12InvoiceZ.constr_from_ptr(bolt12_invoice);
			CommonBase.add_ref_from(bolt12_invoice_hu_conv, this);
		this.bolt12_invoice = bolt12_invoice_hu_conv;
	}
}
/** A Event of type PaymentFailed */
export class Event_PaymentFailed extends Event {
	/**
	 * The `payment_id` passed to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`]. `None` if the payment failed
	 * before receiving an invoice when paying a BOLT12 [`Offer`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public payment_hash: Option_ThirtyTwoBytesZ;
	/**
	 * The reason the payment failed. This is only `None` for events generated or serialized
	 * by versions prior to 0.0.115, or when downgrading to a version with a reason that was
	 * added after.
	 */
	public reason: Option_PaymentFailureReasonZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_PaymentFailed_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: bigint = bindings.LDKEvent_PaymentFailed_get_payment_hash(ptr);
		const payment_hash_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			CommonBase.add_ref_from(payment_hash_hu_conv, this);
		this.payment_hash = payment_hash_hu_conv;
		const reason: bigint = bindings.LDKEvent_PaymentFailed_get_reason(ptr);
		const reason_hu_conv: Option_PaymentFailureReasonZ = Option_PaymentFailureReasonZ.constr_from_ptr(reason);
			CommonBase.add_ref_from(reason_hu_conv, this);
		this.reason = reason_hu_conv;
	}
}
/** A Event of type PaymentPathSuccessful */
export class Event_PaymentPathSuccessful extends Event {
	/**
	 * The `payment_id` passed to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * This will be `Some` for all payments which completed on LDK 0.0.104 or later.
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_hash: Option_ThirtyTwoBytesZ;
	/**
	 * The payment path that was successful.
	 * 
	 * May contain a closed channel if the HTLC sent along the path was fulfilled on chain.
	 */
	public path: Path;
	/**
	 * The time that each hop indicated it held the HTLC.
	 * 
	 * The unit in which the hold times are expressed are 100's of milliseconds. So a hop
	 * reporting 2 is a hold time that corresponds to between 200 and 299 milliseconds.
	 * 
	 * We expect that at each hop the actual hold time will be strictly greater than the hold
	 * time of the following hops, as a node along the path shouldn't have completed the HTLC
	 * until the next node has completed it. Note that because hold times are in 100's of ms,
	 * hold times as reported are likely to often be equal across hops.
	 * 
	 * If our peer didn't provide attribution data or the HTLC resolved on chain, the list
	 * will be empty.
	 * 
	 * Each entry will correspond with one entry in [`Path::hops`], or, thereafter, the
	 * [`BlindedTail::trampoline_hops`] in [`Path::blinded_tail`]. Because not all nodes
	 * support hold times, the list may be shorter than the number of hops in the path.
	 */
	public hold_times: Uint32Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_PaymentPathSuccessful_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: bigint = bindings.LDKEvent_PaymentPathSuccessful_get_payment_hash(ptr);
		const payment_hash_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			CommonBase.add_ref_from(payment_hash_hu_conv, this);
		this.payment_hash = payment_hash_hu_conv;
		const path: bigint = bindings.LDKEvent_PaymentPathSuccessful_get_path(ptr);
		const path_hu_conv: Path = new Path(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
		const hold_times: number = bindings.LDKEvent_PaymentPathSuccessful_get_hold_times(ptr);
		const hold_times_conv: Uint32Array = bindings.decodeUint32Array(hold_times);
		this.hold_times = hold_times_conv;
	}
}
/** A Event of type PaymentPathFailed */
export class Event_PaymentPathFailed extends Event {
	/**
	 * The `payment_id` passed to [`ChannelManager::send_payment`].
	 * 
	 * This will be `Some` for all payment paths which failed on LDK 0.0.103 or later.
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public payment_id: Option_ThirtyTwoBytesZ;
	/**
	 * The hash that was given to [`ChannelManager::send_payment`].
	 * 
	 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 */
	public payment_hash: Uint8Array;
	/**
	 * Indicates the payment was rejected for some reason by the recipient. This implies that
	 * the payment has failed, not just the route in question. If this is not set, the payment may
	 * be retried via a different route.
	 */
	public payment_failed_permanently: boolean;
	/**
	 * Extra error details based on the failure type. May contain an update that needs to be
	 * applied to the [`NetworkGraph`].
	 * 
	 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
	 */
	public failure: PathFailure;
	/**
	 * The payment path that failed.
	 */
	public path: Path;
	/**
	 * The channel responsible for the failed payment path.
	 * 
	 * Note that for route hints or for the first hop in a path this may be an SCID alias and
	 * may not refer to a channel in the public network graph. These aliases may also collide
	 * with channels in the public network graph.
	 * 
	 * If this is `Some`, then the corresponding channel should be avoided when the payment is
	 * retried. May be `None` for older [`Event`] serializations.
	 */
	public short_channel_id: Option_u64Z;
	/**
	 * The time that each hop indicated it held the HTLC.
	 * 
	 * The unit in which the hold times are expressed are 100's of milliseconds. So a hop
	 * reporting 2 is a hold time that corresponds to between 200 and 299 milliseconds.
	 * 
	 * We expect that at each hop the actual hold time will be strictly greater than the hold
	 * time of the following hops, as a node along the path shouldn't have completed the HTLC
	 * until the next node has completed it. Note that because hold times are in 100's of ms,
	 * hold times as reported are likely to often be equal across hops.
	 * 
	 * If our peer didn't provide attribution data or the HTLC resolved on chain, the list
	 * will be empty.
	 * 
	 * Each entry will correspond with one entry in [`Path::hops`], or, thereafter, the
	 * [`BlindedTail::trampoline_hops`] in [`Path::blinded_tail`]. Because not all nodes
	 * support hold times, the list may be shorter than the number of hops in the path.
	 */
	public hold_times: Uint32Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: bigint = bindings.LDKEvent_PaymentPathFailed_get_payment_id(ptr);
		const payment_id_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			CommonBase.add_ref_from(payment_id_hu_conv, this);
		this.payment_id = payment_id_hu_conv;
		const payment_hash: number = bindings.LDKEvent_PaymentPathFailed_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.payment_failed_permanently = bindings.LDKEvent_PaymentPathFailed_get_payment_failed_permanently(ptr);
		const failure: bigint = bindings.LDKEvent_PaymentPathFailed_get_failure(ptr);
		const failure_hu_conv: PathFailure = PathFailure.constr_from_ptr(failure);
			CommonBase.add_ref_from(failure_hu_conv, this);
		this.failure = failure_hu_conv;
		const path: bigint = bindings.LDKEvent_PaymentPathFailed_get_path(ptr);
		const path_hu_conv: Path = new Path(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
		const short_channel_id: bigint = bindings.LDKEvent_PaymentPathFailed_get_short_channel_id(ptr);
		const short_channel_id_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(short_channel_id);
			CommonBase.add_ref_from(short_channel_id_hu_conv, this);
		this.short_channel_id = short_channel_id_hu_conv;
		const hold_times: number = bindings.LDKEvent_PaymentPathFailed_get_hold_times(ptr);
		const hold_times_conv: Uint32Array = bindings.decodeUint32Array(hold_times);
		this.hold_times = hold_times_conv;
	}
}
/** A Event of type ProbeSuccessful */
export class Event_ProbeSuccessful extends Event {
	/**
	 * The id returned by [`ChannelManager::send_probe`].
	 * 
	 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash generated by [`ChannelManager::send_probe`].
	 * 
	 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
	 */
	public payment_hash: Uint8Array;
	/**
	 * The payment path that was successful.
	 */
	public path: Path;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_ProbeSuccessful_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKEvent_ProbeSuccessful_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const path: bigint = bindings.LDKEvent_ProbeSuccessful_get_path(ptr);
		const path_hu_conv: Path = new Path(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
	}
}
/** A Event of type ProbeFailed */
export class Event_ProbeFailed extends Event {
	/**
	 * The id returned by [`ChannelManager::send_probe`].
	 * 
	 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
	 */
	public payment_id: Uint8Array;
	/**
	 * The hash generated by [`ChannelManager::send_probe`].
	 * 
	 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
	 */
	public payment_hash: Uint8Array;
	/**
	 * The payment path that failed.
	 */
	public path: Path;
	/**
	 * The channel responsible for the failed probe.
	 * 
	 * Note that for route hints or for the first hop in a path this may be an SCID alias and
	 * may not refer to a channel in the public network graph. These aliases may also collide
	 * with channels in the public network graph.
	 */
	public short_channel_id: Option_u64Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKEvent_ProbeFailed_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKEvent_ProbeFailed_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const path: bigint = bindings.LDKEvent_ProbeFailed_get_path(ptr);
		const path_hu_conv: Path = new Path(null, path);
			CommonBase.add_ref_from(path_hu_conv, this);
		this.path = path_hu_conv;
		const short_channel_id: bigint = bindings.LDKEvent_ProbeFailed_get_short_channel_id(ptr);
		const short_channel_id_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(short_channel_id);
			CommonBase.add_ref_from(short_channel_id_hu_conv, this);
		this.short_channel_id = short_channel_id_hu_conv;
	}
}
/** A Event of type HTLCIntercepted */
export class Event_HTLCIntercepted extends Event {
	/**
	 * An id to help LDK identify which HTLC is being forwarded or failed.
	 */
	public intercept_id: Uint8Array;
	/**
	 * The fake scid that was programmed as the next hop's scid, generated using
	 * [`ChannelManager::get_intercept_scid`].
	 * 
	 * [`ChannelManager::get_intercept_scid`]: crate::ln::channelmanager::ChannelManager::get_intercept_scid
	 */
	public requested_next_hop_scid: bigint;
	/**
	 * The payment hash used for this HTLC.
	 */
	public payment_hash: Uint8Array;
	/**
	 * How many msats were received on the inbound edge of this HTLC.
	 */
	public inbound_amount_msat: bigint;
	/**
	 * How many msats the payer intended to route to the next node. Depending on the reason you are
	 * intercepting this payment, you might take a fee by forwarding less than this amount.
	 * Forwarding less than this amount may break compatibility with LDK versions prior to 0.0.116.
	 * 
	 * Note that LDK will NOT check that expected fees were factored into this value. You MUST
	 * check that whatever fee you want has been included here or subtract it as required. Further,
	 * LDK will not stop you from forwarding more than you received.
	 */
	public expected_outbound_amount_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const intercept_id: number = bindings.LDKEvent_HTLCIntercepted_get_intercept_id(ptr);
		const intercept_id_conv: Uint8Array = bindings.decodeUint8Array(intercept_id);
		this.intercept_id = intercept_id_conv;
		this.requested_next_hop_scid = bindings.LDKEvent_HTLCIntercepted_get_requested_next_hop_scid(ptr);
		const payment_hash: number = bindings.LDKEvent_HTLCIntercepted_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.inbound_amount_msat = bindings.LDKEvent_HTLCIntercepted_get_inbound_amount_msat(ptr);
		this.expected_outbound_amount_msat = bindings.LDKEvent_HTLCIntercepted_get_expected_outbound_amount_msat(ptr);
	}
}
/** A Event of type SpendableOutputs */
export class Event_SpendableOutputs extends Event {
	/**
	 * The outputs which you should store as spendable by you.
	 */
	public outputs: SpendableOutputDescriptor[];
	/**
	 * The `channel_id` indicating which channel the spendable outputs belong to.
	 * 
	 * This will always be `Some` for events generated by LDK versions 0.0.117 and above.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_id: ChannelId;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const outputs: number = bindings.LDKEvent_SpendableOutputs_get_outputs(ptr);
		const outputs_conv_27_len: number = bindings.getArrayLength(outputs);
			const outputs_conv_27_arr: SpendableOutputDescriptor[] = new Array(outputs_conv_27_len).fill(null);
			for (var b = 0; b < outputs_conv_27_len; b++) {
				const outputs_conv_27: bigint = bindings.getU64ArrayElem(outputs, b);
				const outputs_conv_27_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(outputs_conv_27);
				CommonBase.add_ref_from(outputs_conv_27_hu_conv, this);
				outputs_conv_27_arr[b] = outputs_conv_27_hu_conv;
			}
			bindings.freeWasmMemory(outputs)
		this.outputs = outputs_conv_27_arr;
		const channel_id: bigint = bindings.LDKEvent_SpendableOutputs_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
	}
}
/** A Event of type PaymentForwarded */
export class Event_PaymentForwarded extends Event {
	/**
	 * The channel id of the incoming channel between the previous node and us.
	 * 
	 * This is only `None` for events generated or serialized by versions prior to 0.0.107.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public prev_channel_id: ChannelId;
	/**
	 * The channel id of the outgoing channel between the next node and us.
	 * 
	 * This is only `None` for events generated or serialized by versions prior to 0.0.107.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public next_channel_id: ChannelId;
	/**
	 * The `user_channel_id` of the incoming channel between the previous node and us.
	 * 
	 * This is only `None` for events generated or serialized by versions prior to 0.0.122.
	 */
	public prev_user_channel_id: Option_U128Z;
	/**
	 * The `user_channel_id` of the outgoing channel between the next node and us.
	 * 
	 * This will be `None` if the payment was settled via an on-chain transaction. See the
	 * caveat described for the `total_fee_earned_msat` field. Moreover it will be `None` for
	 * events generated or serialized by versions prior to 0.0.122.
	 */
	public next_user_channel_id: Option_U128Z;
	/**
	 * The node id of the previous node.
	 * 
	 * This is only `None` for HTLCs received prior to 0.1 or for events serialized by
	 * versions prior to 0.1
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public prev_node_id: Uint8Array;
	/**
	 * The node id of the next node.
	 * 
	 * This is only `None` for HTLCs received prior to 0.1 or for events serialized by
	 * versions prior to 0.1
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public next_node_id: Uint8Array;
	/**
	 * The total fee, in milli-satoshis, which was earned as a result of the payment.
	 * 
	 * Note that if we force-closed the channel over which we forwarded an HTLC while the HTLC
	 * was pending, the amount the next hop claimed will have been rounded down to the nearest
	 * whole satoshi. Thus, the fee calculated here may be higher than expected as we still
	 * claimed the full value in millisatoshis from the source. In this case,
	 * `claim_from_onchain_tx` will be set.
	 * 
	 * If the channel which sent us the payment has been force-closed, we will claim the funds
	 * via an on-chain transaction. In that case we do not yet know the on-chain transaction
	 * fees which we will spend and will instead set this to `None`. It is possible duplicate
	 * `PaymentForwarded` events are generated for the same payment iff `total_fee_earned_msat` is
	 * `None`.
	 */
	public total_fee_earned_msat: Option_u64Z;
	/**
	 * The share of the total fee, in milli-satoshis, which was withheld in addition to the
	 * forwarding fee.
	 * 
	 * This will only be `Some` if we forwarded an intercepted HTLC with less than the
	 * expected amount. This means our counterparty accepted to receive less than the invoice
	 * amount, e.g., by claiming the payment featuring a corresponding
	 * [`PaymentClaimable::counterparty_skimmed_fee_msat`].
	 * 
	 * Will also always be `None` for events serialized with LDK prior to version 0.0.122.
	 * 
	 * The caveat described above the `total_fee_earned_msat` field applies here as well.
	 * 
	 * [`PaymentClaimable::counterparty_skimmed_fee_msat`]: Self::PaymentClaimable::counterparty_skimmed_fee_msat
	 */
	public skimmed_fee_msat: Option_u64Z;
	/**
	 * If this is `true`, the forwarded HTLC was claimed by our counterparty via an on-chain
	 * transaction.
	 */
	public claim_from_onchain_tx: boolean;
	/**
	 * The final amount forwarded, in milli-satoshis, after the fee is deducted.
	 * 
	 * The caveat described above the `total_fee_earned_msat` field applies here as well.
	 */
	public outbound_amount_forwarded_msat: Option_u64Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const prev_channel_id: bigint = bindings.LDKEvent_PaymentForwarded_get_prev_channel_id(ptr);
		const prev_channel_id_hu_conv: ChannelId = new ChannelId(null, prev_channel_id);
			CommonBase.add_ref_from(prev_channel_id_hu_conv, this);
		this.prev_channel_id = prev_channel_id_hu_conv;
		const next_channel_id: bigint = bindings.LDKEvent_PaymentForwarded_get_next_channel_id(ptr);
		const next_channel_id_hu_conv: ChannelId = new ChannelId(null, next_channel_id);
			CommonBase.add_ref_from(next_channel_id_hu_conv, this);
		this.next_channel_id = next_channel_id_hu_conv;
		const prev_user_channel_id: bigint = bindings.LDKEvent_PaymentForwarded_get_prev_user_channel_id(ptr);
		const prev_user_channel_id_hu_conv: Option_U128Z = Option_U128Z.constr_from_ptr(prev_user_channel_id);
			CommonBase.add_ref_from(prev_user_channel_id_hu_conv, this);
		this.prev_user_channel_id = prev_user_channel_id_hu_conv;
		const next_user_channel_id: bigint = bindings.LDKEvent_PaymentForwarded_get_next_user_channel_id(ptr);
		const next_user_channel_id_hu_conv: Option_U128Z = Option_U128Z.constr_from_ptr(next_user_channel_id);
			CommonBase.add_ref_from(next_user_channel_id_hu_conv, this);
		this.next_user_channel_id = next_user_channel_id_hu_conv;
		const prev_node_id: number = bindings.LDKEvent_PaymentForwarded_get_prev_node_id(ptr);
		const prev_node_id_conv: Uint8Array = bindings.decodeUint8Array(prev_node_id);
		this.prev_node_id = prev_node_id_conv;
		const next_node_id: number = bindings.LDKEvent_PaymentForwarded_get_next_node_id(ptr);
		const next_node_id_conv: Uint8Array = bindings.decodeUint8Array(next_node_id);
		this.next_node_id = next_node_id_conv;
		const total_fee_earned_msat: bigint = bindings.LDKEvent_PaymentForwarded_get_total_fee_earned_msat(ptr);
		const total_fee_earned_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(total_fee_earned_msat);
			CommonBase.add_ref_from(total_fee_earned_msat_hu_conv, this);
		this.total_fee_earned_msat = total_fee_earned_msat_hu_conv;
		const skimmed_fee_msat: bigint = bindings.LDKEvent_PaymentForwarded_get_skimmed_fee_msat(ptr);
		const skimmed_fee_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(skimmed_fee_msat);
			CommonBase.add_ref_from(skimmed_fee_msat_hu_conv, this);
		this.skimmed_fee_msat = skimmed_fee_msat_hu_conv;
		this.claim_from_onchain_tx = bindings.LDKEvent_PaymentForwarded_get_claim_from_onchain_tx(ptr);
		const outbound_amount_forwarded_msat: bigint = bindings.LDKEvent_PaymentForwarded_get_outbound_amount_forwarded_msat(ptr);
		const outbound_amount_forwarded_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(outbound_amount_forwarded_msat);
			CommonBase.add_ref_from(outbound_amount_forwarded_msat_hu_conv, this);
		this.outbound_amount_forwarded_msat = outbound_amount_forwarded_msat_hu_conv;
	}
}
/** A Event of type ChannelPending */
export class Event_ChannelPending extends Event {
	/**
	 * The `channel_id` of the channel that is pending confirmation.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The `temporary_channel_id` this channel used to be known by during channel establishment.
	 * 
	 * Will be `None` for channels created prior to LDK version 0.0.115.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public former_temporary_channel_id: ChannelId;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The outpoint of the channel's funding transaction.
	 */
	public funding_txo: OutPoint;
	/**
	 * The features that this channel will operate with.
	 * 
	 * Will be `None` for channels created prior to LDK version 0.0.122.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_type: ChannelTypeFeatures;
	/**
	 * The witness script that is used to lock the channel's funding output to commitment transactions.
	 * 
	 * This field will be `None` for objects serialized with LDK versions prior to 0.2.0.
	 */
	public funding_redeem_script: Option_CVec_u8ZZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_ChannelPending_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_ChannelPending_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const former_temporary_channel_id: bigint = bindings.LDKEvent_ChannelPending_get_former_temporary_channel_id(ptr);
		const former_temporary_channel_id_hu_conv: ChannelId = new ChannelId(null, former_temporary_channel_id);
			CommonBase.add_ref_from(former_temporary_channel_id_hu_conv, this);
		this.former_temporary_channel_id = former_temporary_channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_ChannelPending_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const funding_txo: bigint = bindings.LDKEvent_ChannelPending_get_funding_txo(ptr);
		const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
			CommonBase.add_ref_from(funding_txo_hu_conv, this);
		this.funding_txo = funding_txo_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_ChannelPending_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
		const funding_redeem_script: bigint = bindings.LDKEvent_ChannelPending_get_funding_redeem_script(ptr);
		const funding_redeem_script_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(funding_redeem_script);
			CommonBase.add_ref_from(funding_redeem_script_hu_conv, this);
		this.funding_redeem_script = funding_redeem_script_hu_conv;
	}
}
/** A Event of type ChannelReady */
export class Event_ChannelReady extends Event {
	/**
	 * The `channel_id` of the channel that is ready.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The outpoint of the channel's funding transaction.
	 * 
	 * Will be `None` if the channel's funding transaction reached an acceptable depth prior to
	 * version 0.2.
	 */
	public funding_txo: Option_OutPointZ;
	/**
	 * The features that this channel will operate with.
	 */
	public channel_type: ChannelTypeFeatures;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_ChannelReady_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_ChannelReady_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const counterparty_node_id: number = bindings.LDKEvent_ChannelReady_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const funding_txo: bigint = bindings.LDKEvent_ChannelReady_get_funding_txo(ptr);
		const funding_txo_hu_conv: Option_OutPointZ = Option_OutPointZ.constr_from_ptr(funding_txo);
			CommonBase.add_ref_from(funding_txo_hu_conv, this);
		this.funding_txo = funding_txo_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_ChannelReady_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
	}
}
/** A Event of type ChannelClosed */
export class Event_ChannelClosed extends Event {
	/**
	 * The `channel_id` of the channel which has been closed. Note that on-chain transactions
	 * resolving the channel are likely still awaiting confirmation.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for inbound channels.
	 * This may be zero for inbound channels serialized prior to 0.0.113 and will always be
	 * zero for objects serialized with LDK versions prior to 0.0.102.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The reason the channel was closed.
	 */
	public reason: ClosureReason;
	/**
	 * Counterparty in the closed channel.
	 * 
	 * This field will be `None` for objects serialized prior to LDK 0.0.117.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * Channel capacity of the closing channel (sats).
	 * 
	 * This field will be `None` for objects serialized prior to LDK 0.0.117.
	 */
	public channel_capacity_sats: Option_u64Z;
	/**
	 * The original channel funding TXO; this helps checking for the existence and confirmation
	 * status of the closing tx.
	 * Note that for instances serialized in v0.0.119 or prior this will be missing (None).
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_funding_txo: OutPoint;
	/**
	 * An upper bound on the our last local balance in msats before the channel was closed.
	 * 
	 * Will overstate our balance as it ignores pending outbound HTLCs and transaction fees.
	 * 
	 * For more accurate balances including fee information see
	 * [`ChainMonitor::get_claimable_balances`].
	 * 
	 * This field will be `None` only for objects serialized prior to LDK 0.1.
	 * 
	 * [`ChainMonitor::get_claimable_balances`]: crate::chain::chainmonitor::ChainMonitor::get_claimable_balances
	 */
	public last_local_balance_msat: Option_u64Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_ChannelClosed_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_ChannelClosed_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const reason: bigint = bindings.LDKEvent_ChannelClosed_get_reason(ptr);
		const reason_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(reason);
			CommonBase.add_ref_from(reason_hu_conv, this);
		this.reason = reason_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_ChannelClosed_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const channel_capacity_sats: bigint = bindings.LDKEvent_ChannelClosed_get_channel_capacity_sats(ptr);
		const channel_capacity_sats_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(channel_capacity_sats);
			CommonBase.add_ref_from(channel_capacity_sats_hu_conv, this);
		this.channel_capacity_sats = channel_capacity_sats_hu_conv;
		const channel_funding_txo: bigint = bindings.LDKEvent_ChannelClosed_get_channel_funding_txo(ptr);
		const channel_funding_txo_hu_conv: OutPoint = new OutPoint(null, channel_funding_txo);
			CommonBase.add_ref_from(channel_funding_txo_hu_conv, this);
		this.channel_funding_txo = channel_funding_txo_hu_conv;
		const last_local_balance_msat: bigint = bindings.LDKEvent_ChannelClosed_get_last_local_balance_msat(ptr);
		const last_local_balance_msat_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(last_local_balance_msat);
			CommonBase.add_ref_from(last_local_balance_msat_hu_conv, this);
		this.last_local_balance_msat = last_local_balance_msat_hu_conv;
	}
}
/** A Event of type SplicePending */
export class Event_SplicePending extends Event {
	/**
	 * The `channel_id` of the channel that has a pending splice funding transaction.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The outpoint of the channel's splice funding transaction.
	 */
	public new_funding_txo: OutPoint;
	/**
	 * The features that this channel will operate with. Currently, these will be the same
	 * features that the channel was opened with, but in the future splices may change them.
	 */
	public channel_type: ChannelTypeFeatures;
	/**
	 * The witness script that is used to lock the channel's funding output to commitment transactions.
	 */
	public new_funding_redeem_script: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_SplicePending_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_SplicePending_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const counterparty_node_id: number = bindings.LDKEvent_SplicePending_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const new_funding_txo: bigint = bindings.LDKEvent_SplicePending_get_new_funding_txo(ptr);
		const new_funding_txo_hu_conv: OutPoint = new OutPoint(null, new_funding_txo);
			CommonBase.add_ref_from(new_funding_txo_hu_conv, this);
		this.new_funding_txo = new_funding_txo_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_SplicePending_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
		const new_funding_redeem_script: number = bindings.LDKEvent_SplicePending_get_new_funding_redeem_script(ptr);
		const new_funding_redeem_script_conv: Uint8Array = bindings.decodeUint8Array(new_funding_redeem_script);
		this.new_funding_redeem_script = new_funding_redeem_script_conv;
	}
}
/** A Event of type SpliceFailed */
export class Event_SpliceFailed extends Event {
	/**
	 * The `channel_id` of the channel for which the splice failed.
	 */
	public channel_id: ChannelId;
	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The `node_id` of the channel counterparty.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The outpoint of the channel's splice funding transaction, if one was created.
	 */
	public abandoned_funding_txo: Option_OutPointZ;
	/**
	 * The features that this channel will operate with, if available.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel_type: ChannelTypeFeatures;
	/**
	 * UTXOs spent as inputs contributed to the splice transaction.
	 */
	public contributed_inputs: OutPoint[];
	/**
	 * Outputs contributed to the splice transaction.
	 */
	public contributed_outputs: TxOut[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_SpliceFailed_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const user_channel_id: number = bindings.LDKEvent_SpliceFailed_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const counterparty_node_id: number = bindings.LDKEvent_SpliceFailed_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const abandoned_funding_txo: bigint = bindings.LDKEvent_SpliceFailed_get_abandoned_funding_txo(ptr);
		const abandoned_funding_txo_hu_conv: Option_OutPointZ = Option_OutPointZ.constr_from_ptr(abandoned_funding_txo);
			CommonBase.add_ref_from(abandoned_funding_txo_hu_conv, this);
		this.abandoned_funding_txo = abandoned_funding_txo_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_SpliceFailed_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
		const contributed_inputs: number = bindings.LDKEvent_SpliceFailed_get_contributed_inputs(ptr);
		const contributed_inputs_conv_10_len: number = bindings.getArrayLength(contributed_inputs);
			const contributed_inputs_conv_10_arr: OutPoint[] = new Array(contributed_inputs_conv_10_len).fill(null);
			for (var k = 0; k < contributed_inputs_conv_10_len; k++) {
				const contributed_inputs_conv_10: bigint = bindings.getU64ArrayElem(contributed_inputs, k);
				const contributed_inputs_conv_10_hu_conv: OutPoint = new OutPoint(null, contributed_inputs_conv_10);
				CommonBase.add_ref_from(contributed_inputs_conv_10_hu_conv, this);
				contributed_inputs_conv_10_arr[k] = contributed_inputs_conv_10_hu_conv;
			}
			bindings.freeWasmMemory(contributed_inputs)
		this.contributed_inputs = contributed_inputs_conv_10_arr;
		const contributed_outputs: number = bindings.LDKEvent_SpliceFailed_get_contributed_outputs(ptr);
		const contributed_outputs_conv_7_len: number = bindings.getArrayLength(contributed_outputs);
			const contributed_outputs_conv_7_arr: TxOut[] = new Array(contributed_outputs_conv_7_len).fill(null);
			for (var h = 0; h < contributed_outputs_conv_7_len; h++) {
				const contributed_outputs_conv_7: bigint = bindings.getU64ArrayElem(contributed_outputs, h);
				const contributed_outputs_conv_7_conv: TxOut = new TxOut(null, contributed_outputs_conv_7);
				contributed_outputs_conv_7_arr[h] = contributed_outputs_conv_7_conv;
			}
			bindings.freeWasmMemory(contributed_outputs)
		this.contributed_outputs = contributed_outputs_conv_7_arr;
	}
}
/** A Event of type DiscardFunding */
export class Event_DiscardFunding extends Event {
	/**
	 * The channel_id of the channel which has been closed.
	 */
	public channel_id: ChannelId;
	/**
	 * The full transaction received from the user
	 */
	public funding_info: FundingInfo;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_DiscardFunding_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const funding_info: bigint = bindings.LDKEvent_DiscardFunding_get_funding_info(ptr);
		const funding_info_hu_conv: FundingInfo = FundingInfo.constr_from_ptr(funding_info);
			CommonBase.add_ref_from(funding_info_hu_conv, this);
		this.funding_info = funding_info_hu_conv;
	}
}
/** A Event of type OpenChannelRequest */
export class Event_OpenChannelRequest extends Event {
	/**
	 * The temporary channel ID of the channel requested to be opened.
	 * 
	 * When responding to the request, the `temporary_channel_id` should be passed
	 * back to the ChannelManager through [`ChannelManager::accept_inbound_channel`] to accept,
	 * or through [`ChannelManager::force_close_broadcasting_latest_txn`] to reject.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
	 */
	public temporary_channel_id: ChannelId;
	/**
	 * The node_id of the counterparty requesting to open the channel.
	 * 
	 * When responding to the request, the `counterparty_node_id` should be passed
	 * back to the `ChannelManager` through [`ChannelManager::accept_inbound_channel`] to
	 * accept the request, or through [`ChannelManager::force_close_broadcasting_latest_txn`]
	 * to reject the request.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The channel value of the requested channel.
	 */
	public funding_satoshis: bigint;
	/**
	 * If `channel_negotiation_type` is `InboundChannelFunds::DualFunded`, this indicates that the peer wishes to
	 * open a dual-funded channel. Otherwise, this field will be `InboundChannelFunds::PushMsats`,
	 * indicating the `push_msats` value our peer is pushing to us for a non-dual-funded channel.
	 */
	public channel_negotiation_type: InboundChannelFunds;
	/**
	 * The features that this channel will operate with. If you reject the channel, a
	 * well-behaved counterparty may automatically re-attempt the channel with a new set of
	 * feature flags.
	 * 
	 * Note that if [`ChannelTypeFeatures::supports_scid_privacy`] returns true on this type,
	 * the resulting [`ChannelManager`] will not be readable by versions of LDK prior to
	 * 0.0.106.
	 * 
	 * Furthermore, note that if [`ChannelTypeFeatures::supports_zero_conf`] returns true on this type,
	 * the resulting [`ChannelManager`] will not be readable by versions of LDK prior to
	 * 0.0.107. Channels setting this type also need to get manually accepted via
	 * [`crate::ln::channelmanager::ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`],
	 * or will be rejected otherwise.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public channel_type: ChannelTypeFeatures;
	/**
	 * True if this channel is (or will be) publicly-announced.
	 */
	public is_announced: boolean;
	/**
	 * Channel parameters given by the counterparty.
	 */
	public params: ChannelParameters;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const temporary_channel_id: bigint = bindings.LDKEvent_OpenChannelRequest_get_temporary_channel_id(ptr);
		const temporary_channel_id_hu_conv: ChannelId = new ChannelId(null, temporary_channel_id);
			CommonBase.add_ref_from(temporary_channel_id_hu_conv, this);
		this.temporary_channel_id = temporary_channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_OpenChannelRequest_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		this.funding_satoshis = bindings.LDKEvent_OpenChannelRequest_get_funding_satoshis(ptr);
		const channel_negotiation_type: bigint = bindings.LDKEvent_OpenChannelRequest_get_channel_negotiation_type(ptr);
		const channel_negotiation_type_hu_conv: InboundChannelFunds = InboundChannelFunds.constr_from_ptr(channel_negotiation_type);
			CommonBase.add_ref_from(channel_negotiation_type_hu_conv, this);
		this.channel_negotiation_type = channel_negotiation_type_hu_conv;
		const channel_type: bigint = bindings.LDKEvent_OpenChannelRequest_get_channel_type(ptr);
		const channel_type_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, channel_type);
			CommonBase.add_ref_from(channel_type_hu_conv, this);
		this.channel_type = channel_type_hu_conv;
		this.is_announced = bindings.LDKEvent_OpenChannelRequest_get_is_announced(ptr);
		const params: bigint = bindings.LDKEvent_OpenChannelRequest_get_params(ptr);
		const params_hu_conv: ChannelParameters = new ChannelParameters(null, params);
			CommonBase.add_ref_from(params_hu_conv, this);
		this.params = params_hu_conv;
	}
}
/** A Event of type HTLCHandlingFailed */
export class Event_HTLCHandlingFailed extends Event {
	/**
	 * The channel over which the HTLC was received.
	 */
	public prev_channel_id: ChannelId;
	/**
	 * The type of HTLC handling that failed.
	 */
	public failure_type: HTLCHandlingFailureType;
	/**
	 * The reason that the HTLC failed.
	 * 
	 * This field will be `None` only for objects serialized prior to LDK 0.2.0.
	 */
	public failure_reason: Option_HTLCHandlingFailureReasonZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const prev_channel_id: bigint = bindings.LDKEvent_HTLCHandlingFailed_get_prev_channel_id(ptr);
		const prev_channel_id_hu_conv: ChannelId = new ChannelId(null, prev_channel_id);
			CommonBase.add_ref_from(prev_channel_id_hu_conv, this);
		this.prev_channel_id = prev_channel_id_hu_conv;
		const failure_type: bigint = bindings.LDKEvent_HTLCHandlingFailed_get_failure_type(ptr);
		const failure_type_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(failure_type);
			CommonBase.add_ref_from(failure_type_hu_conv, this);
		this.failure_type = failure_type_hu_conv;
		const failure_reason: bigint = bindings.LDKEvent_HTLCHandlingFailed_get_failure_reason(ptr);
		const failure_reason_hu_conv: Option_HTLCHandlingFailureReasonZ = Option_HTLCHandlingFailureReasonZ.constr_from_ptr(failure_reason);
			CommonBase.add_ref_from(failure_reason_hu_conv, this);
		this.failure_reason = failure_reason_hu_conv;
	}
}
/** A Event of type BumpTransaction */
export class Event_BumpTransaction extends Event {
	public bump_transaction: BumpTransactionEvent;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const bump_transaction: bigint = bindings.LDKEvent_BumpTransaction_get_bump_transaction(ptr);
		const bump_transaction_hu_conv: BumpTransactionEvent = BumpTransactionEvent.constr_from_ptr(bump_transaction);
			CommonBase.add_ref_from(bump_transaction_hu_conv, this);
		this.bump_transaction = bump_transaction_hu_conv;
	}
}
/** A Event of type OnionMessageIntercepted */
export class Event_OnionMessageIntercepted extends Event {
	/**
	 * The node id of the offline peer.
	 */
	public peer_node_id: Uint8Array;
	/**
	 * The onion message intended to be forwarded to `peer_node_id`.
	 */
	public message: OnionMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const peer_node_id: number = bindings.LDKEvent_OnionMessageIntercepted_get_peer_node_id(ptr);
		const peer_node_id_conv: Uint8Array = bindings.decodeUint8Array(peer_node_id);
		this.peer_node_id = peer_node_id_conv;
		const message: bigint = bindings.LDKEvent_OnionMessageIntercepted_get_message(ptr);
		const message_hu_conv: OnionMessage = new OnionMessage(null, message);
			CommonBase.add_ref_from(message_hu_conv, this);
		this.message = message_hu_conv;
	}
}
/** A Event of type OnionMessagePeerConnected */
export class Event_OnionMessagePeerConnected extends Event {
	/**
	 * The node id of the peer we just connected to, who advertises support for
	 * onion messages.
	 */
	public peer_node_id: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const peer_node_id: number = bindings.LDKEvent_OnionMessagePeerConnected_get_peer_node_id(ptr);
		const peer_node_id_conv: Uint8Array = bindings.decodeUint8Array(peer_node_id);
		this.peer_node_id = peer_node_id_conv;
	}
}
/** A Event of type PersistStaticInvoice */
export class Event_PersistStaticInvoice extends Event {
	/**
	 * The invoice that should be persisted and later provided to payers when handling a future
	 * [`Event::StaticInvoiceRequested`].
	 */
	public invoice: StaticInvoice;
	/**
	 * The path to where invoice requests will be forwarded. If we receive an invoice
	 * request, we'll forward it to the async recipient over this path in case the
	 * recipient is online to provide a new invoice. This path should be persisted and
	 * later provided to [`ChannelManager::respond_to_static_invoice_request`].
	 * 
	 * This path's [`BlindedMessagePath::introduction_node`] MUST be set to our node or one of our
	 * peers. This is because, for DoS protection, invoice requests forwarded over this path are
	 * treated by our node like any other onion message forward and will not generate
	 * [`Event::ConnectionNeeded`] if the first hop in the path is not our peer.
	 * 
	 * If the next-hop peer in the path is offline, if configured to do so we will generate an
	 * [`Event::OnionMessageIntercepted`] for the invoice request.
	 * 
	 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
	 */
	public invoice_request_path: BlindedMessagePath;
	/**
	 * Useful for the recipient to replace a specific invoice stored by us as the static invoice
	 * server.
	 * 
	 * When this invoice and its metadata are persisted, this slot number should be included so if
	 * we receive another [`Event::PersistStaticInvoice`] containing the same slot number we can
	 * swap the existing invoice out for the new one.
	 */
	public invoice_slot: number;
	/**
	 * An identifier for the recipient, originally provided to
	 * [`ChannelManager::blinded_paths_for_async_recipient`].
	 * 
	 * When an [`Event::StaticInvoiceRequested`] comes in for the invoice, this id will be surfaced
	 * and can be used alongside the `invoice_slot` to retrieve the invoice from the database.
	 * 
	 * [`ChannelManager::blinded_paths_for_async_recipient`]: crate::ln::channelmanager::ChannelManager::blinded_paths_for_async_recipient
	 */
	public recipient_id: Uint8Array;
	/**
	 * Once the [`StaticInvoice`] and `invoice_slot` are persisted,
	 * [`ChannelManager::static_invoice_persisted`] should be called with this responder to confirm
	 * to the recipient that their [`Offer`] is ready to be used for async payments.
	 * 
	 * [`ChannelManager::static_invoice_persisted`]: crate::ln::channelmanager::ChannelManager::static_invoice_persisted
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public invoice_persisted_path: Responder;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const invoice: bigint = bindings.LDKEvent_PersistStaticInvoice_get_invoice(ptr);
		const invoice_hu_conv: StaticInvoice = new StaticInvoice(null, invoice);
			CommonBase.add_ref_from(invoice_hu_conv, this);
		this.invoice = invoice_hu_conv;
		const invoice_request_path: bigint = bindings.LDKEvent_PersistStaticInvoice_get_invoice_request_path(ptr);
		const invoice_request_path_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, invoice_request_path);
			CommonBase.add_ref_from(invoice_request_path_hu_conv, this);
		this.invoice_request_path = invoice_request_path_hu_conv;
		this.invoice_slot = bindings.LDKEvent_PersistStaticInvoice_get_invoice_slot(ptr);
		const recipient_id: number = bindings.LDKEvent_PersistStaticInvoice_get_recipient_id(ptr);
		const recipient_id_conv: Uint8Array = bindings.decodeUint8Array(recipient_id);
		this.recipient_id = recipient_id_conv;
		const invoice_persisted_path: bigint = bindings.LDKEvent_PersistStaticInvoice_get_invoice_persisted_path(ptr);
		const invoice_persisted_path_hu_conv: Responder = new Responder(null, invoice_persisted_path);
			CommonBase.add_ref_from(invoice_persisted_path_hu_conv, this);
		this.invoice_persisted_path = invoice_persisted_path_hu_conv;
	}
}
/** A Event of type StaticInvoiceRequested */
export class Event_StaticInvoiceRequested extends Event {
	/**
	 * An identifier for the recipient previously surfaced in
	 * [`Event::PersistStaticInvoice::recipient_id`]. Useful when paired with the `invoice_slot` to
	 * retrieve the [`StaticInvoice`] requested by the payer.
	 */
	public recipient_id: Uint8Array;
	/**
	 * The slot number for the invoice being requested, previously surfaced in
	 * [`Event::PersistStaticInvoice::invoice_slot`]. Useful when paired with the `recipient_id` to
	 * retrieve the [`StaticInvoice`] requested by the payer.
	 */
	public invoice_slot: number;
	/**
	 * The path over which the [`StaticInvoice`] will be sent to the payer, which should be
	 * provided to [`ChannelManager::respond_to_static_invoice_request`] along with the invoice.
	 * 
	 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
	 */
	public reply_path: Responder;
	/**
	 * The invoice request that will be forwarded to the async recipient to give the
	 * recipient a chance to provide an invoice in case it is online. It should be
	 * provided to [`ChannelManager::respond_to_static_invoice_request`].
	 * 
	 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
	 */
	public invoice_request: InvoiceRequest;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const recipient_id: number = bindings.LDKEvent_StaticInvoiceRequested_get_recipient_id(ptr);
		const recipient_id_conv: Uint8Array = bindings.decodeUint8Array(recipient_id);
		this.recipient_id = recipient_id_conv;
		this.invoice_slot = bindings.LDKEvent_StaticInvoiceRequested_get_invoice_slot(ptr);
		const reply_path: bigint = bindings.LDKEvent_StaticInvoiceRequested_get_reply_path(ptr);
		const reply_path_hu_conv: Responder = new Responder(null, reply_path);
			CommonBase.add_ref_from(reply_path_hu_conv, this);
		this.reply_path = reply_path_hu_conv;
		const invoice_request: bigint = bindings.LDKEvent_StaticInvoiceRequested_get_invoice_request(ptr);
		const invoice_request_hu_conv: InvoiceRequest = new InvoiceRequest(null, invoice_request);
			CommonBase.add_ref_from(invoice_request_hu_conv, this);
		this.invoice_request = invoice_request_hu_conv;
	}
}
/** A Event of type FundingTransactionReadyForSigning */
export class Event_FundingTransactionReadyForSigning extends Event {
	/**
	 * The `channel_id` of the channel which you'll need to pass back into
	 * [`ChannelManager::funding_transaction_signed`].
	 * 
	 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
	 */
	public channel_id: ChannelId;
	/**
	 * The counterparty's `node_id`, which you'll need to pass back into
	 * [`ChannelManager::funding_transaction_signed`].
	 * 
	 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The `user_channel_id` value passed in for outbound channels, or for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for inbound channels.
	 * 
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public user_channel_id: bigint;
	/**
	 * The unsigned transaction to be signed and passed back to
	 * [`ChannelManager::funding_transaction_signed`].
	 * 
	 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
	 */
	public unsigned_transaction: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKEvent_FundingTransactionReadyForSigning_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKEvent_FundingTransactionReadyForSigning_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const user_channel_id: number = bindings.LDKEvent_FundingTransactionReadyForSigning_get_user_channel_id(ptr);
		const user_channel_id_conv: bigint = bindings.decodeUint128(user_channel_id);
		this.user_channel_id = user_channel_id_conv;
		const unsigned_transaction: number = bindings.LDKEvent_FundingTransactionReadyForSigning_get_unsigned_transaction(ptr);
		const unsigned_transaction_conv: Uint8Array = bindings.decodeUint8Array(unsigned_transaction);
		this.unsigned_transaction = unsigned_transaction_conv;
	}
}
