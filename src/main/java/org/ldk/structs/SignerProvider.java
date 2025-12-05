package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait that can return signer instances for individual channels.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SignerProvider extends CommonBase {
	final bindings.LDKSignerProvider bindings_instance;
	SignerProvider(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private SignerProvider(bindings.LDKSignerProvider arg) {
		super(bindings.LDKSignerProvider_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.SignerProvider_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.SignerProvider_free(ptr); }
		ptr = 0;
	}
	public static interface SignerProviderInterface {
		/**
		 * Generates a unique `channel_keys_id` that can be used to obtain a [`Self::EcdsaSigner`] through
		 * [`SignerProvider::derive_channel_signer`]. The `user_channel_id` is provided to allow
		 * implementations of [`SignerProvider`] to maintain a mapping between itself and the generated
		 * `channel_keys_id`.
		 * 
		 * This method must return a different value each time it is called.
		 */
		byte[] generate_channel_keys_id(boolean inbound, UInt128 user_channel_id);
		/**
		 * Derives the private key material backing a `Signer`.
		 * 
		 * To derive a new `Signer`, a fresh `channel_keys_id` should be obtained through
		 * [`SignerProvider::generate_channel_keys_id`]. Otherwise, an existing `Signer` can be
		 * re-derived from its `channel_keys_id`, which can be obtained through its trait method
		 * [`ChannelSigner::channel_keys_id`].
		 */
		EcdsaChannelSigner derive_channel_signer(byte[] channel_keys_id);
		/**
		 * Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
		 * 
		 * If this function returns an error, this will result in a channel failing to open.
		 * 
		 * This method should return a different value each time it is called, to avoid linking
		 * on-chain funds across channels as controlled to the same user. `channel_keys_id` may be
		 * used to derive a unique value for each channel.
		 */
		Result_CVec_u8ZNoneZ get_destination_script(byte[] channel_keys_id);
		/**
		 * Get a script pubkey which we will send funds to when closing a channel.
		 * 
		 * If this function returns an error, this will result in a channel failing to open or close.
		 * In the event of a failure when the counterparty is initiating a close, this can result in a
		 * channel force close.
		 * 
		 * This method should return a different value each time it is called, to avoid linking
		 * on-chain funds across channels as controlled to the same user.
		 */
		Result_ShutdownScriptNoneZ get_shutdown_scriptpubkey();
	}
	private static class LDKSignerProviderHolder { SignerProvider held; }
	public static SignerProvider new_impl(SignerProviderInterface arg) {
		final LDKSignerProviderHolder impl_holder = new LDKSignerProviderHolder();
		impl_holder.held = new SignerProvider(new bindings.LDKSignerProvider() {
			@Override public byte[] generate_channel_keys_id(boolean inbound, byte[] user_channel_id) {
				org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
				byte[] ret = arg.generate_channel_keys_id(inbound, user_channel_id_conv);
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public long derive_channel_signer(byte[] channel_keys_id) {
				EcdsaChannelSigner ret = arg.derive_channel_signer(channel_keys_id);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				if (impl_holder.held != null) { impl_holder.held.ptrs_to.add(ret); };
				return result;
			}
			@Override public long get_destination_script(byte[] channel_keys_id) {
				Result_CVec_u8ZNoneZ ret = arg.get_destination_script(channel_keys_id);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long get_shutdown_scriptpubkey() {
				Result_ShutdownScriptNoneZ ret = arg.get_shutdown_scriptpubkey();
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Generates a unique `channel_keys_id` that can be used to obtain a [`Self::EcdsaSigner`] through
	 * [`SignerProvider::derive_channel_signer`]. The `user_channel_id` is provided to allow
	 * implementations of [`SignerProvider`] to maintain a mapping between itself and the generated
	 * `channel_keys_id`.
	 * 
	 * This method must return a different value each time it is called.
	 */
	public byte[] generate_channel_keys_id(boolean inbound, org.ldk.util.UInt128 user_channel_id) {
		byte[] ret = bindings.SignerProvider_generate_channel_keys_id(this.ptr, inbound, user_channel_id.getLEBytes());
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(inbound);
		Reference.reachabilityFence(user_channel_id);
		return ret;
	}

	/**
	 * Derives the private key material backing a `Signer`.
	 * 
	 * To derive a new `Signer`, a fresh `channel_keys_id` should be obtained through
	 * [`SignerProvider::generate_channel_keys_id`]. Otherwise, an existing `Signer` can be
	 * re-derived from its `channel_keys_id`, which can be obtained through its trait method
	 * [`ChannelSigner::channel_keys_id`].
	 */
	public EcdsaChannelSigner derive_channel_signer(byte[] channel_keys_id) {
		long ret = bindings.SignerProvider_derive_channel_signer(this.ptr, InternalUtils.check_arr_len(channel_keys_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_keys_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		EcdsaChannelSigner ret_hu_conv = new EcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
	 * 
	 * If this function returns an error, this will result in a channel failing to open.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user. `channel_keys_id` may be
	 * used to derive a unique value for each channel.
	 */
	public Result_CVec_u8ZNoneZ get_destination_script(byte[] channel_keys_id) {
		long ret = bindings.SignerProvider_get_destination_script(this.ptr, InternalUtils.check_arr_len(channel_keys_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_keys_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get a script pubkey which we will send funds to when closing a channel.
	 * 
	 * If this function returns an error, this will result in a channel failing to open or close.
	 * In the event of a failure when the counterparty is initiating a close, this can result in a
	 * channel force close.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user.
	 */
	public Result_ShutdownScriptNoneZ get_shutdown_scriptpubkey() {
		long ret = bindings.SignerProvider_get_shutdown_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptNoneZ ret_hu_conv = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
