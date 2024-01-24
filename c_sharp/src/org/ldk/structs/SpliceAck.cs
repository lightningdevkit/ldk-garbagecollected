using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A splice_ack message to be received by or sent to the splice initiator.
 */
public class SpliceAck : CommonBase {
	internal SpliceAck(object _dummy, long ptr) : base(ptr) { }
	~SpliceAck() {
		if (ptr != 0) { bindings.SpliceAck_free(ptr); }
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public byte[] get_channel_id() {
		long ret = bindings.SpliceAck_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public void set_channel_id(byte[] val) {
		bindings.SpliceAck_set_channel_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The genesis hash of the blockchain where the channel is intended to be spliced
	 */
	public byte[] get_chain_hash() {
		long ret = bindings.SpliceAck_get_chain_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain where the channel is intended to be spliced
	 */
	public void set_chain_hash(byte[] val) {
		bindings.SpliceAck_set_chain_hash(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The intended change in channel capacity: the amount to be added (positive value)
	 * or removed (negative value) by the sender (splice acceptor) by splicing into/from the channel.
	 */
	public long get_relative_satoshis() {
		long ret = bindings.SpliceAck_get_relative_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The intended change in channel capacity: the amount to be added (positive value)
	 * or removed (negative value) by the sender (splice acceptor) by splicing into/from the channel.
	 */
	public void set_relative_satoshis(long val) {
		bindings.SpliceAck_set_relative_satoshis(this.ptr, val);
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
	 * Constructs a new SpliceAck given each field
	 */
	public static SpliceAck of(byte[] channel_id_arg, byte[] chain_hash_arg, long relative_satoshis_arg, byte[] funding_pubkey_arg) {
		long ret = bindings.SpliceAck_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_id_arg, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(chain_hash_arg, 32)), relative_satoshis_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(funding_pubkey_arg, 33)));
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(chain_hash_arg);
		GC.KeepAlive(relative_satoshis_arg);
		GC.KeepAlive(funding_pubkey_arg);
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
	public SpliceAck clone() {
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
		bool ret = bindings.SpliceAck_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
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
	public static Result_SpliceAckDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SpliceAck_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceAckDecodeErrorZ ret_hu_conv = Result_SpliceAckDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
