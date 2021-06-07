
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class PayeePubKey extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.PayeePubKey_free(this.ptr);
                    }
                }
	public boolean eq(PayeePubKey b) {
		boolean ret = bindings.PayeePubKey_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public PayeePubKey clone() {
		number ret = bindings.PayeePubKey_clone(this.ptr);
		const ret_hu_conv: PayeePubKey = new PayeePubKey(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
