package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A tx_signatures message containing the sender's signatures for a transaction constructed with
 * interactive transaction construction.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TxSignatures extends CommonBase {
	TxSignatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxSignatures_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.TxSignatures_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxSignatures_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The TXID
	 */
	public byte[] get_tx_hash() {
		byte[] ret = bindings.TxSignatures_get_tx_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The TXID
	 */
	public void set_tx_hash(byte[] val) {
		bindings.TxSignatures_set_tx_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The list of witnesses
	 * 
	 * Returns a copy of the field.
	 */
	public byte[][] get_witnesses() {
		byte[][] ret = bindings.TxSignatures_get_witnesses(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The list of witnesses
	 */
	public void set_witnesses(byte[][] val) {
		bindings.TxSignatures_set_witnesses(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new TxSignatures given each field
	 */
	public static TxSignatures of(byte[] channel_id_arg, byte[] tx_hash_arg, byte[][] witnesses_arg) {
		long ret = bindings.TxSignatures_new(InternalUtils.check_arr_len(channel_id_arg, 32), InternalUtils.check_arr_len(tx_hash_arg, 32), witnesses_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(tx_hash_arg);
		Reference.reachabilityFence(witnesses_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxSignatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxSignatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.TxSignatures_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxSignatures
	 */
	public TxSignatures clone() {
		long ret = bindings.TxSignatures_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxSignatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxSignatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxSignatures.
	 */
	public long hash() {
		long ret = bindings.TxSignatures_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TxSignaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TxSignatures b) {
		boolean ret = bindings.TxSignatures_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TxSignatures)) return false;
		return this.eq((TxSignatures)o);
	}
	/**
	 * Serialize the TxSignatures object into a byte array which can be read by TxSignatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TxSignatures_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TxSignatures from a byte array, created by TxSignatures_write
	 */
	public static Result_TxSignaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxSignatures_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxSignaturesDecodeErrorZ ret_hu_conv = Result_TxSignaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
