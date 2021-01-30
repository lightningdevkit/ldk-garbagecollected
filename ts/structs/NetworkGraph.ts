
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class NetworkGraph extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.NetworkGraph_free(this.ptr);
                    }
                }
	public Uint8Array write() {
		Uint8Array ret = bindings.NetworkGraph_write(this.ptr);
		return ret;
	}

	public static Result_NetworkGraphDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.NetworkGraph_read(ser);
		Result_NetworkGraphDecodeErrorZ ret_hu_conv = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static NetworkGraph constructor_new(Uint8Array genesis_hash) {
		number ret = bindings.NetworkGraph_new(genesis_hash);
		const ret_hu_conv: NetworkGraph = new NetworkGraph(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_node_from_announcement(NodeAnnouncement msg) {
		number ret = bindings.NetworkGraph_update_node_from_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_node_from_unsigned_announcement(UnsignedNodeAnnouncement msg) {
		number ret = bindings.NetworkGraph_update_node_from_unsigned_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_channel_from_announcement(ChannelAnnouncement msg, Access chain_access) {
		number ret = bindings.NetworkGraph_update_channel_from_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1, chain_access == null ? 0 : chain_access.ptr);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		this.ptrs_to.add(chain_access);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_channel_from_unsigned_announcement(UnsignedChannelAnnouncement msg, Access chain_access) {
		number ret = bindings.NetworkGraph_update_channel_from_unsigned_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1, chain_access == null ? 0 : chain_access.ptr);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		this.ptrs_to.add(chain_access);
		return ret_hu_conv;
	}

	public void close_channel_from_update(number short_channel_id, boolean is_permanent) {
		bindings.NetworkGraph_close_channel_from_update(this.ptr, short_channel_id, is_permanent);
	}

	public Result_NoneLightningErrorZ update_channel(ChannelUpdate msg) {
		number ret = bindings.NetworkGraph_update_channel(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ update_channel_unsigned(UnsignedChannelUpdate msg) {
		number ret = bindings.NetworkGraph_update_channel_unsigned(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

}
