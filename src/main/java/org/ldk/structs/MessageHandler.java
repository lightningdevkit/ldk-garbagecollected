package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MessageHandler extends CommonBase {
	MessageHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MessageHandler_free(ptr); }
	}

	public ChannelMessageHandler get_chan_handler() {
		long ret = bindings.MessageHandler_get_chan_handler(this.ptr);
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_chan_handler(ChannelMessageHandler val) {
		bindings.MessageHandler_set_chan_handler(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public RoutingMessageHandler get_route_handler() {
		long ret = bindings.MessageHandler_get_route_handler(this.ptr);
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_route_handler(RoutingMessageHandler val) {
		bindings.MessageHandler_set_route_handler(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public static MessageHandler constructor_new(ChannelMessageHandler chan_handler_arg, RoutingMessageHandler route_handler_arg) {
		long ret = bindings.MessageHandler_new(chan_handler_arg == null ? 0 : chan_handler_arg.ptr, route_handler_arg == null ? 0 : route_handler_arg.ptr);
		MessageHandler ret_hu_conv = new MessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(chan_handler_arg);
		ret_hu_conv.ptrs_to.add(route_handler_arg);
		return ret_hu_conv;
	}

}
