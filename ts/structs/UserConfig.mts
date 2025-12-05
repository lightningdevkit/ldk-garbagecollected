
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Top-level config which holds ChannelHandshakeLimits and ChannelConfig.
 * 
 * `Default::default()` provides sane defaults for most configurations
 * (but currently with zero relay fees!)
 */
export class UserConfig extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UserConfig_free);
	}

	/**
	 * Channel handshake config that we propose to our counterparty.
	 */
	public get_channel_handshake_config(): ChannelHandshakeConfig {
		const ret: bigint = bindings.UserConfig_get_channel_handshake_config(this.ptr);
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Channel handshake config that we propose to our counterparty.
	 */
	public set_channel_handshake_config(val: ChannelHandshakeConfig): void {
		bindings.UserConfig_set_channel_handshake_config(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Limits applied to our counterparty's proposed channel handshake config settings.
	 */
	public get_channel_handshake_limits(): ChannelHandshakeLimits {
		const ret: bigint = bindings.UserConfig_get_channel_handshake_limits(this.ptr);
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Limits applied to our counterparty's proposed channel handshake config settings.
	 */
	public set_channel_handshake_limits(val: ChannelHandshakeLimits): void {
		bindings.UserConfig_set_channel_handshake_limits(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Channel config which affects behavior during channel lifetime.
	 */
	public get_channel_config(): ChannelConfig {
		const ret: bigint = bindings.UserConfig_get_channel_config(this.ptr);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Channel config which affects behavior during channel lifetime.
	 */
	public set_channel_config(val: ChannelConfig): void {
		bindings.UserConfig_set_channel_config(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * If this is set to `false`, we will reject any HTLCs which were to be forwarded over private
	 * channels. This prevents us from taking on HTLC-forwarding risk when we intend to run as a
	 * node which is not online reliably.
	 * 
	 * For nodes which are not online reliably, you should set all channels to *not* be announced
	 * (using [`ChannelHandshakeConfig::announce_for_forwarding`] and
	 * [`ChannelHandshakeLimits::force_announced_channel_preference`]) and set this to `false` to
	 * ensure you are not exposed to any forwarding risk.
	 * 
	 * Note that because you cannot change a channel's announced state after creation, there is no
	 * way to disable forwarding on public channels retroactively. Thus, in order to change a node
	 * from a publicly-announced forwarding node to a private non-forwarding node you must close
	 * all your channels and open new ones. For privacy, you should also change your node_id
	 * (swapping all private and public key material for new ones) at that time.
	 * 
	 * Note that this setting does not apply for intercepted payments that are surfaced via
	 * [`Event::HTLCIntercepted`] and manually forwarded.
	 * 
	 * Default value: `false`
	 * 
	 * [`Event::HTLCIntercepted`]: crate::events::Event::HTLCIntercepted
	 */
	public get_accept_forwards_to_priv_channels(): boolean {
		const ret: boolean = bindings.UserConfig_get_accept_forwards_to_priv_channels(this.ptr);
		return ret;
	}

	/**
	 * If this is set to `false`, we will reject any HTLCs which were to be forwarded over private
	 * channels. This prevents us from taking on HTLC-forwarding risk when we intend to run as a
	 * node which is not online reliably.
	 * 
	 * For nodes which are not online reliably, you should set all channels to *not* be announced
	 * (using [`ChannelHandshakeConfig::announce_for_forwarding`] and
	 * [`ChannelHandshakeLimits::force_announced_channel_preference`]) and set this to `false` to
	 * ensure you are not exposed to any forwarding risk.
	 * 
	 * Note that because you cannot change a channel's announced state after creation, there is no
	 * way to disable forwarding on public channels retroactively. Thus, in order to change a node
	 * from a publicly-announced forwarding node to a private non-forwarding node you must close
	 * all your channels and open new ones. For privacy, you should also change your node_id
	 * (swapping all private and public key material for new ones) at that time.
	 * 
	 * Note that this setting does not apply for intercepted payments that are surfaced via
	 * [`Event::HTLCIntercepted`] and manually forwarded.
	 * 
	 * Default value: `false`
	 * 
	 * [`Event::HTLCIntercepted`]: crate::events::Event::HTLCIntercepted
	 */
	public set_accept_forwards_to_priv_channels(val: boolean): void {
		bindings.UserConfig_set_accept_forwards_to_priv_channels(this.ptr, val);
	}

	/**
	 * If this is set to `false`, we do not accept inbound requests to open a new channel.
	 * 
	 * Default value: `true`
	 */
	public get_accept_inbound_channels(): boolean {
		const ret: boolean = bindings.UserConfig_get_accept_inbound_channels(this.ptr);
		return ret;
	}

	/**
	 * If this is set to `false`, we do not accept inbound requests to open a new channel.
	 * 
	 * Default value: `true`
	 */
	public set_accept_inbound_channels(val: boolean): void {
		bindings.UserConfig_set_accept_inbound_channels(this.ptr, val);
	}

	/**
	 * If this is set to `true`, the user needs to manually accept inbound requests to open a new
	 * channel.
	 * 
	 * When set to `true`, [`Event::OpenChannelRequest`] will be triggered once a request to open a
	 * new inbound channel is received through a [`msgs::OpenChannel`] message. In that case, a
	 * [`msgs::AcceptChannel`] message will not be sent back to the counterparty node unless the
	 * user explicitly chooses to accept the request.
	 * 
	 * Default value: `false`
	 * 
	 * [`Event::OpenChannelRequest`]: crate::events::Event::OpenChannelRequest
	 * [`msgs::OpenChannel`]: crate::ln::msgs::OpenChannel
	 * [`msgs::AcceptChannel`]: crate::ln::msgs::AcceptChannel
	 */
	public get_manually_accept_inbound_channels(): boolean {
		const ret: boolean = bindings.UserConfig_get_manually_accept_inbound_channels(this.ptr);
		return ret;
	}

	/**
	 * If this is set to `true`, the user needs to manually accept inbound requests to open a new
	 * channel.
	 * 
	 * When set to `true`, [`Event::OpenChannelRequest`] will be triggered once a request to open a
	 * new inbound channel is received through a [`msgs::OpenChannel`] message. In that case, a
	 * [`msgs::AcceptChannel`] message will not be sent back to the counterparty node unless the
	 * user explicitly chooses to accept the request.
	 * 
	 * Default value: `false`
	 * 
	 * [`Event::OpenChannelRequest`]: crate::events::Event::OpenChannelRequest
	 * [`msgs::OpenChannel`]: crate::ln::msgs::OpenChannel
	 * [`msgs::AcceptChannel`]: crate::ln::msgs::AcceptChannel
	 */
	public set_manually_accept_inbound_channels(val: boolean): void {
		bindings.UserConfig_set_manually_accept_inbound_channels(this.ptr, val);
	}

	/**
	 * If this is set to `true`, LDK will intercept HTLCs that are attempting to be forwarded over
	 * fake short channel ids generated via [`ChannelManager::get_intercept_scid`]. Upon HTLC
	 * intercept, LDK will generate an [`Event::HTLCIntercepted`] which MUST be handled by the user.
	 * 
	 * Setting this to `true` may break backwards compatibility with LDK versions < 0.0.113.
	 * 
	 * Default value: `false`
	 * 
	 * [`ChannelManager::get_intercept_scid`]: crate::ln::channelmanager::ChannelManager::get_intercept_scid
	 * [`Event::HTLCIntercepted`]: crate::events::Event::HTLCIntercepted
	 */
	public get_accept_intercept_htlcs(): boolean {
		const ret: boolean = bindings.UserConfig_get_accept_intercept_htlcs(this.ptr);
		return ret;
	}

	/**
	 * If this is set to `true`, LDK will intercept HTLCs that are attempting to be forwarded over
	 * fake short channel ids generated via [`ChannelManager::get_intercept_scid`]. Upon HTLC
	 * intercept, LDK will generate an [`Event::HTLCIntercepted`] which MUST be handled by the user.
	 * 
	 * Setting this to `true` may break backwards compatibility with LDK versions < 0.0.113.
	 * 
	 * Default value: `false`
	 * 
	 * [`ChannelManager::get_intercept_scid`]: crate::ln::channelmanager::ChannelManager::get_intercept_scid
	 * [`Event::HTLCIntercepted`]: crate::events::Event::HTLCIntercepted
	 */
	public set_accept_intercept_htlcs(val: boolean): void {
		bindings.UserConfig_set_accept_intercept_htlcs(this.ptr, val);
	}

	/**
	 * If this is set to `true`, the user needs to manually pay [`Bolt12Invoice`]s when received.
	 * 
	 * When set to `true`, [`Event::InvoiceReceived`] will be generated for each received
	 * [`Bolt12Invoice`] instead of being automatically paid after verification. Use
	 * [`ChannelManager::send_payment_for_bolt12_invoice`] to pay the invoice or
	 * [`ChannelManager::abandon_payment`] to abandon the associated payment.
	 * 
	 * Default value: `false`
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`Event::InvoiceReceived`]: crate::events::Event::InvoiceReceived
	 * [`ChannelManager::send_payment_for_bolt12_invoice`]: crate::ln::channelmanager::ChannelManager::send_payment_for_bolt12_invoice
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public get_manually_handle_bolt12_invoices(): boolean {
		const ret: boolean = bindings.UserConfig_get_manually_handle_bolt12_invoices(this.ptr);
		return ret;
	}

	/**
	 * If this is set to `true`, the user needs to manually pay [`Bolt12Invoice`]s when received.
	 * 
	 * When set to `true`, [`Event::InvoiceReceived`] will be generated for each received
	 * [`Bolt12Invoice`] instead of being automatically paid after verification. Use
	 * [`ChannelManager::send_payment_for_bolt12_invoice`] to pay the invoice or
	 * [`ChannelManager::abandon_payment`] to abandon the associated payment.
	 * 
	 * Default value: `false`
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`Event::InvoiceReceived`]: crate::events::Event::InvoiceReceived
	 * [`ChannelManager::send_payment_for_bolt12_invoice`]: crate::ln::channelmanager::ChannelManager::send_payment_for_bolt12_invoice
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public set_manually_handle_bolt12_invoices(val: boolean): void {
		bindings.UserConfig_set_manually_handle_bolt12_invoices(this.ptr, val);
	}

	/**
	 * LDK supports a feature for always-online nodes such that these nodes can hold onto an HTLC
	 * from an often-offline channel peer until the often-offline payment recipient sends an onion
	 * message telling the always-online node to release the HTLC. If this is set to `true`, our node
	 * will carry out this feature for channel peers that request it.
	 * 
	 * This should only be set to `true` for nodes which expect to be online reliably.
	 * 
	 * Setting this to `true` may break backwards compatibility with LDK versions < 0.2.
	 * 
	 * Default value: `false`
	 */
	public get_enable_htlc_hold(): boolean {
		const ret: boolean = bindings.UserConfig_get_enable_htlc_hold(this.ptr);
		return ret;
	}

	/**
	 * LDK supports a feature for always-online nodes such that these nodes can hold onto an HTLC
	 * from an often-offline channel peer until the often-offline payment recipient sends an onion
	 * message telling the always-online node to release the HTLC. If this is set to `true`, our node
	 * will carry out this feature for channel peers that request it.
	 * 
	 * This should only be set to `true` for nodes which expect to be online reliably.
	 * 
	 * Setting this to `true` may break backwards compatibility with LDK versions < 0.2.
	 * 
	 * Default value: `false`
	 */
	public set_enable_htlc_hold(val: boolean): void {
		bindings.UserConfig_set_enable_htlc_hold(this.ptr, val);
	}

	/**
	 * If this is set to true, then if we as an often-offline payer receive a [`StaticInvoice`] to
	 * pay, we will attempt to hold the corresponding outbound HTLCs with our next-hop channel
	 * counterparty(s) that support the `htlc_hold` feature. This allows our node to go offline once
	 * the HTLCs are locked in even though the recipient may not yet be online to receive them.
	 * 
	 * This option is intended for usage by private nodes, and should NOT be set if we are an
	 * announced node that is expected to be online at all times.
	 * 
	 * Setting this to `true` may lead to HTLC failures if downgrading to LDK versions < 0.2.
	 * 
	 * Default value: `false`
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 */
	public get_hold_outbound_htlcs_at_next_hop(): boolean {
		const ret: boolean = bindings.UserConfig_get_hold_outbound_htlcs_at_next_hop(this.ptr);
		return ret;
	}

	/**
	 * If this is set to true, then if we as an often-offline payer receive a [`StaticInvoice`] to
	 * pay, we will attempt to hold the corresponding outbound HTLCs with our next-hop channel
	 * counterparty(s) that support the `htlc_hold` feature. This allows our node to go offline once
	 * the HTLCs are locked in even though the recipient may not yet be online to receive them.
	 * 
	 * This option is intended for usage by private nodes, and should NOT be set if we are an
	 * announced node that is expected to be online at all times.
	 * 
	 * Setting this to `true` may lead to HTLC failures if downgrading to LDK versions < 0.2.
	 * 
	 * Default value: `false`
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 */
	public set_hold_outbound_htlcs_at_next_hop(val: boolean): void {
		bindings.UserConfig_set_hold_outbound_htlcs_at_next_hop(this.ptr, val);
	}

	/**
	 * If this is set to `true`, then inbound channel splice requests will be rejected. This
	 * ensures backwards compatibility is not broken with LDK versions < 0.2 while a splice is
	 * pending.
	 * 
	 * Outbound channel splice requests (via [`ChannelManager::splice_channel`], an opt-in API) are
	 * still allowed as users should be aware of the backwards compatibility risk prior to using
	 * the functionality.
	 * 
	 * Default value: `true`
	 * 
	 * [`ChannelManager::splice_channel`]: crate::ln::channelmanager::ChannelManager::splice_channel
	 */
	public get_reject_inbound_splices(): boolean {
		const ret: boolean = bindings.UserConfig_get_reject_inbound_splices(this.ptr);
		return ret;
	}

	/**
	 * If this is set to `true`, then inbound channel splice requests will be rejected. This
	 * ensures backwards compatibility is not broken with LDK versions < 0.2 while a splice is
	 * pending.
	 * 
	 * Outbound channel splice requests (via [`ChannelManager::splice_channel`], an opt-in API) are
	 * still allowed as users should be aware of the backwards compatibility risk prior to using
	 * the functionality.
	 * 
	 * Default value: `true`
	 * 
	 * [`ChannelManager::splice_channel`]: crate::ln::channelmanager::ChannelManager::splice_channel
	 */
	public set_reject_inbound_splices(val: boolean): void {
		bindings.UserConfig_set_reject_inbound_splices(this.ptr, val);
	}

	/**
	 * Constructs a new UserConfig given each field
	 */
	public static constructor_new(channel_handshake_config_arg: ChannelHandshakeConfig, channel_handshake_limits_arg: ChannelHandshakeLimits, channel_config_arg: ChannelConfig, accept_forwards_to_priv_channels_arg: boolean, accept_inbound_channels_arg: boolean, manually_accept_inbound_channels_arg: boolean, accept_intercept_htlcs_arg: boolean, manually_handle_bolt12_invoices_arg: boolean, enable_htlc_hold_arg: boolean, hold_outbound_htlcs_at_next_hop_arg: boolean, reject_inbound_splices_arg: boolean): UserConfig {
		const ret: bigint = bindings.UserConfig_new(CommonBase.get_ptr_of(channel_handshake_config_arg), CommonBase.get_ptr_of(channel_handshake_limits_arg), CommonBase.get_ptr_of(channel_config_arg), accept_forwards_to_priv_channels_arg, accept_inbound_channels_arg, manually_accept_inbound_channels_arg, accept_intercept_htlcs_arg, manually_handle_bolt12_invoices_arg, enable_htlc_hold_arg, hold_outbound_htlcs_at_next_hop_arg, reject_inbound_splices_arg);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UserConfig_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UserConfig
	 */
	public clone(): UserConfig {
		const ret: bigint = bindings.UserConfig_clone(this.ptr);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" UserConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): UserConfig {
		const ret: bigint = bindings.UserConfig_default();
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Applies given channel config overrides to the user config.
	 */
	public apply(config: ChannelConfigOverrides): void {
		bindings.UserConfig_apply(this.ptr, CommonBase.get_ptr_of(config));
	}

}
