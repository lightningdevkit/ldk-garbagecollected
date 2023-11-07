
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of OffersMessageHandler */
public interface OffersMessageHandlerInterface {
	/**Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
	 * or replying with an error.
	 * 
	 * The returned [`OffersMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::OnionMessenger
	 */
	Option_OffersMessageZ handle_message(OffersMessage message);
	/**Releases any [`OffersMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a payment flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_message`].
	 */
	ThreeTuple_OffersMessageDestinationBlindedPathZ[] release_pending_messages();
}

/**
 * A handler for an [`OnionMessage`] containing a BOLT 12 Offers message as its payload.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
public class OffersMessageHandler : CommonBase {
	internal bindings.LDKOffersMessageHandler bindings_instance;
	internal long instance_idx;

	internal OffersMessageHandler(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~OffersMessageHandler() {
		if (ptr != 0) { bindings.OffersMessageHandler_free(ptr); }
	}

	private class LDKOffersMessageHandlerHolder { internal OffersMessageHandler held; }
	private class LDKOffersMessageHandlerImpl : bindings.LDKOffersMessageHandler {
		internal LDKOffersMessageHandlerImpl(OffersMessageHandlerInterface arg, LDKOffersMessageHandlerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private OffersMessageHandlerInterface arg;
		private LDKOffersMessageHandlerHolder impl_holder;
		public long handle_message(long _message) {
			org.ldk.structs.OffersMessage _message_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(_message);
			if (_message_hu_conv != null) { _message_hu_conv.ptrs_to.AddLast(this); };
			Option_OffersMessageZ ret = arg.handle_message(_message_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
		public long release_pending_messages() {
			ThreeTuple_OffersMessageDestinationBlindedPathZ[] ret = arg.release_pending_messages();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint64Array(InternalUtils.mapArray(ret, ret_conv_49 => ret_conv_49 == null ? 0 : ret_conv_49.clone_ptr()));
			return result;
		}
	}

	/** Creates a new instance of OffersMessageHandler from a given implementation */
	public static OffersMessageHandler new_impl(OffersMessageHandlerInterface arg) {
		LDKOffersMessageHandlerHolder impl_holder = new LDKOffersMessageHandlerHolder();
		LDKOffersMessageHandlerImpl impl = new LDKOffersMessageHandlerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKOffersMessageHandler_new(impl);

		impl_holder.held = new OffersMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
	 * or replying with an error.
	 * 
	 * The returned [`OffersMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::OnionMessenger
	 */
	public Option_OffersMessageZ handle_message(org.ldk.structs.OffersMessage message) {
		long ret = bindings.OffersMessageHandler_handle_message(this.ptr, message.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(message); };
		return ret_hu_conv;
	}

	/**
	 * Releases any [`OffersMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a payment flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_message`].
	 */
	public ThreeTuple_OffersMessageDestinationBlindedPathZ[] release_pending_messages() {
		long ret = bindings.OffersMessageHandler_release_pending_messages(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_49_len = InternalUtils.getArrayLength(ret);
		ThreeTuple_OffersMessageDestinationBlindedPathZ[] ret_conv_49_arr = new ThreeTuple_OffersMessageDestinationBlindedPathZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = InternalUtils.getU64ArrayElem(ret, x);
			ThreeTuple_OffersMessageDestinationBlindedPathZ ret_conv_49_hu_conv = new ThreeTuple_OffersMessageDestinationBlindedPathZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_49_arr;
	}

}
} } }
