package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


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
	 * Creates a copy of the InvoiceFeatures
	 */
	public InvoiceFeatures clone() {
		long ret = bindings.InvoiceFeatures_clone(this.ptr);
		InvoiceFeatures ret_hu_conv = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static InvoiceFeatures constructor_empty() {
		long ret = bindings.InvoiceFeatures_empty();
		InvoiceFeatures ret_hu_conv = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a Features with the bits set which are known by the implementation
	 */
	public static InvoiceFeatures constructor_known() {
		long ret = bindings.InvoiceFeatures_known();
		InvoiceFeatures ret_hu_conv = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the InvoiceFeatures object into a byte array which can be read by InvoiceFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InvoiceFeatures_write(this.ptr);
		return ret;
	}

	/**
	 * Read a InvoiceFeatures from a byte array, created by InvoiceFeatures_write
	 */
	public static Result_InvoiceFeaturesDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.InvoiceFeatures_read(ser);
		Result_InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
