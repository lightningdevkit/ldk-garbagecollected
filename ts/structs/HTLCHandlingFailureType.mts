
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The type of HTLC handling performed in [`Event::HTLCHandlingFailed`].
 */
export class HTLCHandlingFailureType extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.HTLCHandlingFailureType_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): HTLCHandlingFailureType {
		const raw_ty: number = bindings.LDKHTLCHandlingFailureType_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new HTLCHandlingFailureType_Forward(ptr);
			case 1: return new HTLCHandlingFailureType_UnknownNextHop(ptr);
			case 2: return new HTLCHandlingFailureType_InvalidForward(ptr);
			case 3: return new HTLCHandlingFailureType_InvalidOnion(ptr);
			case 4: return new HTLCHandlingFailureType_Receive(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HTLCHandlingFailureType_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCHandlingFailureType
	 */
	public clone(): HTLCHandlingFailureType {
		const ret: bigint = bindings.HTLCHandlingFailureType_clone(this.ptr);
		const ret_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant HTLCHandlingFailureType
	 */
	public static constructor_forward(node_id: Uint8Array, channel_id: ChannelId): HTLCHandlingFailureType {
		const ret: bigint = bindings.HTLCHandlingFailureType_forward(bindings.encodeUint8Array(node_id), CommonBase.get_ptr_of(channel_id));
		const ret_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownNextHop-variant HTLCHandlingFailureType
	 */
	public static constructor_unknown_next_hop(requested_forward_scid: bigint): HTLCHandlingFailureType {
		const ret: bigint = bindings.HTLCHandlingFailureType_unknown_next_hop(requested_forward_scid);
		const ret_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidForward-variant HTLCHandlingFailureType
	 */
	public static constructor_invalid_forward(requested_forward_scid: bigint): HTLCHandlingFailureType {
		const ret: bigint = bindings.HTLCHandlingFailureType_invalid_forward(requested_forward_scid);
		const ret_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnion-variant HTLCHandlingFailureType
	 */
	public static constructor_invalid_onion(): HTLCHandlingFailureType {
		const ret: bigint = bindings.HTLCHandlingFailureType_invalid_onion();
		const ret_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Receive-variant HTLCHandlingFailureType
	 */
	public static constructor_receive(payment_hash: Uint8Array): HTLCHandlingFailureType {
		const ret: bigint = bindings.HTLCHandlingFailureType_receive(bindings.encodeUint8Array(payment_hash));
		const ret_hu_conv: HTLCHandlingFailureType = HTLCHandlingFailureType.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCHandlingFailureTypes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: HTLCHandlingFailureType): boolean {
		const ret: boolean = bindings.HTLCHandlingFailureType_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the HTLCHandlingFailureType object into a byte array which can be read by HTLCHandlingFailureType_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HTLCHandlingFailureType_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A HTLCHandlingFailureType of type Forward */
export class HTLCHandlingFailureType_Forward extends HTLCHandlingFailureType {
	/**
	 * The `node_id` of the next node. For backwards compatibility, this field is
	 * marked as optional, versions prior to 0.0.110 may not always be able to provide
	 * counterparty node information.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public node_id: Uint8Array;
	/**
	 * The outgoing `channel_id` between us and the next node.
	 */
	public channel_id: ChannelId;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKHTLCHandlingFailureType_Forward_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const channel_id: bigint = bindings.LDKHTLCHandlingFailureType_Forward_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
	}
}
/** A HTLCHandlingFailureType of type UnknownNextHop */
export class HTLCHandlingFailureType_UnknownNextHop extends HTLCHandlingFailureType {
	/**
	 * Short channel id we are requesting to forward an HTLC to.
	 */
	public requested_forward_scid: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.requested_forward_scid = bindings.LDKHTLCHandlingFailureType_UnknownNextHop_get_requested_forward_scid(ptr);
	}
}
/** A HTLCHandlingFailureType of type InvalidForward */
export class HTLCHandlingFailureType_InvalidForward extends HTLCHandlingFailureType {
	/**
	 * Short channel id we are requesting to forward an HTLC to.
	 */
	public requested_forward_scid: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.requested_forward_scid = bindings.LDKHTLCHandlingFailureType_InvalidForward_get_requested_forward_scid(ptr);
	}
}
/** A HTLCHandlingFailureType of type InvalidOnion */
export class HTLCHandlingFailureType_InvalidOnion extends HTLCHandlingFailureType {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A HTLCHandlingFailureType of type Receive */
export class HTLCHandlingFailureType_Receive extends HTLCHandlingFailureType {
	/**
	 * The payment hash of the payment we attempted to process.
	 */
	public payment_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_hash: number = bindings.LDKHTLCHandlingFailureType_Receive_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
	}
}
