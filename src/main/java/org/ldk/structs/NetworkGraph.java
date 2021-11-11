package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Represents the network as nodes and channels between them
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NetworkGraph extends CommonBase {
	NetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NetworkGraph_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.NetworkGraph_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NetworkGraph
	 */
	public NetworkGraph clone() {
		long ret = bindings.NetworkGraph_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		NetworkGraph ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NetworkGraph(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the NetworkGraph object into a byte array which can be read by NetworkGraph_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NetworkGraph_write(this.ptr);
		return ret;
	}

	/**
	 * Read a NetworkGraph from a byte array, created by NetworkGraph_write
	 */
	public static Result_NetworkGraphDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NetworkGraph_read(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NetworkGraphDecodeErrorZ ret_hu_conv = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new, empty, network graph.
	 */
	public static NetworkGraph of(byte[] genesis_hash) {
		long ret = bindings.NetworkGraph_new(InternalUtils.check_arr_len(genesis_hash, 32));
		if (ret >= 0 && ret <= 4096) { return null; }
		NetworkGraph ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NetworkGraph(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns a read-only view of the network graph.
	 */
	public ReadOnlyNetworkGraph read_only() {
		long ret = bindings.NetworkGraph_read_only(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		ReadOnlyNetworkGraph ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ReadOnlyNetworkGraph(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * For an already known node (from channel announcements), update its stored properties from a
	 * given node announcement.
	 * 
	 * You probably don't want to call this directly, instead relying on a NetGraphMsgHandler's
	 * RoutingMessageHandler implementation to call it indirectly. This may be useful to accept
	 * routing messages from a source using a protocol other than the lightning P2P protocol.
	 */
	public Result_NoneLightningErrorZ update_node_from_announcement(NodeAnnouncement msg) {
		long ret = bindings.NetworkGraph_update_node_from_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	/**
	 * For an already known node (from channel announcements), update its stored properties from a
	 * given node announcement without verifying the associated signatures. Because we aren't
	 * given the associated signatures here we cannot relay the node announcement to any of our
	 * peers.
	 */
	public Result_NoneLightningErrorZ update_node_from_unsigned_announcement(UnsignedNodeAnnouncement msg) {
		long ret = bindings.NetworkGraph_update_node_from_unsigned_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	/**
	 * Store or update channel info from a channel announcement.
	 * 
	 * You probably don't want to call this directly, instead relying on a NetGraphMsgHandler's
	 * RoutingMessageHandler implementation to call it indirectly. This may be useful to accept
	 * routing messages from a source using a protocol other than the lightning P2P protocol.
	 * 
	 * If a `chain::Access` object is provided via `chain_access`, it will be called to verify
	 * the corresponding UTXO exists on chain and is correctly-formatted.
	 */
	public Result_NoneLightningErrorZ update_channel_from_announcement(ChannelAnnouncement msg, Option_AccessZ chain_access) {
		long ret = bindings.NetworkGraph_update_channel_from_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1, chain_access.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		this.ptrs_to.add(chain_access);
		return ret_hu_conv;
	}

	/**
	 * Store or update channel info from a channel announcement without verifying the associated
	 * signatures. Because we aren't given the associated signatures here we cannot relay the
	 * channel announcement to any of our peers.
	 * 
	 * If a `chain::Access` object is provided via `chain_access`, it will be called to verify
	 * the corresponding UTXO exists on chain and is correctly-formatted.
	 */
	public Result_NoneLightningErrorZ update_channel_from_unsigned_announcement(UnsignedChannelAnnouncement msg, Option_AccessZ chain_access) {
		long ret = bindings.NetworkGraph_update_channel_from_unsigned_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1, chain_access.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		this.ptrs_to.add(chain_access);
		return ret_hu_conv;
	}

	/**
	 * Close a channel if a corresponding HTLC fail was sent.
	 * If permanent, removes a channel from the local storage.
	 * May cause the removal of nodes too, if this was their last channel.
	 * If not permanent, makes channels unavailable for routing.
	 */
	public void close_channel_from_update(long short_channel_id, boolean is_permanent) {
		bindings.NetworkGraph_close_channel_from_update(this.ptr, short_channel_id, is_permanent);
	}

	/**
	 * Marks a node in the graph as failed.
	 */
	public void fail_node(byte[] _node_id, boolean is_permanent) {
		bindings.NetworkGraph_fail_node(this.ptr, InternalUtils.check_arr_len(_node_id, 33), is_permanent);
	}

	/**
	 * For an already known (from announcement) channel, update info about one of the directions
	 * of the channel.
	 * 
	 * You probably don't want to call this directly, instead relying on a NetGraphMsgHandler's
	 * RoutingMessageHandler implementation to call it indirectly. This may be useful to accept
	 * routing messages from a source using a protocol other than the lightning P2P protocol.
	 */
	public Result_NoneLightningErrorZ update_channel(ChannelUpdate msg) {
		long ret = bindings.NetworkGraph_update_channel(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	/**
	 * For an already known (from announcement) channel, update info about one of the directions
	 * of the channel without verifying the associated signatures. Because we aren't given the
	 * associated signatures here we cannot relay the channel update to any of our peers.
	 */
	public Result_NoneLightningErrorZ update_channel_unsigned(UnsignedChannelUpdate msg) {
		long ret = bindings.NetworkGraph_update_channel_unsigned(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

}
