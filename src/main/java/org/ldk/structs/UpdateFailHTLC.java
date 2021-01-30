package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UpdateFailHTLC extends CommonBase {
	UpdateFailHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UpdateFailHTLC_free(ptr); }
	}

	public UpdateFailHTLC clone() {
		long ret = bindings.UpdateFailHTLC_clone(this.ptr);
		UpdateFailHTLC ret_hu_conv = new UpdateFailHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.UpdateFailHTLC_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.UpdateFailHTLC_set_channel_id(this.ptr, val);
	}

	public long get_htlc_id() {
		long ret = bindings.UpdateFailHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	public void set_htlc_id(long val) {
		bindings.UpdateFailHTLC_set_htlc_id(this.ptr, val);
	}

	public byte[] write() {
		byte[] ret = bindings.UpdateFailHTLC_write(this.ptr);
		return ret;
	}

	public static UpdateFailHTLC constructor_read(byte[] ser) {
		long ret = bindings.UpdateFailHTLC_read(ser);
		UpdateFailHTLC ret_hu_conv = new UpdateFailHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
