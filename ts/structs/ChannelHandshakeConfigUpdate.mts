
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Config structure for overriding channel handshake parameters.
 */
export class ChannelHandshakeConfigUpdate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelHandshakeConfigUpdate_free);
	}

	/**
	 * Overrides the percentage of the channel value we will cap the total value of outstanding inbound HTLCs to. See
	 * [`ChannelHandshakeConfig::max_inbound_htlc_value_in_flight_percent_of_channel`].
	 */
	public get_max_inbound_htlc_value_in_flight_percent_of_channel(): Option_u8Z {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_get_max_inbound_htlc_value_in_flight_percent_of_channel(this.ptr);
		const ret_hu_conv: Option_u8Z = Option_u8Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Overrides the percentage of the channel value we will cap the total value of outstanding inbound HTLCs to. See
	 * [`ChannelHandshakeConfig::max_inbound_htlc_value_in_flight_percent_of_channel`].
	 */
	public set_max_inbound_htlc_value_in_flight_percent_of_channel(val: Option_u8Z): void {
		bindings.ChannelHandshakeConfigUpdate_set_max_inbound_htlc_value_in_flight_percent_of_channel(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Overrides the smallest value HTLC we will accept to process. See [`ChannelHandshakeConfig::our_htlc_minimum_msat`].
	 */
	public get_htlc_minimum_msat(): Option_u64Z {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_get_htlc_minimum_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Overrides the smallest value HTLC we will accept to process. See [`ChannelHandshakeConfig::our_htlc_minimum_msat`].
	 */
	public set_htlc_minimum_msat(val: Option_u64Z): void {
		bindings.ChannelHandshakeConfigUpdate_set_htlc_minimum_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Overrides confirmations we will wait for before considering the channel locked in. See
	 * [`ChannelHandshakeConfig::minimum_depth`].
	 */
	public get_minimum_depth(): Option_u32Z {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_get_minimum_depth(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Overrides confirmations we will wait for before considering the channel locked in. See
	 * [`ChannelHandshakeConfig::minimum_depth`].
	 */
	public set_minimum_depth(val: Option_u32Z): void {
		bindings.ChannelHandshakeConfigUpdate_set_minimum_depth(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Overrides the number of blocks we require our counterparty to wait to claim their money. See
	 * [`ChannelHandshakeConfig::our_to_self_delay`].
	 */
	public get_to_self_delay(): Option_u16Z {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_get_to_self_delay(this.ptr);
		const ret_hu_conv: Option_u16Z = Option_u16Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Overrides the number of blocks we require our counterparty to wait to claim their money. See
	 * [`ChannelHandshakeConfig::our_to_self_delay`].
	 */
	public set_to_self_delay(val: Option_u16Z): void {
		bindings.ChannelHandshakeConfigUpdate_set_to_self_delay(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The maximum number of HTLCs in-flight from our counterparty towards us at the same time. See
	 * [`ChannelHandshakeConfig::our_max_accepted_htlcs`].
	 */
	public get_max_accepted_htlcs(): Option_u16Z {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_get_max_accepted_htlcs(this.ptr);
		const ret_hu_conv: Option_u16Z = Option_u16Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The maximum number of HTLCs in-flight from our counterparty towards us at the same time. See
	 * [`ChannelHandshakeConfig::our_max_accepted_htlcs`].
	 */
	public set_max_accepted_htlcs(val: Option_u16Z): void {
		bindings.ChannelHandshakeConfigUpdate_set_max_accepted_htlcs(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The Proportion of the channel value to configure as counterparty's channel reserve. See
	 * [`ChannelHandshakeConfig::their_channel_reserve_proportional_millionths`].
	 */
	public get_channel_reserve_proportional_millionths(): Option_u32Z {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_get_channel_reserve_proportional_millionths(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The Proportion of the channel value to configure as counterparty's channel reserve. See
	 * [`ChannelHandshakeConfig::their_channel_reserve_proportional_millionths`].
	 */
	public set_channel_reserve_proportional_millionths(val: Option_u32Z): void {
		bindings.ChannelHandshakeConfigUpdate_set_channel_reserve_proportional_millionths(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelHandshakeConfigUpdate given each field
	 */
	public static constructor_new(max_inbound_htlc_value_in_flight_percent_of_channel_arg: Option_u8Z, htlc_minimum_msat_arg: Option_u64Z, minimum_depth_arg: Option_u32Z, to_self_delay_arg: Option_u16Z, max_accepted_htlcs_arg: Option_u16Z, channel_reserve_proportional_millionths_arg: Option_u32Z): ChannelHandshakeConfigUpdate {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_new(CommonBase.get_ptr_of(max_inbound_htlc_value_in_flight_percent_of_channel_arg), CommonBase.get_ptr_of(htlc_minimum_msat_arg), CommonBase.get_ptr_of(minimum_depth_arg), CommonBase.get_ptr_of(to_self_delay_arg), CommonBase.get_ptr_of(max_accepted_htlcs_arg), CommonBase.get_ptr_of(channel_reserve_proportional_millionths_arg));
		const ret_hu_conv: ChannelHandshakeConfigUpdate = new ChannelHandshakeConfigUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelHandshakeConfigUpdate
	 */
	public clone(): ChannelHandshakeConfigUpdate {
		const ret: bigint = bindings.ChannelHandshakeConfigUpdate_clone(this.ptr);
		const ret_hu_conv: ChannelHandshakeConfigUpdate = new ChannelHandshakeConfigUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
