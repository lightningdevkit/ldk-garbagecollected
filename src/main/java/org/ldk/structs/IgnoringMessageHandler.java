package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A dummy struct which implements `RoutingMessageHandler` without storing any routing information
 * or doing any processing. You can provide one of these as the route_handler in a MessageHandler.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class IgnoringMessageHandler extends CommonBase {
	IgnoringMessageHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.IgnoringMessageHandler_free(ptr); }
	}

	/**
	 * Constructs a new IgnoringMessageHandler given each field
	 */
	public static IgnoringMessageHandler of() {
		long ret = bindings.IgnoringMessageHandler_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		IgnoringMessageHandler ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new IgnoringMessageHandler(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
	 */
	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.IgnoringMessageHandler_as_MessageSendEventsProvider(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new RoutingMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned RoutingMessageHandler must be freed before this_arg is
	 */
	public RoutingMessageHandler as_RoutingMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_RoutingMessageHandler(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomMessageReader which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomMessageReader must be freed before this_arg is
	 */
	public CustomMessageReader as_CustomMessageReader() {
		long ret = bindings.IgnoringMessageHandler_as_CustomMessageReader(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomMessageReader ret_hu_conv = new CustomMessageReader(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomMessageHandler must be freed before this_arg is
	 */
	public CustomMessageHandler as_CustomMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_CustomMessageHandler(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CustomMessageHandler ret_hu_conv = new CustomMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
