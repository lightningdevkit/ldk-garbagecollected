
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class NodeAnnouncementInfo extends CommonBase {
	NodeAnnouncementInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeAnnouncementInfo_free(ptr); }
	}

	public NodeFeatures get_features() {
		uint32_t ret = bindings.NodeAnnouncementInfo_get_features(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		return ret_hu_conv;
	}

	public void set_features(NodeFeatures val) {
		bindings.NodeAnnouncementInfo_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public int get_last_update() {
		int ret = bindings.NodeAnnouncementInfo_get_last_update(this.ptr);
		return ret;
	}

	public void set_last_update(int val) {
		bindings.NodeAnnouncementInfo_set_last_update(this.ptr, val);
	}

	public byte[] get_rgb() {
		byte[] ret = bindings.NodeAnnouncementInfo_get_rgb(this.ptr);
		return ret;
	}

	public void set_rgb(byte[] val) {
		bindings.NodeAnnouncementInfo_set_rgb(this.ptr, val);
	}

	public byte[] get_alias() {
		byte[] ret = bindings.NodeAnnouncementInfo_get_alias(this.ptr);
		return ret;
	}

	public void set_alias(byte[] val) {
		bindings.NodeAnnouncementInfo_set_alias(this.ptr, val);
	}

	public void set_addresses(NetAddress[] val) {
		bindings.NodeAnnouncementInfo_set_addresses(this.ptr, (uint32_t[])Arrays.stream(val).map(arr_conv_12 -> arr_conv_12.ptr).toArray());
		/* TODO 2 NetAddress  */;
	}

	public NodeAnnouncement get_announcement_message() {
		uint32_t ret = bindings.NodeAnnouncementInfo_get_announcement_message(this.ptr);
		NodeAnnouncement ret_hu_conv = new NodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public void set_announcement_message(NodeAnnouncement val) {
		bindings.NodeAnnouncementInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static NodeAnnouncementInfo constructor_new(NodeFeatures features_arg, int last_update_arg, byte[] rgb_arg, byte[] alias_arg, NetAddress[] addresses_arg, NodeAnnouncement announcement_message_arg) {
		uint32_t ret = bindings.NodeAnnouncementInfo_new(features_arg == null ? 0 : features_arg.ptr & ~1, last_update_arg, rgb_arg, alias_arg, (uint32_t[])Arrays.stream(addresses_arg).map(arr_conv_12 -> arr_conv_12.ptr).toArray(), announcement_message_arg == null ? 0 : announcement_message_arg.ptr & ~1);
		NodeAnnouncementInfo ret_hu_conv = new NodeAnnouncementInfo(null, ret);
		ret_hu_conv.ptrs_to.add(features_arg);
		/* TODO 2 NetAddress  */;
		ret_hu_conv.ptrs_to.add(announcement_message_arg);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.NodeAnnouncementInfo_write(this.ptr);
		return ret;
	}

	public static Result_NodeAnnouncementInfoDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.NodeAnnouncementInfo_read(ser);
		Result_NodeAnnouncementInfoDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
