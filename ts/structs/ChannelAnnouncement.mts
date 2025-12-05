
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`channel_announcement`] message to be sent to or received from a peer.
 * 
 * [`channel_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_announcement-message
 */
export class ChannelAnnouncement extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelAnnouncement_free);
	}

	/**
	 * Authentication of the announcement by the first public node
	 */
	public get_node_signature_1(): Uint8Array {
		const ret: number = bindings.ChannelAnnouncement_get_node_signature_1(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Authentication of the announcement by the first public node
	 */
	public set_node_signature_1(val: Uint8Array): void {
		bindings.ChannelAnnouncement_set_node_signature_1(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Authentication of the announcement by the second public node
	 */
	public get_node_signature_2(): Uint8Array {
		const ret: number = bindings.ChannelAnnouncement_get_node_signature_2(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Authentication of the announcement by the second public node
	 */
	public set_node_signature_2(val: Uint8Array): void {
		bindings.ChannelAnnouncement_set_node_signature_2(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Proof of funding UTXO ownership by the first public node
	 */
	public get_bitcoin_signature_1(): Uint8Array {
		const ret: number = bindings.ChannelAnnouncement_get_bitcoin_signature_1(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Proof of funding UTXO ownership by the first public node
	 */
	public set_bitcoin_signature_1(val: Uint8Array): void {
		bindings.ChannelAnnouncement_set_bitcoin_signature_1(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Proof of funding UTXO ownership by the second public node
	 */
	public get_bitcoin_signature_2(): Uint8Array {
		const ret: number = bindings.ChannelAnnouncement_get_bitcoin_signature_2(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Proof of funding UTXO ownership by the second public node
	 */
	public set_bitcoin_signature_2(val: Uint8Array): void {
		bindings.ChannelAnnouncement_set_bitcoin_signature_2(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The actual announcement
	 */
	public get_contents(): UnsignedChannelAnnouncement {
		const ret: bigint = bindings.ChannelAnnouncement_get_contents(this.ptr);
		const ret_hu_conv: UnsignedChannelAnnouncement = new UnsignedChannelAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The actual announcement
	 */
	public set_contents(val: UnsignedChannelAnnouncement): void {
		bindings.ChannelAnnouncement_set_contents(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelAnnouncement given each field
	 */
	public static constructor_new(node_signature_1_arg: Uint8Array, node_signature_2_arg: Uint8Array, bitcoin_signature_1_arg: Uint8Array, bitcoin_signature_2_arg: Uint8Array, contents_arg: UnsignedChannelAnnouncement): ChannelAnnouncement {
		const ret: bigint = bindings.ChannelAnnouncement_new(bindings.encodeUint8Array(node_signature_1_arg), bindings.encodeUint8Array(node_signature_2_arg), bindings.encodeUint8Array(bitcoin_signature_1_arg), bindings.encodeUint8Array(bitcoin_signature_2_arg), CommonBase.get_ptr_of(contents_arg));
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelAnnouncement_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelAnnouncement
	 */
	public clone(): ChannelAnnouncement {
		const ret: bigint = bindings.ChannelAnnouncement_clone(this.ptr);
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelAnnouncement.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ChannelAnnouncement_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ChannelAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelAnnouncement): boolean {
		const ret: boolean = bindings.ChannelAnnouncement_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ChannelAnnouncement object into a byte array which can be read by ChannelAnnouncement_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelAnnouncement_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelAnnouncement from a byte array, created by ChannelAnnouncement_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelAnnouncementDecodeErrorZ {
		const ret: bigint = bindings.ChannelAnnouncement_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelAnnouncementDecodeErrorZ = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
