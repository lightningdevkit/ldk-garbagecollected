package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An ISO 4217 three-letter currency code (e.g., USD).
 * 
 * Currency codes must be exactly 3 ASCII uppercase letters.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CurrencyCode extends CommonBase {
	CurrencyCode(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CurrencyCode_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.CurrencyCode_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the CurrencyCode
	 */
	public CurrencyCode clone() {
		long ret = bindings.CurrencyCode_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CurrencyCode ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CurrencyCode(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two CurrencyCodes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.CurrencyCode b) {
		boolean ret = bindings.CurrencyCode_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof CurrencyCode)) return false;
		return this.eq((CurrencyCode)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the CurrencyCode.
	 */
	public long hash() {
		long ret = bindings.CurrencyCode_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Creates a new `CurrencyCode` from a 3-byte array.
	 * 
	 * Returns an error if the bytes are not valid UTF-8 or not all ASCII uppercase.
	 */
	public static Result_CurrencyCodeCurrencyCodeErrorZ of(byte[] code) {
		long ret = bindings.CurrencyCode_new(InternalUtils.check_arr_len(code, 3));
		Reference.reachabilityFence(code);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CurrencyCodeCurrencyCodeErrorZ ret_hu_conv = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the currency code as a byte array.
	 */
	public byte[] as_bytes() {
		byte[] ret = bindings.CurrencyCode_as_bytes(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the currency code as a string slice.
	 */
	public String as_str() {
		String ret = bindings.CurrencyCode_as_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a CurrencyCode object from a string
	 */
	public static Result_CurrencyCodeCurrencyCodeErrorZ from_str(java.lang.String s) {
		long ret = bindings.CurrencyCode_from_str(s);
		Reference.reachabilityFence(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CurrencyCodeCurrencyCodeErrorZ ret_hu_conv = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a CurrencyCode object
	 */
	public String to_str() {
		String ret = bindings.CurrencyCode_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
