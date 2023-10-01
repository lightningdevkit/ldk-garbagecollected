using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait that can return signer instances for individual channels.
 */
public class SignerProvider : CommonBase {
	internal readonly bindings.LDKSignerProvider bindings_instance;
	internal SignerProvider(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private SignerProvider(bindings.LDKSignerProvider arg) : base(bindings.LDKSignerProvider_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~SignerProvider() {
		if (ptr != 0) { bindings.SignerProvider_free(ptr); }
	}

	public interface SignerProviderInterface {
		/**
		 * Generates a unique `channel_keys_id` that can be used to obtain a [`Self::Signer`] through
		 * [`SignerProvider::derive_channel_signer`]. The `user_channel_id` is provided to allow
		 * implementations of [`SignerProvider`] to maintain a mapping between itself and the generated
		 * `channel_keys_id`.
		 * 
		 * This method must return a different value each time it is called.
		 */
		byte[] generate_channel_keys_id(bool _inbound, long _channel_value_satoshis, UInt128 _user_channel_id);
		/**
		 * Derives the private key material backing a `Signer`.
		 * 
		 * To derive a new `Signer`, a fresh `channel_keys_id` should be obtained through
		 * [`SignerProvider::generate_channel_keys_id`]. Otherwise, an existing `Signer` can be
		 * re-derived from its `channel_keys_id`, which can be obtained through its trait method
		 * [`ChannelSigner::channel_keys_id`].
		 */
		WriteableEcdsaChannelSigner derive_channel_signer(long _channel_value_satoshis, byte[] _channel_keys_id);
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
		Result_WriteableEcdsaChannelSignerDecodeErrorZ read_chan_signer(byte[] _reader);
		/**
		 * Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
		 * 
		 * If this function returns an error, this will result in a channel failing to open.
		 * 
		 * This method should return a different value each time it is called, to avoid linking
		 * on-chain funds across channels as controlled to the same user.
		 */
		Result_ScriptNoneZ get_destination_script();
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
	private class LDKSignerProviderHolder { internal SignerProvider held; }
	private class LDKSignerProviderImpl : bindings.LDKSignerProvider {
		internal LDKSignerProviderImpl(SignerProviderInterface arg, LDKSignerProviderHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private SignerProviderInterface arg;
		private LDKSignerProviderHolder impl_holder;
		public byte[] generate_channel_keys_id(bool _inbound, long _channel_value_satoshis, byte[] _user_channel_id) {
			org.ldk.util.UInt128 _user_channel_id_conv = new org.ldk.util.UInt128(_user_channel_id);
			byte[] ret = arg.generate_channel_keys_id(_inbound, _channel_value_satoshis, _user_channel_id_conv);
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
		public long derive_channel_signer(long _channel_value_satoshis, byte[] _channel_keys_id) {
			WriteableEcdsaChannelSigner ret = arg.derive_channel_signer(_channel_value_satoshis, _channel_keys_id);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
		public long read_chan_signer(byte[] _reader) {
			Result_WriteableEcdsaChannelSignerDecodeErrorZ ret = arg.read_chan_signer(_reader);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long get_destination_script() {
			Result_ScriptNoneZ ret = arg.get_destination_script();
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long get_shutdown_scriptpubkey() {
			Result_ShutdownScriptNoneZ ret = arg.get_shutdown_scriptpubkey();
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static SignerProvider new_impl(SignerProviderInterface arg) {
		LDKSignerProviderHolder impl_holder = new LDKSignerProviderHolder();
		impl_holder.held = new SignerProvider(new LDKSignerProviderImpl(arg, impl_holder));
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
	public byte[] generate_channel_keys_id(bool inbound, long channel_value_satoshis, org.ldk.util.UInt128 user_channel_id) {
		byte[] ret = bindings.SignerProvider_generate_channel_keys_id(this.ptr, inbound, channel_value_satoshis, user_channel_id.getLEBytes());
		GC.KeepAlive(this);
		GC.KeepAlive(inbound);
		GC.KeepAlive(channel_value_satoshis);
		GC.KeepAlive(user_channel_id);
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
		GC.KeepAlive(this);
		GC.KeepAlive(channel_value_satoshis);
		GC.KeepAlive(channel_keys_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		WriteableEcdsaChannelSigner ret_hu_conv = new WriteableEcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
		GC.KeepAlive(this);
		GC.KeepAlive(reader);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WriteableEcdsaChannelSignerDecodeErrorZ ret_hu_conv = Result_WriteableEcdsaChannelSignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
	 * 
	 * If this function returns an error, this will result in a channel failing to open.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user.
	 */
	public Result_ScriptNoneZ get_destination_script() {
		long ret = bindings.SignerProvider_get_destination_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScriptNoneZ ret_hu_conv = Result_ScriptNoneZ.constr_from_ptr(ret);
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
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptNoneZ ret_hu_conv = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }