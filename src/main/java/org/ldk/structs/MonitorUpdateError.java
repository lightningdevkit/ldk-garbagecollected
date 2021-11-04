package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


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

	public String get_a() {
		String ret = bindings.MonitorUpdateError_get_a(this.ptr);
		return ret;
	}

	public void set_a(java.lang.String val) {
		bindings.MonitorUpdateError_set_a(this.ptr, val);
	}

	/**
	 * Constructs a new MonitorUpdateError given each field
	 */
	public static MonitorUpdateError of(java.lang.String a_arg) {
		long ret = bindings.MonitorUpdateError_new(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		MonitorUpdateError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new MonitorUpdateError(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the MonitorUpdateError
	 */
	public MonitorUpdateError clone() {
		long ret = bindings.MonitorUpdateError_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		MonitorUpdateError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new MonitorUpdateError(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
