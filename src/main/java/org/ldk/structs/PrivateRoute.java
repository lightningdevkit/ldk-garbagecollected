package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
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

	long clone_ptr() {
		long ret = bindings.PrivateRoute_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PrivateRoute
	 */
	public PrivateRoute clone() {
		long ret = bindings.PrivateRoute_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		PrivateRoute ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PrivateRoute(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PrivateRoutes contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.PrivateRoute_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two PrivateRoutes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(PrivateRoute b) {
		boolean ret = bindings.PrivateRoute_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PrivateRoute)) return false;
		return this.eq((PrivateRoute)o);
	}
	/**
	 * Creates a new (partial) route from a list of hops
	 */
	public static Result_PrivateRouteCreationErrorZ of(RouteHint hops) {
		long ret = bindings.PrivateRoute_new(hops == null ? 0 : hops.ptr & ~1);
		Reference.reachabilityFence(hops);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PrivateRouteCreationErrorZ ret_hu_conv = Result_PrivateRouteCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the underlying list of hops
	 */
	public RouteHint into_inner() {
		long ret = bindings.PrivateRoute_into_inner(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteHint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteHint(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		;
		return ret_hu_conv;
	}

}
