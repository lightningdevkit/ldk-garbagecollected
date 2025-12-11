package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An error indicating that a currency code is invalid.
 * 
 * A valid currency code must follow the ISO 4217 standard:
 * - Exactly 3 characters in length.
 * - Consist only of uppercase ASCII letters (A–Z).
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CurrencyCodeError extends CommonBase {
	CurrencyCodeError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CurrencyCodeError_free(ptr); }
	}

	/**
	 * Constructs a new CurrencyCodeError given each field
	 */
	public static CurrencyCodeError of() {
		long ret = bindings.CurrencyCodeError_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CurrencyCodeError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CurrencyCodeError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.CurrencyCodeError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the CurrencyCodeError
	 */
	public CurrencyCodeError clone() {
		long ret = bindings.CurrencyCodeError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CurrencyCodeError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CurrencyCodeError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two CurrencyCodeErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.CurrencyCodeError b) {
		boolean ret = bindings.CurrencyCodeError_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof CurrencyCodeError)) return false;
		return this.eq((CurrencyCodeError)o);
	}
	/**
	 * Get the string representation of a CurrencyCodeError object
	 */
	public String to_str() {
		String ret = bindings.CurrencyCodeError_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
