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
		 * Get node secret key (aka node_id or network_key).
		 * 
		 * This method must return the same value each time it is called.
		 */
		byte[] get_node_secret();
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
		 * Sign an invoice's preimage (note that this is the preimage of the invoice, not the HTLC's
		 * preimage). By parameterizing by the preimage instead of the hash, we allow implementors of
		 * this trait to parse the invoice and make sure they're signing what they expect, rather than
		 * blindly signing the hash.
		 */
		Result_RecoverableSignatureNoneZ sign_invoice(byte[] invoice_preimage);
		/**
		 * Get secret key material as bytes for use in encrypting and decrypting inbound payment data.
		 * 
		 * This method must return the same value each time it is called.
		 */
		byte[] get_inbound_payment_key_material();
	}
	private static class LDKKeysInterfaceHolder { KeysInterface held; }
	public static KeysInterface new_impl(KeysInterfaceInterface arg) {
		final LDKKeysInterfaceHolder impl_holder = new LDKKeysInterfaceHolder();
		impl_holder.held = new KeysInterface(new bindings.LDKKeysInterface() {
			@Override public byte[] get_node_secret() {
				byte[] ret = arg.get_node_secret();
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public byte[] get_destination_script() {
				byte[] ret = arg.get_destination_script();
				return ret;
			}
			@Override public long get_shutdown_scriptpubkey() {
				ShutdownScript ret = arg.get_shutdown_scriptpubkey();
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long get_channel_signer(boolean inbound, long channel_value_satoshis) {
				Sign ret = arg.get_channel_signer(inbound, channel_value_satoshis);
				long result = ret == null ? 0 : ret.clone_ptr();
				impl_holder.held.ptrs_to.add(ret);
				return result;
			}
			@Override public byte[] get_secure_random_bytes() {
				byte[] ret = arg.get_secure_random_bytes();
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public long read_chan_signer(byte[] reader) {
				Result_SignDecodeErrorZ ret = arg.read_chan_signer(reader);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long sign_invoice(byte[] invoice_preimage) {
				Result_RecoverableSignatureNoneZ ret = arg.sign_invoice(invoice_preimage);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public byte[] get_inbound_payment_key_material() {
				byte[] ret = arg.get_inbound_payment_key_material();
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Get node secret key (aka node_id or network_key).
	 * 
	 * This method must return the same value each time it is called.
	 */
	public byte[] get_node_secret() {
		byte[] ret = bindings.KeysInterface_get_node_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
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
	 * Sign an invoice's preimage (note that this is the preimage of the invoice, not the HTLC's
	 * preimage). By parameterizing by the preimage instead of the hash, we allow implementors of
	 * this trait to parse the invoice and make sure they're signing what they expect, rather than
	 * blindly signing the hash.
	 */
	public Result_RecoverableSignatureNoneZ sign_invoice(byte[] invoice_preimage) {
		long ret = bindings.KeysInterface_sign_invoice(this.ptr, invoice_preimage);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice_preimage);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get secret key material as bytes for use in encrypting and decrypting inbound payment data.
	 * 
	 * This method must return the same value each time it is called.
	 */
	public byte[] get_inbound_payment_key_material() {
		byte[] ret = bindings.KeysInterface_get_inbound_payment_key_material(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
