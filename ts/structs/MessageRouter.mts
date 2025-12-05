

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of MessageRouter */
export interface MessageRouterInterface {
	/**Returns a route for sending an [`OnionMessage`] to the given [`Destination`].
	 */
	find_path(sender: Uint8Array, peers: Uint8Array[], destination: Destination): Result_OnionMessagePathNoneZ;
	/**Creates [`BlindedMessagePath`]s to the `recipient` node. The nodes in `peers` are assumed to
	 * be direct peers with the `recipient`.
	 */
	create_blinded_paths(recipient: Uint8Array, local_node_receive_key: ReceiveAuthKey, context: MessageContext, peers: MessageForwardNode[]): Result_CVec_BlindedMessagePathZNoneZ;
}

class LDKMessageRouterHolder {
	held: MessageRouter|null = null;
}

/**
 * A trait defining behavior for routing an [`OnionMessage`].
 */
export class MessageRouter extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKMessageRouter|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.MessageRouter_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of MessageRouter from a given implementation */
	public static new_impl(arg: MessageRouterInterface): MessageRouter {
		const impl_holder: LDKMessageRouterHolder = new LDKMessageRouterHolder();
		let structImplementation = {
			find_path (sender: number, peers: number, destination: bigint): bigint {
				const sender_conv: Uint8Array = bindings.decodeUint8Array(sender);
				const peers_conv_12_len: number = bindings.getArrayLength(peers);
				const peers_conv_12_arr: Uint8Array[] = new Array(peers_conv_12_len).fill(null);
				for (var m = 0; m < peers_conv_12_len; m++) {
					const peers_conv_12: number = bindings.getU32ArrayElem(peers, m);
					const peers_conv_12_conv: Uint8Array = bindings.decodeUint8Array(peers_conv_12);
					peers_conv_12_arr[m] = peers_conv_12_conv;
				}
				bindings.freeWasmMemory(peers)
				const destination_hu_conv: Destination = Destination.constr_from_ptr(destination);
				CommonBase.add_ref_from(destination_hu_conv, this);
				const ret: Result_OnionMessagePathNoneZ = arg.find_path(sender_conv, peers_conv_12_arr, destination_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			create_blinded_paths (recipient: number, local_node_receive_key: bigint, context: bigint, peers: number): bigint {
				const recipient_conv: Uint8Array = bindings.decodeUint8Array(recipient);
				const local_node_receive_key_hu_conv: ReceiveAuthKey = new ReceiveAuthKey(null, local_node_receive_key);
				CommonBase.add_ref_from(local_node_receive_key_hu_conv, this);
				const context_hu_conv: MessageContext = MessageContext.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				const peers_conv_20_len: number = bindings.getArrayLength(peers);
				const peers_conv_20_arr: MessageForwardNode[] = new Array(peers_conv_20_len).fill(null);
				for (var u = 0; u < peers_conv_20_len; u++) {
					const peers_conv_20: bigint = bindings.getU64ArrayElem(peers, u);
					const peers_conv_20_hu_conv: MessageForwardNode = new MessageForwardNode(null, peers_conv_20);
					CommonBase.add_ref_from(peers_conv_20_hu_conv, this);
					peers_conv_20_arr[u] = peers_conv_20_hu_conv;
				}
				bindings.freeWasmMemory(peers)
				const ret: Result_CVec_BlindedMessagePathZNoneZ = arg.create_blinded_paths(recipient_conv, local_node_receive_key_hu_conv, context_hu_conv, peers_conv_20_arr);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKMessageRouter;
		const ptr_idx: [bigint, number] = bindings.LDKMessageRouter_new(structImplementation);

		impl_holder.held = new MessageRouter(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns a route for sending an [`OnionMessage`] to the given [`Destination`].
	 */
	public find_path(sender: Uint8Array, peers: Uint8Array[], destination: Destination): Result_OnionMessagePathNoneZ {
		const ret: bigint = bindings.MessageRouter_find_path(this.ptr, bindings.encodeUint8Array(sender), bindings.encodeUint32Array(peers.map(peers_conv_12 => bindings.encodeUint8Array(peers_conv_12))), CommonBase.get_ptr_of(destination));
		const ret_hu_conv: Result_OnionMessagePathNoneZ = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates [`BlindedMessagePath`]s to the `recipient` node. The nodes in `peers` are assumed to
	 * be direct peers with the `recipient`.
	 */
	public create_blinded_paths(recipient: Uint8Array, local_node_receive_key: ReceiveAuthKey, context: MessageContext, peers: MessageForwardNode[]): Result_CVec_BlindedMessagePathZNoneZ {
		const ret: bigint = bindings.MessageRouter_create_blinded_paths(this.ptr, bindings.encodeUint8Array(recipient), CommonBase.get_ptr_of(local_node_receive_key), CommonBase.get_ptr_of(context), bindings.encodeUint64Array(peers.map(peers_conv_20 => CommonBase.get_ptr_of(peers_conv_20))));
		const ret_hu_conv: Result_CVec_BlindedMessagePathZNoneZ = Result_CVec_BlindedMessagePathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
