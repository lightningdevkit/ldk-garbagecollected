
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Options which apply on a per-channel basis and may change at runtime or based on negotiation
 * with our counterparty.
 */
export class ChannelConfig extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelConfig_free);
	}

	/**
	 * Amount (in millionths of a satoshi) charged per satoshi for payments forwarded outbound
	 * over the channel.
	 * This may be allowed to change at runtime in a later update, however doing so must result in
	 * update messages sent to notify all nodes of our updated relay fee.
	 * 
	 * Default value: `0`
	 */
	public get_forwarding_fee_proportional_millionths(): number {
		const ret: number = bindings.ChannelConfig_get_forwarding_fee_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * Amount (in millionths of a satoshi) charged per satoshi for payments forwarded outbound
	 * over the channel.
	 * This may be allowed to change at runtime in a later update, however doing so must result in
	 * update messages sent to notify all nodes of our updated relay fee.
	 * 
	 * Default value: `0`
	 */
	public set_forwarding_fee_proportional_millionths(val: number): void {
		bindings.ChannelConfig_set_forwarding_fee_proportional_millionths(this.ptr, val);
	}

	/**
	 * Amount (in milli-satoshi) charged for payments forwarded outbound over the channel, in
	 * excess of [`forwarding_fee_proportional_millionths`].
	 * This may be allowed to change at runtime in a later update, however doing so must result in
	 * update messages sent to notify all nodes of our updated relay fee.
	 * 
	 * The default value of a single satoshi roughly matches the market rate on many routing nodes
	 * as of July 2021. Adjusting it upwards or downwards may change whether nodes route through
	 * this node.
	 * 
	 * Default value: `1000`
	 * 
	 * [`forwarding_fee_proportional_millionths`]: ChannelConfig::forwarding_fee_proportional_millionths
	 */
	public get_forwarding_fee_base_msat(): number {
		const ret: number = bindings.ChannelConfig_get_forwarding_fee_base_msat(this.ptr);
		return ret;
	}

	/**
	 * Amount (in milli-satoshi) charged for payments forwarded outbound over the channel, in
	 * excess of [`forwarding_fee_proportional_millionths`].
	 * This may be allowed to change at runtime in a later update, however doing so must result in
	 * update messages sent to notify all nodes of our updated relay fee.
	 * 
	 * The default value of a single satoshi roughly matches the market rate on many routing nodes
	 * as of July 2021. Adjusting it upwards or downwards may change whether nodes route through
	 * this node.
	 * 
	 * Default value: `1000`
	 * 
	 * [`forwarding_fee_proportional_millionths`]: ChannelConfig::forwarding_fee_proportional_millionths
	 */
	public set_forwarding_fee_base_msat(val: number): void {
		bindings.ChannelConfig_set_forwarding_fee_base_msat(this.ptr, val);
	}

	/**
	 * The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over
	 * the channel this config applies to.
	 * 
	 * This is analogous to [`ChannelHandshakeConfig::our_to_self_delay`] but applies to in-flight
	 * HTLC balance when a channel appears on-chain whereas
	 * [`ChannelHandshakeConfig::our_to_self_delay`] applies to the remaining
	 * (non-HTLC-encumbered) balance.
	 * 
	 * Thus, for HTLC-encumbered balances to be enforced on-chain when a channel is force-closed,
	 * we (or one of our watchtowers) MUST be online to check for broadcast of the current
	 * commitment transaction at least once per this many blocks (minus some margin to allow us
	 * enough time to broadcast and confirm a transaction, possibly with time in between to RBF
	 * the spending transaction).
	 * 
	 * Default value: `72` (12 hours at an average of 6 blocks/hour)
	 * 
	 * Minimum value: [`MIN_CLTV_EXPIRY_DELTA`] (Any values less than this will be treated as
	 * [`MIN_CLTV_EXPIRY_DELTA`] instead.)
	 * 
	 * [`MIN_CLTV_EXPIRY_DELTA`]: crate::ln::channelmanager::MIN_CLTV_EXPIRY_DELTA
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.ChannelConfig_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over
	 * the channel this config applies to.
	 * 
	 * This is analogous to [`ChannelHandshakeConfig::our_to_self_delay`] but applies to in-flight
	 * HTLC balance when a channel appears on-chain whereas
	 * [`ChannelHandshakeConfig::our_to_self_delay`] applies to the remaining
	 * (non-HTLC-encumbered) balance.
	 * 
	 * Thus, for HTLC-encumbered balances to be enforced on-chain when a channel is force-closed,
	 * we (or one of our watchtowers) MUST be online to check for broadcast of the current
	 * commitment transaction at least once per this many blocks (minus some margin to allow us
	 * enough time to broadcast and confirm a transaction, possibly with time in between to RBF
	 * the spending transaction).
	 * 
	 * Default value: `72` (12 hours at an average of 6 blocks/hour)
	 * 
	 * Minimum value: [`MIN_CLTV_EXPIRY_DELTA`] (Any values less than this will be treated as
	 * [`MIN_CLTV_EXPIRY_DELTA`] instead.)
	 * 
	 * [`MIN_CLTV_EXPIRY_DELTA`]: crate::ln::channelmanager::MIN_CLTV_EXPIRY_DELTA
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.ChannelConfig_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * Limit our total exposure to potential loss to on-chain fees on close, including in-flight
	 * HTLCs which are burned to fees as they are too small to claim on-chain and fees on
	 * commitment transaction(s) broadcasted by our counterparty in excess of our own fee estimate.
	 * 
	 * # HTLC-based Dust Exposure
	 * 
	 * When an HTLC present in one of our channels is below a \"dust\" threshold, the HTLC will
	 * not be claimable on-chain, instead being turned into additional miner fees if either
	 * party force-closes the channel. Because the threshold is per-HTLC, our total exposure
	 * to such payments may be substantial if there are many dust HTLCs present when the
	 * channel is force-closed.
	 * 
	 * The dust threshold for each HTLC is based on the `dust_limit_satoshis` for each party in a
	 * channel negotiated throughout the channel open process, along with the fees required to have
	 * a broadcastable HTLC spending transaction. When a channel supports anchor outputs
	 * (specifically the zero fee HTLC transaction variant), this threshold no longer takes into
	 * account the HTLC transaction fee as it is zero. Because of this, you may want to set this
	 * value to a fixed limit for channels using anchor outputs, while the fee rate multiplier
	 * variant is primarily intended for use with pre-anchor channels.
	 * 
	 * The selected limit is applied for sent, forwarded, and received HTLCs and limits the total
	 * exposure across all three types per-channel.
	 * 
	 * # Transaction Fee Dust Exposure
	 * 
	 * Further, counterparties broadcasting a commitment transaction in a force-close may result
	 * in other balance being burned to fees, and thus all fees on commitment and HTLC
	 * transactions in excess of our local fee estimates are included in the dust calculation.
	 * 
	 * Because of this, another way to look at this limit is to divide it by 43,000 (or 218,750
	 * for non-anchor channels) and see it as the maximum feerate disagreement (in sats/vB) per
	 * non-dust HTLC we're allowed to have with our peers before risking a force-closure for
	 * inbound channels.
	 * 
	 * Thus, for the default value of 10_000 * a current feerate estimate of 10 sat/vB (or 2,500
	 * sat/KW), we risk force-closure if we disagree with our peer by:
	 * `10_000 * 2_500 / 43_000 / (483*2)` = 0.6 sat/vB for anchor channels with 483 HTLCs in
	 * both directions (the maximum),
	 * `10_000 * 2_500 / 43_000 / (50*2)` = 5.8 sat/vB for anchor channels with 50 HTLCs in both
	 * directions (the LDK default max from [`ChannelHandshakeConfig::our_max_accepted_htlcs`])
	 * `10_000 * 2_500 / 218_750 / (483*2)` = 0.1 sat/vB for non-anchor channels with 483 HTLCs
	 * in both directions (the maximum),
	 * `10_000 * 2_500 / 218_750 / (50*2)` = 1.1 sat/vB for non-anchor channels with 50 HTLCs
	 * in both (the LDK default maximum from [`ChannelHandshakeConfig::our_max_accepted_htlcs`])
	 * 
	 * Note that when using [`MaxDustHTLCExposure::FeeRateMultiplier`] this maximum disagreement
	 * will scale linearly with increases (or decreases) in the our feerate estimates. Further,
	 * for anchor channels we expect our counterparty to use a relatively low feerate estimate
	 * while we use [`ConfirmationTarget::MaximumFeeEstimate`] (which should be relatively high)
	 * and feerate disagreement force-closures should only occur when theirs is higher than ours.
	 * 
	 * Default value: [`MaxDustHTLCExposure::FeeRateMultiplier`] with a multiplier of `10_000`
	 * 
	 * [`ConfirmationTarget::MaximumFeeEstimate`]: crate::chain::chaininterface::ConfirmationTarget::MaximumFeeEstimate
	 */
	public get_max_dust_htlc_exposure(): MaxDustHTLCExposure {
		const ret: bigint = bindings.ChannelConfig_get_max_dust_htlc_exposure(this.ptr);
		const ret_hu_conv: MaxDustHTLCExposure = MaxDustHTLCExposure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Limit our total exposure to potential loss to on-chain fees on close, including in-flight
	 * HTLCs which are burned to fees as they are too small to claim on-chain and fees on
	 * commitment transaction(s) broadcasted by our counterparty in excess of our own fee estimate.
	 * 
	 * # HTLC-based Dust Exposure
	 * 
	 * When an HTLC present in one of our channels is below a \"dust\" threshold, the HTLC will
	 * not be claimable on-chain, instead being turned into additional miner fees if either
	 * party force-closes the channel. Because the threshold is per-HTLC, our total exposure
	 * to such payments may be substantial if there are many dust HTLCs present when the
	 * channel is force-closed.
	 * 
	 * The dust threshold for each HTLC is based on the `dust_limit_satoshis` for each party in a
	 * channel negotiated throughout the channel open process, along with the fees required to have
	 * a broadcastable HTLC spending transaction. When a channel supports anchor outputs
	 * (specifically the zero fee HTLC transaction variant), this threshold no longer takes into
	 * account the HTLC transaction fee as it is zero. Because of this, you may want to set this
	 * value to a fixed limit for channels using anchor outputs, while the fee rate multiplier
	 * variant is primarily intended for use with pre-anchor channels.
	 * 
	 * The selected limit is applied for sent, forwarded, and received HTLCs and limits the total
	 * exposure across all three types per-channel.
	 * 
	 * # Transaction Fee Dust Exposure
	 * 
	 * Further, counterparties broadcasting a commitment transaction in a force-close may result
	 * in other balance being burned to fees, and thus all fees on commitment and HTLC
	 * transactions in excess of our local fee estimates are included in the dust calculation.
	 * 
	 * Because of this, another way to look at this limit is to divide it by 43,000 (or 218,750
	 * for non-anchor channels) and see it as the maximum feerate disagreement (in sats/vB) per
	 * non-dust HTLC we're allowed to have with our peers before risking a force-closure for
	 * inbound channels.
	 * 
	 * Thus, for the default value of 10_000 * a current feerate estimate of 10 sat/vB (or 2,500
	 * sat/KW), we risk force-closure if we disagree with our peer by:
	 * `10_000 * 2_500 / 43_000 / (483*2)` = 0.6 sat/vB for anchor channels with 483 HTLCs in
	 * both directions (the maximum),
	 * `10_000 * 2_500 / 43_000 / (50*2)` = 5.8 sat/vB for anchor channels with 50 HTLCs in both
	 * directions (the LDK default max from [`ChannelHandshakeConfig::our_max_accepted_htlcs`])
	 * `10_000 * 2_500 / 218_750 / (483*2)` = 0.1 sat/vB for non-anchor channels with 483 HTLCs
	 * in both directions (the maximum),
	 * `10_000 * 2_500 / 218_750 / (50*2)` = 1.1 sat/vB for non-anchor channels with 50 HTLCs
	 * in both (the LDK default maximum from [`ChannelHandshakeConfig::our_max_accepted_htlcs`])
	 * 
	 * Note that when using [`MaxDustHTLCExposure::FeeRateMultiplier`] this maximum disagreement
	 * will scale linearly with increases (or decreases) in the our feerate estimates. Further,
	 * for anchor channels we expect our counterparty to use a relatively low feerate estimate
	 * while we use [`ConfirmationTarget::MaximumFeeEstimate`] (which should be relatively high)
	 * and feerate disagreement force-closures should only occur when theirs is higher than ours.
	 * 
	 * Default value: [`MaxDustHTLCExposure::FeeRateMultiplier`] with a multiplier of `10_000`
	 * 
	 * [`ConfirmationTarget::MaximumFeeEstimate`]: crate::chain::chaininterface::ConfirmationTarget::MaximumFeeEstimate
	 */
	public set_max_dust_htlc_exposure(val: MaxDustHTLCExposure): void {
		bindings.ChannelConfig_set_max_dust_htlc_exposure(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The additional fee we're willing to pay to avoid waiting for the counterparty's
	 * `to_self_delay` to reclaim funds.
	 * 
	 * When we close a channel cooperatively with our counterparty, we negotiate a fee for the
	 * closing transaction which both sides find acceptable, ultimately paid by the channel
	 * funder/initiator.
	 * 
	 * When we are the funder, because we have to pay the channel closing fee, we bound the
	 * acceptable fee by our [`ChannelCloseMinimum`] and [`NonAnchorChannelFee`] fees, with the upper bound increased by
	 * this value. Because the on-chain fee we'd pay to force-close the channel is kept near our
	 * [`NonAnchorChannelFee`] feerate during normal operation, this value represents the additional fee we're
	 * willing to pay in order to avoid waiting for our counterparty's to_self_delay to reclaim our
	 * funds.
	 * 
	 * When we are not the funder, we require the closing transaction fee pay at least our
	 * [`ChannelCloseMinimum`] fee estimate, but allow our counterparty to pay as much fee as they like.
	 * Thus, this value is ignored when we are not the funder.
	 * 
	 * Default value: `1000`
	 * 
	 * [`NonAnchorChannelFee`]: crate::chain::chaininterface::ConfirmationTarget::NonAnchorChannelFee
	 * [`ChannelCloseMinimum`]: crate::chain::chaininterface::ConfirmationTarget::ChannelCloseMinimum
	 */
	public get_force_close_avoidance_max_fee_satoshis(): bigint {
		const ret: bigint = bindings.ChannelConfig_get_force_close_avoidance_max_fee_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The additional fee we're willing to pay to avoid waiting for the counterparty's
	 * `to_self_delay` to reclaim funds.
	 * 
	 * When we close a channel cooperatively with our counterparty, we negotiate a fee for the
	 * closing transaction which both sides find acceptable, ultimately paid by the channel
	 * funder/initiator.
	 * 
	 * When we are the funder, because we have to pay the channel closing fee, we bound the
	 * acceptable fee by our [`ChannelCloseMinimum`] and [`NonAnchorChannelFee`] fees, with the upper bound increased by
	 * this value. Because the on-chain fee we'd pay to force-close the channel is kept near our
	 * [`NonAnchorChannelFee`] feerate during normal operation, this value represents the additional fee we're
	 * willing to pay in order to avoid waiting for our counterparty's to_self_delay to reclaim our
	 * funds.
	 * 
	 * When we are not the funder, we require the closing transaction fee pay at least our
	 * [`ChannelCloseMinimum`] fee estimate, but allow our counterparty to pay as much fee as they like.
	 * Thus, this value is ignored when we are not the funder.
	 * 
	 * Default value: `1000`
	 * 
	 * [`NonAnchorChannelFee`]: crate::chain::chaininterface::ConfirmationTarget::NonAnchorChannelFee
	 * [`ChannelCloseMinimum`]: crate::chain::chaininterface::ConfirmationTarget::ChannelCloseMinimum
	 */
	public set_force_close_avoidance_max_fee_satoshis(val: bigint): void {
		bindings.ChannelConfig_set_force_close_avoidance_max_fee_satoshis(this.ptr, val);
	}

	/**
	 * If set, allows this channel's counterparty to skim an additional fee off this node's inbound
	 * HTLCs. Useful for liquidity providers to offload on-chain channel costs to end users.
	 * 
	 * Usage:
	 * - The payee will set this option and set its invoice route hints to use [intercept scids]
	 * generated by this channel's counterparty.
	 * - The counterparty will get an [`HTLCIntercepted`] event upon payment forward, and call
	 * [`forward_intercepted_htlc`] with less than the amount provided in
	 * [`HTLCIntercepted::expected_outbound_amount_msat`]. The difference between the expected and
	 * actual forward amounts is their fee. See
	 * <https://github.com/BitcoinAndLightningLayerSpecs/lsp/tree/main/LSPS2#flow-lsp-trusts-client-model>
	 * for how this feature may be used in the LSP use case.
	 * 
	 * # Note
	 * It's important for payee wallet software to verify that [`PaymentClaimable::amount_msat`] is
	 * as-expected if this feature is activated, otherwise they may lose money!
	 * [`PaymentClaimable::counterparty_skimmed_fee_msat`] provides the fee taken by the
	 * counterparty.
	 * 
	 * # Note
	 * Switching this config flag on may break compatibility with versions of LDK prior to 0.0.116.
	 * Unsetting this flag between restarts may lead to payment receive failures.
	 * 
	 * Default value: `false`
	 * 
	 * [intercept scids]: crate::ln::channelmanager::ChannelManager::get_intercept_scid
	 * [`forward_intercepted_htlc`]: crate::ln::channelmanager::ChannelManager::forward_intercepted_htlc
	 * [`HTLCIntercepted`]: crate::events::Event::HTLCIntercepted
	 * [`HTLCIntercepted::expected_outbound_amount_msat`]: crate::events::Event::HTLCIntercepted::expected_outbound_amount_msat
	 * [`PaymentClaimable::amount_msat`]: crate::events::Event::PaymentClaimable::amount_msat
	 * [`PaymentClaimable::counterparty_skimmed_fee_msat`]: crate::events::Event::PaymentClaimable::counterparty_skimmed_fee_msat
	 */
	public get_accept_underpaying_htlcs(): boolean {
		const ret: boolean = bindings.ChannelConfig_get_accept_underpaying_htlcs(this.ptr);
		return ret;
	}

	/**
	 * If set, allows this channel's counterparty to skim an additional fee off this node's inbound
	 * HTLCs. Useful for liquidity providers to offload on-chain channel costs to end users.
	 * 
	 * Usage:
	 * - The payee will set this option and set its invoice route hints to use [intercept scids]
	 * generated by this channel's counterparty.
	 * - The counterparty will get an [`HTLCIntercepted`] event upon payment forward, and call
	 * [`forward_intercepted_htlc`] with less than the amount provided in
	 * [`HTLCIntercepted::expected_outbound_amount_msat`]. The difference between the expected and
	 * actual forward amounts is their fee. See
	 * <https://github.com/BitcoinAndLightningLayerSpecs/lsp/tree/main/LSPS2#flow-lsp-trusts-client-model>
	 * for how this feature may be used in the LSP use case.
	 * 
	 * # Note
	 * It's important for payee wallet software to verify that [`PaymentClaimable::amount_msat`] is
	 * as-expected if this feature is activated, otherwise they may lose money!
	 * [`PaymentClaimable::counterparty_skimmed_fee_msat`] provides the fee taken by the
	 * counterparty.
	 * 
	 * # Note
	 * Switching this config flag on may break compatibility with versions of LDK prior to 0.0.116.
	 * Unsetting this flag between restarts may lead to payment receive failures.
	 * 
	 * Default value: `false`
	 * 
	 * [intercept scids]: crate::ln::channelmanager::ChannelManager::get_intercept_scid
	 * [`forward_intercepted_htlc`]: crate::ln::channelmanager::ChannelManager::forward_intercepted_htlc
	 * [`HTLCIntercepted`]: crate::events::Event::HTLCIntercepted
	 * [`HTLCIntercepted::expected_outbound_amount_msat`]: crate::events::Event::HTLCIntercepted::expected_outbound_amount_msat
	 * [`PaymentClaimable::amount_msat`]: crate::events::Event::PaymentClaimable::amount_msat
	 * [`PaymentClaimable::counterparty_skimmed_fee_msat`]: crate::events::Event::PaymentClaimable::counterparty_skimmed_fee_msat
	 */
	public set_accept_underpaying_htlcs(val: boolean): void {
		bindings.ChannelConfig_set_accept_underpaying_htlcs(this.ptr, val);
	}

	/**
	 * Constructs a new ChannelConfig given each field
	 */
	public static constructor_new(forwarding_fee_proportional_millionths_arg: number, forwarding_fee_base_msat_arg: number, cltv_expiry_delta_arg: number, max_dust_htlc_exposure_arg: MaxDustHTLCExposure, force_close_avoidance_max_fee_satoshis_arg: bigint, accept_underpaying_htlcs_arg: boolean): ChannelConfig {
		const ret: bigint = bindings.ChannelConfig_new(forwarding_fee_proportional_millionths_arg, forwarding_fee_base_msat_arg, cltv_expiry_delta_arg, CommonBase.get_ptr_of(max_dust_htlc_exposure_arg), force_close_avoidance_max_fee_satoshis_arg, accept_underpaying_htlcs_arg);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelConfig_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelConfig
	 */
	public clone(): ChannelConfig {
		const ret: bigint = bindings.ChannelConfig_clone(this.ptr);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelConfigs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelConfig): boolean {
		const ret: boolean = bindings.ChannelConfig_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Applies the given [`ChannelConfigUpdate`] as a partial update to the [`ChannelConfig`].
	 */
	public apply(update: ChannelConfigUpdate): void {
		bindings.ChannelConfig_apply(this.ptr, CommonBase.get_ptr_of(update));
	}

	/**
	 * Creates a "default" ChannelConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): ChannelConfig {
		const ret: bigint = bindings.ChannelConfig_default();
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelConfig object into a byte array which can be read by ChannelConfig_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelConfig_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelConfig from a byte array, created by ChannelConfig_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelConfigDecodeErrorZ {
		const ret: bigint = bindings.ChannelConfig_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelConfigDecodeErrorZ = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
