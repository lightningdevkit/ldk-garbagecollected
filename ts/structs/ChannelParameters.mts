
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A subset of [`CommonOpenChannelFields`], containing various parameters which are set by the
 * channel initiator and which are not part of the channel funding transaction.
 */
export class ChannelParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelParameters_free);
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel initiator will be
	 * omitted.
	 */
	public get_dust_limit_satoshis(): bigint {
		const ret: bigint = bindings.ChannelParameters_get_dust_limit_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel initiator will be
	 * omitted.
	 */
	public set_dust_limit_satoshis(val: bigint): void {
		bindings.ChannelParameters_set_dust_limit_satoshis(this.ptr, val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards channel initiator, in milli-satoshi
	 */
	public get_max_htlc_value_in_flight_msat(): bigint {
		const ret: bigint = bindings.ChannelParameters_get_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards channel initiator, in milli-satoshi
	 */
	public set_max_htlc_value_in_flight_msat(val: bigint): void {
		bindings.ChannelParameters_set_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	/**
	 * The minimum HTLC size for HTLCs towards the channel initiator, in milli-satoshi
	 */
	public get_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.ChannelParameters_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum HTLC size for HTLCs towards the channel initiator, in milli-satoshi
	 */
	public set_htlc_minimum_msat(val: bigint): void {
		bindings.ChannelParameters_set_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * The feerate for the commitment transaction set by the channel initiator until updated by
	 * [`UpdateFee`]
	 */
	public get_commitment_feerate_sat_per_1000_weight(): number {
		const ret: number = bindings.ChannelParameters_get_commitment_feerate_sat_per_1000_weight(this.ptr);
		return ret;
	}

	/**
	 * The feerate for the commitment transaction set by the channel initiator until updated by
	 * [`UpdateFee`]
	 */
	public set_commitment_feerate_sat_per_1000_weight(val: number): void {
		bindings.ChannelParameters_set_commitment_feerate_sat_per_1000_weight(this.ptr, val);
	}

	/**
	 * The number of blocks which the non-channel-initator will have to wait to claim on-chain
	 * funds if they broadcast a commitment transaction.
	 */
	public get_to_self_delay(): number {
		const ret: number = bindings.ChannelParameters_get_to_self_delay(this.ptr);
		return ret;
	}

	/**
	 * The number of blocks which the non-channel-initator will have to wait to claim on-chain
	 * funds if they broadcast a commitment transaction.
	 */
	public set_to_self_delay(val: number): void {
		bindings.ChannelParameters_set_to_self_delay(this.ptr, val);
	}

	/**
	 * The maximum number of pending HTLCs towards the channel initiator.
	 */
	public get_max_accepted_htlcs(): number {
		const ret: number = bindings.ChannelParameters_get_max_accepted_htlcs(this.ptr);
		return ret;
	}

	/**
	 * The maximum number of pending HTLCs towards the channel initiator.
	 */
	public set_max_accepted_htlcs(val: number): void {
		bindings.ChannelParameters_set_max_accepted_htlcs(this.ptr, val);
	}

	/**
	 * Constructs a new ChannelParameters given each field
	 */
	public static constructor_new(dust_limit_satoshis_arg: bigint, max_htlc_value_in_flight_msat_arg: bigint, htlc_minimum_msat_arg: bigint, commitment_feerate_sat_per_1000_weight_arg: number, to_self_delay_arg: number, max_accepted_htlcs_arg: number): ChannelParameters {
		const ret: bigint = bindings.ChannelParameters_new(dust_limit_satoshis_arg, max_htlc_value_in_flight_msat_arg, htlc_minimum_msat_arg, commitment_feerate_sat_per_1000_weight_arg, to_self_delay_arg, max_accepted_htlcs_arg);
		const ret_hu_conv: ChannelParameters = new ChannelParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelParameters_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelParameters
	 */
	public clone(): ChannelParameters {
		const ret: bigint = bindings.ChannelParameters_clone(this.ptr);
		const ret_hu_conv: ChannelParameters = new ChannelParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelParameters.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ChannelParameters_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ChannelParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelParameters): boolean {
		const ret: boolean = bindings.ChannelParameters_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
