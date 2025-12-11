package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A struct containing the two parts of a BIP 353 Human Readable Name - the user and domain parts.
 * 
 * The `user` and `domain` parts, together, cannot exceed 231 bytes in length, and both must be
 * non-empty.
 * 
 * If you intend to handle non-ASCII `user` or `domain` parts, you must handle [Homograph Attacks]
 * and do punycode en-/de-coding yourself. This struct will always handle only plain ASCII `user`
 * and `domain` parts.
 * 
 * This struct can also be used for LN-Address recipients.
 * 
 * [Homograph Attacks]: https://en.wikipedia.org/wiki/IDN_homograph_attack
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HumanReadableName extends CommonBase {
	HumanReadableName(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HumanReadableName_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.HumanReadableName_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the HumanReadableName
	 */
	public HumanReadableName clone() {
		long ret = bindings.HumanReadableName_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HumanReadableName ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HumanReadableName(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the HumanReadableName.
	 */
	public long hash() {
		long ret = bindings.HumanReadableName_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two HumanReadableNames contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.HumanReadableName b) {
		boolean ret = bindings.HumanReadableName_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof HumanReadableName)) return false;
		return this.eq((HumanReadableName)o);
	}
	/**
	 * Constructs a new [`HumanReadableName`] from the `user` and `domain` parts. See the
	 * struct-level documentation for more on the requirements on each.
	 */
	public static Result_HumanReadableNameNoneZ of(java.lang.String user, java.lang.String domain) {
		long ret = bindings.HumanReadableName_new(user, domain);
		Reference.reachabilityFence(user);
		Reference.reachabilityFence(domain);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HumanReadableNameNoneZ ret_hu_conv = Result_HumanReadableNameNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new [`HumanReadableName`] from the standard encoding - `user`@`domain`.
	 * 
	 * If `user` includes the standard BIP 353 ₿ prefix it is automatically removed as required by
	 * BIP 353.
	 */
	public static Result_HumanReadableNameNoneZ from_encoded(java.lang.String encoded) {
		long ret = bindings.HumanReadableName_from_encoded(encoded);
		Reference.reachabilityFence(encoded);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HumanReadableNameNoneZ ret_hu_conv = Result_HumanReadableNameNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the `user` part of this Human Readable Name
	 */
	public String user() {
		String ret = bindings.HumanReadableName_user(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Gets the `domain` part of this Human Readable Name
	 */
	public String domain() {
		String ret = bindings.HumanReadableName_domain(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the HumanReadableName object into a byte array which can be read by HumanReadableName_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HumanReadableName_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a HumanReadableName from a byte array, created by HumanReadableName_write
	 */
	public static Result_HumanReadableNameDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HumanReadableName_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HumanReadableNameDecodeErrorZ ret_hu_conv = Result_HumanReadableNameDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a HumanReadableName object
	 */
	public String to_str() {
		String ret = bindings.HumanReadableName_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
