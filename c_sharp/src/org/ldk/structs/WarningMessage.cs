using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A warning message to be sent or received from a peer
 */
public class WarningMessage : CommonBase {
	internal WarningMessage(object _dummy, long ptr) : base(ptr) { }
	~WarningMessage() {
		if (ptr != 0) { bindings.WarningMessage_free(ptr); }
	}

	/**
	 * The channel ID involved in the warning.
	 * 
	 * All-0s indicates a warning unrelated to a specific channel.
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.WarningMessage_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The channel ID involved in the warning.
	 * 
	 * All-0s indicates a warning unrelated to a specific channel.
	 */
	public void set_channel_id(byte[] val) {
		bindings.WarningMessage_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A possibly human-readable warning description.
	 * The string should be sanitized before it is used (e.g. emitted to logs or printed to
	 * stdout). Otherwise, a well crafted error message may trigger a security vulnerability in
	 * the terminal emulator or the logging subsystem.
	 */
	public string get_data() {
		string ret = bindings.WarningMessage_get_data(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A possibly human-readable warning description.
	 * The string should be sanitized before it is used (e.g. emitted to logs or printed to
	 * stdout). Otherwise, a well crafted error message may trigger a security vulnerability in
	 * the terminal emulator or the logging subsystem.
	 */
	public void set_data(string val) {
		bindings.WarningMessage_set_data(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new WarningMessage given each field
	 */
	public static WarningMessage of(byte[] channel_id_arg, string data_arg) {
		long ret = bindings.WarningMessage_new(InternalUtils.check_arr_len(channel_id_arg, 32), data_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WarningMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WarningMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.WarningMessage_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the WarningMessage
	 */
	public WarningMessage clone() {
		long ret = bindings.WarningMessage_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WarningMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WarningMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two WarningMessages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.WarningMessage b) {
		bool ret = bindings.WarningMessage_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is WarningMessage)) return false;
		return this.eq((WarningMessage)o);
	}
	/**
	 * Serialize the WarningMessage object into a byte array which can be read by WarningMessage_read
	 */
	public byte[] write() {
		byte[] ret = bindings.WarningMessage_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a WarningMessage from a byte array, created by WarningMessage_write
	 */
	public static Result_WarningMessageDecodeErrorZ read(byte[] ser) {
		long ret = bindings.WarningMessage_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WarningMessageDecodeErrorZ ret_hu_conv = Result_WarningMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
