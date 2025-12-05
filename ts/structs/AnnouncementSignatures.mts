
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`announcement_signatures`] message to be sent to or received from a peer.
 * 
 * [`announcement_signatures`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-announcement_signatures-message
 */
export class AnnouncementSignatures extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AnnouncementSignatures_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.AnnouncementSignatures_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.AnnouncementSignatures_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The short channel ID
	 */
	public get_short_channel_id(): bigint {
		const ret: bigint = bindings.AnnouncementSignatures_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short channel ID
	 */
	public set_short_channel_id(val: bigint): void {
		bindings.AnnouncementSignatures_set_short_channel_id(this.ptr, val);
	}

	/**
	 * A signature by the node key
	 */
	public get_node_signature(): Uint8Array {
		const ret: number = bindings.AnnouncementSignatures_get_node_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A signature by the node key
	 */
	public set_node_signature(val: Uint8Array): void {
		bindings.AnnouncementSignatures_set_node_signature(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * A signature by the funding key
	 */
	public get_bitcoin_signature(): Uint8Array {
		const ret: number = bindings.AnnouncementSignatures_get_bitcoin_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A signature by the funding key
	 */
	public set_bitcoin_signature(val: Uint8Array): void {
		bindings.AnnouncementSignatures_set_bitcoin_signature(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new AnnouncementSignatures given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, short_channel_id_arg: bigint, node_signature_arg: Uint8Array, bitcoin_signature_arg: Uint8Array): AnnouncementSignatures {
		const ret: bigint = bindings.AnnouncementSignatures_new(CommonBase.get_ptr_of(channel_id_arg), short_channel_id_arg, bindings.encodeUint8Array(node_signature_arg), bindings.encodeUint8Array(bitcoin_signature_arg));
		const ret_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AnnouncementSignatures_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AnnouncementSignatures
	 */
	public clone(): AnnouncementSignatures {
		const ret: bigint = bindings.AnnouncementSignatures_clone(this.ptr);
		const ret_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the AnnouncementSignatures.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.AnnouncementSignatures_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two AnnouncementSignaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: AnnouncementSignatures): boolean {
		const ret: boolean = bindings.AnnouncementSignatures_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the AnnouncementSignatures object into a byte array which can be read by AnnouncementSignatures_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.AnnouncementSignatures_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AnnouncementSignatures from a byte array, created by AnnouncementSignatures_write
	 */
	public static constructor_read(ser: Uint8Array): Result_AnnouncementSignaturesDecodeErrorZ {
		const ret: bigint = bindings.AnnouncementSignatures_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_AnnouncementSignaturesDecodeErrorZ = Result_AnnouncementSignaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
