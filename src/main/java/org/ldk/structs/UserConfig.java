package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class UserConfig extends CommonBase {
	UserConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.UserConfig_free(ptr);
	}

	public UserConfig(UserConfig orig) {
		super(bindings.UserConfig_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public ChannelHandshakeConfig get_own_channel_config(UserConfig this_ptr) {
		ChannelHandshakeConfig ret = new ChannelHandshakeConfig(null, bindings.UserConfig_get_own_channel_config(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_own_channel_config(UserConfig this_ptr, ChannelHandshakeConfig val) {
		bindings.UserConfig_set_own_channel_config(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public ChannelHandshakeLimits get_peer_channel_config_limits(UserConfig this_ptr) {
		ChannelHandshakeLimits ret = new ChannelHandshakeLimits(null, bindings.UserConfig_get_peer_channel_config_limits(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_peer_channel_config_limits(UserConfig this_ptr, ChannelHandshakeLimits val) {
		bindings.UserConfig_set_peer_channel_config_limits(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public ChannelConfig get_channel_options(UserConfig this_ptr) {
		ChannelConfig ret = new ChannelConfig(null, bindings.UserConfig_get_channel_options(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_options(UserConfig this_ptr, ChannelConfig val) {
		bindings.UserConfig_set_channel_options(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public UserConfig(ChannelHandshakeConfig own_channel_config_arg, ChannelHandshakeLimits peer_channel_config_limits_arg, ChannelConfig channel_options_arg) {
		super(bindings.UserConfig_new(own_channel_config_arg == null ? 0 : own_channel_config_arg.ptr & ~1, peer_channel_config_limits_arg == null ? 0 : peer_channel_config_limits_arg.ptr & ~1, channel_options_arg == null ? 0 : channel_options_arg.ptr & ~1));
		this.ptrs_to.add(own_channel_config_arg);
		this.ptrs_to.add(peer_channel_config_limits_arg);
		this.ptrs_to.add(channel_options_arg);
	}

	public UserConfig() {
		super(bindings.UserConfig_default());
	}

}
