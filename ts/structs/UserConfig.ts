
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UserConfig extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UserConfig_free(this.ptr);
                    }
                }
	public ChannelHandshakeConfig get_own_channel_config() {
		number ret = bindings.UserConfig_get_own_channel_config(this.ptr);
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_own_channel_config(ChannelHandshakeConfig val) {
		bindings.UserConfig_set_own_channel_config(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public ChannelHandshakeLimits get_peer_channel_config_limits() {
		number ret = bindings.UserConfig_get_peer_channel_config_limits(this.ptr);
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_peer_channel_config_limits(ChannelHandshakeLimits val) {
		bindings.UserConfig_set_peer_channel_config_limits(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public ChannelConfig get_channel_options() {
		number ret = bindings.UserConfig_get_channel_options(this.ptr);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_channel_options(ChannelConfig val) {
		bindings.UserConfig_set_channel_options(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public boolean get_accept_forwards_to_priv_channels() {
		boolean ret = bindings.UserConfig_get_accept_forwards_to_priv_channels(this.ptr);
		return ret;
	}

	public void set_accept_forwards_to_priv_channels(boolean val) {
		bindings.UserConfig_set_accept_forwards_to_priv_channels(this.ptr, val);
	}

	public boolean get_accept_inbound_channels() {
		boolean ret = bindings.UserConfig_get_accept_inbound_channels(this.ptr);
		return ret;
	}

	public void set_accept_inbound_channels(boolean val) {
		bindings.UserConfig_set_accept_inbound_channels(this.ptr, val);
	}

	public static UserConfig constructor_new(ChannelHandshakeConfig own_channel_config_arg, ChannelHandshakeLimits peer_channel_config_limits_arg, ChannelConfig channel_options_arg, boolean accept_forwards_to_priv_channels_arg, boolean accept_inbound_channels_arg) {
		number ret = bindings.UserConfig_new(own_channel_config_arg == null ? 0 : own_channel_config_arg.ptr & ~1, peer_channel_config_limits_arg == null ? 0 : peer_channel_config_limits_arg.ptr & ~1, channel_options_arg == null ? 0 : channel_options_arg.ptr & ~1, accept_forwards_to_priv_channels_arg, accept_inbound_channels_arg);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.UserConfig_clone_ptr(this.ptr);
		return ret;
	}

	public UserConfig clone() {
		number ret = bindings.UserConfig_clone(this.ptr);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static UserConfig constructor_default() {
		number ret = bindings.UserConfig_default();
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
