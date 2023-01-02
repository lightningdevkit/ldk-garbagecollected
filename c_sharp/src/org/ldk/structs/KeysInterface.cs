using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait to describe an object which can get user secrets and key material.
 */
public class KeysInterface : CommonBase {
	internal readonly bindings.LDKKeysInterface bindings_instance;
	internal KeysInterface(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private KeysInterface(bindings.LDKKeysInterface arg) : base(bindings.LDKKeysInterface_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~KeysInterface() {
		if (ptr != 0) { bindings.KeysInterface_free(ptr); }
	}

	public interface KeysInterfaceInterface {
		/**
		 * Get node secret key based on the provided [`Recipient`].
		 * 
		 * The `node_id`/`network_key` is the public key that corresponds to this secret key.
		 * 
		 * This method must return the same value each time it is called with a given [`Recipient`]
		 * parameter.
		 * 
		 * Errors if the [`Recipient`] variant is not supported by the implementation.
		 */
		Result_SecretKeyNoneZ get_node_secret(Recipient _recipient);
		/**
		 * Get node id based on the provided [`Recipient`]. This public key corresponds to the secret in
		 * [`get_node_secret`].
		 * 
		 * This method must return the same value each time it is called with a given [`Recipient`]
		 * parameter.
		 * 
		 * Errors if the [`Recipient`] variant is not supported by the implementation.
		 * 
		 * [`get_node_secret`]: Self::get_node_secret
		 */
		Result_PublicKeyNoneZ get_node_id(Recipient _recipient);
		/**
		 * Gets the ECDH shared secret of our [`node secret`] and `other_key`, multiplying by `tweak` if
		 * one is provided. Note that this tweak can be applied to `other_key` instead of our node
		 * secret, though this is less efficient.
		 * 
		 * Errors if the [`Recipient`] variant is not supported by the implementation.
		 * 
		 * [`node secret`]: Self::get_node_secret
		 */
		Result_SharedSecretNoneZ ecdh(Recipient _recipient, byte[] _other_key, Option_ScalarZ _tweak);
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
		/**
		 * Get a new set of [`Sign`] for per-channel secrets. These MUST be unique even if you
		 * restarted with some stale data!
		 * 
		 * This method must return a different value each time it is called.
		 */
		byte[] generate_channel_keys_id(bool _inbound, long _channel_value_satoshis, UInt128 _user_channel_id);
		/**
		 * Derives the private key material backing a `Signer`.
		 * 
		 * To derive a new `Signer`, a fresh `channel_keys_id` should be obtained through
		 * [`KeysInterface::generate_channel_keys_id`]. Otherwise, an existing `Signer` can be
		 * re-derived from its `channel_keys_id`, which can be obtained through its trait method
		 * [`BaseSign::channel_keys_id`].
		 */
		Sign derive_channel_signer(long _channel_value_satoshis, byte[] _channel_keys_id);
		/**
		 * Gets a unique, cryptographically-secure, random 32 byte value. This is used for encrypting
		 * onion packets and for temporary channel IDs. There is no requirement that these be
		 * persisted anywhere, though they must be unique across restarts.
		 * 
		 * This method must return a different value each time it is called.
		 */
		byte[] get_secure_random_bytes();
		/**
		 * Reads a [`Signer`] for this [`KeysInterface`] from the given input stream.
		 * This is only called during deserialization of other objects which contain
		 * [`Sign`]-implementing objects (i.e., [`ChannelMonitor`]s and [`ChannelManager`]s).
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
		Result_SignDecodeErrorZ read_chan_signer(byte[] _reader);
		/**
		 * Sign an invoice.
		 * By parameterizing by the raw invoice bytes instead of the hash, we allow implementors of
		 * this trait to parse the invoice and make sure they're signing what they expect, rather than
		 * blindly signing the hash.
		 * The `hrp` is ASCII bytes, while the invoice data is base32-encoded.
		 * 
		 * The secret key used to sign the invoice is dependent on the [`Recipient`].
		 * 
		 * Errors if the [`Recipient`] variant is not supported by the implementation.
		 */
		Result_RecoverableSignatureNoneZ sign_invoice(byte[] _hrp_bytes, UInt5[] _invoice_data, Recipient _receipient);
		/**
		 * Get secret key material as bytes for use in encrypting and decrypting inbound payment data.
		 * 
		 * If the implementor of this trait supports [phantom node payments], then every node that is
		 * intended to be included in the phantom invoice route hints must return the same value from
		 * this method.
		 * 
		 * This method must return the same value each time it is called.
		 * 
		 * [phantom node payments]: PhantomKeysManager
		 */
		byte[] get_inbound_payment_key_material();
	}
	private class LDKKeysInterfaceHolder { internal KeysInterface held; }
	private class LDKKeysInterfaceImpl : bindings.LDKKeysInterface {
		internal LDKKeysInterfaceImpl(KeysInterfaceInterface arg, LDKKeysInterfaceHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private KeysInterfaceInterface arg;
		private LDKKeysInterfaceHolder impl_holder;
		public long get_node_secret(Recipient _recipient) {
			Result_SecretKeyNoneZ ret = arg.get_node_secret(_recipient);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long get_node_id(Recipient _recipient) {
			Result_PublicKeyNoneZ ret = arg.get_node_id(_recipient);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long ecdh(Recipient _recipient, byte[] _other_key, long _tweak) {
			org.ldk.structs.Option_ScalarZ _tweak_hu_conv = org.ldk.structs.Option_ScalarZ.constr_from_ptr(_tweak);
			if (_tweak_hu_conv != null) { _tweak_hu_conv.ptrs_to.AddLast(this); };
			Result_SharedSecretNoneZ ret = arg.ecdh(_recipient, _other_key, _tweak_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public byte[] get_destination_script() {
			byte[] ret = arg.get_destination_script();
				GC.KeepAlive(arg);
			return ret;
		}
		public long get_shutdown_scriptpubkey() {
			ShutdownScript ret = arg.get_shutdown_scriptpubkey();
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public byte[] generate_channel_keys_id(bool _inbound, long _channel_value_satoshis, byte[] _user_channel_id) {
			org.ldk.util.UInt128 _user_channel_id_conv = new org.ldk.util.UInt128(_user_channel_id);
			byte[] ret = arg.generate_channel_keys_id(_inbound, _channel_value_satoshis, _user_channel_id_conv);
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
		public long derive_channel_signer(long _channel_value_satoshis, byte[] _channel_keys_id) {
			Sign ret = arg.derive_channel_signer(_channel_value_satoshis, _channel_keys_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			if (impl_holder.held != null) { impl_holder.held.ptrs_to.AddLast(ret); };
			return result;
		}
		public byte[] get_secure_random_bytes() {
			byte[] ret = arg.get_secure_random_bytes();
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
		public long read_chan_signer(byte[] _reader) {
			Result_SignDecodeErrorZ ret = arg.read_chan_signer(_reader);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_invoice(byte[] _hrp_bytes, byte[] _invoice_data, Recipient _receipient) {
			int _invoice_data_conv_7_len = _invoice_data.Length;
			UInt5[] _invoice_data_conv_7_arr = new UInt5[_invoice_data_conv_7_len];
			for (int h = 0; h < _invoice_data_conv_7_len; h++) {
				byte _invoice_data_conv_7 = _invoice_data[h];
				UInt5 _invoice_data_conv_7_conv = new UInt5(_invoice_data_conv_7);
				_invoice_data_conv_7_arr[h] = _invoice_data_conv_7_conv;
			}
			Result_RecoverableSignatureNoneZ ret = arg.sign_invoice(_hrp_bytes, _invoice_data_conv_7_arr, _receipient);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public byte[] get_inbound_payment_key_material() {
			byte[] ret = arg.get_inbound_payment_key_material();
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
	}
	public static KeysInterface new_impl(KeysInterfaceInterface arg) {
		LDKKeysInterfaceHolder impl_holder = new LDKKeysInterfaceHolder();
		impl_holder.held = new KeysInterface(new LDKKeysInterfaceImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Get node secret key based on the provided [`Recipient`].
	 * 
	 * The `node_id`/`network_key` is the public key that corresponds to this secret key.
	 * 
	 * This method must return the same value each time it is called with a given [`Recipient`]
	 * parameter.
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 */
	public Result_SecretKeyNoneZ get_node_secret(Recipient recipient) {
		long ret = bindings.KeysInterface_get_node_secret(this.ptr, recipient);
		GC.KeepAlive(this);
		GC.KeepAlive(recipient);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyNoneZ ret_hu_conv = Result_SecretKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get node id based on the provided [`Recipient`]. This public key corresponds to the secret in
	 * [`get_node_secret`].
	 * 
	 * This method must return the same value each time it is called with a given [`Recipient`]
	 * parameter.
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 * 
	 * [`get_node_secret`]: Self::get_node_secret
	 */
	public Result_PublicKeyNoneZ get_node_id(Recipient recipient) {
		long ret = bindings.KeysInterface_get_node_id(this.ptr, recipient);
		GC.KeepAlive(this);
		GC.KeepAlive(recipient);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyNoneZ ret_hu_conv = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the ECDH shared secret of our [`node secret`] and `other_key`, multiplying by `tweak` if
	 * one is provided. Note that this tweak can be applied to `other_key` instead of our node
	 * secret, though this is less efficient.
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 * 
	 * [`node secret`]: Self::get_node_secret
	 */
	public Result_SharedSecretNoneZ ecdh(Recipient recipient, byte[] other_key, org.ldk.structs.Option_ScalarZ tweak) {
		long ret = bindings.KeysInterface_ecdh(this.ptr, recipient, InternalUtils.check_arr_len(other_key, 33), tweak.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(recipient);
		GC.KeepAlive(other_key);
		GC.KeepAlive(tweak);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SharedSecretNoneZ ret_hu_conv = Result_SharedSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get a script pubkey which we send funds to when claiming on-chain contestable outputs.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user.
	 */
	public byte[] get_destination_script() {
		byte[] ret = bindings.KeysInterface_get_destination_script(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Get a script pubkey which we will send funds to when closing a channel.
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds across channels as controlled to the same user.
	 */
	public ShutdownScript get_shutdown_scriptpubkey() {
		long ret = bindings.KeysInterface_get_shutdown_scriptpubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ShutdownScript ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ShutdownScript(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Get a new set of [`Sign`] for per-channel secrets. These MUST be unique even if you
	 * restarted with some stale data!
	 * 
	 * This method must return a different value each time it is called.
	 */
	public byte[] generate_channel_keys_id(bool inbound, long channel_value_satoshis, org.ldk.util.UInt128 user_channel_id) {
		byte[] ret = bindings.KeysInterface_generate_channel_keys_id(this.ptr, inbound, channel_value_satoshis, user_channel_id.getLEBytes());
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
	 * [`KeysInterface::generate_channel_keys_id`]. Otherwise, an existing `Signer` can be
	 * re-derived from its `channel_keys_id`, which can be obtained through its trait method
	 * [`BaseSign::channel_keys_id`].
	 */
	public Sign derive_channel_signer(long channel_value_satoshis, byte[] channel_keys_id) {
		long ret = bindings.KeysInterface_derive_channel_signer(this.ptr, channel_value_satoshis, InternalUtils.check_arr_len(channel_keys_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(channel_value_satoshis);
		GC.KeepAlive(channel_keys_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Sign ret_hu_conv = new Sign(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets a unique, cryptographically-secure, random 32 byte value. This is used for encrypting
	 * onion packets and for temporary channel IDs. There is no requirement that these be
	 * persisted anywhere, though they must be unique across restarts.
	 * 
	 * This method must return a different value each time it is called.
	 */
	public byte[] get_secure_random_bytes() {
		byte[] ret = bindings.KeysInterface_get_secure_random_bytes(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Reads a [`Signer`] for this [`KeysInterface`] from the given input stream.
	 * This is only called during deserialization of other objects which contain
	 * [`Sign`]-implementing objects (i.e., [`ChannelMonitor`]s and [`ChannelManager`]s).
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
	public Result_SignDecodeErrorZ read_chan_signer(byte[] reader) {
		long ret = bindings.KeysInterface_read_chan_signer(this.ptr, reader);
		GC.KeepAlive(this);
		GC.KeepAlive(reader);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sign an invoice.
	 * By parameterizing by the raw invoice bytes instead of the hash, we allow implementors of
	 * this trait to parse the invoice and make sure they're signing what they expect, rather than
	 * blindly signing the hash.
	 * The `hrp` is ASCII bytes, while the invoice data is base32-encoded.
	 * 
	 * The secret key used to sign the invoice is dependent on the [`Recipient`].
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 */
	public Result_RecoverableSignatureNoneZ sign_invoice(byte[] hrp_bytes, UInt5[] invoice_data, Recipient receipient) {
		long ret = bindings.KeysInterface_sign_invoice(this.ptr, hrp_bytes, invoice_data != null ? InternalUtils.convUInt5Array(invoice_data) : null, receipient);
		GC.KeepAlive(this);
		GC.KeepAlive(hrp_bytes);
		GC.KeepAlive(invoice_data);
		GC.KeepAlive(receipient);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get secret key material as bytes for use in encrypting and decrypting inbound payment data.
	 * 
	 * If the implementor of this trait supports [phantom node payments], then every node that is
	 * intended to be included in the phantom invoice route hints must return the same value from
	 * this method.
	 * 
	 * This method must return the same value each time it is called.
	 * 
	 * [phantom node payments]: PhantomKeysManager
	 */
	public byte[] get_inbound_payment_key_material() {
		byte[] ret = bindings.KeysInterface_get_inbound_payment_key_material(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
