package org.ldk.structs;

import org.ldk.impl.bindings;

import org.ldk.enums.*;

public class RoutingMessageHandler extends CommonBase {
	RoutingMessageHandler(Object _dummy, long ptr) { super(ptr); }
	public RoutingMessageHandler(bindings.LDKRoutingMessageHandler arg) {
		super(bindings.LDKRoutingMessageHandler_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.RoutingMessageHandler_free(ptr); super.finalize();
	}

	// Skipped RoutingMessageHandler_call_handle_node_announcement
	// Skipped RoutingMessageHandler_call_handle_channel_announcement
	// Skipped RoutingMessageHandler_call_handle_channel_update
	// Skipped RoutingMessageHandler_call_handle_htlc_fail_channel_update
	// Skipped RoutingMessageHandler_call_get_next_channel_announcements
	// Skipped RoutingMessageHandler_call_get_next_node_announcements
	public boolean call_should_request_full_sync(byte[] node_id) {
		boolean ret = bindings.RoutingMessageHandler_call_should_request_full_sync(this.ptr, node_id);
		return ret;
	}

}
