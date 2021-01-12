
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class ClosingSigned extends CommonBase {
	ClosingSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ClosingSigned_free(ptr); }
	}

	public ClosingSigned clone() {
		uint32_t ret = bindings.ClosingSigned_clone(this.ptr);
		ClosingSigned ret_hu_conv = new ClosingSigned(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.ClosingSigned_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.ClosingSigned_set_channel_id(this.ptr, val);
	}

	public long get_fee_satoshis() {
		long ret = bindings.ClosingSigned_get_fee_satoshis(this.ptr);
		return ret;
	}

	public void set_fee_satoshis(long val) {
		bindings.ClosingSigned_set_fee_satoshis(this.ptr, val);
	}

	public byte[] get_signature() {
		byte[] ret = bindings.ClosingSigned_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.ClosingSigned_set_signature(this.ptr, val);
	}

	public static ClosingSigned constructor_new(byte[] channel_id_arg, long fee_satoshis_arg, byte[] signature_arg) {
		uint32_t ret = bindings.ClosingSigned_new(channel_id_arg, fee_satoshis_arg, signature_arg);
		ClosingSigned ret_hu_conv = new ClosingSigned(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.ClosingSigned_write(this.ptr);
		return ret;
	}

	public static ClosingSigned constructor_read(byte[] ser) {
		uint32_t ret = bindings.ClosingSigned_read(ser);
		ClosingSigned ret_hu_conv = new ClosingSigned(null, ret);
		return ret_hu_conv;
	}

}
