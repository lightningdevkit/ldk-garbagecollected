
            
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

	public Option_u64Z get_htlc_maximum_msat() {
		number ret = bindings.DirectionalChannelInfo_get_htlc_maximum_msat(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_htlc_maximum_msat(Option_u64Z val) {
		bindings.DirectionalChannelInfo_set_htlc_maximum_msat(this.ptr, val.ptr);
	}

	public RoutingFees get_fees() {
		number ret = bindings.DirectionalChannelInfo_get_fees(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_fees(RoutingFees val) {
		bindings.DirectionalChannelInfo_set_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public ChannelUpdate get_last_update_message() {
		number ret = bindings.DirectionalChannelInfo_get_last_update_message(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_last_update_message(ChannelUpdate val) {
		bindings.DirectionalChannelInfo_set_last_update_message(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public static DirectionalChannelInfo constructor_new(number last_update_arg, boolean enabled_arg, number cltv_expiry_delta_arg, number htlc_minimum_msat_arg, Option_u64Z htlc_maximum_msat_arg, RoutingFees fees_arg, ChannelUpdate last_update_message_arg) {
		number ret = bindings.DirectionalChannelInfo_new(last_update_arg, enabled_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg.ptr, fees_arg == null ? 0 : fees_arg.ptr & ~1, last_update_message_arg == null ? 0 : last_update_message_arg.ptr & ~1);
		const ret_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public DirectionalChannelInfo clone() {
		number ret = bindings.DirectionalChannelInfo_clone(this.ptr);
		const ret_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.DirectionalChannelInfo_write(this.ptr);
		return ret;
	}

	public static Result_DirectionalChannelInfoDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.DirectionalChannelInfo_read(ser);
		Result_DirectionalChannelInfoDecodeErrorZ ret_hu_conv = Result_DirectionalChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
