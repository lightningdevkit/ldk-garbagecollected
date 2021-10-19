
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class InvalidShutdownScript extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.InvalidShutdownScript_free(this.ptr);
                    }
                }
	public Uint8Array get_script() {
		Uint8Array ret = bindings.InvalidShutdownScript_get_script(this.ptr);
		return ret;
	}

	public void set_script(Uint8Array val) {
		bindings.InvalidShutdownScript_set_script(this.ptr, val);
	}

	public static InvalidShutdownScript constructor_new(Uint8Array script_arg) {
		number ret = bindings.InvalidShutdownScript_new(script_arg);
		const ret_hu_conv: InvalidShutdownScript = new InvalidShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public InvalidShutdownScript clone() {
		number ret = bindings.InvalidShutdownScript_clone(this.ptr);
		const ret_hu_conv: InvalidShutdownScript = new InvalidShutdownScript(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
