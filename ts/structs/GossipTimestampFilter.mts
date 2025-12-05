
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`gossip_timestamp_filter`] message is used by a node to request
 * gossip relay for messages in the requested time range when the
 * `gossip_queries` feature has been negotiated.
 * 
 * [`gossip_timestamp_filter`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-gossip_timestamp_filter-message
 */
export class GossipTimestampFilter extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.GossipTimestampFilter_free);
	}

	/**
	 * The genesis hash of the blockchain for channel and node information
	 */
	public get_chain_hash(): Uint8Array {
		const ret: number = bindings.GossipTimestampFilter_get_chain_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain for channel and node information
	 */
	public set_chain_hash(val: Uint8Array): void {
		bindings.GossipTimestampFilter_set_chain_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The starting unix timestamp
	 */
	public get_first_timestamp(): number {
		const ret: number = bindings.GossipTimestampFilter_get_first_timestamp(this.ptr);
		return ret;
	}

	/**
	 * The starting unix timestamp
	 */
	public set_first_timestamp(val: number): void {
		bindings.GossipTimestampFilter_set_first_timestamp(this.ptr, val);
	}

	/**
	 * The range of information in seconds
	 */
	public get_timestamp_range(): number {
		const ret: number = bindings.GossipTimestampFilter_get_timestamp_range(this.ptr);
		return ret;
	}

	/**
	 * The range of information in seconds
	 */
	public set_timestamp_range(val: number): void {
		bindings.GossipTimestampFilter_set_timestamp_range(this.ptr, val);
	}

	/**
	 * Constructs a new GossipTimestampFilter given each field
	 */
	public static constructor_new(chain_hash_arg: Uint8Array, first_timestamp_arg: number, timestamp_range_arg: number): GossipTimestampFilter {
		const ret: bigint = bindings.GossipTimestampFilter_new(bindings.encodeUint8Array(chain_hash_arg), first_timestamp_arg, timestamp_range_arg);
		const ret_hu_conv: GossipTimestampFilter = new GossipTimestampFilter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.GossipTimestampFilter_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the GossipTimestampFilter
	 */
	public clone(): GossipTimestampFilter {
		const ret: bigint = bindings.GossipTimestampFilter_clone(this.ptr);
		const ret_hu_conv: GossipTimestampFilter = new GossipTimestampFilter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the GossipTimestampFilter.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.GossipTimestampFilter_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two GossipTimestampFilters contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: GossipTimestampFilter): boolean {
		const ret: boolean = bindings.GossipTimestampFilter_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the GossipTimestampFilter object into a byte array which can be read by GossipTimestampFilter_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.GossipTimestampFilter_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a GossipTimestampFilter from a byte array, created by GossipTimestampFilter_write
	 */
	public static constructor_read(ser: Uint8Array): Result_GossipTimestampFilterDecodeErrorZ {
		const ret: bigint = bindings.GossipTimestampFilter_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_GossipTimestampFilterDecodeErrorZ = Result_GossipTimestampFilterDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
