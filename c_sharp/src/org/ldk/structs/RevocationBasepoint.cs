using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Master key used in conjunction with per_commitment_point to generate [htlcpubkey](https://github.com/lightning/bolts/blob/master/03-transactions.md#key-derivation) for the latest state of a channel.
 * A watcher can be given a [RevocationBasepoint] to generate per commitment [RevocationKey] to create justice transactions.
 */
public class RevocationBasepoint : CommonBase {
	internal RevocationBasepoint(object _dummy, long ptr) : base(ptr) { }
	~RevocationBasepoint() {
		if (ptr != 0) { bindings.RevocationBasepoint_free(ptr); }
	}

	public byte[] get_a() {
		long ret = bindings.RevocationBasepoint_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	public void set_a(byte[] val) {
		bindings.RevocationBasepoint_set_a(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new RevocationBasepoint given each field
	 */
	public static RevocationBasepoint of(byte[] a_arg) {
		long ret = bindings.RevocationBasepoint_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a_arg, 33)));
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationBasepoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationBasepoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RevocationBasepoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RevocationBasepoint b) {
		bool ret = bindings.RevocationBasepoint_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RevocationBasepoint)) return false;
		return this.eq((RevocationBasepoint)o);
	}
	internal long clone_ptr() {
		long ret = bindings.RevocationBasepoint_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RevocationBasepoint
	 */
	public RevocationBasepoint clone() {
		long ret = bindings.RevocationBasepoint_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationBasepoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationBasepoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RevocationBasepoint.
	 */
	public long hash() {
		long ret = bindings.RevocationBasepoint_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Get inner Public Key
	 */
	public byte[] to_public_key() {
		long ret = bindings.RevocationBasepoint_to_public_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the RevocationBasepoint object into a byte array which can be read by RevocationBasepoint_read
	 */
	public byte[] write() {
		long ret = bindings.RevocationBasepoint_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RevocationBasepoint from a byte array, created by RevocationBasepoint_write
	 */
	public static Result_RevocationBasepointDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RevocationBasepoint_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RevocationBasepointDecodeErrorZ ret_hu_conv = Result_RevocationBasepointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
