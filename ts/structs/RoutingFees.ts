
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RoutingFees extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RoutingFees_free(this.ptr);
                    }
                }
	public RoutingFees clone() {
		number ret = bindings.RoutingFees_clone(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		return ret_hu_conv;
	}

	public number get_base_msat() {
		number ret = bindings.RoutingFees_get_base_msat(this.ptr);
		return ret;
	}

	public void set_base_msat(number val) {
		bindings.RoutingFees_set_base_msat(this.ptr, val);
	}

	public number get_proportional_millionths() {
		number ret = bindings.RoutingFees_get_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_proportional_millionths(number val) {
		bindings.RoutingFees_set_proportional_millionths(this.ptr, val);
	}

	public static RoutingFees constructor_new(number base_msat_arg, number proportional_millionths_arg) {
		number ret = bindings.RoutingFees_new(base_msat_arg, proportional_millionths_arg);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		return ret_hu_conv;
	}

	public static Result_RoutingFeesDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.RoutingFees_read(ser);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.RoutingFees_write(this.ptr);
		return ret;
	}

}
