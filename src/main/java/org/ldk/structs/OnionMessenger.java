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
 * # use bitcoin::hashes::hex::FromHex;
 * # use bitcoin::secp256k1::{PublicKey, Secp256k1, SecretKey, self};
 * # use lightning::blinded_path::BlindedPath;
 * # use lightning::sign::{EntropySource, KeysManager};
 * # use lightning::ln::peer_handler::IgnoringMessageHandler;
 * # use lightning::onion_message::messenger::{Destination, MessageRouter, OnionMessagePath, OnionMessenger};
 * # use lightning::onion_message::packet::OnionMessageContents;
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
 * #             first_node_addresses: None,
 * #         })
 * #     }
 * #     fn create_blinded_paths<T: secp256k1::Signing + secp256k1::Verification>(
 * #         &self, _recipient: PublicKey, _peers: Vec<PublicKey>, _secp_ctx: &Secp256k1<T>
 * #     ) -> Result<Vec<BlindedPath>, ()> {
 * #         unreachable!()
 * #     }
 * # }
 * # let seed = [42u8; 32];
 * # let time = Duration::from_secs(123456);
 * # let keys_manager = KeysManager::new(&seed, time.as_secs(), time.subsec_nanos());
 * # let logger = Arc::new(FakeLogger {});
 * # let node_secret = SecretKey::from_slice(&<Vec<u8>>::from_hex(\"0101010101010101010101010101010101010101010101010101010101010101\").unwrap()[..]).unwrap();
 * # let secp_ctx = Secp256k1::new();
 * # let hop_node_id1 = PublicKey::from_secret_key(&secp_ctx, &node_secret);
 * # let (hop_node_id3, hop_node_id4) = (hop_node_id1, hop_node_id1);
 * # let destination_node_id = hop_node_id1;
 * # let message_router = Arc::new(FakeMessageRouter {});
 * # let custom_message_handler = IgnoringMessageHandler {};
 * # let offers_message_handler = IgnoringMessageHandler {};
 * Create the onion messenger. This must use the same `keys_manager` as is passed to your
 * ChannelManager.
 * let onion_messenger = OnionMessenger::new(
 * &keys_manager, &keys_manager, logger, message_router, &offers_message_handler,
 * &custom_message_handler
 * );
 * 
 * # #[derive(Debug, Clone)]
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
 * }
 * Send a custom onion message to a node id.
 * let destination = Destination::Node(destination_node_id);
 * let reply_path = None;
 * # let message = YourCustomMessage {};
 * onion_messenger.send_onion_message(message, destination, reply_path);
 * 
 * Create a blinded path to yourself, for someone to send an onion message to.
 * # let your_node_id = hop_node_id1;
 * let hops = [hop_node_id3, hop_node_id4, your_node_id];
 * let blinded_path = BlindedPath::new_for_message(&hops, &keys_manager, &secp_ctx).unwrap();
 * 
 * Send a custom onion message to a blinded path.
 * let destination = Destination::BlindedPath(blinded_path);
 * let reply_path = None;
 * # let message = YourCustomMessage {};
 * onion_messenger.send_onion_message(message, destination, reply_path);
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
	public static OnionMessenger of(org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.Logger logger, org.ldk.structs.MessageRouter message_router, org.ldk.structs.OffersMessageHandler offers_handler, org.ldk.structs.CustomOnionMessageHandler custom_handler) {
		long ret = bindings.OnionMessenger_new(entropy_source.ptr, node_signer.ptr, logger.ptr, message_router.ptr, offers_handler.ptr, custom_handler.ptr);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(message_router);
		Reference.reachabilityFence(offers_handler);
		Reference.reachabilityFence(custom_handler);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessenger ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessenger(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(message_router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(offers_handler); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(custom_handler); };
		return ret_hu_conv;
	}

	/**
	 * Sends an [`OnionMessage`] with the given `contents` to `destination`.
	 * 
	 * See [`OnionMessenger`] for example usage.
	 * 
	 * Note that reply_path (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_SendSuccessSendErrorZ send_onion_message(org.ldk.structs.OnionMessageContents contents, org.ldk.structs.Destination destination, @Nullable org.ldk.structs.BlindedPath reply_path) {
		long ret = bindings.OnionMessenger_send_onion_message(this.ptr, contents.ptr, destination.ptr, reply_path == null ? 0 : reply_path.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(contents);
		Reference.reachabilityFence(destination);
		Reference.reachabilityFence(reply_path);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SendSuccessSendErrorZ ret_hu_conv = Result_SendSuccessSendErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(contents); };
		if (this != null) { this.ptrs_to.add(destination); };
		if (this != null) { this.ptrs_to.add(reply_path); };
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
