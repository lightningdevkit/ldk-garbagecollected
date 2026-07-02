package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A BOLT12 offers code and flow utility provider, which facilitates
 * BOLT12 builder generation and onion message handling.
 * 
 * [`OffersMessageFlow`] is parameterized by a [`MessageRouter`], which is responsible
 * for finding message paths when initiating and retrying onion messages.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OffersMessageFlow extends CommonBase {
	OffersMessageFlow(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OffersMessageFlow_free(ptr); }
	}

	/**
	 * Creates a new [`OffersMessageFlow`]
	 */
	public static OffersMessageFlow of(byte[] chain_hash, org.ldk.structs.BestBlock best_block, byte[] our_network_pubkey, int current_timestamp, org.ldk.structs.ExpandedKey inbound_payment_key, org.ldk.structs.ReceiveAuthKey receive_auth_key, org.ldk.structs.MessageRouter message_router, org.ldk.structs.Logger logger) {
		long ret = bindings.OffersMessageFlow_new(InternalUtils.check_arr_len(chain_hash, 32), best_block.ptr, InternalUtils.check_arr_len(our_network_pubkey, 33), current_timestamp, inbound_payment_key.ptr, receive_auth_key.ptr, message_router.ptr, logger.ptr);
		Reference.reachabilityFence(chain_hash);
		Reference.reachabilityFence(best_block);
		Reference.reachabilityFence(our_network_pubkey);
		Reference.reachabilityFence(current_timestamp);
		Reference.reachabilityFence(inbound_payment_key);
		Reference.reachabilityFence(receive_auth_key);
		Reference.reachabilityFence(message_router);
		Reference.reachabilityFence(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OffersMessageFlow ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OffersMessageFlow(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(message_router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		return ret_hu_conv;
	}

	/**
	 * If we are an async recipient, on startup we'll interactively build offers and static invoices
	 * with an always-online node that will serve static invoices on our behalf. Once the offer is
	 * built and the static invoice is confirmed as persisted by the server, the underlying
	 * [`AsyncReceiveOfferCache`] should be persisted using
	 * [`Self::writeable_async_receive_offer_cache`] so we remember the offers we've built.
	 */
	public OffersMessageFlow with_async_payments_offers_cache(org.ldk.structs.AsyncReceiveOfferCache async_receive_offer_cache) {
		long ret = bindings.OffersMessageFlow_with_async_payments_offers_cache(this.ptr, async_receive_offer_cache.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(async_receive_offer_cache);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OffersMessageFlow ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OffersMessageFlow(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(async_receive_offer_cache); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, async_receive_offer_cache is reset to null and is now a dummy object.
		async_receive_offer_cache.ptr = 0;;
		if (this != null) { this.ptrs_to.add(this); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, this is reset to null and is now a dummy object.
		this.ptr = 0;;
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
	public Result_NoneNoneZ set_paths_to_static_invoice_server(BlindedMessagePath[] paths_to_static_invoice_server, MessageForwardNode[] peers) {
		long ret = bindings.OffersMessageFlow_set_paths_to_static_invoice_server(this.ptr, paths_to_static_invoice_server != null ? Arrays.stream(paths_to_static_invoice_server).mapToLong(paths_to_static_invoice_server_conv_20 -> paths_to_static_invoice_server_conv_20.ptr).toArray() : null, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(paths_to_static_invoice_server);
		Reference.reachabilityFence(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
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
	public void best_block_updated(byte[] header, int height) {
		bindings.OffersMessageFlow_best_block_updated(this.ptr, InternalUtils.check_arr_len(header, 80), height);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(header);
		Reference.reachabilityFence(height);
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
	public Result_CVec_BlindedMessagePathZNoneZ blinded_paths_for_async_recipient(byte[] recipient_id, org.ldk.structs.Option_u64Z relative_expiry, MessageForwardNode[] peers) {
		long ret = bindings.OffersMessageFlow_blinded_paths_for_async_recipient(this.ptr, recipient_id, relative_expiry.ptr, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(recipient_id);
		Reference.reachabilityFence(relative_expiry);
		Reference.reachabilityFence(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_BlindedMessagePathZNoneZ ret_hu_conv = Result_CVec_BlindedMessagePathZNoneZ.constr_from_ptr(ret);
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
	public Result_InvreqResponseInstructionsNoneZ verify_invoice_request(org.ldk.structs.InvoiceRequest invoice_request, org.ldk.structs.Option_OffersContextZ context) {
		long ret = bindings.OffersMessageFlow_verify_invoice_request(this.ptr, invoice_request.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice_request);
		Reference.reachabilityFence(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvreqResponseInstructionsNoneZ ret_hu_conv = Result_InvreqResponseInstructionsNoneZ.constr_from_ptr(ret);
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
	public Result_ThirtyTwoBytesNoneZ verify_bolt12_invoice(org.ldk.structs.Bolt12Invoice invoice, org.ldk.structs.Option_OffersContextZ context) {
		long ret = bindings.OffersMessageFlow_verify_bolt12_invoice(this.ptr, invoice.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice);
		Reference.reachabilityFence(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
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
	public Result_NoneNoneZ verify_inbound_async_payment_context(org.ldk.structs.AsyncPaymentsContext context) {
		long ret = bindings.OffersMessageFlow_verify_inbound_async_payment_context(this.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
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
	public TwoTuple_OffersMessageCOption_MessageContextZZ create_response_for_invoice_request(org.ldk.structs.NodeSigner signer, org.ldk.structs.Router router, org.ldk.structs.EntropySource entropy_source, org.ldk.structs.VerifiedInvoiceRequest invoice_request, long amount_msats, byte[] payment_hash, byte[] payment_secret, ChannelDetails[] usable_channels) {
		long ret = bindings.OffersMessageFlow_create_response_for_invoice_request(this.ptr, signer.ptr, router.ptr, entropy_source.ptr, invoice_request.ptr, amount_msats, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_secret, 32), usable_channels != null ? Arrays.stream(usable_channels).mapToLong(usable_channels_conv_16 -> usable_channels_conv_16.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(signer);
		Reference.reachabilityFence(router);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(invoice_request);
		Reference.reachabilityFence(amount_msats);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(payment_secret);
		Reference.reachabilityFence(usable_channels);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OffersMessageCOption_MessageContextZZ ret_hu_conv = new TwoTuple_OffersMessageCOption_MessageContextZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(signer); };
		if (this != null) { this.ptrs_to.add(router); };
		if (this != null) { this.ptrs_to.add(entropy_source); };
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
	public Result_NoneBolt12SemanticErrorZ enqueue_invoice_request(org.ldk.structs.InvoiceRequest invoice_request, byte[] payment_id, org.ldk.structs.Nonce nonce, MessageForwardNode[] peers) {
		long ret = bindings.OffersMessageFlow_enqueue_invoice_request(this.ptr, invoice_request.ptr, InternalUtils.check_arr_len(payment_id, 32), nonce.ptr, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice_request);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(nonce);
		Reference.reachabilityFence(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt12SemanticErrorZ ret_hu_conv = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
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
	public Result_NoneBolt12SemanticErrorZ enqueue_invoice(org.ldk.structs.Bolt12Invoice invoice, org.ldk.structs.Refund refund, MessageForwardNode[] peers) {
		long ret = bindings.OffersMessageFlow_enqueue_invoice(this.ptr, invoice.ptr, refund.ptr, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice);
		Reference.reachabilityFence(refund);
		Reference.reachabilityFence(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt12SemanticErrorZ ret_hu_conv = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Forwards a [`StaticInvoice`] over the provided [`Responder`] in response to an
	 * [`InvoiceRequest`] that we as a static invoice server received on behalf of an often-offline
	 * recipient.
	 */
	public Result_NoneBolt12SemanticErrorZ enqueue_static_invoice(org.ldk.structs.StaticInvoice invoice, org.ldk.structs.Responder responder) {
		long ret = bindings.OffersMessageFlow_enqueue_static_invoice(this.ptr, invoice.ptr, responder.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice);
		Reference.reachabilityFence(responder);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt12SemanticErrorZ ret_hu_conv = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
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
	public void enqueue_invoice_request_to_forward(org.ldk.structs.InvoiceRequest invoice_request, org.ldk.structs.BlindedMessagePath destination, org.ldk.structs.Responder reply_path) {
		bindings.OffersMessageFlow_enqueue_invoice_request_to_forward(this.ptr, invoice_request.ptr, destination.ptr, reply_path.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice_request);
		Reference.reachabilityFence(destination);
		Reference.reachabilityFence(reply_path);
	}

	/**
	 * Enqueues `held_htlc_available` onion messages to be sent to the payee via the reply paths
	 * contained within the provided [`StaticInvoice`].
	 * 
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 * [`supports_onion_messages`]: crate::types::features::Features::supports_onion_messages
	 */
	public Result_NoneBolt12SemanticErrorZ enqueue_held_htlc_available(org.ldk.structs.StaticInvoice invoice, org.ldk.structs.HeldHtlcReplyPath reply_path_params) {
		long ret = bindings.OffersMessageFlow_enqueue_held_htlc_available(this.ptr, invoice.ptr, reply_path_params.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice);
		Reference.reachabilityFence(reply_path_params);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt12SemanticErrorZ ret_hu_conv = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
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
	public BlindedMessagePath path_for_release_held_htlc(byte[] intercept_id, long prev_outbound_scid_alias, long htlc_id, org.ldk.structs.EntropySource entropy) {
		long ret = bindings.OffersMessageFlow_path_for_release_held_htlc(this.ptr, InternalUtils.check_arr_len(intercept_id, 32), prev_outbound_scid_alias, htlc_id, entropy.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(intercept_id);
		Reference.reachabilityFence(prev_outbound_scid_alias);
		Reference.reachabilityFence(htlc_id);
		Reference.reachabilityFence(entropy);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(entropy); };
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
	public Result_NoneBolt12SemanticErrorZ enqueue_dns_onion_message(org.ldk.structs.DNSSECQuery message, org.ldk.structs.DNSResolverContext context, Destination[] dns_resolvers, MessageForwardNode[] peers) {
		long ret = bindings.OffersMessageFlow_enqueue_dns_onion_message(this.ptr, message.ptr, context.ptr, dns_resolvers != null ? Arrays.stream(dns_resolvers).mapToLong(dns_resolvers_conv_13 -> dns_resolvers_conv_13.ptr).toArray() : null, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(dns_resolvers);
		Reference.reachabilityFence(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt12SemanticErrorZ ret_hu_conv = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the enqueued [`OffersMessage`] with their corresponding [`MessageSendInstructions`].
	 */
	public TwoTuple_OffersMessageMessageSendInstructionsZ[] release_pending_offers_messages() {
		long[] ret = bindings.OffersMessageFlow_release_pending_offers_messages(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_48_len = ret.length;
		TwoTuple_OffersMessageMessageSendInstructionsZ[] ret_conv_48_arr = new TwoTuple_OffersMessageMessageSendInstructionsZ[ret_conv_48_len];
		for (int w = 0; w < ret_conv_48_len; w++) {
			long ret_conv_48 = ret[w];
			TwoTuple_OffersMessageMessageSendInstructionsZ ret_conv_48_hu_conv = new TwoTuple_OffersMessageMessageSendInstructionsZ(null, ret_conv_48);
			if (ret_conv_48_hu_conv != null) { ret_conv_48_hu_conv.ptrs_to.add(this); };
			ret_conv_48_arr[w] = ret_conv_48_hu_conv;
		}
		return ret_conv_48_arr;
	}

	/**
	 * Gets the enqueued [`AsyncPaymentsMessage`] with their corresponding [`MessageSendInstructions`].
	 */
	public TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[] release_pending_async_messages() {
		long[] ret = bindings.OffersMessageFlow_release_pending_async_messages(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_55_len = ret.length;
		TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[] ret_conv_55_arr = new TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[ret_conv_55_len];
		for (int d = 0; d < ret_conv_55_len; d++) {
			long ret_conv_55 = ret[d];
			TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ ret_conv_55_hu_conv = new TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ(null, ret_conv_55);
			if (ret_conv_55_hu_conv != null) { ret_conv_55_hu_conv.ptrs_to.add(this); };
			ret_conv_55_arr[d] = ret_conv_55_hu_conv;
		}
		return ret_conv_55_arr;
	}

	/**
	 * Gets the enqueued [`DNSResolverMessage`] with their corresponding [`MessageSendInstructions`].
	 */
	public TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] release_pending_dns_messages() {
		long[] ret = bindings.OffersMessageFlow_release_pending_dns_messages(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_53_len = ret.length;
		TwoTuple_DNSResolverMessageMessageSendInstructionsZ[] ret_conv_53_arr = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ[ret_conv_53_len];
		for (int b = 0; b < ret_conv_53_len; b++) {
			long ret_conv_53 = ret[b];
			TwoTuple_DNSResolverMessageMessageSendInstructionsZ ret_conv_53_hu_conv = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ(null, ret_conv_53);
			if (ret_conv_53_hu_conv != null) { ret_conv_53_hu_conv.ptrs_to.add(this); };
			ret_conv_53_arr[b] = ret_conv_53_hu_conv;
		}
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
	public Result_C2Tuple_OfferboolZNoneZ get_async_receive_offer() {
		long ret = bindings.OffersMessageFlow_get_async_receive_offer(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_OfferboolZNoneZ ret_hu_conv = Result_C2Tuple_OfferboolZNoneZ.constr_from_ptr(ret);
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
	public Result_NoneNoneZ check_refresh_async_receive_offer_cache(MessageForwardNode[] peers, ChannelDetails[] usable_channels, org.ldk.structs.EntropySource entropy, org.ldk.structs.Router router, boolean timer_tick_occurred) {
		long ret = bindings.OffersMessageFlow_check_refresh_async_receive_offer_cache(this.ptr, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null, usable_channels != null ? Arrays.stream(usable_channels).mapToLong(usable_channels_conv_16 -> usable_channels_conv_16.ptr).toArray() : null, entropy.ptr, router.ptr, timer_tick_occurred);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(peers);
		Reference.reachabilityFence(usable_channels);
		Reference.reachabilityFence(entropy);
		Reference.reachabilityFence(router);
		Reference.reachabilityFence(timer_tick_occurred);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(entropy); };
		if (this != null) { this.ptrs_to.add(router); };
		return ret_hu_conv;
	}

	/**
	 * Handles an incoming [`OfferPathsRequest`] onion message from an often-offline recipient who
	 * wants us (the static invoice server) to serve [`StaticInvoice`]s to payers on their behalf.
	 * Sends out [`OfferPaths`] onion messages in response.
	 */
	public Option_C2Tuple_OfferPathsMessageContextZZ handle_offer_paths_request(org.ldk.structs.OfferPathsRequest request, org.ldk.structs.AsyncPaymentsContext context, MessageForwardNode[] peers) {
		long ret = bindings.OffersMessageFlow_handle_offer_paths_request(this.ptr, request.ptr, context.ptr, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(request);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_OfferPathsMessageContextZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_OfferPathsMessageContextZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public Option_C2Tuple_ServeStaticInvoiceMessageContextZZ handle_offer_paths(org.ldk.structs.OfferPaths message, org.ldk.structs.AsyncPaymentsContext context, org.ldk.structs.Responder responder, MessageForwardNode[] peers, ChannelDetails[] usable_channels, org.ldk.structs.EntropySource entropy, org.ldk.structs.Router router) {
		long ret = bindings.OffersMessageFlow_handle_offer_paths(this.ptr, message.ptr, context.ptr, responder.ptr, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null, usable_channels != null ? Arrays.stream(usable_channels).mapToLong(usable_channels_conv_16 -> usable_channels_conv_16.ptr).toArray() : null, entropy.ptr, router.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(responder);
		Reference.reachabilityFence(peers);
		Reference.reachabilityFence(usable_channels);
		Reference.reachabilityFence(entropy);
		Reference.reachabilityFence(router);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_ServeStaticInvoiceMessageContextZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_ServeStaticInvoiceMessageContextZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(entropy); };
		if (this != null) { this.ptrs_to.add(router); };
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
	public Result_C2Tuple_CVec_u8Zu16ZNoneZ verify_serve_static_invoice_message(org.ldk.structs.ServeStaticInvoice message, org.ldk.structs.AsyncPaymentsContext context) {
		long ret = bindings.OffersMessageFlow_verify_serve_static_invoice_message(this.ptr, message.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_CVec_u8Zu16ZNoneZ ret_hu_conv = Result_C2Tuple_CVec_u8Zu16ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Indicates that a [`ServeStaticInvoice::invoice`] has been persisted and is ready to be served
	 * to payers on behalf of an often-offline recipient. This method must be called after persisting
	 * a [`StaticInvoice`] to confirm to the recipient that their corresponding [`Offer`] is ready to
	 * receive async payments.
	 */
	public void static_invoice_persisted(org.ldk.structs.Responder responder) {
		bindings.OffersMessageFlow_static_invoice_persisted(this.ptr, responder.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(responder);
	}

	/**
	 * Handles an incoming [`StaticInvoicePersisted`] onion message from the static invoice server.
	 * Returns a bool indicating whether the async receive offer cache needs to be re-persisted using
	 * [`Self::writeable_async_receive_offer_cache`].
	 * 
	 * [`StaticInvoicePersisted`]: crate::onion_message::async_payments::StaticInvoicePersisted
	 */
	public boolean handle_static_invoice_persisted(org.ldk.structs.AsyncPaymentsContext context) {
		boolean ret = bindings.OffersMessageFlow_handle_static_invoice_persisted(this.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(context);
		return ret;
	}

	/**
	 * Get the encoded [`AsyncReceiveOfferCache`] for persistence.
	 */
	public byte[] writeable_async_receive_offer_cache() {
		byte[] ret = bindings.OffersMessageFlow_writeable_async_receive_offer_cache(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
