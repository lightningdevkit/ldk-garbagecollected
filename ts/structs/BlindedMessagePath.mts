
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A blinded path to be used for sending or receiving a message, hiding the identity of the
 * recipient.
 */
export class BlindedMessagePath extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BlindedMessagePath_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BlindedMessagePath_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedMessagePath
	 */
	public clone(): BlindedMessagePath {
		const ret: bigint = bindings.BlindedMessagePath_clone(this.ptr);
		const ret_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedMessagePath.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.BlindedMessagePath_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two BlindedMessagePaths contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: BlindedMessagePath): boolean {
		const ret: boolean = bindings.BlindedMessagePath_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the BlindedMessagePath object into a byte array which can be read by BlindedMessagePath_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.BlindedMessagePath_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BlindedMessagePath from a byte array, created by BlindedMessagePath_write
	 */
	public static constructor_read(ser: Uint8Array): Result_BlindedMessagePathDecodeErrorZ {
		const ret: bigint = bindings.BlindedMessagePath_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_BlindedMessagePathDecodeErrorZ = Result_BlindedMessagePathDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a one-hop blinded path for a message.
	 */
	public static constructor_one_hop(recipient_node_id: Uint8Array, local_node_receive_key: ReceiveAuthKey, context: MessageContext, entropy_source: EntropySource): BlindedMessagePath {
		const ret: bigint = bindings.BlindedMessagePath_one_hop(bindings.encodeUint8Array(recipient_node_id), CommonBase.get_ptr_of(local_node_receive_key), CommonBase.get_ptr_of(context), CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Create a path for an onion message, to be forwarded along `node_pks`.
	 */
	public static constructor_new(intermediate_nodes: MessageForwardNode[], recipient_node_id: Uint8Array, local_node_receive_key: ReceiveAuthKey, context: MessageContext, entropy_source: EntropySource): BlindedMessagePath {
		const ret: bigint = bindings.BlindedMessagePath_new(bindings.encodeUint64Array(intermediate_nodes.map(intermediate_nodes_conv_20 => CommonBase.get_ptr_of(intermediate_nodes_conv_20))), bindings.encodeUint8Array(recipient_node_id), CommonBase.get_ptr_of(local_node_receive_key), CommonBase.get_ptr_of(context), CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Same as [`BlindedMessagePath::new`], but allows specifying a number of dummy hops.
	 * 
	 * Note:
	 * At most [`MAX_DUMMY_HOPS_COUNT`] dummy hops can be added to the blinded path.
	 */
	public static constructor_new_with_dummy_hops(intermediate_nodes: MessageForwardNode[], recipient_node_id: Uint8Array, dummy_hop_count: number, local_node_receive_key: ReceiveAuthKey, context: MessageContext, entropy_source: EntropySource): BlindedMessagePath {
		const ret: bigint = bindings.BlindedMessagePath_new_with_dummy_hops(bindings.encodeUint64Array(intermediate_nodes.map(intermediate_nodes_conv_20 => CommonBase.get_ptr_of(intermediate_nodes_conv_20))), bindings.encodeUint8Array(recipient_node_id), dummy_hop_count, CommonBase.get_ptr_of(local_node_receive_key), CommonBase.get_ptr_of(context), CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Attempts to a use a compact representation for the [`IntroductionNode`] by using a directed
	 * short channel id from a channel in `network_graph` leading to the introduction node.
	 * 
	 * While this may result in a smaller encoding, there is a trade off in that the path may
	 * become invalid if the channel is closed or hasn't been propagated via gossip. Therefore,
	 * calling this may not be suitable for long-lived blinded paths.
	 */
	public use_compact_introduction_node(network_graph: ReadOnlyNetworkGraph): void {
		bindings.BlindedMessagePath_use_compact_introduction_node(this.ptr, CommonBase.get_ptr_of(network_graph));
		CommonBase.add_ref_from(this, network_graph);
	}

	/**
	 * Returns the introduction [`NodeId`] of the blinded path, if it is publicly reachable (i.e.,
	 * it is found in the network graph).
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public public_introduction_node_id(network_graph: ReadOnlyNetworkGraph): NodeId {
		const ret: bigint = bindings.BlindedMessagePath_public_introduction_node_id(this.ptr, CommonBase.get_ptr_of(network_graph));
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		CommonBase.add_ref_from(this, network_graph);
		return ret_hu_conv;
	}

	/**
	 * The [`IntroductionNode`] of the blinded path.
	 */
	public introduction_node(): IntroductionNode {
		const ret: bigint = bindings.BlindedMessagePath_introduction_node(this.ptr);
		const ret_hu_conv: IntroductionNode = IntroductionNode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Used by the [`IntroductionNode`] to decrypt its [`encrypted_payload`] to forward the message.
	 * 
	 * [`encrypted_payload`]: BlindedHop::encrypted_payload
	 */
	public blinding_point(): Uint8Array {
		const ret: number = bindings.BlindedMessagePath_blinding_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The [`BlindedHop`]s within the blinded path.
	 */
	public blinded_hops(): BlindedHop[] {
		const ret: number = bindings.BlindedMessagePath_blinded_hops(this.ptr);
		const ret_conv_12_len: number = bindings.getArrayLength(ret);
		const ret_conv_12_arr: BlindedHop[] = new Array(ret_conv_12_len).fill(null);
		for (var m = 0; m < ret_conv_12_len; m++) {
			const ret_conv_12: bigint = bindings.getU64ArrayElem(ret, m);
			const ret_conv_12_hu_conv: BlindedHop = new BlindedHop(null, ret_conv_12);
			CommonBase.add_ref_from(ret_conv_12_hu_conv, this);
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_12_arr;
	}

	/**
	 * Advance the blinded onion message path by one hop, making the second hop into the new
	 * introduction node.
	 * 
	 * Will only modify `self` when returning `Ok`.
	 */
	public advance_path_by_one(node_signer: NodeSigner, node_id_lookup: NodeIdLookUp): Result_NoneNoneZ {
		const ret: bigint = bindings.BlindedMessagePath_advance_path_by_one(this.ptr, CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(node_id_lookup));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, node_signer);
		CommonBase.add_ref_from(this, node_id_lookup);
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`BlindedMessagePath`] from its constituent parts.
	 * 
	 * Useful when you need to reconstruct a blinded path from previously serialized components.
	 * 
	 * Parameters:
	 * `introduction_node_id`: The public key of the introduction node in the path
	 * `blinding_point`: The public key used for blinding the path
	 * `blinded_hops`: The encrypted routing information for each hop in the path
	 */
	public static constructor_from_blinded_path(introduction_node_id: Uint8Array, blinding_point: Uint8Array, blinded_hops: BlindedHop[]): BlindedMessagePath {
		const ret: bigint = bindings.BlindedMessagePath_from_blinded_path(bindings.encodeUint8Array(introduction_node_id), bindings.encodeUint8Array(blinding_point), bindings.encodeUint64Array(blinded_hops.map(blinded_hops_conv_12 => CommonBase.get_ptr_of(blinded_hops_conv_12))));
		const ret_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
