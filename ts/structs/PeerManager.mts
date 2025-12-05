
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A PeerManager manages a set of peers, described by their [`SocketDescriptor`] and marshalls
 * socket events into messages which it passes on to its [`MessageHandler`].
 * 
 * Locks are taken internally, so you must never assume that reentrancy from a
 * [`SocketDescriptor`] call back into [`PeerManager`] methods will not deadlock.
 * 
 * Calls to [`read_event`] will decode relevant messages and pass them to the
 * [`ChannelMessageHandler`], likely doing message processing in-line. Thus, the primary form of
 * parallelism in Rust-Lightning is in calls to [`read_event`]. Note, however, that calls to any
 * [`PeerManager`] functions related to the same connection must occur only in serial, making new
 * calls only after previous ones have returned.
 * 
 * Rather than using a plain [`PeerManager`], it is preferable to use either a [`SimpleArcPeerManager`]
 * a [`SimpleRefPeerManager`], for conciseness. See their documentation for more details, but
 * essentially you should default to using a [`SimpleRefPeerManager`], and use a
 * [`SimpleArcPeerManager`] when you require a `PeerManager` with a static lifetime, such as when
 * you're using lightning-net-tokio.
 * 
 * [`read_event`]: PeerManager::read_event
 */
export class PeerManager extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PeerManager_free);
	}

	/**
	 * Constructs a new `PeerManager` with the given message handlers.
	 * 
	 * `ephemeral_random_data` is used to derive per-connection ephemeral keys and must be
	 * cryptographically secure random bytes.
	 * 
	 * `current_time` is used as an always-increasing counter that survives across restarts and is
	 * incremented irregularly internally. In general it is best to simply use the current UNIX
	 * timestamp, however if it is not available a persistent counter that increases once per
	 * minute should suffice.
	 */
	public static constructor_new(message_handler_chan_handler_arg: ChannelMessageHandler, message_handler_route_handler_arg: RoutingMessageHandler, message_handler_onion_message_handler_arg: OnionMessageHandler, message_handler_custom_message_handler_arg: CustomMessageHandler, message_handler_send_only_message_handler_arg: SendOnlyMessageHandler, current_time: number, ephemeral_random_data: Uint8Array, logger: Logger, node_signer: NodeSigner): PeerManager {
		const ret: bigint = bindings.PeerManager_new(bindings.MessageHandler_new(CommonBase.get_ptr_of(message_handler_chan_handler_arg), CommonBase.get_ptr_of(message_handler_route_handler_arg), CommonBase.get_ptr_of(message_handler_onion_message_handler_arg), CommonBase.get_ptr_of(message_handler_custom_message_handler_arg), CommonBase.get_ptr_of(message_handler_send_only_message_handler_arg)), current_time, bindings.encodeUint8Array(ephemeral_random_data), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(node_signer));
		const ret_hu_conv: PeerManager = new PeerManager(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_chan_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_route_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_onion_message_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_custom_message_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, message_handler_send_only_message_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		return ret_hu_conv;
	}

	/**
	 * Returns a list of [`PeerDetails`] for connected peers that have completed the initial
	 * handshake.
	 */
	public list_peers(): PeerDetails[] {
		const ret: number = bindings.PeerManager_list_peers(this.ptr);
		const ret_conv_13_len: number = bindings.getArrayLength(ret);
		const ret_conv_13_arr: PeerDetails[] = new Array(ret_conv_13_len).fill(null);
		for (var n = 0; n < ret_conv_13_len; n++) {
			const ret_conv_13: bigint = bindings.getU64ArrayElem(ret, n);
			const ret_conv_13_hu_conv: PeerDetails = new PeerDetails(null, ret_conv_13);
			CommonBase.add_ref_from(ret_conv_13_hu_conv, this);
			ret_conv_13_arr[n] = ret_conv_13_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_13_arr;
	}

	/**
	 * Returns the [`PeerDetails`] of a connected peer that has completed the initial handshake.
	 * 
	 * Will return `None` if the peer is unknown or it hasn't completed the initial handshake.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public peer_by_node_id(their_node_id: Uint8Array): PeerDetails {
		const ret: bigint = bindings.PeerManager_peer_by_node_id(this.ptr, bindings.encodeUint8Array(their_node_id));
		const ret_hu_conv: PeerDetails = new PeerDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Indicates a new outbound connection has been established to a node with the given `node_id`
	 * and an optional remote network address.
	 * 
	 * The remote network address adds the option to report a remote IP address back to a connecting
	 * peer using the init message.
	 * The user should pass the remote network address of the host they are connected to.
	 * 
	 * If an `Err` is returned here you must disconnect the connection immediately.
	 * 
	 * Returns a small number of bytes to send to the remote node (currently always 50).
	 * 
	 * Panics if descriptor is duplicative with some other descriptor which has not yet been
	 * [`socket_disconnected`].
	 * 
	 * [`socket_disconnected`]: PeerManager::socket_disconnected
	 */
	public new_outbound_connection(their_node_id: Uint8Array, descriptor: SocketDescriptor, remote_network_address: Option_SocketAddressZ): Result_CVec_u8ZPeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_new_outbound_connection(this.ptr, bindings.encodeUint8Array(their_node_id), CommonBase.get_ptr_of(descriptor), CommonBase.get_ptr_of(remote_network_address));
		const ret_hu_conv: Result_CVec_u8ZPeerHandleErrorZ = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, descriptor);
		return ret_hu_conv;
	}

	/**
	 * Indicates a new inbound connection has been established to a node with an optional remote
	 * network address.
	 * 
	 * The remote network address adds the option to report a remote IP address back to a connecting
	 * peer using the init message.
	 * The user should pass the remote network address of the host they are connected to.
	 * 
	 * May refuse the connection by returning an Err, but will never write bytes to the remote end
	 * (outbound connector always speaks first). If an `Err` is returned here you must disconnect
	 * the connection immediately.
	 * 
	 * Panics if descriptor is duplicative with some other descriptor which has not yet been
	 * [`socket_disconnected`].
	 * 
	 * [`socket_disconnected`]: PeerManager::socket_disconnected
	 */
	public new_inbound_connection(descriptor: SocketDescriptor, remote_network_address: Option_SocketAddressZ): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_new_inbound_connection(this.ptr, CommonBase.get_ptr_of(descriptor), CommonBase.get_ptr_of(remote_network_address));
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, descriptor);
		return ret_hu_conv;
	}

	/**
	 * Indicates that there is room to write data to the given socket descriptor.
	 * 
	 * May return an Err to indicate that the connection should be closed.
	 * 
	 * May call [`send_data`] on the descriptor passed in (or an equal descriptor) before
	 * returning. Thus, be very careful with reentrancy issues! The invariants around calling
	 * [`write_buffer_space_avail`] in case a write did not fully complete must still hold - be
	 * ready to call [`write_buffer_space_avail`] again if a write call generated here isn't
	 * sufficient!
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`write_buffer_space_avail`]: PeerManager::write_buffer_space_avail
	 */
	public write_buffer_space_avail(descriptor: SocketDescriptor): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_write_buffer_space_avail(this.ptr, CommonBase.get_ptr_of(descriptor));
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Indicates that data was read from the given socket descriptor.
	 * 
	 * May return an Err to indicate that the connection should be closed.
	 * 
	 * Will *not* call back into [`send_data`] on any descriptors to avoid reentrancy complexity.
	 * Thus, however, you should call [`process_events`] after any `read_event` to generate
	 * [`send_data`] calls to handle responses. This is also important to give [`send_data`] calls
	 * a chance to pause reads if too many messages have been queued in response allowing a peer
	 * to bloat our memory.
	 * 
	 * In order to avoid processing too many messages at once per peer, `data` should be on the
	 * order of 4KiB.
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`process_events`]: PeerManager::process_events
	 */
	public read_event(peer_descriptor: SocketDescriptor, data: Uint8Array): Result_NonePeerHandleErrorZ {
		const ret: bigint = bindings.PeerManager_read_event(this.ptr, CommonBase.get_ptr_of(peer_descriptor), bindings.encodeUint8Array(data));
		const ret_hu_conv: Result_NonePeerHandleErrorZ = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks for any events generated by our handlers and processes them. Includes sending most
	 * response messages as well as messages generated by calls to handler functions directly (eg
	 * functions like [`ChannelManager::process_pending_htlc_forwards`] or [`send_payment`]).
	 * 
	 * May call [`send_data`] on [`SocketDescriptor`]s. Thus, be very careful with reentrancy
	 * issues!
	 * 
	 * This should be called any time we may have messages to send. It is automatically called by
	 * [`lightning-net-tokio`] after processing incoming messages, and by
	 * [`lightning-background-processor`] when channel state has changed. Therefore, If you are not
	 * using both [`lightning-net-tokio`] and [`lightning-background-processor`], you may need to call
	 * this function manually to prevent messages from being delayed.
	 * 
	 * Note that if there are any other calls to this function waiting on lock(s) this may return
	 * without doing any work. All available events that need handling will be handled before the
	 * other calls return.
	 * 
	 * [`send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::process_pending_htlc_forwards`]: crate::ln::channelmanager::ChannelManager::process_pending_htlc_forwards
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`lightning-net-tokio`]: https://docs.rs/lightning-net-tokio/latest/lightning_net_tokio
	 * [`lightning-background-processor`]: https://docs.rs/lightning-background-processor/latest/lightning_background_processor
	 */
	public process_events(): void {
		bindings.PeerManager_process_events(this.ptr);
	}

	/**
	 * Indicates that the given socket descriptor's connection is now closed.
	 */
	public socket_disconnected(descriptor: SocketDescriptor): void {
		bindings.PeerManager_socket_disconnected(this.ptr, CommonBase.get_ptr_of(descriptor));
	}

	/**
	 * Disconnect a peer given its node id.
	 * 
	 * If a peer is connected, this will call [`disconnect_socket`] on the descriptor for the
	 * peer. Thus, be very careful about reentrancy issues.
	 * 
	 * [`disconnect_socket`]: SocketDescriptor::disconnect_socket
	 */
	public disconnect_by_node_id(node_id: Uint8Array): void {
		bindings.PeerManager_disconnect_by_node_id(this.ptr, bindings.encodeUint8Array(node_id));
	}

	/**
	 * Disconnects all currently-connected peers. This is useful on platforms where there may be
	 * an indication that TCP sockets have stalled even if we weren't around to time them out
	 * using regular ping/pongs.
	 */
	public disconnect_all_peers(): void {
		bindings.PeerManager_disconnect_all_peers(this.ptr);
	}

	/**
	 * Send pings to each peer and disconnect those which did not respond to the last round of
	 * pings.
	 * 
	 * This may be called on any timescale you want, however, roughly once every ten seconds is
	 * preferred. The call rate determines both how often we send a ping to our peers and how much
	 * time they have to respond before we disconnect them.
	 * 
	 * May call [`send_data`] on all [`SocketDescriptor`]s. Thus, be very careful with reentrancy
	 * issues!
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 */
	public timer_tick_occurred(): void {
		bindings.PeerManager_timer_tick_occurred(this.ptr);
	}

	/**
	 * Generates a signed node_announcement from the given arguments, sending it to all connected
	 * peers. Note that peers will likely ignore this message unless we have at least one public
	 * channel which has at least six confirmations on-chain.
	 * 
	 * `rgb` is a node \"color\" and `alias` is a printable human-readable string to describe this
	 * node to humans. They carry no in-protocol meaning.
	 * 
	 * `addresses` represent the set (possibly empty) of socket addresses on which this node
	 * accepts incoming connections. These will be included in the node_announcement, publicly
	 * tying these addresses together and to this node. If you wish to preserve user privacy,
	 * addresses should likely contain only Tor Onion addresses.
	 * 
	 * Panics if `addresses` is absurdly large (more than 100).
	 * 
	 * [`get_and_clear_pending_msg_events`]: BaseMessageHandler::get_and_clear_pending_msg_events
	 */
	public broadcast_node_announcement(rgb: Uint8Array, alias: Uint8Array, addresses: SocketAddress[]): void {
		bindings.PeerManager_broadcast_node_announcement(this.ptr, bindings.encodeUint8Array(rgb), bindings.encodeUint8Array(alias), bindings.encodeUint64Array(addresses.map(addresses_conv_15 => CommonBase.get_ptr_of(addresses_conv_15))));
	}

}
