using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Used to signal to one of many waiters that the condition they're waiting on has happened.
 * 
 * This is usually used by LDK objects such as [`ChannelManager`] or [`PeerManager`] to signal to
 * the background processor that it should wake up and process pending events.
 * 
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [`PeerManager`]: crate::ln::peer_handler::PeerManager
 */
public class Notifier : CommonBase {
	internal Notifier(object _dummy, long ptr) : base(ptr) { }
	~Notifier() {
		if (ptr != 0) { bindings.Notifier_free(ptr); }
	}

	/**
	 * Constructs a new notifier.
	 */
	public static org.ldk.structs.Notifier of() {
		long ret = bindings.Notifier_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Notifier ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Notifier(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Wake waiters, tracking that wake needs to occur even if there are currently no waiters.
	 * 
	 * We deem the notification successful either directly after any callbacks were made, or after
	 * the user [`poll`]ed a previously-generated [`Future`].
	 * 
	 * [`poll`]: core::future::Future::poll
	 */
	public void notify() {
		bindings.Notifier_notify(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Gets a [`Future`] that will get woken up with any waiters
	 */
	public org.ldk.structs.Future get_future() {
		long ret = bindings.Notifier_get_future(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Future ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Future(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
