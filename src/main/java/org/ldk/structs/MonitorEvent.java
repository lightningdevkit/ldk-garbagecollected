package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MonitorEvent extends CommonBase {
	MonitorEvent(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MonitorEvent_free(ptr); }
	}

	public MonitorEvent clone() {
		long ret = bindings.MonitorEvent_clone(this.ptr);
		MonitorEvent ret_hu_conv = new MonitorEvent(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
