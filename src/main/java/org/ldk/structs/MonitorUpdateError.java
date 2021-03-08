package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * General Err type for ChannelMonitor actions. Generally, this implies that the data provided is
 * inconsistent with the ChannelMonitor being called. eg for ChannelMonitor::update_monitor this
 * means you tried to update a monitor for a different channel or the ChannelMonitorUpdate was
 * corrupted.
 * Contains a developer-readable error message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MonitorUpdateError extends CommonBase {
	MonitorUpdateError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MonitorUpdateError_free(ptr); }
	}

	/**
	 * Creates a copy of the MonitorUpdateError
	 */
	public MonitorUpdateError clone() {
		long ret = bindings.MonitorUpdateError_clone(this.ptr);
		MonitorUpdateError ret_hu_conv = new MonitorUpdateError(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
