
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class CounterpartyForwardingInfo extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.CounterpartyForwardingInfo_free(this.ptr);
                    }
                }
	public number get_fee_base_msat() {
		number ret = bindings.CounterpartyForwardingInfo_get_fee_base_msat(this.ptr);
		return ret;
	}

	public void set_fee_base_msat(number val) {
		bindings.CounterpartyForwardingInfo_set_fee_base_msat(this.ptr, val);
	}

	public number get_fee_proportional_millionths() {
		number ret = bindings.CounterpartyForwardingInfo_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_fee_proportional_millionths(number val) {
		bindings.CounterpartyForwardingInfo_set_fee_proportional_millionths(this.ptr, val);
	}

	public number get_cltv_expiry_delta() {
		number ret = bindings.CounterpartyForwardingInfo_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(number val) {
		bindings.CounterpartyForwardingInfo_set_cltv_expiry_delta(this.ptr, val);
	}

	public static CounterpartyForwardingInfo constructor_new(number fee_base_msat_arg, number fee_proportional_millionths_arg, number cltv_expiry_delta_arg) {
		number ret = bindings.CounterpartyForwardingInfo_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg);
		const ret_hu_conv: CounterpartyForwardingInfo = new CounterpartyForwardingInfo(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public CounterpartyForwardingInfo clone() {
		number ret = bindings.CounterpartyForwardingInfo_clone(this.ptr);
		const ret_hu_conv: CounterpartyForwardingInfo = new CounterpartyForwardingInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
