using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class HumanReadableName : CommonBase {
	internal HumanReadableName(object _dummy, long ptr) : base(ptr) { }
	~HumanReadableName() {
		if (ptr != 0) { bindings.HumanReadableName_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.HumanReadableName_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the HumanReadableName
	 */
	public org.ldk.structs.HumanReadableName clone() {
		long ret = bindings.HumanReadableName_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HumanReadableName ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HumanReadableName(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the HumanReadableName.
	 */
	public long hash() {
		long ret = bindings.HumanReadableName_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two HumanReadableNames contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.HumanReadableName b) {
		bool ret = bindings.HumanReadableName_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is HumanReadableName)) return false;
		return this.eq((HumanReadableName)o);
	}
	/**
	 * Constructs a new [`HumanReadableName`] from the `user` and `domain` parts. See the
	 * struct-level documentation for more on the requirements on each.
	 */
	public static org.ldk.structs.Result_HumanReadableNameNoneZ of(string user, string domain) {
		long ret = bindings.HumanReadableName_new(InternalUtils.encodeString(user), InternalUtils.encodeString(domain));
		GC.KeepAlive(user);
		GC.KeepAlive(domain);
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
	public static org.ldk.structs.Result_HumanReadableNameNoneZ from_encoded(string encoded) {
		long ret = bindings.HumanReadableName_from_encoded(InternalUtils.encodeString(encoded));
		GC.KeepAlive(encoded);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HumanReadableNameNoneZ ret_hu_conv = Result_HumanReadableNameNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the `user` part of this Human Readable Name
	 */
	public string user() {
		long ret = bindings.HumanReadableName_user(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Gets the `domain` part of this Human Readable Name
	 */
	public string domain() {
		long ret = bindings.HumanReadableName_domain(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the HumanReadableName object into a byte array which can be read by HumanReadableName_read
	 */
	public byte[] write() {
		long ret = bindings.HumanReadableName_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HumanReadableName from a byte array, created by HumanReadableName_write
	 */
	public static org.ldk.structs.Result_HumanReadableNameDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HumanReadableName_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HumanReadableNameDecodeErrorZ ret_hu_conv = Result_HumanReadableNameDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a HumanReadableName object
	 */
	public string to_str() {
		long ret = bindings.HumanReadableName_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

}
} } }
