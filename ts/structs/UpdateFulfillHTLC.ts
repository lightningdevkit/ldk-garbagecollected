
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class UpdateFulfillHTLC extends CommonBase {
	UpdateFulfillHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UpdateFulfillHTLC_free(ptr); }
	}

	public UpdateFulfillHTLC clone() {
		uint32_t ret = bindings.UpdateFulfillHTLC_clone(this.ptr);
		UpdateFulfillHTLC ret_hu_conv = new UpdateFulfillHTLC(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.UpdateFulfillHTLC_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.UpdateFulfillHTLC_set_channel_id(this.ptr, val);
	}

	public long get_htlc_id() {
		long ret = bindings.UpdateFulfillHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	public void set_htlc_id(long val) {
		bindings.UpdateFulfillHTLC_set_htlc_id(this.ptr, val);
	}

	public byte[] get_payment_preimage() {
		byte[] ret = bindings.UpdateFulfillHTLC_get_payment_preimage(this.ptr);
		return ret;
	}

	public void set_payment_preimage(byte[] val) {
		bindings.UpdateFulfillHTLC_set_payment_preimage(this.ptr, val);
	}

	public static UpdateFulfillHTLC constructor_new(byte[] channel_id_arg, long htlc_id_arg, byte[] payment_preimage_arg) {
		uint32_t ret = bindings.UpdateFulfillHTLC_new(channel_id_arg, htlc_id_arg, payment_preimage_arg);
		UpdateFulfillHTLC ret_hu_conv = new UpdateFulfillHTLC(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.UpdateFulfillHTLC_write(this.ptr);
		return ret;
	}

	public static UpdateFulfillHTLC constructor_read(byte[] ser) {
		uint32_t ret = bindings.UpdateFulfillHTLC_read(ser);
		UpdateFulfillHTLC ret_hu_conv = new UpdateFulfillHTLC(null, ret);
		return ret_hu_conv;
	}

}
