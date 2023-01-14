using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A revoke_and_ack message to be sent or received from a peer
 */
public class RevokeAndACK : CommonBase {
	internal RevokeAndACK(object _dummy, long ptr) : base(ptr) { }
	~RevokeAndACK() {
		if (ptr != 0) { bindings.RevokeAndACK_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.RevokeAndACK_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.RevokeAndACK_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The secret corresponding to the per-commitment point
	 */
	public byte[] get_per_commitment_secret() {
		byte[] ret = bindings.RevokeAndACK_get_per_commitment_secret(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The secret corresponding to the per-commitment point
	 */
	public void set_per_commitment_secret(byte[] val) {
		bindings.RevokeAndACK_set_per_commitment_secret(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The next sender-broadcast commitment transaction's per-commitment point
	 */
	public byte[] get_next_per_commitment_point() {
		byte[] ret = bindings.RevokeAndACK_get_next_per_commitment_point(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The next sender-broadcast commitment transaction's per-commitment point
	 */
	public void set_next_per_commitment_point(byte[] val) {
		bindings.RevokeAndACK_set_next_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new RevokeAndACK given each field
	 */
	public static RevokeAndACK of(byte[] channel_id_arg, byte[] per_commitment_secret_arg, byte[] next_per_commitment_point_arg) {
		long ret = bindings.RevokeAndACK_new(InternalUtils.check_arr_len(channel_id_arg, 32), InternalUtils.check_arr_len(per_commitment_secret_arg, 32), InternalUtils.check_arr_len(next_per_commitment_point_arg, 33));
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(per_commitment_secret_arg);
		GC.KeepAlive(next_per_commitment_point_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevokeAndACK ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevokeAndACK(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.RevokeAndACK_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RevokeAndACK
	 */
	public RevokeAndACK clone() {
		long ret = bindings.RevokeAndACK_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevokeAndACK ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevokeAndACK(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RevokeAndACKs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RevokeAndACK b) {
		bool ret = bindings.RevokeAndACK_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RevokeAndACK)) return false;
		return this.eq((RevokeAndACK)o);
	}
	/**
	 * Serialize the RevokeAndACK object into a byte array which can be read by RevokeAndACK_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RevokeAndACK_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a RevokeAndACK from a byte array, created by RevokeAndACK_write
	 */
	public static Result_RevokeAndACKDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RevokeAndACK_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RevokeAndACKDecodeErrorZ ret_hu_conv = Result_RevokeAndACKDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
