
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class EventsProvider extends CommonBase {
	final bindings.LDKEventsProvider bindings_instance;
	EventsProvider(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private EventsProvider(bindings.LDKEventsProvider arg) {
		super(bindings.LDKEventsProvider_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.EventsProvider_free(ptr); } super.finalize();
	}

	public static interface EventsProviderInterface {
		Event[] get_and_clear_pending_events();
	}
	private static class LDKEventsProviderHolder { EventsProvider held; }
	public static EventsProvider new_impl(EventsProviderInterface arg) {
		final LDKEventsProviderHolder impl_holder = new LDKEventsProviderHolder();
		impl_holder.held = new EventsProvider(new bindings.LDKEventsProvider() {
			@Override public uint32_t[] get_and_clear_pending_events() {
				Event[] ret = arg.get_and_clear_pending_events();
				uint32_t[] result = (uint32_t[])Arrays.stream(ret).map(arr_conv_7 -> arr_conv_7.ptr).toArray();
				/* TODO 2 Event  */;
				return result;
			}
		});
		return impl_holder.held;
	}
	public Event[] get_and_clear_pending_events() {
		uint32_t[] ret = bindings.EventsProvider_get_and_clear_pending_events(this.ptr);
		Event[] arr_conv_7_arr = new Event[ret.length];
		for (int h = 0; h < ret.length; h++) {
			uint32_t arr_conv_7 = ret[h];
			Event arr_conv_7_hu_conv = Event.constr_from_ptr(arr_conv_7);
			arr_conv_7_hu_conv.ptrs_to.add(this);
			arr_conv_7_arr[h] = arr_conv_7_hu_conv;
		}
		return arr_conv_7_arr;
	}

}
