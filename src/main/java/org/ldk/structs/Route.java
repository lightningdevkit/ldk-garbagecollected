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
		bindings.Route_free(ptr);
	}

	public static Route constructor_clone(Route orig) {
		long ret = bindings.Route_clone(orig == null ? 0 : orig.ptr & ~1);
		Route ret_hu_conv = new Route(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
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

	public byte[] write(Route obj) {
		byte[] ret = bindings.Route_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static Route constructor_read(byte[] ser) {
		long ret = bindings.Route_read(ser);
		Route ret_hu_conv = new Route(null, ret);
		return ret_hu_conv;
	}

}
