
            
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
	public String get_a() {
		String ret = bindings.MonitorUpdateError_get_a(this.ptr);
		return ret;
	}

	public void set_a(String val) {
		bindings.MonitorUpdateError_set_a(this.ptr, val);
	}

	public static MonitorUpdateError constructor_new(String a_arg) {
		number ret = bindings.MonitorUpdateError_new(a_arg);
		const ret_hu_conv: MonitorUpdateError = new MonitorUpdateError(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.MonitorUpdateError_clone_ptr(this.ptr);
		return ret;
	}

	public MonitorUpdateError clone() {
		number ret = bindings.MonitorUpdateError_clone(this.ptr);
		const ret_hu_conv: MonitorUpdateError = new MonitorUpdateError(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
