using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An error indicating that a currency code is invalid.
 * 
 * A valid currency code must follow the ISO 4217 standard:
 * - Exactly 3 characters in length.
 * - Consist only of uppercase ASCII letters (A–Z).
 */
public class CurrencyCodeError : CommonBase {
	internal CurrencyCodeError(object _dummy, long ptr) : base(ptr) { }
	~CurrencyCodeError() {
		if (ptr != 0) { bindings.CurrencyCodeError_free(ptr); }
	}

	/**
	 * Constructs a new CurrencyCodeError given each field
	 */
	public static org.ldk.structs.CurrencyCodeError of() {
		long ret = bindings.CurrencyCodeError_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CurrencyCodeError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CurrencyCodeError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.CurrencyCodeError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the CurrencyCodeError
	 */
	public org.ldk.structs.CurrencyCodeError clone() {
		long ret = bindings.CurrencyCodeError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CurrencyCodeError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CurrencyCodeError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two CurrencyCodeErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.CurrencyCodeError b) {
		bool ret = bindings.CurrencyCodeError_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is CurrencyCodeError)) return false;
		return this.eq((CurrencyCodeError)o);
	}
	/**
	 * Get the string representation of a CurrencyCodeError object
	 */
	public string to_str() {
		long ret = bindings.CurrencyCodeError_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

}
} } }
