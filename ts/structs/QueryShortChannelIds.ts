
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class QueryShortChannelIds extends CommonBase {
	QueryShortChannelIds(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.QueryShortChannelIds_free(ptr); }
	}

	public QueryShortChannelIds clone() {
		uint32_t ret = bindings.QueryShortChannelIds_clone(this.ptr);
		QueryShortChannelIds ret_hu_conv = new QueryShortChannelIds(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_chain_hash() {
		byte[] ret = bindings.QueryShortChannelIds_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(byte[] val) {
		bindings.QueryShortChannelIds_set_chain_hash(this.ptr, val);
	}

	public void set_short_channel_ids(long[] val) {
		bindings.QueryShortChannelIds_set_short_channel_ids(this.ptr, val);
	}

	public static QueryShortChannelIds constructor_new(byte[] chain_hash_arg, long[] short_channel_ids_arg) {
		uint32_t ret = bindings.QueryShortChannelIds_new(chain_hash_arg, short_channel_ids_arg);
		QueryShortChannelIds ret_hu_conv = new QueryShortChannelIds(null, ret);
		return ret_hu_conv;
	}

	public static Result_QueryShortChannelIdsDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.QueryShortChannelIds_read(ser);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.QueryShortChannelIds_write(this.ptr);
		return ret;
	}

}
