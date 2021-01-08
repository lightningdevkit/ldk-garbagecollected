package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeInfo extends CommonBase {
	NodeInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeInfo_free(ptr); }
	}

	public void set_channels(long[] val) {
		bindings.NodeInfo_set_channels(this.ptr, val);
	}

	public RoutingFees get_lowest_inbound_channel_fees() {
		long ret = bindings.NodeInfo_get_lowest_inbound_channel_fees(this.ptr);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		return ret_hu_conv;
	}

	public void set_lowest_inbound_channel_fees(RoutingFees val) {
		bindings.NodeInfo_set_lowest_inbound_channel_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public NodeAnnouncementInfo get_announcement_info() {
		long ret = bindings.NodeInfo_get_announcement_info(this.ptr);
		NodeAnnouncementInfo ret_hu_conv = new NodeAnnouncementInfo(null, ret);
		return ret_hu_conv;
	}

	public void set_announcement_info(NodeFeatures val_features_arg, int val_last_update_arg, byte[] val_rgb_arg, byte[] val_alias_arg, NetAddress[] val_addresses_arg, NodeAnnouncement val_announcement_message_arg) {
		bindings.NodeInfo_set_announcement_info(this.ptr, bindings.NodeAnnouncementInfo_new(val_features_arg == null ? 0 : val_features_arg.ptr & ~1, val_last_update_arg, val_rgb_arg, val_alias_arg, Arrays.stream(val_addresses_arg).mapToLong(arr_conv_12 -> arr_conv_12.ptr).toArray(), val_announcement_message_arg == null ? 0 : val_announcement_message_arg.ptr & ~1));
	}

	public static NodeInfo constructor_new(long[] channels_arg, RoutingFees lowest_inbound_channel_fees_arg, NodeFeatures announcement_info_arg_features_arg, int announcement_info_arg_last_update_arg, byte[] announcement_info_arg_rgb_arg, byte[] announcement_info_arg_alias_arg, NetAddress[] announcement_info_arg_addresses_arg, NodeAnnouncement announcement_info_arg_announcement_message_arg) {
		long ret = bindings.NodeInfo_new(channels_arg, lowest_inbound_channel_fees_arg == null ? 0 : lowest_inbound_channel_fees_arg.ptr & ~1, bindings.NodeAnnouncementInfo_new(announcement_info_arg_features_arg == null ? 0 : announcement_info_arg_features_arg.ptr & ~1, announcement_info_arg_last_update_arg, announcement_info_arg_rgb_arg, announcement_info_arg_alias_arg, Arrays.stream(announcement_info_arg_addresses_arg).mapToLong(arr_conv_12 -> arr_conv_12.ptr).toArray(), announcement_info_arg_announcement_message_arg == null ? 0 : announcement_info_arg_announcement_message_arg.ptr & ~1));
		NodeInfo ret_hu_conv = new NodeInfo(null, ret);
		ret_hu_conv.ptrs_to.add(lowest_inbound_channel_fees_arg);
		ret_hu_conv.ptrs_to.add(announcement_info_arg_features_arg);
		/* TODO 2 NetAddress  */;
		ret_hu_conv.ptrs_to.add(announcement_info_arg_announcement_message_arg);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.NodeInfo_write(this.ptr);
		return ret;
	}

	public static Result_NodeInfoDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.NodeInfo_read(ser);
		Result_NodeInfoDecodeErrorZ ret_hu_conv = Result_NodeInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
