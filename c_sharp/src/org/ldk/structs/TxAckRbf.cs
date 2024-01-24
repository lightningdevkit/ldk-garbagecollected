using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A tx_ack_rbf message which acknowledges replacement of the transaction after it's been
 * completed.
 */
public class TxAckRbf : CommonBase {
	internal TxAckRbf(object _dummy, long ptr) : base(ptr) { }
	~TxAckRbf() {
		if (ptr != 0) { bindings.TxAckRbf_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		long ret = bindings.TxAckRbf_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxAckRbf_set_channel_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The number of satoshis the sender will contribute to or, if negative, remove from
	 * (e.g. splice-out) the funding output of the transaction
	 */
	public Option_i64Z get_funding_output_contribution() {
		long ret = bindings.TxAckRbf_get_funding_output_contribution(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_i64Z ret_hu_conv = org.ldk.structs.Option_i64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The number of satoshis the sender will contribute to or, if negative, remove from
	 * (e.g. splice-out) the funding output of the transaction
	 */
	public void set_funding_output_contribution(org.ldk.structs.Option_i64Z val) {
		bindings.TxAckRbf_set_funding_output_contribution(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new TxAckRbf given each field
	 */
	public static TxAckRbf of(byte[] channel_id_arg, org.ldk.structs.Option_i64Z funding_output_contribution_arg) {
		long ret = bindings.TxAckRbf_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_id_arg, 32)), funding_output_contribution_arg.ptr);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(funding_output_contribution_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAckRbf ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAckRbf(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(funding_output_contribution_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.TxAckRbf_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxAckRbf
	 */
	public TxAckRbf clone() {
		long ret = bindings.TxAckRbf_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAckRbf ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAckRbf(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxAckRbf.
	 */
	public long hash() {
		long ret = bindings.TxAckRbf_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TxAckRbfs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TxAckRbf b) {
		bool ret = bindings.TxAckRbf_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TxAckRbf)) return false;
		return this.eq((TxAckRbf)o);
	}
	/**
	 * Serialize the TxAckRbf object into a byte array which can be read by TxAckRbf_read
	 */
	public byte[] write() {
		long ret = bindings.TxAckRbf_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxAckRbf from a byte array, created by TxAckRbf_write
	 */
	public static Result_TxAckRbfDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxAckRbf_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxAckRbfDecodeErrorZ ret_hu_conv = Result_TxAckRbfDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
