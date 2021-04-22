package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Private routing information
 * 
 * # Invariants
 * The encoded route has to be <1024 5bit characters long (<=639 bytes or <=12 hops)
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
	 * Creates a copy of the RouteHint
	 */
	public RouteHint clone() {
		long ret = bindings.RouteHint_clone(this.ptr);
		RouteHint ret_hu_conv = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a new (partial) route from a list of hops
	 */
	public static Result_RouteHintCreationErrorZ constructor_new(RouteHintHop[] hops) {
		long ret = bindings.RouteHint_new(Arrays.stream(hops).mapToLong(hops_conv_14 -> hops_conv_14 == null ? 0 : hops_conv_14.ptr & ~1).toArray());
		Result_RouteHintCreationErrorZ ret_hu_conv = Result_RouteHintCreationErrorZ.constr_from_ptr(ret);
		/* TODO 2 RouteHintHop  */;
		return ret_hu_conv;
	}

	/**
	 * Returrn the underlying vector of hops
	 */
	public RouteHintHop[] into_inner() {
		long[] ret = bindings.RouteHint_into_inner(this.ptr);
		RouteHintHop[] ret_conv_14_arr = new RouteHintHop[ret.length];
		for (int o = 0; o < ret.length; o++) {
			long ret_conv_14 = ret[o];
			RouteHintHop ret_conv_14_hu_conv = new RouteHintHop(null, ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

}
