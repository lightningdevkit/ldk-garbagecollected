using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait defining behavior for routing an [`OnionMessage`].
 * 
 * [`OnionMessage`]: msgs::OnionMessage
 */
public class MessageRouter : CommonBase {
	internal readonly bindings.LDKMessageRouter bindings_instance;
	internal MessageRouter(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private MessageRouter(bindings.LDKMessageRouter arg) : base(bindings.LDKMessageRouter_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~MessageRouter() {
		if (ptr != 0) { bindings.MessageRouter_free(ptr); }
	}

	public interface MessageRouterInterface {
		/**
		 * Returns a route for sending an [`OnionMessage`] to the given [`Destination`].
		 * 
		 * [`OnionMessage`]: msgs::OnionMessage
		 */
		Result_OnionMessagePathNoneZ find_path(byte[] _sender, byte[][] _peers, Destination _destination);
	}
	private class LDKMessageRouterHolder { internal MessageRouter held; }
	private class LDKMessageRouterImpl : bindings.LDKMessageRouter {
		internal LDKMessageRouterImpl(MessageRouterInterface arg, LDKMessageRouterHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private MessageRouterInterface arg;
		private LDKMessageRouterHolder impl_holder;
		public long find_path(byte[] _sender, byte[][] _peers, long _destination) {
			org.ldk.structs.Destination _destination_hu_conv = org.ldk.structs.Destination.constr_from_ptr(_destination);
			if (_destination_hu_conv != null) { _destination_hu_conv.ptrs_to.AddLast(this); };
			Result_OnionMessagePathNoneZ ret = arg.find_path(_sender, _peers, _destination_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static MessageRouter new_impl(MessageRouterInterface arg) {
		LDKMessageRouterHolder impl_holder = new LDKMessageRouterHolder();
		impl_holder.held = new MessageRouter(new LDKMessageRouterImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Returns a route for sending an [`OnionMessage`] to the given [`Destination`].
	 * 
	 * [`OnionMessage`]: msgs::OnionMessage
	 */
	public Result_OnionMessagePathNoneZ find_path(byte[] sender, byte[][] peers, org.ldk.structs.Destination destination) {
		long ret = bindings.MessageRouter_find_path(this.ptr, InternalUtils.check_arr_len(sender, 33), peers != null ? InternalUtils.mapArray(peers, peers_conv_8 => InternalUtils.check_arr_len(peers_conv_8, 33)) : null, destination.ptr);
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
