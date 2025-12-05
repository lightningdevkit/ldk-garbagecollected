
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Used to signal to one of many waiters that the condition they're waiting on has happened.
 * 
 * This is usually used by LDK objects such as [`ChannelManager`] or [`PeerManager`] to signal to
 * the background processor that it should wake up and process pending events.
 * 
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [`PeerManager`]: crate::ln::peer_handler::PeerManager
 */
export class Notifier extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Notifier_free);
	}

	/**
	 * Constructs a new notifier.
	 */
	public static constructor_new(): Notifier {
		const ret: bigint = bindings.Notifier_new();
		const ret_hu_conv: Notifier = new Notifier(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
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
	public notify(): void {
		bindings.Notifier_notify(this.ptr);
	}

	/**
	 * Gets a [`Future`] that will get woken up with any waiters
	 */
	public get_future(): Future {
		const ret: bigint = bindings.Notifier_get_future(this.ptr);
		const ret_hu_conv: Future = new Future(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
