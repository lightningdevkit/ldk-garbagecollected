package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ErroringMessageHandler extends CommonBase {
	ErroringMessageHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ErroringMessageHandler_free(ptr); }
	}

	public static ErroringMessageHandler constructor_new() {
		long ret = bindings.ErroringMessageHandler_new();
		ErroringMessageHandler ret_hu_conv = new ErroringMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.ErroringMessageHandler_as_MessageSendEventsProvider(this.ptr);
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelMessageHandler as_ChannelMessageHandler() {
		long ret = bindings.ErroringMessageHandler_as_ChannelMessageHandler(this.ptr);
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
