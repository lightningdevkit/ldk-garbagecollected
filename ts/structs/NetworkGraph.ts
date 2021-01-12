
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class NetworkGraph extends CommonBase {
	NetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NetworkGraph_free(ptr); }
	}

	public byte[] write() {
		byte[] ret = bindings.NetworkGraph_write(this.ptr);
		return ret;
	}

	public static Result_NetworkGraphDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.NetworkGraph_read(ser);
		Result_NetworkGraphDecodeErrorZ ret_hu_conv = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static NetworkGraph constructor_new(byte[] genesis_hash) {
		uint32_t ret = bindings.NetworkGraph_new(genesis_hash);
		NetworkGraph ret_hu_conv = new NetworkGraph(null, ret);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_node_from_announcement(NodeAnnouncement msg) {
		uint32_t ret = bindings.NetworkGraph_update_node_from_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_node_from_unsigned_announcement(UnsignedNodeAnnouncement msg) {
		uint32_t ret = bindings.NetworkGraph_update_node_from_unsigned_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_channel_from_announcement(ChannelAnnouncement msg, Access chain_access) {
		uint32_t ret = bindings.NetworkGraph_update_channel_from_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1, chain_access == null ? 0 : chain_access.ptr);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		this.ptrs_to.add(chain_access);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_channel_from_unsigned_announcement(UnsignedChannelAnnouncement msg, Access chain_access) {
		uint32_t ret = bindings.NetworkGraph_update_channel_from_unsigned_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1, chain_access == null ? 0 : chain_access.ptr);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		this.ptrs_to.add(chain_access);
		return ret_hu_conv;
	}

	public void close_channel_from_update(long short_channel_id, boolean is_permanent) {
		bindings.NetworkGraph_close_channel_from_update(this.ptr, short_channel_id, is_permanent);
	}

	public Result_NoneLightningErrorZ update_channel(ChannelUpdate msg) {
		uint32_t ret = bindings.NetworkGraph_update_channel(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_channel_unsigned(UnsignedChannelUpdate msg) {
		uint32_t ret = bindings.NetworkGraph_update_channel_unsigned(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

}
