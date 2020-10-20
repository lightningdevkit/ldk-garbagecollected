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
		bindings.ErrorMessage_free(ptr);
	}

	public static ErrorMessage constructor_clone(ErrorMessage orig) {
		long ret = bindings.ErrorMessage_clone(orig == null ? 0 : orig.ptr & ~1);
		ErrorMessage ret_hu_conv = new ErrorMessage(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
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
		return ret_hu_conv;
	}

	public byte[] write(ErrorMessage obj) {
		byte[] ret = bindings.ErrorMessage_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static ErrorMessage constructor_read(byte[] ser) {
		long ret = bindings.ErrorMessage_read(ser);
		ErrorMessage ret_hu_conv = new ErrorMessage(null, ret);
		return ret_hu_conv;
	}

}
