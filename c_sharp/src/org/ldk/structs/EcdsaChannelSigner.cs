
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of EcdsaChannelSigner */
public interface EcdsaChannelSignerInterface {
}

/**
 * A trait to sign Lightning channel transactions as described in
 * [BOLT 3](https://github.com/lightning/bolts/blob/master/03-transactions.md).
 * 
 * Signing services could be implemented on a hardware wallet and should implement signing
 * policies in order to be secure. Please refer to the [VLS Policy
 * Controls](https://gitlab.com/lightning-signer/validating-lightning-signer/-/blob/main/docs/policy-controls.md)
 * for an example of such policies.
 * 
 * Like [`ChannelSigner`], many of the methods allow errors to be returned to support async
 * signing. In such cases, the signing operation can be replayed by calling
 * [`ChannelManager::signer_unblocked`] or [`ChainMonitor::signer_unblocked`] (see individual
 * method documentation for which method should be called) once the result is ready, at which
 * point the channel operation will resume.
 * 
 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
 */
public class EcdsaChannelSigner : CommonBase {
	internal bindings.LDKEcdsaChannelSigner bindings_instance;
	internal long instance_idx;

	internal EcdsaChannelSigner(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~EcdsaChannelSigner() {
		if (ptr != 0) { bindings.EcdsaChannelSigner_free(ptr); }
	}

	private class LDKEcdsaChannelSignerHolder { internal EcdsaChannelSigner held; }
	private class LDKEcdsaChannelSignerImpl : bindings.LDKEcdsaChannelSigner {
		internal LDKEcdsaChannelSignerImpl(EcdsaChannelSignerInterface arg, LDKEcdsaChannelSignerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private EcdsaChannelSignerInterface arg;
		private LDKEcdsaChannelSignerHolder impl_holder;
	}

	/** Creates a new instance of EcdsaChannelSigner from a given implementation */
	public static EcdsaChannelSigner new_impl(EcdsaChannelSignerInterface arg, BaseEcdsaChannelSignerInterface baseEcdsaChannelSigner_impl, ChannelSignerInterface channelSigner_impl) {
		LDKEcdsaChannelSignerHolder impl_holder = new LDKEcdsaChannelSignerHolder();
		LDKEcdsaChannelSignerImpl impl = new LDKEcdsaChannelSignerImpl(arg, impl_holder);
		BaseEcdsaChannelSigner baseEcdsaChannelSigner = BaseEcdsaChannelSigner.new_impl(baseEcdsaChannelSigner_impl, channelSigner_impl);
		ChannelSigner channelSigner = ChannelSigner.new_impl(channelSigner_impl);
		long[] ptr_idx = bindings.LDKEcdsaChannelSigner_new(impl, baseEcdsaChannelSigner.instance_idx, channelSigner.instance_idx);

		impl_holder.held = new EcdsaChannelSigner(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		impl_holder.held.ptrs_to.AddLast(baseEcdsaChannelSigner);
		impl_holder.held.ptrs_to.AddLast(channelSigner);
		return impl_holder.held;
	}

	internal long clone_ptr() {
		long ret = bindings.EcdsaChannelSigner_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of a EcdsaChannelSigner
	 */
	public org.ldk.structs.EcdsaChannelSigner clone() {
		long ret = bindings.EcdsaChannelSigner_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EcdsaChannelSigner ret_hu_conv = new EcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
