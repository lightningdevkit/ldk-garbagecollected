package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * This message router is similar to [`DefaultMessageRouter`], but it always creates
 * full-length blinded paths, using the peer's [`NodeId`].
 * 
 * This message router can only route to a directly connected [`Destination`].
 * 
 * # Privacy
 * 
 * Creating [`BlindedMessagePath`]s may affect privacy since, if a suitable path cannot be found,
 * it will create a one-hop path using the recipient as the introduction node if it is an announced
 * node. Otherwise, there is no way to find a path to the introduction node in order to send a
 * message, and thus an `Err` is returned.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeIdMessageRouter extends CommonBase {
	NodeIdMessageRouter(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeIdMessageRouter_free(ptr); }
	}

	/**
	 * Creates a [`NodeIdMessageRouter`] using the given [`NetworkGraph`].
	 */
	public static NodeIdMessageRouter of(org.ldk.structs.NetworkGraph network_graph, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.NodeIdMessageRouter_new(network_graph.ptr, entropy_source.ptr);
		Reference.reachabilityFence(network_graph);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeIdMessageRouter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeIdMessageRouter(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageRouter which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageRouter must be freed before this_arg is
	 */
	public MessageRouter as_MessageRouter() {
		long ret = bindings.NodeIdMessageRouter_as_MessageRouter(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageRouter ret_hu_conv = new MessageRouter(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
