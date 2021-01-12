
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class AnnouncementSignatures extends CommonBase {
	AnnouncementSignatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AnnouncementSignatures_free(ptr); }
	}

	public AnnouncementSignatures clone() {
		uint32_t ret = bindings.AnnouncementSignatures_clone(this.ptr);
		AnnouncementSignatures ret_hu_conv = new AnnouncementSignatures(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.AnnouncementSignatures_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.AnnouncementSignatures_set_channel_id(this.ptr, val);
	}

	public long get_short_channel_id() {
		long ret = bindings.AnnouncementSignatures_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(long val) {
		bindings.AnnouncementSignatures_set_short_channel_id(this.ptr, val);
	}

	public byte[] get_node_signature() {
		byte[] ret = bindings.AnnouncementSignatures_get_node_signature(this.ptr);
		return ret;
	}

	public void set_node_signature(byte[] val) {
		bindings.AnnouncementSignatures_set_node_signature(this.ptr, val);
	}

	public byte[] get_bitcoin_signature() {
		byte[] ret = bindings.AnnouncementSignatures_get_bitcoin_signature(this.ptr);
		return ret;
	}

	public void set_bitcoin_signature(byte[] val) {
		bindings.AnnouncementSignatures_set_bitcoin_signature(this.ptr, val);
	}

	public static AnnouncementSignatures constructor_new(byte[] channel_id_arg, long short_channel_id_arg, byte[] node_signature_arg, byte[] bitcoin_signature_arg) {
		uint32_t ret = bindings.AnnouncementSignatures_new(channel_id_arg, short_channel_id_arg, node_signature_arg, bitcoin_signature_arg);
		AnnouncementSignatures ret_hu_conv = new AnnouncementSignatures(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.AnnouncementSignatures_write(this.ptr);
		return ret;
	}

	public static AnnouncementSignatures constructor_read(byte[] ser) {
		uint32_t ret = bindings.AnnouncementSignatures_read(ser);
		AnnouncementSignatures ret_hu_conv = new AnnouncementSignatures(null, ret);
		return ret_hu_conv;
	}

}
