
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The unsigned part of a [`channel_announcement`] message.
 * 
 * [`channel_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_announcement-message
 */
export class UnsignedChannelAnnouncement extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UnsignedChannelAnnouncement_free);
	}

	/**
	 * The advertised channel features
	 */
	public get_features(): ChannelFeatures {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_get_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The advertised channel features
	 */
	public set_features(val: ChannelFeatures): void {
		bindings.UnsignedChannelAnnouncement_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public get_chain_hash(): Uint8Array {
		const ret: number = bindings.UnsignedChannelAnnouncement_get_chain_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public set_chain_hash(val: Uint8Array): void {
		bindings.UnsignedChannelAnnouncement_set_chain_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The short channel ID
	 */
	public get_short_channel_id(): bigint {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short channel ID
	 */
	public set_short_channel_id(val: bigint): void {
		bindings.UnsignedChannelAnnouncement_set_short_channel_id(this.ptr, val);
	}

	/**
	 * One of the two `node_id`s which are endpoints of this channel
	 */
	public get_node_id_1(): NodeId {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_get_node_id_1(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * One of the two `node_id`s which are endpoints of this channel
	 */
	public set_node_id_1(val: NodeId): void {
		bindings.UnsignedChannelAnnouncement_set_node_id_1(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The other of the two `node_id`s which are endpoints of this channel
	 */
	public get_node_id_2(): NodeId {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_get_node_id_2(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The other of the two `node_id`s which are endpoints of this channel
	 */
	public set_node_id_2(val: NodeId): void {
		bindings.UnsignedChannelAnnouncement_set_node_id_2(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The funding key for the first node
	 */
	public get_bitcoin_key_1(): NodeId {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_1(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The funding key for the first node
	 */
	public set_bitcoin_key_1(val: NodeId): void {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_1(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The funding key for the second node
	 */
	public get_bitcoin_key_2(): NodeId {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_2(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The funding key for the second node
	 */
	public set_bitcoin_key_2(val: NodeId): void {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_2(this.ptr, CommonBase.get_ptr_of(val));
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
		const ret: number = bindings.UnsignedChannelAnnouncement_get_excess_data(this.ptr);
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
		bindings.UnsignedChannelAnnouncement_set_excess_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new UnsignedChannelAnnouncement given each field
	 */
	public static constructor_new(features_arg: ChannelFeatures, chain_hash_arg: Uint8Array, short_channel_id_arg: bigint, node_id_1_arg: NodeId, node_id_2_arg: NodeId, bitcoin_key_1_arg: NodeId, bitcoin_key_2_arg: NodeId, excess_data_arg: Uint8Array): UnsignedChannelAnnouncement {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_new(CommonBase.get_ptr_of(features_arg), bindings.encodeUint8Array(chain_hash_arg), short_channel_id_arg, CommonBase.get_ptr_of(node_id_1_arg), CommonBase.get_ptr_of(node_id_2_arg), CommonBase.get_ptr_of(bitcoin_key_1_arg), CommonBase.get_ptr_of(bitcoin_key_2_arg), bindings.encodeUint8Array(excess_data_arg));
		const ret_hu_conv: UnsignedChannelAnnouncement = new UnsignedChannelAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedChannelAnnouncement
	 */
	public clone(): UnsignedChannelAnnouncement {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_clone(this.ptr);
		const ret_hu_conv: UnsignedChannelAnnouncement = new UnsignedChannelAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UnsignedChannelAnnouncement.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two UnsignedChannelAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UnsignedChannelAnnouncement): boolean {
		const ret: boolean = bindings.UnsignedChannelAnnouncement_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the UnsignedChannelAnnouncement object into a byte array which can be read by UnsignedChannelAnnouncement_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UnsignedChannelAnnouncement_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UnsignedChannelAnnouncement from a byte array, created by UnsignedChannelAnnouncement_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UnsignedChannelAnnouncementDecodeErrorZ {
		const ret: bigint = bindings.UnsignedChannelAnnouncement_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UnsignedChannelAnnouncementDecodeErrorZ = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
