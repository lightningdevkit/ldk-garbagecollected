
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A BOLT12 offers code and flow utility provider, which facilitates
 * BOLT12 builder generation and onion message handling.
 * 
 * [`OffersMessageFlow`] is parameterized by a [`MessageRouter`], which is responsible
 * for finding message paths when initiating and retrying onion messages.
 */
export class OffersMessageFlow extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OffersMessageFlow_free);
	}

	/**
	 * Creates a new [`OffersMessageFlow`]
	 */
	public static constructor_new(chain_hash: Uint8Array, best_block: BestBlock, our_network_pubkey: Uint8Array, current_timestamp: number, inbound_payment_key: ExpandedKey, receive_auth_key: ReceiveAuthKey, message_router: MessageRouter, logger: Logger): OffersMessageFlow {
		const ret: bigint = bindings.OffersMessageFlow_new(bindings.encodeUint8Array(chain_hash), CommonBase.get_ptr_of(best_block), bindings.encodeUint8Array(our_network_pubkey), current_timestamp, CommonBase.get_ptr_of(inbound_payment_key), CommonBase.get_ptr_of(receive_auth_key), CommonBase.get_ptr_of(message_router), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: OffersMessageFlow = new OffersMessageFlow(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, message_router);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * If we are an async recipient, on startup we'll interactively build offers and static invoices
	 * with an always-online node that will serve static invoices on our behalf. Once the offer is
	 * built and the static invoice is confirmed as persisted by the server, the underlying
	 * [`AsyncReceiveOfferCache`] should be persisted using
	 * [`Self::writeable_async_receive_offer_cache`] so we remember the offers we've built.
	 */
	public with_async_payments_offers_cache(async_receive_offer_cache: AsyncReceiveOfferCache): OffersMessageFlow {
		const ret: bigint = bindings.OffersMessageFlow_with_async_payments_offers_cache(this.ptr, CommonBase.get_ptr_of(async_receive_offer_cache));
		const ret_hu_conv: OffersMessageFlow = new OffersMessageFlow(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		CommonBase.add_ref_from(this, async_receive_offer_cache);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, async_receive_offer_cache is reset to null and is now a dummy object.
		CommonBase.set_null_skip_free(async_receive_offer_cache);;
		return ret_hu_conv;
	}

	/**
	 * Sets the [`BlindedMessagePath`]s that we will use as an async recipient to interactively build
	 * [`Offer`]s with a static invoice server, so the server can serve [`StaticInvoice`]s to payers
	 * on our behalf when we're offline.
	 * 
	 * This method will also send out messages initiating async offer creation to the static invoice
	 * server, if any peers are connected.
	 * 
	 * This method only needs to be called once when the server first takes on the recipient as a
	 * client, or when the paths change, e.g. if the paths are set to expire at a particular time.
	 */
	public set_paths_to_static_invoice_server(paths_to_static_invoice_server: BlindedMessagePath[], peers: MessageForwardNode[]): Result_NoneNoneZ {
		const ret: bigint = bindings.OffersMessageFlow_set_paths_to_static_invoice_server(this.ptr, bindings.encodeUint64Array(paths_to_static_invoice_server.map(paths_to_static_invoice_server_conv_20 => CommonBase.get_ptr_of(paths_to_static_invoice_server_conv_20))), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Notifies the [`OffersMessageFlow`] that a new block has been observed.
	 * 
	 * This allows the flow to keep in sync with the latest block timestamp,
	 * which may be used for time-sensitive operations.
	 * 
	 * Must be called whenever a new chain tip becomes available. May be skipped
	 * for intermediary blocks.
	 */
	public best_block_updated(header: Uint8Array, _height: number): void {
		bindings.OffersMessageFlow_best_block_updated(this.ptr, bindings.encodeUint8Array(header), _height);
	}

	/**
	 * [`BlindedMessagePath`]s for an async recipient to communicate with this node and interactively
	 * build [`Offer`]s and [`StaticInvoice`]s for receiving async payments.
	 * 
	 * If `relative_expiry` is unset, the [`BlindedMessagePath`]s will never expire.
	 * 
	 * Returns the paths that the recipient should be configured with via
	 * [`Self::set_paths_to_static_invoice_server`].
	 * 
	 * Errors if blinded path creation fails or the provided `recipient_id` is larger than 1KiB.
	 */
	public blinded_paths_for_async_recipient(recipient_id: Uint8Array, relative_expiry: Option_u64Z, peers: MessageForwardNode[]): Result_CVec_BlindedMessagePathZNoneZ {
		const ret: bigint = bindings.OffersMessageFlow_blinded_paths_for_async_recipient(this.ptr, bindings.encodeUint8Array(recipient_id), CommonBase.get_ptr_of(relative_expiry), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))));
		const ret_hu_conv: Result_CVec_BlindedMessagePathZNoneZ = Result_CVec_BlindedMessagePathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies an [`InvoiceRequest`] using the provided [`OffersContext`] or the [`InvoiceRequest::metadata`].
	 * 
	 * - If an [`OffersContext::InvoiceRequest`] with a `nonce` is provided, verification is performed using recipient context data.
	 * - If no context is provided but the [`InvoiceRequest`] contains [`Offer`] metadata, verification is performed using that metadata.
	 * - If neither is available, verification fails.
	 * 
	 * # Errors
	 * 
	 * Returns an error if:
	 * - Both [`OffersContext`] and [`InvoiceRequest`] metadata are absent or invalid.
	 * - The verification process (via recipient context data or metadata) fails.
	 */
	public verify_invoice_request(invoice_request: InvoiceRequest, context: Option_OffersContextZ): Result_InvreqResponseInstructionsNoneZ {
		const ret: bigint = bindings.OffersMessageFlow_verify_invoice_request(this.ptr, CommonBase.get_ptr_of(invoice_request), CommonBase.get_ptr_of(context));
		const ret_hu_conv: Result_InvreqResponseInstructionsNoneZ = Result_InvreqResponseInstructionsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies a [`Bolt12Invoice`] using the provided [`OffersContext`] or the invoice's payer metadata,
	 * returning the corresponding [`PaymentId`] if successful.
	 * 
	 * - If an [`OffersContext::OutboundPayment`] with a `nonce` is provided, verification is performed
	 * using this to form the payer metadata.
	 * - If no context is provided and the invoice corresponds to a [`Refund`] without blinded paths,
	 * verification is performed using the [`Bolt12Invoice::payer_metadata`].
	 * - If neither condition is met, verification fails.
	 */
	public verify_bolt12_invoice(invoice: Bolt12Invoice, context: Option_OffersContextZ): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.OffersMessageFlow_verify_bolt12_invoice(this.ptr, CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(context));
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies the provided [`AsyncPaymentsContext`] for an inbound [`HeldHtlcAvailable`] message.
	 * 
	 * Because blinded path contexts are verified as a part of onion message processing, this only
	 * validates that the context is not yet expired based on `path_absolute_expiry`.
	 * 
	 * # Errors
	 * 
	 * Returns `Err(())` if:
	 * - The inbound payment context has expired.
	 */
	public verify_inbound_async_payment_context(context: AsyncPaymentsContext): Result_NoneNoneZ {
		const ret: bigint = bindings.OffersMessageFlow_verify_inbound_async_payment_context(this.ptr, CommonBase.get_ptr_of(context));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a response for the provided [`VerifiedInvoiceRequest`].
	 * 
	 * A response can be either an [`OffersMessage::Invoice`] with additional [`MessageContext`],
	 * or an [`OffersMessage::InvoiceError`], depending on the [`InvoiceRequest`].
	 * 
	 * An [`OffersMessage::InvoiceError`] will be generated if:
	 * - We fail to generate valid payment paths to include in the [`Bolt12Invoice`].
	 * - We fail to generate a valid signed [`Bolt12Invoice`] for the [`InvoiceRequest`].
	 */
	public create_response_for_invoice_request(signer: NodeSigner, router: Router, entropy_source: EntropySource, invoice_request: VerifiedInvoiceRequest, amount_msats: bigint, payment_hash: Uint8Array, payment_secret: Uint8Array, usable_channels: ChannelDetails[]): TwoTuple_OffersMessageCOption_MessageContextZZ {
		const ret: bigint = bindings.OffersMessageFlow_create_response_for_invoice_request(this.ptr, CommonBase.get_ptr_of(signer), CommonBase.get_ptr_of(router), CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(invoice_request), amount_msats, bindings.encodeUint8Array(payment_hash), bindings.encodeUint8Array(payment_secret), bindings.encodeUint64Array(usable_channels.map(usable_channels_conv_16 => CommonBase.get_ptr_of(usable_channels_conv_16))));
		const ret_hu_conv: TwoTuple_OffersMessageCOption_MessageContextZZ = new TwoTuple_OffersMessageCOption_MessageContextZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		CommonBase.add_ref_from(this, signer);
		CommonBase.add_ref_from(this, router);
		CommonBase.add_ref_from(this, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Enqueues the created [`InvoiceRequest`] to be sent to the counterparty.
	 * 
	 * # Payment
	 * 
	 * The provided `payment_id` is used to create a unique [`MessageContext`] for the
	 * blinded paths sent to the counterparty. This allows them to respond with an invoice,
	 * over those blinded paths, which can be verified against the intended outbound payment,
	 * ensuring the invoice corresponds to a payment we actually want to make.
	 * 
	 * # Nonce
	 * The nonce is used to create a unique [`MessageContext`] for the reply paths.
	 * These will be used to verify the corresponding [`Bolt12Invoice`] when it is received.
	 * 
	 * Note: The provided [`Nonce`] MUST be the same as the [`Nonce`] used for creating the
	 * [`InvoiceRequest`] to ensure correct verification of the corresponding [`Bolt12Invoice`].
	 * 
	 * See [`OffersMessageFlow::create_invoice_request_builder`] for more details.
	 * 
	 * # Peers
	 * 
	 * The user must provide a list of [`MessageForwardNode`] that will be used to generate
	 * valid reply paths for the counterparty to send back the corresponding [`Bolt12Invoice`]
	 * or [`InvoiceError`].
	 * 
	 * [`supports_onion_messages`]: crate::types::features::Features::supports_onion_messages
	 */
	public enqueue_invoice_request(invoice_request: InvoiceRequest, payment_id: Uint8Array, nonce: Nonce, peers: MessageForwardNode[]): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.OffersMessageFlow_enqueue_invoice_request(this.ptr, CommonBase.get_ptr_of(invoice_request), bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(nonce), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Enqueues the created [`Bolt12Invoice`] corresponding to a [`Refund`] to be sent
	 * to the counterparty.
	 * 
	 * # Peers
	 * 
	 * The user must provide a list of [`MessageForwardNode`] that will be used to generate valid
	 * reply paths for the counterparty to send back the corresponding [`InvoiceError`] if we fail
	 * to create blinded reply paths
	 * 
	 * [`supports_onion_messages`]: crate::types::features::Features::supports_onion_messages
	 */
	public enqueue_invoice(invoice: Bolt12Invoice, refund: Refund, peers: MessageForwardNode[]): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.OffersMessageFlow_enqueue_invoice(this.ptr, CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(refund), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Forwards a [`StaticInvoice`] over the provided [`Responder`] in response to an
	 * [`InvoiceRequest`] that we as a static invoice server received on behalf of an often-offline
	 * recipient.
	 */
	public enqueue_static_invoice(invoice: StaticInvoice, responder: Responder): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.OffersMessageFlow_enqueue_static_invoice(this.ptr, CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Forwards an [`InvoiceRequest`] to the specified [`BlindedMessagePath`]. If we receive an
	 * invoice request as a static invoice server on behalf of an often-offline recipient this
	 * can be used to forward the request to give the recipient a chance to provide an
	 * invoice if the recipient is online. The reply_path [`Responder`] provided is the path to
	 * the sender where the recipient can send the invoice.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 * [`Responder`]: crate::onion_message::messenger::Responder
	 */
	public enqueue_invoice_request_to_forward(invoice_request: InvoiceRequest, destination: BlindedMessagePath, reply_path: Responder): void {
		bindings.OffersMessageFlow_enqueue_invoice_request_to_forward(this.ptr, CommonBase.get_ptr_of(invoice_request), CommonBase.get_ptr_of(destination), CommonBase.get_ptr_of(reply_path));
	}

	/**
	 * Enqueues `held_htlc_available` onion messages to be sent to the payee via the reply paths
	 * contained within the provided [`StaticInvoice`].
	 * 
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 * [`supports_onion_messages`]: crate::types::features::Features::supports_onion_messages
	 */
	public enqueue_held_htlc_available(invoice: StaticInvoice, reply_path_params: HeldHtlcReplyPath): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.OffersMessageFlow_enqueue_held_htlc_available(this.ptr, CommonBase.get_ptr_of(invoice), CommonBase.get_ptr_of(reply_path_params));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * If we are holding an HTLC on behalf of an often-offline sender, this method allows us to
	 * create a path for the sender to use as the reply path when they send the recipient a
	 * [`HeldHtlcAvailable`] onion message, so the recipient's [`ReleaseHeldHtlc`] response will be
	 * received to our node.
	 * 
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 */
	public path_for_release_held_htlc(intercept_id: Uint8Array, prev_outbound_scid_alias: bigint, htlc_id: bigint, entropy: EntropySource): BlindedMessagePath {
		const ret: bigint = bindings.OffersMessageFlow_path_for_release_held_htlc(this.ptr, bindings.encodeUint8Array(intercept_id), prev_outbound_scid_alias, htlc_id, CommonBase.get_ptr_of(entropy));
		const ret_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		CommonBase.add_ref_from(this, entropy);
		return ret_hu_conv;
	}

	/**
	 * Enqueues the created [`DNSSECQuery`] to be sent to the counterparty.
	 * 
	 * # Peers
	 * 
	 * The user must provide a list of [`MessageForwardNode`] that will be used to generate
	 * valid reply paths for the counterparty to send back the corresponding response for
	 * the [`DNSSECQuery`] message.
	 * 
	 * [`supports_onion_messages`]: crate::types::features::Features::supports_onion_messages
	 */
	public enqueue_dns_onion_message(message: DNSSECQuery, context: DNSResolverContext, dns_resolvers: Destination[], peers: MessageForwardNode[]): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.OffersMessageFlow_enqueue_dns_onion_message(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context), bindings.encodeUint64Array(dns_resolvers.map(dns_resolvers_conv_13 => CommonBase.get_ptr_of(dns_resolvers_conv_13))), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the enqueued [`OffersMessage`] with their corresponding [`MessageSendInstructions`].
	 */
	public release_pending_offers_messages(): TwoTuple_OffersMessageMessageSendInstructionsZ[] {
		const ret: number = bindings.OffersMessageFlow_release_pending_offers_messages(this.ptr);
		const ret_conv_48_len: number = bindings.getArrayLength(ret);
		const ret_conv_48_arr: TwoTuple_OffersMessageMessageSendInstructionsZ[] = new Array(ret_conv_48_len).fill(null);
		for (var w = 0; w < ret_conv_48_len; w++) {
			const ret_conv_48: bigint = bindings.getU64ArrayElem(ret, w);
			const ret_conv_48_hu_conv: TwoTuple_OffersMessageMessageSendInstructionsZ = new TwoTuple_OffersMessageMessageSendInstructionsZ(null, ret_conv_48);
			CommonBase.add_ref_from(ret_conv_48_hu_conv, this);
			ret_conv_48_arr[w] = ret_conv_48_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_48_arr;
	}

	/**
	 * Gets the enqueued [`AsyncPaymentsMessage`] with their corresponding [`MessageSendInstructions`].
	 */
	public release_pending_async_messages(): TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[] {
		const ret: number = bindings.OffersMessageFlow_release_pending_async_messages(this.ptr);
		const ret_conv_55_len: number = bindings.getArrayLength(ret);
		const ret_conv_55_arr: TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[] = new Array(ret_conv_55_len).fill(null);
		for (var d = 0; d < ret_conv_55_len; d++) {
			const ret_conv_55: bigint = bindings.getU64ArrayElem(ret, d);
			const ret_conv_55_hu_conv: TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ = new TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ(null, ret_conv_55);
			CommonBase.add_ref_from(ret_conv_55_hu_conv, this);
			ret_conv_55_arr[d] = ret_conv_55_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_55_arr;
	}

	/**
	 * Gets the enqueued [`DNSResolverMessage`] with their corresponding [`MessageSendInstructions`].
	 */
	public release_pending_dns_messages(): TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] {
		const ret: number = bindings.OffersMessageFlow_release_pending_dns_messages(this.ptr);
		const ret_conv_53_len: number = bindings.getArrayLength(ret);
		const ret_conv_53_arr: TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] = new Array(ret_conv_53_len).fill(null);
		for (var b = 0; b < ret_conv_53_len; b++) {
			const ret_conv_53: bigint = bindings.getU64ArrayElem(ret, b);
			const ret_conv_53_hu_conv: TwoTuple_DNSResolverMessageMessageSendInstructionsZ = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ(null, ret_conv_53);
			CommonBase.add_ref_from(ret_conv_53_hu_conv, this);
			ret_conv_53_arr[b] = ret_conv_53_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_53_arr;
	}

	/**
	 * Retrieve an [`Offer`] for receiving async payments as an often-offline recipient. Will only
	 * return an offer if [`Self::set_paths_to_static_invoice_server`] was called and we succeeded in
	 * interactively building a [`StaticInvoice`] with the static invoice server.
	 * 
	 * Returns the requested offer as well as a bool indicating whether the cache needs to be
	 * persisted using [`Self::writeable_async_receive_offer_cache`].
	 */
	public get_async_receive_offer(): Result_C2Tuple_OfferboolZNoneZ {
		const ret: bigint = bindings.OffersMessageFlow_get_async_receive_offer(this.ptr);
		const ret_hu_conv: Result_C2Tuple_OfferboolZNoneZ = Result_C2Tuple_OfferboolZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sends out [`OfferPathsRequest`] and [`ServeStaticInvoice`] onion messages if we are an
	 * often-offline recipient and are configured to interactively build offers and static invoices
	 * with a static invoice server.
	 * 
	 * # Usage
	 * 
	 * This method should be called on peer connection and once per minute or so, to keep the offers
	 * cache updated. When calling this method once per minute, SHOULD set `timer_tick_occurred` so
	 * the cache can self-regulate the number of messages sent out.
	 * 
	 * Errors if we failed to create blinded reply paths when sending an [`OfferPathsRequest`] message.
	 */
	public check_refresh_async_receive_offer_cache(peers: MessageForwardNode[], usable_channels: ChannelDetails[], entropy: EntropySource, router: Router, timer_tick_occurred: boolean): Result_NoneNoneZ {
		const ret: bigint = bindings.OffersMessageFlow_check_refresh_async_receive_offer_cache(this.ptr, bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))), bindings.encodeUint64Array(usable_channels.map(usable_channels_conv_16 => CommonBase.get_ptr_of(usable_channels_conv_16))), CommonBase.get_ptr_of(entropy), CommonBase.get_ptr_of(router), timer_tick_occurred);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, entropy);
		CommonBase.add_ref_from(this, router);
		return ret_hu_conv;
	}

	/**
	 * Handles an incoming [`OfferPathsRequest`] onion message from an often-offline recipient who
	 * wants us (the static invoice server) to serve [`StaticInvoice`]s to payers on their behalf.
	 * Sends out [`OfferPaths`] onion messages in response.
	 */
	public handle_offer_paths_request(request: OfferPathsRequest, context: AsyncPaymentsContext, peers: MessageForwardNode[]): Option_C2Tuple_OfferPathsMessageContextZZ {
		const ret: bigint = bindings.OffersMessageFlow_handle_offer_paths_request(this.ptr, CommonBase.get_ptr_of(request), CommonBase.get_ptr_of(context), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))));
		const ret_hu_conv: Option_C2Tuple_OfferPathsMessageContextZZ = Option_C2Tuple_OfferPathsMessageContextZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Handles an incoming [`OfferPaths`] message from the static invoice server, sending out
	 * [`ServeStaticInvoice`] onion messages in response if we've built a new async receive offer and
	 * need the corresponding [`StaticInvoice`] to be persisted by the static invoice server.
	 * 
	 * Returns `None` if we have enough offers cached already, verification of `message` fails, or we
	 * fail to create blinded paths.
	 */
	public handle_offer_paths(message: OfferPaths, context: AsyncPaymentsContext, responder: Responder, peers: MessageForwardNode[], usable_channels: ChannelDetails[], entropy: EntropySource, router: Router): Option_C2Tuple_ServeStaticInvoiceMessageContextZZ {
		const ret: bigint = bindings.OffersMessageFlow_handle_offer_paths(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context), CommonBase.get_ptr_of(responder), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))), bindings.encodeUint64Array(usable_channels.map(usable_channels_conv_16 => CommonBase.get_ptr_of(usable_channels_conv_16))), CommonBase.get_ptr_of(entropy), CommonBase.get_ptr_of(router));
		const ret_hu_conv: Option_C2Tuple_ServeStaticInvoiceMessageContextZZ = Option_C2Tuple_ServeStaticInvoiceMessageContextZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		CommonBase.add_ref_from(this, entropy);
		CommonBase.add_ref_from(this, router);
		return ret_hu_conv;
	}

	/**
	 * Verifies an incoming [`ServeStaticInvoice`] onion message from an often-offline recipient who
	 * wants us as a static invoice server to serve the [`ServeStaticInvoice::invoice`] to payers on
	 * their behalf.
	 * 
	 * On success, returns `(recipient_id, invoice_slot)` for use in persisting and later retrieving
	 * the static invoice from the database.
	 * 
	 * Errors if the [`ServeStaticInvoice::invoice`] is expired or larger than
	 * [`MAX_STATIC_INVOICE_SIZE_BYTES`].
	 * 
	 * [`ServeStaticInvoice::invoice`]: crate::onion_message::async_payments::ServeStaticInvoice::invoice
	 */
	public verify_serve_static_invoice_message(message: ServeStaticInvoice, context: AsyncPaymentsContext): Result_C2Tuple_CVec_u8Zu16ZNoneZ {
		const ret: bigint = bindings.OffersMessageFlow_verify_serve_static_invoice_message(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context));
		const ret_hu_conv: Result_C2Tuple_CVec_u8Zu16ZNoneZ = Result_C2Tuple_CVec_u8Zu16ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Indicates that a [`ServeStaticInvoice::invoice`] has been persisted and is ready to be served
	 * to payers on behalf of an often-offline recipient. This method must be called after persisting
	 * a [`StaticInvoice`] to confirm to the recipient that their corresponding [`Offer`] is ready to
	 * receive async payments.
	 */
	public static_invoice_persisted(responder: Responder): void {
		bindings.OffersMessageFlow_static_invoice_persisted(this.ptr, CommonBase.get_ptr_of(responder));
	}

	/**
	 * Handles an incoming [`StaticInvoicePersisted`] onion message from the static invoice server.
	 * Returns a bool indicating whether the async receive offer cache needs to be re-persisted using
	 * [`Self::writeable_async_receive_offer_cache`].
	 * 
	 * [`StaticInvoicePersisted`]: crate::onion_message::async_payments::StaticInvoicePersisted
	 */
	public handle_static_invoice_persisted(context: AsyncPaymentsContext): boolean {
		const ret: boolean = bindings.OffersMessageFlow_handle_static_invoice_persisted(this.ptr, CommonBase.get_ptr_of(context));
		return ret;
	}

	/**
	 * Get the encoded [`AsyncReceiveOfferCache`] for persistence.
	 */
	public writeable_async_receive_offer_cache(): Uint8Array {
		const ret: number = bindings.OffersMessageFlow_writeable_async_receive_offer_cache(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
