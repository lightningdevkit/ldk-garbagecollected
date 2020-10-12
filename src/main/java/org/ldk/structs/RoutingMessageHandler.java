package org.ldk.structs;

import org.ldk.impl.bindings;

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

}
