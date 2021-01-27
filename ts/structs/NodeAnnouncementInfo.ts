
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class NodeAnnouncementInfo extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.NodeAnnouncementInfo_free(this.ptr);
                    }
                }
	public NodeFeatures get_features() {
		number ret = bindings.NodeAnnouncementInfo_get_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		return ret_hu_conv;
	}

	public void set_features(NodeFeatures val) {
		bindings.NodeAnnouncementInfo_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public number get_last_update() {
		number ret = bindings.NodeAnnouncementInfo_get_last_update(this.ptr);
		return ret;
	}

	public void set_last_update(number val) {
		bindings.NodeAnnouncementInfo_set_last_update(this.ptr, val);
	}

	public Uint8Array get_rgb() {
		Uint8Array ret = bindings.NodeAnnouncementInfo_get_rgb(this.ptr);
		return ret;
	}

	public void set_rgb(Uint8Array val) {
		bindings.NodeAnnouncementInfo_set_rgb(this.ptr, val);
	}

	public Uint8Array get_alias() {
		Uint8Array ret = bindings.NodeAnnouncementInfo_get_alias(this.ptr);
		return ret;
	}

	public void set_alias(Uint8Array val) {
		bindings.NodeAnnouncementInfo_set_alias(this.ptr, val);
	}

	public void set_addresses(NetAddress[] val) {
		bindings.NodeAnnouncementInfo_set_addresses(this.ptr, (number[])Arrays.stream(val).map(arr_conv_12 -> arr_conv_12.ptr).toArray());
		/* TODO 2 NetAddress  */;
	}

	public NodeAnnouncement get_announcement_message() {
		number ret = bindings.NodeAnnouncementInfo_get_announcement_message(this.ptr);
		const ret_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public void set_announcement_message(NodeAnnouncement val) {
		bindings.NodeAnnouncementInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static NodeAnnouncementInfo constructor_new(NodeFeatures features_arg, number last_update_arg, Uint8Array rgb_arg, Uint8Array alias_arg, NetAddress[] addresses_arg, NodeAnnouncement announcement_message_arg) {
		number ret = bindings.NodeAnnouncementInfo_new(features_arg == null ? 0 : features_arg.ptr & ~1, last_update_arg, rgb_arg, alias_arg, (number[])Arrays.stream(addresses_arg).map(arr_conv_12 -> arr_conv_12.ptr).toArray(), announcement_message_arg == null ? 0 : announcement_message_arg.ptr & ~1);
		const ret_hu_conv: NodeAnnouncementInfo = new NodeAnnouncementInfo(null, ret);
		ret_hu_conv.ptrs_to.add(features_arg);
		/* TODO 2 NetAddress  */;
		ret_hu_conv.ptrs_to.add(announcement_message_arg);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.NodeAnnouncementInfo_write(this.ptr);
		return ret;
	}

	public static Result_NodeAnnouncementInfoDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.NodeAnnouncementInfo_read(ser);
		Result_NodeAnnouncementInfoDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
