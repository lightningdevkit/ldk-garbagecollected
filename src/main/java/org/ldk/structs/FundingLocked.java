package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Information exchanged during channel reestablishment about the last funding locked.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FundingLocked extends CommonBase {
	FundingLocked(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FundingLocked_free(ptr); }
	}

	/**
	 * The last txid sent by the sending node, which may be either from the last `splice_locked` or
	 * for the initial funding transaction if it sent `channel_ready`.
	 */
	public byte[] get_txid() {
		byte[] ret = bindings.FundingLocked_get_txid(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The last txid sent by the sending node, which may be either from the last `splice_locked` or
	 * for the initial funding transaction if it sent `channel_ready`.
	 */
	public void set_txid(byte[] val) {
		bindings.FundingLocked_set_txid(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`FundingLockedFlags`] for details.
	 */
	public byte get_retransmit_flags() {
		byte ret = bindings.FundingLocked_get_retransmit_flags(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`FundingLockedFlags`] for details.
	 */
	public void set_retransmit_flags(byte val) {
		bindings.FundingLocked_set_retransmit_flags(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new FundingLocked given each field
	 */
	public static FundingLocked of(byte[] txid_arg, byte retransmit_flags_arg) {
		long ret = bindings.FundingLocked_new(InternalUtils.check_arr_len(txid_arg, 32), retransmit_flags_arg);
		Reference.reachabilityFence(txid_arg);
		Reference.reachabilityFence(retransmit_flags_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FundingLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FundingLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.FundingLocked_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the FundingLocked
	 */
	public FundingLocked clone() {
		long ret = bindings.FundingLocked_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FundingLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FundingLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the FundingLocked.
	 */
	public long hash() {
		long ret = bindings.FundingLocked_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two FundingLockeds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.FundingLocked b) {
		boolean ret = bindings.FundingLocked_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof FundingLocked)) return false;
		return this.eq((FundingLocked)o);
	}
	/**
	 * Sets the bit in `retransmit_flags` for retransmitting the message corresponding to `flag`.
	 */
	public void retransmit(org.ldk.enums.FundingLockedFlags flag) {
		bindings.FundingLocked_retransmit(this.ptr, flag);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(flag);
	}

	/**
	 * Returns whether the message corresponding to `flag` should be retransmitted.
	 */
	public boolean should_retransmit(org.ldk.enums.FundingLockedFlags flag) {
		boolean ret = bindings.FundingLocked_should_retransmit(this.ptr, flag);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(flag);
		return ret;
	}

	/**
	 * Serialize the FundingLocked object into a byte array which can be read by FundingLocked_read
	 */
	public byte[] write() {
		byte[] ret = bindings.FundingLocked_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a FundingLocked from a byte array, created by FundingLocked_write
	 */
	public static Result_FundingLockedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.FundingLocked_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingLockedDecodeErrorZ ret_hu_conv = Result_FundingLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
