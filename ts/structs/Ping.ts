
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Ping extends CommonBase {
	Ping(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Ping_free(ptr); }
	}

	public Ping clone() {
		uint32_t ret = bindings.Ping_clone(this.ptr);
		Ping ret_hu_conv = new Ping(null, ret);
		return ret_hu_conv;
	}

	public short get_ponglen() {
		short ret = bindings.Ping_get_ponglen(this.ptr);
		return ret;
	}

	public void set_ponglen(short val) {
		bindings.Ping_set_ponglen(this.ptr, val);
	}

	public short get_byteslen() {
		short ret = bindings.Ping_get_byteslen(this.ptr);
		return ret;
	}

	public void set_byteslen(short val) {
		bindings.Ping_set_byteslen(this.ptr, val);
	}

	public static Ping constructor_new(short ponglen_arg, short byteslen_arg) {
		uint32_t ret = bindings.Ping_new(ponglen_arg, byteslen_arg);
		Ping ret_hu_conv = new Ping(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.Ping_write(this.ptr);
		return ret;
	}

	public static Result_PingDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.Ping_read(ser);
		Result_PingDecodeErrorZ ret_hu_conv = Result_PingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
