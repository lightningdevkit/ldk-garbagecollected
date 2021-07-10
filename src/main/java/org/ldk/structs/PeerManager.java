package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


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
 * Rather than using a plain PeerManager, it is preferable to use either a SimpleArcPeerManager
 * a SimpleRefPeerManager, for conciseness. See their documentation for more details, but
 * essentially you should default to using a SimpleRefPeerManager, and use a
 * SimpleArcPeerManager when you require a PeerManager with a static lifetime, such as when
 * you're using lightning-net-tokio.
 * 
 * [`read_event`]: PeerManager::read_event
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PeerManager extends CommonBase {
	PeerManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PeerManager_free(ptr); }
	}

	/**
	 * Constructs a new PeerManager with the given message handlers and node_id secret key
	 * ephemeral_random_data is used to derive per-connection ephemeral keys and must be
	 * cryptographically secure random bytes.
	 */
	public static PeerManager of(ChannelMessageHandler message_handler_chan_handler_arg, RoutingMessageHandler message_handler_route_handler_arg, byte[] our_node_secret, byte[] ephemeral_random_data, Logger logger) {
		long ret = bindings.PeerManager_new(bindings.MessageHandler_new(message_handler_chan_handler_arg == null ? 0 : message_handler_chan_handler_arg.ptr, message_handler_route_handler_arg == null ? 0 : message_handler_route_handler_arg.ptr), our_node_secret, ephemeral_random_data, logger == null ? 0 : logger.ptr);
		PeerManager ret_hu_conv = new PeerManager(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(message_handler_chan_handler_arg);
		ret_hu_conv.ptrs_to.add(message_handler_route_handler_arg);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	/**
	 * Get the list of node ids for peers which have completed the initial handshake.
	 * 
	 * For outbound connections, this will be the same as the their_node_id parameter passed in to
	 * new_outbound_connection, however entries will only appear once the initial handshake has
	 * completed and we are sure the remote peer has the private key for the given node_id.
	 */
	public byte[][] get_peer_node_ids() {
		byte[][] ret = bindings.PeerManager_get_peer_node_ids(this.ptr);
		return ret;
	}

	/**
	 * Indicates a new outbound connection has been established to a node with the given node_id.
	 * Note that if an Err is returned here you MUST NOT call socket_disconnected for the new
	 * descriptor but must disconnect the connection immediately.
	 * 
	 * Returns a small number of bytes to send to the remote node (currently always 50).
	 * 
	 * Panics if descriptor is duplicative with some other descriptor which has not yet been
	 * [`socket_disconnected()`].
	 * 
	 * [`socket_disconnected()`]: PeerManager::socket_disconnected
	 */
	public Result_CVec_u8ZPeerHandleErrorZ new_outbound_connection(byte[] their_node_id, SocketDescriptor descriptor) {
		long ret = bindings.PeerManager_new_outbound_connection(this.ptr, their_node_id, descriptor == null ? 0 : descriptor.ptr);
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	/**
	 * Indicates a new inbound connection has been established.
	 * 
	 * May refuse the connection by returning an Err, but will never write bytes to the remote end
	 * (outbound connector always speaks first). Note that if an Err is returned here you MUST NOT
	 * call socket_disconnected for the new descriptor but must disconnect the connection
	 * immediately.
	 * 
	 * Panics if descriptor is duplicative with some other descriptor which has not yet been
	 * [`socket_disconnected()`].
	 * 
	 * [`socket_disconnected()`]: PeerManager::socket_disconnected
	 */
	public Result_NonePeerHandleErrorZ new_inbound_connection(SocketDescriptor descriptor) {
		long ret = bindings.PeerManager_new_inbound_connection(this.ptr, descriptor == null ? 0 : descriptor.ptr);
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
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
	 * ready to call `[write_buffer_space_avail`] again if a write call generated here isn't
	 * sufficient!
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`write_buffer_space_avail`]: PeerManager::write_buffer_space_avail
	 */
	public Result_NonePeerHandleErrorZ write_buffer_space_avail(SocketDescriptor descriptor) {
		long ret = bindings.PeerManager_write_buffer_space_avail(this.ptr, descriptor == null ? 0 : descriptor.ptr);
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	/**
	 * Indicates that data was read from the given socket descriptor.
	 * 
	 * May return an Err to indicate that the connection should be closed.
	 * 
	 * Will *not* call back into [`send_data`] on any descriptors to avoid reentrancy complexity.
	 * Thus, however, you should call [`process_events`] after any `read_event` to generate
	 * [`send_data`] calls to handle responses.
	 * 
	 * If `Ok(true)` is returned, further read_events should not be triggered until a
	 * [`send_data`] call on this descriptor has `resume_read` set (preventing DoS issues in the
	 * send buffer).
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 * [`process_events`]: PeerManager::process_events
	 */
	public Result_boolPeerHandleErrorZ read_event(SocketDescriptor peer_descriptor, byte[] data) {
		long ret = bindings.PeerManager_read_event(this.ptr, peer_descriptor == null ? 0 : peer_descriptor.ptr, data);
		Result_boolPeerHandleErrorZ ret_hu_conv = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(peer_descriptor);
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
	 * [`send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`ChannelManager::process_pending_htlc_forwards`]: crate::ln::channelmanager::ChannelManager::process_pending_htlc_forwards
	 * [`send_data`]: SocketDescriptor::send_data
	 */
	public void process_events() {
		bindings.PeerManager_process_events(this.ptr);
	}

	/**
	 * Indicates that the given socket descriptor's connection is now closed.
	 */
	public void socket_disconnected(SocketDescriptor descriptor) {
		bindings.PeerManager_socket_disconnected(this.ptr, descriptor == null ? 0 : descriptor.ptr);
		this.ptrs_to.add(descriptor);
	}

	/**
	 * Disconnect a peer given its node id.
	 * 
	 * Set `no_connection_possible` to true to prevent any further connection with this peer,
	 * force-closing any channels we have with it.
	 * 
	 * If a peer is connected, this will call [`disconnect_socket`] on the descriptor for the
	 * peer. Thus, be very careful about reentrancy issues.
	 * 
	 * [`disconnect_socket`]: SocketDescriptor::disconnect_socket
	 */
	public void disconnect_by_node_id(byte[] node_id, boolean no_connection_possible) {
		bindings.PeerManager_disconnect_by_node_id(this.ptr, node_id, no_connection_possible);
	}

	/**
	 * This function should be called roughly once every 30 seconds.
	 * It will send pings to each peer and disconnect those which did not respond to the last
	 * round of pings.
	 * 
	 * May call [`send_data`] on all [`SocketDescriptor`]s. Thus, be very careful with reentrancy
	 * issues!
	 * 
	 * [`send_data`]: SocketDescriptor::send_data
	 */
	public void timer_tick_occurred() {
		bindings.PeerManager_timer_tick_occurred(this.ptr);
	}

}
