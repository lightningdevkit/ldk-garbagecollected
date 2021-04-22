
            
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
	public RouteHint clone() {
		number ret = bindings.RouteHint_clone(this.ptr);
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static Result_RouteHintCreationErrorZ constructor_new(RouteHintHop[] hops) {
		number ret = bindings.RouteHint_new(Arrays.stream(hops).map(hops_conv_14 -> hops_conv_14 == null ? 0 : hops_conv_14.ptr & ~1).toArray(number[]::new));
		Result_RouteHintCreationErrorZ ret_hu_conv = Result_RouteHintCreationErrorZ.constr_from_ptr(ret);
		/* TODO 2 RouteHintHop  */;
		return ret_hu_conv;
	}

	public RouteHintHop[] into_inner() {
		number[] ret = bindings.RouteHint_into_inner(this.ptr);
		RouteHintHop[] ret_conv_14_arr = new RouteHintHop[ret.length];
		for (int o = 0; o < ret.length; o++) {
			number ret_conv_14 = ret[o];
			const ret_conv_14_hu_conv: RouteHintHop = new RouteHintHop(null, ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

}
