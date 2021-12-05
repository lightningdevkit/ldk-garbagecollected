package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`Router`] implemented using [`find_route`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DefaultRouter extends CommonBase {
	DefaultRouter(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DefaultRouter_free(ptr); }
	}

	/**
	 * Creates a new router using the given [`NetworkGraph`] and  [`Logger`].
	 */
	public static DefaultRouter of(NetworkGraph network_graph, Logger logger) {
		long ret = bindings.DefaultRouter_new(network_graph == null ? 0 : network_graph.ptr & ~1, logger == null ? 0 : logger.ptr);
		Reference.reachabilityFence(network_graph);
		Reference.reachabilityFence(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		DefaultRouter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new DefaultRouter(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(network_graph);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Router which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Router must be freed before this_arg is
	 */
	public Router as_Router() {
		long ret = bindings.DefaultRouter_as_Router(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Router ret_hu_conv = new Router(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
