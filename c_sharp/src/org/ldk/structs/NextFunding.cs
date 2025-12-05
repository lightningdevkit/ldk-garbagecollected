using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information exchanged during channel reestablishment about the next funding from interactive
 * transaction construction.
 */
public class NextFunding : CommonBase {
	internal NextFunding(object _dummy, long ptr) : base(ptr) { }
	~NextFunding() {
		if (ptr != 0) { bindings.NextFunding_free(ptr); }
	}

	/**
	 * The txid of the interactive transaction construction.
	 */
	public byte[] get_txid() {
		long ret = bindings.NextFunding_get_txid(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The txid of the interactive transaction construction.
	 */
	public void set_txid(byte[] val) {
		bindings.NextFunding_set_txid(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`NextFundingFlag`] for details.
	 */
	public byte get_retransmit_flags() {
		byte ret = bindings.NextFunding_get_retransmit_flags(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`NextFundingFlag`] for details.
	 */
	public void set_retransmit_flags(byte val) {
		bindings.NextFunding_set_retransmit_flags(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new NextFunding given each field
	 */
	public static org.ldk.structs.NextFunding of(byte[] txid_arg, byte retransmit_flags_arg) {
		long ret = bindings.NextFunding_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(txid_arg, 32)), retransmit_flags_arg);
		GC.KeepAlive(txid_arg);
		GC.KeepAlive(retransmit_flags_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NextFunding ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NextFunding(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.NextFunding_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the NextFunding
	 */
	public org.ldk.structs.NextFunding clone() {
		long ret = bindings.NextFunding_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NextFunding ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NextFunding(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NextFunding.
	 */
	public long hash() {
		long ret = bindings.NextFunding_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two NextFundings contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.NextFunding b) {
		bool ret = bindings.NextFunding_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is NextFunding)) return false;
		return this.eq((NextFunding)o);
	}
	/**
	 * Sets the bit in `retransmit_flags` for retransmitting the message corresponding to `flag`.
	 */
	public void retransmit(NextFundingFlag flag) {
		bindings.NextFunding_retransmit(this.ptr, flag);
		GC.KeepAlive(this);
		GC.KeepAlive(flag);
	}

	/**
	 * Returns whether the message corresponding to `flag` should be retransmitted.
	 */
	public bool should_retransmit(NextFundingFlag flag) {
		bool ret = bindings.NextFunding_should_retransmit(this.ptr, flag);
		GC.KeepAlive(this);
		GC.KeepAlive(flag);
		return ret;
	}

	/**
	 * Serialize the NextFunding object into a byte array which can be read by NextFunding_read
	 */
	public byte[] write() {
		long ret = bindings.NextFunding_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NextFunding from a byte array, created by NextFunding_write
	 */
	public static org.ldk.structs.Result_NextFundingDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NextFunding_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NextFundingDecodeErrorZ ret_hu_conv = Result_NextFundingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
