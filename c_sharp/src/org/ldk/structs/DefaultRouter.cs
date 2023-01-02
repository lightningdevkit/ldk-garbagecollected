using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`Router`] implemented using [`find_route`].
 */
public class DefaultRouter : CommonBase {
	internal DefaultRouter(object _dummy, long ptr) : base(ptr) { }
	~DefaultRouter() {
		if (ptr != 0) { bindings.DefaultRouter_free(ptr); }
	}

	/**
	 * Creates a new router.
	 */
	public static DefaultRouter of(org.ldk.structs.NetworkGraph network_graph, org.ldk.structs.Logger logger, byte[] random_seed_bytes, org.ldk.structs.LockableScore scorer) {
		long ret = bindings.DefaultRouter_new(network_graph == null ? 0 : network_graph.ptr, logger == null ? 0 : logger.ptr, InternalUtils.check_arr_len(random_seed_bytes, 32), scorer == null ? 0 : scorer.ptr);
		GC.KeepAlive(network_graph);
		GC.KeepAlive(logger);
		GC.KeepAlive(random_seed_bytes);
		GC.KeepAlive(scorer);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DefaultRouter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DefaultRouter(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(scorer); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Router which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Router must be freed before this_arg is
	 */
	public Router as_Router() {
		long ret = bindings.DefaultRouter_as_Router(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Router ret_hu_conv = new Router(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
