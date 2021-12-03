
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RouteParameters extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RouteParameters_free(this.ptr);
                    }
                }
	public Payee get_payee() {
		number ret = bindings.RouteParameters_get_payee(this.ptr);
		const ret_hu_conv: Payee = new Payee(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_payee(Payee val) {
		bindings.RouteParameters_set_payee(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public number get_final_value_msat() {
		number ret = bindings.RouteParameters_get_final_value_msat(this.ptr);
		return ret;
	}

	public void set_final_value_msat(number val) {
		bindings.RouteParameters_set_final_value_msat(this.ptr, val);
	}

	public number get_final_cltv_expiry_delta() {
		number ret = bindings.RouteParameters_get_final_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_final_cltv_expiry_delta(number val) {
		bindings.RouteParameters_set_final_cltv_expiry_delta(this.ptr, val);
	}

	public static RouteParameters constructor_new(Payee payee_arg, number final_value_msat_arg, number final_cltv_expiry_delta_arg) {
		number ret = bindings.RouteParameters_new(payee_arg == null ? 0 : payee_arg.ptr & ~1, final_value_msat_arg, final_cltv_expiry_delta_arg);
		const ret_hu_conv: RouteParameters = new RouteParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.RouteParameters_clone_ptr(this.ptr);
		return ret;
	}

	public RouteParameters clone() {
		number ret = bindings.RouteParameters_clone(this.ptr);
		const ret_hu_conv: RouteParameters = new RouteParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.RouteParameters_write(this.ptr);
		return ret;
	}

	public static Result_RouteParametersDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.RouteParameters_read(ser);
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
