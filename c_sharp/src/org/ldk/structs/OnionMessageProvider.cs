using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait indicating an object may generate onion messages to send
 */
public class OnionMessageProvider : CommonBase {
	internal readonly bindings.LDKOnionMessageProvider bindings_instance;
	internal OnionMessageProvider(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private OnionMessageProvider(bindings.LDKOnionMessageProvider arg) : base(bindings.LDKOnionMessageProvider_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~OnionMessageProvider() {
		if (ptr != 0) { bindings.OnionMessageProvider_free(ptr); }
	}

	public interface OnionMessageProviderInterface {
		/**
		 * Gets the next pending onion message for the peer with the given node id.
		 * 
		 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		OnionMessage next_onion_message_for_peer(byte[] _peer_node_id);
	}
	private class LDKOnionMessageProviderHolder { internal OnionMessageProvider held; }
	private class LDKOnionMessageProviderImpl : bindings.LDKOnionMessageProvider {
		internal LDKOnionMessageProviderImpl(OnionMessageProviderInterface arg, LDKOnionMessageProviderHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private OnionMessageProviderInterface arg;
		private LDKOnionMessageProviderHolder impl_holder;
		public long next_onion_message_for_peer(byte[] _peer_node_id) {
			OnionMessage ret = arg.next_onion_message_for_peer(_peer_node_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static OnionMessageProvider new_impl(OnionMessageProviderInterface arg) {
		LDKOnionMessageProviderHolder impl_holder = new LDKOnionMessageProviderHolder();
		impl_holder.held = new OnionMessageProvider(new LDKOnionMessageProviderImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Gets the next pending onion message for the peer with the given node id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public OnionMessage next_onion_message_for_peer(byte[] peer_node_id) {
		long ret = bindings.OnionMessageProvider_next_onion_message_for_peer(this.ptr, InternalUtils.check_arr_len(peer_node_id, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(peer_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
