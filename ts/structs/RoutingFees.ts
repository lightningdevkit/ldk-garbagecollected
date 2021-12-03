
            
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
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public boolean eq(RoutingFees b) {
		boolean ret = bindings.RoutingFees_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.RoutingFees_clone_ptr(this.ptr);
		return ret;
	}

	public RoutingFees clone() {
		number ret = bindings.RoutingFees_clone(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.RoutingFees_hash(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.RoutingFees_write(this.ptr);
		return ret;
	}

	public static Result_RoutingFeesDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.RoutingFees_read(ser);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
