using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Provides references to trait impls which handle different types of messages.
 */
public class MessageHandler : CommonBase {
	internal MessageHandler(object _dummy, long ptr) : base(ptr) { }
	~MessageHandler() {
		if (ptr != 0) { bindings.MessageHandler_free(ptr); }
	}

	/**
	 * A message handler which handles messages specific to channels. Usually this is just a
	 * [`ChannelManager`] object or an [`ErroringMessageHandler`].
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public ChannelMessageHandler get_chan_handler() {
		long ret = bindings.MessageHandler_get_chan_handler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A message handler which handles messages specific to channels. Usually this is just a
	 * [`ChannelManager`] object or an [`ErroringMessageHandler`].
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public void set_chan_handler(org.ldk.structs.ChannelMessageHandler val) {
		bindings.MessageHandler_set_chan_handler(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * A message handler which handles messages updating our knowledge of the network channel
	 * graph. Usually this is just a [`P2PGossipSync`] object or an [`IgnoringMessageHandler`].
	 * 
	 * [`P2PGossipSync`]: crate::routing::gossip::P2PGossipSync
	 */
	public RoutingMessageHandler get_route_handler() {
		long ret = bindings.MessageHandler_get_route_handler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A message handler which handles messages updating our knowledge of the network channel
	 * graph. Usually this is just a [`P2PGossipSync`] object or an [`IgnoringMessageHandler`].
	 * 
	 * [`P2PGossipSync`]: crate::routing::gossip::P2PGossipSync
	 */
	public void set_route_handler(org.ldk.structs.RoutingMessageHandler val) {
		bindings.MessageHandler_set_route_handler(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * A message handler which handles onion messages. This should generally be an
	 * [`OnionMessenger`], but can also be an [`IgnoringMessageHandler`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::OnionMessenger
	 */
	public OnionMessageHandler get_onion_message_handler() {
		long ret = bindings.MessageHandler_get_onion_message_handler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageHandler ret_hu_conv = new OnionMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A message handler which handles onion messages. This should generally be an
	 * [`OnionMessenger`], but can also be an [`IgnoringMessageHandler`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::OnionMessenger
	 */
	public void set_onion_message_handler(org.ldk.structs.OnionMessageHandler val) {
		bindings.MessageHandler_set_onion_message_handler(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * A message handler which handles custom messages. The only LDK-provided implementation is
	 * [`IgnoringMessageHandler`].
	 */
	public CustomMessageHandler get_custom_message_handler() {
		long ret = bindings.MessageHandler_get_custom_message_handler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomMessageHandler ret_hu_conv = new CustomMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A message handler which handles custom messages. The only LDK-provided implementation is
	 * [`IgnoringMessageHandler`].
	 */
	public void set_custom_message_handler(org.ldk.structs.CustomMessageHandler val) {
		bindings.MessageHandler_set_custom_message_handler(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new MessageHandler given each field
	 */
	public static MessageHandler of(org.ldk.structs.ChannelMessageHandler chan_handler_arg, org.ldk.structs.RoutingMessageHandler route_handler_arg, org.ldk.structs.OnionMessageHandler onion_message_handler_arg, org.ldk.structs.CustomMessageHandler custom_message_handler_arg) {
		long ret = bindings.MessageHandler_new(chan_handler_arg.ptr, route_handler_arg.ptr, onion_message_handler_arg.ptr, custom_message_handler_arg.ptr);
		GC.KeepAlive(chan_handler_arg);
		GC.KeepAlive(route_handler_arg);
		GC.KeepAlive(onion_message_handler_arg);
		GC.KeepAlive(custom_message_handler_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageHandler ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MessageHandler(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(chan_handler_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(route_handler_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(onion_message_handler_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(custom_message_handler_arg); };
		return ret_hu_conv;
	}

}
} } }
