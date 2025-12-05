using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A `splice_init` message to be sent by or received from the stfu initiator (splice initiator).
 */
public class SpliceInit : CommonBase {
	internal SpliceInit(object _dummy, long ptr) : base(ptr) { }
	~SpliceInit() {
		if (ptr != 0) { bindings.SpliceInit_free(ptr); }
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.SpliceInit_get_channel_id(this.ptr);
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
		bindings.SpliceInit_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The amount the splice initiator is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public long get_funding_contribution_satoshis() {
		long ret = bindings.SpliceInit_get_funding_contribution_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The amount the splice initiator is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public void set_funding_contribution_satoshis(long val) {
		bindings.SpliceInit_set_funding_contribution_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public int get_funding_feerate_per_kw() {
		int ret = bindings.SpliceInit_get_funding_feerate_per_kw(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public void set_funding_feerate_per_kw(int val) {
		bindings.SpliceInit_set_funding_feerate_per_kw(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public int get_locktime() {
		int ret = bindings.SpliceInit_get_locktime(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public void set_locktime(int val) {
		bindings.SpliceInit_set_locktime(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public byte[] get_funding_pubkey() {
		long ret = bindings.SpliceInit_get_funding_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.SpliceInit_set_funding_pubkey(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * If set, only confirmed inputs added (by the splice acceptor) will be accepted
	 */
	public COption_NoneZ get_require_confirmed_inputs() {
		COption_NoneZ ret = bindings.SpliceInit_get_require_confirmed_inputs(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * If set, only confirmed inputs added (by the splice acceptor) will be accepted
	 */
	public void set_require_confirmed_inputs(COption_NoneZ val) {
		bindings.SpliceInit_set_require_confirmed_inputs(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new SpliceInit given each field
	 */
	public static org.ldk.structs.SpliceInit of(org.ldk.structs.ChannelId channel_id_arg, long funding_contribution_satoshis_arg, int funding_feerate_per_kw_arg, int locktime_arg, byte[] funding_pubkey_arg, COption_NoneZ require_confirmed_inputs_arg) {
		long ret = bindings.SpliceInit_new(channel_id_arg.ptr, funding_contribution_satoshis_arg, funding_feerate_per_kw_arg, locktime_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(funding_pubkey_arg, 33)), require_confirmed_inputs_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(funding_contribution_satoshis_arg);
		GC.KeepAlive(funding_feerate_per_kw_arg);
		GC.KeepAlive(locktime_arg);
		GC.KeepAlive(funding_pubkey_arg);
		GC.KeepAlive(require_confirmed_inputs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceInit ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceInit(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.SpliceInit_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceInit
	 */
	public org.ldk.structs.SpliceInit clone() {
		long ret = bindings.SpliceInit_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceInit ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceInit(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceInits contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.SpliceInit b) {
		bool ret = bindings.SpliceInit_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is SpliceInit)) return false;
		return this.eq((SpliceInit)o);
	}
	/**
	 * Serialize the SpliceInit object into a byte array which can be read by SpliceInit_read
	 */
	public byte[] write() {
		long ret = bindings.SpliceInit_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SpliceInit from a byte array, created by SpliceInit_write
	 */
	public static org.ldk.structs.Result_SpliceInitDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SpliceInit_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceInitDecodeErrorZ ret_hu_conv = Result_SpliceInitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
