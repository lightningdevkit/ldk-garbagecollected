package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RoutingMessageHandler extends CommonBase {
	final bindings.LDKRoutingMessageHandler bindings_instance;
	RoutingMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private RoutingMessageHandler(bindings.LDKRoutingMessageHandler arg) {
		super(bindings.LDKRoutingMessageHandler_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.RoutingMessageHandler_free(ptr); } super.finalize();
	}

	public static interface RoutingMessageHandlerInterface {
		Result_boolLightningErrorZ handle_node_announcement(NodeAnnouncement msg);
		Result_boolLightningErrorZ handle_channel_announcement(ChannelAnnouncement msg);
		Result_boolLightningErrorZ handle_channel_update(ChannelUpdate msg);
		void handle_htlc_fail_channel_update(HTLCFailChannelUpdate update);
		ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>[] get_next_channel_announcements(long starting_point, byte batch_amount);
		NodeAnnouncement[] get_next_node_announcements(byte[] starting_point, byte batch_amount);
		boolean should_request_full_sync(byte[] node_id);
	}
	private static class LDKRoutingMessageHandlerHolder { RoutingMessageHandler held; }
	public static RoutingMessageHandler new_impl(RoutingMessageHandlerInterface arg) {
		final LDKRoutingMessageHandlerHolder impl_holder = new LDKRoutingMessageHandlerHolder();
		impl_holder.held = new RoutingMessageHandler(new bindings.LDKRoutingMessageHandler() {
			@Override public long handle_node_announcement(long msg) {
				NodeAnnouncement msg_hu_conv = new NodeAnnouncement(null, msg);
				Result_boolLightningErrorZ ret = arg.handle_node_announcement(msg_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public long handle_channel_announcement(long msg) {
				ChannelAnnouncement msg_hu_conv = new ChannelAnnouncement(null, msg);
				Result_boolLightningErrorZ ret = arg.handle_channel_announcement(msg_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public long handle_channel_update(long msg) {
				ChannelUpdate msg_hu_conv = new ChannelUpdate(null, msg);
				Result_boolLightningErrorZ ret = arg.handle_channel_update(msg_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public void handle_htlc_fail_channel_update(long update) {
				HTLCFailChannelUpdate update_hu_conv = HTLCFailChannelUpdate.constr_from_ptr(update);
				arg.handle_htlc_fail_channel_update(update_hu_conv);
			}
			@Override public long[] get_next_channel_announcements(long starting_point, byte batch_amount) {
				ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>[] ret = arg.get_next_channel_announcements(starting_point, batch_amount);
				long[] result = Arrays.stream(ret).mapToLong(arr_conv_63 -> bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(arr_conv_63.a == null ? 0 : arr_conv_63.a.ptr & ~1/*XXX: this.ptrs_to.add(arr_conv_63_a)*/, arr_conv_63.b == null ? 0 : arr_conv_63.b.ptr & ~1/*XXX: this.ptrs_to.add(arr_conv_63_b)*/, arr_conv_63.c == null ? 0 : arr_conv_63.c.ptr & ~1/*XXX: this.ptrs_to.add(arr_conv_63_c)*/)).toArray();
				/* TODO 2 ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>  */;
				return result;
			}
			@Override public long[] get_next_node_announcements(byte[] starting_point, byte batch_amount) {
				NodeAnnouncement[] ret = arg.get_next_node_announcements(starting_point, batch_amount);
				long[] result = Arrays.stream(ret).mapToLong(arr_conv_18 -> arr_conv_18 == null ? 0 : arr_conv_18.ptr & ~1).toArray();
				/* TODO 2 NodeAnnouncement  */;
				return result;
			}
			@Override public boolean should_request_full_sync(byte[] node_id) {
				boolean ret = arg.should_request_full_sync(node_id);
				return ret;
			}
		});
		return impl_holder.held;
	}
	public Result_boolLightningErrorZ handle_node_announcement(NodeAnnouncement msg) {
		long ret = bindings.RoutingMessageHandler_handle_node_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_boolLightningErrorZ handle_channel_announcement(ChannelAnnouncement msg) {
		long ret = bindings.RoutingMessageHandler_handle_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_boolLightningErrorZ handle_channel_update(ChannelUpdate msg) {
		long ret = bindings.RoutingMessageHandler_handle_channel_update(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public void handle_htlc_fail_channel_update(HTLCFailChannelUpdate update) {
		bindings.RoutingMessageHandler_handle_htlc_fail_channel_update(this.ptr, update == null ? 0 : update.ptr & ~1);
		this.ptrs_to.add(update);
	}

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
