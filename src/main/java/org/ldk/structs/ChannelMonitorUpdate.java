package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelMonitorUpdate extends CommonBase {
	ChannelMonitorUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelMonitorUpdate_free(ptr); super.finalize();
	}

	public ChannelMonitorUpdate(ChannelMonitorUpdate orig) {
		super(bindings.ChannelMonitorUpdate_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public long get_update_id(ChannelMonitorUpdate this_ptr) {
		long ret = bindings.ChannelMonitorUpdate_get_update_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_update_id(ChannelMonitorUpdate this_ptr, long val) {
		bindings.ChannelMonitorUpdate_set_update_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped ChannelMonitorUpdate_write
	// Skipped ChannelMonitorUpdate_read
}
