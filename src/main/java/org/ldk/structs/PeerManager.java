package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class PeerManager extends CommonBase {
	PeerManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.PeerManager_free(ptr); super.finalize();
	}

	// Skipped PeerManager_new
	// Skipped PeerManager_get_peer_node_ids
	// Skipped PeerManager_new_outbound_connection
	// Skipped PeerManager_new_inbound_connection
	// Skipped PeerManager_write_buffer_space_avail
	// Skipped PeerManager_read_event
	public void process_events() {
		bindings.PeerManager_process_events(this.ptr);
	}

	public void socket_disconnected(SocketDescriptor descriptor) {
		bindings.PeerManager_socket_disconnected(this.ptr, descriptor.ptr);
		this.ptrs_to.add(descriptor);
	}

	public void timer_tick_occured() {
		bindings.PeerManager_timer_tick_occured(this.ptr);
	}

}
