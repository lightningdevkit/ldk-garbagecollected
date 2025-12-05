
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`reply_short_channel_ids_end`] message is sent as a reply to a
 * message. The query recipient makes a best
 * effort to respond based on their local network view which may not be
 * a perfect view of the network.
 * 
 * [`reply_short_channel_ids_end`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-query_short_channel_idsreply_short_channel_ids_end-messages
 */
export class ReplyShortChannelIdsEnd extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ReplyShortChannelIdsEnd_free);
	}

	/**
	 * The genesis hash of the blockchain that was queried
	 */
	public get_chain_hash(): Uint8Array {
		const ret: number = bindings.ReplyShortChannelIdsEnd_get_chain_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain that was queried
	 */
	public set_chain_hash(val: Uint8Array): void {
		bindings.ReplyShortChannelIdsEnd_set_chain_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Indicates if the query recipient maintains up-to-date channel
	 * information for the `chain_hash`
	 */
	public get_full_information(): boolean {
		const ret: boolean = bindings.ReplyShortChannelIdsEnd_get_full_information(this.ptr);
		return ret;
	}

	/**
	 * Indicates if the query recipient maintains up-to-date channel
	 * information for the `chain_hash`
	 */
	public set_full_information(val: boolean): void {
		bindings.ReplyShortChannelIdsEnd_set_full_information(this.ptr, val);
	}

	/**
	 * Constructs a new ReplyShortChannelIdsEnd given each field
	 */
	public static constructor_new(chain_hash_arg: Uint8Array, full_information_arg: boolean): ReplyShortChannelIdsEnd {
		const ret: bigint = bindings.ReplyShortChannelIdsEnd_new(bindings.encodeUint8Array(chain_hash_arg), full_information_arg);
		const ret_hu_conv: ReplyShortChannelIdsEnd = new ReplyShortChannelIdsEnd(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ReplyShortChannelIdsEnd_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ReplyShortChannelIdsEnd
	 */
	public clone(): ReplyShortChannelIdsEnd {
		const ret: bigint = bindings.ReplyShortChannelIdsEnd_clone(this.ptr);
		const ret_hu_conv: ReplyShortChannelIdsEnd = new ReplyShortChannelIdsEnd(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ReplyShortChannelIdsEnd.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ReplyShortChannelIdsEnd_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ReplyShortChannelIdsEnds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ReplyShortChannelIdsEnd): boolean {
		const ret: boolean = bindings.ReplyShortChannelIdsEnd_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ReplyShortChannelIdsEnd object into a byte array which can be read by ReplyShortChannelIdsEnd_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ReplyShortChannelIdsEnd_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ReplyShortChannelIdsEnd from a byte array, created by ReplyShortChannelIdsEnd_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ReplyShortChannelIdsEndDecodeErrorZ {
		const ret: bigint = bindings.ReplyShortChannelIdsEnd_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ReplyShortChannelIdsEndDecodeErrorZ = Result_ReplyShortChannelIdsEndDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
