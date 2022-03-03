package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait to describe an object which can get user secrets and key material.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class KeysInterface extends CommonBase {
	final bindings.LDKKeysInterface bindings_instance;
	KeysInterface(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private KeysInterface(bindings.LDKKeysInterface arg) {
		super(bindings.LDKKeysInterface_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.KeysInterface_free(ptr); } super.finalize();
	}

	public static interface KeysInterfaceInterface {
		/**
		 * Get node secret key (aka node_id or network_key) based on the provided [`Recipient`].
		 * 
		 * This method must return the same value each time it is called with a given `Recipient`
		 * parameter.
		 */
		Result_SecretKeyNoneZ get_node_secret(Recipient recipient);
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
		 * Get a new set of Sign for per-channel secrets. These MUST be unique even if you
		 * restarted with some stale data!
		 * 
		 * This method must return a different value each time it is called.
		 */
		Sign get_channel_signer(boolean inbound, long channel_value_satoshis);
		/**
		 * Gets a unique, cryptographically-secure, random 32 byte value. This is used for encrypting
		 * onion packets and for temporary channel IDs. There is no requirement that these be
		 * persisted anywhere, though they must be unique across restarts.
		 * 
		 * This method must return a different value each time it is called.
		 */
		byte[] get_secure_random_bytes();
		/**
		 * Reads a `Signer` for this `KeysInterface` from the given input stream.
		 * This is only called during deserialization of other objects which contain
		 * `Sign`-implementing objects (ie `ChannelMonitor`s and `ChannelManager`s).
		 * The bytes are exactly those which `<Self::Signer as Writeable>::write()` writes, and
		 * contain no versioning scheme. You may wish to include your own version prefix and ensure
		 * you've read all of the provided bytes to ensure no corruption occurred.
		 */
		Result_SignDecodeErrorZ read_chan_signer(byte[] reader);
		/**
		 * Sign an invoice.
		 * By parameterizing by the raw invoice bytes instead of the hash, we allow implementors of
		 * this trait to parse the invoice and make sure they're signing what they expect, rather than
		 * blindly signing the hash.
		 * The hrp is ascii bytes, while the invoice data is base32.
		 * 
		 * The secret key used to sign the invoice is dependent on the [`Recipient`].
		 */
		Result_RecoverableSignatureNoneZ sign_invoice(byte[] hrp_bytes, UInt5[] invoice_data, Recipient receipient);
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
	private static class LDKKeysInterfaceHolder { KeysInterface held; }
	public static KeysInterface new_impl(KeysInterfaceInterface arg) {
		final LDKKeysInterfaceHolder impl_holder = new LDKKeysInterfaceHolder();
		impl_holder.held = new KeysInterface(new bindings.LDKKeysInterface() {
			@Override public long get_node_secret(Recipient recipient) {
				Result_SecretKeyNoneZ ret = arg.get_node_secret(recipient);
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
			@Override public long get_channel_signer(boolean inbound, long channel_value_satoshis) {
				Sign ret = arg.get_channel_signer(inbound, channel_value_satoshis);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				impl_holder.held.ptrs_to.add(ret);
				return result;
			}
			@Override public byte[] get_secure_random_bytes() {
				byte[] ret = arg.get_secure_random_bytes();
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public long read_chan_signer(byte[] reader) {
				Result_SignDecodeErrorZ ret = arg.read_chan_signer(reader);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long sign_invoice(byte[] hrp_bytes, byte[] invoice_data, Recipient receipient) {
				int invoice_data_conv_7_len = invoice_data.length;
				UInt5[] invoice_data_conv_7_arr = new UInt5[invoice_data_conv_7_len];
				for (int h = 0; h < invoice_data_conv_7_len; h++) {
					byte invoice_data_conv_7 = invoice_data[h];
					UInt5 invoice_data_conv_7_conv = new UInt5(invoice_data_conv_7);
					invoice_data_conv_7_arr[h] = invoice_data_conv_7_conv;
				}
				Result_RecoverableSignatureNoneZ ret = arg.sign_invoice(hrp_bytes, invoice_data_conv_7_arr, receipient);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public byte[] get_inbound_payment_key_material() {
				byte[] ret = arg.get_inbound_payment_key_material();
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Get node secret key (aka node_id or network_key) based on the provided [`Recipient`].
	 * 
	 * This method must return the same value each time it is called with a given `Recipient`
	 * parameter.
	 */
	public Result_SecretKeyNoneZ get_node_secret(org.ldk.enums.Recipient recipient) {
		long ret = bindings.KeysInterface_get_node_secret(this.ptr, recipient);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(recipient);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyNoneZ ret_hu_conv = Result_SecretKeyNoneZ.constr_from_ptr(ret);
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
		long ret = bindings.KeysInterface_get_shutdown_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ShutdownScript ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ShutdownScript(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Get a new set of Sign for per-channel secrets. These MUST be unique even if you
	 * restarted with some stale data!
	 * 
	 * This method must return a different value each time it is called.
	 */
	public Sign get_channel_signer(boolean inbound, long channel_value_satoshis) {
		long ret = bindings.KeysInterface_get_channel_signer(this.ptr, inbound, channel_value_satoshis);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(inbound);
		Reference.reachabilityFence(channel_value_satoshis);
		if (ret >= 0 && ret <= 4096) { return null; }
		Sign ret_hu_conv = new Sign(null, ret);
		ret_hu_conv.ptrs_to.add(this);
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
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Reads a `Signer` for this `KeysInterface` from the given input stream.
	 * This is only called during deserialization of other objects which contain
	 * `Sign`-implementing objects (ie `ChannelMonitor`s and `ChannelManager`s).
	 * The bytes are exactly those which `<Self::Signer as Writeable>::write()` writes, and
	 * contain no versioning scheme. You may wish to include your own version prefix and ensure
	 * you've read all of the provided bytes to ensure no corruption occurred.
	 */
	public Result_SignDecodeErrorZ read_chan_signer(byte[] reader) {
		long ret = bindings.KeysInterface_read_chan_signer(this.ptr, reader);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(reader);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sign an invoice.
	 * By parameterizing by the raw invoice bytes instead of the hash, we allow implementors of
	 * this trait to parse the invoice and make sure they're signing what they expect, rather than
	 * blindly signing the hash.
	 * The hrp is ascii bytes, while the invoice data is base32.
	 * 
	 * The secret key used to sign the invoice is dependent on the [`Recipient`].
	 */
	public Result_RecoverableSignatureNoneZ sign_invoice(byte[] hrp_bytes, UInt5[] invoice_data, org.ldk.enums.Recipient receipient) {
		long ret = bindings.KeysInterface_sign_invoice(this.ptr, hrp_bytes, invoice_data != null ? InternalUtils.convUInt5Array(invoice_data) : null, receipient);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(hrp_bytes);
		Reference.reachabilityFence(invoice_data);
		Reference.reachabilityFence(receipient);
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
		Reference.reachabilityFence(this);
		return ret;
	}

}
