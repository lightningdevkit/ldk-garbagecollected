
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class ChannelMonitorUpdate extends CommonBase {
	ChannelMonitorUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelMonitorUpdate_free(ptr); }
	}

	public ChannelMonitorUpdate clone() {
		uint32_t ret = bindings.ChannelMonitorUpdate_clone(this.ptr);
		ChannelMonitorUpdate ret_hu_conv = new ChannelMonitorUpdate(null, ret);
		return ret_hu_conv;
	}

	public long get_update_id() {
		long ret = bindings.ChannelMonitorUpdate_get_update_id(this.ptr);
		return ret;
	}

	public void set_update_id(long val) {
		bindings.ChannelMonitorUpdate_set_update_id(this.ptr, val);
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelMonitorUpdate_write(this.ptr);
		return ret;
	}

	public static Result_ChannelMonitorUpdateDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.ChannelMonitorUpdate_read(ser);
		Result_ChannelMonitorUpdateDecodeErrorZ ret_hu_conv = Result_ChannelMonitorUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
