package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Errors that indicate what is wrong with the invoice. They have some granularity for debug
 * reasons, but should generally result in an \"invalid BOLT11 invoice\" message for the user.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt11ParseError extends CommonBase {
	Bolt11ParseError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt11ParseError_free(ptr); }
	}

	/**
	 * Checks if two Bolt11ParseErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Bolt11ParseError b) {
		boolean ret = bindings.Bolt11ParseError_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Bolt11ParseError)) return false;
		return this.eq((Bolt11ParseError)o);
	}
	long clone_ptr() {
		long ret = bindings.Bolt11ParseError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11ParseError
	 */
	public Bolt11ParseError clone() {
		long ret = bindings.Bolt11ParseError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11ParseError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Bolt11ParseError object
	 */
	public String to_str() {
		String ret = bindings.Bolt11ParseError_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Build a Bolt11ParseError from a Secp256k1Error
	 */
	public static Bolt11ParseError from_Secp256k1Error(org.ldk.enums.Secp256k1Error f) {
		long ret = bindings.Bolt11ParseError_from_Secp256k1Error(f);
		Reference.reachabilityFence(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11ParseError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Build a Bolt11ParseError from a Error
	 */
	public static Bolt11ParseError from_Error(org.ldk.util.UnqualifiedError f) {
		long ret = bindings.Bolt11ParseError_from_Error(0);
		Reference.reachabilityFence(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11ParseError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
