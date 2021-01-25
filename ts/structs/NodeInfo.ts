
            
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
		return ret_hu_conv;
	}

	public void set_lowest_inbound_channel_fees(RoutingFees val) {
		bindings.NodeInfo_set_lowest_inbound_channel_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public NodeAnnouncementInfo get_announcement_info() {
		number ret = bindings.NodeInfo_get_announcement_info(this.ptr);
		const ret_hu_conv: NodeAnnouncementInfo = new NodeAnnouncementInfo(null, ret);
		return ret_hu_conv;
	}

	public void set_announcement_info(NodeFeatures val_features_arg, number val_last_update_arg, Uint8Array val_rgb_arg, Uint8Array val_alias_arg, NetAddress[] val_addresses_arg, NodeAnnouncement val_announcement_message_arg) {
		bindings.NodeInfo_set_announcement_info(this.ptr, bindings.NodeAnnouncementInfo_new(val_features_arg == null ? 0 : val_features_arg.ptr & ~1, val_last_update_arg, val_rgb_arg, val_alias_arg, (number[])Arrays.stream(val_addresses_arg).map(arr_conv_12 -> arr_conv_12.ptr).toArray(), val_announcement_message_arg == null ? 0 : val_announcement_message_arg.ptr & ~1));
	}

	public static NodeInfo constructor_new(number[] channels_arg, RoutingFees lowest_inbound_channel_fees_arg, NodeFeatures announcement_info_arg_features_arg, number announcement_info_arg_last_update_arg, Uint8Array announcement_info_arg_rgb_arg, Uint8Array announcement_info_arg_alias_arg, NetAddress[] announcement_info_arg_addresses_arg, NodeAnnouncement announcement_info_arg_announcement_message_arg) {
		number ret = bindings.NodeInfo_new(channels_arg, lowest_inbound_channel_fees_arg == null ? 0 : lowest_inbound_channel_fees_arg.ptr & ~1, bindings.NodeAnnouncementInfo_new(announcement_info_arg_features_arg == null ? 0 : announcement_info_arg_features_arg.ptr & ~1, announcement_info_arg_last_update_arg, announcement_info_arg_rgb_arg, announcement_info_arg_alias_arg, (number[])Arrays.stream(announcement_info_arg_addresses_arg).map(arr_conv_12 -> arr_conv_12.ptr).toArray(), announcement_info_arg_announcement_message_arg == null ? 0 : announcement_info_arg_announcement_message_arg.ptr & ~1));
		const ret_hu_conv: NodeInfo = new NodeInfo(null, ret);
		ret_hu_conv.ptrs_to.add(lowest_inbound_channel_fees_arg);
		ret_hu_conv.ptrs_to.add(announcement_info_arg_features_arg);
		/* TODO 2 NetAddress  */;
		ret_hu_conv.ptrs_to.add(announcement_info_arg_announcement_message_arg);
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
