package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Private routing information
 * 
 * # Invariants
 * The encoded route has to be <1024 5bit characters long (<=639 bytes or <=12 hops)
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PrivateRoute extends CommonBase {
	PrivateRoute(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PrivateRoute_free(ptr); }
	}

	/**
	 * Checks if two PrivateRoutes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(PrivateRoute b) {
		boolean ret = bindings.PrivateRoute_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Creates a copy of the PrivateRoute
	 */
	public PrivateRoute clone() {
		long ret = bindings.PrivateRoute_clone(this.ptr);
		if (ret < 1024) { return null; }
		PrivateRoute ret_hu_conv = new PrivateRoute(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new (partial) route from a list of hops
	 */
	public static Result_PrivateRouteCreationErrorZ of(RouteHint hops) {
		long ret = bindings.PrivateRoute_new(hops == null ? 0 : hops.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_PrivateRouteCreationErrorZ ret_hu_conv = Result_PrivateRouteCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(hops);
		return ret_hu_conv;
	}

	/**
	 * Returns the underlying list of hops
	 */
	public RouteHint into_inner() {
		long ret = bindings.PrivateRoute_into_inner(this.ptr);
		if (ret < 1024) { return null; }
		RouteHint ret_hu_conv = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
