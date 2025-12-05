
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


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
export class DefaultMessageRouter extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DefaultMessageRouter_free);
	}

	/**
	 * Creates a [`DefaultMessageRouter`] using the given [`NetworkGraph`].
	 */
	public static constructor_new(network_graph: NetworkGraph, entropy_source: EntropySource): DefaultMessageRouter {
		const ret: bigint = bindings.DefaultMessageRouter_new(CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: DefaultMessageRouter = new DefaultMessageRouter(null, ret);
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
		const ret: bigint = bindings.DefaultMessageRouter_as_MessageRouter(this.ptr);
		const ret_hu_conv: MessageRouter = new MessageRouter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
