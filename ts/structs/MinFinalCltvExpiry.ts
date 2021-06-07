
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class MinFinalCltvExpiry extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.MinFinalCltvExpiry_free(this.ptr);
                    }
                }
	public boolean eq(MinFinalCltvExpiry b) {
		boolean ret = bindings.MinFinalCltvExpiry_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public MinFinalCltvExpiry clone() {
		number ret = bindings.MinFinalCltvExpiry_clone(this.ptr);
		const ret_hu_conv: MinFinalCltvExpiry = new MinFinalCltvExpiry(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
