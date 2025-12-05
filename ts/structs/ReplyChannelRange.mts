
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`reply_channel_range`] message is a reply to a [`QueryChannelRange`]
 * message.
 * 
 * Multiple `reply_channel_range` messages can be sent in reply
 * to a single [`QueryChannelRange`] message. The query recipient makes a
 * best effort to respond based on their local network view which may
 * not be a perfect view of the network. The `short_channel_id`s in the
 * reply are encoded. We only support `encoding_type=0` uncompressed
 * serialization and do not support `encoding_type=1` zlib serialization.
 * 
 * [`reply_channel_range`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-query_channel_range-and-reply_channel_range-messages
 */
export class ReplyChannelRange extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ReplyChannelRange_free);
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public get_chain_hash(): Uint8Array {
		const ret: number = bindings.ReplyChannelRange_get_chain_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public set_chain_hash(val: Uint8Array): void {
		bindings.ReplyChannelRange_set_chain_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The height of the first block in the range of the reply
	 */
	public get_first_blocknum(): number {
		const ret: number = bindings.ReplyChannelRange_get_first_blocknum(this.ptr);
		return ret;
	}

	/**
	 * The height of the first block in the range of the reply
	 */
	public set_first_blocknum(val: number): void {
		bindings.ReplyChannelRange_set_first_blocknum(this.ptr, val);
	}

	/**
	 * The number of blocks included in the range of the reply
	 */
	public get_number_of_blocks(): number {
		const ret: number = bindings.ReplyChannelRange_get_number_of_blocks(this.ptr);
		return ret;
	}

	/**
	 * The number of blocks included in the range of the reply
	 */
	public set_number_of_blocks(val: number): void {
		bindings.ReplyChannelRange_set_number_of_blocks(this.ptr, val);
	}

	/**
	 * True when this is the final reply for a query
	 */
	public get_sync_complete(): boolean {
		const ret: boolean = bindings.ReplyChannelRange_get_sync_complete(this.ptr);
		return ret;
	}

	/**
	 * True when this is the final reply for a query
	 */
	public set_sync_complete(val: boolean): void {
		bindings.ReplyChannelRange_set_sync_complete(this.ptr, val);
	}

	/**
	 * The `short_channel_id`s in the channel range
	 * 
	 * Returns a copy of the field.
	 */
	public get_short_channel_ids(): BigUint64Array {
		const ret: number = bindings.ReplyChannelRange_get_short_channel_ids(this.ptr);
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * The `short_channel_id`s in the channel range
	 */
	public set_short_channel_ids(val: BigUint64Array): void {
		bindings.ReplyChannelRange_set_short_channel_ids(this.ptr, bindings.encodeUint64Array(val));
	}

	/**
	 * Constructs a new ReplyChannelRange given each field
	 */
	public static constructor_new(chain_hash_arg: Uint8Array, first_blocknum_arg: number, number_of_blocks_arg: number, sync_complete_arg: boolean, short_channel_ids_arg: BigUint64Array): ReplyChannelRange {
		const ret: bigint = bindings.ReplyChannelRange_new(bindings.encodeUint8Array(chain_hash_arg), first_blocknum_arg, number_of_blocks_arg, sync_complete_arg, bindings.encodeUint64Array(short_channel_ids_arg));
		const ret_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ReplyChannelRange_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ReplyChannelRange
	 */
	public clone(): ReplyChannelRange {
		const ret: bigint = bindings.ReplyChannelRange_clone(this.ptr);
		const ret_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ReplyChannelRange.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ReplyChannelRange_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ReplyChannelRanges contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ReplyChannelRange): boolean {
		const ret: boolean = bindings.ReplyChannelRange_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Read a ReplyChannelRange from a byte array, created by ReplyChannelRange_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ReplyChannelRangeDecodeErrorZ {
		const ret: bigint = bindings.ReplyChannelRange_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ReplyChannelRangeDecodeErrorZ = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ReplyChannelRange object into a byte array which can be read by ReplyChannelRange_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ReplyChannelRange_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
