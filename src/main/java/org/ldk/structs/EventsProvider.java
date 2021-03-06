package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
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
			@Override public long[] get_and_clear_pending_events() {
				Event[] ret = arg.get_and_clear_pending_events();
				long[] result = Arrays.stream(ret).mapToLong(ret_conv_7 -> ret_conv_7.ptr).toArray();
				/* TODO 2 Event  */;
				return result;
			}
		});
		return impl_holder.held;
	}
	public Event[] get_and_clear_pending_events() {
		long[] ret = bindings.EventsProvider_get_and_clear_pending_events(this.ptr);
		Event[] ret_conv_7_arr = new Event[ret.length];
		for (int h = 0; h < ret.length; h++) {
			long ret_conv_7 = ret[h];
			Event ret_conv_7_hu_conv = Event.constr_from_ptr(ret_conv_7);
			ret_conv_7_hu_conv.ptrs_to.add(this);
			ret_conv_7_arr[h] = ret_conv_7_hu_conv;
		}
		return ret_conv_7_arr;
	}

}
