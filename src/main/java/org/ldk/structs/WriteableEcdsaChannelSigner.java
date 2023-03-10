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
public class WriteableEcdsaChannelSigner extends CommonBase {
	final bindings.LDKWriteableEcdsaChannelSigner bindings_instance;
	WriteableEcdsaChannelSigner(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private WriteableEcdsaChannelSigner(bindings.LDKWriteableEcdsaChannelSigner arg, bindings.LDKEcdsaChannelSigner EcdsaChannelSigner, bindings.LDKChannelSigner ChannelSigner, ChannelPublicKeys pubkeys) {
		super(bindings.LDKWriteableEcdsaChannelSigner_new(arg, EcdsaChannelSigner, ChannelSigner, pubkeys == null ? 0 : pubkeys.clone_ptr()));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(EcdsaChannelSigner);
		this.ptrs_to.add(ChannelSigner);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.WriteableEcdsaChannelSigner_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.WriteableEcdsaChannelSigner_free(ptr); }
		ptr = 0;
	}
	public static interface WriteableEcdsaChannelSignerInterface {
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private static class LDKWriteableEcdsaChannelSignerHolder { WriteableEcdsaChannelSigner held; }
	public static WriteableEcdsaChannelSigner new_impl(WriteableEcdsaChannelSignerInterface arg, EcdsaChannelSigner.EcdsaChannelSignerInterface EcdsaChannelSigner_impl, ChannelSigner.ChannelSignerInterface ChannelSigner_impl, ChannelPublicKeys pubkeys) {
		final LDKWriteableEcdsaChannelSignerHolder impl_holder = new LDKWriteableEcdsaChannelSignerHolder();
		impl_holder.held = new WriteableEcdsaChannelSigner(new bindings.LDKWriteableEcdsaChannelSigner() {
			@Override public byte[] write() {
				byte[] ret = arg.write();
				Reference.reachabilityFence(arg);
				return ret;
			}
		}, EcdsaChannelSigner.new_impl(EcdsaChannelSigner_impl, ChannelSigner_impl, pubkeys).bindings_instance, ChannelSigner.new_impl(ChannelSigner_impl, pubkeys).bindings_instance, pubkeys);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying EcdsaChannelSigner.
	 */
	public EcdsaChannelSigner get_ecdsa_channel_signer() {
		EcdsaChannelSigner res = new EcdsaChannelSigner(null, bindings.LDKWriteableEcdsaChannelSigner_get_EcdsaChannelSigner(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}


	/**
	 * Gets the underlying ChannelSigner.
	 */
	public ChannelSigner get_channel_signer() {
		ChannelSigner res = new ChannelSigner(null, bindings.LDKWriteableEcdsaChannelSigner_get_ChannelSigner(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.WriteableEcdsaChannelSigner_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.WriteableEcdsaChannelSigner_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of a WriteableEcdsaChannelSigner
	 */
	public WriteableEcdsaChannelSigner clone() {
		long ret = bindings.WriteableEcdsaChannelSigner_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		WriteableEcdsaChannelSigner ret_hu_conv = new WriteableEcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
