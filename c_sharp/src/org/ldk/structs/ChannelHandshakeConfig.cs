using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Configuration we set when applicable.
 * 
 * Default::default() provides sane defaults.
 */
public class ChannelHandshakeConfig : CommonBase {
	internal ChannelHandshakeConfig(object _dummy, long ptr) : base(ptr) { }
	~ChannelHandshakeConfig() {
		if (ptr != 0) { bindings.ChannelHandshakeConfig_free(ptr); }
	}

	/**
	 * Confirmations we will wait for before considering the channel locked in.
	 * Applied only for inbound channels (see ChannelHandshakeLimits::max_minimum_depth for the
	 * equivalent limit applied to outbound channels).
	 * 
	 * A lower-bound of 1 is applied, requiring all channels to have a confirmed commitment
	 * transaction before operation. If you wish to accept channels with zero confirmations, see
	 * [`UserConfig::manually_accept_inbound_channels`] and
	 * [`ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`].
	 * 
	 * Default value: 6.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel_from_trusted_peer_0conf
	 */
	public int get_minimum_depth() {
		int ret = bindings.ChannelHandshakeConfig_get_minimum_depth(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Confirmations we will wait for before considering the channel locked in.
	 * Applied only for inbound channels (see ChannelHandshakeLimits::max_minimum_depth for the
	 * equivalent limit applied to outbound channels).
	 * 
	 * A lower-bound of 1 is applied, requiring all channels to have a confirmed commitment
	 * transaction before operation. If you wish to accept channels with zero confirmations, see
	 * [`UserConfig::manually_accept_inbound_channels`] and
	 * [`ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`].
	 * 
	 * Default value: 6.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel_from_trusted_peer_0conf
	 */
	public void set_minimum_depth(int val) {
		bindings.ChannelHandshakeConfig_set_minimum_depth(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	 * Default value: [`BREAKDOWN_TIMEOUT`], we enforce it as a minimum at channel opening so you
	 * can tweak config to ask for more security, not less.
	 */
	public short get_our_to_self_delay() {
		short ret = bindings.ChannelHandshakeConfig_get_our_to_self_delay(this.ptr);
		GC.KeepAlive(this);
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
	 * Default value: [`BREAKDOWN_TIMEOUT`], we enforce it as a minimum at channel opening so you
	 * can tweak config to ask for more security, not less.
	 */
	public void set_our_to_self_delay(short val) {
		bindings.ChannelHandshakeConfig_set_our_to_self_delay(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Set to the smallest value HTLC we will accept to process.
	 * 
	 * This value is sent to our counterparty on channel-open and we close the channel any time
	 * our counterparty misbehaves by sending us an HTLC with a value smaller than this.
	 * 
	 * Default value: 1. If the value is less than 1, it is ignored and set to 1, as is required
	 * by the protocol.
	 */
	public long get_our_htlc_minimum_msat() {
		long ret = bindings.ChannelHandshakeConfig_get_our_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set to the smallest value HTLC we will accept to process.
	 * 
	 * This value is sent to our counterparty on channel-open and we close the channel any time
	 * our counterparty misbehaves by sending us an HTLC with a value smaller than this.
	 * 
	 * Default value: 1. If the value is less than 1, it is ignored and set to 1, as is required
	 * by the protocol.
	 */
	public void set_our_htlc_minimum_msat(long val) {
		bindings.ChannelHandshakeConfig_set_our_htlc_minimum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Sets the percentage of the channel value we will cap the total value of outstanding inbound
	 * HTLCs to.
	 * 
	 * This can be set to a value between 1-100, where the value corresponds to the percent of the
	 * channel value in whole percentages.
	 * 
	 * Note that:
	 * If configured to another value than the default value 10, any new channels created with
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
	 * Default value: 10.
	 * Minimum value: 1, any values less than 1 will be treated as 1 instead.
	 * Maximum value: 100, any values larger than 100 will be treated as 100 instead.
	 */
	public byte get_max_inbound_htlc_value_in_flight_percent_of_channel() {
		byte ret = bindings.ChannelHandshakeConfig_get_max_inbound_htlc_value_in_flight_percent_of_channel(this.ptr);
		GC.KeepAlive(this);
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
	 * If configured to another value than the default value 10, any new channels created with
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
	 * Default value: 10.
	 * Minimum value: 1, any values less than 1 will be treated as 1 instead.
	 * Maximum value: 100, any values larger than 100 will be treated as 100 instead.
	 */
	public void set_max_inbound_htlc_value_in_flight_percent_of_channel(byte val) {
		bindings.ChannelHandshakeConfig_set_max_inbound_htlc_value_in_flight_percent_of_channel(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	 * [`ChannelHandshakeConfig::announced_channel`] and
	 * [`ChannelHandshakeLimits::force_announced_channel_preference`] for more.
	 * 
	 * Default value: false. This value is likely to change to true in the future.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 */
	public bool get_negotiate_scid_privacy() {
		bool ret = bindings.ChannelHandshakeConfig_get_negotiate_scid_privacy(this.ptr);
		GC.KeepAlive(this);
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
	 * [`ChannelHandshakeConfig::announced_channel`] and
	 * [`ChannelHandshakeLimits::force_announced_channel_preference`] for more.
	 * 
	 * Default value: false. This value is likely to change to true in the future.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 */
	public void set_negotiate_scid_privacy(bool val) {
		bindings.ChannelHandshakeConfig_set_negotiate_scid_privacy(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	 * Default value: false.
	 */
	public bool get_announced_channel() {
		bool ret = bindings.ChannelHandshakeConfig_get_announced_channel(this.ptr);
		GC.KeepAlive(this);
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
	 * Default value: false.
	 */
	public void set_announced_channel(bool val) {
		bindings.ChannelHandshakeConfig_set_announced_channel(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	 * Default value: true.
	 * 
	 * [`SignerProvider::get_shutdown_scriptpubkey`]: crate::sign::SignerProvider::get_shutdown_scriptpubkey
	 */
	public bool get_commit_upfront_shutdown_pubkey() {
		bool ret = bindings.ChannelHandshakeConfig_get_commit_upfront_shutdown_pubkey(this.ptr);
		GC.KeepAlive(this);
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
	 * Default value: true.
	 * 
	 * [`SignerProvider::get_shutdown_scriptpubkey`]: crate::sign::SignerProvider::get_shutdown_scriptpubkey
	 */
	public void set_commit_upfront_shutdown_pubkey(bool val) {
		bindings.ChannelHandshakeConfig_set_commit_upfront_shutdown_pubkey(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	 * Default value: 1% of channel value, i.e., configured as 10,000 millionths.
	 * Minimum value: If the calculated proportional value is less than 1000 sats, it will be treated
	 * as 1000 sats instead, which is a safe implementation-specific lower bound.
	 * Maximum value: 1,000,000, any values larger than 1 Million will be treated as 1 Million (or 100%)
	 * instead, although channel negotiations will fail in that case.
	 */
	public int get_their_channel_reserve_proportional_millionths() {
		int ret = bindings.ChannelHandshakeConfig_get_their_channel_reserve_proportional_millionths(this.ptr);
		GC.KeepAlive(this);
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
	 * Default value: 1% of channel value, i.e., configured as 10,000 millionths.
	 * Minimum value: If the calculated proportional value is less than 1000 sats, it will be treated
	 * as 1000 sats instead, which is a safe implementation-specific lower bound.
	 * Maximum value: 1,000,000, any values larger than 1 Million will be treated as 1 Million (or 100%)
	 * instead, although channel negotiations will fail in that case.
	 */
	public void set_their_channel_reserve_proportional_millionths(int val) {
		bindings.ChannelHandshakeConfig_set_their_channel_reserve_proportional_millionths(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	 * LDK will not support the legacy `option_anchors` commitment version due to a discovered
	 * vulnerability after its deployment. For more context, see the [`SIGHASH_SINGLE + update_fee
	 * Considered Harmful`] mailing list post.
	 * 
	 * Default value: false. This value is likely to change to true in the future.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 * [`SIGHASH_SINGLE + update_fee Considered Harmful`]: https://lists.linuxfoundation.org/pipermail/lightning-dev/2020-September/002796.html
	 */
	public bool get_negotiate_anchors_zero_fee_htlc_tx() {
		bool ret = bindings.ChannelHandshakeConfig_get_negotiate_anchors_zero_fee_htlc_tx(this.ptr);
		GC.KeepAlive(this);
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
	 * LDK will not support the legacy `option_anchors` commitment version due to a discovered
	 * vulnerability after its deployment. For more context, see the [`SIGHASH_SINGLE + update_fee
	 * Considered Harmful`] mailing list post.
	 * 
	 * Default value: false. This value is likely to change to true in the future.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`DecodeError::InvalidValue`]: crate::ln::msgs::DecodeError::InvalidValue
	 * [`SIGHASH_SINGLE + update_fee Considered Harmful`]: https://lists.linuxfoundation.org/pipermail/lightning-dev/2020-September/002796.html
	 */
	public void set_negotiate_anchors_zero_fee_htlc_tx(bool val) {
		bindings.ChannelHandshakeConfig_set_negotiate_anchors_zero_fee_htlc_tx(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	 * Default value: 50
	 * Maximum value: 483, any values larger will be treated as 483.
	 * This is the BOLT #2 spec limit on `max_accepted_htlcs`.
	 */
	public short get_our_max_accepted_htlcs() {
		short ret = bindings.ChannelHandshakeConfig_get_our_max_accepted_htlcs(this.ptr);
		GC.KeepAlive(this);
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
	 * Default value: 50
	 * Maximum value: 483, any values larger will be treated as 483.
	 * This is the BOLT #2 spec limit on `max_accepted_htlcs`.
	 */
	public void set_our_max_accepted_htlcs(short val) {
		bindings.ChannelHandshakeConfig_set_our_max_accepted_htlcs(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ChannelHandshakeConfig given each field
	 */
	public static ChannelHandshakeConfig of(int minimum_depth_arg, short our_to_self_delay_arg, long our_htlc_minimum_msat_arg, byte max_inbound_htlc_value_in_flight_percent_of_channel_arg, bool negotiate_scid_privacy_arg, bool announced_channel_arg, bool commit_upfront_shutdown_pubkey_arg, int their_channel_reserve_proportional_millionths_arg, bool negotiate_anchors_zero_fee_htlc_tx_arg, short our_max_accepted_htlcs_arg) {
		long ret = bindings.ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg, max_inbound_htlc_value_in_flight_percent_of_channel_arg, negotiate_scid_privacy_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg, their_channel_reserve_proportional_millionths_arg, negotiate_anchors_zero_fee_htlc_tx_arg, our_max_accepted_htlcs_arg);
		GC.KeepAlive(minimum_depth_arg);
		GC.KeepAlive(our_to_self_delay_arg);
		GC.KeepAlive(our_htlc_minimum_msat_arg);
		GC.KeepAlive(max_inbound_htlc_value_in_flight_percent_of_channel_arg);
		GC.KeepAlive(negotiate_scid_privacy_arg);
		GC.KeepAlive(announced_channel_arg);
		GC.KeepAlive(commit_upfront_shutdown_pubkey_arg);
		GC.KeepAlive(their_channel_reserve_proportional_millionths_arg);
		GC.KeepAlive(negotiate_anchors_zero_fee_htlc_tx_arg);
		GC.KeepAlive(our_max_accepted_htlcs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelHandshakeConfig_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelHandshakeConfig
	 */
	public ChannelHandshakeConfig clone() {
		long ret = bindings.ChannelHandshakeConfig_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ChannelHandshakeConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ChannelHandshakeConfig with_default() {
		long ret = bindings.ChannelHandshakeConfig_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
