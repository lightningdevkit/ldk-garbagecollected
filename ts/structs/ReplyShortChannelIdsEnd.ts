
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class ReplyShortChannelIdsEnd extends CommonBase {
	ReplyShortChannelIdsEnd(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ReplyShortChannelIdsEnd_free(ptr); }
	}

	public ReplyShortChannelIdsEnd clone() {
		uint32_t ret = bindings.ReplyShortChannelIdsEnd_clone(this.ptr);
		ReplyShortChannelIdsEnd ret_hu_conv = new ReplyShortChannelIdsEnd(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_chain_hash() {
		byte[] ret = bindings.ReplyShortChannelIdsEnd_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(byte[] val) {
		bindings.ReplyShortChannelIdsEnd_set_chain_hash(this.ptr, val);
	}

	public boolean get_full_information() {
		boolean ret = bindings.ReplyShortChannelIdsEnd_get_full_information(this.ptr);
		return ret;
	}

	public void set_full_information(boolean val) {
		bindings.ReplyShortChannelIdsEnd_set_full_information(this.ptr, val);
	}

	public static ReplyShortChannelIdsEnd constructor_new(byte[] chain_hash_arg, boolean full_information_arg) {
		uint32_t ret = bindings.ReplyShortChannelIdsEnd_new(chain_hash_arg, full_information_arg);
		ReplyShortChannelIdsEnd ret_hu_conv = new ReplyShortChannelIdsEnd(null, ret);
		return ret_hu_conv;
	}

	public static Result_ReplyShortChannelIdsEndDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.ReplyShortChannelIdsEnd_read(ser);
		Result_ReplyShortChannelIdsEndDecodeErrorZ ret_hu_conv = Result_ReplyShortChannelIdsEndDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.ReplyShortChannelIdsEnd_write(this.ptr);
		return ret;
	}

}
