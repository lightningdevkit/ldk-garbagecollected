
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class RoutingMessageHandler extends CommonBase {
	final bindings.LDKRoutingMessageHandler bindings_instance;
	RoutingMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private RoutingMessageHandler(bindings.LDKRoutingMessageHandler arg, bindings.LDKMessageSendEventsProvider MessageSendEventsProvider) {
		super(bindings.LDKRoutingMessageHandler_new(arg, MessageSendEventsProvider));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(MessageSendEventsProvider);
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
		void sync_routing_table(byte[] their_node_id, Init init);
		Result_NoneLightningErrorZ handle_reply_channel_range(byte[] their_node_id, ReplyChannelRange msg);
		Result_NoneLightningErrorZ handle_reply_short_channel_ids_end(byte[] their_node_id, ReplyShortChannelIdsEnd msg);
		Result_NoneLightningErrorZ handle_query_channel_range(byte[] their_node_id, QueryChannelRange msg);
		Result_NoneLightningErrorZ handle_query_short_channel_ids(byte[] their_node_id, QueryShortChannelIds msg);
	}
	private static class LDKRoutingMessageHandlerHolder { RoutingMessageHandler held; }
	public static RoutingMessageHandler new_impl(RoutingMessageHandlerInterface arg, MessageSendEventsProvider.MessageSendEventsProviderInterface MessageSendEventsProvider_impl) {
		final LDKRoutingMessageHandlerHolder impl_holder = new LDKRoutingMessageHandlerHolder();
		impl_holder.held = new RoutingMessageHandler(new bindings.LDKRoutingMessageHandler() {
			@Override public uint32_t handle_node_announcement(uint32_t msg) {
				NodeAnnouncement msg_hu_conv = new NodeAnnouncement(null, msg);
				Result_boolLightningErrorZ ret = arg.handle_node_announcement(msg_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t handle_channel_announcement(uint32_t msg) {
				ChannelAnnouncement msg_hu_conv = new ChannelAnnouncement(null, msg);
				Result_boolLightningErrorZ ret = arg.handle_channel_announcement(msg_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t handle_channel_update(uint32_t msg) {
				ChannelUpdate msg_hu_conv = new ChannelUpdate(null, msg);
				Result_boolLightningErrorZ ret = arg.handle_channel_update(msg_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public void handle_htlc_fail_channel_update(uint32_t update) {
				HTLCFailChannelUpdate update_hu_conv = HTLCFailChannelUpdate.constr_from_ptr(update);
				arg.handle_htlc_fail_channel_update(update_hu_conv);
			}
			@Override public uint32_t[] get_next_channel_announcements(long starting_point, byte batch_amount) {
				ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>[] ret = arg.get_next_channel_announcements(starting_point, batch_amount);
				uint32_t[] result = (uint32_t[])Arrays.stream(ret).map(arr_conv_63 -> bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(arr_conv_63.a == null ? 0 : arr_conv_63.a.ptr & ~1/*XXX: this.ptrs_to.add(arr_conv_63_a)*/, arr_conv_63.b == null ? 0 : arr_conv_63.b.ptr & ~1/*XXX: this.ptrs_to.add(arr_conv_63_b)*/, arr_conv_63.c == null ? 0 : arr_conv_63.c.ptr & ~1/*XXX: this.ptrs_to.add(arr_conv_63_c)*/)).toArray();
				/* TODO 2 ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>  */;
				return result;
			}
			@Override public uint32_t[] get_next_node_announcements(byte[] starting_point, byte batch_amount) {
				NodeAnnouncement[] ret = arg.get_next_node_announcements(starting_point, batch_amount);
				uint32_t[] result = (uint32_t[])Arrays.stream(ret).map(arr_conv_18 -> arr_conv_18 == null ? 0 : arr_conv_18.ptr & ~1).toArray();
				/* TODO 2 NodeAnnouncement  */;
				return result;
			}
			@Override public void sync_routing_table(byte[] their_node_id, uint32_t init) {
				Init init_hu_conv = new Init(null, init);
				arg.sync_routing_table(their_node_id, init_hu_conv);
			}
			@Override public uint32_t handle_reply_channel_range(byte[] their_node_id, uint32_t msg) {
				ReplyChannelRange msg_hu_conv = new ReplyChannelRange(null, msg);
				Result_NoneLightningErrorZ ret = arg.handle_reply_channel_range(their_node_id, msg_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t handle_reply_short_channel_ids_end(byte[] their_node_id, uint32_t msg) {
				ReplyShortChannelIdsEnd msg_hu_conv = new ReplyShortChannelIdsEnd(null, msg);
				Result_NoneLightningErrorZ ret = arg.handle_reply_short_channel_ids_end(their_node_id, msg_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t handle_query_channel_range(byte[] their_node_id, uint32_t msg) {
				QueryChannelRange msg_hu_conv = new QueryChannelRange(null, msg);
				Result_NoneLightningErrorZ ret = arg.handle_query_channel_range(their_node_id, msg_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t handle_query_short_channel_ids(byte[] their_node_id, uint32_t msg) {
				QueryShortChannelIds msg_hu_conv = new QueryShortChannelIds(null, msg);
				Result_NoneLightningErrorZ ret = arg.handle_query_short_channel_ids(their_node_id, msg_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
		}, MessageSendEventsProvider.new_impl(MessageSendEventsProvider_impl).bindings_instance);
		return impl_holder.held;
	}
	public Result_boolLightningErrorZ handle_node_announcement(NodeAnnouncement msg) {
		uint32_t ret = bindings.RoutingMessageHandler_handle_node_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_boolLightningErrorZ handle_channel_announcement(ChannelAnnouncement msg) {
		uint32_t ret = bindings.RoutingMessageHandler_handle_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_boolLightningErrorZ handle_channel_update(ChannelUpdate msg) {
		uint32_t ret = bindings.RoutingMessageHandler_handle_channel_update(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public void handle_htlc_fail_channel_update(HTLCFailChannelUpdate update) {
		bindings.RoutingMessageHandler_handle_htlc_fail_channel_update(this.ptr, update == null ? 0 : update.ptr & ~1);
		this.ptrs_to.add(update);
	}

	public ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>[] get_next_channel_announcements(long starting_point, byte batch_amount) {
		uint32_t[] ret = bindings.RoutingMessageHandler_get_next_channel_announcements(this.ptr, starting_point, batch_amount);
		ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>[] arr_conv_63_arr = new ThreeTuple[ret.length];
		for (int l = 0; l < ret.length; l++) {
			uint32_t arr_conv_63 = ret[l];
			uint32_t arr_conv_63_a = bindings.LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(arr_conv_63);
			ChannelAnnouncement arr_conv_63_a_hu_conv = new ChannelAnnouncement(null, arr_conv_63_a);;
			uint32_t arr_conv_63_b = bindings.LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(arr_conv_63);
			ChannelUpdate arr_conv_63_b_hu_conv = new ChannelUpdate(null, arr_conv_63_b);;
			uint32_t arr_conv_63_c = bindings.LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(arr_conv_63);
			ChannelUpdate arr_conv_63_c_hu_conv = new ChannelUpdate(null, arr_conv_63_c);;
			ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate> arr_conv_63_conv = new ThreeTuple<ChannelAnnouncement, ChannelUpdate, ChannelUpdate>(arr_conv_63_a_hu_conv, arr_conv_63_b_hu_conv, arr_conv_63_c_hu_conv);
			arr_conv_63_arr[l] = arr_conv_63_conv;
		}
		return arr_conv_63_arr;
	}

	public NodeAnnouncement[] get_next_node_announcements(byte[] starting_point, byte batch_amount) {
		uint32_t[] ret = bindings.RoutingMessageHandler_get_next_node_announcements(this.ptr, starting_point, batch_amount);
		NodeAnnouncement[] arr_conv_18_arr = new NodeAnnouncement[ret.length];
		for (int s = 0; s < ret.length; s++) {
			uint32_t arr_conv_18 = ret[s];
			NodeAnnouncement arr_conv_18_hu_conv = new NodeAnnouncement(null, arr_conv_18);
			arr_conv_18_arr[s] = arr_conv_18_hu_conv;
		}
		return arr_conv_18_arr;
	}

	public void sync_routing_table(byte[] their_node_id, Init init) {
		bindings.RoutingMessageHandler_sync_routing_table(this.ptr, their_node_id, init == null ? 0 : init.ptr & ~1);
		this.ptrs_to.add(init);
	}

	public Result_NoneLightningErrorZ handle_reply_channel_range(byte[] their_node_id, ReplyChannelRange msg) {
		uint32_t ret = bindings.RoutingMessageHandler_handle_reply_channel_range(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ handle_reply_short_channel_ids_end(byte[] their_node_id, ReplyShortChannelIdsEnd msg) {
		uint32_t ret = bindings.RoutingMessageHandler_handle_reply_short_channel_ids_end(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ handle_query_channel_range(byte[] their_node_id, QueryChannelRange msg) {
		uint32_t ret = bindings.RoutingMessageHandler_handle_query_channel_range(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public Result_NoneLightningErrorZ handle_query_short_channel_ids(byte[] their_node_id, QueryShortChannelIds msg) {
		uint32_t ret = bindings.RoutingMessageHandler_handle_query_short_channel_ids(this.ptr, their_node_id, msg == null ? 0 : msg.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

}
