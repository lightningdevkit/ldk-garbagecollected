package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * A route directs a payment from the sender (us) to the recipient. If the recipient supports MPP,
 * it can take multiple paths. Each path is composed of one or more hops through the network.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Route extends CommonBase {
	Route(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Route_free(ptr); }
	}

	/**
	 * The list of routes taken for a single (potentially-)multi-part payment. The pubkey of the
	 * last RouteHop in each path must be the same.
	 * Each entry represents a list of hops, NOT INCLUDING our own, where the last hop is the
	 * destination. Thus, this must always be at least length one. While the maximum length of any
	 * given path is variable, keeping the length of any path to less than 20 should currently
	 * ensure it is viable.
	 */
	public void set_paths(RouteHop[][] val) {
		bindings.Route_set_paths(this.ptr, Arrays.stream(val).map(val_conv_12 -> Arrays.stream(val_conv_12).mapToLong(val_conv_12_conv_10 -> val_conv_12_conv_10 == null ? 0 : val_conv_12_conv_10.ptr & ~1).toArray()).toArray(long[][]::new));
		/* TODO 2 RouteHop[]  */;
	}

	/**
	 * Constructs a new Route given each field
	 */
	public static Route of(RouteHop[][] paths_arg) {
		long ret = bindings.Route_new(Arrays.stream(paths_arg).map(paths_arg_conv_12 -> Arrays.stream(paths_arg_conv_12).mapToLong(paths_arg_conv_12_conv_10 -> paths_arg_conv_12_conv_10 == null ? 0 : paths_arg_conv_12_conv_10.ptr & ~1).toArray()).toArray(long[][]::new));
		Route ret_hu_conv = new Route(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		/* TODO 2 RouteHop[]  */;
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the Route
	 */
	public Route clone() {
		long ret = bindings.Route_clone(this.ptr);
		Route ret_hu_conv = new Route(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Route object into a byte array which can be read by Route_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Route_write(this.ptr);
		return ret;
	}

	/**
	 * Read a Route from a byte array, created by Route_write
	 */
	public static Result_RouteDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Route_read(ser);
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
