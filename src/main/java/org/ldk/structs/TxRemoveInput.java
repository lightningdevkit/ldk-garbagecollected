package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A tx_remove_input message for removing an input during interactive transaction construction.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TxRemoveInput extends CommonBase {
	TxRemoveInput(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxRemoveInput_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.TxRemoveInput_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxRemoveInput_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The serial ID of the input to be removed
	 */
	public long get_serial_id() {
		long ret = bindings.TxRemoveInput_get_serial_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The serial ID of the input to be removed
	 */
	public void set_serial_id(long val) {
		bindings.TxRemoveInput_set_serial_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new TxRemoveInput given each field
	 */
	public static TxRemoveInput of(byte[] channel_id_arg, long serial_id_arg) {
		long ret = bindings.TxRemoveInput_new(InternalUtils.check_arr_len(channel_id_arg, 32), serial_id_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(serial_id_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxRemoveInput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxRemoveInput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.TxRemoveInput_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxRemoveInput
	 */
	public TxRemoveInput clone() {
		long ret = bindings.TxRemoveInput_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxRemoveInput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxRemoveInput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxRemoveInput.
	 */
	public long hash() {
		long ret = bindings.TxRemoveInput_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TxRemoveInputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TxRemoveInput b) {
		boolean ret = bindings.TxRemoveInput_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TxRemoveInput)) return false;
		return this.eq((TxRemoveInput)o);
	}
	/**
	 * Serialize the TxRemoveInput object into a byte array which can be read by TxRemoveInput_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TxRemoveInput_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TxRemoveInput from a byte array, created by TxRemoveInput_write
	 */
	public static Result_TxRemoveInputDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxRemoveInput_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxRemoveInputDecodeErrorZ ret_hu_conv = Result_TxRemoveInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
