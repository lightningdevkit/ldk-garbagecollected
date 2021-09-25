
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Route extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Route_free(this.ptr);
                    }
                }
	public RouteHop[][] get_paths() {
		number[][] ret = bindings.Route_get_paths(this.ptr);
		RouteHop[][] ret_conv_12_arr = new RouteHop[ret.length][];
		for (int m = 0; m < ret.length; m++) {
			number[] ret_conv_12 = ret[m];
			RouteHop[] ret_conv_12_conv_10_arr = new RouteHop[ret_conv_12.length];
			for (int k = 0; k < ret_conv_12.length; k++) {
				number ret_conv_12_conv_10 = ret_conv_12[k];
				const ret_conv_12_conv_10_hu_conv: RouteHop = new RouteHop(null, ret_conv_12_conv_10);
				ret_conv_12_conv_10_hu_conv.ptrs_to.add(this);
				ret_conv_12_conv_10_arr[k] = ret_conv_12_conv_10_hu_conv;
			}
			ret_conv_12_arr[m] = ret_conv_12_conv_10_arr;
		}
		return ret_conv_12_arr;
	}

	public void set_paths(RouteHop[][] val) {
		bindings.Route_set_paths(this.ptr, val != null ? Arrays.stream(val).map(val_conv_12 -> val_conv_12 != null ? Arrays.stream(val_conv_12).map(val_conv_12_conv_10 -> val_conv_12_conv_10 == null ? 0 : val_conv_12_conv_10.ptr & ~1).toArray(number[]::new) : null).toArray(number[][]::new) : null);
		for (RouteHop[] val_conv_12: val) { for (RouteHop val_conv_12_conv_10: val_conv_12) { this.ptrs_to.add(val_conv_12_conv_10); }; };
	}

	public static Route constructor_new(RouteHop[][] paths_arg) {
		number ret = bindings.Route_new(paths_arg != null ? Arrays.stream(paths_arg).map(paths_arg_conv_12 -> paths_arg_conv_12 != null ? Arrays.stream(paths_arg_conv_12).map(paths_arg_conv_12_conv_10 -> paths_arg_conv_12_conv_10 == null ? 0 : paths_arg_conv_12_conv_10.ptr & ~1).toArray(number[]::new) : null).toArray(number[][]::new) : null);
		const ret_hu_conv: Route = new Route(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		for (RouteHop[] paths_arg_conv_12: paths_arg) { for (RouteHop paths_arg_conv_12_conv_10: paths_arg_conv_12) { ret_hu_conv.ptrs_to.add(paths_arg_conv_12_conv_10); }; };
		return ret_hu_conv;
	}

	public Route clone() {
		number ret = bindings.Route_clone(this.ptr);
		const ret_hu_conv: Route = new Route(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.Route_hash(this.ptr);
		return ret;
	}

	public boolean eq(Route b) {
		boolean ret = bindings.Route_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public number get_total_fees() {
		number ret = bindings.Route_get_total_fees(this.ptr);
		return ret;
	}

	public number get_total_amount() {
		number ret = bindings.Route_get_total_amount(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.Route_write(this.ptr);
		return ret;
	}

	public static Result_RouteDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.Route_read(ser);
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
