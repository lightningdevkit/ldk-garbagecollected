package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class EventsProvider extends CommonBase {
	EventsProvider(Object _dummy, long ptr) { super(ptr); }
	public EventsProvider(bindings.LDKEventsProvider arg) {
		super(bindings.LDKEventsProvider_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.EventsProvider_free(ptr); super.finalize();
	}

	public Event[] get_and_clear_pending_events() {
		long[] ret = bindings.EventsProvider_get_and_clear_pending_events(this.ptr);
		Event[] arr_conv_7_arr = new Event[ret.length];
		for (int h = 0; h < ret.length; h++) {
			long arr_conv_7 = ret[h];
			Event arr_conv_7_hu_conv = Event.constr_from_ptr(arr_conv_7);
			arr_conv_7_arr[h] = arr_conv_7_hu_conv;
		}
		return arr_conv_7_arr;
	}

}
