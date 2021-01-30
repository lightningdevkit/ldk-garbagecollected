
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class DirectionalChannelInfo extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.DirectionalChannelInfo_free(this.ptr);
                    }
                }
	public DirectionalChannelInfo clone() {
		number ret = bindings.DirectionalChannelInfo_clone(this.ptr);
		const ret_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number get_last_update() {
		number ret = bindings.DirectionalChannelInfo_get_last_update(this.ptr);
		return ret;
	}

	public void set_last_update(number val) {
		bindings.DirectionalChannelInfo_set_last_update(this.ptr, val);
	}

	public boolean get_enabled() {
		boolean ret = bindings.DirectionalChannelInfo_get_enabled(this.ptr);
		return ret;
	}

	public void set_enabled(boolean val) {
		bindings.DirectionalChannelInfo_set_enabled(this.ptr, val);
	}

	public number get_cltv_expiry_delta() {
		number ret = bindings.DirectionalChannelInfo_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(number val) {
		bindings.DirectionalChannelInfo_set_cltv_expiry_delta(this.ptr, val);
	}

	public number get_htlc_minimum_msat() {
		number ret = bindings.DirectionalChannelInfo_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(number val) {
		bindings.DirectionalChannelInfo_set_htlc_minimum_msat(this.ptr, val);
	}

	public RoutingFees get_fees() {
		number ret = bindings.DirectionalChannelInfo_get_fees(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_fees(RoutingFees val) {
		bindings.DirectionalChannelInfo_set_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public ChannelUpdate get_last_update_message() {
		number ret = bindings.DirectionalChannelInfo_get_last_update_message(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_last_update_message(ChannelUpdate val) {
		bindings.DirectionalChannelInfo_set_last_update_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.DirectionalChannelInfo_write(this.ptr);
		return ret;
	}

	public static DirectionalChannelInfo constructor_read(Uint8Array ser) {
		number ret = bindings.DirectionalChannelInfo_read(ser);
		const ret_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
