
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A special [`MessageRouter`] that performs no routing and does not create blinded paths.
 * Its purpose is to enable the creation of [`Offer`]s and [`Refund`]s without blinded paths,
 * where the user's `node_id` is used directly as the [`Destination`].
 * 
 * # Note
 * [`NullMessageRouter`] **must not** be used as the type parameter for [`ChannelManager`],
 * since [`ChannelManager`] requires a functioning [`MessageRouter`] to create blinded paths,
 * which are necessary for constructing reply paths in onion message communication.
 * However, [`NullMessageRouter`] *can* still be passed as an argument to [`ChannelManager`]
 * methods that accepts a [`MessageRouter`], such as [`ChannelManager::create_offer_builder_using_router`],
 * when blinded paths are not needed.
 * 
 * [`Offer`]: crate::offers::offer::Offer
 * [`Refund`]: crate::offers::refund::Refund
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [`ChannelManager::create_offer_builder_using_router`]: crate::ln::channelmanager::ChannelManager::create_offer_builder_using_router
 */
export class NullMessageRouter extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NullMessageRouter_free);
	}

	/**
	 * Constructs a new NullMessageRouter given each field
	 */
	public static constructor_new(): NullMessageRouter {
		const ret: bigint = bindings.NullMessageRouter_new();
		const ret_hu_conv: NullMessageRouter = new NullMessageRouter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageRouter which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageRouter must be freed before this_arg is
	 */
	public as_MessageRouter(): MessageRouter {
		const ret: bigint = bindings.NullMessageRouter_as_MessageRouter(this.ptr);
		const ret_hu_conv: MessageRouter = new MessageRouter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
