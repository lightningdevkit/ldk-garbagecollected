package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait indicating an object may generate onion messages to send
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OnionMessageProvider extends CommonBase {
	final bindings.LDKOnionMessageProvider bindings_instance;
	OnionMessageProvider(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private OnionMessageProvider(bindings.LDKOnionMessageProvider arg) {
		super(bindings.LDKOnionMessageProvider_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.OnionMessageProvider_free(ptr); } super.finalize();
	}

	public static interface OnionMessageProviderInterface {
		/**
		 * Gets the next pending onion message for the peer with the given node id.
		 * 
		 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		OnionMessage next_onion_message_for_peer(byte[] peer_node_id);
	}
	private static class LDKOnionMessageProviderHolder { OnionMessageProvider held; }
	public static OnionMessageProvider new_impl(OnionMessageProviderInterface arg) {
		final LDKOnionMessageProviderHolder impl_holder = new LDKOnionMessageProviderHolder();
		impl_holder.held = new OnionMessageProvider(new bindings.LDKOnionMessageProvider() {
			@Override public long next_onion_message_for_peer(byte[] peer_node_id) {
				OnionMessage ret = arg.next_onion_message_for_peer(peer_node_id);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Gets the next pending onion message for the peer with the given node id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public OnionMessage next_onion_message_for_peer(byte[] peer_node_id) {
		long ret = bindings.OnionMessageProvider_next_onion_message_for_peer(this.ptr, InternalUtils.check_arr_len(peer_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(peer_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
