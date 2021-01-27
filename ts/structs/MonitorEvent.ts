
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class MonitorEvent extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.MonitorEvent_free(this.ptr);
                    }
                }
	public MonitorEvent clone() {
		number ret = bindings.MonitorEvent_clone(this.ptr);
		const ret_hu_conv: MonitorEvent = new MonitorEvent(null, ret);
		return ret_hu_conv;
	}

}
