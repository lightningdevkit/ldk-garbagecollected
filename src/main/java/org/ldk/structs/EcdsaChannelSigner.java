package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class EcdsaChannelSigner extends CommonBase {
	final bindings.LDKEcdsaChannelSigner bindings_instance;
	EcdsaChannelSigner(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private EcdsaChannelSigner(bindings.LDKEcdsaChannelSigner arg, bindings.LDKBaseEcdsaChannelSigner BaseEcdsaChannelSigner, bindings.LDKChannelSigner ChannelSigner) {
		super(bindings.LDKEcdsaChannelSigner_new(arg, BaseEcdsaChannelSigner, ChannelSigner));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(BaseEcdsaChannelSigner);
		this.ptrs_to.add(ChannelSigner);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.EcdsaChannelSigner_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.EcdsaChannelSigner_free(ptr); }
		ptr = 0;
	}
	public static interface EcdsaChannelSignerInterface {
	}
	private static class LDKEcdsaChannelSignerHolder { EcdsaChannelSigner held; }
	public static EcdsaChannelSigner new_impl(EcdsaChannelSignerInterface arg, BaseEcdsaChannelSigner.BaseEcdsaChannelSignerInterface BaseEcdsaChannelSigner_impl, ChannelSigner.ChannelSignerInterface ChannelSigner_impl) {
		final LDKEcdsaChannelSignerHolder impl_holder = new LDKEcdsaChannelSignerHolder();
		impl_holder.held = new EcdsaChannelSigner(new bindings.LDKEcdsaChannelSigner() {
		}, BaseEcdsaChannelSigner.new_impl(BaseEcdsaChannelSigner_impl, ChannelSigner_impl).bindings_instance, ChannelSigner.new_impl(ChannelSigner_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying BaseEcdsaChannelSigner.
	 */
	public BaseEcdsaChannelSigner get_base_ecdsa_channel_signer() {
		BaseEcdsaChannelSigner res = new BaseEcdsaChannelSigner(null, bindings.LDKEcdsaChannelSigner_get_BaseEcdsaChannelSigner(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}


	/**
	 * Gets the underlying ChannelSigner.
	 */
	public ChannelSigner get_channel_signer() {
		ChannelSigner res = new ChannelSigner(null, bindings.LDKEcdsaChannelSigner_get_ChannelSigner(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}

	long clone_ptr() {
		long ret = bindings.EcdsaChannelSigner_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of a EcdsaChannelSigner
	 */
	public EcdsaChannelSigner clone() {
		long ret = bindings.EcdsaChannelSigner_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EcdsaChannelSigner ret_hu_conv = new EcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
