
            
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
	public RouteHintHop[] get_a() {
		number[] ret = bindings.RouteHint_get_a(this.ptr);
		RouteHintHop[] ret_conv_14_arr = new RouteHintHop[ret.length];
		for (int o = 0; o < ret.length; o++) {
			number ret_conv_14 = ret[o];
			const ret_conv_14_hu_conv: RouteHintHop = new RouteHintHop(null, ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	public void set_a(RouteHintHop[] val) {
		bindings.RouteHint_set_a(this.ptr, val != null ? Arrays.stream(val).map(val_conv_14 -> val_conv_14 == null ? 0 : val_conv_14.ptr & ~1).toArray(number[]::new) : null);
	}

	public static RouteHint constructor_new(RouteHintHop[] a_arg) {
		number ret = bindings.RouteHint_new(a_arg != null ? Arrays.stream(a_arg).map(a_arg_conv_14 -> a_arg_conv_14 == null ? 0 : a_arg_conv_14.ptr & ~1).toArray(number[]::new) : null);
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public RouteHint clone() {
		number ret = bindings.RouteHint_clone(this.ptr);
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.RouteHint_hash(this.ptr);
		return ret;
	}

	public boolean eq(RouteHint b) {
		boolean ret = bindings.RouteHint_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.RouteHint_write(this.ptr);
		return ret;
	}

	public static Result_RouteHintDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.RouteHint_read(ser);
		Result_RouteHintDecodeErrorZ ret_hu_conv = Result_RouteHintDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
