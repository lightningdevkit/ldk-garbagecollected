
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class PrivateRoute extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.PrivateRoute_free(this.ptr);
                    }
                }
	public PrivateRoute clone() {
		number ret = bindings.PrivateRoute_clone(this.ptr);
		const ret_hu_conv: PrivateRoute = new PrivateRoute(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.PrivateRoute_hash(this.ptr);
		return ret;
	}

	public boolean eq(PrivateRoute b) {
		boolean ret = bindings.PrivateRoute_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public static Result_PrivateRouteCreationErrorZ constructor_new(RouteHint hops) {
		number ret = bindings.PrivateRoute_new(hops == null ? 0 : hops.ptr & ~1);
		Result_PrivateRouteCreationErrorZ ret_hu_conv = Result_PrivateRouteCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(hops);
		return ret_hu_conv;
	}

	public RouteHint into_inner() {
		number ret = bindings.PrivateRoute_into_inner(this.ptr);
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
