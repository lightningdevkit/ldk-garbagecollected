
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class HTLCUpdate extends CommonBase {
	HTLCUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HTLCUpdate_free(ptr); }
	}

	public HTLCUpdate clone() {
		uint32_t ret = bindings.HTLCUpdate_clone(this.ptr);
		HTLCUpdate ret_hu_conv = new HTLCUpdate(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.HTLCUpdate_write(this.ptr);
		return ret;
	}

	public static HTLCUpdate constructor_read(byte[] ser) {
		uint32_t ret = bindings.HTLCUpdate_read(ser);
		HTLCUpdate ret_hu_conv = new HTLCUpdate(null, ret);
		return ret_hu_conv;
	}

}
