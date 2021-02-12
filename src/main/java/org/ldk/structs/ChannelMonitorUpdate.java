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

	public long get_update_id() {
		long ret = bindings.ChannelMonitorUpdate_get_update_id(this.ptr);
		return ret;
	}

	public void set_update_id(long val) {
		bindings.ChannelMonitorUpdate_set_update_id(this.ptr, val);
	}

	public ChannelMonitorUpdate clone() {
		long ret = bindings.ChannelMonitorUpdate_clone(this.ptr);
		ChannelMonitorUpdate ret_hu_conv = new ChannelMonitorUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelMonitorUpdate_write(this.ptr);
		return ret;
	}

	public static Result_ChannelMonitorUpdateDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.ChannelMonitorUpdate_read(ser);
		Result_ChannelMonitorUpdateDecodeErrorZ ret_hu_conv = Result_ChannelMonitorUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
