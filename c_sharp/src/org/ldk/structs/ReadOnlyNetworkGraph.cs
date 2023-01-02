using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A read-only view of [`NetworkGraph`].
 */
public class ReadOnlyNetworkGraph : CommonBase, IDisposable {
	internal ReadOnlyNetworkGraph(object _dummy, long ptr) : base(ptr) { }
	public void Dispose() {
		if (ptr != 0) { bindings.ReadOnlyNetworkGraph_free(ptr); }
	}

	/**
	 * Returns information on a channel with the given id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ChannelInfo channel(long short_channel_id) {
		long ret = bindings.ReadOnlyNetworkGraph_channel(this.ptr, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(short_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the list of channels in the graph
	 */
	public long[] list_channels() {
		long[] ret = bindings.ReadOnlyNetworkGraph_list_channels(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns information on a node with the given id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public NodeInfo node(org.ldk.structs.NodeId node_id) {
		long ret = bindings.ReadOnlyNetworkGraph_node(this.ptr, node_id == null ? 0 : node_id.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(node_id); };
		return ret_hu_conv;
	}

	/**
	 * Returns the list of nodes in the graph
	 */
	public NodeId[] list_nodes() {
		long[] ret = bindings.ReadOnlyNetworkGraph_list_nodes(this.ptr);
		GC.KeepAlive(this);
		int ret_conv_8_len = ret.Length;
		NodeId[] ret_conv_8_arr = new NodeId[ret_conv_8_len];
		for (int i = 0; i < ret_conv_8_len; i++) {
			long ret_conv_8 = ret[i];
			org.ldk.structs.NodeId ret_conv_8_hu_conv = null; if (ret_conv_8 < 0 || ret_conv_8 > 4096) { ret_conv_8_hu_conv = new org.ldk.structs.NodeId(null, ret_conv_8); }
			if (ret_conv_8_hu_conv != null) { ret_conv_8_hu_conv.ptrs_to.AddLast(this); };
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
		GC.KeepAlive(this);
		GC.KeepAlive(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_NetAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
