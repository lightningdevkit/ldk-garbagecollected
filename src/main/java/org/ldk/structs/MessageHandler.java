package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class MessageHandler extends CommonBase {
	MessageHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.MessageHandler_free(ptr);
	}

	public ChannelMessageHandler get_chan_handler(MessageHandler this_ptr) {
		ChannelMessageHandler ret = new ChannelMessageHandler(null, bindings.MessageHandler_get_chan_handler(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		ret.ptrs_to.add(this);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chan_handler(MessageHandler this_ptr, ChannelMessageHandler val) {
		bindings.MessageHandler_set_chan_handler(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public RoutingMessageHandler get_route_handler(MessageHandler this_ptr) {
		RoutingMessageHandler ret = new RoutingMessageHandler(null, bindings.MessageHandler_get_route_handler(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		ret.ptrs_to.add(this);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_route_handler(MessageHandler this_ptr, RoutingMessageHandler val) {
		bindings.MessageHandler_set_route_handler(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public MessageHandler(ChannelMessageHandler chan_handler_arg, RoutingMessageHandler route_handler_arg) {
		super(bindings.MessageHandler_new(chan_handler_arg == null ? 0 : chan_handler_arg.ptr, route_handler_arg == null ? 0 : route_handler_arg.ptr));
		this.ptrs_to.add(chan_handler_arg);
		this.ptrs_to.add(route_handler_arg);
	}

}
