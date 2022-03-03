package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait implemented for objects handling events from [`EventsProvider`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class EventHandler extends CommonBase {
	final bindings.LDKEventHandler bindings_instance;
	EventHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private EventHandler(bindings.LDKEventHandler arg) {
		super(bindings.LDKEventHandler_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.EventHandler_free(ptr); } super.finalize();
	}

	public static interface EventHandlerInterface {
		/**
		 * Handles the given [`Event`].
		 * 
		 * See [`EventsProvider`] for details that must be considered when implementing this method.
		 */
		void handle_event(Event event);
	}
	private static class LDKEventHandlerHolder { EventHandler held; }
	public static EventHandler new_impl(EventHandlerInterface arg) {
		final LDKEventHandlerHolder impl_holder = new LDKEventHandlerHolder();
		impl_holder.held = new EventHandler(new bindings.LDKEventHandler() {
			@Override public void handle_event(long event) {
				Event event_hu_conv = Event.constr_from_ptr(event);
				arg.handle_event(event_hu_conv);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Handles the given [`Event`].
	 * 
	 * See [`EventsProvider`] for details that must be considered when implementing this method.
	 */
	public void handle_event(Event event) {
		bindings.EventHandler_handle_event(this.ptr, event == null ? 0 : event.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(event);
	}

}
