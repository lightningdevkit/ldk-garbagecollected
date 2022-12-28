package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A writeable signer.
 * 
 * There will always be two instances of a signer per channel, one occupied by the
 * [`ChannelManager`] and another by the channel's [`ChannelMonitor`].
 * 
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Sign extends CommonBase {
	final bindings.LDKSign bindings_instance;
	Sign(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Sign(bindings.LDKSign arg, bindings.LDKBaseSign BaseSign, ChannelPublicKeys pubkeys) {
		super(bindings.LDKSign_new(arg, BaseSign, pubkeys == null ? 0 : pubkeys.clone_ptr()));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(BaseSign);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Sign_free(ptr); } super.finalize();
	}

	public static interface SignInterface {
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private static class LDKSignHolder { Sign held; }
	public static Sign new_impl(SignInterface arg, BaseSign.BaseSignInterface BaseSign_impl, ChannelPublicKeys pubkeys) {
		final LDKSignHolder impl_holder = new LDKSignHolder();
		impl_holder.held = new Sign(new bindings.LDKSign() {
			@Override public byte[] write() {
				byte[] ret = arg.write();
				Reference.reachabilityFence(arg);
				return ret;
			}
		}, BaseSign.new_impl(BaseSign_impl, pubkeys).bindings_instance, pubkeys);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying BaseSign.
	 */
	public BaseSign get_base_sign() {
		BaseSign res = new BaseSign(null, bindings.LDKSign_get_BaseSign(this.ptr));
		this.ptrs_to.add(res);
		return res;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.Sign_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.Sign_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of a Sign
	 */
	public Sign clone() {
		long ret = bindings.Sign_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Sign ret_hu_conv = new Sign(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
