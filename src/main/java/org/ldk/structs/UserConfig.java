package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UserConfig extends CommonBase {
	UserConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UserConfig_free(ptr); }
	}

	public UserConfig clone() {
		long ret = bindings.UserConfig_clone(this.ptr);
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		return ret_hu_conv;
	}

	public ChannelHandshakeConfig get_own_channel_config() {
		long ret = bindings.UserConfig_get_own_channel_config(this.ptr);
		ChannelHandshakeConfig ret_hu_conv = new ChannelHandshakeConfig(null, ret);
		return ret_hu_conv;
	}

	public void set_own_channel_config(ChannelHandshakeConfig val) {
		bindings.UserConfig_set_own_channel_config(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public ChannelHandshakeLimits get_peer_channel_config_limits() {
		long ret = bindings.UserConfig_get_peer_channel_config_limits(this.ptr);
		ChannelHandshakeLimits ret_hu_conv = new ChannelHandshakeLimits(null, ret);
		return ret_hu_conv;
	}

	public void set_peer_channel_config_limits(ChannelHandshakeLimits val) {
		bindings.UserConfig_set_peer_channel_config_limits(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public ChannelConfig get_channel_options() {
		long ret = bindings.UserConfig_get_channel_options(this.ptr);
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		return ret_hu_conv;
	}

	public void set_channel_options(ChannelConfig val) {
		bindings.UserConfig_set_channel_options(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static UserConfig constructor_new(ChannelHandshakeConfig own_channel_config_arg, ChannelHandshakeLimits peer_channel_config_limits_arg, ChannelConfig channel_options_arg) {
		long ret = bindings.UserConfig_new(own_channel_config_arg == null ? 0 : own_channel_config_arg.ptr & ~1, peer_channel_config_limits_arg == null ? 0 : peer_channel_config_limits_arg.ptr & ~1, channel_options_arg == null ? 0 : channel_options_arg.ptr & ~1);
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(own_channel_config_arg);
		ret_hu_conv.ptrs_to.add(peer_channel_config_limits_arg);
		ret_hu_conv.ptrs_to.add(channel_options_arg);
		return ret_hu_conv;
	}

	public static UserConfig constructor_default() {
		long ret = bindings.UserConfig_default();
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		return ret_hu_conv;
	}

}
