using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class NullMessageRouter : CommonBase {
	internal NullMessageRouter(object _dummy, long ptr) : base(ptr) { }
	~NullMessageRouter() {
		if (ptr != 0) { bindings.NullMessageRouter_free(ptr); }
	}

	/**
	 * Constructs a new NullMessageRouter given each field
	 */
	public static org.ldk.structs.NullMessageRouter of() {
		long ret = bindings.NullMessageRouter_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NullMessageRouter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NullMessageRouter(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageRouter which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageRouter must be freed before this_arg is
	 */
	public org.ldk.structs.MessageRouter as_MessageRouter() {
		long ret = bindings.NullMessageRouter_as_MessageRouter(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageRouter ret_hu_conv = new MessageRouter(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
