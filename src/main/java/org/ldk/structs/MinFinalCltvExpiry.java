package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * `min_final_cltv_expiry` to use for the last HTLC in the route
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MinFinalCltvExpiry extends CommonBase {
	MinFinalCltvExpiry(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MinFinalCltvExpiry_free(ptr); }
	}

	/**
	 * Creates a copy of the MinFinalCltvExpiry
	 */
	public MinFinalCltvExpiry clone() {
		long ret = bindings.MinFinalCltvExpiry_clone(this.ptr);
		MinFinalCltvExpiry ret_hu_conv = new MinFinalCltvExpiry(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
