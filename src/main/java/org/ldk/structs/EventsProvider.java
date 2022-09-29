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
 * When using this trait, [`process_pending_events`] will call [`handle_event`] for each pending
 * event since the last invocation.
 * 
 * In order to ensure no [`Event`]s are lost, implementors of this trait will persist [`Event`]s
 * and replay any unhandled events on startup. An [`Event`] is considered handled when
 * [`process_pending_events`] returns, thus handlers MUST fully handle [`Event`]s and persist any
 * relevant changes to disk *before* returning.
 * 
 * Further, because an application may crash between an [`Event`] being handled and the
 * implementor of this trait being re-serialized, [`Event`] handling must be idempotent - in
 * effect, [`Event`]s may be replayed.
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
		 * See the trait-level documentation for requirements.
		 */
		void process_pending_events(EventHandler handler);
	}
	private static class LDKEventsProviderHolder { EventsProvider held; }
	public static EventsProvider new_impl(EventsProviderInterface arg) {
		final LDKEventsProviderHolder impl_holder = new LDKEventsProviderHolder();
		impl_holder.held = new EventsProvider(new bindings.LDKEventsProvider() {
			@Override public void process_pending_events(long handler) {
				EventHandler ret_hu_conv = new EventHandler(null, handler);
				if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
				arg.process_pending_events(ret_hu_conv);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Processes any events generated since the last call using the given event handler.
	 * 
	 * See the trait-level documentation for requirements.
	 */
	public void process_pending_events(EventHandler handler) {
		bindings.EventsProvider_process_pending_events(this.ptr, handler == null ? 0 : handler.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(handler);
		if (this != null) { this.ptrs_to.add(handler); };
	}

}
