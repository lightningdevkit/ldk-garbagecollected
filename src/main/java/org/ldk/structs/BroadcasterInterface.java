package org.ldk.structs;

import org.ldk.impl.bindings;

import org.ldk.enums.*;

public class BroadcasterInterface extends CommonBase {
	BroadcasterInterface(Object _dummy, long ptr) { super(ptr); }
	public BroadcasterInterface(bindings.LDKBroadcasterInterface arg) {
		super(bindings.LDKBroadcasterInterface_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.BroadcasterInterface_free(ptr); super.finalize();
	}

	// Skipped BroadcasterInterface_call_broadcast_transaction
}
