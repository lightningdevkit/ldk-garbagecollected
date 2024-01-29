using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A splice message to be sent by or received from the stfu initiator (splice initiator).
 */
public class Splice : CommonBase {
	internal Splice(object _dummy, long ptr) : base(ptr) { }
	~Splice() {
		if (ptr != 0) { bindings.Splice_free(ptr); }
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public byte[] get_channel_id() {
		long ret = bindings.Splice_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public void set_channel_id(byte[] val) {
		bindings.Splice_set_channel_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The genesis hash of the blockchain where the channel is intended to be spliced
	 */
	public byte[] get_chain_hash() {
		long ret = bindings.Splice_get_chain_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain where the channel is intended to be spliced
	 */
	public void set_chain_hash(byte[] val) {
		bindings.Splice_set_chain_hash(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The intended change in channel capacity: the amount to be added (positive value)
	 * or removed (negative value) by the sender (splice initiator) by splicing into/from the channel.
	 */
	public long get_relative_satoshis() {
		long ret = bindings.Splice_get_relative_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The intended change in channel capacity: the amount to be added (positive value)
	 * or removed (negative value) by the sender (splice initiator) by splicing into/from the channel.
	 */
	public void set_relative_satoshis(long val) {
		bindings.Splice_set_relative_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public int get_funding_feerate_perkw() {
		int ret = bindings.Splice_get_funding_feerate_perkw(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public void set_funding_feerate_perkw(int val) {
		bindings.Splice_set_funding_feerate_perkw(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public int get_locktime() {
		int ret = bindings.Splice_get_locktime(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public void set_locktime(int val) {
		bindings.Splice_set_locktime(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public byte[] get_funding_pubkey() {
		long ret = bindings.Splice_get_funding_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.Splice_set_funding_pubkey(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new Splice given each field
	 */
	public static Splice of(byte[] channel_id_arg, byte[] chain_hash_arg, long relative_satoshis_arg, int funding_feerate_perkw_arg, int locktime_arg, byte[] funding_pubkey_arg) {
		long ret = bindings.Splice_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_id_arg, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(chain_hash_arg, 32)), relative_satoshis_arg, funding_feerate_perkw_arg, locktime_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(funding_pubkey_arg, 33)));
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(chain_hash_arg);
		GC.KeepAlive(relative_satoshis_arg);
		GC.KeepAlive(funding_feerate_perkw_arg);
		GC.KeepAlive(locktime_arg);
		GC.KeepAlive(funding_pubkey_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Splice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Splice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Splice_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Splice
	 */
	public Splice clone() {
		long ret = bindings.Splice_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Splice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Splice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Splices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Splice b) {
		bool ret = bindings.Splice_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Splice)) return false;
		return this.eq((Splice)o);
	}
	/**
	 * Serialize the Splice object into a byte array which can be read by Splice_read
	 */
	public byte[] write() {
		long ret = bindings.Splice_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Splice from a byte array, created by Splice_write
	 */
	public static Result_SpliceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Splice_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceDecodeErrorZ ret_hu_conv = Result_SpliceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
