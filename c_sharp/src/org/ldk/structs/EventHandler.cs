using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait implemented for objects handling events from [`EventsProvider`].
 * 
 * An async variation also exists for implementations of [`EventsProvider`] that support async
 * event handling. The async event handler should satisfy the generic bounds: `F:
 * core::future::Future, H: Fn(Event) -> F`.
 */
public class EventHandler : CommonBase {
	internal readonly bindings.LDKEventHandler bindings_instance;
	internal EventHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private EventHandler(bindings.LDKEventHandler arg) : base(bindings.LDKEventHandler_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~EventHandler() {
		if (ptr != 0) { bindings.EventHandler_free(ptr); }
	}

	public interface EventHandlerInterface {
		/**
		 * Handles the given [`Event`].
		 * 
		 * See [`EventsProvider`] for details that must be considered when implementing this method.
		 */
		void handle_event(Event _event);
	}
	private class LDKEventHandlerHolder { internal EventHandler held; }
	private class LDKEventHandlerImpl : bindings.LDKEventHandler {
		internal LDKEventHandlerImpl(EventHandlerInterface arg, LDKEventHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private EventHandlerInterface arg;
		private LDKEventHandlerHolder impl_holder;
		public void handle_event(long _event) {
			org.ldk.structs.Event _event_hu_conv = org.ldk.structs.Event.constr_from_ptr(_event);
			if (_event_hu_conv != null) { _event_hu_conv.ptrs_to.AddLast(this); };
			arg.handle_event(_event_hu_conv);
				GC.KeepAlive(arg);
		}
	}
	public static EventHandler new_impl(EventHandlerInterface arg) {
		LDKEventHandlerHolder impl_holder = new LDKEventHandlerHolder();
		impl_holder.held = new EventHandler(new LDKEventHandlerImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Handles the given [`Event`].
	 * 
	 * See [`EventsProvider`] for details that must be considered when implementing this method.
	 */
	public void handle_event(org.ldk.structs.Event _event) {
		bindings.EventHandler_handle_event(this.ptr, _event.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(_event);
	}

}
} } }
