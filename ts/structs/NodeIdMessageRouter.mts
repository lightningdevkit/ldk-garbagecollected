
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


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
export class NodeIdMessageRouter extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NodeIdMessageRouter_free);
	}

	/**
	 * Creates a [`NodeIdMessageRouter`] using the given [`NetworkGraph`].
	 */
	public static constructor_new(network_graph: NetworkGraph, entropy_source: EntropySource): NodeIdMessageRouter {
		const ret: bigint = bindings.NodeIdMessageRouter_new(CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: NodeIdMessageRouter = new NodeIdMessageRouter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageRouter which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageRouter must be freed before this_arg is
	 */
	public as_MessageRouter(): MessageRouter {
		const ret: bigint = bindings.NodeIdMessageRouter_as_MessageRouter(this.ptr);
		const ret_hu_conv: MessageRouter = new MessageRouter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
