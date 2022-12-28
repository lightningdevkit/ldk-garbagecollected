package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A read-only view of [`NetworkGraph`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ReadOnlyNetworkGraph extends CommonBase implements AutoCloseable {
	ReadOnlyNetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override public void close() {
		if (ptr != 0) { bindings.ReadOnlyNetworkGraph_free(ptr); }
	}

	/**
	 * Returns information on a channel with the given id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelInfo channel(long short_channel_id) {
		long ret = bindings.ReadOnlyNetworkGraph_channel(this.ptr, short_channel_id);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(short_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the list of channels in the graph
	 */
	public long[] list_channels() {
		long[] ret = bindings.ReadOnlyNetworkGraph_list_channels(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns information on a node with the given id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public NodeInfo node(org.ldk.structs.NodeId node_id) {
		long ret = bindings.ReadOnlyNetworkGraph_node(this.ptr, node_id == null ? 0 : node_id.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(node_id); };
		return ret_hu_conv;
	}

	/**
	 * Returns the list of nodes in the graph
	 */
	public NodeId[] list_nodes() {
		long[] ret = bindings.ReadOnlyNetworkGraph_list_nodes(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_8_len = ret.length;
		NodeId[] ret_conv_8_arr = new NodeId[ret_conv_8_len];
		for (int i = 0; i < ret_conv_8_len; i++) {
			long ret_conv_8 = ret[i];
			org.ldk.structs.NodeId ret_conv_8_hu_conv = null; if (ret_conv_8 < 0 || ret_conv_8 > 4096) { ret_conv_8_hu_conv = new org.ldk.structs.NodeId(null, ret_conv_8); }
			if (ret_conv_8_hu_conv != null) { ret_conv_8_hu_conv.ptrs_to.add(this); };
			ret_conv_8_arr[i] = ret_conv_8_hu_conv;
		}
		return ret_conv_8_arr;
	}

	/**
	 * Get network addresses by node id.
	 * Returns None if the requested node is completely unknown,
	 * or if node announcement for the node was never received.
	 */
	public Option_CVec_NetAddressZZ get_addresses(byte[] pubkey) {
		long ret = bindings.ReadOnlyNetworkGraph_get_addresses(this.ptr, InternalUtils.check_arr_len(pubkey, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_NetAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
