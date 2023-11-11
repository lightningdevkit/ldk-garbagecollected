
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of EventHandler */
public interface EventHandlerInterface {
	/**Handles the given [`Event`].
	 * 
	 * See [`EventsProvider`] for details that must be considered when implementing this method.
	 */
	void handle_event(Event _event);
}

/**
 * A trait implemented for objects handling events from [`EventsProvider`].
 * 
 * An async variation also exists for implementations of [`EventsProvider`] that support async
 * event handling. The async event handler should satisfy the generic bounds: `F:
 * core::future::Future, H: Fn(Event) -> F`.
 */
public class EventHandler : CommonBase {
	internal bindings.LDKEventHandler bindings_instance;
	internal long instance_idx;

	internal EventHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~EventHandler() {
		if (ptr != 0) { bindings.EventHandler_free(ptr); }
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

	/** Creates a new instance of EventHandler from a given implementation */
	public static EventHandler new_impl(EventHandlerInterface arg) {
		LDKEventHandlerHolder impl_holder = new LDKEventHandlerHolder();
		LDKEventHandlerImpl impl = new LDKEventHandlerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKEventHandler_new(impl);

		impl_holder.held = new EventHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
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
		if (this != null) { this.ptrs_to.AddLast(_event); };
	}

}
} } }
