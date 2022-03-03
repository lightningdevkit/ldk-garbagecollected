package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait indicating an object may generate events.
 * 
 * Events are processed by passing an [`EventHandler`] to [`process_pending_events`].
 * 
 * # Requirements
 * 
 * See [`process_pending_events`] for requirements around event processing.
 * 
 * When using this trait, [`process_pending_events`] will call [`handle_event`] for each pending
 * event since the last invocation. The handler must either act upon the event immediately
 * or preserve it for later handling.
 * 
 * Note, handlers may call back into the provider and thus deadlocking must be avoided. Be sure to
 * consult the provider's documentation on the implication of processing events and how a handler
 * may safely use the provider (e.g., see [`ChannelManager::process_pending_events`] and
 * [`ChainMonitor::process_pending_events`]).
 * 
 * (C-not implementable) As there is likely no reason for a user to implement this trait on their
 * own type(s).
 * 
 * [`process_pending_events`]: Self::process_pending_events
 * [`handle_event`]: EventHandler::handle_event
 * [`ChannelManager::process_pending_events`]: crate::ln::channelmanager::ChannelManager#method.process_pending_events
 * [`ChainMonitor::process_pending_events`]: crate::chain::chainmonitor::ChainMonitor#method.process_pending_events
 */
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
		/**
		 * Processes any events generated since the last call using the given event handler.
		 * 
		 * Subsequent calls must only process new events. However, handlers must be capable of handling
		 * duplicate events across process restarts. This may occur if the provider was recovered from
		 * an old state (i.e., it hadn't been successfully persisted after processing pending events).
		 */
		void process_pending_events(EventHandler handler);
	}
	private static class LDKEventsProviderHolder { EventsProvider held; }
	public static EventsProvider new_impl(EventsProviderInterface arg) {
		final LDKEventsProviderHolder impl_holder = new LDKEventsProviderHolder();
		impl_holder.held = new EventsProvider(new bindings.LDKEventsProvider() {
			@Override public void process_pending_events(long handler) {
				EventHandler ret_hu_conv = new EventHandler(null, handler);
				ret_hu_conv.ptrs_to.add(this);
				arg.process_pending_events(ret_hu_conv);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Processes any events generated since the last call using the given event handler.
	 * 
	 * Subsequent calls must only process new events. However, handlers must be capable of handling
	 * duplicate events across process restarts. This may occur if the provider was recovered from
	 * an old state (i.e., it hadn't been successfully persisted after processing pending events).
	 */
	public void process_pending_events(EventHandler handler) {
		bindings.EventsProvider_process_pending_events(this.ptr, handler == null ? 0 : handler.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(handler);
		this.ptrs_to.add(handler);
	}

}
