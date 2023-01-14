using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A writeable signer.
 * 
 * There will always be two instances of a signer per channel, one occupied by the
 * [`ChannelManager`] and another by the channel's [`ChannelMonitor`].
 * 
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
 */
public class Sign : CommonBase {
	internal readonly bindings.LDKSign bindings_instance;
	internal Sign(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Sign(bindings.LDKSign arg, bindings.LDKBaseSign BaseSign, ChannelPublicKeys pubkeys) : base(bindings.LDKSign_new(arg, BaseSign, pubkeys == null ? 0 : pubkeys.clone_ptr())) {
		this.ptrs_to.AddLast(arg);
		this.ptrs_to.AddLast(BaseSign);
		this.bindings_instance = arg;
	}
	~Sign() {
		if (ptr != 0) { bindings.Sign_free(ptr); }
	}

	public interface SignInterface {
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private class LDKSignHolder { internal Sign held; }
	private class LDKSignImpl : bindings.LDKSign {
		internal LDKSignImpl(SignInterface arg, LDKSignHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private SignInterface arg;
		private LDKSignHolder impl_holder;
		public byte[] write() {
			byte[] ret = arg.write();
				GC.KeepAlive(arg);
			return ret;
		}
	}
	public static Sign new_impl(SignInterface arg, BaseSign.BaseSignInterface BaseSign_impl, ChannelPublicKeys pubkeys) {
		LDKSignHolder impl_holder = new LDKSignHolder();
		impl_holder.held = new Sign(new LDKSignImpl(arg, impl_holder), BaseSign.new_impl(BaseSign_impl, pubkeys).bindings_instance, pubkeys);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying BaseSign.
	 */
	public BaseSign get_base_sign() {
		BaseSign res = new BaseSign(null, bindings.LDKSign_get_BaseSign(this.ptr));
		this.ptrs_to.AddLast(res);
		return res;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.Sign_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.Sign_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of a Sign
	 */
	public Sign clone() {
		long ret = bindings.Sign_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Sign ret_hu_conv = new Sign(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
