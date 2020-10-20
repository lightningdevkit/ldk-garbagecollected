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
		bindings.UpdateFee_free(ptr);
	}

	public static UpdateFee constructor_clone(UpdateFee orig) {
		long ret = bindings.UpdateFee_clone(orig == null ? 0 : orig.ptr & ~1);
		UpdateFee ret_hu_conv = new UpdateFee(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
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

	public byte[] write(UpdateFee obj) {
		byte[] ret = bindings.UpdateFee_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static UpdateFee constructor_read(byte[] ser) {
		long ret = bindings.UpdateFee_read(ser);
		UpdateFee ret_hu_conv = new UpdateFee(null, ret);
		return ret_hu_conv;
	}

}
