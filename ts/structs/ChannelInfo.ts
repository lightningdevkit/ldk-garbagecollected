
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelInfo extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelInfo_free(this.ptr);
                    }
                }
	public ChannelFeatures get_features() {
		number ret = bindings.ChannelInfo_get_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(ChannelFeatures val) {
		bindings.ChannelInfo_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public NodeId get_node_one() {
		number ret = bindings.ChannelInfo_get_node_one(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_node_one(NodeId val) {
		bindings.ChannelInfo_set_node_one(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public DirectionalChannelInfo get_one_to_two() {
		number ret = bindings.ChannelInfo_get_one_to_two(this.ptr);
		const ret_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_one_to_two(DirectionalChannelInfo val) {
		bindings.ChannelInfo_set_one_to_two(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public NodeId get_node_two() {
		number ret = bindings.ChannelInfo_get_node_two(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_node_two(NodeId val) {
		bindings.ChannelInfo_set_node_two(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public DirectionalChannelInfo get_two_to_one() {
		number ret = bindings.ChannelInfo_get_two_to_one(this.ptr);
		const ret_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_two_to_one(DirectionalChannelInfo val) {
		bindings.ChannelInfo_set_two_to_one(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public Option_u64Z get_capacity_sats() {
		number ret = bindings.ChannelInfo_get_capacity_sats(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_capacity_sats(Option_u64Z val) {
		bindings.ChannelInfo_set_capacity_sats(this.ptr, val.ptr);
	}

	public ChannelAnnouncement get_announcement_message() {
		number ret = bindings.ChannelInfo_get_announcement_message(this.ptr);
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_announcement_message(ChannelAnnouncement val) {
		bindings.ChannelInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public number clone_ptr() {
		number ret = bindings.ChannelInfo_clone_ptr(this.ptr);
		return ret;
	}

	public ChannelInfo clone() {
		number ret = bindings.ChannelInfo_clone(this.ptr);
		const ret_hu_conv: ChannelInfo = new ChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelInfo_write(this.ptr);
		return ret;
	}

	public static Result_ChannelInfoDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelInfo_read(ser);
		Result_ChannelInfoDecodeErrorZ ret_hu_conv = Result_ChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
