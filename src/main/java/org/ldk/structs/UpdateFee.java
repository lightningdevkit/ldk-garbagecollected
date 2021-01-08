package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UpdateFee extends CommonBase {
	UpdateFee(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UpdateFee_free(ptr); }
	}

	public UpdateFee clone() {
		long ret = bindings.UpdateFee_clone(this.ptr);
		UpdateFee ret_hu_conv = new UpdateFee(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.UpdateFee_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.UpdateFee_set_channel_id(this.ptr, val);
	}

	public int get_feerate_per_kw() {
		int ret = bindings.UpdateFee_get_feerate_per_kw(this.ptr);
		return ret;
	}

	public void set_feerate_per_kw(int val) {
		bindings.UpdateFee_set_feerate_per_kw(this.ptr, val);
	}

	public static UpdateFee constructor_new(byte[] channel_id_arg, int feerate_per_kw_arg) {
		long ret = bindings.UpdateFee_new(channel_id_arg, feerate_per_kw_arg);
		UpdateFee ret_hu_conv = new UpdateFee(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.UpdateFee_write(this.ptr);
		return ret;
	}

	public static UpdateFee constructor_read(byte[] ser) {
		long ret = bindings.UpdateFee_read(ser);
		UpdateFee ret_hu_conv = new UpdateFee(null, ret);
		return ret_hu_conv;
	}

}
