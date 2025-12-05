
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`channel_ready`] message to be sent to or received from a peer.
 * 
 * [`channel_ready`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-channel_ready-message
 */
export class ChannelReady extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelReady_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.ChannelReady_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.ChannelReady_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The per-commitment point of the second commitment transaction
	 */
	public get_next_per_commitment_point(): Uint8Array {
		const ret: number = bindings.ChannelReady_get_next_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The per-commitment point of the second commitment transaction
	 */
	public set_next_per_commitment_point(val: Uint8Array): void {
		bindings.ChannelReady_set_next_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * If set, provides a `short_channel_id` alias for this channel.
	 * 
	 * The sender will accept payments to be forwarded over this SCID and forward them to this
	 * messages' recipient.
	 */
	public get_short_channel_id_alias(): Option_u64Z {
		const ret: bigint = bindings.ChannelReady_get_short_channel_id_alias(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * If set, provides a `short_channel_id` alias for this channel.
	 * 
	 * The sender will accept payments to be forwarded over this SCID and forward them to this
	 * messages' recipient.
	 */
	public set_short_channel_id_alias(val: Option_u64Z): void {
		bindings.ChannelReady_set_short_channel_id_alias(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelReady given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, next_per_commitment_point_arg: Uint8Array, short_channel_id_alias_arg: Option_u64Z): ChannelReady {
		const ret: bigint = bindings.ChannelReady_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(next_per_commitment_point_arg), CommonBase.get_ptr_of(short_channel_id_alias_arg));
		const ret_hu_conv: ChannelReady = new ChannelReady(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelReady_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelReady
	 */
	public clone(): ChannelReady {
		const ret: bigint = bindings.ChannelReady_clone(this.ptr);
		const ret_hu_conv: ChannelReady = new ChannelReady(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelReady.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ChannelReady_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ChannelReadys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelReady): boolean {
		const ret: boolean = bindings.ChannelReady_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ChannelReady object into a byte array which can be read by ChannelReady_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelReady_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelReady from a byte array, created by ChannelReady_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelReadyDecodeErrorZ {
		const ret: bigint = bindings.ChannelReady_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelReadyDecodeErrorZ = Result_ChannelReadyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
