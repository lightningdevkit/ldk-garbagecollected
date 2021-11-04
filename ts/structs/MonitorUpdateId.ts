
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class MonitorUpdateId extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.MonitorUpdateId_free(this.ptr);
                    }
                }
	public MonitorUpdateId clone() {
		number ret = bindings.MonitorUpdateId_clone(this.ptr);
		const ret_hu_conv: MonitorUpdateId = new MonitorUpdateId(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.MonitorUpdateId_hash(this.ptr);
		return ret;
	}

	public boolean eq(MonitorUpdateId b) {
		boolean ret = bindings.MonitorUpdateId_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
