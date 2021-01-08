package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Route extends CommonBase {
	Route(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Route_free(ptr); }
	}

	public Route clone() {
		long ret = bindings.Route_clone(this.ptr);
		Route ret_hu_conv = new Route(null, ret);
		return ret_hu_conv;
	}

	public void set_paths(RouteHop[][] val) {
		bindings.Route_set_paths(this.ptr, (long[][])Arrays.stream(val).map(arr_conv_12 -> Arrays.stream(arr_conv_12).mapToLong(arr_conv_10 -> arr_conv_10 == null ? 0 : arr_conv_10.ptr & ~1).toArray()).toArray());
		/* TODO 2 RouteHop[]  */;
	}

	public static Route constructor_new(RouteHop[][] paths_arg) {
		long ret = bindings.Route_new((long[][])Arrays.stream(paths_arg).map(arr_conv_12 -> Arrays.stream(arr_conv_12).mapToLong(arr_conv_10 -> arr_conv_10 == null ? 0 : arr_conv_10.ptr & ~1).toArray()).toArray());
		Route ret_hu_conv = new Route(null, ret);
		/* TODO 2 RouteHop[]  */;
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.Route_write(this.ptr);
		return ret;
	}

	public static Result_RouteDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.Route_read(ser);
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
