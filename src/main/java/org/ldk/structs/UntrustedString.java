package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Struct to `Display` fields in a safe way using `PrintableString`
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UntrustedString extends CommonBase {
	UntrustedString(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UntrustedString_free(ptr); }
	}

	public String get_a() {
		String ret = bindings.UntrustedString_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(java.lang.String val) {
		bindings.UntrustedString_set_a(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new UntrustedString given each field
	 */
	public static UntrustedString of(java.lang.String a_arg) {
		long ret = bindings.UntrustedString_new(a_arg);
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UntrustedString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UntrustedString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.UntrustedString_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UntrustedString
	 */
	public UntrustedString clone() {
		long ret = bindings.UntrustedString_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UntrustedString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UntrustedString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two UntrustedStrings contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.UntrustedString b) {
		boolean ret = bindings.UntrustedString_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof UntrustedString)) return false;
		return this.eq((UntrustedString)o);
	}
	/**
	 * Serialize the UntrustedString object into a byte array which can be read by UntrustedString_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UntrustedString_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a UntrustedString from a byte array, created by UntrustedString_write
	 */
	public static Result_UntrustedStringDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UntrustedString_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UntrustedStringDecodeErrorZ ret_hu_conv = Result_UntrustedStringDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
