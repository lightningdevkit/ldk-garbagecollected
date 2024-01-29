using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`commitment_signed`] message to be sent to or received from a peer.
 * 
 * [`commitment_signed`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#committing-updates-so-far-commitment_signed
 */
public class CommitmentSigned : CommonBase {
	internal CommitmentSigned(object _dummy, long ptr) : base(ptr) { }
	~CommitmentSigned() {
		if (ptr != 0) { bindings.CommitmentSigned_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		long ret = bindings.CommitmentSigned_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.CommitmentSigned_set_channel_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A signature on the commitment transaction
	 */
	public byte[] get_signature() {
		long ret = bindings.CommitmentSigned_get_signature(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A signature on the commitment transaction
	 */
	public void set_signature(byte[] val) {
		bindings.CommitmentSigned_set_signature(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 64)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Signatures on the HTLC transactions
	 * 
	 * Returns a copy of the field.
	 */
	public byte[][] get_htlc_signatures() {
		long ret = bindings.CommitmentSigned_get_htlc_signatures(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_8_len = InternalUtils.getArrayLength(ret);
		byte[][] ret_conv_8_arr = new byte[ret_conv_8_len][];
		for (int i = 0; i < ret_conv_8_len; i++) {
			long ret_conv_8 = InternalUtils.getU64ArrayElem(ret, i);
			byte[] ret_conv_8_conv = InternalUtils.decodeUint8Array(ret_conv_8);
			ret_conv_8_arr[i] = ret_conv_8_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_8_arr;
	}

	/**
	 * Signatures on the HTLC transactions
	 */
	public void set_htlc_signatures(byte[][] val) {
		bindings.CommitmentSigned_set_htlc_signatures(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(val, val_conv_8 => InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val_conv_8, 64)))));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new CommitmentSigned given each field
	 */
	public static CommitmentSigned of(byte[] channel_id_arg, byte[] signature_arg, byte[][] htlc_signatures_arg) {
		long ret = bindings.CommitmentSigned_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_id_arg, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(signature_arg, 64)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(htlc_signatures_arg, htlc_signatures_arg_conv_8 => InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(htlc_signatures_arg_conv_8, 64)))));
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(signature_arg);
		GC.KeepAlive(htlc_signatures_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommitmentSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommitmentSigned(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.CommitmentSigned_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the CommitmentSigned
	 */
	public CommitmentSigned clone() {
		long ret = bindings.CommitmentSigned_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommitmentSigned ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommitmentSigned(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CommitmentSigned.
	 */
	public long hash() {
		long ret = bindings.CommitmentSigned_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two CommitmentSigneds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.CommitmentSigned b) {
		bool ret = bindings.CommitmentSigned_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is CommitmentSigned)) return false;
		return this.eq((CommitmentSigned)o);
	}
	/**
	 * Serialize the CommitmentSigned object into a byte array which can be read by CommitmentSigned_read
	 */
	public byte[] write() {
		long ret = bindings.CommitmentSigned_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CommitmentSigned from a byte array, created by CommitmentSigned_write
	 */
	public static Result_CommitmentSignedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.CommitmentSigned_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CommitmentSignedDecodeErrorZ ret_hu_conv = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
