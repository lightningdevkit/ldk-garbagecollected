
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class LightningError extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.LightningError_free(this.ptr);
                    }
                }
	public String get_err() {
		String ret = bindings.LightningError_get_err(this.ptr);
		return ret;
	}

	public void set_err(Uint8Array val) {
		bindings.LightningError_set_err(this.ptr, val);
	}

	public ErrorAction get_action() {
		number ret = bindings.LightningError_get_action(this.ptr);
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_action(ErrorAction val) {
		bindings.LightningError_set_action(this.ptr, val.ptr);
	}

	public static LightningError constructor_new(Uint8Array err_arg, ErrorAction action_arg) {
		number ret = bindings.LightningError_new(err_arg, action_arg.ptr);
		const ret_hu_conv: LightningError = new LightningError(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public LightningError clone() {
		number ret = bindings.LightningError_clone(this.ptr);
		const ret_hu_conv: LightningError = new LightningError(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
