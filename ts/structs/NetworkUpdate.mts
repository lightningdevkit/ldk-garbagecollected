
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Update to the [`NetworkGraph`] based on payment failure information conveyed via the Onion
 * return packet by a node along the route. See [BOLT #4] for details.
 * 
 * [BOLT #4]: https://github.com/lightning/bolts/blob/master/04-onion-routing.md
 */
export class NetworkUpdate extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.NetworkUpdate_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): NetworkUpdate {
		const raw_ty: number = bindings.LDKNetworkUpdate_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new NetworkUpdate_ChannelFailure(ptr);
			case 1: return new NetworkUpdate_NodeFailure(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NetworkUpdate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NetworkUpdate
	 */
	public clone(): NetworkUpdate {
		const ret: bigint = bindings.NetworkUpdate_clone(this.ptr);
		const ret_hu_conv: NetworkUpdate = NetworkUpdate.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelFailure-variant NetworkUpdate
	 */
	public static constructor_channel_failure(short_channel_id: bigint, is_permanent: boolean): NetworkUpdate {
		const ret: bigint = bindings.NetworkUpdate_channel_failure(short_channel_id, is_permanent);
		const ret_hu_conv: NetworkUpdate = NetworkUpdate.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeFailure-variant NetworkUpdate
	 */
	public static constructor_node_failure(node_id: Uint8Array, is_permanent: boolean): NetworkUpdate {
		const ret: bigint = bindings.NetworkUpdate_node_failure(bindings.encodeUint8Array(node_id), is_permanent);
		const ret_hu_conv: NetworkUpdate = NetworkUpdate.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two NetworkUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: NetworkUpdate): boolean {
		const ret: boolean = bindings.NetworkUpdate_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the NetworkUpdate object into a byte array which can be read by NetworkUpdate_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.NetworkUpdate_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A NetworkUpdate of type ChannelFailure */
export class NetworkUpdate_ChannelFailure extends NetworkUpdate {
	/**
	 * The short channel id of the closed channel.
	 */
	public short_channel_id: bigint;
	/**
	 * Whether the channel should be permanently removed or temporarily disabled until a new
	 * `channel_update` message is received.
	 */
	public is_permanent: boolean;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.short_channel_id = bindings.LDKNetworkUpdate_ChannelFailure_get_short_channel_id(ptr);
		this.is_permanent = bindings.LDKNetworkUpdate_ChannelFailure_get_is_permanent(ptr);
	}
}
/** A NetworkUpdate of type NodeFailure */
export class NetworkUpdate_NodeFailure extends NetworkUpdate {
	/**
	 * The node id of the failed node.
	 */
	public node_id: Uint8Array;
	/**
	 * Whether the node should be permanently removed from consideration or can be restored
	 * when a new `channel_update` message is received.
	 */
	public is_permanent: boolean;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_id: number = bindings.LDKNetworkUpdate_NodeFailure_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		this.is_permanent = bindings.LDKNetworkUpdate_NodeFailure_get_is_permanent(ptr);
	}
}
