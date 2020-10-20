package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RoutingMessageHandler extends CommonBase {
	RoutingMessageHandler(Object _dummy, long ptr) { super(ptr); }
	public RoutingMessageHandler(bindings.LDKRoutingMessageHandler arg) {
		super(bindings.LDKRoutingMessageHandler_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.RoutingMessageHandler_free(ptr); super.finalize();
	}

	// Skipped RoutingMessageHandler_handle_node_announcement
	// Skipped RoutingMessageHandler_handle_channel_announcement
	// Skipped RoutingMessageHandler_handle_channel_update
	// Skipped RoutingMessageHandler_handle_htlc_fail_channel_update
	public ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>[] get_next_channel_announcements(long starting_point, byte batch_amount) {
		long[] ret = bindings.RoutingMessageHandler_get_next_channel_announcements(this.ptr, starting_point, batch_amount);
		ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>[] arr_conv_63_arr = new ThreeTuple[ret.length];
		for (int l = 0; l < ret.length; l++) {
			long arr_conv_63 = ret[l];
			long arr_conv_63_a = bindings.LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(arr_conv_63);
			ChannelAnnouncement arr_conv_63_a_hu_conv = new ChannelAnnouncement(null, arr_conv_63_a);;
			long arr_conv_63_b = bindings.LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(arr_conv_63);
			ChannelUpdate arr_conv_63_b_hu_conv = new ChannelUpdate(null, arr_conv_63_b);;
			long arr_conv_63_c = bindings.LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(arr_conv_63);
			ChannelUpdate arr_conv_63_c_hu_conv = new ChannelUpdate(null, arr_conv_63_c);;
			ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate> arr_conv_63_conv = new ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>(arr_conv_63_a_hu_conv, arr_conv_63_b_hu_conv, arr_conv_63_c_hu_conv);
			arr_conv_63_arr[l] = arr_conv_63_conv;
		}
		return arr_conv_63_arr;
	}

	public NodeAnnouncement[] get_next_node_announcements(byte[] starting_point, byte batch_amount) {
		long[] ret = bindings.RoutingMessageHandler_get_next_node_announcements(this.ptr, starting_point, batch_amount);
		NodeAnnouncement[] arr_conv_18_arr = new NodeAnnouncement[ret.length];
		for (int s = 0; s < ret.length; s++) {
			long arr_conv_18 = ret[s];
			NodeAnnouncement arr_conv_18_hu_conv = new NodeAnnouncement(null, arr_conv_18);
			arr_conv_18_arr[s] = arr_conv_18_hu_conv;
		}
		return arr_conv_18_arr;
	}

	public boolean should_request_full_sync(byte[] node_id) {
		boolean ret = bindings.RoutingMessageHandler_should_request_full_sync(this.ptr, node_id);
		return ret;
	}

}
