using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A 128-bit number used only once.
 * 
 * Needed when constructing [`Offer::metadata`] and deriving [`Offer::issuer_signing_pubkey`] from
 * [`ExpandedKey`]. Must not be reused for any other derivation without first hashing.
 * 
 * [`Offer::metadata`]: crate::offers::offer::Offer::metadata
 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
 * [`ExpandedKey`]: crate::ln::inbound_payment::ExpandedKey
 */
public class Nonce : CommonBase {
	internal Nonce(object _dummy, long ptr) : base(ptr) { }
	~Nonce() {
		if (ptr != 0) { bindings.Nonce_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Nonce_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Nonce
	 */
	public org.ldk.structs.Nonce clone() {
		long ret = bindings.Nonce_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Nonce ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Nonce(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Nonces contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Nonce b) {
		bool ret = bindings.Nonce_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Nonce)) return false;
		return this.eq((Nonce)o);
	}
	/**
	 * Creates a `Nonce` from the given [`EntropySource`].
	 */
	public static org.ldk.structs.Nonce from_entropy_source(org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.Nonce_from_entropy_source(entropy_source.ptr);
		GC.KeepAlive(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Nonce ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Nonce(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Returns a slice of the underlying bytes of size [`Nonce::LENGTH`].
	 */
	public byte[] as_slice() {
		long ret = bindings.Nonce_as_slice(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the Nonce object into a byte array which can be read by Nonce_read
	 */
	public byte[] write() {
		long ret = bindings.Nonce_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Nonce from a byte array, created by Nonce_write
	 */
	public static org.ldk.structs.Result_NonceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Nonce_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonceDecodeErrorZ ret_hu_conv = Result_NonceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
