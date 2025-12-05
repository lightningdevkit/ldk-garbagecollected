
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`query_short_channel_ids`] message is used to query a peer for
 * routing gossip messages related to one or more `short_channel_id`s.
 * 
 * The query recipient will reply with the latest, if available,
 * [`ChannelAnnouncement`], [`ChannelUpdate`] and [`NodeAnnouncement`] messages
 * it maintains for the requested `short_channel_id`s followed by a
 * [`ReplyShortChannelIdsEnd`] message. The `short_channel_id`s sent in
 * this query are encoded. We only support `encoding_type=0` uncompressed
 * serialization and do not support `encoding_type=1` zlib serialization.
 * 
 * [`query_short_channel_ids`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-query_short_channel_idsreply_short_channel_ids_end-messages
 */
export class QueryShortChannelIds extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.QueryShortChannelIds_free);
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public get_chain_hash(): Uint8Array {
		const ret: number = bindings.QueryShortChannelIds_get_chain_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public set_chain_hash(val: Uint8Array): void {
		bindings.QueryShortChannelIds_set_chain_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The short_channel_ids that are being queried
	 * 
	 * Returns a copy of the field.
	 */
	public get_short_channel_ids(): BigUint64Array {
		const ret: number = bindings.QueryShortChannelIds_get_short_channel_ids(this.ptr);
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * The short_channel_ids that are being queried
	 */
	public set_short_channel_ids(val: BigUint64Array): void {
		bindings.QueryShortChannelIds_set_short_channel_ids(this.ptr, bindings.encodeUint64Array(val));
	}

	/**
	 * Constructs a new QueryShortChannelIds given each field
	 */
	public static constructor_new(chain_hash_arg: Uint8Array, short_channel_ids_arg: BigUint64Array): QueryShortChannelIds {
		const ret: bigint = bindings.QueryShortChannelIds_new(bindings.encodeUint8Array(chain_hash_arg), bindings.encodeUint64Array(short_channel_ids_arg));
		const ret_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.QueryShortChannelIds_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the QueryShortChannelIds
	 */
	public clone(): QueryShortChannelIds {
		const ret: bigint = bindings.QueryShortChannelIds_clone(this.ptr);
		const ret_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the QueryShortChannelIds.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.QueryShortChannelIds_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two QueryShortChannelIdss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: QueryShortChannelIds): boolean {
		const ret: boolean = bindings.QueryShortChannelIds_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Read a QueryShortChannelIds from a byte array, created by QueryShortChannelIds_write
	 */
	public static constructor_read(ser: Uint8Array): Result_QueryShortChannelIdsDecodeErrorZ {
		const ret: bigint = bindings.QueryShortChannelIds_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_QueryShortChannelIdsDecodeErrorZ = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the QueryShortChannelIds object into a byte array which can be read by QueryShortChannelIds_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.QueryShortChannelIds_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
