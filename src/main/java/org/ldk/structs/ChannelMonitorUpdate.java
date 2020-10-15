package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelMonitorUpdate extends CommonBase {
	ChannelMonitorUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ChannelMonitorUpdate_free(ptr);
	}

	public ChannelMonitorUpdate(ChannelMonitorUpdate orig) {
		super(bindings.ChannelMonitorUpdate_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public long get_update_id(ChannelMonitorUpdate this_ptr) {
		long ret = bindings.ChannelMonitorUpdate_get_update_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_update_id(ChannelMonitorUpdate this_ptr, long val) {
		bindings.ChannelMonitorUpdate_set_update_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] write(ChannelMonitorUpdate obj) {
		byte[] ret = bindings.ChannelMonitorUpdate_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public ChannelMonitorUpdate(byte[] ser) {
		super(bindings.ChannelMonitorUpdate_read(ser));
	}

}
