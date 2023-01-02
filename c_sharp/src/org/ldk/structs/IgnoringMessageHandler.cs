using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A dummy struct which implements `RoutingMessageHandler` without storing any routing information
 * or doing any processing. You can provide one of these as the route_handler in a MessageHandler.
 */
public class IgnoringMessageHandler : CommonBase {
	internal IgnoringMessageHandler(object _dummy, long ptr) : base(ptr) { }
	~IgnoringMessageHandler() {
		if (ptr != 0) { bindings.IgnoringMessageHandler_free(ptr); }
	}

	/**
	 * Constructs a new IgnoringMessageHandler given each field
	 */
	public static IgnoringMessageHandler of() {
		long ret = bindings.IgnoringMessageHandler_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.IgnoringMessageHandler ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.IgnoringMessageHandler(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
	 */
	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.IgnoringMessageHandler_as_MessageSendEventsProvider(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new RoutingMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned RoutingMessageHandler must be freed before this_arg is
	 */
	public RoutingMessageHandler as_RoutingMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_RoutingMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageProvider must be freed before this_arg is
	 */
	public OnionMessageProvider as_OnionMessageProvider() {
		long ret = bindings.IgnoringMessageHandler_as_OnionMessageProvider(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageProvider ret_hu_conv = new OnionMessageProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageHandler must be freed before this_arg is
	 */
	public OnionMessageHandler as_OnionMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_OnionMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageHandler ret_hu_conv = new OnionMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomOnionMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomOnionMessageHandler must be freed before this_arg is
	 */
	public CustomOnionMessageHandler as_CustomOnionMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_CustomOnionMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomOnionMessageHandler ret_hu_conv = new CustomOnionMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomMessageReader which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomMessageReader must be freed before this_arg is
	 */
	public CustomMessageReader as_CustomMessageReader() {
		long ret = bindings.IgnoringMessageHandler_as_CustomMessageReader(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomMessageReader ret_hu_conv = new CustomMessageReader(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomMessageHandler must be freed before this_arg is
	 */
	public CustomMessageHandler as_CustomMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_CustomMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomMessageHandler ret_hu_conv = new CustomMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
