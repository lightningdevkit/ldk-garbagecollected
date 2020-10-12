package org.ldk.structs;

import org.ldk.impl.bindings;

public class ChannelMessageHandler extends CommonBase {
	ChannelMessageHandler(Object _dummy, long ptr) { super(ptr); }
	public ChannelMessageHandler(bindings.LDKChannelMessageHandler arg, bindings.LDKMessageSendEventsProvider MessageSendEventsProvider) {
		super(bindings.LDKChannelMessageHandler_new(arg, MessageSendEventsProvider));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelMessageHandler_free(ptr); super.finalize();
	}

}
