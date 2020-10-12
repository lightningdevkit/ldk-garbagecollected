package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class MonitorUpdateError extends CommonBase {
	MonitorUpdateError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.MonitorUpdateError_free(ptr); super.finalize();
	}

}
