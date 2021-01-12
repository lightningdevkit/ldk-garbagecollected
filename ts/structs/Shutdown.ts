
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Shutdown extends CommonBase {
	Shutdown(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Shutdown_free(ptr); }
	}

	public Shutdown clone() {
		uint32_t ret = bindings.Shutdown_clone(this.ptr);
		Shutdown ret_hu_conv = new Shutdown(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.Shutdown_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.Shutdown_set_channel_id(this.ptr, val);
	}

	public byte[] get_scriptpubkey() {
		byte[] ret = bindings.Shutdown_get_scriptpubkey(this.ptr);
		return ret;
	}

	public void set_scriptpubkey(byte[] val) {
		bindings.Shutdown_set_scriptpubkey(this.ptr, val);
	}

	public static Shutdown constructor_new(byte[] channel_id_arg, byte[] scriptpubkey_arg) {
		uint32_t ret = bindings.Shutdown_new(channel_id_arg, scriptpubkey_arg);
		Shutdown ret_hu_conv = new Shutdown(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.Shutdown_write(this.ptr);
		return ret;
	}

	public static Shutdown constructor_read(byte[] ser) {
		uint32_t ret = bindings.Shutdown_read(ser);
		Shutdown ret_hu_conv = new Shutdown(null, ret);
		return ret_hu_conv;
	}

}
