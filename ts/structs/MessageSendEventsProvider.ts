
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
	private static class LDKMessageSendEventsProviderHolder { MessageSendEventsProvider held; }
	public static MessageSendEventsProvider new_impl(MessageSendEventsProviderInterface arg) {
		final LDKMessageSendEventsProviderHolder impl_holder = new LDKMessageSendEventsProviderHolder();
		impl_holder.held = new MessageSendEventsProvider(new bindings.LDKMessageSendEventsProvider() {
			@Override public uint32_t[] get_and_clear_pending_msg_events() {
				MessageSendEvent[] ret = arg.get_and_clear_pending_msg_events();
				uint32_t[] result = (uint32_t[])Arrays.stream(ret).map(arr_conv_18 -> arr_conv_18.ptr).toArray();
				/* TODO 2 MessageSendEvent  */;
				return result;
			}
		});
		return impl_holder.held;
	}
	public MessageSendEvent[] get_and_clear_pending_msg_events() {
		uint32_t[] ret = bindings.MessageSendEventsProvider_get_and_clear_pending_msg_events(this.ptr);
		MessageSendEvent[] arr_conv_18_arr = new MessageSendEvent[ret.length];
		for (int s = 0; s < ret.length; s++) {
			uint32_t arr_conv_18 = ret[s];
			MessageSendEvent arr_conv_18_hu_conv = MessageSendEvent.constr_from_ptr(arr_conv_18);
			arr_conv_18_hu_conv.ptrs_to.add(this);
			arr_conv_18_arr[s] = arr_conv_18_hu_conv;
		}
		return arr_conv_18_arr;
	}

}
