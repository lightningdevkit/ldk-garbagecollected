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
