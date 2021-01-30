package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ErrorMessage extends CommonBase {
	ErrorMessage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ErrorMessage_free(ptr); }
	}

	public ErrorMessage clone() {
		long ret = bindings.ErrorMessage_clone(this.ptr);
		ErrorMessage ret_hu_conv = new ErrorMessage(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.ErrorMessage_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.ErrorMessage_set_channel_id(this.ptr, val);
	}

	public String get_data() {
		String ret = bindings.ErrorMessage_get_data(this.ptr);
		return ret;
	}

	public void set_data(byte[] val) {
		bindings.ErrorMessage_set_data(this.ptr, val);
	}

	public static ErrorMessage constructor_new(byte[] channel_id_arg, byte[] data_arg) {
		long ret = bindings.ErrorMessage_new(channel_id_arg, data_arg);
		ErrorMessage ret_hu_conv = new ErrorMessage(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.ErrorMessage_write(this.ptr);
		return ret;
	}

	public static Result_ErrorMessageDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.ErrorMessage_read(ser);
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
