package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A sender, receiver and forwarder of onion messages. In upcoming releases, this object will be
 * used to retrieve invoices and fulfill invoice requests from [offers]. Currently, only sending
 * and receiving custom onion messages is supported.
 * 
 * # Example
 * 
 * ```
 * # extern crate bitcoin;
 * # use bitcoin::hashes::_export::_core::time::Duration;
 * # use bitcoin::secp256k1::{PublicKey, Secp256k1, SecretKey};
 * # use lightning::chain::keysinterface::{InMemorySigner, KeysManager, KeysInterface};
 * # use lightning::ln::msgs::DecodeError;
 * # use lightning::ln::peer_handler::IgnoringMessageHandler;
 * # use lightning::onion_message::messenger::{Destination, OnionMessenger};
 * # use lightning::onion_message::packet::CustomOnionMessageContents;
 * # use lightning::onion_message::blinded_route::BlindedRoute;
 * # use lightning::util::logger::{Logger, Record};
 * # use lightning::util::ser::{Writeable, Writer};
 * # use lightning::io;
 * # use std::sync::Arc;
 * # struct FakeLogger {};
 * # impl Logger for FakeLogger {
 * #     fn log(&self, record: &Record) { unimplemented!() }
 * # }
 * # let seed = [42u8; 32];
 * # let time = Duration::from_secs(123456);
 * # let keys_manager = KeysManager::new(&seed, time.as_secs(), time.subsec_nanos());
 * # let logger = Arc::new(FakeLogger {});
 * # let node_secret = SecretKey::from_slice(&hex::decode(\"0101010101010101010101010101010101010101010101010101010101010101\").unwrap()[..]).unwrap();
 * # let secp_ctx = Secp256k1::new();
 * # let hop_node_id1 = PublicKey::from_secret_key(&secp_ctx, &node_secret);
 * # let (hop_node_id2, hop_node_id3, hop_node_id4) = (hop_node_id1, hop_node_id1, hop_node_id1);
 * # let destination_node_id = hop_node_id1;
 * # let your_custom_message_handler = IgnoringMessageHandler {};
 * Create the onion messenger. This must use the same `keys_manager` as is passed to your
 * ChannelManager.
 * let onion_messenger = OnionMessenger::new(&keys_manager, logger, your_custom_message_handler);
 * 
 * # #[derive(Clone)]
 * # struct YourCustomMessage {}
 * impl Writeable for YourCustomMessage {
 * \tfn write<W: Writer>(&self, w: &mut W) -> Result<(), io::Error> {
 * \t\t# Ok(())
 * \t\t// Write your custom onion message to `w`
 * \t}
 * }
 * impl CustomOnionMessageContents for YourCustomMessage {
 * \tfn tlv_type(&self) -> u64 {
 * \t\t# let your_custom_message_type = 42;
 * \t\tyour_custom_message_type
 * \t}
 * }
 * Send a custom onion message to a node id.
 * let intermediate_hops = [hop_node_id1, hop_node_id2];
 * let reply_path = None;
 * # let your_custom_message = YourCustomMessage {};
 * onion_messenger.send_custom_onion_message(&intermediate_hops, Destination::Node(destination_node_id), your_custom_message, reply_path);
 * 
 * Create a blinded route to yourself, for someone to send an onion message to.
 * # let your_node_id = hop_node_id1;
 * let hops = [hop_node_id3, hop_node_id4, your_node_id];
 * let blinded_route = BlindedRoute::new(&hops, &keys_manager, &secp_ctx).unwrap();
 * 
 * Send a custom onion message to a blinded route.
 * # let intermediate_hops = [hop_node_id1, hop_node_id2];
 * let reply_path = None;
 * # let your_custom_message = YourCustomMessage {};
 * onion_messenger.send_custom_onion_message(&intermediate_hops, Destination::BlindedRoute(blinded_route), your_custom_message, reply_path);
 * ```
 * 
 * [offers]: <https://github.com/lightning/bolts/pull/798>
 * [`OnionMessenger`]: crate::onion_message::OnionMessenger
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
	public static OnionMessenger of(KeysInterface keys_manager, Logger logger, CustomOnionMessageHandler custom_handler) {
		long ret = bindings.OnionMessenger_new(keys_manager == null ? 0 : keys_manager.ptr, logger == null ? 0 : logger.ptr, custom_handler == null ? 0 : custom_handler.ptr);
		Reference.reachabilityFence(keys_manager);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(custom_handler);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessenger ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessenger(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(keys_manager); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(custom_handler); };
		return ret_hu_conv;
	}

	/**
	 * Send an onion message with contents `message` to `destination`, routing it through `intermediate_nodes`.
	 * See [`OnionMessenger`] for example usage.
	 * 
	 * Note that reply_path (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_NoneSendErrorZ send_custom_onion_message(byte[][] intermediate_nodes, Destination destination, CustomOnionMessageContents msg, @Nullable BlindedRoute reply_path) {
		long ret = bindings.OnionMessenger_send_custom_onion_message(this.ptr, intermediate_nodes != null ? Arrays.stream(intermediate_nodes).map(intermediate_nodes_conv_8 -> InternalUtils.check_arr_len(intermediate_nodes_conv_8, 33)).toArray(byte[][]::new) : null, destination.ptr, msg == null ? 0 : msg.ptr, reply_path == null ? 0 : reply_path.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(intermediate_nodes);
		Reference.reachabilityFence(destination);
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(reply_path);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSendErrorZ ret_hu_conv = Result_NoneSendErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(msg); };
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

	/**
	 * Constructs a new OnionMessageProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageProvider must be freed before this_arg is
	 */
	public OnionMessageProvider as_OnionMessageProvider() {
		long ret = bindings.OnionMessenger_as_OnionMessageProvider(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageProvider ret_hu_conv = new OnionMessageProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
