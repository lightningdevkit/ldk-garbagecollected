
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Details about one direction of a channel as received within a [`ChannelUpdate`].
 */
export class ChannelUpdateInfo extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelUpdateInfo_free);
	}

	/**
	 * The minimum value, which must be relayed to the next hop via the channel
	 */
	public get_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.ChannelUpdateInfo_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum value, which must be relayed to the next hop via the channel
	 */
	public set_htlc_minimum_msat(val: bigint): void {
		bindings.ChannelUpdateInfo_set_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * The maximum value which may be relayed to the next hop via the channel.
	 */
	public get_htlc_maximum_msat(): bigint {
		const ret: bigint = bindings.ChannelUpdateInfo_get_htlc_maximum_msat(this.ptr);
		return ret;
	}

	/**
	 * The maximum value which may be relayed to the next hop via the channel.
	 */
	public set_htlc_maximum_msat(val: bigint): void {
		bindings.ChannelUpdateInfo_set_htlc_maximum_msat(this.ptr, val);
	}

	/**
	 * Fees charged when the channel is used for routing
	 */
	public get_fees(): RoutingFees {
		const ret: bigint = bindings.ChannelUpdateInfo_get_fees(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fees charged when the channel is used for routing
	 */
	public set_fees(val: RoutingFees): void {
		bindings.ChannelUpdateInfo_set_fees(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * When the last update to the channel direction was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public get_last_update(): number {
		const ret: number = bindings.ChannelUpdateInfo_get_last_update(this.ptr);
		return ret;
	}

	/**
	 * When the last update to the channel direction was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public set_last_update(val: number): void {
		bindings.ChannelUpdateInfo_set_last_update(this.ptr, val);
	}

	/**
	 * The difference in CLTV values that you must have when routing through this channel.
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.ChannelUpdateInfo_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The difference in CLTV values that you must have when routing through this channel.
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.ChannelUpdateInfo_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * Whether the channel can be currently used for payments (in this one direction).
	 */
	public get_enabled(): boolean {
		const ret: boolean = bindings.ChannelUpdateInfo_get_enabled(this.ptr);
		return ret;
	}

	/**
	 * Whether the channel can be currently used for payments (in this one direction).
	 */
	public set_enabled(val: boolean): void {
		bindings.ChannelUpdateInfo_set_enabled(this.ptr, val);
	}

	/**
	 * Most recent update for the channel received from the network
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_last_update_message(): ChannelUpdate {
		const ret: bigint = bindings.ChannelUpdateInfo_get_last_update_message(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Most recent update for the channel received from the network
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_last_update_message(val: ChannelUpdate|null): void {
		bindings.ChannelUpdateInfo_set_last_update_message(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelUpdateInfo given each field
	 * 
	 * Note that last_update_message_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(htlc_minimum_msat_arg: bigint, htlc_maximum_msat_arg: bigint, fees_arg: RoutingFees, last_update_arg: number, cltv_expiry_delta_arg: number, enabled_arg: boolean, last_update_message_arg: ChannelUpdate|null): ChannelUpdateInfo {
		const ret: bigint = bindings.ChannelUpdateInfo_new(htlc_minimum_msat_arg, htlc_maximum_msat_arg, CommonBase.get_ptr_of(fees_arg), last_update_arg, cltv_expiry_delta_arg, enabled_arg, last_update_message_arg == null ? 0n : CommonBase.get_ptr_of(last_update_message_arg));
		const ret_hu_conv: ChannelUpdateInfo = new ChannelUpdateInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelUpdateInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelUpdateInfo
	 */
	public clone(): ChannelUpdateInfo {
		const ret: bigint = bindings.ChannelUpdateInfo_clone(this.ptr);
		const ret_hu_conv: ChannelUpdateInfo = new ChannelUpdateInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelUpdateInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelUpdateInfo): boolean {
		const ret: boolean = bindings.ChannelUpdateInfo_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Get the string representation of a ChannelUpdateInfo object
	 */
	public to_str(): string {
		const ret: number = bindings.ChannelUpdateInfo_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the ChannelUpdateInfo object into a byte array which can be read by ChannelUpdateInfo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelUpdateInfo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelUpdateInfo from a byte array, created by ChannelUpdateInfo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelUpdateInfoDecodeErrorZ {
		const ret: bigint = bindings.ChannelUpdateInfo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelUpdateInfoDecodeErrorZ = Result_ChannelUpdateInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
