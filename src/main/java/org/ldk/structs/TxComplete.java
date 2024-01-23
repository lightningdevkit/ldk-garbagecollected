package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A tx_complete message signalling the conclusion of a peer's transaction contributions during
 * interactive transaction construction.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TxComplete extends CommonBase {
	TxComplete(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxComplete_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.TxComplete_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxComplete_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new TxComplete given each field
	 */
	public static TxComplete of(byte[] channel_id_arg) {
		long ret = bindings.TxComplete_new(InternalUtils.check_arr_len(channel_id_arg, 32));
		Reference.reachabilityFence(channel_id_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxComplete ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxComplete(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.TxComplete_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxComplete
	 */
	public TxComplete clone() {
		long ret = bindings.TxComplete_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxComplete ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxComplete(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxComplete.
	 */
	public long hash() {
		long ret = bindings.TxComplete_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TxCompletes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TxComplete b) {
		boolean ret = bindings.TxComplete_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TxComplete)) return false;
		return this.eq((TxComplete)o);
	}
	/**
	 * Serialize the TxComplete object into a byte array which can be read by TxComplete_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TxComplete_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TxComplete from a byte array, created by TxComplete_write
	 */
	public static Result_TxCompleteDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxComplete_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxCompleteDecodeErrorZ ret_hu_conv = Result_TxCompleteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
