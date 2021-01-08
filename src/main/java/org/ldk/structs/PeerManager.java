package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PeerManager extends CommonBase {
	PeerManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PeerManager_free(ptr); }
	}

	public static PeerManager constructor_new(ChannelMessageHandler message_handler_chan_handler_arg, RoutingMessageHandler message_handler_route_handler_arg, byte[] our_node_secret, byte[] ephemeral_random_data, Logger logger) {
		long ret = bindings.PeerManager_new(bindings.MessageHandler_new(message_handler_chan_handler_arg == null ? 0 : message_handler_chan_handler_arg.ptr, message_handler_route_handler_arg == null ? 0 : message_handler_route_handler_arg.ptr), our_node_secret, ephemeral_random_data, logger == null ? 0 : logger.ptr);
		PeerManager ret_hu_conv = new PeerManager(null, ret);
		ret_hu_conv.ptrs_to.add(message_handler_chan_handler_arg);
		ret_hu_conv.ptrs_to.add(message_handler_route_handler_arg);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public byte[][] get_peer_node_ids() {
		byte[][] ret = bindings.PeerManager_get_peer_node_ids(this.ptr);
		return ret;
	}

	public Result_CVec_u8ZPeerHandleErrorZ new_outbound_connection(byte[] their_node_id, SocketDescriptor descriptor) {
		long ret = bindings.PeerManager_new_outbound_connection(this.ptr, their_node_id, descriptor == null ? 0 : descriptor.ptr);
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Result_NonePeerHandleErrorZ new_inbound_connection(SocketDescriptor descriptor) {
		long ret = bindings.PeerManager_new_inbound_connection(this.ptr, descriptor == null ? 0 : descriptor.ptr);
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Result_NonePeerHandleErrorZ write_buffer_space_avail(SocketDescriptor descriptor) {
		long ret = bindings.PeerManager_write_buffer_space_avail(this.ptr, descriptor == null ? 0 : descriptor.ptr);
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Result_boolPeerHandleErrorZ read_event(SocketDescriptor peer_descriptor, byte[] data) {
		long ret = bindings.PeerManager_read_event(this.ptr, peer_descriptor == null ? 0 : peer_descriptor.ptr, data);
		Result_boolPeerHandleErrorZ ret_hu_conv = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(peer_descriptor);
		return ret_hu_conv;
	}

	public void process_events() {
		bindings.PeerManager_process_events(this.ptr);
	}

	public void socket_disconnected(SocketDescriptor descriptor) {
		bindings.PeerManager_socket_disconnected(this.ptr, descriptor == null ? 0 : descriptor.ptr);
		this.ptrs_to.add(descriptor);
	}

	public void timer_tick_occured() {
		bindings.PeerManager_timer_tick_occured(this.ptr);
	}

}
