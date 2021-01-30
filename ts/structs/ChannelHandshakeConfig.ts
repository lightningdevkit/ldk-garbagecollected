
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelHandshakeConfig extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelHandshakeConfig_free(this.ptr);
                    }
                }
	public ChannelHandshakeConfig clone() {
		number ret = bindings.ChannelHandshakeConfig_clone(this.ptr);
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number get_minimum_depth() {
		number ret = bindings.ChannelHandshakeConfig_get_minimum_depth(this.ptr);
		return ret;
	}

	public void set_minimum_depth(number val) {
		bindings.ChannelHandshakeConfig_set_minimum_depth(this.ptr, val);
	}

	public number get_our_to_self_delay() {
		number ret = bindings.ChannelHandshakeConfig_get_our_to_self_delay(this.ptr);
		return ret;
	}

	public void set_our_to_self_delay(number val) {
		bindings.ChannelHandshakeConfig_set_our_to_self_delay(this.ptr, val);
	}

	public number get_our_htlc_minimum_msat() {
		number ret = bindings.ChannelHandshakeConfig_get_our_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_our_htlc_minimum_msat(number val) {
		bindings.ChannelHandshakeConfig_set_our_htlc_minimum_msat(this.ptr, val);
	}

	public static ChannelHandshakeConfig constructor_new(number minimum_depth_arg, number our_to_self_delay_arg, number our_htlc_minimum_msat_arg) {
		number ret = bindings.ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ChannelHandshakeConfig constructor_default() {
		number ret = bindings.ChannelHandshakeConfig_default();
		const ret_hu_conv: ChannelHandshakeConfig = new ChannelHandshakeConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
