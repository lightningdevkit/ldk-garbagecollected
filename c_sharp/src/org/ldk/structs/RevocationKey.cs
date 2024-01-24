using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The revocation key is used to allow a channel party to revoke their state - giving their
 * counterparty the required material to claim all of their funds if they broadcast that state.
 * 
 * Each commitment transaction has a revocation key based on the basepoint and
 * per_commitment_point which is used in both commitment and HTLC transactions.
 * 
 * See [the BOLT spec for derivation details]
 * (https://github.com/lightning/bolts/blob/master/03-transactions.md#revocationpubkey-derivation)
 */
public class RevocationKey : CommonBase {
	internal RevocationKey(object _dummy, long ptr) : base(ptr) { }
	~RevocationKey() {
		if (ptr != 0) { bindings.RevocationKey_free(ptr); }
	}

	public byte[] get_a() {
		long ret = bindings.RevocationKey_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	public void set_a(byte[] val) {
		bindings.RevocationKey_set_a(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new RevocationKey given each field
	 */
	public static RevocationKey of(byte[] a_arg) {
		long ret = bindings.RevocationKey_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a_arg, 33)));
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RevocationKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RevocationKey b) {
		bool ret = bindings.RevocationKey_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RevocationKey)) return false;
		return this.eq((RevocationKey)o);
	}
	internal long clone_ptr() {
		long ret = bindings.RevocationKey_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RevocationKey
	 */
	public RevocationKey clone() {
		long ret = bindings.RevocationKey_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RevocationKey.
	 */
	public long hash() {
		long ret = bindings.RevocationKey_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Derives a per-commitment-transaction revocation public key from one party's per-commitment
	 * point and the other party's [`RevocationBasepoint`]. This is the public equivalent of
	 * [`chan_utils::derive_private_revocation_key`] - using only public keys to derive a public
	 * key instead of private keys.
	 * 
	 * Note that this is infallible iff we trust that at least one of the two input keys are randomly
	 * generated (ie our own).
	 * 
	 * [`chan_utils::derive_private_revocation_key`]: crate::ln::chan_utils::derive_private_revocation_key
	 */
	public static RevocationKey from_basepoint(org.ldk.structs.RevocationBasepoint countersignatory_basepoint, byte[] per_commitment_point) {
		long ret = bindings.RevocationKey_from_basepoint(countersignatory_basepoint == null ? 0 : countersignatory_basepoint.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(per_commitment_point, 33)));
		GC.KeepAlive(countersignatory_basepoint);
		GC.KeepAlive(per_commitment_point);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(countersignatory_basepoint); };
		return ret_hu_conv;
	}

	/**
	 * Get inner Public Key
	 */
	public byte[] to_public_key() {
		long ret = bindings.RevocationKey_to_public_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the RevocationKey object into a byte array which can be read by RevocationKey_read
	 */
	public byte[] write() {
		long ret = bindings.RevocationKey_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RevocationKey from a byte array, created by RevocationKey_write
	 */
	public static Result_RevocationKeyDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RevocationKey_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RevocationKeyDecodeErrorZ ret_hu_conv = Result_RevocationKeyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
