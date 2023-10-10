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
public class WriteableEcdsaChannelSigner : CommonBase {
	internal readonly bindings.LDKWriteableEcdsaChannelSigner bindings_instance;
	internal WriteableEcdsaChannelSigner(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private WriteableEcdsaChannelSigner(bindings.LDKWriteableEcdsaChannelSigner arg, bindings.LDKEcdsaChannelSigner EcdsaChannelSigner, bindings.LDKChannelSigner ChannelSigner, ChannelPublicKeys pubkeys) : base(bindings.LDKWriteableEcdsaChannelSigner_new(arg, EcdsaChannelSigner, ChannelSigner, pubkeys == null ? 0 : pubkeys.clone_ptr())) {
		this.ptrs_to.AddLast(arg);
		this.ptrs_to.AddLast(EcdsaChannelSigner);
		this.ptrs_to.AddLast(ChannelSigner);
		this.bindings_instance = arg;
	}
	~WriteableEcdsaChannelSigner() {
		if (ptr != 0) { bindings.WriteableEcdsaChannelSigner_free(ptr); }
	}

	public interface WriteableEcdsaChannelSignerInterface {
		/**
		 * Serialize the object into a byte array
		 */
		byte[] write();
	}
	private class LDKWriteableEcdsaChannelSignerHolder { internal WriteableEcdsaChannelSigner held; }
	private class LDKWriteableEcdsaChannelSignerImpl : bindings.LDKWriteableEcdsaChannelSigner {
		internal LDKWriteableEcdsaChannelSignerImpl(WriteableEcdsaChannelSignerInterface arg, LDKWriteableEcdsaChannelSignerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private WriteableEcdsaChannelSignerInterface arg;
		private LDKWriteableEcdsaChannelSignerHolder impl_holder;
		public byte[] write() {
			byte[] ret = arg.write();
				GC.KeepAlive(arg);
			return ret;
		}
	}
	public static WriteableEcdsaChannelSigner new_impl(WriteableEcdsaChannelSignerInterface arg, EcdsaChannelSigner.EcdsaChannelSignerInterface EcdsaChannelSigner_impl, ChannelSigner.ChannelSignerInterface ChannelSigner_impl, ChannelPublicKeys pubkeys) {
		LDKWriteableEcdsaChannelSignerHolder impl_holder = new LDKWriteableEcdsaChannelSignerHolder();
		impl_holder.held = new WriteableEcdsaChannelSigner(new LDKWriteableEcdsaChannelSignerImpl(arg, impl_holder), EcdsaChannelSigner.new_impl(EcdsaChannelSigner_impl, ChannelSigner_impl, pubkeys).bindings_instance, ChannelSigner.new_impl(ChannelSigner_impl, pubkeys).bindings_instance, pubkeys);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying EcdsaChannelSigner.
	 */
	public EcdsaChannelSigner get_ecdsa_channel_signer() {
		EcdsaChannelSigner res = new EcdsaChannelSigner(null, bindings.LDKWriteableEcdsaChannelSigner_get_EcdsaChannelSigner(this.ptr));
		this.ptrs_to.AddLast(res);
		return res;
	}


	/**
	 * Gets the underlying ChannelSigner.
	 */
	public ChannelSigner get_channel_signer() {
		ChannelSigner res = new ChannelSigner(null, bindings.LDKWriteableEcdsaChannelSigner_get_ChannelSigner(this.ptr));
		this.ptrs_to.AddLast(res);
		return res;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public byte[] write() {
		byte[] ret = bindings.WriteableEcdsaChannelSigner_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.WriteableEcdsaChannelSigner_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of a WriteableEcdsaChannelSigner
	 */
	public WriteableEcdsaChannelSigner clone() {
		long ret = bindings.WriteableEcdsaChannelSigner_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		WriteableEcdsaChannelSigner ret_hu_conv = new WriteableEcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
