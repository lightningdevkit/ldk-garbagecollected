using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A dummy struct which implements `ChannelMessageHandler` without having any channels.
 * You can provide one of these as the route_handler in a MessageHandler.
 */
public class ErroringMessageHandler : CommonBase {
	internal ErroringMessageHandler(object _dummy, long ptr) : base(ptr) { }
	~ErroringMessageHandler() {
		if (ptr != 0) { bindings.ErroringMessageHandler_free(ptr); }
	}

	/**
	 * Constructs a new ErroringMessageHandler
	 */
	public static org.ldk.structs.ErroringMessageHandler of() {
		long ret = bindings.ErroringMessageHandler_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErroringMessageHandler ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ErroringMessageHandler(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.BaseMessageHandler as_BaseMessageHandler() {
		long ret = bindings.ErroringMessageHandler_as_BaseMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BaseMessageHandler ret_hu_conv = new BaseMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelMessageHandler must be freed before this_arg is
	 */
	public org.ldk.structs.ChannelMessageHandler as_ChannelMessageHandler() {
		long ret = bindings.ErroringMessageHandler_as_ChannelMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
