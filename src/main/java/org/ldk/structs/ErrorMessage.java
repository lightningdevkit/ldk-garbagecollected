package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An error message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ErrorMessage extends CommonBase {
	ErrorMessage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ErrorMessage_free(ptr); }
	}

	/**
	 * The channel ID involved in the error
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.ErrorMessage_get_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The channel ID involved in the error
	 */
	public void set_channel_id(byte[] val) {
		bindings.ErrorMessage_set_channel_id(this.ptr, val);
	}

	/**
	 * A possibly human-readable error description.
	 * The string should be sanitized before it is used (e.g. emitted to logs
	 * or printed to stdout).  Otherwise, a well crafted error message may trigger a security
	 * vulnerability in the terminal emulator or the logging subsystem.
	 */
	public String get_data() {
		String ret = bindings.ErrorMessage_get_data(this.ptr);
		return ret;
	}

	/**
	 * A possibly human-readable error description.
	 * The string should be sanitized before it is used (e.g. emitted to logs
	 * or printed to stdout).  Otherwise, a well crafted error message may trigger a security
	 * vulnerability in the terminal emulator or the logging subsystem.
	 */
	public void set_data(String val) {
		bindings.ErrorMessage_set_data(this.ptr, val);
	}

	/**
	 * Constructs a new ErrorMessage given each field
	 */
	public static ErrorMessage constructor_new(byte[] channel_id_arg, String data_arg) {
		long ret = bindings.ErrorMessage_new(channel_id_arg, data_arg);
		ErrorMessage ret_hu_conv = new ErrorMessage(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the ErrorMessage
	 */
	public ErrorMessage clone() {
		long ret = bindings.ErrorMessage_clone(this.ptr);
		ErrorMessage ret_hu_conv = new ErrorMessage(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ErrorMessage object into a byte array which can be read by ErrorMessage_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ErrorMessage_write(this.ptr);
		return ret;
	}

	/**
	 * Read a ErrorMessage from a byte array, created by ErrorMessage_write
	 */
	public static Result_ErrorMessageDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.ErrorMessage_read(ser);
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
