
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Details of a channel, as returned by [`ChannelManager::list_channels`] and [`ChannelManager::list_usable_channels`]
 * 
 * Balances of a channel are available through [`ChainMonitor::get_claimable_balances`] and
 * [`ChannelMonitor::get_claimable_balances`], calculated with respect to the corresponding on-chain
 * transactions.
 * 
 * When a channel is spliced, most fields continue to refer to the original pre-splice channel
 * state until the splice transaction reaches sufficient confirmations to be locked (and we
 * exchange `splice_locked` messages with our peer). See individual fields for details.
 * 
 * [`ChannelManager::list_channels`]: crate::ln::channelmanager::ChannelManager::list_channels
 * [`ChannelManager::list_usable_channels`]: crate::ln::channelmanager::ChannelManager::list_usable_channels
 * [`ChainMonitor::get_claimable_balances`]: crate::chain::chainmonitor::ChainMonitor::get_claimable_balances
 * [`ChannelMonitor::get_claimable_balances`]: crate::chain::channelmonitor::ChannelMonitor::get_claimable_balances
 */
export class ChannelDetails extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelDetails_free);
	}

	/**
	 * The channel's ID (prior to initial channel setup this is a random 32 bytes, thereafter it is
	 * derived from channel funding or key material).
	 * 
	 * Note that this means this value is *not* persistent - it can change once during the
	 * lifetime of the channel.
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.ChannelDetails_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel's ID (prior to initial channel setup this is a random 32 bytes, thereafter it is
	 * derived from channel funding or key material).
	 * 
	 * Note that this means this value is *not* persistent - it can change once during the
	 * lifetime of the channel.
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.ChannelDetails_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Parameters which apply to our counterparty. See individual fields for more information.
	 */
	public get_counterparty(): ChannelCounterparty {
		const ret: bigint = bindings.ChannelDetails_get_counterparty(this.ptr);
		const ret_hu_conv: ChannelCounterparty = new ChannelCounterparty(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Parameters which apply to our counterparty. See individual fields for more information.
	 */
	public set_counterparty(val: ChannelCounterparty): void {
		bindings.ChannelDetails_set_counterparty(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The Channel's funding transaction output, if we've negotiated the funding transaction with
	 * our counterparty already.
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_funding_txo(): OutPoint {
		const ret: bigint = bindings.ChannelDetails_get_funding_txo(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The Channel's funding transaction output, if we've negotiated the funding transaction with
	 * our counterparty already.
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_funding_txo(val: OutPoint|null): void {
		bindings.ChannelDetails_set_funding_txo(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The features which this channel operates with. See individual features for more info.
	 * 
	 * `None` until negotiation completes and the channel type is finalized.
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_channel_type(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelDetails_get_channel_type(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The features which this channel operates with. See individual features for more info.
	 * 
	 * `None` until negotiation completes and the channel type is finalized.
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_channel_type(val: ChannelTypeFeatures|null): void {
		bindings.ChannelDetails_set_channel_type(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The position of the funding transaction in the chain. None if the funding transaction has
	 * not yet been confirmed and the channel fully opened.
	 * 
	 * Note that if [`inbound_scid_alias`] is set, it must be used for invoices and inbound
	 * payments instead of this. See [`get_inbound_payment_scid`].
	 * 
	 * For channels with [`confirmations_required`] set to `Some(0)`, [`outbound_scid_alias`] may
	 * be used in place of this in outbound routes. See [`get_outbound_payment_scid`].
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 * 
	 * [`inbound_scid_alias`]: Self::inbound_scid_alias
	 * [`outbound_scid_alias`]: Self::outbound_scid_alias
	 * [`get_inbound_payment_scid`]: Self::get_inbound_payment_scid
	 * [`get_outbound_payment_scid`]: Self::get_outbound_payment_scid
	 * [`confirmations_required`]: Self::confirmations_required
	 */
	public get_short_channel_id(): Option_u64Z {
		const ret: bigint = bindings.ChannelDetails_get_short_channel_id(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The position of the funding transaction in the chain. None if the funding transaction has
	 * not yet been confirmed and the channel fully opened.
	 * 
	 * Note that if [`inbound_scid_alias`] is set, it must be used for invoices and inbound
	 * payments instead of this. See [`get_inbound_payment_scid`].
	 * 
	 * For channels with [`confirmations_required`] set to `Some(0)`, [`outbound_scid_alias`] may
	 * be used in place of this in outbound routes. See [`get_outbound_payment_scid`].
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 * 
	 * [`inbound_scid_alias`]: Self::inbound_scid_alias
	 * [`outbound_scid_alias`]: Self::outbound_scid_alias
	 * [`get_inbound_payment_scid`]: Self::get_inbound_payment_scid
	 * [`get_outbound_payment_scid`]: Self::get_outbound_payment_scid
	 * [`confirmations_required`]: Self::confirmations_required
	 */
	public set_short_channel_id(val: Option_u64Z): void {
		bindings.ChannelDetails_set_short_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * An optional [`short_channel_id`] alias for this channel, randomly generated by us and
	 * usable in place of [`short_channel_id`] to reference the channel in outbound routes when
	 * the channel has not yet been confirmed (as long as [`confirmations_required`] is
	 * `Some(0)`).
	 * 
	 * This will be `None` as long as the channel is not available for routing outbound payments.
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 * 
	 * [`short_channel_id`]: Self::short_channel_id
	 * [`confirmations_required`]: Self::confirmations_required
	 */
	public get_outbound_scid_alias(): Option_u64Z {
		const ret: bigint = bindings.ChannelDetails_get_outbound_scid_alias(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * An optional [`short_channel_id`] alias for this channel, randomly generated by us and
	 * usable in place of [`short_channel_id`] to reference the channel in outbound routes when
	 * the channel has not yet been confirmed (as long as [`confirmations_required`] is
	 * `Some(0)`).
	 * 
	 * This will be `None` as long as the channel is not available for routing outbound payments.
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 * 
	 * [`short_channel_id`]: Self::short_channel_id
	 * [`confirmations_required`]: Self::confirmations_required
	 */
	public set_outbound_scid_alias(val: Option_u64Z): void {
		bindings.ChannelDetails_set_outbound_scid_alias(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * An optional [`short_channel_id`] alias for this channel, randomly generated by our
	 * counterparty and usable in place of [`short_channel_id`] in invoice route hints. Our
	 * counterparty will recognize the alias provided here in place of the [`short_channel_id`]
	 * when they see a payment to be routed to us.
	 * 
	 * Our counterparty may choose to rotate this value at any time, though will always recognize
	 * previous values for inbound payment forwarding.
	 * 
	 * [`short_channel_id`]: Self::short_channel_id
	 */
	public get_inbound_scid_alias(): Option_u64Z {
		const ret: bigint = bindings.ChannelDetails_get_inbound_scid_alias(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * An optional [`short_channel_id`] alias for this channel, randomly generated by our
	 * counterparty and usable in place of [`short_channel_id`] in invoice route hints. Our
	 * counterparty will recognize the alias provided here in place of the [`short_channel_id`]
	 * when they see a payment to be routed to us.
	 * 
	 * Our counterparty may choose to rotate this value at any time, though will always recognize
	 * previous values for inbound payment forwarding.
	 * 
	 * [`short_channel_id`]: Self::short_channel_id
	 */
	public set_inbound_scid_alias(val: Option_u64Z): void {
		bindings.ChannelDetails_set_inbound_scid_alias(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The value, in satoshis, of this channel as appears in the funding output
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 */
	public get_channel_value_satoshis(): bigint {
		const ret: bigint = bindings.ChannelDetails_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The value, in satoshis, of this channel as appears in the funding output
	 * 
	 * When a channel is spliced, this continues to refer to the original pre-splice channel
	 * state until the splice transaction reaches sufficient confirmations to be locked (and we
	 * exchange `splice_locked` messages with our peer).
	 */
	public set_channel_value_satoshis(val: bigint): void {
		bindings.ChannelDetails_set_channel_value_satoshis(this.ptr, val);
	}

	/**
	 * The value, in satoshis, that must always be held in the channel for us. This value ensures
	 * that if we broadcast a revoked state, our counterparty can punish us by claiming at least
	 * this value on chain.
	 * 
	 * This value is not included in [`outbound_capacity_msat`] as it can never be spent.
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 * 
	 * [`outbound_capacity_msat`]: ChannelDetails::outbound_capacity_msat
	 */
	public get_unspendable_punishment_reserve(): Option_u64Z {
		const ret: bigint = bindings.ChannelDetails_get_unspendable_punishment_reserve(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The value, in satoshis, that must always be held in the channel for us. This value ensures
	 * that if we broadcast a revoked state, our counterparty can punish us by claiming at least
	 * this value on chain.
	 * 
	 * This value is not included in [`outbound_capacity_msat`] as it can never be spent.
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 * 
	 * [`outbound_capacity_msat`]: ChannelDetails::outbound_capacity_msat
	 */
	public set_unspendable_punishment_reserve(val: Option_u64Z): void {
		bindings.ChannelDetails_set_unspendable_punishment_reserve(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.  This may be zero for objects
	 * serialized with LDK versions prior to 0.0.113.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public get_user_channel_id(): bigint {
		const ret: number = bindings.ChannelDetails_get_user_channel_id(this.ptr);
		const ret_conv: bigint = bindings.decodeUint128(ret);
		return ret_conv;
	}

	/**
	 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
	 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
	 * `user_channel_id` will be randomized for an inbound channel.  This may be zero for objects
	 * serialized with LDK versions prior to 0.0.113.
	 * 
	 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public set_user_channel_id(val: bigint): void {
		bindings.ChannelDetails_set_user_channel_id(this.ptr, bindings.encodeUint128(val));
	}

	/**
	 * The currently negotiated fee rate denominated in satoshi per 1000 weight units,
	 * which is applied to commitment and HTLC transactions.
	 * 
	 * This value will be `None` for objects serialized with LDK versions prior to 0.0.115.
	 */
	public get_feerate_sat_per_1000_weight(): Option_u32Z {
		const ret: bigint = bindings.ChannelDetails_get_feerate_sat_per_1000_weight(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The currently negotiated fee rate denominated in satoshi per 1000 weight units,
	 * which is applied to commitment and HTLC transactions.
	 * 
	 * This value will be `None` for objects serialized with LDK versions prior to 0.0.115.
	 */
	public set_feerate_sat_per_1000_weight(val: Option_u32Z): void {
		bindings.ChannelDetails_set_feerate_sat_per_1000_weight(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The available outbound capacity for sending HTLCs to the remote peer. This does not include
	 * any pending HTLCs which are not yet fully resolved (and, thus, whose balance is not
	 * available for inclusion in new outbound HTLCs). This further does not include any pending
	 * outgoing HTLCs which are awaiting some other resolution to be sent.
	 * 
	 * This value is not exact. Due to various in-flight changes, feerate changes, and our
	 * conflict-avoidance policy, exactly this amount is not likely to be spendable. However, we
	 * should be able to spend nearly this amount.
	 */
	public get_outbound_capacity_msat(): bigint {
		const ret: bigint = bindings.ChannelDetails_get_outbound_capacity_msat(this.ptr);
		return ret;
	}

	/**
	 * The available outbound capacity for sending HTLCs to the remote peer. This does not include
	 * any pending HTLCs which are not yet fully resolved (and, thus, whose balance is not
	 * available for inclusion in new outbound HTLCs). This further does not include any pending
	 * outgoing HTLCs which are awaiting some other resolution to be sent.
	 * 
	 * This value is not exact. Due to various in-flight changes, feerate changes, and our
	 * conflict-avoidance policy, exactly this amount is not likely to be spendable. However, we
	 * should be able to spend nearly this amount.
	 */
	public set_outbound_capacity_msat(val: bigint): void {
		bindings.ChannelDetails_set_outbound_capacity_msat(this.ptr, val);
	}

	/**
	 * The available outbound capacity for sending a single HTLC to the remote peer. This is
	 * similar to [`ChannelDetails::outbound_capacity_msat`] but it may be further restricted by
	 * the current state and per-HTLC limit(s). This is intended for use when routing, allowing us
	 * to use a limit as close as possible to the HTLC limit we can currently send.
	 * 
	 * See also [`ChannelDetails::next_outbound_htlc_minimum_msat`] and
	 * [`ChannelDetails::outbound_capacity_msat`].
	 */
	public get_next_outbound_htlc_limit_msat(): bigint {
		const ret: bigint = bindings.ChannelDetails_get_next_outbound_htlc_limit_msat(this.ptr);
		return ret;
	}

	/**
	 * The available outbound capacity for sending a single HTLC to the remote peer. This is
	 * similar to [`ChannelDetails::outbound_capacity_msat`] but it may be further restricted by
	 * the current state and per-HTLC limit(s). This is intended for use when routing, allowing us
	 * to use a limit as close as possible to the HTLC limit we can currently send.
	 * 
	 * See also [`ChannelDetails::next_outbound_htlc_minimum_msat`] and
	 * [`ChannelDetails::outbound_capacity_msat`].
	 */
	public set_next_outbound_htlc_limit_msat(val: bigint): void {
		bindings.ChannelDetails_set_next_outbound_htlc_limit_msat(this.ptr, val);
	}

	/**
	 * The minimum value for sending a single HTLC to the remote peer. This is the equivalent of
	 * [`ChannelDetails::next_outbound_htlc_limit_msat`] but represents a lower-bound, rather than
	 * an upper-bound. This is intended for use when routing, allowing us to ensure we pick a
	 * route which is valid.
	 */
	public get_next_outbound_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.ChannelDetails_get_next_outbound_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum value for sending a single HTLC to the remote peer. This is the equivalent of
	 * [`ChannelDetails::next_outbound_htlc_limit_msat`] but represents a lower-bound, rather than
	 * an upper-bound. This is intended for use when routing, allowing us to ensure we pick a
	 * route which is valid.
	 */
	public set_next_outbound_htlc_minimum_msat(val: bigint): void {
		bindings.ChannelDetails_set_next_outbound_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * The available inbound capacity for the remote peer to send HTLCs to us. This does not
	 * include any pending HTLCs which are not yet fully resolved (and, thus, whose balance is not
	 * available for inclusion in new inbound HTLCs).
	 * Note that there are some corner cases not fully handled here, so the actual available
	 * inbound capacity may be slightly higher than this.
	 * 
	 * This value is not exact. Due to various in-flight changes, feerate changes, and our
	 * counterparty's conflict-avoidance policy, exactly this amount is not likely to be spendable.
	 * However, our counterparty should be able to spend nearly this amount.
	 */
	public get_inbound_capacity_msat(): bigint {
		const ret: bigint = bindings.ChannelDetails_get_inbound_capacity_msat(this.ptr);
		return ret;
	}

	/**
	 * The available inbound capacity for the remote peer to send HTLCs to us. This does not
	 * include any pending HTLCs which are not yet fully resolved (and, thus, whose balance is not
	 * available for inclusion in new inbound HTLCs).
	 * Note that there are some corner cases not fully handled here, so the actual available
	 * inbound capacity may be slightly higher than this.
	 * 
	 * This value is not exact. Due to various in-flight changes, feerate changes, and our
	 * counterparty's conflict-avoidance policy, exactly this amount is not likely to be spendable.
	 * However, our counterparty should be able to spend nearly this amount.
	 */
	public set_inbound_capacity_msat(val: bigint): void {
		bindings.ChannelDetails_set_inbound_capacity_msat(this.ptr, val);
	}

	/**
	 * The number of required confirmations on the funding transaction before the funding will be
	 * considered \"locked\". This number is selected by the channel fundee (i.e. us if
	 * [`is_outbound`] is *not* set), and can be selected for inbound channels with
	 * [`ChannelHandshakeConfig::minimum_depth`] or limited for outbound channels with
	 * [`ChannelHandshakeLimits::max_minimum_depth`].
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 * 
	 * [`is_outbound`]: ChannelDetails::is_outbound
	 * [`ChannelHandshakeConfig::minimum_depth`]: crate::util::config::ChannelHandshakeConfig::minimum_depth
	 * [`ChannelHandshakeLimits::max_minimum_depth`]: crate::util::config::ChannelHandshakeLimits::max_minimum_depth
	 */
	public get_confirmations_required(): Option_u32Z {
		const ret: bigint = bindings.ChannelDetails_get_confirmations_required(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The number of required confirmations on the funding transaction before the funding will be
	 * considered \"locked\". This number is selected by the channel fundee (i.e. us if
	 * [`is_outbound`] is *not* set), and can be selected for inbound channels with
	 * [`ChannelHandshakeConfig::minimum_depth`] or limited for outbound channels with
	 * [`ChannelHandshakeLimits::max_minimum_depth`].
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 * 
	 * [`is_outbound`]: ChannelDetails::is_outbound
	 * [`ChannelHandshakeConfig::minimum_depth`]: crate::util::config::ChannelHandshakeConfig::minimum_depth
	 * [`ChannelHandshakeLimits::max_minimum_depth`]: crate::util::config::ChannelHandshakeLimits::max_minimum_depth
	 */
	public set_confirmations_required(val: Option_u32Z): void {
		bindings.ChannelDetails_set_confirmations_required(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The current number of confirmations on the funding transaction.
	 * 
	 * This value will be `None` for objects serialized with LDK versions prior to 0.0.113.
	 */
	public get_confirmations(): Option_u32Z {
		const ret: bigint = bindings.ChannelDetails_get_confirmations(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The current number of confirmations on the funding transaction.
	 * 
	 * This value will be `None` for objects serialized with LDK versions prior to 0.0.113.
	 */
	public set_confirmations(val: Option_u32Z): void {
		bindings.ChannelDetails_set_confirmations(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The number of blocks (after our commitment transaction confirms) that we will need to wait
	 * until we can claim our funds after we force-close the channel. During this time our
	 * counterparty is allowed to punish us if we broadcasted a stale state. If our counterparty
	 * force-closes the channel and broadcasts a commitment transaction we do not have to wait any
	 * time to claim our non-HTLC-encumbered funds.
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 */
	public get_force_close_spend_delay(): Option_u16Z {
		const ret: bigint = bindings.ChannelDetails_get_force_close_spend_delay(this.ptr);
		const ret_hu_conv: Option_u16Z = Option_u16Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The number of blocks (after our commitment transaction confirms) that we will need to wait
	 * until we can claim our funds after we force-close the channel. During this time our
	 * counterparty is allowed to punish us if we broadcasted a stale state. If our counterparty
	 * force-closes the channel and broadcasts a commitment transaction we do not have to wait any
	 * time to claim our non-HTLC-encumbered funds.
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 */
	public set_force_close_spend_delay(val: Option_u16Z): void {
		bindings.ChannelDetails_set_force_close_spend_delay(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * True if the channel was initiated (and thus funded) by us.
	 */
	public get_is_outbound(): boolean {
		const ret: boolean = bindings.ChannelDetails_get_is_outbound(this.ptr);
		return ret;
	}

	/**
	 * True if the channel was initiated (and thus funded) by us.
	 */
	public set_is_outbound(val: boolean): void {
		bindings.ChannelDetails_set_is_outbound(this.ptr, val);
	}

	/**
	 * True if the channel is confirmed, channel_ready messages have been exchanged, and the
	 * channel is not currently being shut down. `channel_ready` message exchange implies the
	 * required confirmation count has been reached (and we were connected to the peer at some
	 * point after the funding transaction received enough confirmations). The required
	 * confirmation count is provided in [`confirmations_required`].
	 * 
	 * [`confirmations_required`]: ChannelDetails::confirmations_required
	 */
	public get_is_channel_ready(): boolean {
		const ret: boolean = bindings.ChannelDetails_get_is_channel_ready(this.ptr);
		return ret;
	}

	/**
	 * True if the channel is confirmed, channel_ready messages have been exchanged, and the
	 * channel is not currently being shut down. `channel_ready` message exchange implies the
	 * required confirmation count has been reached (and we were connected to the peer at some
	 * point after the funding transaction received enough confirmations). The required
	 * confirmation count is provided in [`confirmations_required`].
	 * 
	 * [`confirmations_required`]: ChannelDetails::confirmations_required
	 */
	public set_is_channel_ready(val: boolean): void {
		bindings.ChannelDetails_set_is_channel_ready(this.ptr, val);
	}

	/**
	 * The stage of the channel's shutdown.
	 * `None` for `ChannelDetails` serialized on LDK versions prior to 0.0.116.
	 * 
	 * Returns a copy of the field.
	 */
	public get_channel_shutdown_state(): Option_ChannelShutdownStateZ {
		const ret: bigint = bindings.ChannelDetails_get_channel_shutdown_state(this.ptr);
		const ret_hu_conv: Option_ChannelShutdownStateZ = Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The stage of the channel's shutdown.
	 * `None` for `ChannelDetails` serialized on LDK versions prior to 0.0.116.
	 */
	public set_channel_shutdown_state(val: Option_ChannelShutdownStateZ): void {
		bindings.ChannelDetails_set_channel_shutdown_state(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * True if the channel is (a) confirmed and channel_ready messages have been exchanged, (b)
	 * the peer is connected, and (c) the channel is not currently negotiating a shutdown.
	 * 
	 * This is a strict superset of `is_channel_ready`.
	 */
	public get_is_usable(): boolean {
		const ret: boolean = bindings.ChannelDetails_get_is_usable(this.ptr);
		return ret;
	}

	/**
	 * True if the channel is (a) confirmed and channel_ready messages have been exchanged, (b)
	 * the peer is connected, and (c) the channel is not currently negotiating a shutdown.
	 * 
	 * This is a strict superset of `is_channel_ready`.
	 */
	public set_is_usable(val: boolean): void {
		bindings.ChannelDetails_set_is_usable(this.ptr, val);
	}

	/**
	 * True if this channel is (or will be) publicly-announced.
	 */
	public get_is_announced(): boolean {
		const ret: boolean = bindings.ChannelDetails_get_is_announced(this.ptr);
		return ret;
	}

	/**
	 * True if this channel is (or will be) publicly-announced.
	 */
	public set_is_announced(val: boolean): void {
		bindings.ChannelDetails_set_is_announced(this.ptr, val);
	}

	/**
	 * The smallest value HTLC (in msat) we will accept, for this channel. This field
	 * is only `None` for `ChannelDetails` objects serialized prior to LDK 0.0.107
	 */
	public get_inbound_htlc_minimum_msat(): Option_u64Z {
		const ret: bigint = bindings.ChannelDetails_get_inbound_htlc_minimum_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The smallest value HTLC (in msat) we will accept, for this channel. This field
	 * is only `None` for `ChannelDetails` objects serialized prior to LDK 0.0.107
	 */
	public set_inbound_htlc_minimum_msat(val: Option_u64Z): void {
		bindings.ChannelDetails_set_inbound_htlc_minimum_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The largest value HTLC (in msat) we currently will accept, for this channel.
	 */
	public get_inbound_htlc_maximum_msat(): Option_u64Z {
		const ret: bigint = bindings.ChannelDetails_get_inbound_htlc_maximum_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The largest value HTLC (in msat) we currently will accept, for this channel.
	 */
	public set_inbound_htlc_maximum_msat(val: Option_u64Z): void {
		bindings.ChannelDetails_set_inbound_htlc_maximum_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Set of configurable parameters that affect channel operation.
	 * 
	 * This field is only `None` for `ChannelDetails` objects serialized prior to LDK 0.0.109.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_config(): ChannelConfig {
		const ret: bigint = bindings.ChannelDetails_get_config(this.ptr);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Set of configurable parameters that affect channel operation.
	 * 
	 * This field is only `None` for `ChannelDetails` objects serialized prior to LDK 0.0.109.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_config(val: ChannelConfig|null): void {
		bindings.ChannelDetails_set_config(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Pending inbound HTLCs.
	 * 
	 * This field is empty for objects serialized with LDK versions prior to 0.0.122.
	 */
	public get_pending_inbound_htlcs(): InboundHTLCDetails[] {
		const ret: number = bindings.ChannelDetails_get_pending_inbound_htlcs(this.ptr);
		const ret_conv_20_len: number = bindings.getArrayLength(ret);
		const ret_conv_20_arr: InboundHTLCDetails[] = new Array(ret_conv_20_len).fill(null);
		for (var u = 0; u < ret_conv_20_len; u++) {
			const ret_conv_20: bigint = bindings.getU64ArrayElem(ret, u);
			const ret_conv_20_hu_conv: InboundHTLCDetails = new InboundHTLCDetails(null, ret_conv_20);
			CommonBase.add_ref_from(ret_conv_20_hu_conv, this);
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_20_arr;
	}

	/**
	 * Pending inbound HTLCs.
	 * 
	 * This field is empty for objects serialized with LDK versions prior to 0.0.122.
	 */
	public set_pending_inbound_htlcs(val: InboundHTLCDetails[]): void {
		bindings.ChannelDetails_set_pending_inbound_htlcs(this.ptr, bindings.encodeUint64Array(val.map(val_conv_20 => CommonBase.get_ptr_of(val_conv_20))));
	}

	/**
	 * Pending outbound HTLCs.
	 * 
	 * This field is empty for objects serialized with LDK versions prior to 0.0.122.
	 */
	public get_pending_outbound_htlcs(): OutboundHTLCDetails[] {
		const ret: number = bindings.ChannelDetails_get_pending_outbound_htlcs(this.ptr);
		const ret_conv_21_len: number = bindings.getArrayLength(ret);
		const ret_conv_21_arr: OutboundHTLCDetails[] = new Array(ret_conv_21_len).fill(null);
		for (var v = 0; v < ret_conv_21_len; v++) {
			const ret_conv_21: bigint = bindings.getU64ArrayElem(ret, v);
			const ret_conv_21_hu_conv: OutboundHTLCDetails = new OutboundHTLCDetails(null, ret_conv_21);
			CommonBase.add_ref_from(ret_conv_21_hu_conv, this);
			ret_conv_21_arr[v] = ret_conv_21_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_21_arr;
	}

	/**
	 * Pending outbound HTLCs.
	 * 
	 * This field is empty for objects serialized with LDK versions prior to 0.0.122.
	 */
	public set_pending_outbound_htlcs(val: OutboundHTLCDetails[]): void {
		bindings.ChannelDetails_set_pending_outbound_htlcs(this.ptr, bindings.encodeUint64Array(val.map(val_conv_21 => CommonBase.get_ptr_of(val_conv_21))));
	}

	/**
	 * The witness script that is used to lock the channel's funding output to commitment
	 * transactions.
	 * 
	 * When a channel is spliced, this continues to refer to the original funding output (which
	 * was spent by the splice transaction) until the splice transaction reached sufficient
	 * confirmations to be locked (and we exchange `splice_locked` messages with our peer).
	 * 
	 * This field will be `None` for objects serialized with LDK versions prior to 0.2.0.
	 */
	public get_funding_redeem_script(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.ChannelDetails_get_funding_redeem_script(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The witness script that is used to lock the channel's funding output to commitment
	 * transactions.
	 * 
	 * When a channel is spliced, this continues to refer to the original funding output (which
	 * was spent by the splice transaction) until the splice transaction reached sufficient
	 * confirmations to be locked (and we exchange `splice_locked` messages with our peer).
	 * 
	 * This field will be `None` for objects serialized with LDK versions prior to 0.2.0.
	 */
	public set_funding_redeem_script(val: Option_CVec_u8ZZ): void {
		bindings.ChannelDetails_set_funding_redeem_script(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelDetails given each field
	 * 
	 * Note that funding_txo_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that channel_type_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that config_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(channel_id_arg: ChannelId, counterparty_arg: ChannelCounterparty, funding_txo_arg: OutPoint|null, channel_type_arg: ChannelTypeFeatures|null, short_channel_id_arg: Option_u64Z, outbound_scid_alias_arg: Option_u64Z, inbound_scid_alias_arg: Option_u64Z, channel_value_satoshis_arg: bigint, unspendable_punishment_reserve_arg: Option_u64Z, user_channel_id_arg: bigint, feerate_sat_per_1000_weight_arg: Option_u32Z, outbound_capacity_msat_arg: bigint, next_outbound_htlc_limit_msat_arg: bigint, next_outbound_htlc_minimum_msat_arg: bigint, inbound_capacity_msat_arg: bigint, confirmations_required_arg: Option_u32Z, confirmations_arg: Option_u32Z, force_close_spend_delay_arg: Option_u16Z, is_outbound_arg: boolean, is_channel_ready_arg: boolean, channel_shutdown_state_arg: Option_ChannelShutdownStateZ, is_usable_arg: boolean, is_announced_arg: boolean, inbound_htlc_minimum_msat_arg: Option_u64Z, inbound_htlc_maximum_msat_arg: Option_u64Z, config_arg: ChannelConfig|null, pending_inbound_htlcs_arg: InboundHTLCDetails[], pending_outbound_htlcs_arg: OutboundHTLCDetails[], funding_redeem_script_arg: Option_CVec_u8ZZ): ChannelDetails {
		const ret: bigint = bindings.ChannelDetails_new(CommonBase.get_ptr_of(channel_id_arg), CommonBase.get_ptr_of(counterparty_arg), funding_txo_arg == null ? 0n : CommonBase.get_ptr_of(funding_txo_arg), channel_type_arg == null ? 0n : CommonBase.get_ptr_of(channel_type_arg), CommonBase.get_ptr_of(short_channel_id_arg), CommonBase.get_ptr_of(outbound_scid_alias_arg), CommonBase.get_ptr_of(inbound_scid_alias_arg), channel_value_satoshis_arg, CommonBase.get_ptr_of(unspendable_punishment_reserve_arg), bindings.encodeUint128(user_channel_id_arg), CommonBase.get_ptr_of(feerate_sat_per_1000_weight_arg), outbound_capacity_msat_arg, next_outbound_htlc_limit_msat_arg, next_outbound_htlc_minimum_msat_arg, inbound_capacity_msat_arg, CommonBase.get_ptr_of(confirmations_required_arg), CommonBase.get_ptr_of(confirmations_arg), CommonBase.get_ptr_of(force_close_spend_delay_arg), is_outbound_arg, is_channel_ready_arg, CommonBase.get_ptr_of(channel_shutdown_state_arg), is_usable_arg, is_announced_arg, CommonBase.get_ptr_of(inbound_htlc_minimum_msat_arg), CommonBase.get_ptr_of(inbound_htlc_maximum_msat_arg), config_arg == null ? 0n : CommonBase.get_ptr_of(config_arg), bindings.encodeUint64Array(pending_inbound_htlcs_arg.map(pending_inbound_htlcs_arg_conv_20 => CommonBase.get_ptr_of(pending_inbound_htlcs_arg_conv_20))), bindings.encodeUint64Array(pending_outbound_htlcs_arg.map(pending_outbound_htlcs_arg_conv_21 => CommonBase.get_ptr_of(pending_outbound_htlcs_arg_conv_21))), CommonBase.get_ptr_of(funding_redeem_script_arg));
		const ret_hu_conv: ChannelDetails = new ChannelDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelDetails_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelDetails
	 */
	public clone(): ChannelDetails {
		const ret: bigint = bindings.ChannelDetails_clone(this.ptr);
		const ret_hu_conv: ChannelDetails = new ChannelDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets the current SCID which should be used to identify this channel for inbound payments.
	 * This should be used for providing invoice hints or in any other context where our
	 * counterparty will forward a payment to us.
	 * 
	 * This is either the [`ChannelDetails::inbound_scid_alias`], if set, or the
	 * [`ChannelDetails::short_channel_id`]. See those for more information.
	 */
	public get_inbound_payment_scid(): Option_u64Z {
		const ret: bigint = bindings.ChannelDetails_get_inbound_payment_scid(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets the current SCID which should be used to identify this channel for outbound payments.
	 * This should be used in [`Route`]s to describe the first hop or in other contexts where
	 * we're sending or forwarding a payment outbound over this channel.
	 * 
	 * This is either the [`ChannelDetails::short_channel_id`], if set, or the
	 * [`ChannelDetails::outbound_scid_alias`]. See those for more information.
	 * 
	 * [`Route`]: crate::routing::router::Route
	 */
	public get_outbound_payment_scid(): Option_u64Z {
		const ret: bigint = bindings.ChannelDetails_get_outbound_payment_scid(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets the funding output for this channel, if available.
	 * 
	 * When a channel is spliced, this continues to refer to the original funding output (which
	 * was spent by the splice transaction) until the splice transaction reaches sufficient
	 * confirmations to be locked (and we exchange `splice_locked` messages with our peer).
	 */
	public get_funding_output(): Option_TxOutZ {
		const ret: bigint = bindings.ChannelDetails_get_funding_output(this.ptr);
		const ret_hu_conv: Option_TxOutZ = Option_TxOutZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelDetails object into a byte array which can be read by ChannelDetails_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelDetails_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelDetails from a byte array, created by ChannelDetails_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelDetailsDecodeErrorZ {
		const ret: bigint = bindings.ChannelDetails_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelDetailsDecodeErrorZ = Result_ChannelDetailsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
