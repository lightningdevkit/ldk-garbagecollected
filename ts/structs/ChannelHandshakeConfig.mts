
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Configuration we set when applicable.
 * 
 * `Default::default()` provides sane defaults.
 */
export class ChannelHandshakeConfig extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelHandshakeConfig_free);
	}

	/**
	 * Confirmations we will wait for before considering the channel locked in.
	 * Applied only for inbound channels (see [`ChannelHandshakeLimits::max_minimum_depth`] for the
	 * equivalent limit applied to outbound channels).
	 * 
	 * Also used when splicing the channel for the number of confirmations needed before sending a
	 * `splice_locked` message to the counterparty. The spliced funds are considered locked in when
	 * both parties have exchanged `splice_locked`.
	 * 
	 * A lower-bound of `1` is applied, requiring all channels to have a confirmed commitment
	 * transaction before operation. If you wish to accept channels with zero confirmations, see
	 * [`UserConfig::manually_accept_inbound_channels`] and
	 * [`ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`].
	 * 
	 * Default value: `6`
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel_from_trusted_peer_0conf
	 */
	public get_minimum_depth(): number {
		const ret: number = bindings.ChannelHandshakeConfig_get_minimum_depth(this.ptr);
		return ret;
	}

	/**
	 * Confirmations we will wait for before considering the channel locked in.
	 * Applied only for inbound channels (see [`ChannelHandshakeLimits::max_minimum_depth`] for the
	 * equivalent limit applied to outbound channels).
	 * 
	 * Also used when splicing the channel for the number of confirmations needed before sending a
	 * `splice_locked` message to the counterparty. The spliced funds are considered locked in when
	 * both parties have exchanged `splice_locked`.
	 * 
	 * A lower-bound of `1` is applied, requiring all channels to have a confirmed commitment
	 * transaction before operation. If you wish to accept channels with zero confirmations, see
	 * [`UserConfig::manually_accept_inbound_channels`] and
	 * [`ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`].
	 * 
	 * Default value: `6`
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel_from_trusted_peer_0conf
	 */
	public set_minimum_depth(val: number): void {
		bindings.ChannelHandshakeConfig_set_minimum_depth(this.ptr, val);
	}

	/**
	 * Set to the number of blocks we require our counterparty to wait to claim their money (ie
	 * the number of blocks we have to punish our counterparty if they broadcast a revoked
	 * transaction).
	 * 
	 * This is one of the main parameters of our security model. We (or one of our watchtowers) MUST
	 * be online to check for revoked transactions on-chain at least once every our_to_self_delay
	 * blocks (minus some margin to allow us enough time to broadcast and confirm a transaction,
	 * possibly with time in between to RBF the spending transaction).
	 * 
	 * Meanwhile, asking for a too high delay, we bother peer to freeze funds for nothing in
	 * case of an honest unilateral channel close, which implicitly decrease the economic value of
	 * our channel.
	 * 
	 * Default value: [`BREAKDOWN_TIMEOUT`] (We enforce it as a minimum at channel opening so you
	 * can tweak config to ask for more security, not less.)
	 */
	public get_our_to_self_delay(): number {
		const ret: number = bindings.ChannelHandshakeConfig_get_our_to_self_delay(this.ptr);
		return ret;
	}

	/**
	 * Set to the number of blocks we require our counterparty to wait to claim their money (ie
	 * the number of blocks we have to punish our counterparty if they broadcast a revoked
	 * transaction).
	 * 
	 * This is one of the main parameters of our security model. We (or one of our watchtowers) MUST
	 * be online to check for revoked transactions on-chain at least once every our_to_self_delay
	 * blocks (minus some margin to allow us enough time to broadcast and confirm a transaction,
	 * possibly with time in between to RBF the spending transaction).
	 * 
	 * Meanwhile, asking for a too high delay, we bother peer to freeze funds for nothing in
	 * case of an honest unilateral channel close, which implicitly decrease the economic value of
	 * our channel.
	 * 
	 * Default value: [`BREAKDOWN_TIMEOUT`] (We enforce it as a minimum at channel opening so you
	 * can tweak config to ask for more security, not less.)
	 */
	public set_our_to_self_delay(val: number): void {
		bindings.ChannelHandshakeConfig_set_our_to_self_delay(this.ptr, val);
	}

	/**
	 * Set to the smallest value HTLC we will accept to process.
	 * 
	 * This value is sent to our counterparty on channel-open and we close the channel any time
	 * our counterparty misbehaves by sending us an HTLC with a value smaller than this.
	 * 
	 * Default value: `1` (If the value is less than `1`, it is ignored and set to `1`, as is
	 * required by the protocol.
	 */
	public get_our_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.ChannelHandshakeConfig_get_our_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * Set to the smallest value HTLC we will accept to process.
	 * 
	 * This value is sent to our counterparty on channel-open and we close the channel any time
	 * our counterparty misbehaves by sending us an HTLC with a value smaller than this.
	 * 
	 * Default value: `1` (If the value is less than `1`, it is ignored and set to `1`, as is
	 * required by the protocol.
	 */
	public set_our_htlc_minimum_msat(val: bigint): void {
		bindings.ChannelHandshakeConfig_set_our_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * Sets the percentage of the channel value we will cap the total value of outstanding inbound
	 * HTLCs to.
	 * 
	 * This can be set to a value between 1-100, where the value corresponds to the percent of the
	 * channel value in whole percentages.
	 * 
	 * Note that:
	 * If configured to another value than the default value `10`, any new channels created with
	 * the non default value will cause versions of LDK prior to 0.0.104 to refuse to read the
	 * `ChannelManager`.
	 * 
	 * This caps the total value for inbound HTLCs in-flight only, and there's currently
	 * no way to configure the cap for the total value of outbound HTLCs in-flight.
	 * 
	 * The requirements for your node being online to ensure the safety of HTLC-encumbered funds
	 * are different from the non-HTLC-encumbered funds. This makes this an important knob to
	 * restrict exposure to loss due to being offline for too long.
	 * See [`ChannelHandshakeConfig::our_to_self_delay`] and [`ChannelConfig::cltv_expiry_delta`]
	 * for more information.
	 * 
	 * Default value: `10`
	 * 
	 * Minimum value: `1` (Any values less will be treated as `1` instead.)
	 * 
	 * Maximum value: `100` (Any values larger will be treated as `100` instead.)
	 */
	public get_max_inbound_htlc_value_in_flight_percent_of_channel(): number {
		const ret: number = bindings.ChannelHandshakeConfig_get_max_inbound_htlc_value_in_flight_percent_of_channel(this.ptr);
		return ret;
	}

	/**
	 * Sets the percentage of the channel value we will cap the total value of outstanding inbound
	 * HTLCs to.
	 * 
	 * This can be set to a value between 1-100, where the value corresponds to the percent of the
	 * channel value in whole percentages.
	 * 
	 * Note that:
	 * If configured to another value than the default value `10`, any new channels created with
	 * the non default value will cause versions of LDK prior to 0.0.104 to refuse to read the
	 * `ChannelManager`.
	 * 
	 * This caps the total value for inbound HTLCs in-flight only, and there's currently
	 * no way to configure the cap for the total value of outbound HTLCs in-flight.
	 * 
	 * The requirements for your node being online to ensure the safety of HTLC-encumbered funds
	 * are different from the non-HTLC-encumbered funds. This makes this an important knob to
	 * restrict exposure to loss due to being offline for too long.
	 * See [`ChannelHandshakeConfig::our_to_self_delay`] and [`ChannelConfig::cltv_expiry_delta`]
	 * for more information.
	 * 
	 * Default value: `10`
	 * 
	 * Minimum value: `1` (Any values less will be treated as `1` instead.)
	 * 
	 * Maximum value: `100` (Any values larger will be treated as `100` instead.)
	 */
	public set_max_inbound_htlc_value_in_flight_percent_of_channel(val: number): void {
		bindings.ChannelHandshakeConfig_set_max_inbound_htlc_value_in_flight_percent_of_channel(this.ptr, val);
	}

	/**
	 * If set, we attempt to negotiate the `scid_privacy` (referred to as `scid_alias` in the
	 * BOLTs) option for outbound private channels. This provides better privacy by not including
	 * our real on-chain channel UTXO in each invoice and requiring that our counterparty only
	 * relay HTLCs to us using the channel's SCID alias.
	 * 
	 * If this option is set, channels may be created that will not be readable by LDK versions
	 * prior to 0.0.106, causing [`ChannelManager`]'s read method to return a
	 * [`DecodeError::InvalidValue`].
	 * 
	 * Note that setting this to true does *not* prevent us from opening channels with
	 * counterparties that do not support the `scid_alias` option; we will simply fall back to a
	 * private channel without that option.
	 * 
	 * Ignored if the channel is negotiated to be announced, see
	 * [`ChannelHandshakeConfig::announce_for_forwarding`] and
	 * [`ChannelHandshakeLimits::force_announced_channel_preference`] for more.
	 * 
	 * Default value: `false` (This value is likely to change to `true` in the future.)
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 */
	public get_negotiate_scid_privacy(): boolean {
		const ret: boolean = bindings.ChannelHandshakeConfig_get_negotiate_scid_privacy(this.ptr);
		return ret;
	}

	/**
	 * If set, we attempt to negotiate the `scid_privacy` (referred to as `scid_alias` in the
	 * BOLTs) option for outbound private channels. This provides better privacy by not including
	 * our real on-chain channel UTXO in each invoice and requiring that our counterparty only
	 * relay HTLCs to us using the channel's SCID alias.
	 * 
	 * If this option is set, channels may be created that will not be readable by LDK versions
	 * prior to 0.0.106, causing [`ChannelManager`]'s read method to return a
	 * [`DecodeError::InvalidValue`].
	 * 
	 * Note that setting this to true does *not* prevent us from opening channels with
	 * counterparties that do not support the `scid_alias` option; we will simply fall back to a
	 * private channel without that option.
	 * 
	 * Ignored if the channel is negotiated to be announced, see
	 * [`ChannelHandshakeConfig::announce_for_forwarding`] and
	 * [`ChannelHandshakeLimits::force_announced_channel_preference`] for more.
	 * 
	 * Default value: `false` (This value is likely to change to `true` in the future.)
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 */
	public set_negotiate_scid_privacy(val: boolean): void {
		bindings.ChannelHandshakeConfig_set_negotiate_scid_privacy(this.ptr, val);
	}

	/**
	 * Set to announce the channel publicly and notify all nodes that they can route via this
	 * channel.
	 * 
	 * This should only be set to true for nodes which expect to be online reliably.
	 * 
	 * As the node which funds a channel picks this value this will only apply for new outbound
	 * channels unless [`ChannelHandshakeLimits::force_announced_channel_preference`] is set.
	 * 
	 * Default value: `false`
	 */
	public get_announce_for_forwarding(): boolean {
		const ret: boolean = bindings.ChannelHandshakeConfig_get_announce_for_forwarding(this.ptr);
		return ret;
	}

	/**
	 * Set to announce the channel publicly and notify all nodes that they can route via this
	 * channel.
	 * 
	 * This should only be set to true for nodes which expect to be online reliably.
	 * 
	 * As the node which funds a channel picks this value this will only apply for new outbound
	 * channels unless [`ChannelHandshakeLimits::force_announced_channel_preference`] is set.
	 * 
	 * Default value: `false`
	 */
	public set_announce_for_forwarding(val: boolean): void {
		bindings.ChannelHandshakeConfig_set_announce_for_forwarding(this.ptr, val);
	}

	/**
	 * When set, we commit to an upfront shutdown_pubkey at channel open. If our counterparty
	 * supports it, they will then enforce the mutual-close output to us matches what we provided
	 * at intialization, preventing us from closing to an alternate pubkey.
	 * 
	 * This is set to true by default to provide a slight increase in security, though ultimately
	 * any attacker who is able to take control of a channel can just as easily send the funds via
	 * lightning payments, so we never require that our counterparties support this option.
	 * 
	 * The upfront key committed is provided from [`SignerProvider::get_shutdown_scriptpubkey`].
	 * 
	 * Default value: `true`
	 * 
	 * [`SignerProvider::get_shutdown_scriptpubkey`]: crate::sign::SignerProvider::get_shutdown_scriptpubkey
	 */
	public get_commit_upfront_shutdown_pubkey(): boolean {
		const ret: boolean = bindings.ChannelHandshakeConfig_get_commit_upfront_shutdown_pubkey(this.ptr);
		return ret;
	}

	/**
	 * When set, we commit to an upfront shutdown_pubkey at channel open. If our counterparty
	 * supports it, they will then enforce the mutual-close output to us matches what we provided
	 * at intialization, preventing us from closing to an alternate pubkey.
	 * 
	 * This is set to true by default to provide a slight increase in security, though ultimately
	 * any attacker who is able to take control of a channel can just as easily send the funds via
	 * lightning payments, so we never require that our counterparties support this option.
	 * 
	 * The upfront key committed is provided from [`SignerProvider::get_shutdown_scriptpubkey`].
	 * 
	 * Default value: `true`
	 * 
	 * [`SignerProvider::get_shutdown_scriptpubkey`]: crate::sign::SignerProvider::get_shutdown_scriptpubkey
	 */
	public set_commit_upfront_shutdown_pubkey(val: boolean): void {
		bindings.ChannelHandshakeConfig_set_commit_upfront_shutdown_pubkey(this.ptr, val);
	}

	/**
	 * The Proportion of the channel value to configure as counterparty's channel reserve,
	 * i.e., `their_channel_reserve_satoshis` for both outbound and inbound channels.
	 * 
	 * `their_channel_reserve_satoshis` is the minimum balance that the other node has to maintain
	 * on their side, at all times.
	 * This ensures that if our counterparty broadcasts a revoked state, we can punish them by
	 * claiming at least this value on chain.
	 * 
	 * Channel reserve values greater than 30% could be considered highly unreasonable, since that
	 * amount can never be used for payments.
	 * Also, if our selected channel reserve for counterparty and counterparty's selected
	 * channel reserve for us sum up to equal or greater than channel value, channel negotiations
	 * will fail.
	 * 
	 * Note: Versions of LDK earlier than v0.0.104 will fail to read channels with any channel reserve
	 * other than the default value.
	 * 
	 * Default value: `10_000` millionths (i.e., 1% of channel value)
	 * 
	 * Minimum value: If the calculated proportional value is less than `1000` sats, it will be
	 * treated as `1000` sats instead, which is a safe implementation-specific lower
	 * bound.
	 * 
	 * Maximum value: `1_000_000` (i.e., 100% of channel value. Any values larger than one million
	 * will be treated as one million instead, although channel negotiations will
	 * fail in that case.)
	 */
	public get_their_channel_reserve_proportional_millionths(): number {
		const ret: number = bindings.ChannelHandshakeConfig_get_their_channel_reserve_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * The Proportion of the channel value to configure as counterparty's channel reserve,
	 * i.e., `their_channel_reserve_satoshis` for both outbound and inbound channels.
	 * 
	 * `their_channel_reserve_satoshis` is the minimum balance that the other node has to maintain
	 * on their side, at all times.
	 * This ensures that if our counterparty broadcasts a revoked state, we can punish them by
	 * claiming at least this value on chain.
	 * 
	 * Channel reserve values greater than 30% could be considered highly unreasonable, since that
	 * amount can never be used for payments.
	 * Also, if our selected channel reserve for counterparty and counterparty's selected
	 * channel reserve for us sum up to equal or greater than channel value, channel negotiations
	 * will fail.
	 * 
	 * Note: Versions of LDK earlier than v0.0.104 will fail to read channels with any channel reserve
	 * other than the default value.
	 * 
	 * Default value: `10_000` millionths (i.e., 1% of channel value)
	 * 
	 * Minimum value: If the calculated proportional value is less than `1000` sats, it will be
	 * treated as `1000` sats instead, which is a safe implementation-specific lower
	 * bound.
	 * 
	 * Maximum value: `1_000_000` (i.e., 100% of channel value. Any values larger than one million
	 * will be treated as one million instead, although channel negotiations will
	 * fail in that case.)
	 */
	public set_their_channel_reserve_proportional_millionths(val: number): void {
		bindings.ChannelHandshakeConfig_set_their_channel_reserve_proportional_millionths(this.ptr, val);
	}

	/**
	 * If set, we attempt to negotiate the `anchors_zero_fee_htlc_tx`option for all future
	 * channels. This feature requires having a reserve of onchain funds readily available to bump
	 * transactions in the event of a channel force close to avoid the possibility of losing funds.
	 * 
	 * Note that if you wish accept inbound channels with anchor outputs, you must enable
	 * [`UserConfig::manually_accept_inbound_channels`] and manually accept them with
	 * [`ChannelManager::accept_inbound_channel`]. This is done to give you the chance to check
	 * whether your reserve of onchain funds is enough to cover the fees for all existing and new
	 * channels featuring anchor outputs in the event of a force close.
	 * 
	 * If this option is set, channels may be created that will not be readable by LDK versions
	 * prior to 0.0.116, causing [`ChannelManager`]'s read method to return a
	 * [`DecodeError::InvalidValue`].
	 * 
	 * Note that setting this to true does *not* prevent us from opening channels with
	 * counterparties that do not support the `anchors_zero_fee_htlc_tx` option; we will simply
	 * fall back to a `static_remote_key` channel.
	 * 
	 * Default value: `false` (This value is likely to change to `true` in the future.)
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 */
	public get_negotiate_anchors_zero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.ChannelHandshakeConfig_get_negotiate_anchors_zero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * If set, we attempt to negotiate the `anchors_zero_fee_htlc_tx`option for all future
	 * channels. This feature requires having a reserve of onchain funds readily available to bump
	 * transactions in the event of a channel force close to avoid the possibility of losing funds.
	 * 
	 * Note that if you wish accept inbound channels with anchor outputs, you must enable
	 * [`UserConfig::manually_accept_inbound_channels`] and manually accept them with
	 * [`ChannelManager::accept_inbound_channel`]. This is done to give you the chance to check
	 * whether your reserve of onchain funds is enough to cover the fees for all existing and new
	 * channels featuring anchor outputs in the event of a force close.
	 * 
	 * If this option is set, channels may be created that will not be readable by LDK versions
	 * prior to 0.0.116, causing [`ChannelManager`]'s read method to return a
	 * [`DecodeError::InvalidValue`].
	 * 
	 * Note that setting this to true does *not* prevent us from opening channels with
	 * counterparties that do not support the `anchors_zero_fee_htlc_tx` option; we will simply
	 * fall back to a `static_remote_key` channel.
	 * 
	 * Default value: `false` (This value is likely to change to `true` in the future.)
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 */
	public set_negotiate_anchors_zero_fee_htlc_tx(val: boolean): void {
		bindings.ChannelHandshakeConfig_set_negotiate_anchors_zero_fee_htlc_tx(this.ptr, val);
	}

	/**
	 * If set, we attempt to negotiate the `zero_fee_commitments` option for all future channels.
	 * 
	 * These channels operate very similarly to the `anchors_zero_fee_htlc` channels but rely on
	 * [TRUC] to assign zero fee to the commitment transactions themselves, avoiding many protocol
	 * edge-cases involving fee updates and greatly simplifying the concept of your \"balance\" in
	 * lightning.
	 * 
	 * Like `anchors_zero_fee_htlc` channels, this feature requires having a reserve of onchain
	 * funds readily available to bump transactions in the event of a channel force close to avoid
	 * the possibility of losing funds.
	 * 
	 * Note that if you wish accept inbound channels with anchor outputs, you must enable
	 * [`UserConfig::manually_accept_inbound_channels`] and manually accept them with
	 * [`ChannelManager::accept_inbound_channel`]. This is done to give you the chance to check
	 * whether your reserve of onchain funds is enough to cover the fees for all existing and new
	 * channels featuring anchor outputs in the event of a force close.
	 * 
	 * If this option is set, channels may be created that will not be readable by LDK versions
	 * prior to 0.2, causing [`ChannelManager`]'s read method to return a
	 * [`DecodeError::InvalidValue`].
	 * 
	 * Note that setting this to true does *not* prevent us from opening channels with
	 * counterparties that do not support the `zero_fee_commitments` option; we will simply fall
	 * back to a `anchors_zero_fee_htlc` (if [`Self::negotiate_anchors_zero_fee_htlc_tx`]
	 * is set) or `static_remote_key` channel.
	 * 
	 * For a force-close transaction to reach miners and get confirmed,
	 * zero-fee commitment channels require a path from your Bitcoin node to miners that
	 * relays TRUC transactions (BIP 431), P2A outputs, and Ephemeral Dust. Currently, only
	 * nodes running Bitcoin Core v29 and above relay transactions with these features.
	 * 
	 * Default value: `false` (This value is likely to change to `true` in the future.)
	 * 
	 * [TRUC]: (https://bitcoinops.org/en/topics/version-3-transaction-relay/)
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 */
	public get_negotiate_anchor_zero_fee_commitments(): boolean {
		const ret: boolean = bindings.ChannelHandshakeConfig_get_negotiate_anchor_zero_fee_commitments(this.ptr);
		return ret;
	}

	/**
	 * If set, we attempt to negotiate the `zero_fee_commitments` option for all future channels.
	 * 
	 * These channels operate very similarly to the `anchors_zero_fee_htlc` channels but rely on
	 * [TRUC] to assign zero fee to the commitment transactions themselves, avoiding many protocol
	 * edge-cases involving fee updates and greatly simplifying the concept of your \"balance\" in
	 * lightning.
	 * 
	 * Like `anchors_zero_fee_htlc` channels, this feature requires having a reserve of onchain
	 * funds readily available to bump transactions in the event of a channel force close to avoid
	 * the possibility of losing funds.
	 * 
	 * Note that if you wish accept inbound channels with anchor outputs, you must enable
	 * [`UserConfig::manually_accept_inbound_channels`] and manually accept them with
	 * [`ChannelManager::accept_inbound_channel`]. This is done to give you the chance to check
	 * whether your reserve of onchain funds is enough to cover the fees for all existing and new
	 * channels featuring anchor outputs in the event of a force close.
	 * 
	 * If this option is set, channels may be created that will not be readable by LDK versions
	 * prior to 0.2, causing [`ChannelManager`]'s read method to return a
	 * [`DecodeError::InvalidValue`].
	 * 
	 * Note that setting this to true does *not* prevent us from opening channels with
	 * counterparties that do not support the `zero_fee_commitments` option; we will simply fall
	 * back to a `anchors_zero_fee_htlc` (if [`Self::negotiate_anchors_zero_fee_htlc_tx`]
	 * is set) or `static_remote_key` channel.
	 * 
	 * For a force-close transaction to reach miners and get confirmed,
	 * zero-fee commitment channels require a path from your Bitcoin node to miners that
	 * relays TRUC transactions (BIP 431), P2A outputs, and Ephemeral Dust. Currently, only
	 * nodes running Bitcoin Core v29 and above relay transactions with these features.
	 * 
	 * Default value: `false` (This value is likely to change to `true` in the future.)
	 * 
	 * [TRUC]: (https://bitcoinops.org/en/topics/version-3-transaction-relay/)
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 */
	public set_negotiate_anchor_zero_fee_commitments(val: boolean): void {
		bindings.ChannelHandshakeConfig_set_negotiate_anchor_zero_fee_commitments(this.ptr, val);
	}

	/**
	 * The maximum number of HTLCs in-flight from our counterparty towards us at the same time.
	 * 
	 * Increasing the value can help improve liquidity and stability in
	 * routing at the cost of higher long term disk / DB usage.
	 * 
	 * Note: Versions of LDK earlier than v0.0.115 will fail to read channels with a configuration
	 * other than the default value.
	 * 
	 * Default value: `50`
	 * 
	 * Maximum value: depends on channel type, see docs on [`max_htlcs`] (any values over the
	 * maximum will be silently reduced to the maximum).
	 * 
	 * [`max_htlcs`]: crate::ln::chan_utils::max_htlcs
	 */
	public get_our_max_accepted_htlcs(): number {
		const ret: number = bindings.ChannelHandshakeConfig_get_our_max_accepted_htlcs(this.ptr);
		return ret;
	}

	/**
	 * The maximum number of HTLCs in-flight from our counterparty towards us at the same time.
	 * 
	 * Increasing the value can help improve liquidity and stability in
	 * routing at the cost of higher long term disk / DB usage.
	 * 
	 * Note: Versions of LDK earlier than v0.0.115 will fail to read channels with a configuration
	 * other than the default value.
	 * 
	 * Default value: `50`
	 * 
	 * Maximum value: depends on channel type, see docs on [`max_htlcs`] (any values over the
	 * maximum will be silently reduced to the maximum).
	 * 
	 * [`max_htlcs`]: crate::ln::chan_utils::max_htlcs
	 */
	public set_our_max_accepted_htlcs(val: number): void {
		bindings.ChannelHandshakeConfig_set_our_max_accepted_htlcs(this.ptr, val);
	}

	/**
	 * Constructs a new ChannelHandshakeConfig given each field
	 */
	public static constructor_new(minimum_depth_arg: number, our_to_self_delay_arg: number, our_htlc_minimum_msat_arg: bigint, max_inbound_htlc_value_in_flight_percent_of_channel_arg: number, negotiate_scid_privacy_arg: boolean, announce_for_forwarding_arg: boolean, commit_upfront_shutdown_pubkey_arg: boolean, their_channel_reserve_proportional_millionths_arg: number, negotiate_anchors_zero_fee_htlc_tx_arg: boolean, negotiate_anchor_zero_fee_commitments_arg: boolean, our_max_accepted_htlcs_arg: number): ChannelHandshakeConfig {
		const ret: bigint = bindings.ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg, max_inbound_htlc_value_in_flight_percent_of_channel_arg, negotiate_scid_privacy_arg, announce_for_forwarding_arg, commit_upfront_shutdown_pubkey_arg, their_channel_reserve_proportional_millionths_arg, negotiate_anchors_zero_fee_htlc_tx_arg, negotiate_anchor_zero_fee_commitments_arg, our_max_accepted_htlcs_arg);
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelHandshakeConfig_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelHandshakeConfig
	 */
	public clone(): ChannelHandshakeConfig {
		const ret: bigint = bindings.ChannelHandshakeConfig_clone(this.ptr);
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ChannelHandshakeConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): ChannelHandshakeConfig {
		const ret: bigint = bindings.ChannelHandshakeConfig_default();
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Applies the provided handshake config update.
	 */
	public apply(config: ChannelHandshakeConfigUpdate): void {
		bindings.ChannelHandshakeConfig_apply(this.ptr, CommonBase.get_ptr_of(config));
	}

}
