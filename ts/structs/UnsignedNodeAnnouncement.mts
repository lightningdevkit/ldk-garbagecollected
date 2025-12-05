
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The unsigned part of a [`node_announcement`] message.
 * 
 * [`node_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-node_announcement-message
 */
export class UnsignedNodeAnnouncement extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UnsignedNodeAnnouncement_free);
	}

	/**
	 * The advertised features
	 */
	public get_features(): NodeFeatures {
		const ret: bigint = bindings.UnsignedNodeAnnouncement_get_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The advertised features
	 */
	public set_features(val: NodeFeatures): void {
		bindings.UnsignedNodeAnnouncement_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A strictly monotonic announcement counter, with gaps allowed
	 */
	public get_timestamp(): number {
		const ret: number = bindings.UnsignedNodeAnnouncement_get_timestamp(this.ptr);
		return ret;
	}

	/**
	 * A strictly monotonic announcement counter, with gaps allowed
	 */
	public set_timestamp(val: number): void {
		bindings.UnsignedNodeAnnouncement_set_timestamp(this.ptr, val);
	}

	/**
	 * The `node_id` this announcement originated from (don't rebroadcast the `node_announcement` back
	 * to this node).
	 */
	public get_node_id(): NodeId {
		const ret: bigint = bindings.UnsignedNodeAnnouncement_get_node_id(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The `node_id` this announcement originated from (don't rebroadcast the `node_announcement` back
	 * to this node).
	 */
	public set_node_id(val: NodeId): void {
		bindings.UnsignedNodeAnnouncement_set_node_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * An RGB color for UI purposes
	 */
	public get_rgb(): Uint8Array {
		const ret: number = bindings.UnsignedNodeAnnouncement_get_rgb(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * An RGB color for UI purposes
	 */
	public set_rgb(val: Uint8Array): void {
		bindings.UnsignedNodeAnnouncement_set_rgb(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * An alias, for UI purposes.
	 * 
	 * This should be sanitized before use. There is no guarantee of uniqueness.
	 */
	public get_alias(): NodeAlias {
		const ret: bigint = bindings.UnsignedNodeAnnouncement_get_alias(this.ptr);
		const ret_hu_conv: NodeAlias = new NodeAlias(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * An alias, for UI purposes.
	 * 
	 * This should be sanitized before use. There is no guarantee of uniqueness.
	 */
	public set_alias(val: NodeAlias): void {
		bindings.UnsignedNodeAnnouncement_set_alias(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * List of addresses on which this node is reachable
	 * 
	 * Returns a copy of the field.
	 */
	public get_addresses(): SocketAddress[] {
		const ret: number = bindings.UnsignedNodeAnnouncement_get_addresses(this.ptr);
		const ret_conv_15_len: number = bindings.getArrayLength(ret);
		const ret_conv_15_arr: SocketAddress[] = new Array(ret_conv_15_len).fill(null);
		for (var p = 0; p < ret_conv_15_len; p++) {
			const ret_conv_15: bigint = bindings.getU64ArrayElem(ret, p);
			const ret_conv_15_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret_conv_15);
			CommonBase.add_ref_from(ret_conv_15_hu_conv, this);
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_15_arr;
	}

	/**
	 * List of addresses on which this node is reachable
	 */
	public set_addresses(val: SocketAddress[]): void {
		bindings.UnsignedNodeAnnouncement_set_addresses(this.ptr, bindings.encodeUint64Array(val.map(val_conv_15 => CommonBase.get_ptr_of(val_conv_15))));
	}

	/**
	 * Excess address data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new address types are added to the lightning gossip protocol.
	 * 
	 * Returns a copy of the field.
	 */
	public get_excess_address_data(): Uint8Array {
		const ret: number = bindings.UnsignedNodeAnnouncement_get_excess_address_data(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Excess address data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new address types are added to the lightning gossip protocol.
	 */
	public set_excess_address_data(val: Uint8Array): void {
		bindings.UnsignedNodeAnnouncement_set_excess_address_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Excess data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new fields are added to the lightning gossip protocol.
	 * 
	 * Returns a copy of the field.
	 */
	public get_excess_data(): Uint8Array {
		const ret: number = bindings.UnsignedNodeAnnouncement_get_excess_data(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Excess data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new fields are added to the lightning gossip protocol.
	 */
	public set_excess_data(val: Uint8Array): void {
		bindings.UnsignedNodeAnnouncement_set_excess_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new UnsignedNodeAnnouncement given each field
	 */
	public static constructor_new(features_arg: NodeFeatures, timestamp_arg: number, node_id_arg: NodeId, rgb_arg: Uint8Array, alias_arg: NodeAlias, addresses_arg: SocketAddress[], excess_address_data_arg: Uint8Array, excess_data_arg: Uint8Array): UnsignedNodeAnnouncement {
		const ret: bigint = bindings.UnsignedNodeAnnouncement_new(CommonBase.get_ptr_of(features_arg), timestamp_arg, CommonBase.get_ptr_of(node_id_arg), bindings.encodeUint8Array(rgb_arg), CommonBase.get_ptr_of(alias_arg), bindings.encodeUint64Array(addresses_arg.map(addresses_arg_conv_15 => CommonBase.get_ptr_of(addresses_arg_conv_15))), bindings.encodeUint8Array(excess_address_data_arg), bindings.encodeUint8Array(excess_data_arg));
		const ret_hu_conv: UnsignedNodeAnnouncement = new UnsignedNodeAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UnsignedNodeAnnouncement_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedNodeAnnouncement
	 */
	public clone(): UnsignedNodeAnnouncement {
		const ret: bigint = bindings.UnsignedNodeAnnouncement_clone(this.ptr);
		const ret_hu_conv: UnsignedNodeAnnouncement = new UnsignedNodeAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UnsignedNodeAnnouncement.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UnsignedNodeAnnouncement_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two UnsignedNodeAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UnsignedNodeAnnouncement): boolean {
		const ret: boolean = bindings.UnsignedNodeAnnouncement_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the UnsignedNodeAnnouncement object into a byte array which can be read by UnsignedNodeAnnouncement_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UnsignedNodeAnnouncement_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UnsignedNodeAnnouncement from a byte array, created by UnsignedNodeAnnouncement_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UnsignedNodeAnnouncementDecodeErrorZ {
		const ret: bigint = bindings.UnsignedNodeAnnouncement_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UnsignedNodeAnnouncementDecodeErrorZ = Result_UnsignedNodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
