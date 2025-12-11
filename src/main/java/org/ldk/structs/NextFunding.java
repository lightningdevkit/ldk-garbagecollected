package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Information exchanged during channel reestablishment about the next funding from interactive
 * transaction construction.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NextFunding extends CommonBase {
	NextFunding(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NextFunding_free(ptr); }
	}

	/**
	 * The txid of the interactive transaction construction.
	 */
	public byte[] get_txid() {
		byte[] ret = bindings.NextFunding_get_txid(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The txid of the interactive transaction construction.
	 */
	public void set_txid(byte[] val) {
		bindings.NextFunding_set_txid(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`NextFundingFlag`] for details.
	 */
	public byte get_retransmit_flags() {
		byte ret = bindings.NextFunding_get_retransmit_flags(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`NextFundingFlag`] for details.
	 */
	public void set_retransmit_flags(byte val) {
		bindings.NextFunding_set_retransmit_flags(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new NextFunding given each field
	 */
	public static NextFunding of(byte[] txid_arg, byte retransmit_flags_arg) {
		long ret = bindings.NextFunding_new(InternalUtils.check_arr_len(txid_arg, 32), retransmit_flags_arg);
		Reference.reachabilityFence(txid_arg);
		Reference.reachabilityFence(retransmit_flags_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NextFunding ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NextFunding(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.NextFunding_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the NextFunding
	 */
	public NextFunding clone() {
		long ret = bindings.NextFunding_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NextFunding ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NextFunding(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NextFunding.
	 */
	public long hash() {
		long ret = bindings.NextFunding_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two NextFundings contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.NextFunding b) {
		boolean ret = bindings.NextFunding_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof NextFunding)) return false;
		return this.eq((NextFunding)o);
	}
	/**
	 * Sets the bit in `retransmit_flags` for retransmitting the message corresponding to `flag`.
	 */
	public void retransmit(org.ldk.enums.NextFundingFlag flag) {
		bindings.NextFunding_retransmit(this.ptr, flag);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(flag);
	}

	/**
	 * Returns whether the message corresponding to `flag` should be retransmitted.
	 */
	public boolean should_retransmit(org.ldk.enums.NextFundingFlag flag) {
		boolean ret = bindings.NextFunding_should_retransmit(this.ptr, flag);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(flag);
		return ret;
	}

	/**
	 * Serialize the NextFunding object into a byte array which can be read by NextFunding_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NextFunding_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a NextFunding from a byte array, created by NextFunding_write
	 */
	public static Result_NextFundingDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NextFunding_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NextFundingDecodeErrorZ ret_hu_conv = Result_NextFundingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
