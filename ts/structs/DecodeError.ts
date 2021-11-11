
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class DecodeError extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.DecodeError_free(this.ptr);
                    }
                }
	public number clone_ptr() {
		number ret = bindings.DecodeError_clone_ptr(this.ptr);
		return ret;
	}

	public DecodeError clone() {
		number ret = bindings.DecodeError_clone(this.ptr);
		const ret_hu_conv: DecodeError = new DecodeError(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
