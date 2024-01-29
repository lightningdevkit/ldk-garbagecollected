package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A handler for an [`OnionMessage`] containing a BOLT 12 Offers message as its payload.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OffersMessageHandler extends CommonBase {
	final bindings.LDKOffersMessageHandler bindings_instance;
	OffersMessageHandler(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private OffersMessageHandler(bindings.LDKOffersMessageHandler arg) {
		super(bindings.LDKOffersMessageHandler_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.OffersMessageHandler_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.OffersMessageHandler_free(ptr); }
		ptr = 0;
	}
	public static interface OffersMessageHandlerInterface {
		/**
		 * Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
		 * or replying with an error.
		 * 
		 * The returned [`OffersMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
		 * 
		 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
		 */
		Option_OffersMessageZ handle_message(OffersMessage message);
		/**
		 * Releases any [`OffersMessage`]s that need to be sent.
		 * 
		 * Typically, this is used for messages initiating a payment flow rather than in response to
		 * another message. The latter should use the return value of [`Self::handle_message`].
		 */
		ThreeTuple_OffersMessageDestinationBlindedPathZ[] release_pending_messages();
	}
	private static class LDKOffersMessageHandlerHolder { OffersMessageHandler held; }
	public static OffersMessageHandler new_impl(OffersMessageHandlerInterface arg) {
		final LDKOffersMessageHandlerHolder impl_holder = new LDKOffersMessageHandlerHolder();
		impl_holder.held = new OffersMessageHandler(new bindings.LDKOffersMessageHandler() {
			@Override public long handle_message(long message) {
				org.ldk.structs.OffersMessage message_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(message);
				if (message_hu_conv != null) { message_hu_conv.ptrs_to.add(this); };
				Option_OffersMessageZ ret = arg.handle_message(message_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				if (impl_holder.held != null) { impl_holder.held.ptrs_to.add(ret); };
				return result;
			}
			@Override public long[] release_pending_messages() {
				ThreeTuple_OffersMessageDestinationBlindedPathZ[] ret = arg.release_pending_messages();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_49 -> ret_conv_49 == null ? 0 : ret_conv_49.clone_ptr()).toArray() : null;
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
	 * or replying with an error.
	 * 
	 * The returned [`OffersMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 */
	public Option_OffersMessageZ handle_message(org.ldk.structs.OffersMessage message) {
		long ret = bindings.OffersMessageHandler_handle_message(this.ptr, message.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(message); };
		return ret_hu_conv;
	}

	/**
	 * Releases any [`OffersMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a payment flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_message`].
	 */
	public ThreeTuple_OffersMessageDestinationBlindedPathZ[] release_pending_messages() {
		long[] ret = bindings.OffersMessageHandler_release_pending_messages(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_49_len = ret.length;
		ThreeTuple_OffersMessageDestinationBlindedPathZ[] ret_conv_49_arr = new ThreeTuple_OffersMessageDestinationBlindedPathZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = ret[x];
			ThreeTuple_OffersMessageDestinationBlindedPathZ ret_conv_49_hu_conv = new ThreeTuple_OffersMessageDestinationBlindedPathZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.add(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		return ret_conv_49_arr;
	}

}
