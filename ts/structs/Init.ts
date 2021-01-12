
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Init extends CommonBase {
	Init(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Init_free(ptr); }
	}

	public Init clone() {
		uint32_t ret = bindings.Init_clone(this.ptr);
		Init ret_hu_conv = new Init(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.Init_write(this.ptr);
		return ret;
	}

	public static Result_InitDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.Init_read(ser);
		Result_InitDecodeErrorZ ret_hu_conv = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
