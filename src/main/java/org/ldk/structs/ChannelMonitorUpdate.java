package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelMonitorUpdate extends CommonBase {
	ChannelMonitorUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelMonitorUpdate_free(ptr); }
	}

	public static ChannelMonitorUpdate constructor_clone(ChannelMonitorUpdate orig) {
		long ret = bindings.ChannelMonitorUpdate_clone(orig == null ? 0 : orig.ptr & ~1);
		ChannelMonitorUpdate ret_hu_conv = new ChannelMonitorUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public long get_update_id() {
		long ret = bindings.ChannelMonitorUpdate_get_update_id(this.ptr);
		return ret;
	}

	public void set_update_id(long val) {
		bindings.ChannelMonitorUpdate_set_update_id(this.ptr, val);
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelMonitorUpdate_write(this.ptr);
		return ret;
	}

	public static ChannelMonitorUpdate constructor_read(byte[] ser) {
		long ret = bindings.ChannelMonitorUpdate_read(ser);
		ChannelMonitorUpdate ret_hu_conv = new ChannelMonitorUpdate(null, ret);
		return ret_hu_conv;
	}

}
