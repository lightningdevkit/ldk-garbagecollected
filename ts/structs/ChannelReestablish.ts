
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class ChannelReestablish extends CommonBase {
	ChannelReestablish(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelReestablish_free(ptr); }
	}

	public ChannelReestablish clone() {
		uint32_t ret = bindings.ChannelReestablish_clone(this.ptr);
		ChannelReestablish ret_hu_conv = new ChannelReestablish(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.ChannelReestablish_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.ChannelReestablish_set_channel_id(this.ptr, val);
	}

	public long get_next_local_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_local_commitment_number(this.ptr);
		return ret;
	}

	public void set_next_local_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_local_commitment_number(this.ptr, val);
	}

	public long get_next_remote_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_remote_commitment_number(this.ptr);
		return ret;
	}

	public void set_next_remote_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_remote_commitment_number(this.ptr, val);
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelReestablish_write(this.ptr);
		return ret;
	}

	public static Result_ChannelReestablishDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.ChannelReestablish_read(ser);
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
