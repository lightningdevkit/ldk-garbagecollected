
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RouteHint extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RouteHint_free(this.ptr);
                    }
                }
	public Uint8Array get_src_node_id() {
		Uint8Array ret = bindings.RouteHint_get_src_node_id(this.ptr);
		return ret;
	}

	public void set_src_node_id(Uint8Array val) {
		bindings.RouteHint_set_src_node_id(this.ptr, val);
	}

	public number get_short_channel_id() {
		number ret = bindings.RouteHint_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(number val) {
		bindings.RouteHint_set_short_channel_id(this.ptr, val);
	}

	public RoutingFees get_fees() {
		number ret = bindings.RouteHint_get_fees(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_fees(RoutingFees val) {
		bindings.RouteHint_set_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public number get_cltv_expiry_delta() {
		number ret = bindings.RouteHint_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(number val) {
		bindings.RouteHint_set_cltv_expiry_delta(this.ptr, val);
	}

	public number get_htlc_minimum_msat() {
		number ret = bindings.RouteHint_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(number val) {
		bindings.RouteHint_set_htlc_minimum_msat(this.ptr, val);
	}

	public static RouteHint constructor_new(Uint8Array src_node_id_arg, number short_channel_id_arg, RoutingFees fees_arg, number cltv_expiry_delta_arg, number htlc_minimum_msat_arg) {
		number ret = bindings.RouteHint_new(src_node_id_arg, short_channel_id_arg, fees_arg == null ? 0 : fees_arg.ptr & ~1, cltv_expiry_delta_arg, htlc_minimum_msat_arg);
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(fees_arg);
		return ret_hu_conv;
	}

	public RouteHint clone() {
		number ret = bindings.RouteHint_clone(this.ptr);
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
