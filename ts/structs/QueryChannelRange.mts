
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`query_channel_range`] message is used to query a peer for channel
 * UTXOs in a range of blocks. The recipient of a query makes a best
 * effort to reply to the query using one or more [`ReplyChannelRange`]
 * messages.
 * 
 * [`query_channel_range`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-query_channel_range-and-reply_channel_range-messages
 */
export class QueryChannelRange extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.QueryChannelRange_free);
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public get_chain_hash(): Uint8Array {
		const ret: number = bindings.QueryChannelRange_get_chain_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public set_chain_hash(val: Uint8Array): void {
		bindings.QueryChannelRange_set_chain_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The height of the first block for the channel UTXOs being queried
	 */
	public get_first_blocknum(): number {
		const ret: number = bindings.QueryChannelRange_get_first_blocknum(this.ptr);
		return ret;
	}

	/**
	 * The height of the first block for the channel UTXOs being queried
	 */
	public set_first_blocknum(val: number): void {
		bindings.QueryChannelRange_set_first_blocknum(this.ptr, val);
	}

	/**
	 * The number of blocks to include in the query results
	 */
	public get_number_of_blocks(): number {
		const ret: number = bindings.QueryChannelRange_get_number_of_blocks(this.ptr);
		return ret;
	}

	/**
	 * The number of blocks to include in the query results
	 */
	public set_number_of_blocks(val: number): void {
		bindings.QueryChannelRange_set_number_of_blocks(this.ptr, val);
	}

	/**
	 * Constructs a new QueryChannelRange given each field
	 */
	public static constructor_new(chain_hash_arg: Uint8Array, first_blocknum_arg: number, number_of_blocks_arg: number): QueryChannelRange {
		const ret: bigint = bindings.QueryChannelRange_new(bindings.encodeUint8Array(chain_hash_arg), first_blocknum_arg, number_of_blocks_arg);
		const ret_hu_conv: QueryChannelRange = new QueryChannelRange(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.QueryChannelRange_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the QueryChannelRange
	 */
	public clone(): QueryChannelRange {
		const ret: bigint = bindings.QueryChannelRange_clone(this.ptr);
		const ret_hu_conv: QueryChannelRange = new QueryChannelRange(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the QueryChannelRange.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.QueryChannelRange_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two QueryChannelRanges contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: QueryChannelRange): boolean {
		const ret: boolean = bindings.QueryChannelRange_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Calculates the overflow safe ending block height for the query.
	 * 
	 * Overflow returns `0xffffffff`, otherwise returns `first_blocknum + number_of_blocks`.
	 */
	public end_blocknum(): number {
		const ret: number = bindings.QueryChannelRange_end_blocknum(this.ptr);
		return ret;
	}

	/**
	 * Serialize the QueryChannelRange object into a byte array which can be read by QueryChannelRange_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.QueryChannelRange_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a QueryChannelRange from a byte array, created by QueryChannelRange_write
	 */
	public static constructor_read(ser: Uint8Array): Result_QueryChannelRangeDecodeErrorZ {
		const ret: bigint = bindings.QueryChannelRange_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_QueryChannelRangeDecodeErrorZ = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
