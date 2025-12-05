
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The next hop to forward an onion message along its path.
 * 
 * Note that payment blinded paths always specify their next hop using an explicit node id.
 */
export class NextMessageHop extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.NextMessageHop_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): NextMessageHop {
		const raw_ty: number = bindings.LDKNextMessageHop_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new NextMessageHop_NodeId(ptr);
			case 1: return new NextMessageHop_ShortChannelId(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NextMessageHop_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NextMessageHop
	 */
	public clone(): NextMessageHop {
		const ret: bigint = bindings.NextMessageHop_clone(this.ptr);
		const ret_hu_conv: NextMessageHop = NextMessageHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeId-variant NextMessageHop
	 */
	public static constructor_node_id(a: Uint8Array): NextMessageHop {
		const ret: bigint = bindings.NextMessageHop_node_id(bindings.encodeUint8Array(a));
		const ret_hu_conv: NextMessageHop = NextMessageHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ShortChannelId-variant NextMessageHop
	 */
	public static constructor_short_channel_id(a: bigint): NextMessageHop {
		const ret: bigint = bindings.NextMessageHop_short_channel_id(a);
		const ret_hu_conv: NextMessageHop = NextMessageHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NextMessageHop.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.NextMessageHop_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two NextMessageHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: NextMessageHop): boolean {
		const ret: boolean = bindings.NextMessageHop_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A NextMessageHop of type NodeId */
export class NextMessageHop_NodeId extends NextMessageHop {
	public node_id: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKNextMessageHop_NodeId_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
	}
}
/** A NextMessageHop of type ShortChannelId */
export class NextMessageHop_ShortChannelId extends NextMessageHop {
	public short_channel_id: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.short_channel_id = bindings.LDKNextMessageHop_ShortChannelId_get_short_channel_id(ptr);
	}
}
