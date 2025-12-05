
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The unsigned part of a [`channel_update`] message.
 * 
 * [`channel_update`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_update-message
 */
export class UnsignedChannelUpdate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UnsignedChannelUpdate_free);
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public get_chain_hash(): Uint8Array {
		const ret: number = bindings.UnsignedChannelUpdate_get_chain_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public set_chain_hash(val: Uint8Array): void {
		bindings.UnsignedChannelUpdate_set_chain_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The short channel ID
	 */
	public get_short_channel_id(): bigint {
		const ret: bigint = bindings.UnsignedChannelUpdate_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short channel ID
	 */
	public set_short_channel_id(val: bigint): void {
		bindings.UnsignedChannelUpdate_set_short_channel_id(this.ptr, val);
	}

	/**
	 * A strictly monotonic announcement counter, with gaps allowed, specific to this channel
	 */
	public get_timestamp(): number {
		const ret: number = bindings.UnsignedChannelUpdate_get_timestamp(this.ptr);
		return ret;
	}

	/**
	 * A strictly monotonic announcement counter, with gaps allowed, specific to this channel
	 */
	public set_timestamp(val: number): void {
		bindings.UnsignedChannelUpdate_set_timestamp(this.ptr, val);
	}

	/**
	 * Flags pertaining to this message.
	 */
	public get_message_flags(): number {
		const ret: number = bindings.UnsignedChannelUpdate_get_message_flags(this.ptr);
		return ret;
	}

	/**
	 * Flags pertaining to this message.
	 */
	public set_message_flags(val: number): void {
		bindings.UnsignedChannelUpdate_set_message_flags(this.ptr, val);
	}

	/**
	 * Flags pertaining to the channel, including to which direction in the channel this update
	 * applies and whether the direction is currently able to forward HTLCs.
	 */
	public get_channel_flags(): number {
		const ret: number = bindings.UnsignedChannelUpdate_get_channel_flags(this.ptr);
		return ret;
	}

	/**
	 * Flags pertaining to the channel, including to which direction in the channel this update
	 * applies and whether the direction is currently able to forward HTLCs.
	 */
	public set_channel_flags(val: number): void {
		bindings.UnsignedChannelUpdate_set_channel_flags(this.ptr, val);
	}

	/**
	 * The number of blocks such that if:
	 * `incoming_htlc.cltv_expiry < outgoing_htlc.cltv_expiry + cltv_expiry_delta`
	 * then we need to fail the HTLC backwards. When forwarding an HTLC, `cltv_expiry_delta` determines
	 * the outgoing HTLC's minimum `cltv_expiry` value -- so, if an incoming HTLC comes in with a
	 * `cltv_expiry` of 100000, and the node we're forwarding to has a `cltv_expiry_delta` value of 10,
	 * then we'll check that the outgoing HTLC's `cltv_expiry` value is at least 100010 before
	 * forwarding. Note that the HTLC sender is the one who originally sets this value when
	 * constructing the route.
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.UnsignedChannelUpdate_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The number of blocks such that if:
	 * `incoming_htlc.cltv_expiry < outgoing_htlc.cltv_expiry + cltv_expiry_delta`
	 * then we need to fail the HTLC backwards. When forwarding an HTLC, `cltv_expiry_delta` determines
	 * the outgoing HTLC's minimum `cltv_expiry` value -- so, if an incoming HTLC comes in with a
	 * `cltv_expiry` of 100000, and the node we're forwarding to has a `cltv_expiry_delta` value of 10,
	 * then we'll check that the outgoing HTLC's `cltv_expiry` value is at least 100010 before
	 * forwarding. Note that the HTLC sender is the one who originally sets this value when
	 * constructing the route.
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.UnsignedChannelUpdate_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public get_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.UnsignedChannelUpdate_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public set_htlc_minimum_msat(val: bigint): void {
		bindings.UnsignedChannelUpdate_set_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * The maximum HTLC value incoming to sender, in milli-satoshi.
	 * 
	 * This used to be optional.
	 */
	public get_htlc_maximum_msat(): bigint {
		const ret: bigint = bindings.UnsignedChannelUpdate_get_htlc_maximum_msat(this.ptr);
		return ret;
	}

	/**
	 * The maximum HTLC value incoming to sender, in milli-satoshi.
	 * 
	 * This used to be optional.
	 */
	public set_htlc_maximum_msat(val: bigint): void {
		bindings.UnsignedChannelUpdate_set_htlc_maximum_msat(this.ptr, val);
	}

	/**
	 * The base HTLC fee charged by sender, in milli-satoshi
	 */
	public get_fee_base_msat(): number {
		const ret: number = bindings.UnsignedChannelUpdate_get_fee_base_msat(this.ptr);
		return ret;
	}

	/**
	 * The base HTLC fee charged by sender, in milli-satoshi
	 */
	public set_fee_base_msat(val: number): void {
		bindings.UnsignedChannelUpdate_set_fee_base_msat(this.ptr, val);
	}

	/**
	 * The amount to fee multiplier, in micro-satoshi
	 */
	public get_fee_proportional_millionths(): number {
		const ret: number = bindings.UnsignedChannelUpdate_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * The amount to fee multiplier, in micro-satoshi
	 */
	public set_fee_proportional_millionths(val: number): void {
		bindings.UnsignedChannelUpdate_set_fee_proportional_millionths(this.ptr, val);
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
		const ret: number = bindings.UnsignedChannelUpdate_get_excess_data(this.ptr);
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
		bindings.UnsignedChannelUpdate_set_excess_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new UnsignedChannelUpdate given each field
	 */
	public static constructor_new(chain_hash_arg: Uint8Array, short_channel_id_arg: bigint, timestamp_arg: number, message_flags_arg: number, channel_flags_arg: number, cltv_expiry_delta_arg: number, htlc_minimum_msat_arg: bigint, htlc_maximum_msat_arg: bigint, fee_base_msat_arg: number, fee_proportional_millionths_arg: number, excess_data_arg: Uint8Array): UnsignedChannelUpdate {
		const ret: bigint = bindings.UnsignedChannelUpdate_new(bindings.encodeUint8Array(chain_hash_arg), short_channel_id_arg, timestamp_arg, message_flags_arg, channel_flags_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg, fee_base_msat_arg, fee_proportional_millionths_arg, bindings.encodeUint8Array(excess_data_arg));
		const ret_hu_conv: UnsignedChannelUpdate = new UnsignedChannelUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UnsignedChannelUpdate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedChannelUpdate
	 */
	public clone(): UnsignedChannelUpdate {
		const ret: bigint = bindings.UnsignedChannelUpdate_clone(this.ptr);
		const ret_hu_conv: UnsignedChannelUpdate = new UnsignedChannelUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UnsignedChannelUpdate.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UnsignedChannelUpdate_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two UnsignedChannelUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UnsignedChannelUpdate): boolean {
		const ret: boolean = bindings.UnsignedChannelUpdate_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the UnsignedChannelUpdate object into a byte array which can be read by UnsignedChannelUpdate_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UnsignedChannelUpdate_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UnsignedChannelUpdate from a byte array, created by UnsignedChannelUpdate_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UnsignedChannelUpdateDecodeErrorZ {
		const ret: bigint = bindings.UnsignedChannelUpdate_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UnsignedChannelUpdateDecodeErrorZ = Result_UnsignedChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
