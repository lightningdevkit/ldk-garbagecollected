
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Represents a future resolution of a [`UtxoLookup::get_utxo`] query resolving async.
 * 
 * See [`UtxoResult::Async`] and [`UtxoFuture::resolve`] for more info.
 */
export class UtxoFuture extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UtxoFuture_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UtxoFuture_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UtxoFuture
	 */
	public clone(): UtxoFuture {
		const ret: bigint = bindings.UtxoFuture_clone(this.ptr);
		const ret_hu_conv: UtxoFuture = new UtxoFuture(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Builds a new future for later resolution.
	 */
	public static constructor_new(): UtxoFuture {
		const ret: bigint = bindings.UtxoFuture_new();
		const ret_hu_conv: UtxoFuture = new UtxoFuture(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
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
	public resolve_without_forwarding(graph: NetworkGraph, result: Result_TxOutUtxoLookupErrorZ): void {
		bindings.UtxoFuture_resolve_without_forwarding(this.ptr, CommonBase.get_ptr_of(graph), CommonBase.get_ptr_of(result));
		CommonBase.add_ref_from(this, graph);
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
	public resolve(graph: NetworkGraph, gossip: P2PGossipSync, result: Result_TxOutUtxoLookupErrorZ): void {
		bindings.UtxoFuture_resolve(this.ptr, CommonBase.get_ptr_of(graph), CommonBase.get_ptr_of(gossip), CommonBase.get_ptr_of(result));
		CommonBase.add_ref_from(this, graph);
		CommonBase.add_ref_from(this, gossip);
	}

}
