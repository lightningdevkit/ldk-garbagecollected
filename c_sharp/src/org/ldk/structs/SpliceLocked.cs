using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A `splice_locked` message to be sent to or received from a peer.
 */
public class SpliceLocked : CommonBase {
	internal SpliceLocked(object _dummy, long ptr) : base(ptr) { }
	~SpliceLocked() {
		if (ptr != 0) { bindings.SpliceLocked_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.SpliceLocked_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.SpliceLocked_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The ID of the new funding transaction that has been locked
	 */
	public byte[] get_splice_txid() {
		long ret = bindings.SpliceLocked_get_splice_txid(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The ID of the new funding transaction that has been locked
	 */
	public void set_splice_txid(byte[] val) {
		bindings.SpliceLocked_set_splice_txid(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new SpliceLocked given each field
	 */
	public static org.ldk.structs.SpliceLocked of(org.ldk.structs.ChannelId channel_id_arg, byte[] splice_txid_arg) {
		long ret = bindings.SpliceLocked_new(channel_id_arg.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(splice_txid_arg, 32)));
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(splice_txid_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.SpliceLocked_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceLocked
	 */
	public org.ldk.structs.SpliceLocked clone() {
		long ret = bindings.SpliceLocked_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceLockeds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.SpliceLocked b) {
		bool ret = bindings.SpliceLocked_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is SpliceLocked)) return false;
		return this.eq((SpliceLocked)o);
	}
	/**
	 * Serialize the SpliceLocked object into a byte array which can be read by SpliceLocked_read
	 */
	public byte[] write() {
		long ret = bindings.SpliceLocked_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SpliceLocked from a byte array, created by SpliceLocked_write
	 */
	public static org.ldk.structs.Result_SpliceLockedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SpliceLocked_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceLockedDecodeErrorZ ret_hu_conv = Result_SpliceLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
