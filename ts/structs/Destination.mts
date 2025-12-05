
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The destination of an onion message.
 */
export class Destination extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Destination_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Destination {
		const raw_ty: number = bindings.LDKDestination_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Destination_Node(ptr);
			case 1: return new Destination_BlindedPath(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Destination_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Destination
	 */
	public clone(): Destination {
		const ret: bigint = bindings.Destination_clone(this.ptr);
		const ret_hu_conv: Destination = Destination.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Node-variant Destination
	 */
	public static constructor_node(a: Uint8Array): Destination {
		const ret: bigint = bindings.Destination_node(bindings.encodeUint8Array(a));
		const ret_hu_conv: Destination = Destination.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BlindedPath-variant Destination
	 */
	public static constructor_blinded_path(a: BlindedMessagePath): Destination {
		const ret: bigint = bindings.Destination_blinded_path(CommonBase.get_ptr_of(a));
		const ret_hu_conv: Destination = Destination.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Destination.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Destination_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Destinations contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Destination): boolean {
		const ret: boolean = bindings.Destination_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Attempts to resolve the [`IntroductionNode::DirectedShortChannelId`] of a
	 * [`Destination::BlindedPath`] to a [`IntroductionNode::NodeId`], if applicable, using the
	 * provided [`ReadOnlyNetworkGraph`].
	 */
	public resolve(network_graph: ReadOnlyNetworkGraph): void {
		bindings.Destination_resolve(this.ptr, CommonBase.get_ptr_of(network_graph));
		CommonBase.add_ref_from(this, network_graph);
	}

}
/** A Destination of type Node */
export class Destination_Node extends Destination {
	public node: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node: number = bindings.LDKDestination_Node_get_node(ptr);
		const node_conv: Uint8Array = bindings.decodeUint8Array(node);
		this.node = node_conv;
	}
}
/** A Destination of type BlindedPath */
export class Destination_BlindedPath extends Destination {
	public blinded_path: BlindedMessagePath;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const blinded_path: bigint = bindings.LDKDestination_BlindedPath_get_blinded_path(ptr);
		const blinded_path_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, blinded_path);
			CommonBase.add_ref_from(blinded_path_hu_conv, this);
		this.blinded_path = blinded_path_hu_conv;
	}
}
