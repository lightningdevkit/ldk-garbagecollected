package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`warning`] message to be sent to or received from a peer.
 * 
 * [`warning`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-error-and-warning-messages
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class WarningMessage extends CommonBase {
	WarningMessage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.WarningMessage_free(ptr); }
	}

	/**
	 * The channel ID involved in the warning.
	 * 
	 * All-0s indicates a warning unrelated to a specific channel.
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.WarningMessage_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID involved in the warning.
	 * 
	 * All-0s indicates a warning unrelated to a specific channel.
	 */
	public void set_channel_id(byte[] val) {
		bindings.WarningMessage_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A possibly human-readable warning description.
	 * 
	 * The string should be sanitized before it is used (e.g. emitted to logs or printed to
	 * stdout). Otherwise, a well crafted error message may trigger a security vulnerability in
	 * the terminal emulator or the logging subsystem.
	 */
	public String get_data() {
		String ret = bindings.WarningMessage_get_data(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A possibly human-readable warning description.
	 * 
	 * The string should be sanitized before it is used (e.g. emitted to logs or printed to
	 * stdout). Otherwise, a well crafted error message may trigger a security vulnerability in
	 * the terminal emulator or the logging subsystem.
	 */
	public void set_data(java.lang.String val) {
		bindings.WarningMessage_set_data(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new WarningMessage given each field
	 */
	public static WarningMessage of(byte[] channel_id_arg, java.lang.String data_arg) {
		long ret = bindings.WarningMessage_new(InternalUtils.check_arr_len(channel_id_arg, 32), data_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WarningMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WarningMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.WarningMessage_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the WarningMessage
	 */
	public WarningMessage clone() {
		long ret = bindings.WarningMessage_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WarningMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WarningMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the WarningMessage.
	 */
	public long hash() {
		long ret = bindings.WarningMessage_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two WarningMessages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.WarningMessage b) {
		boolean ret = bindings.WarningMessage_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof WarningMessage)) return false;
		return this.eq((WarningMessage)o);
	}
	/**
	 * Serialize the WarningMessage object into a byte array which can be read by WarningMessage_read
	 */
	public byte[] write() {
		byte[] ret = bindings.WarningMessage_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a WarningMessage from a byte array, created by WarningMessage_write
	 */
	public static Result_WarningMessageDecodeErrorZ read(byte[] ser) {
		long ret = bindings.WarningMessage_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WarningMessageDecodeErrorZ ret_hu_conv = Result_WarningMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
