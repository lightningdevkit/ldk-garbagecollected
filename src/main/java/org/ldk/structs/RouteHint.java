package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A list of hops along a payment path terminating with a channel to the recipient.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RouteHint extends CommonBase {
	RouteHint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RouteHint_free(ptr); }
	}

	/**
	 * Checks if two RouteHints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(RouteHint b) {
		boolean ret = bindings.RouteHint_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHint
	 */
	public RouteHint clone() {
		long ret = bindings.RouteHint_clone(this.ptr);
		if (ret < 1024) { return null; }
		RouteHint ret_hu_conv = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
