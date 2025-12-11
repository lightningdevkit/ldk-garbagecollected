using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Top-level config which holds ChannelHandshakeLimits and ChannelConfig.
 * 
 * `Default::default()` provides sane defaults for most configurations
 * (but currently with zero relay fees!)
 */
public class UserConfig : CommonBase {
	internal UserConfig(object _dummy, long ptr) : base(ptr) { }
	~UserConfig() {
		if (ptr != 0) { bindings.UserConfig_free(ptr); }
	}

	/**
	 * Channel handshake config that we propose to our counterparty.
	 */
	public org.ldk.structs.ChannelHandshakeConfig get_channel_handshake_config() {
		long ret = bindings.UserConfig_get_channel_handshake_config(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Channel handshake config that we propose to our counterparty.
	 */
	public void set_channel_handshake_config(org.ldk.structs.ChannelHandshakeConfig val) {
		bindings.UserConfig_set_channel_handshake_config(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Limits applied to our counterparty's proposed channel handshake config settings.
	 */
	public org.ldk.structs.ChannelHandshakeLimits get_channel_handshake_limits() {
		long ret = bindings.UserConfig_get_channel_handshake_limits(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeLimits ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeLimits(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Limits applied to our counterparty's proposed channel handshake config settings.
	 */
	public void set_channel_handshake_limits(org.ldk.structs.ChannelHandshakeLimits val) {
		bindings.UserConfig_set_channel_handshake_limits(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Channel config which affects behavior during channel lifetime.
	 */
	public org.ldk.structs.ChannelConfig get_channel_config() {
		long ret = bindings.UserConfig_get_channel_config(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Channel config which affects behavior during channel lifetime.
	 */
	public void set_channel_config(org.ldk.structs.ChannelConfig val) {
		bindings.UserConfig_set_channel_config(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public bool get_accept_forwards_to_priv_channels() {
		bool ret = bindings.UserConfig_get_accept_forwards_to_priv_channels(this.ptr);
		GC.KeepAlive(this);
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
	public void set_accept_forwards_to_priv_channels(bool val) {
		bindings.UserConfig_set_accept_forwards_to_priv_channels(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * If this is set to `false`, we do not accept inbound requests to open a new channel.
	 * 
	 * Default value: `true`
	 */
	public bool get_accept_inbound_channels() {
		bool ret = bindings.UserConfig_get_accept_inbound_channels(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * If this is set to `false`, we do not accept inbound requests to open a new channel.
	 * 
	 * Default value: `true`
	 */
	public void set_accept_inbound_channels(bool val) {
		bindings.UserConfig_set_accept_inbound_channels(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public bool get_manually_accept_inbound_channels() {
		bool ret = bindings.UserConfig_get_manually_accept_inbound_channels(this.ptr);
		GC.KeepAlive(this);
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
	public void set_manually_accept_inbound_channels(bool val) {
		bindings.UserConfig_set_manually_accept_inbound_channels(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public bool get_accept_intercept_htlcs() {
		bool ret = bindings.UserConfig_get_accept_intercept_htlcs(this.ptr);
		GC.KeepAlive(this);
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
	public void set_accept_intercept_htlcs(bool val) {
		bindings.UserConfig_set_accept_intercept_htlcs(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public bool get_manually_handle_bolt12_invoices() {
		bool ret = bindings.UserConfig_get_manually_handle_bolt12_invoices(this.ptr);
		GC.KeepAlive(this);
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
	public void set_manually_handle_bolt12_invoices(bool val) {
		bindings.UserConfig_set_manually_handle_bolt12_invoices(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public bool get_enable_htlc_hold() {
		bool ret = bindings.UserConfig_get_enable_htlc_hold(this.ptr);
		GC.KeepAlive(this);
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
	public void set_enable_htlc_hold(bool val) {
		bindings.UserConfig_set_enable_htlc_hold(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public bool get_hold_outbound_htlcs_at_next_hop() {
		bool ret = bindings.UserConfig_get_hold_outbound_htlcs_at_next_hop(this.ptr);
		GC.KeepAlive(this);
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
	public void set_hold_outbound_htlcs_at_next_hop(bool val) {
		bindings.UserConfig_set_hold_outbound_htlcs_at_next_hop(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public bool get_reject_inbound_splices() {
		bool ret = bindings.UserConfig_get_reject_inbound_splices(this.ptr);
		GC.KeepAlive(this);
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
	public void set_reject_inbound_splices(bool val) {
		bindings.UserConfig_set_reject_inbound_splices(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new UserConfig given each field
	 */
	public static org.ldk.structs.UserConfig of(org.ldk.structs.ChannelHandshakeConfig channel_handshake_config_arg, org.ldk.structs.ChannelHandshakeLimits channel_handshake_limits_arg, org.ldk.structs.ChannelConfig channel_config_arg, bool accept_forwards_to_priv_channels_arg, bool accept_inbound_channels_arg, bool manually_accept_inbound_channels_arg, bool accept_intercept_htlcs_arg, bool manually_handle_bolt12_invoices_arg, bool enable_htlc_hold_arg, bool hold_outbound_htlcs_at_next_hop_arg, bool reject_inbound_splices_arg) {
		long ret = bindings.UserConfig_new(channel_handshake_config_arg.ptr, channel_handshake_limits_arg.ptr, channel_config_arg.ptr, accept_forwards_to_priv_channels_arg, accept_inbound_channels_arg, manually_accept_inbound_channels_arg, accept_intercept_htlcs_arg, manually_handle_bolt12_invoices_arg, enable_htlc_hold_arg, hold_outbound_htlcs_at_next_hop_arg, reject_inbound_splices_arg);
		GC.KeepAlive(channel_handshake_config_arg);
		GC.KeepAlive(channel_handshake_limits_arg);
		GC.KeepAlive(channel_config_arg);
		GC.KeepAlive(accept_forwards_to_priv_channels_arg);
		GC.KeepAlive(accept_inbound_channels_arg);
		GC.KeepAlive(manually_accept_inbound_channels_arg);
		GC.KeepAlive(accept_intercept_htlcs_arg);
		GC.KeepAlive(manually_handle_bolt12_invoices_arg);
		GC.KeepAlive(enable_htlc_hold_arg);
		GC.KeepAlive(hold_outbound_htlcs_at_next_hop_arg);
		GC.KeepAlive(reject_inbound_splices_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UserConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.UserConfig_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UserConfig
	 */
	public org.ldk.structs.UserConfig clone() {
		long ret = bindings.UserConfig_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UserConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" UserConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static org.ldk.structs.UserConfig with_default() {
		long ret = bindings.UserConfig_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UserConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Applies given channel config overrides to the user config.
	 */
	public void apply(org.ldk.structs.ChannelConfigOverrides config) {
		bindings.UserConfig_apply(this.ptr, config.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(config);
	}

}
} } }
