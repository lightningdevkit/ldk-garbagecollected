
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An intermediate node, and possibly a short channel id leading to the next node.
 * 
 * Note:
 * [`MessageForwardNode`] must represent a node that supports [`supports_onion_messages`]
 * in order to be included in valid blinded paths for onion messaging.
 * 
 * [`supports_onion_messages`]: crate::types::features::Features::supports_onion_messages
 */
export class MessageForwardNode extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.MessageForwardNode_free);
	}

	/**
	 * This node's pubkey.
	 */
	public get_node_id(): Uint8Array {
		const ret: number = bindings.MessageForwardNode_get_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * This node's pubkey.
	 */
	public set_node_id(val: Uint8Array): void {
		bindings.MessageForwardNode_set_node_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The channel between `node_id` and the next hop. If set, the constructed [`BlindedHop`]'s
	 * `encrypted_payload` will use this instead of the next [`MessageForwardNode::node_id`] for a
	 * more compact representation.
	 */
	public get_short_channel_id(): Option_u64Z {
		const ret: bigint = bindings.MessageForwardNode_get_short_channel_id(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel between `node_id` and the next hop. If set, the constructed [`BlindedHop`]'s
	 * `encrypted_payload` will use this instead of the next [`MessageForwardNode::node_id`] for a
	 * more compact representation.
	 */
	public set_short_channel_id(val: Option_u64Z): void {
		bindings.MessageForwardNode_set_short_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new MessageForwardNode given each field
	 */
	public static constructor_new(node_id_arg: Uint8Array, short_channel_id_arg: Option_u64Z): MessageForwardNode {
		const ret: bigint = bindings.MessageForwardNode_new(bindings.encodeUint8Array(node_id_arg), CommonBase.get_ptr_of(short_channel_id_arg));
		const ret_hu_conv: MessageForwardNode = new MessageForwardNode(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MessageForwardNode_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MessageForwardNode
	 */
	public clone(): MessageForwardNode {
		const ret: bigint = bindings.MessageForwardNode_clone(this.ptr);
		const ret_hu_conv: MessageForwardNode = new MessageForwardNode(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the MessageForwardNode.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.MessageForwardNode_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two MessageForwardNodes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: MessageForwardNode): boolean {
		const ret: boolean = bindings.MessageForwardNode_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
