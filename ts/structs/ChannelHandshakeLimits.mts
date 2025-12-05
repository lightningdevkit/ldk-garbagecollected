
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Optional channel limits which are applied during channel creation.
 * 
 * These limits are only applied to our counterparty's limits, not our own.
 * 
 * Use `0` or `<type>::max_value()` as appropriate to skip checking.
 * 
 * Provides sane defaults for most configurations.
 * 
 * Most additional limits are disabled except those with which specify a default in individual
 * field documentation. Note that this may result in barely-usable channels, but since they
 * are applied mostly only to incoming channels that's not much of a problem.
 */
export class ChannelHandshakeLimits extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelHandshakeLimits_free);
	}

	/**
	 * Minimum allowed satoshis when a channel is funded. This is supplied by the sender and so
	 * only applies to inbound channels.
	 * 
	 * Default value: `1000`
	 * (Minimum of [`ChannelHandshakeConfig::their_channel_reserve_proportional_millionths`])
	 */
	public get_min_funding_satoshis(): bigint {
		const ret: bigint = bindings.ChannelHandshakeLimits_get_min_funding_satoshis(this.ptr);
		return ret;
	}

	/**
	 * Minimum allowed satoshis when a channel is funded. This is supplied by the sender and so
	 * only applies to inbound channels.
	 * 
	 * Default value: `1000`
	 * (Minimum of [`ChannelHandshakeConfig::their_channel_reserve_proportional_millionths`])
	 */
	public set_min_funding_satoshis(val: bigint): void {
		bindings.ChannelHandshakeLimits_set_min_funding_satoshis(this.ptr, val);
	}

	/**
	 * Maximum allowed satoshis when a channel is funded. This is supplied by the sender and so
	 * only applies to inbound channels.
	 * 
	 * Default value: `2^24 - 1`
	 */
	public get_max_funding_satoshis(): bigint {
		const ret: bigint = bindings.ChannelHandshakeLimits_get_max_funding_satoshis(this.ptr);
		return ret;
	}

	/**
	 * Maximum allowed satoshis when a channel is funded. This is supplied by the sender and so
	 * only applies to inbound channels.
	 * 
	 * Default value: `2^24 - 1`
	 */
	public set_max_funding_satoshis(val: bigint): void {
		bindings.ChannelHandshakeLimits_set_max_funding_satoshis(this.ptr, val);
	}

	/**
	 * The remote node sets a limit on the minimum size of HTLCs we can send to them. This allows
	 * you to limit the maximum minimum-size they can require.
	 * 
	 * Default value: `u64::max_value`
	 */
	public get_max_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.ChannelHandshakeLimits_get_max_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The remote node sets a limit on the minimum size of HTLCs we can send to them. This allows
	 * you to limit the maximum minimum-size they can require.
	 * 
	 * Default value: `u64::max_value`
	 */
	public set_max_htlc_minimum_msat(val: bigint): void {
		bindings.ChannelHandshakeLimits_set_max_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * The remote node sets a limit on the maximum value of pending HTLCs to them at any given
	 * time to limit their funds exposure to HTLCs. This allows you to set a minimum such value.
	 * 
	 * Default value: `0`
	 */
	public get_min_max_htlc_value_in_flight_msat(): bigint {
		const ret: bigint = bindings.ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	/**
	 * The remote node sets a limit on the maximum value of pending HTLCs to them at any given
	 * time to limit their funds exposure to HTLCs. This allows you to set a minimum such value.
	 * 
	 * Default value: `0`
	 */
	public set_min_max_htlc_value_in_flight_msat(val: bigint): void {
		bindings.ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	/**
	 * The remote node will require we keep a certain amount in direct payment to ourselves at all
	 * time, ensuring that we are able to be punished if we broadcast an old state. This allows to
	 * you limit the amount which we will have to keep to ourselves (and cannot use for HTLCs).
	 * 
	 * Default value: `u64::max_value`.
	 */
	public get_max_channel_reserve_satoshis(): bigint {
		const ret: bigint = bindings.ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The remote node will require we keep a certain amount in direct payment to ourselves at all
	 * time, ensuring that we are able to be punished if we broadcast an old state. This allows to
	 * you limit the amount which we will have to keep to ourselves (and cannot use for HTLCs).
	 * 
	 * Default value: `u64::max_value`.
	 */
	public set_max_channel_reserve_satoshis(val: bigint): void {
		bindings.ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this.ptr, val);
	}

	/**
	 * The remote node sets a limit on the maximum number of pending HTLCs to them at any given
	 * time. This allows you to set a minimum such value.
	 * 
	 * Default value: `0`
	 */
	public get_min_max_accepted_htlcs(): number {
		const ret: number = bindings.ChannelHandshakeLimits_get_min_max_accepted_htlcs(this.ptr);
		return ret;
	}

	/**
	 * The remote node sets a limit on the maximum number of pending HTLCs to them at any given
	 * time. This allows you to set a minimum such value.
	 * 
	 * Default value: `0`
	 */
	public set_min_max_accepted_htlcs(val: number): void {
		bindings.ChannelHandshakeLimits_set_min_max_accepted_htlcs(this.ptr, val);
	}

	/**
	 * Before a channel is usable the funding transaction will need to be confirmed by at least a
	 * certain number of blocks, specified by the node which is not the funder (as the funder can
	 * assume they aren't going to double-spend themselves).
	 * This config allows you to set a limit on the maximum amount of time to wait.
	 * 
	 * Default value: `144`, or roughly one day and only applies to outbound channels
	 */
	public get_max_minimum_depth(): number {
		const ret: number = bindings.ChannelHandshakeLimits_get_max_minimum_depth(this.ptr);
		return ret;
	}

	/**
	 * Before a channel is usable the funding transaction will need to be confirmed by at least a
	 * certain number of blocks, specified by the node which is not the funder (as the funder can
	 * assume they aren't going to double-spend themselves).
	 * This config allows you to set a limit on the maximum amount of time to wait.
	 * 
	 * Default value: `144`, or roughly one day and only applies to outbound channels
	 */
	public set_max_minimum_depth(val: number): void {
		bindings.ChannelHandshakeLimits_set_max_minimum_depth(this.ptr, val);
	}

	/**
	 * Whether we implicitly trust funding transactions generated by us for our own outbound
	 * channels to not be double-spent.
	 * 
	 * If this is set, we assume that our own funding transactions are *never* double-spent, and
	 * thus we can trust them without any confirmations. This is generally a reasonable
	 * assumption, given we're the only ones who could ever double-spend it (assuming we have sole
	 * control of the signing keys).
	 * 
	 * You may wish to un-set this if you allow the user to (or do in an automated fashion)
	 * double-spend the funding transaction to RBF with an alternative channel open.
	 * 
	 * This only applies if our counterparty set their confirmations-required value to `0`, and we
	 * always trust our own funding transaction at `1` confirmation irrespective of this value.
	 * Thus, this effectively acts as a `min_minimum_depth`, with the only possible values being
	 * `true` (`0`) and `false` (`1`).
	 * 
	 * Default value: `true`
	 */
	public get_trust_own_funding_0conf(): boolean {
		const ret: boolean = bindings.ChannelHandshakeLimits_get_trust_own_funding_0conf(this.ptr);
		return ret;
	}

	/**
	 * Whether we implicitly trust funding transactions generated by us for our own outbound
	 * channels to not be double-spent.
	 * 
	 * If this is set, we assume that our own funding transactions are *never* double-spent, and
	 * thus we can trust them without any confirmations. This is generally a reasonable
	 * assumption, given we're the only ones who could ever double-spend it (assuming we have sole
	 * control of the signing keys).
	 * 
	 * You may wish to un-set this if you allow the user to (or do in an automated fashion)
	 * double-spend the funding transaction to RBF with an alternative channel open.
	 * 
	 * This only applies if our counterparty set their confirmations-required value to `0`, and we
	 * always trust our own funding transaction at `1` confirmation irrespective of this value.
	 * Thus, this effectively acts as a `min_minimum_depth`, with the only possible values being
	 * `true` (`0`) and `false` (`1`).
	 * 
	 * Default value: `true`
	 */
	public set_trust_own_funding_0conf(val: boolean): void {
		bindings.ChannelHandshakeLimits_set_trust_own_funding_0conf(this.ptr, val);
	}

	/**
	 * Set to force an incoming channel to match our announced channel preference in
	 * [`ChannelHandshakeConfig::announce_for_forwarding`].
	 * 
	 * For a node which is not online reliably, this should be set to true and
	 * [`ChannelHandshakeConfig::announce_for_forwarding`] set to false, ensuring that no announced (aka public)
	 * channels will ever be opened.
	 * 
	 * Default value: `true`
	 */
	public get_force_announced_channel_preference(): boolean {
		const ret: boolean = bindings.ChannelHandshakeLimits_get_force_announced_channel_preference(this.ptr);
		return ret;
	}

	/**
	 * Set to force an incoming channel to match our announced channel preference in
	 * [`ChannelHandshakeConfig::announce_for_forwarding`].
	 * 
	 * For a node which is not online reliably, this should be set to true and
	 * [`ChannelHandshakeConfig::announce_for_forwarding`] set to false, ensuring that no announced (aka public)
	 * channels will ever be opened.
	 * 
	 * Default value: `true`
	 */
	public set_force_announced_channel_preference(val: boolean): void {
		bindings.ChannelHandshakeLimits_set_force_announced_channel_preference(this.ptr, val);
	}

	/**
	 * Set to the amount of time we're willing to wait to claim money back to us.
	 * 
	 * Not checking this value would be a security issue, as our peer would be able to set it to
	 * max relative lock-time (a year) and we would \"lose\" money as it would be locked for a long time.
	 * 
	 * Default value: `2016`, which we also enforce as a maximum value so you can tweak config to
	 * reduce the loss of having useless locked funds (if your peer accepts)
	 */
	public get_their_to_self_delay(): number {
		const ret: number = bindings.ChannelHandshakeLimits_get_their_to_self_delay(this.ptr);
		return ret;
	}

	/**
	 * Set to the amount of time we're willing to wait to claim money back to us.
	 * 
	 * Not checking this value would be a security issue, as our peer would be able to set it to
	 * max relative lock-time (a year) and we would \"lose\" money as it would be locked for a long time.
	 * 
	 * Default value: `2016`, which we also enforce as a maximum value so you can tweak config to
	 * reduce the loss of having useless locked funds (if your peer accepts)
	 */
	public set_their_to_self_delay(val: number): void {
		bindings.ChannelHandshakeLimits_set_their_to_self_delay(this.ptr, val);
	}

	/**
	 * Constructs a new ChannelHandshakeLimits given each field
	 */
	public static constructor_new(min_funding_satoshis_arg: bigint, max_funding_satoshis_arg: bigint, max_htlc_minimum_msat_arg: bigint, min_max_htlc_value_in_flight_msat_arg: bigint, max_channel_reserve_satoshis_arg: bigint, min_max_accepted_htlcs_arg: number, max_minimum_depth_arg: number, trust_own_funding_0conf_arg: boolean, force_announced_channel_preference_arg: boolean, their_to_self_delay_arg: number): ChannelHandshakeLimits {
		const ret: bigint = bindings.ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, max_minimum_depth_arg, trust_own_funding_0conf_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelHandshakeLimits_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelHandshakeLimits
	 */
	public clone(): ChannelHandshakeLimits {
		const ret: bigint = bindings.ChannelHandshakeLimits_clone(this.ptr);
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ChannelHandshakeLimits. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): ChannelHandshakeLimits {
		const ret: bigint = bindings.ChannelHandshakeLimits_default();
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
