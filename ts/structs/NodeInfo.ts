
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class NodeInfo extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.NodeInfo_free(this.ptr);
                    }
                }
	public void set_channels(number[] val) {
		bindings.NodeInfo_set_channels(this.ptr, val);
	}

	public RoutingFees get_lowest_inbound_channel_fees() {
		number ret = bindings.NodeInfo_get_lowest_inbound_channel_fees(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_lowest_inbound_channel_fees(RoutingFees val) {
		bindings.NodeInfo_set_lowest_inbound_channel_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public NodeAnnouncementInfo get_announcement_info() {
		number ret = bindings.NodeInfo_get_announcement_info(this.ptr);
		const ret_hu_conv: NodeAnnouncementInfo = new NodeAnnouncementInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_announcement_info(NodeAnnouncementInfo val) {
		bindings.NodeInfo_set_announcement_info(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static NodeInfo constructor_new(number[] channels_arg, RoutingFees lowest_inbound_channel_fees_arg, NodeAnnouncementInfo announcement_info_arg) {
		number ret = bindings.NodeInfo_new(channels_arg, lowest_inbound_channel_fees_arg == null ? 0 : lowest_inbound_channel_fees_arg.ptr & ~1, announcement_info_arg == null ? 0 : announcement_info_arg.ptr & ~1);
		const ret_hu_conv: NodeInfo = new NodeInfo(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(lowest_inbound_channel_fees_arg);
		ret_hu_conv.ptrs_to.add(announcement_info_arg);
		return ret_hu_conv;
	}

	public NodeInfo clone() {
		number ret = bindings.NodeInfo_clone(this.ptr);
		const ret_hu_conv: NodeInfo = new NodeInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.NodeInfo_write(this.ptr);
		return ret;
	}

	public static Result_NodeInfoDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.NodeInfo_read(ser);
		Result_NodeInfoDecodeErrorZ ret_hu_conv = Result_NodeInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
