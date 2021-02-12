package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UpdateFulfillHTLC extends CommonBase {
	UpdateFulfillHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UpdateFulfillHTLC_free(ptr); }
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.UpdateFulfillHTLC_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.UpdateFulfillHTLC_set_channel_id(this.ptr, val);
	}

	public long get_htlc_id() {
		long ret = bindings.UpdateFulfillHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	public void set_htlc_id(long val) {
		bindings.UpdateFulfillHTLC_set_htlc_id(this.ptr, val);
	}

	public byte[] get_payment_preimage() {
		byte[] ret = bindings.UpdateFulfillHTLC_get_payment_preimage(this.ptr);
		return ret;
	}

	public void set_payment_preimage(byte[] val) {
		bindings.UpdateFulfillHTLC_set_payment_preimage(this.ptr, val);
	}

	public static UpdateFulfillHTLC constructor_new(byte[] channel_id_arg, long htlc_id_arg, byte[] payment_preimage_arg) {
		long ret = bindings.UpdateFulfillHTLC_new(channel_id_arg, htlc_id_arg, payment_preimage_arg);
		UpdateFulfillHTLC ret_hu_conv = new UpdateFulfillHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public UpdateFulfillHTLC clone() {
		long ret = bindings.UpdateFulfillHTLC_clone(this.ptr);
		UpdateFulfillHTLC ret_hu_conv = new UpdateFulfillHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.UpdateFulfillHTLC_write(this.ptr);
		return ret;
	}

	public static Result_UpdateFulfillHTLCDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.UpdateFulfillHTLC_read(ser);
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
