
            
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
	public void set_paths(RouteHop[][] val) {
		bindings.Route_set_paths(this.ptr, val != null ? Arrays.stream(val).map(val_conv_12 -> val_conv_12 != null ? Arrays.stream(val_conv_12).map(val_conv_12_conv_10 -> val_conv_12_conv_10 == null ? 0 : val_conv_12_conv_10.ptr & ~1).toArray(number[]::new) : null).toArray(number[][]::new) : null);
		/* TODO 2 RouteHop[]  */;
	}

	public static Route constructor_new(RouteHop[][] paths_arg) {
		number ret = bindings.Route_new(paths_arg != null ? Arrays.stream(paths_arg).map(paths_arg_conv_12 -> paths_arg_conv_12 != null ? Arrays.stream(paths_arg_conv_12).map(paths_arg_conv_12_conv_10 -> paths_arg_conv_12_conv_10 == null ? 0 : paths_arg_conv_12_conv_10.ptr & ~1).toArray(number[]::new) : null).toArray(number[][]::new) : null);
		const ret_hu_conv: Route = new Route(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		/* TODO 2 RouteHop[]  */;
		return ret_hu_conv;
	}

	public Route clone() {
		number ret = bindings.Route_clone(this.ptr);
		const ret_hu_conv: Route = new Route(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
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
