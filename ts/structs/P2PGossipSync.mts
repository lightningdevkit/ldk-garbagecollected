
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Receives and validates network updates from peers,
 * stores authentic and relevant data as a network graph.
 * This network graph is then used for routing payments.
 * Provides interface to help with initial routing sync by
 * serving historical announcements.
 */
export class P2PGossipSync extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.P2PGossipSync_free);
	}

	/**
	 * Creates a new tracker of the actual state of the network of channels and nodes,
	 * assuming an existing [`NetworkGraph`].
	 * UTXO lookup is used to make sure announced channels exist on-chain, channel data is
	 * correct, and the announcement is signed with channel owners' keys.
	 */
	public static constructor_new(network_graph: NetworkGraph, utxo_lookup: Option_UtxoLookupZ, logger: Logger): P2PGossipSync {
		const ret: bigint = bindings.P2PGossipSync_new(CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(utxo_lookup), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: P2PGossipSync = new P2PGossipSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		CommonBase.add_ref_from(ret_hu_conv, utxo_lookup);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Adds a provider used to check new announcements. Does not affect
	 * existing announcements unless they are updated.
	 * Add, update or remove the provider would replace the current one.
	 */
	public add_utxo_lookup(utxo_lookup: Option_UtxoLookupZ): void {
		bindings.P2PGossipSync_add_utxo_lookup(this.ptr, CommonBase.get_ptr_of(utxo_lookup));
		CommonBase.add_ref_from(this, utxo_lookup);
	}

	/**
	 * Constructs a new RoutingMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned RoutingMessageHandler must be freed before this_arg is
	 */
	public as_RoutingMessageHandler(): RoutingMessageHandler {
		const ret: bigint = bindings.P2PGossipSync_as_RoutingMessageHandler(this.ptr);
		const ret_hu_conv: RoutingMessageHandler = new RoutingMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public as_BaseMessageHandler(): BaseMessageHandler {
		const ret: bigint = bindings.P2PGossipSync_as_BaseMessageHandler(this.ptr);
		const ret_hu_conv: BaseMessageHandler = new BaseMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
