package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Top-level config which holds ChannelHandshakeLimits and ChannelConfig.
 * 
 * Default::default() provides sane defaults for most configurations
 * (but currently with 0 relay fees!)
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UserConfig extends CommonBase {
	UserConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UserConfig_free(ptr); }
	}

	/**
	 * Channel config that we propose to our counterparty.
	 */
	public ChannelHandshakeConfig get_own_channel_config() {
		long ret = bindings.UserConfig_get_own_channel_config(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelHandshakeConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelHandshakeConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Channel config that we propose to our counterparty.
	 */
	public void set_own_channel_config(ChannelHandshakeConfig val) {
		bindings.UserConfig_set_own_channel_config(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Limits applied to our counterparty's proposed channel config settings.
	 */
	public ChannelHandshakeLimits get_peer_channel_config_limits() {
		long ret = bindings.UserConfig_get_peer_channel_config_limits(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelHandshakeLimits ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelHandshakeLimits(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Limits applied to our counterparty's proposed channel config settings.
	 */
	public void set_peer_channel_config_limits(ChannelHandshakeLimits val) {
		bindings.UserConfig_set_peer_channel_config_limits(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Channel config which affects behavior during channel lifetime.
	 */
	public ChannelConfig get_channel_options() {
		long ret = bindings.UserConfig_get_channel_options(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Channel config which affects behavior during channel lifetime.
	 */
	public void set_channel_options(ChannelConfig val) {
		bindings.UserConfig_set_channel_options(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * If this is set to false, we will reject any HTLCs which were to be forwarded over private
	 * channels. This prevents us from taking on HTLC-forwarding risk when we intend to run as a
	 * node which is not online reliably.
	 * 
	 * For nodes which are not online reliably, you should set all channels to *not* be announced
	 * (using [`ChannelConfig::announced_channel`] and
	 * [`ChannelHandshakeLimits::force_announced_channel_preference`]) and set this to false to
	 * ensure you are not exposed to any forwarding risk.
	 * 
	 * Note that because you cannot change a channel's announced state after creation, there is no
	 * way to disable forwarding on public channels retroactively. Thus, in order to change a node
	 * from a publicly-announced forwarding node to a private non-forwarding node you must close
	 * all your channels and open new ones. For privacy, you should also change your node_id
	 * (swapping all private and public key material for new ones) at that time.
	 * 
	 * Default value: false.
	 */
	public boolean get_accept_forwards_to_priv_channels() {
		boolean ret = bindings.UserConfig_get_accept_forwards_to_priv_channels(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * If this is set to false, we will reject any HTLCs which were to be forwarded over private
	 * channels. This prevents us from taking on HTLC-forwarding risk when we intend to run as a
	 * node which is not online reliably.
	 * 
	 * For nodes which are not online reliably, you should set all channels to *not* be announced
	 * (using [`ChannelConfig::announced_channel`] and
	 * [`ChannelHandshakeLimits::force_announced_channel_preference`]) and set this to false to
	 * ensure you are not exposed to any forwarding risk.
	 * 
	 * Note that because you cannot change a channel's announced state after creation, there is no
	 * way to disable forwarding on public channels retroactively. Thus, in order to change a node
	 * from a publicly-announced forwarding node to a private non-forwarding node you must close
	 * all your channels and open new ones. For privacy, you should also change your node_id
	 * (swapping all private and public key material for new ones) at that time.
	 * 
	 * Default value: false.
	 */
	public void set_accept_forwards_to_priv_channels(boolean val) {
		bindings.UserConfig_set_accept_forwards_to_priv_channels(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * If this is set to false, we do not accept inbound requests to open a new channel.
	 * Default value: true.
	 */
	public boolean get_accept_inbound_channels() {
		boolean ret = bindings.UserConfig_get_accept_inbound_channels(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * If this is set to false, we do not accept inbound requests to open a new channel.
	 * Default value: true.
	 */
	public void set_accept_inbound_channels(boolean val) {
		bindings.UserConfig_set_accept_inbound_channels(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * If this is set to true, the user needs to manually accept inbound requests to open a new
	 * channel.
	 * 
	 * When set to true, [`Event::OpenChannelRequest`] will be triggered once a request to open a
	 * new inbound channel is received through a [`msgs::OpenChannel`] message. In that case, a
	 * [`msgs::AcceptChannel`] message will not be sent back to the counterparty node unless the
	 * user explicitly chooses to accept the request.
	 * 
	 * Default value: false.
	 * 
	 * [`Event::OpenChannelRequest`]: crate::util::events::Event::OpenChannelRequest
	 * [`msgs::OpenChannel`]: crate::ln::msgs::OpenChannel
	 * [`msgs::AcceptChannel`]: crate::ln::msgs::AcceptChannel
	 */
	public boolean get_manually_accept_inbound_channels() {
		boolean ret = bindings.UserConfig_get_manually_accept_inbound_channels(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * If this is set to true, the user needs to manually accept inbound requests to open a new
	 * channel.
	 * 
	 * When set to true, [`Event::OpenChannelRequest`] will be triggered once a request to open a
	 * new inbound channel is received through a [`msgs::OpenChannel`] message. In that case, a
	 * [`msgs::AcceptChannel`] message will not be sent back to the counterparty node unless the
	 * user explicitly chooses to accept the request.
	 * 
	 * Default value: false.
	 * 
	 * [`Event::OpenChannelRequest`]: crate::util::events::Event::OpenChannelRequest
	 * [`msgs::OpenChannel`]: crate::ln::msgs::OpenChannel
	 * [`msgs::AcceptChannel`]: crate::ln::msgs::AcceptChannel
	 */
	public void set_manually_accept_inbound_channels(boolean val) {
		bindings.UserConfig_set_manually_accept_inbound_channels(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new UserConfig given each field
	 */
	public static UserConfig of(ChannelHandshakeConfig own_channel_config_arg, ChannelHandshakeLimits peer_channel_config_limits_arg, ChannelConfig channel_options_arg, boolean accept_forwards_to_priv_channels_arg, boolean accept_inbound_channels_arg, boolean manually_accept_inbound_channels_arg) {
		long ret = bindings.UserConfig_new(own_channel_config_arg == null ? 0 : own_channel_config_arg.ptr & ~1, peer_channel_config_limits_arg == null ? 0 : peer_channel_config_limits_arg.ptr & ~1, channel_options_arg == null ? 0 : channel_options_arg.ptr & ~1, accept_forwards_to_priv_channels_arg, accept_inbound_channels_arg, manually_accept_inbound_channels_arg);
		Reference.reachabilityFence(own_channel_config_arg);
		Reference.reachabilityFence(peer_channel_config_limits_arg);
		Reference.reachabilityFence(channel_options_arg);
		Reference.reachabilityFence(accept_forwards_to_priv_channels_arg);
		Reference.reachabilityFence(accept_inbound_channels_arg);
		Reference.reachabilityFence(manually_accept_inbound_channels_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UserConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.UserConfig_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UserConfig
	 */
	public UserConfig clone() {
		long ret = bindings.UserConfig_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UserConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" UserConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static UserConfig with_default() {
		long ret = bindings.UserConfig_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UserConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
