package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


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
		ChannelHandshakeConfig ret_hu_conv = new ChannelHandshakeConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Channel config that we propose to our counterparty.
	 */
	public void set_own_channel_config(ChannelHandshakeConfig val) {
		bindings.UserConfig_set_own_channel_config(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Limits applied to our counterparty's proposed channel config settings.
	 */
	public ChannelHandshakeLimits get_peer_channel_config_limits() {
		long ret = bindings.UserConfig_get_peer_channel_config_limits(this.ptr);
		ChannelHandshakeLimits ret_hu_conv = new ChannelHandshakeLimits(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Limits applied to our counterparty's proposed channel config settings.
	 */
	public void set_peer_channel_config_limits(ChannelHandshakeLimits val) {
		bindings.UserConfig_set_peer_channel_config_limits(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Channel config which affects behavior during channel lifetime.
	 */
	public ChannelConfig get_channel_options() {
		long ret = bindings.UserConfig_get_channel_options(this.ptr);
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Channel config which affects behavior during channel lifetime.
	 */
	public void set_channel_options(ChannelConfig val) {
		bindings.UserConfig_set_channel_options(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Constructs a new UserConfig given each field
	 */
	public static UserConfig constructor_new(ChannelHandshakeConfig own_channel_config_arg, ChannelHandshakeLimits peer_channel_config_limits_arg, ChannelConfig channel_options_arg) {
		long ret = bindings.UserConfig_new(own_channel_config_arg == null ? 0 : own_channel_config_arg.ptr & ~1, peer_channel_config_limits_arg == null ? 0 : peer_channel_config_limits_arg.ptr & ~1, channel_options_arg == null ? 0 : channel_options_arg.ptr & ~1);
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(own_channel_config_arg);
		ret_hu_conv.ptrs_to.add(peer_channel_config_limits_arg);
		ret_hu_conv.ptrs_to.add(channel_options_arg);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the UserConfig
	 */
	public UserConfig clone() {
		long ret = bindings.UserConfig_clone(this.ptr);
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" UserConfig. See other documentaiton for details on what this implies.
	 */
	public static UserConfig constructor_default() {
		long ret = bindings.UserConfig_default();
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
