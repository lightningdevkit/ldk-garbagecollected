using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The main Rapid Gossip Sync object.
 * 
 * See [crate-level documentation] for usage.
 * 
 * [crate-level documentation]: crate
 */
public class RapidGossipSync : CommonBase {
	internal RapidGossipSync(object _dummy, long ptr) : base(ptr) { }
	~RapidGossipSync() {
		if (ptr != 0) { bindings.RapidGossipSync_free(ptr); }
	}

	/**
	 * Instantiate a new [`RapidGossipSync`] instance.
	 */
	public static RapidGossipSync of(org.ldk.structs.NetworkGraph network_graph, org.ldk.structs.Logger logger) {
		long ret = bindings.RapidGossipSync_new(network_graph == null ? 0 : network_graph.ptr, logger.ptr);
		GC.KeepAlive(network_graph);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RapidGossipSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RapidGossipSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		return ret_hu_conv;
	}

	/**
	 * Sync gossip data from a file.
	 * Returns the last sync timestamp to be used the next time rapid sync data is queried.
	 * 
	 * `network_graph`: The network graph to apply the updates to
	 * 
	 * `sync_path`: Path to the file where the gossip update data is located
	 */
	public Result_u32GraphSyncErrorZ sync_network_graph_with_file_path(string sync_path) {
		long ret = bindings.RapidGossipSync_sync_network_graph_with_file_path(this.ptr, sync_path);
		GC.KeepAlive(this);
		GC.KeepAlive(sync_path);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_u32GraphSyncErrorZ ret_hu_conv = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Update network graph from binary data.
	 * Returns the last sync timestamp to be used the next time rapid sync data is queried.
	 * 
	 * `update_data`: `&[u8]` binary stream that comprises the update data
	 */
	public Result_u32GraphSyncErrorZ update_network_graph(byte[] update_data) {
		long ret = bindings.RapidGossipSync_update_network_graph(this.ptr, update_data);
		GC.KeepAlive(this);
		GC.KeepAlive(update_data);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_u32GraphSyncErrorZ ret_hu_conv = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Update network graph from binary data.
	 * Returns the last sync timestamp to be used the next time rapid sync data is queried.
	 * 
	 * `update_data`: `&[u8]` binary stream that comprises the update data
	 * `current_time_unix`: `Option<u64>` optional current timestamp to verify data age
	 */
	public Result_u32GraphSyncErrorZ update_network_graph_no_std(byte[] update_data, org.ldk.structs.Option_u64Z current_time_unix) {
		long ret = bindings.RapidGossipSync_update_network_graph_no_std(this.ptr, update_data, current_time_unix.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(update_data);
		GC.KeepAlive(current_time_unix);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_u32GraphSyncErrorZ ret_hu_conv = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(current_time_unix); };
		return ret_hu_conv;
	}

	/**
	 * Returns whether a rapid gossip sync has completed at least once.
	 */
	public bool is_initial_sync_complete() {
		bool ret = bindings.RapidGossipSync_is_initial_sync_complete(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
