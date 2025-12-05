using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A `splice_ack` message to be received by or sent to the splice initiator.
 */
public class SpliceAck : CommonBase {
	internal SpliceAck(object _dummy, long ptr) : base(ptr) { }
	~SpliceAck() {
		if (ptr != 0) { bindings.SpliceAck_free(ptr); }
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.SpliceAck_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.SpliceAck_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The amount the splice acceptor is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public long get_funding_contribution_satoshis() {
		long ret = bindings.SpliceAck_get_funding_contribution_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The amount the splice acceptor is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public void set_funding_contribution_satoshis(long val) {
		bindings.SpliceAck_set_funding_contribution_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The key of the sender (splice acceptor) controlling the new funding transaction
	 */
	public byte[] get_funding_pubkey() {
		long ret = bindings.SpliceAck_get_funding_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The key of the sender (splice acceptor) controlling the new funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.SpliceAck_set_funding_pubkey(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * If set, only confirmed inputs added (by the splice initiator) will be accepted
	 */
	public COption_NoneZ get_require_confirmed_inputs() {
		COption_NoneZ ret = bindings.SpliceAck_get_require_confirmed_inputs(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * If set, only confirmed inputs added (by the splice initiator) will be accepted
	 */
	public void set_require_confirmed_inputs(COption_NoneZ val) {
		bindings.SpliceAck_set_require_confirmed_inputs(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new SpliceAck given each field
	 */
	public static org.ldk.structs.SpliceAck of(org.ldk.structs.ChannelId channel_id_arg, long funding_contribution_satoshis_arg, byte[] funding_pubkey_arg, COption_NoneZ require_confirmed_inputs_arg) {
		long ret = bindings.SpliceAck_new(channel_id_arg.ptr, funding_contribution_satoshis_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(funding_pubkey_arg, 33)), require_confirmed_inputs_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(funding_contribution_satoshis_arg);
		GC.KeepAlive(funding_pubkey_arg);
		GC.KeepAlive(require_confirmed_inputs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceAck ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceAck(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.SpliceAck_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceAck
	 */
	public org.ldk.structs.SpliceAck clone() {
		long ret = bindings.SpliceAck_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceAck ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceAck(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceAcks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.SpliceAck b) {
		bool ret = bindings.SpliceAck_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is SpliceAck)) return false;
		return this.eq((SpliceAck)o);
	}
	/**
	 * Serialize the SpliceAck object into a byte array which can be read by SpliceAck_read
	 */
	public byte[] write() {
		long ret = bindings.SpliceAck_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SpliceAck from a byte array, created by SpliceAck_write
	 */
	public static org.ldk.structs.Result_SpliceAckDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SpliceAck_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceAckDecodeErrorZ ret_hu_conv = Result_SpliceAckDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
