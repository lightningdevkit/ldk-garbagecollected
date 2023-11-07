
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of MessageRouter */
public interface MessageRouterInterface {
	/**Returns a route for sending an [`OnionMessage`] to the given [`Destination`].
	 */
	Result_OnionMessagePathNoneZ find_path(byte[] sender, byte[][] peers, Destination destination);
}

/**
 * A trait defining behavior for routing an [`OnionMessage`].
 */
public class MessageRouter : CommonBase {
	internal bindings.LDKMessageRouter bindings_instance;
	internal long instance_idx;

	internal MessageRouter(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~MessageRouter() {
		if (ptr != 0) { bindings.MessageRouter_free(ptr); }
	}

	private class LDKMessageRouterHolder { internal MessageRouter held; }
	private class LDKMessageRouterImpl : bindings.LDKMessageRouter {
		internal LDKMessageRouterImpl(MessageRouterInterface arg, LDKMessageRouterHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private MessageRouterInterface arg;
		private LDKMessageRouterHolder impl_holder;
		public long find_path(long _sender, long _peers, long _destination) {
			byte[] _sender_conv = InternalUtils.decodeUint8Array(_sender);
			int _peers_conv_8_len = InternalUtils.getArrayLength(_peers);
			byte[][] _peers_conv_8_arr = new byte[_peers_conv_8_len][];
			for (int i = 0; i < _peers_conv_8_len; i++) {
				long _peers_conv_8 = InternalUtils.getU64ArrayElem(_peers, i);
				byte[] _peers_conv_8_conv = InternalUtils.decodeUint8Array(_peers_conv_8);
				_peers_conv_8_arr[i] = _peers_conv_8_conv;
			}
			bindings.free_buffer(_peers);
			org.ldk.structs.Destination _destination_hu_conv = org.ldk.structs.Destination.constr_from_ptr(_destination);
			if (_destination_hu_conv != null) { _destination_hu_conv.ptrs_to.AddLast(this); };
			Result_OnionMessagePathNoneZ ret = arg.find_path(_sender_conv, _peers_conv_8_arr, _destination_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of MessageRouter from a given implementation */
	public static MessageRouter new_impl(MessageRouterInterface arg) {
		LDKMessageRouterHolder impl_holder = new LDKMessageRouterHolder();
		LDKMessageRouterImpl impl = new LDKMessageRouterImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKMessageRouter_new(impl);

		impl_holder.held = new MessageRouter(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Returns a route for sending an [`OnionMessage`] to the given [`Destination`].
	 */
	public Result_OnionMessagePathNoneZ find_path(byte[] sender, byte[][] peers, org.ldk.structs.Destination destination) {
		long ret = bindings.MessageRouter_find_path(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(sender, 33)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(peers, peers_conv_8 => InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(peers_conv_8, 33)))), destination.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(sender);
		GC.KeepAlive(peers);
		GC.KeepAlive(destination);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessagePathNoneZ ret_hu_conv = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(destination); };
		return ret_hu_conv;
	}

}
} } }
