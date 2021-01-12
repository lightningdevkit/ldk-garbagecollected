
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Pong extends CommonBase {
	Pong(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Pong_free(ptr); }
	}

	public Pong clone() {
		uint32_t ret = bindings.Pong_clone(this.ptr);
		Pong ret_hu_conv = new Pong(null, ret);
		return ret_hu_conv;
	}

	public short get_byteslen() {
		short ret = bindings.Pong_get_byteslen(this.ptr);
		return ret;
	}

	public void set_byteslen(short val) {
		bindings.Pong_set_byteslen(this.ptr, val);
	}

	public static Pong constructor_new(short byteslen_arg) {
		uint32_t ret = bindings.Pong_new(byteslen_arg);
		Pong ret_hu_conv = new Pong(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.Pong_write(this.ptr);
		return ret;
	}

	public static Result_PongDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.Pong_read(ser);
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
