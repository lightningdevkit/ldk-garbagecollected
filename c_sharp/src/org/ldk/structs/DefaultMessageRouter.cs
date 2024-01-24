using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`MessageRouter`] that can only route to a directly connected [`Destination`].
 */
public class DefaultMessageRouter : CommonBase {
	internal DefaultMessageRouter(object _dummy, long ptr) : base(ptr) { }
	~DefaultMessageRouter() {
		if (ptr != 0) { bindings.DefaultMessageRouter_free(ptr); }
	}

	/**
	 * Creates a [`DefaultMessageRouter`] using the given [`NetworkGraph`].
	 */
	public static DefaultMessageRouter of(org.ldk.structs.NetworkGraph network_graph, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.DefaultMessageRouter_new(network_graph == null ? 0 : network_graph.ptr, entropy_source.ptr);
		GC.KeepAlive(network_graph);
		GC.KeepAlive(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DefaultMessageRouter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DefaultMessageRouter(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageRouter which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageRouter must be freed before this_arg is
	 */
	public MessageRouter as_MessageRouter() {
		long ret = bindings.DefaultMessageRouter_as_MessageRouter(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageRouter ret_hu_conv = new MessageRouter(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
