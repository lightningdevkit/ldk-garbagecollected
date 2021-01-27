
            
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
	public UserConfig clone() {
		number ret = bindings.UserConfig_clone(this.ptr);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		return ret_hu_conv;
	}

	public ChannelHandshakeConfig get_own_channel_config() {
		number ret = bindings.UserConfig_get_own_channel_config(this.ptr);
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		return ret_hu_conv;
	}

	public void set_own_channel_config(ChannelHandshakeConfig val) {
		bindings.UserConfig_set_own_channel_config(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public ChannelHandshakeLimits get_peer_channel_config_limits() {
		number ret = bindings.UserConfig_get_peer_channel_config_limits(this.ptr);
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		return ret_hu_conv;
	}

	public void set_peer_channel_config_limits(ChannelHandshakeLimits val) {
		bindings.UserConfig_set_peer_channel_config_limits(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public ChannelConfig get_channel_options() {
		number ret = bindings.UserConfig_get_channel_options(this.ptr);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		return ret_hu_conv;
	}

	public void set_channel_options(ChannelConfig val) {
		bindings.UserConfig_set_channel_options(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static UserConfig constructor_new(ChannelHandshakeConfig own_channel_config_arg, ChannelHandshakeLimits peer_channel_config_limits_arg, ChannelConfig channel_options_arg) {
		number ret = bindings.UserConfig_new(own_channel_config_arg == null ? 0 : own_channel_config_arg.ptr & ~1, peer_channel_config_limits_arg == null ? 0 : peer_channel_config_limits_arg.ptr & ~1, channel_options_arg == null ? 0 : channel_options_arg.ptr & ~1);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		ret_hu_conv.ptrs_to.add(own_channel_config_arg);
		ret_hu_conv.ptrs_to.add(peer_channel_config_limits_arg);
		ret_hu_conv.ptrs_to.add(channel_options_arg);
		return ret_hu_conv;
	}

	public static UserConfig constructor_default() {
		number ret = bindings.UserConfig_default();
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		return ret_hu_conv;
	}

}
