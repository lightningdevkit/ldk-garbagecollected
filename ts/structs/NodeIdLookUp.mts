

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of NodeIdLookUp */
export interface NodeIdLookUpInterface {
	/**Returns the node id of the forwarding node's channel counterparty with `short_channel_id`.
	 * 
	 * Here, the forwarding node is referring to the node of the [`OnionMessenger`] parameterized
	 * by the [`NodeIdLookUp`] and the counterparty to one of that node's peers.
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	next_node_id(short_channel_id: bigint): Uint8Array;
}

class LDKNodeIdLookUpHolder {
	held: NodeIdLookUp|null = null;
}

/**
 * An interface for looking up the node id of a channel counterparty for the purpose of forwarding
 * an [`OnionMessage`].
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
export class NodeIdLookUp extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKNodeIdLookUp|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NodeIdLookUp_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of NodeIdLookUp from a given implementation */
	public static new_impl(arg: NodeIdLookUpInterface): NodeIdLookUp {
		const impl_holder: LDKNodeIdLookUpHolder = new LDKNodeIdLookUpHolder();
		let structImplementation = {
			next_node_id (short_channel_id: bigint): number {
				const ret: Uint8Array = arg.next_node_id(short_channel_id);
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
		} as bindings.LDKNodeIdLookUp;
		const ptr_idx: [bigint, number] = bindings.LDKNodeIdLookUp_new(structImplementation);

		impl_holder.held = new NodeIdLookUp(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns the node id of the forwarding node's channel counterparty with `short_channel_id`.
	 * 
	 * Here, the forwarding node is referring to the node of the [`OnionMessenger`] parameterized
	 * by the [`NodeIdLookUp`] and the counterparty to one of that node's peers.
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public next_node_id(short_channel_id: bigint): Uint8Array {
		const ret: number = bindings.NodeIdLookUp_next_node_id(this.ptr, short_channel_id);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
