package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A tx_add_output message for adding an output during interactive transaction construction.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TxAddOutput extends CommonBase {
	TxAddOutput(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxAddOutput_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.TxAddOutput_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxAddOutput_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A randomly chosen unique identifier for this output, which is even for initiators and odd for
	 * non-initiators.
	 */
	public long get_serial_id() {
		long ret = bindings.TxAddOutput_get_serial_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A randomly chosen unique identifier for this output, which is even for initiators and odd for
	 * non-initiators.
	 */
	public void set_serial_id(long val) {
		bindings.TxAddOutput_set_serial_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The satoshi value of the output
	 */
	public long get_sats() {
		long ret = bindings.TxAddOutput_get_sats(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The satoshi value of the output
	 */
	public void set_sats(long val) {
		bindings.TxAddOutput_set_sats(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The scriptPubKey for the output
	 */
	public byte[] get_script() {
		byte[] ret = bindings.TxAddOutput_get_script(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The scriptPubKey for the output
	 */
	public void set_script(byte[] val) {
		bindings.TxAddOutput_set_script(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new TxAddOutput given each field
	 */
	public static TxAddOutput of(byte[] channel_id_arg, long serial_id_arg, long sats_arg, byte[] script_arg) {
		long ret = bindings.TxAddOutput_new(InternalUtils.check_arr_len(channel_id_arg, 32), serial_id_arg, sats_arg, script_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(serial_id_arg);
		Reference.reachabilityFence(sats_arg);
		Reference.reachabilityFence(script_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAddOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAddOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.TxAddOutput_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxAddOutput
	 */
	public TxAddOutput clone() {
		long ret = bindings.TxAddOutput_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAddOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAddOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two TxAddOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TxAddOutput b) {
		boolean ret = bindings.TxAddOutput_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TxAddOutput)) return false;
		return this.eq((TxAddOutput)o);
	}
	/**
	 * Serialize the TxAddOutput object into a byte array which can be read by TxAddOutput_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TxAddOutput_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TxAddOutput from a byte array, created by TxAddOutput_write
	 */
	public static Result_TxAddOutputDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxAddOutput_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxAddOutputDecodeErrorZ ret_hu_conv = Result_TxAddOutputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
