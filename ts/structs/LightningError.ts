
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class LightningError extends CommonBase {
	LightningError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.LightningError_free(ptr); }
	}

	public String get_err() {
		String ret = bindings.LightningError_get_err(this.ptr);
		return ret;
	}

	public void set_err(byte[] val) {
		bindings.LightningError_set_err(this.ptr, val);
	}

	public ErrorAction get_action() {
		uint32_t ret = bindings.LightningError_get_action(this.ptr);
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_action(ErrorAction val) {
		bindings.LightningError_set_action(this.ptr, val.ptr);
	}

	public static LightningError constructor_new(byte[] err_arg, ErrorAction action_arg) {
		uint32_t ret = bindings.LightningError_new(err_arg, action_arg.ptr);
		LightningError ret_hu_conv = new LightningError(null, ret);
		return ret_hu_conv;
	}

}
