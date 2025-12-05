package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A sender, receiver and forwarder of [`OnionMessage`]s.
 * 
 * # Handling Messages
 * 
 * `OnionMessenger` implements [`OnionMessageHandler`], making it responsible for either forwarding
 * messages to peers or delegating to the appropriate handler for the message type. Currently, the
 * available handlers are:
 * [`OffersMessageHandler`], for responding to [`InvoiceRequest`]s and paying [`Bolt12Invoice`]s
 * [`CustomOnionMessageHandler`], for handling user-defined message types
 * 
 * # Sending Messages
 * 
 * [`OnionMessage`]s are sent initially using [`OnionMessenger::send_onion_message`]. When handling
 * a message, the matched handler may return a response message which `OnionMessenger` will send
 * on its behalf.
 * 
 * # Example
 * 
 * ```
 * # extern crate bitcoin;
 * # use bitcoin::hashes::_export::_core::time::Duration;
 * # use bitcoin::hex::FromHex;
 * # use bitcoin::secp256k1::{PublicKey, Secp256k1, SecretKey, self};
 * # use lightning::blinded_path::EmptyNodeIdLookUp;
 * # use lightning::blinded_path::message::{BlindedMessagePath, MessageForwardNode, MessageContext};
 * # use lightning::sign::{EntropySource, KeysManager};
 * # use lightning::ln::peer_handler::IgnoringMessageHandler;
 * # use lightning::onion_message::messenger::{Destination, MessageRouter, MessageSendInstructions, OnionMessagePath, OnionMessenger};
 * # use lightning::onion_message::packet::OnionMessageContents;
 * # use lightning::sign::{NodeSigner, ReceiveAuthKey};
 * # use lightning::util::logger::{Logger, Record};
 * # use lightning::util::ser::{Writeable, Writer};
 * # use lightning::io;
 * # use std::sync::Arc;
 * # struct FakeLogger;
 * # impl Logger for FakeLogger {
 * #     fn log(&self, record: Record) { println!(\"{:?}\" , record); }
 * # }
 * # struct FakeMessageRouter {}
 * # impl MessageRouter for FakeMessageRouter {
 * #     fn find_path(&self, sender: PublicKey, peers: Vec<PublicKey>, destination: Destination) -> Result<OnionMessagePath, ()> {
 * #         let secp_ctx = Secp256k1::new();
 * #         let node_secret = SecretKey::from_slice(&<Vec<u8>>::from_hex(\"0101010101010101010101010101010101010101010101010101010101010101\").unwrap()[..]).unwrap();
 * #         let hop_node_id1 = PublicKey::from_secret_key(&secp_ctx, &node_secret);
 * #         let hop_node_id2 = hop_node_id1;
 * #         Ok(OnionMessagePath {
 * #             intermediate_nodes: vec![hop_node_id1, hop_node_id2],
 * #             destination,
 * #             first_node_addresses: Vec::new(),
 * #         })
 * #     }
 * #     fn create_blinded_paths<T: secp256k1::Signing + secp256k1::Verification>(
 * #         &self, _recipient: PublicKey, _local_node_receive_key: ReceiveAuthKey,
 * #         _context: MessageContext, _peers: Vec<MessageForwardNode>, _secp_ctx: &Secp256k1<T>
 * #     ) -> Result<Vec<BlindedMessagePath>, ()> {
 * #         unreachable!()
 * #     }
 * # }
 * # let seed = [42u8; 32];
 * # let time = Duration::from_secs(123456);
 * # let keys_manager = KeysManager::new(&seed, time.as_secs(), time.subsec_nanos(), true);
 * # let logger = Arc::new(FakeLogger {});
 * # let node_secret = SecretKey::from_slice(&<Vec<u8>>::from_hex(\"0101010101010101010101010101010101010101010101010101010101010101\").unwrap()[..]).unwrap();
 * # let secp_ctx = Secp256k1::new();
 * # let hop_node_id1 = PublicKey::from_secret_key(&secp_ctx, &node_secret);
 * # let (hop_node_id3, hop_node_id4) = (hop_node_id1, hop_node_id1);
 * # let destination_node_id = hop_node_id1;
 * # let node_id_lookup = EmptyNodeIdLookUp {};
 * # let message_router = Arc::new(FakeMessageRouter {});
 * # let custom_message_handler = IgnoringMessageHandler {};
 * # let offers_message_handler = IgnoringMessageHandler {};
 * # let async_payments_message_handler = IgnoringMessageHandler {};
 * # let dns_resolution_message_handler = IgnoringMessageHandler {};
 * Create the onion messenger. This must use the same `keys_manager` as is passed to your
 * ChannelManager.
 * let onion_messenger = OnionMessenger::new(
 * &keys_manager, &keys_manager, logger, &node_id_lookup, message_router,
 * &offers_message_handler, &async_payments_message_handler, &dns_resolution_message_handler,
 * &custom_message_handler,
 * );
 * 
 * # #[derive(Clone, Debug)]
 * # struct YourCustomMessage {}
 * impl Writeable for YourCustomMessage {
 * \tfn write<W: Writer>(&self, w: &mut W) -> Result<(), io::Error> {
 * \t\t# Ok(())
 * \t\t// Write your custom onion message to `w`
 * \t}
 * }
 * impl OnionMessageContents for YourCustomMessage {
 * \tfn tlv_type(&self) -> u64 {
 * \t\t# let your_custom_message_type = 42;
 * \t\tyour_custom_message_type
 * \t}
 * \tfn msg_type(&self) -> &'static str { \"YourCustomMessageType\" }
 * }
 * Send a custom onion message to a node id.
 * let destination = Destination::Node(destination_node_id);
 * let instructions = MessageSendInstructions::WithoutReplyPath { destination };
 * # let message = YourCustomMessage {};
 * onion_messenger.send_onion_message(message, instructions);
 * 
 * Create a blinded path to yourself, for someone to send an onion message to.
 * # let your_node_id = hop_node_id1;
 * let hops = [
 * \tMessageForwardNode { node_id: hop_node_id3, short_channel_id: None },
 * \tMessageForwardNode { node_id: hop_node_id4, short_channel_id: None },
 * ];
 * let context = MessageContext::Custom(Vec::new());
 * let receive_key = keys_manager.get_receive_auth_key();
 * let blinded_path = BlindedMessagePath::new(&hops, your_node_id, receive_key, context, &keys_manager, &secp_ctx);
 * 
 * Send a custom onion message to a blinded path.
 * let destination = Destination::BlindedPath(blinded_path);
 * let instructions = MessageSendInstructions::WithoutReplyPath { destination };
 * # let message = YourCustomMessage {};
 * onion_messenger.send_onion_message(message, instructions);
 * ```
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OnionMessenger extends CommonBase {
	OnionMessenger(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OnionMessenger_free(ptr); }
	}

	/**
	 * Constructs a new `OnionMessenger` to send, forward, and delegate received onion messages to
	 * their respective handlers.
	 */
	public static OnionMessenger of(org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.Logger logger, org.ldk.structs.NodeIdLookUp node_id_lookup, org.ldk.structs.MessageRouter message_router, org.ldk.structs.OffersMessageHandler offers_handler, org.ldk.structs.AsyncPaymentsMessageHandler async_payments_handler, org.ldk.structs.DNSResolverMessageHandler dns_resolver, org.ldk.structs.CustomOnionMessageHandler custom_handler) {
		long ret = bindings.OnionMessenger_new(entropy_source.ptr, node_signer.ptr, logger.ptr, node_id_lookup.ptr, message_router.ptr, offers_handler.ptr, async_payments_handler.ptr, dns_resolver.ptr, custom_handler.ptr);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(node_id_lookup);
		Reference.reachabilityFence(message_router);
		Reference.reachabilityFence(offers_handler);
		Reference.reachabilityFence(async_payments_handler);
		Reference.reachabilityFence(dns_resolver);
		Reference.reachabilityFence(custom_handler);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessenger ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessenger(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_id_lookup); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(message_router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(offers_handler); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(async_payments_handler); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(dns_resolver); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(custom_handler); };
		return ret_hu_conv;
	}

	/**
	 * Similar to [`Self::new`], but rather than dropping onion messages that are
	 * intended to be forwarded to offline peers, we will intercept them for
	 * later forwarding.
	 * 
	 * Interception flow:
	 * 1. If an onion message for an offline peer is received, `OnionMessenger` will
	 * generate an [`Event::OnionMessageIntercepted`]. Event handlers can
	 * then choose to persist this onion message for later forwarding, or drop
	 * it.
	 * 2. When the offline peer later comes back online, `OnionMessenger` will
	 * generate an [`Event::OnionMessagePeerConnected`]. Event handlers will
	 * then fetch all previously intercepted onion messages for this peer.
	 * 3. Once the stored onion messages are fetched, they can finally be
	 * forwarded to the now-online peer via [`Self::forward_onion_message`].
	 * 
	 * # Note
	 * 
	 * LDK will not rate limit how many [`Event::OnionMessageIntercepted`]s
	 * are generated, so it is the caller's responsibility to limit how many
	 * onion messages are persisted and only persist onion messages for relevant
	 * peers.
	 */
	public static OnionMessenger new_with_offline_peer_interception(org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.Logger logger, org.ldk.structs.NodeIdLookUp node_id_lookup, org.ldk.structs.MessageRouter message_router, org.ldk.structs.OffersMessageHandler offers_handler, org.ldk.structs.AsyncPaymentsMessageHandler async_payments_handler, org.ldk.structs.DNSResolverMessageHandler dns_resolver, org.ldk.structs.CustomOnionMessageHandler custom_handler) {
		long ret = bindings.OnionMessenger_new_with_offline_peer_interception(entropy_source.ptr, node_signer.ptr, logger.ptr, node_id_lookup.ptr, message_router.ptr, offers_handler.ptr, async_payments_handler.ptr, dns_resolver.ptr, custom_handler.ptr);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(node_id_lookup);
		Reference.reachabilityFence(message_router);
		Reference.reachabilityFence(offers_handler);
		Reference.reachabilityFence(async_payments_handler);
		Reference.reachabilityFence(dns_resolver);
		Reference.reachabilityFence(custom_handler);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessenger ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessenger(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_id_lookup); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(message_router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(offers_handler); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(async_payments_handler); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(dns_resolver); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(custom_handler); };
		return ret_hu_conv;
	}

	/**
	 * Sends an [`OnionMessage`] based on its [`MessageSendInstructions`].
	 */
	public Result_SendSuccessSendErrorZ send_onion_message(org.ldk.structs.OnionMessageContents contents, org.ldk.structs.MessageSendInstructions instructions) {
		long ret = bindings.OnionMessenger_send_onion_message(this.ptr, contents.ptr, instructions.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(contents);
		Reference.reachabilityFence(instructions);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SendSuccessSendErrorZ ret_hu_conv = Result_SendSuccessSendErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(contents); };
		return ret_hu_conv;
	}

	/**
	 * Forwards an [`OnionMessage`] to `peer_node_id`. Useful if we initialized
	 * the [`OnionMessenger`] with [`Self::new_with_offline_peer_interception`]
	 * and want to forward a previously intercepted onion message to a peer that
	 * has just come online.
	 */
	public Result_NoneSendErrorZ forward_onion_message(org.ldk.structs.OnionMessage message, byte[] peer_node_id) {
		long ret = bindings.OnionMessenger_forward_onion_message(this.ptr, message.ptr, InternalUtils.check_arr_len(peer_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(peer_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSendErrorZ ret_hu_conv = Result_NoneSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Handles the response to an [`OnionMessage`] based on its [`ResponseInstruction`],
	 * enqueueing any response for sending.
	 * 
	 * This function is useful for asynchronous handling of [`OnionMessage`]s.
	 * Handlers have the option to return `None`, indicating that no immediate response should be
	 * sent. Then, they can transfer the associated [`Responder`] to another task responsible for
	 * generating the response asynchronously. Subsequently, when the response is prepared and
	 * ready for sending, that task can invoke this method to enqueue the response for delivery.
	 */
	public Result_SendSuccessSendErrorZ handle_onion_message_response(org.ldk.structs.OnionMessageContents response, org.ldk.structs.ResponseInstruction instructions) {
		long ret = bindings.OnionMessenger_handle_onion_message_response(this.ptr, response.ptr, instructions.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(response);
		Reference.reachabilityFence(instructions);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SendSuccessSendErrorZ ret_hu_conv = Result_SendSuccessSendErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(response); };
		return ret_hu_conv;
	}

	/**
	 * Gets a [`Future`] that completes when an event is available via
	 * [`EventsProvider::process_pending_events`] or [`Self::process_pending_events_async`].
	 * 
	 * Note that callbacks registered on the [`Future`] MUST NOT call back into this
	 * [`OnionMessenger`] and should instead register actions to be taken later.
	 * 
	 * [`EventsProvider::process_pending_events`]: crate::events::EventsProvider::process_pending_events
	 */
	public Future get_update_future() {
		long ret = bindings.OnionMessenger_get_update_future(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Future ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Future(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public EventsProvider as_EventsProvider() {
		long ret = bindings.OnionMessenger_as_EventsProvider(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public BaseMessageHandler as_BaseMessageHandler() {
		long ret = bindings.OnionMessenger_as_BaseMessageHandler(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BaseMessageHandler ret_hu_conv = new BaseMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageHandler must be freed before this_arg is
	 */
	public OnionMessageHandler as_OnionMessageHandler() {
		long ret = bindings.OnionMessenger_as_OnionMessageHandler(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageHandler ret_hu_conv = new OnionMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
