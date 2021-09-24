
            
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

	public number hash() {
		number ret = bindings.RouteHint_hash(this.ptr);
		return ret;
	}

	public boolean eq(RouteHint b) {
		boolean ret = bindings.RouteHint_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
