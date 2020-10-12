package org.ldk.structs;

import org.ldk.impl.bindings;

import org.ldk.enums.*;

public class MessageSendEventsProvider extends CommonBase {
	MessageSendEventsProvider(Object _dummy, long ptr) { super(ptr); }
	public MessageSendEventsProvider(bindings.LDKMessageSendEventsProvider arg) {
		super(bindings.LDKMessageSendEventsProvider_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.MessageSendEventsProvider_free(ptr); super.finalize();
	}

	// Skipped MessageSendEventsProvider_call_get_and_clear_pending_msg_events
}
