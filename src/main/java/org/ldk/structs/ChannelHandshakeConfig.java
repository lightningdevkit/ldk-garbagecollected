package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Configuration we set when applicable.
 * 
 * Default::default() provides sane defaults.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelHandshakeConfig extends CommonBase {
	ChannelHandshakeConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
	public boolean get_negotiate_scid_privacy() {
		boolean ret = bindings.ChannelHandshakeConfig_get_negotiate_scid_privacy(this.ptr);
		Reference.reachabilityFence(this);
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
	public void set_negotiate_scid_privacy(boolean val) {
		bindings.ChannelHandshakeConfig_set_negotiate_scid_privacy(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
	public boolean get_announced_channel() {
		boolean ret = bindings.ChannelHandshakeConfig_get_announced_channel(this.ptr);
		Reference.reachabilityFence(this);
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
	public void set_announced_channel(boolean val) {
		bindings.ChannelHandshakeConfig_set_announced_channel(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
	 * The upfront key committed is provided from [`KeysInterface::get_shutdown_scriptpubkey`].
	 * 
	 * Default value: true.
	 * 
	 * [`KeysInterface::get_shutdown_scriptpubkey`]: crate::chain::keysinterface::KeysInterface::get_shutdown_scriptpubkey
	 */
	public boolean get_commit_upfront_shutdown_pubkey() {
		boolean ret = bindings.ChannelHandshakeConfig_get_commit_upfront_shutdown_pubkey(this.ptr);
		Reference.reachabilityFence(this);
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
	 * The upfront key committed is provided from [`KeysInterface::get_shutdown_scriptpubkey`].
	 * 
	 * Default value: true.
	 * 
	 * [`KeysInterface::get_shutdown_scriptpubkey`]: crate::chain::keysinterface::KeysInterface::get_shutdown_scriptpubkey
	 */
	public void set_commit_upfront_shutdown_pubkey(boolean val) {
		bindings.ChannelHandshakeConfig_set_commit_upfront_shutdown_pubkey(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelHandshakeConfig given each field
	 */
	public static ChannelHandshakeConfig of(int minimum_depth_arg, short our_to_self_delay_arg, long our_htlc_minimum_msat_arg, byte max_inbound_htlc_value_in_flight_percent_of_channel_arg, boolean negotiate_scid_privacy_arg, boolean announced_channel_arg, boolean commit_upfront_shutdown_pubkey_arg) {
		long ret = bindings.ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg, max_inbound_htlc_value_in_flight_percent_of_channel_arg, negotiate_scid_privacy_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
		Reference.reachabilityFence(minimum_depth_arg);
		Reference.reachabilityFence(our_to_self_delay_arg);
		Reference.reachabilityFence(our_htlc_minimum_msat_arg);
		Reference.reachabilityFence(max_inbound_htlc_value_in_flight_percent_of_channel_arg);
		Reference.reachabilityFence(negotiate_scid_privacy_arg);
		Reference.reachabilityFence(announced_channel_arg);
		Reference.reachabilityFence(commit_upfront_shutdown_pubkey_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelHandshakeConfig_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelHandshakeConfig
	 */
	public ChannelHandshakeConfig clone() {
		long ret = bindings.ChannelHandshakeConfig_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ChannelHandshakeConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ChannelHandshakeConfig with_default() {
		long ret = bindings.ChannelHandshakeConfig_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
