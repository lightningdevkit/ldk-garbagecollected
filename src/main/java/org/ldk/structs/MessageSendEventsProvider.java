package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MessageSendEventsProvider extends CommonBase {
	MessageSendEventsProvider(Object _dummy, long ptr) { super(ptr); }
	public MessageSendEventsProvider(bindings.LDKMessageSendEventsProvider arg) {
		super(bindings.LDKMessageSendEventsProvider_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.MessageSendEventsProvider_free(ptr); super.finalize();
	}

	public MessageSendEvent[] get_and_clear_pending_msg_events() {
		long[] ret = bindings.MessageSendEventsProvider_get_and_clear_pending_msg_events(this.ptr);
		MessageSendEvent[] arr_conv_18_arr = new MessageSendEvent[ret.length];
		for (int s = 0; s < ret.length; s++) {
			long arr_conv_18 = ret[s];
			MessageSendEvent arr_conv_18_hu_conv = MessageSendEvent.constr_from_ptr(arr_conv_18);
			arr_conv_18_arr[s] = arr_conv_18_hu_conv;
		}
		return arr_conv_18_arr;
	}

}
