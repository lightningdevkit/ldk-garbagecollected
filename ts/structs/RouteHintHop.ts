
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RouteHintHop extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RouteHintHop_free(this.ptr);
                    }
                }
	public Uint8Array get_src_node_id() {
		Uint8Array ret = bindings.RouteHintHop_get_src_node_id(this.ptr);
		return ret;
	}

	public void set_src_node_id(Uint8Array val) {
		bindings.RouteHintHop_set_src_node_id(this.ptr, val);
	}

	public number get_short_channel_id() {
		number ret = bindings.RouteHintHop_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(number val) {
		bindings.RouteHintHop_set_short_channel_id(this.ptr, val);
	}

	public RoutingFees get_fees() {
		number ret = bindings.RouteHintHop_get_fees(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_fees(RoutingFees val) {
		bindings.RouteHintHop_set_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public number get_cltv_expiry_delta() {
		number ret = bindings.RouteHintHop_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(number val) {
		bindings.RouteHintHop_set_cltv_expiry_delta(this.ptr, val);
	}

	public Option_u64Z get_htlc_minimum_msat() {
		number ret = bindings.RouteHintHop_get_htlc_minimum_msat(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_htlc_minimum_msat(Option_u64Z val) {
		bindings.RouteHintHop_set_htlc_minimum_msat(this.ptr, val.ptr);
	}

	public Option_u64Z get_htlc_maximum_msat() {
		number ret = bindings.RouteHintHop_get_htlc_maximum_msat(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_htlc_maximum_msat(Option_u64Z val) {
		bindings.RouteHintHop_set_htlc_maximum_msat(this.ptr, val.ptr);
	}

	public static RouteHintHop constructor_new(Uint8Array src_node_id_arg, number short_channel_id_arg, RoutingFees fees_arg, number cltv_expiry_delta_arg, Option_u64Z htlc_minimum_msat_arg, Option_u64Z htlc_maximum_msat_arg) {
		number ret = bindings.RouteHintHop_new(src_node_id_arg, short_channel_id_arg, fees_arg == null ? 0 : fees_arg.ptr & ~1, cltv_expiry_delta_arg, htlc_minimum_msat_arg.ptr, htlc_maximum_msat_arg.ptr);
		const ret_hu_conv: RouteHintHop = new RouteHintHop(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(fees_arg);
		return ret_hu_conv;
	}

	public boolean eq(RouteHintHop b) {
		boolean ret = bindings.RouteHintHop_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public RouteHintHop clone() {
		number ret = bindings.RouteHintHop_clone(this.ptr);
		const ret_hu_conv: RouteHintHop = new RouteHintHop(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
