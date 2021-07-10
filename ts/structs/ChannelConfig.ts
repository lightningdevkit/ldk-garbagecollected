
            
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
	public number get_forwarding_fee_proportional_millionths() {
		number ret = bindings.ChannelConfig_get_forwarding_fee_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_forwarding_fee_proportional_millionths(number val) {
		bindings.ChannelConfig_set_forwarding_fee_proportional_millionths(this.ptr, val);
	}

	public number get_forwarding_fee_base_msat() {
		number ret = bindings.ChannelConfig_get_forwarding_fee_base_msat(this.ptr);
		return ret;
	}

	public void set_forwarding_fee_base_msat(number val) {
		bindings.ChannelConfig_set_forwarding_fee_base_msat(this.ptr, val);
	}

	public number get_cltv_expiry_delta() {
		number ret = bindings.ChannelConfig_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(number val) {
		bindings.ChannelConfig_set_cltv_expiry_delta(this.ptr, val);
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

	public static ChannelConfig constructor_new(number forwarding_fee_proportional_millionths_arg, number forwarding_fee_base_msat_arg, number cltv_expiry_delta_arg, boolean announced_channel_arg, boolean commit_upfront_shutdown_pubkey_arg) {
		number ret = bindings.ChannelConfig_new(forwarding_fee_proportional_millionths_arg, forwarding_fee_base_msat_arg, cltv_expiry_delta_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public ChannelConfig clone() {
		number ret = bindings.ChannelConfig_clone(this.ptr);
		const ret_hu_conv: ChannelConfig = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
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

	public static Result_ChannelConfigDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelConfig_read(ser);
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
