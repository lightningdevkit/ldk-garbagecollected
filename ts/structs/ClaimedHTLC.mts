
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information about an HTLC that is part of a payment that can be claimed.
 */
export class ClaimedHTLC extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ClaimedHTLC_free);
	}

	/**
	 * The counterparty of the channel.
	 * 
	 * This value will always be `None` for objects serialized with LDK versions prior to 0.2 and
	 * `Some` otherwise.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_counterparty_node_id(): Uint8Array {
		const ret: number = bindings.ClaimedHTLC_get_counterparty_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The counterparty of the channel.
	 * 
	 * This value will always be `None` for objects serialized with LDK versions prior to 0.2 and
	 * `Some` otherwise.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_counterparty_node_id(val: Uint8Array|null): void {
		bindings.ClaimedHTLC_set_counterparty_node_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The `channel_id` of the channel over which the HTLC was received.
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.ClaimedHTLC_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The `channel_id` of the channel over which the HTLC was received.
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.ClaimedHTLC_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The `user_channel_id` of the channel over which the HTLC was received. This is the value
	 * passed in to [`ChannelManager::create_channel`] for outbound channels, or to
	 * [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * This field will be zero for a payment that was serialized prior to LDK version 0.0.117. (This
	 * should only happen in the case that a payment was claimable prior to LDK version 0.0.117, but
	 * was not actually claimed until after upgrading.)
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public get_user_channel_id(): bigint {
		const ret: number = bindings.ClaimedHTLC_get_user_channel_id(this.ptr);
		const ret_conv: bigint = bindings.decodeUint128(ret);
		return ret_conv;
	}

	/**
	 * The `user_channel_id` of the channel over which the HTLC was received. This is the value
	 * passed in to [`ChannelManager::create_channel`] for outbound channels, or to
	 * [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.
	 * 
	 * This field will be zero for a payment that was serialized prior to LDK version 0.0.117. (This
	 * should only happen in the case that a payment was claimable prior to LDK version 0.0.117, but
	 * was not actually claimed until after upgrading.)
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public set_user_channel_id(val: bigint): void {
		bindings.ClaimedHTLC_set_user_channel_id(this.ptr, bindings.encodeUint128(val));
	}

	/**
	 * The block height at which this HTLC expires.
	 */
	public get_cltv_expiry(): number {
		const ret: number = bindings.ClaimedHTLC_get_cltv_expiry(this.ptr);
		return ret;
	}

	/**
	 * The block height at which this HTLC expires.
	 */
	public set_cltv_expiry(val: number): void {
		bindings.ClaimedHTLC_set_cltv_expiry(this.ptr, val);
	}

	/**
	 * The amount (in msats) of this part of an MPP.
	 */
	public get_value_msat(): bigint {
		const ret: bigint = bindings.ClaimedHTLC_get_value_msat(this.ptr);
		return ret;
	}

	/**
	 * The amount (in msats) of this part of an MPP.
	 */
	public set_value_msat(val: bigint): void {
		bindings.ClaimedHTLC_set_value_msat(this.ptr, val);
	}

	/**
	 * The extra fee our counterparty skimmed off the top of this HTLC, if any.
	 * 
	 * This value will always be 0 for [`ClaimedHTLC`]s serialized with LDK versions prior to
	 * 0.0.119.
	 */
	public get_counterparty_skimmed_fee_msat(): bigint {
		const ret: bigint = bindings.ClaimedHTLC_get_counterparty_skimmed_fee_msat(this.ptr);
		return ret;
	}

	/**
	 * The extra fee our counterparty skimmed off the top of this HTLC, if any.
	 * 
	 * This value will always be 0 for [`ClaimedHTLC`]s serialized with LDK versions prior to
	 * 0.0.119.
	 */
	public set_counterparty_skimmed_fee_msat(val: bigint): void {
		bindings.ClaimedHTLC_set_counterparty_skimmed_fee_msat(this.ptr, val);
	}

	/**
	 * Constructs a new ClaimedHTLC given each field
	 * 
	 * Note that counterparty_node_id_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(counterparty_node_id_arg: Uint8Array|null, channel_id_arg: ChannelId, user_channel_id_arg: bigint, cltv_expiry_arg: number, value_msat_arg: bigint, counterparty_skimmed_fee_msat_arg: bigint): ClaimedHTLC {
		const ret: bigint = bindings.ClaimedHTLC_new(bindings.encodeUint8Array(counterparty_node_id_arg), CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint128(user_channel_id_arg), cltv_expiry_arg, value_msat_arg, counterparty_skimmed_fee_msat_arg);
		const ret_hu_conv: ClaimedHTLC = new ClaimedHTLC(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ClaimedHTLC_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ClaimedHTLC
	 */
	public clone(): ClaimedHTLC {
		const ret: bigint = bindings.ClaimedHTLC_clone(this.ptr);
		const ret_hu_conv: ClaimedHTLC = new ClaimedHTLC(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ClaimedHTLCs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ClaimedHTLC): boolean {
		const ret: boolean = bindings.ClaimedHTLC_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ClaimedHTLC object into a byte array which can be read by ClaimedHTLC_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ClaimedHTLC_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ClaimedHTLC from a byte array, created by ClaimedHTLC_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ClaimedHTLCDecodeErrorZ {
		const ret: bigint = bindings.ClaimedHTLC_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ClaimedHTLCDecodeErrorZ = Result_ClaimedHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
