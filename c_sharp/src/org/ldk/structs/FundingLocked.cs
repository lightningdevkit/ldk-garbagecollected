using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information exchanged during channel reestablishment about the last funding locked.
 */
public class FundingLocked : CommonBase {
	internal FundingLocked(object _dummy, long ptr) : base(ptr) { }
	~FundingLocked() {
		if (ptr != 0) { bindings.FundingLocked_free(ptr); }
	}

	/**
	 * The last txid sent by the sending node, which may be either from the last `splice_locked` or
	 * for the initial funding transaction if it sent `channel_ready`.
	 */
	public byte[] get_txid() {
		long ret = bindings.FundingLocked_get_txid(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The last txid sent by the sending node, which may be either from the last `splice_locked` or
	 * for the initial funding transaction if it sent `channel_ready`.
	 */
	public void set_txid(byte[] val) {
		bindings.FundingLocked_set_txid(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`FundingLockedFlags`] for details.
	 */
	public byte get_retransmit_flags() {
		byte ret = bindings.FundingLocked_get_retransmit_flags(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`FundingLockedFlags`] for details.
	 */
	public void set_retransmit_flags(byte val) {
		bindings.FundingLocked_set_retransmit_flags(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new FundingLocked given each field
	 */
	public static org.ldk.structs.FundingLocked of(byte[] txid_arg, byte retransmit_flags_arg) {
		long ret = bindings.FundingLocked_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(txid_arg, 32)), retransmit_flags_arg);
		GC.KeepAlive(txid_arg);
		GC.KeepAlive(retransmit_flags_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FundingLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FundingLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.FundingLocked_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the FundingLocked
	 */
	public org.ldk.structs.FundingLocked clone() {
		long ret = bindings.FundingLocked_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FundingLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FundingLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the FundingLocked.
	 */
	public long hash() {
		long ret = bindings.FundingLocked_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two FundingLockeds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.FundingLocked b) {
		bool ret = bindings.FundingLocked_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is FundingLocked)) return false;
		return this.eq((FundingLocked)o);
	}
	/**
	 * Sets the bit in `retransmit_flags` for retransmitting the message corresponding to `flag`.
	 */
	public void retransmit(FundingLockedFlags flag) {
		bindings.FundingLocked_retransmit(this.ptr, flag);
		GC.KeepAlive(this);
		GC.KeepAlive(flag);
	}

	/**
	 * Returns whether the message corresponding to `flag` should be retransmitted.
	 */
	public bool should_retransmit(FundingLockedFlags flag) {
		bool ret = bindings.FundingLocked_should_retransmit(this.ptr, flag);
		GC.KeepAlive(this);
		GC.KeepAlive(flag);
		return ret;
	}

	/**
	 * Serialize the FundingLocked object into a byte array which can be read by FundingLocked_read
	 */
	public byte[] write() {
		long ret = bindings.FundingLocked_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a FundingLocked from a byte array, created by FundingLocked_write
	 */
	public static org.ldk.structs.Result_FundingLockedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.FundingLocked_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingLockedDecodeErrorZ ret_hu_conv = Result_FundingLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
