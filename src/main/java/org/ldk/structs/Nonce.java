package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Nonce extends CommonBase {
	Nonce(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Nonce_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.Nonce_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Nonce
	 */
	public Nonce clone() {
		long ret = bindings.Nonce_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Nonce ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Nonce(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Nonces contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Nonce b) {
		boolean ret = bindings.Nonce_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Nonce)) return false;
		return this.eq((Nonce)o);
	}
	/**
	 * Creates a `Nonce` from the given [`EntropySource`].
	 */
	public static Nonce from_entropy_source(org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.Nonce_from_entropy_source(entropy_source.ptr);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Nonce ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Nonce(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Returns a slice of the underlying bytes of size [`Nonce::LENGTH`].
	 */
	public byte[] as_slice() {
		byte[] ret = bindings.Nonce_as_slice(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the Nonce object into a byte array which can be read by Nonce_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Nonce_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Nonce from a byte array, created by Nonce_write
	 */
	public static Result_NonceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Nonce_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonceDecodeErrorZ ret_hu_conv = Result_NonceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
