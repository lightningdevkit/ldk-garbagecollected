package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Features used within an invoice.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InvoiceFeatures extends CommonBase {
	InvoiceFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InvoiceFeatures_free(ptr); }
	}

	/**
	 * Checks if two InvoiceFeaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(InvoiceFeatures b) {
		boolean ret = bindings.InvoiceFeatures_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof InvoiceFeatures)) return false;
		return this.eq((InvoiceFeatures)o);
	}
	long clone_ptr() {
		long ret = bindings.InvoiceFeatures_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceFeatures
	 */
	public InvoiceFeatures clone() {
		long ret = bindings.InvoiceFeatures_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InvoiceFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static InvoiceFeatures empty() {
		long ret = bindings.InvoiceFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InvoiceFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a Features with the bits set which are known by the implementation
	 */
	public static InvoiceFeatures known() {
		long ret = bindings.InvoiceFeatures_known();
		if (ret >= 0 && ret <= 4096) { return null; }
		InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InvoiceFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public boolean requires_unknown_bits() {
		boolean ret = bindings.InvoiceFeatures_requires_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the InvoiceFeatures object into a byte array which can be read by InvoiceFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InvoiceFeatures_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a InvoiceFeatures from a byte array, created by InvoiceFeatures_write
	 */
	public static Result_InvoiceFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InvoiceFeatures_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
