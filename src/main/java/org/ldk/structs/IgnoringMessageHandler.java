package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class IgnoringMessageHandler extends CommonBase {
	IgnoringMessageHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.IgnoringMessageHandler_free(ptr); }
	}

	public static IgnoringMessageHandler constructor_new() {
		long ret = bindings.IgnoringMessageHandler_new();
		IgnoringMessageHandler ret_hu_conv = new IgnoringMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.IgnoringMessageHandler_as_MessageSendEventsProvider(this.ptr);
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public RoutingMessageHandler as_RoutingMessageHandler() {
		long ret = bindings.IgnoringMessageHandler_as_RoutingMessageHandler(this.ptr);
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
