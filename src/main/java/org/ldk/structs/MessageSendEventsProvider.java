package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MessageSendEventsProvider extends CommonBase {
	final bindings.LDKMessageSendEventsProvider bindings_instance;
	MessageSendEventsProvider(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private MessageSendEventsProvider(bindings.LDKMessageSendEventsProvider arg) {
		super(bindings.LDKMessageSendEventsProvider_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.MessageSendEventsProvider_free(ptr); } super.finalize();
	}

	public static interface MessageSendEventsProviderInterface {
		MessageSendEvent[] get_and_clear_pending_msg_events();
	}
	public MessageSendEventsProvider(MessageSendEventsProviderInterface arg) {
		this(new bindings.LDKMessageSendEventsProvider() {
			@Override public long[] get_and_clear_pending_msg_events() {
				MessageSendEvent[] ret = arg.get_and_clear_pending_msg_events();
				long[] result = Arrays.stream(ret).mapToLong(arr_conv_18 -> arr_conv_18.ptr).toArray();
				//TODO: May need to call: /* TODO 2 MessageSendEvent  */;
				return result;
			}
		});
	}
	public MessageSendEvent[] get_and_clear_pending_msg_events() {
		long[] ret = bindings.MessageSendEventsProvider_get_and_clear_pending_msg_events(this.ptr);
		MessageSendEvent[] arr_conv_18_arr = new MessageSendEvent[ret.length];
		for (int s = 0; s < ret.length; s++) {
			long arr_conv_18 = ret[s];
			MessageSendEvent arr_conv_18_hu_conv = MessageSendEvent.constr_from_ptr(arr_conv_18);
			arr_conv_18_hu_conv.ptrs_to.add(this);
			arr_conv_18_arr[s] = arr_conv_18_hu_conv;
		}
		return arr_conv_18_arr;
	}

}
