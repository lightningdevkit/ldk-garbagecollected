using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`MessageRouter`] that can only route to a directly connected [`Destination`].
 * 
 * [`DefaultMessageRouter`] constructs compact [`BlindedMessagePath`]s on a best-effort basis.
 * That is, if appropriate SCID information is available for the intermediate peers, it will
 * default to creating compact paths.
 * 
 * # Compact Blinded Paths
 * 
 * Compact blinded paths use short channel IDs (SCIDs) instead of pubkeys, resulting in smaller
 * serialization. This is particularly useful when encoding data into space-constrained formats
 * such as QR codes. The SCID is communicated via a [`MessageForwardNode`], but may be `None`
 * to allow for graceful degradation.
 * 
 * Note:**
 * If any SCID in the blinded path becomes invalid, the entire compact blinded path may fail to route.
 * For the immediate hop, this can happen if the corresponding channel is closed.
 * For other intermediate hops, it can happen if the channel is closed or modified (e.g., due to splicing).
 * 
 * # Privacy
 * 
 * Creating [`BlindedMessagePath`]s may affect privacy since, if a suitable path cannot be found,
 * it will create a one-hop path using the recipient as the introduction node if it is an announced
 * node. Otherwise, there is no way to find a path to the introduction node in order to send a
 * message, and thus an `Err` is returned.
 */
public class DefaultMessageRouter : CommonBase {
	internal DefaultMessageRouter(object _dummy, long ptr) : base(ptr) { }
	~DefaultMessageRouter() {
		if (ptr != 0) { bindings.DefaultMessageRouter_free(ptr); }
	}

	/**
	 * Creates a [`DefaultMessageRouter`] using the given [`NetworkGraph`].
	 */
	public static org.ldk.structs.DefaultMessageRouter of(org.ldk.structs.NetworkGraph network_graph, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.DefaultMessageRouter_new(network_graph.ptr, entropy_source.ptr);
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
	public org.ldk.structs.MessageRouter as_MessageRouter() {
		long ret = bindings.DefaultMessageRouter_as_MessageRouter(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageRouter ret_hu_conv = new MessageRouter(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
