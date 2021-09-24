
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class PeerManager extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.PeerManager_free(this.ptr);
                    }
                }
	public static PeerManager constructor_new(ChannelMessageHandler message_handler_chan_handler_arg, RoutingMessageHandler message_handler_route_handler_arg, Uint8Array our_node_secret, Uint8Array ephemeral_random_data, Logger logger, CustomMessageHandler custom_message_handler) {
		number ret = bindings.PeerManager_new(bindings.MessageHandler_new(message_handler_chan_handler_arg == null ? 0 : message_handler_chan_handler_arg.ptr, message_handler_route_handler_arg == null ? 0 : message_handler_route_handler_arg.ptr), our_node_secret, ephemeral_random_data, logger == null ? 0 : logger.ptr, custom_message_handler == null ? 0 : custom_message_handler.ptr);
		const ret_hu_conv: PeerManager = new PeerManager(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(message_handler_chan_handler_arg);
		ret_hu_conv.ptrs_to.add(message_handler_route_handler_arg);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(custom_message_handler);
		return ret_hu_conv;
	}

	public Uint8Array[] get_peer_node_ids() {
		Uint8Array[] ret = bindings.PeerManager_get_peer_node_ids(this.ptr);
		return ret;
	}

	public Result_CVec_u8ZPeerHandleErrorZ new_outbound_connection(Uint8Array their_node_id, SocketDescriptor descriptor) {
		number ret = bindings.PeerManager_new_outbound_connection(this.ptr, their_node_id, descriptor == null ? 0 : descriptor.ptr);
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Result_NonePeerHandleErrorZ new_inbound_connection(SocketDescriptor descriptor) {
		number ret = bindings.PeerManager_new_inbound_connection(this.ptr, descriptor == null ? 0 : descriptor.ptr);
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Result_NonePeerHandleErrorZ write_buffer_space_avail(SocketDescriptor descriptor) {
		number ret = bindings.PeerManager_write_buffer_space_avail(this.ptr, descriptor == null ? 0 : descriptor.ptr);
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Result_boolPeerHandleErrorZ read_event(SocketDescriptor peer_descriptor, Uint8Array data) {
		number ret = bindings.PeerManager_read_event(this.ptr, peer_descriptor == null ? 0 : peer_descriptor.ptr, data);
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

	public void disconnect_by_node_id(Uint8Array node_id, boolean no_connection_possible) {
		bindings.PeerManager_disconnect_by_node_id(this.ptr, node_id, no_connection_possible);
	}

	public void timer_tick_occurred() {
		bindings.PeerManager_timer_tick_occurred(this.ptr);
	}

}
