package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A tx_abort message which signals the cancellation of an in-progress transaction negotiation.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TxAbort extends CommonBase {
	TxAbort(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxAbort_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.TxAbort_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxAbort_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Message data
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_data() {
		byte[] ret = bindings.TxAbort_get_data(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Message data
	 */
	public void set_data(byte[] val) {
		bindings.TxAbort_set_data(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new TxAbort given each field
	 */
	public static TxAbort of(byte[] channel_id_arg, byte[] data_arg) {
		long ret = bindings.TxAbort_new(InternalUtils.check_arr_len(channel_id_arg, 32), data_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAbort ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAbort(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.TxAbort_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxAbort
	 */
	public TxAbort clone() {
		long ret = bindings.TxAbort_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAbort ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAbort(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two TxAborts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TxAbort b) {
		boolean ret = bindings.TxAbort_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TxAbort)) return false;
		return this.eq((TxAbort)o);
	}
	/**
	 * Serialize the TxAbort object into a byte array which can be read by TxAbort_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TxAbort_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TxAbort from a byte array, created by TxAbort_write
	 */
	public static Result_TxAbortDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxAbort_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxAbortDecodeErrorZ ret_hu_conv = Result_TxAbortDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
