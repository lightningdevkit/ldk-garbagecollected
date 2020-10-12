package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class Init extends CommonBase {
	Init(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Init_free(ptr); super.finalize();
	}

	// Skipped Init_write
	// Skipped Init_read
}
