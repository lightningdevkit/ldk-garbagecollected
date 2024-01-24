using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`closing_signed`] message to be sent to or received from a peer.
 * 
 * [`closing_signed`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#closing-negotiation-closing_signed
 */
public class ClosingSigned : CommonBase {
	internal ClosingSigned(object _dummy, long ptr) : base(ptr) { }
	~ClosingSigned() {
		if (ptr != 0) { bindings.ClosingSigned_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		long ret = bindings.ClosingSigned_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.ClosingSigned_set_channel_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The proposed total fee for the closing transaction
	 */
	public long get_fee_satoshis() {
		long ret = bindings.ClosingSigned_get_fee_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The proposed total fee for the closing transaction
	 */
	public void set_fee_satoshis(long val) {
		bindings.ClosingSigned_set_fee_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A signature on the closing transaction
	 */
	public byte[] get_signature() {
		long ret = bindings.ClosingSigned_get_signature(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A signature on the closing transaction
	 */
	public void set_signature(byte[] val) {
		bindings.ClosingSigned_set_signature(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 64)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum and maximum fees which the sender is willing to accept, provided only by new
	 * nodes.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ClosingSignedFeeRange get_fee_range() {
		long ret = bindings.ClosingSigned_get_fee_range(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosingSignedFeeRange ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ClosingSignedFeeRange(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The minimum and maximum fees which the sender is willing to accept, provided only by new
	 * nodes.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_fee_range(org.ldk.structs.ClosingSignedFeeRange val) {
		bindings.ClosingSigned_set_fee_range(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new ClosingSigned given each field
	 * 
	 * Note that fee_range_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static ClosingSigned of(byte[] channel_id_arg, long fee_satoshis_arg, byte[] signature_arg, org.ldk.structs.ClosingSignedFeeRange fee_range_arg) {
		long ret = bindings.ClosingSigned_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_id_arg, 32)), fee_satoshis_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(signature_arg, 64)), fee_range_arg == null ? 0 : fee_range_arg.ptr);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(fee_satoshis_arg);
		GC.KeepAlive(signature_arg);
		GC.KeepAlive(fee_range_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosingSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ClosingSigned(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fee_range_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ClosingSigned_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingSigned
	 */
	public ClosingSigned clone() {
		long ret = bindings.ClosingSigned_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosingSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ClosingSigned(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ClosingSigned.
	 */
	public long hash() {
		long ret = bindings.ClosingSigned_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ClosingSigneds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ClosingSigned b) {
		bool ret = bindings.ClosingSigned_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ClosingSigned)) return false;
		return this.eq((ClosingSigned)o);
	}
	/**
	 * Serialize the ClosingSigned object into a byte array which can be read by ClosingSigned_read
	 */
	public byte[] write() {
		long ret = bindings.ClosingSigned_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ClosingSigned from a byte array, created by ClosingSigned_write
	 */
	public static Result_ClosingSignedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ClosingSigned_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ClosingSignedDecodeErrorZ ret_hu_conv = Result_ClosingSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
