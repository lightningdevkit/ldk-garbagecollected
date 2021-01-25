
            
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
	public Route clone() {
		number ret = bindings.Route_clone(this.ptr);
		const ret_hu_conv: Route = new Route(null, ret);
		return ret_hu_conv;
	}

	public void set_paths(RouteHop[][] val) {
		bindings.Route_set_paths(this.ptr, (number[][])Arrays.stream(val).map(arr_conv_12 -> (number[])Arrays.stream(arr_conv_12).map(arr_conv_10 -> arr_conv_10 == null ? 0 : arr_conv_10.ptr & ~1).toArray()).toArray());
		/* TODO 2 RouteHop[]  */;
	}

	public static Route constructor_new(RouteHop[][] paths_arg) {
		number ret = bindings.Route_new((number[][])Arrays.stream(paths_arg).map(arr_conv_12 -> (number[])Arrays.stream(arr_conv_12).map(arr_conv_10 -> arr_conv_10 == null ? 0 : arr_conv_10.ptr & ~1).toArray()).toArray());
		const ret_hu_conv: Route = new Route(null, ret);
		/* TODO 2 RouteHop[]  */;
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
