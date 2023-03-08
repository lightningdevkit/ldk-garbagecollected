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
		 * Generates a unique `channel_keys_id` that can be used to obtain a [`Self::Signer`] through
		 * [`SignerProvider::derive_channel_signer`]. The `user_channel_id` is provided to allow
		 * implementations of [`SignerProvider`] to maintain a mapping between itself and the generated
		 * `channel_keys_id`.
		 * 
		 * This method must return a different value each time it is called.
		 */
		byte[] generate_channel_keys_id(boolean inbound, long channel_value_satoshis, UInt128 user_channel_id);
		/**
		 * Derives the private key material backing a `Signer`.
		 * 
		 * To derive a new `Signer`, a fresh `channel_keys_id` should be obtained through
		 * [`SignerProvider::generate_channel_keys_id`]. Otherwise, an existing `Signer` can be
		 * re-derived from its `channel_keys_id`, which can be obtained through its trait method
		 * [`ChannelSigner::channel_keys_id`].
		 */
		WriteableEcdsaChannelSigner derive_channel_signer(long channel_value_satoshis, byte[] channel_keys_id);
		/**
		 * Reads a [`Signer`] for this [`SignerProvider`] from the given input stream.
		 * This is only called during deserialization of other objects which contain
		 * [`WriteableEcdsaChannelSigner`]-implementing objects (i.e., [`ChannelMonitor`]s and [`ChannelManager`]s).
		 * The bytes are exactly those which `<Self::Signer as Writeable>::write()` writes, and
		 * contain no versioning scheme. You may wish to include your own version prefix and ensure
		 * you've read all of the provided bytes to ensure no corruption occurred.
		 * 
		 * This method is slowly being phased out -- it will only be called when reading objects
		 * written by LDK versions prior to 0.0.113.
		 * 
		 * [`Signer`]: Self::Signer
		 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
		 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
		 */
		Result_WriteableEcdsaChannelSignerDecodeErrorZ read_chan_signer(byte[] reader);
		/**
		 * Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
		 * 
		 * This method should return a different value each time it is called, to avoid linking
		 * on-chain funds across channels as controlled to the same user.
		 */
		byte[] get_destination_script();
		/**
		 * Get a script pubkey which we will send funds to when closing a channel.
		 * 
		 * This method should return a different value each time it is called, to avoid linking
		 * on-chain funds across channels as controlled to the same user.
		 */
		ShutdownScript get_shutdown_scriptpubkey();
	}
	private static class LDKSignerProviderHolder { SignerProvider held; }
	public static SignerProvider new_impl(SignerProviderInterface arg) {
		final LDKSignerProviderHolder impl_holder = new LDKSignerProviderHolder();
		impl_holder.held = new SignerProvider(new bindings.LDKSignerProvider() {
			@Override public byte[] generate_channel_keys_id(boolean inbound, long channel_value_satoshis, byte[] user_channel_id) {
				org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
				byte[] ret = arg.generate_channel_keys_id(inbound, channel_value_satoshis, user_channel_id_conv);
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public long derive_channel_signer(long channel_value_satoshis, byte[] channel_keys_id) {
				WriteableEcdsaChannelSigner ret = arg.derive_channel_signer(channel_value_satoshis, channel_keys_id);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				if (impl_holder.held != null) { impl_holder.held.ptrs_to.add(ret); };
				return result;
			}
			@Override public long read_chan_signer(byte[] reader) {
				Result_WriteableEcdsaChannelSignerDecodeErrorZ ret = arg.read_chan_signer(reader);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public byte[] get_destination_script() {
				byte[] ret = arg.get_destination_script();
				Reference.reachabilityFence(arg);
				return ret;
			}
			@Override public long get_shutdown_scriptpubkey() {
				ShutdownScript ret = arg.get_shutdown_scriptpubkey();
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Generates a unique `channel_keys_id` that can be used to obtain a [`Self::Signer`] through
	 * [`SignerProvider::derive_channel_signer`]. The `user_channel_id` is provided to allow
	 * implementations of [`SignerProvider`] to maintain a mapping between itself and the generated
	 * `channel_keys_id`.
	 * 
	 * This method must return a different value each time it is called.
	 */
	public byte[] generate_channel_keys_id(boolean inbound, long channel_value_satoshis, org.ldk.util.UInt128 user_channel_id) {
		byte[] ret = bindings.SignerProvider_generate_channel_keys_id(this.ptr, inbound, channel_value_satoshis, user_channel_id.getLEBytes());
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(inbound);
		Reference.reachabilityFence(channel_value_satoshis);
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
	public WriteableEcdsaChannelSigner derive_channel_signer(long channel_value_satoshis, byte[] channel_keys_id) {
		long ret = bindings.SignerProvider_derive_channel_signer(this.ptr, channel_value_satoshis, InternalUtils.check_arr_len(channel_keys_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_value_satoshis);
		Reference.reachabilityFence(channel_keys_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		WriteableEcdsaChannelSigner ret_hu_conv = new WriteableEcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Reads a [`Signer`] for this [`SignerProvider`] from the given input stream.
	 * This is only called during deserialization of other objects which contain
	 * [`WriteableEcdsaChannelSigner`]-implementing objects (i.e., [`ChannelMonitor`]s and [`ChannelManager`]s).
	 * The bytes are exactly those which `<Self::Signer as Writeable>::write()` writes, and
	 * contain no versioning scheme. You may wish to include your own version prefix and ensure
	 * you've read all of the provided bytes to ensure no corruption occurred.
	 * 
	 * This method is slowly being phased out -- it will only be called when reading objects
	 * written by LDK versions prior to 0.0.113.
	 * 
	 * [`Signer`]: Self::Signer
	 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public Result_WriteableEcdsaChannelSignerDecodeErrorZ read_chan_signer(byte[] reader) {
		long ret = bindings.SignerProvider_read_chan_signer(this.ptr, reader);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(reader);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WriteableEcdsaChannelSignerDecodeErrorZ ret_hu_conv = Result_WriteableEcdsaChannelSignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user.
	 */
	public byte[] get_destination_script() {
		byte[] ret = bindings.SignerProvider_get_destination_script(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Get a script pubkey which we will send funds to when closing a channel.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user.
	 */
	public ShutdownScript get_shutdown_scriptpubkey() {
		long ret = bindings.SignerProvider_get_shutdown_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ShutdownScript ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ShutdownScript(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
