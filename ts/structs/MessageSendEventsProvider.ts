	public MessageSendEvent[] get_and_clear_pending_msg_events() {
		uint32_t[] ret = bindings.MessageSendEventsProvider_get_and_clear_pending_msg_events(this.ptr);
		MessageSendEvent[] arr_conv_18_arr = new MessageSendEvent[ret.length];
		for (int s = 0; s < ret.length; s++) {
			uint32_t arr_conv_18 = ret[s];
			MessageSendEvent arr_conv_18_hu_conv = MessageSendEvent.constr_from_ptr(arr_conv_18);
			arr_conv_18_hu_conv.ptrs_to.add(this);
			arr_conv_18_arr[s] = arr_conv_18_hu_conv;
		}
		return arr_conv_18_arr;
	}

}
