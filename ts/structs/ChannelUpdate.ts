
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class ChannelUpdate extends CommonBase {
	ChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelUpdate_free(ptr); }
	}

	public ChannelUpdate clone() {
		uint32_t ret = bindings.ChannelUpdate_clone(this.ptr);
		ChannelUpdate ret_hu_conv = new ChannelUpdate(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_signature() {
		byte[] ret = bindings.ChannelUpdate_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.ChannelUpdate_set_signature(this.ptr, val);
	}

	public UnsignedChannelUpdate get_contents() {
		uint32_t ret = bindings.ChannelUpdate_get_contents(this.ptr);
		UnsignedChannelUpdate ret_hu_conv = new UnsignedChannelUpdate(null, ret);
		return ret_hu_conv;
	}

	public void set_contents(UnsignedChannelUpdate val) {
		bindings.ChannelUpdate_set_contents(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ChannelUpdate constructor_new(byte[] signature_arg, UnsignedChannelUpdate contents_arg) {
		uint32_t ret = bindings.ChannelUpdate_new(signature_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1);
		ChannelUpdate ret_hu_conv = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(contents_arg);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelUpdate_write(this.ptr);
		return ret;
	}

	public static ChannelUpdate constructor_read(byte[] ser) {
		uint32_t ret = bindings.ChannelUpdate_read(ser);
		ChannelUpdate ret_hu_conv = new ChannelUpdate(null, ret);
		return ret_hu_conv;
	}

}
