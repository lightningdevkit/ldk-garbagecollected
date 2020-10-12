package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class MonitorEvent extends CommonBase {
	MonitorEvent(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.MonitorEvent_free(ptr); super.finalize();
	}

}
