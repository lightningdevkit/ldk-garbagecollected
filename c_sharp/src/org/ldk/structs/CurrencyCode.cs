using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An ISO 4217 three-letter currency code (e.g., USD).
 * 
 * Currency codes must be exactly 3 ASCII uppercase letters.
 */
public class CurrencyCode : CommonBase {
	internal CurrencyCode(object _dummy, long ptr) : base(ptr) { }
	~CurrencyCode() {
		if (ptr != 0) { bindings.CurrencyCode_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.CurrencyCode_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the CurrencyCode
	 */
	public org.ldk.structs.CurrencyCode clone() {
		long ret = bindings.CurrencyCode_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CurrencyCode ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CurrencyCode(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two CurrencyCodes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.CurrencyCode b) {
		bool ret = bindings.CurrencyCode_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is CurrencyCode)) return false;
		return this.eq((CurrencyCode)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the CurrencyCode.
	 */
	public long hash() {
		long ret = bindings.CurrencyCode_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Creates a new `CurrencyCode` from a 3-byte array.
	 * 
	 * Returns an error if the bytes are not valid UTF-8 or not all ASCII uppercase.
	 */
	public static org.ldk.structs.Result_CurrencyCodeCurrencyCodeErrorZ of(byte[] code) {
		long ret = bindings.CurrencyCode_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(code, 3)));
		GC.KeepAlive(code);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CurrencyCodeCurrencyCodeErrorZ ret_hu_conv = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the currency code as a byte array.
	 */
	public byte[] as_bytes() {
		long ret = bindings.CurrencyCode_as_bytes(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the currency code as a string slice.
	 */
	public string as_str() {
		long ret = bindings.CurrencyCode_as_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Read a CurrencyCode object from a string
	 */
	public static org.ldk.structs.Result_CurrencyCodeCurrencyCodeErrorZ from_str(string s) {
		long ret = bindings.CurrencyCode_from_str(InternalUtils.encodeString(s));
		GC.KeepAlive(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CurrencyCodeCurrencyCodeErrorZ ret_hu_conv = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a CurrencyCode object
	 */
	public string to_str() {
		long ret = bindings.CurrencyCode_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

}
} } }
