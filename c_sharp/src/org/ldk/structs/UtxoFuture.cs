using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Represents a future resolution of a [`UtxoLookup::get_utxo`] query resolving async.
 * 
 * See [`UtxoResult::Async`] and [`UtxoFuture::resolve`] for more info.
 */
public class UtxoFuture : CommonBase {
	internal UtxoFuture(object _dummy, long ptr) : base(ptr) { }
	~UtxoFuture() {
		if (ptr != 0) { bindings.UtxoFuture_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.UtxoFuture_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UtxoFuture
	 */
	public UtxoFuture clone() {
		long ret = bindings.UtxoFuture_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UtxoFuture ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UtxoFuture(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Builds a new future for later resolution.
	 */
	public static UtxoFuture of() {
		long ret = bindings.UtxoFuture_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UtxoFuture ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UtxoFuture(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Resolves this future against the given `graph` and with the given `result`.
	 * 
	 * This is identical to calling [`UtxoFuture::resolve`] with a dummy `gossip`, disabling
	 * forwarding the validated gossip message onwards to peers.
	 * 
	 * Because this may cause the [`NetworkGraph`]'s [`processing_queue_high`] to flip, in order
	 * to allow us to interact with peers again, you should call [`PeerManager::process_events`]
	 * after this.
	 * 
	 * [`processing_queue_high`]: crate::ln::msgs::RoutingMessageHandler::processing_queue_high
	 * [`PeerManager::process_events`]: crate::ln::peer_handler::PeerManager::process_events
	 */
	public void resolve_without_forwarding(org.ldk.structs.NetworkGraph graph, org.ldk.structs.Result_TxOutUtxoLookupErrorZ result) {
		bindings.UtxoFuture_resolve_without_forwarding(this.ptr, graph == null ? 0 : graph.ptr, result != null ? result.ptr : 0);
		GC.KeepAlive(this);
		GC.KeepAlive(graph);
		GC.KeepAlive(result);
		if (this != null) { this.ptrs_to.AddLast(graph); };
	}

	/**
	 * Resolves this future against the given `graph` and with the given `result`.
	 * 
	 * The given `gossip` is used to broadcast any validated messages onwards to all peers which
	 * have available buffer space.
	 * 
	 * Because this may cause the [`NetworkGraph`]'s [`processing_queue_high`] to flip, in order
	 * to allow us to interact with peers again, you should call [`PeerManager::process_events`]
	 * after this.
	 * 
	 * [`processing_queue_high`]: crate::ln::msgs::RoutingMessageHandler::processing_queue_high
	 * [`PeerManager::process_events`]: crate::ln::peer_handler::PeerManager::process_events
	 */
	public void resolve(org.ldk.structs.NetworkGraph graph, org.ldk.structs.P2PGossipSync gossip, org.ldk.structs.Result_TxOutUtxoLookupErrorZ result) {
		bindings.UtxoFuture_resolve(this.ptr, graph == null ? 0 : graph.ptr, gossip == null ? 0 : gossip.ptr, result != null ? result.ptr : 0);
		GC.KeepAlive(this);
		GC.KeepAlive(graph);
		GC.KeepAlive(gossip);
		GC.KeepAlive(result);
		if (this != null) { this.ptrs_to.AddLast(graph); };
		if (this != null) { this.ptrs_to.AddLast(gossip); };
	}

}
} } }
