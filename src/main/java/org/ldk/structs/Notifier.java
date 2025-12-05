package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Used to signal to one of many waiters that the condition they're waiting on has happened.
 * 
 * This is usually used by LDK objects such as [`ChannelManager`] or [`PeerManager`] to signal to
 * the background processor that it should wake up and process pending events.
 * 
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [`PeerManager`]: crate::ln::peer_handler::PeerManager
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Notifier extends CommonBase {
	Notifier(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Notifier_free(ptr); }
	}

	/**
	 * Constructs a new notifier.
	 */
	public static Notifier of() {
		long ret = bindings.Notifier_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Notifier ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Notifier(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
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
	void do_notify() {
		bindings.Notifier_notify(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Gets a [`Future`] that will get woken up with any waiters
	 */
	public Future get_future() {
		long ret = bindings.Notifier_get_future(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Future ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Future(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
