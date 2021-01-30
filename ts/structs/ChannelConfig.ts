
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelConfig extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelConfig_free(this.ptr);
                    }
                }
	public ChannelConfig clone() {
		number ret = bindings.ChannelConfig_clone(this.ptr);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number get_fee_proportional_millionths() {
		number ret = bindings.ChannelConfig_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_fee_proportional_millionths(number val) {
		bindings.ChannelConfig_set_fee_proportional_millionths(this.ptr, val);
	}

	public boolean get_announced_channel() {
		boolean ret = bindings.ChannelConfig_get_announced_channel(this.ptr);
		return ret;
	}

	public void set_announced_channel(boolean val) {
		bindings.ChannelConfig_set_announced_channel(this.ptr, val);
	}

	public boolean get_commit_upfront_shutdown_pubkey() {
		boolean ret = bindings.ChannelConfig_get_commit_upfront_shutdown_pubkey(this.ptr);
		return ret;
	}

	public void set_commit_upfront_shutdown_pubkey(boolean val) {
		bindings.ChannelConfig_set_commit_upfront_shutdown_pubkey(this.ptr, val);
	}

	public static ChannelConfig constructor_new(number fee_proportional_millionths_arg, boolean announced_channel_arg, boolean commit_upfront_shutdown_pubkey_arg) {
		number ret = bindings.ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ChannelConfig constructor_default() {
		number ret = bindings.ChannelConfig_default();
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelConfig_write(this.ptr);
		return ret;
	}

	public static ChannelConfig constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelConfig_read(ser);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
