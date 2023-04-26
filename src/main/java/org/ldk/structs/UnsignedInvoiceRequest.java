package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A semantically valid [`InvoiceRequest`] that hasn't been signed.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedInvoiceRequest extends CommonBase {
	UnsignedInvoiceRequest(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedInvoiceRequest_free(ptr); }
	}

}
