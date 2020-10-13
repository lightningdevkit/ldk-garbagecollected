package org.ldk.structs;

import org.ldk.impl.bindings;

import org.ldk.enums.*;

public class Watch extends CommonBase {
	Watch(Object _dummy, long ptr) { super(ptr); }
	public Watch(bindings.LDKWatch arg) {
		super(bindings.LDKWatch_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Watch_free(ptr); super.finalize();
	}

	// Skipped Watch_watch_channel
	// Skipped Watch_update_channel
	// Skipped Watch_release_pending_monitor_events
}
