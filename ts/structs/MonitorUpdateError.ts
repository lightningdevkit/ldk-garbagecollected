
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class MonitorUpdateError extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.MonitorUpdateError_free(this.ptr);
                    }
                }
	public MonitorUpdateError clone() {
		number ret = bindings.MonitorUpdateError_clone(this.ptr);
		const ret_hu_conv: MonitorUpdateError = new MonitorUpdateError(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
