
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The unblinded node in a blinded path.
 */
export class IntroductionNode extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.IntroductionNode_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): IntroductionNode {
		const raw_ty: number = bindings.LDKIntroductionNode_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new IntroductionNode_NodeId(ptr);
			case 1: return new IntroductionNode_DirectedShortChannelId(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.IntroductionNode_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the IntroductionNode
	 */
	public clone(): IntroductionNode {
		const ret: bigint = bindings.IntroductionNode_clone(this.ptr);
		const ret_hu_conv: IntroductionNode = IntroductionNode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeId-variant IntroductionNode
	 */
	public static constructor_node_id(a: Uint8Array): IntroductionNode {
		const ret: bigint = bindings.IntroductionNode_node_id(bindings.encodeUint8Array(a));
		const ret_hu_conv: IntroductionNode = IntroductionNode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DirectedShortChannelId-variant IntroductionNode
	 */
	public static constructor_directed_short_channel_id(a: Direction, b: bigint): IntroductionNode {
		const ret: bigint = bindings.IntroductionNode_directed_short_channel_id(a, b);
		const ret_hu_conv: IntroductionNode = IntroductionNode.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the IntroductionNode.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.IntroductionNode_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two IntroductionNodes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: IntroductionNode): boolean {
		const ret: boolean = bindings.IntroductionNode_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A IntroductionNode of type NodeId */
export class IntroductionNode_NodeId extends IntroductionNode {
	public node_id: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKIntroductionNode_NodeId_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
	}
}
/** A IntroductionNode of type DirectedShortChannelId */
export class IntroductionNode_DirectedShortChannelId extends IntroductionNode {
	public _0: Direction;
	public _1: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this._0 = bindings.LDKIntroductionNode_DirectedShortChannelId_get__0(ptr);
		this._1 = bindings.LDKIntroductionNode_DirectedShortChannelId_get__1(ptr);
	}
}
