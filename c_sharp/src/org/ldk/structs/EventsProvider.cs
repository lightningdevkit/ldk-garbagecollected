using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait indicating an object may generate events.
 * 
 * Events are processed by passing an [`EventHandler`] to [`process_pending_events`].
 * 
 * Implementations of this trait may also feature an async version of event handling, as shown with
 * [`ChannelManager::process_pending_events_async`] and
 * [`ChainMonitor::process_pending_events_async`].
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
 * [`ChannelManager::process_pending_events_async`]: crate::ln::channelmanager::ChannelManager::process_pending_events_async
 * [`ChainMonitor::process_pending_events_async`]: crate::chain::chainmonitor::ChainMonitor::process_pending_events_async
 */
public class EventsProvider : CommonBase {
	internal readonly bindings.LDKEventsProvider bindings_instance;
	internal EventsProvider(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private EventsProvider(bindings.LDKEventsProvider arg) : base(bindings.LDKEventsProvider_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~EventsProvider() {
		if (ptr != 0) { bindings.EventsProvider_free(ptr); }
	}

	public interface EventsProviderInterface {
		/**
		 * Processes any events generated since the last call using the given event handler.
		 * 
		 * See the trait-level documentation for requirements.
		 */
		void process_pending_events(EventHandler _handler);
	}
	private class LDKEventsProviderHolder { internal EventsProvider held; }
	private class LDKEventsProviderImpl : bindings.LDKEventsProvider {
		internal LDKEventsProviderImpl(EventsProviderInterface arg, LDKEventsProviderHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private EventsProviderInterface arg;
		private LDKEventsProviderHolder impl_holder;
		public void process_pending_events(long _handler) {
			EventHandler ret_hu_conv = new EventHandler(null, _handler);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			arg.process_pending_events(ret_hu_conv);
				GC.KeepAlive(arg);
		}
	}
	public static EventsProvider new_impl(EventsProviderInterface arg) {
		LDKEventsProviderHolder impl_holder = new LDKEventsProviderHolder();
		impl_holder.held = new EventsProvider(new LDKEventsProviderImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Processes any events generated since the last call using the given event handler.
	 * 
	 * See the trait-level documentation for requirements.
	 */
	public void process_pending_events(org.ldk.structs.EventHandler handler) {
		bindings.EventsProvider_process_pending_events(this.ptr, handler == null ? 0 : handler.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(handler);
		if (this != null) { this.ptrs_to.AddLast(handler); };
	}

}
} } }
