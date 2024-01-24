using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Struct to `Display` fields in a safe way using `PrintableString`
 */
public class UntrustedString : CommonBase {
	internal UntrustedString(object _dummy, long ptr) : base(ptr) { }
	~UntrustedString() {
		if (ptr != 0) { bindings.UntrustedString_free(ptr); }
	}

	public string get_a() {
		long ret = bindings.UntrustedString_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	public void set_a(string val) {
		bindings.UntrustedString_set_a(this.ptr, InternalUtils.encodeString(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new UntrustedString given each field
	 */
	public static UntrustedString of(string a_arg) {
		long ret = bindings.UntrustedString_new(InternalUtils.encodeString(a_arg));
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UntrustedString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UntrustedString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.UntrustedString_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UntrustedString
	 */
	public UntrustedString clone() {
		long ret = bindings.UntrustedString_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UntrustedString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UntrustedString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two UntrustedStrings contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.UntrustedString b) {
		bool ret = bindings.UntrustedString_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is UntrustedString)) return false;
		return this.eq((UntrustedString)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the UntrustedString.
	 */
	public long hash() {
		long ret = bindings.UntrustedString_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Serialize the UntrustedString object into a byte array which can be read by UntrustedString_read
	 */
	public byte[] write() {
		long ret = bindings.UntrustedString_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UntrustedString from a byte array, created by UntrustedString_write
	 */
	public static Result_UntrustedStringDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UntrustedString_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UntrustedStringDecodeErrorZ ret_hu_conv = Result_UntrustedStringDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
