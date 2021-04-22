package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Recoverable signature
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InvoiceSignature extends CommonBase {
	InvoiceSignature(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InvoiceSignature_free(ptr); }
	}

	/**
	 * Creates a copy of the InvoiceSignature
	 */
	public InvoiceSignature clone() {
		long ret = bindings.InvoiceSignature_clone(this.ptr);
		InvoiceSignature ret_hu_conv = new InvoiceSignature(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
