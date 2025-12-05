
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A parallel struct to [`ChannelConfig`] to define partial updates.
 */
export class ChannelConfigUpdate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelConfigUpdate_free);
	}

	/**
	 * Amount (in millionths of a satoshi) charged per satoshi for payments forwarded outbound over the channel. See
	 * [`ChannelConfig::forwarding_fee_proportional_millionths`].
	 */
	public get_forwarding_fee_proportional_millionths(): Option_u32Z {
		const ret: bigint = bindings.ChannelConfigUpdate_get_forwarding_fee_proportional_millionths(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Amount (in millionths of a satoshi) charged per satoshi for payments forwarded outbound over the channel. See
	 * [`ChannelConfig::forwarding_fee_proportional_millionths`].
	 */
	public set_forwarding_fee_proportional_millionths(val: Option_u32Z): void {
		bindings.ChannelConfigUpdate_set_forwarding_fee_proportional_millionths(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Amount (in milli-satoshi) charged for payments forwarded outbound over the channel. See
	 * [`ChannelConfig::forwarding_fee_base_msat`].
	 */
	public get_forwarding_fee_base_msat(): Option_u32Z {
		const ret: bigint = bindings.ChannelConfigUpdate_get_forwarding_fee_base_msat(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Amount (in milli-satoshi) charged for payments forwarded outbound over the channel. See
	 * [`ChannelConfig::forwarding_fee_base_msat`].
	 */
	public set_forwarding_fee_base_msat(val: Option_u32Z): void {
		bindings.ChannelConfigUpdate_set_forwarding_fee_base_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over the channel this
	 * config applies to. See [`ChannelConfig::cltv_expiry_delta`].
	 */
	public get_cltv_expiry_delta(): Option_u16Z {
		const ret: bigint = bindings.ChannelConfigUpdate_get_cltv_expiry_delta(this.ptr);
		const ret_hu_conv: Option_u16Z = Option_u16Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over the channel this
	 * config applies to. See [`ChannelConfig::cltv_expiry_delta`].
	 */
	public set_cltv_expiry_delta(val: Option_u16Z): void {
		bindings.ChannelConfigUpdate_set_cltv_expiry_delta(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The total exposure we are willing to allow to dust HTLCs. See [`ChannelConfig::max_dust_htlc_exposure`].
	 * 
	 * Returns a copy of the field.
	 */
	public get_max_dust_htlc_exposure_msat(): Option_MaxDustHTLCExposureZ {
		const ret: bigint = bindings.ChannelConfigUpdate_get_max_dust_htlc_exposure_msat(this.ptr);
		const ret_hu_conv: Option_MaxDustHTLCExposureZ = Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The total exposure we are willing to allow to dust HTLCs. See [`ChannelConfig::max_dust_htlc_exposure`].
	 */
	public set_max_dust_htlc_exposure_msat(val: Option_MaxDustHTLCExposureZ): void {
		bindings.ChannelConfigUpdate_set_max_dust_htlc_exposure_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The additional fee we're willing to pay to avoid waiting for the counterparty's `to_self_delay` to reclaim
	 * funds. See [`ChannelConfig::force_close_avoidance_max_fee_satoshis`].
	 */
	public get_force_close_avoidance_max_fee_satoshis(): Option_u64Z {
		const ret: bigint = bindings.ChannelConfigUpdate_get_force_close_avoidance_max_fee_satoshis(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The additional fee we're willing to pay to avoid waiting for the counterparty's `to_self_delay` to reclaim
	 * funds. See [`ChannelConfig::force_close_avoidance_max_fee_satoshis`].
	 */
	public set_force_close_avoidance_max_fee_satoshis(val: Option_u64Z): void {
		bindings.ChannelConfigUpdate_set_force_close_avoidance_max_fee_satoshis(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * If set, allows this channel's counterparty to skim an additional fee off this node's inbound HTLCs. See
	 * [`ChannelConfig::accept_underpaying_htlcs`].
	 */
	public get_accept_underpaying_htlcs(): Option_boolZ {
		const ret: bigint = bindings.ChannelConfigUpdate_get_accept_underpaying_htlcs(this.ptr);
		const ret_hu_conv: Option_boolZ = Option_boolZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * If set, allows this channel's counterparty to skim an additional fee off this node's inbound HTLCs. See
	 * [`ChannelConfig::accept_underpaying_htlcs`].
	 */
	public set_accept_underpaying_htlcs(val: Option_boolZ): void {
		bindings.ChannelConfigUpdate_set_accept_underpaying_htlcs(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelConfigUpdate given each field
	 */
	public static constructor_new(forwarding_fee_proportional_millionths_arg: Option_u32Z, forwarding_fee_base_msat_arg: Option_u32Z, cltv_expiry_delta_arg: Option_u16Z, max_dust_htlc_exposure_msat_arg: Option_MaxDustHTLCExposureZ, force_close_avoidance_max_fee_satoshis_arg: Option_u64Z, accept_underpaying_htlcs_arg: Option_boolZ): ChannelConfigUpdate {
		const ret: bigint = bindings.ChannelConfigUpdate_new(CommonBase.get_ptr_of(forwarding_fee_proportional_millionths_arg), CommonBase.get_ptr_of(forwarding_fee_base_msat_arg), CommonBase.get_ptr_of(cltv_expiry_delta_arg), CommonBase.get_ptr_of(max_dust_htlc_exposure_msat_arg), CommonBase.get_ptr_of(force_close_avoidance_max_fee_satoshis_arg), CommonBase.get_ptr_of(accept_underpaying_htlcs_arg));
		const ret_hu_conv: ChannelConfigUpdate = new ChannelConfigUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelConfigUpdate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelConfigUpdate
	 */
	public clone(): ChannelConfigUpdate {
		const ret: bigint = bindings.ChannelConfigUpdate_clone(this.ptr);
		const ret_hu_conv: ChannelConfigUpdate = new ChannelConfigUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Build a ChannelConfigUpdate from a ChannelConfig
	 */
	public static constructor_from_ChannelConfig(f: ChannelConfig): ChannelConfigUpdate {
		const ret: bigint = bindings.ChannelConfigUpdate_from_ChannelConfig(CommonBase.get_ptr_of(f));
		const ret_hu_conv: ChannelConfigUpdate = new ChannelConfigUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
