package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait that can handle cryptographic operations at the scope level of a node.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeSigner extends CommonBase {
	final bindings.LDKNodeSigner bindings_instance;
	NodeSigner(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private NodeSigner(bindings.LDKNodeSigner arg) {
		super(bindings.LDKNodeSigner_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.NodeSigner_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.NodeSigner_free(ptr); }
		ptr = 0;
	}
	public static interface NodeSignerInterface {
		/**
		 * Get the [`ExpandedKey`] which provides cryptographic material for various Lightning Network operations.
		 * 
		 * This key set is used for:
		 * - Encrypting and decrypting inbound payment metadata
		 * - Authenticating payment hashes (both LDK-provided and user-provided)
		 * - Supporting BOLT 12 Offers functionality (key derivation and authentication)
		 * - Authenticating spontaneous payments' metadata
		 * 
		 * This method must return the same value each time it is called.
		 * 
		 * If the implementor of this trait supports [phantom node payments], then every node that is
		 * intended to be included in the phantom invoice route hints must return the same value from
		 * this method. This is because LDK avoids storing inbound payment data. Instead, this key
		 * is used to construct a payment secret which is received in the payment onion and used to
		 * reconstruct the payment preimage. Therefore, for a payment to be receivable by multiple
		 * nodes, they must share the same key.
		 * 
		 * [phantom node payments]: PhantomKeysManager
		 */
		ExpandedKey get_expanded_key();
		/**
		 * Defines a method to derive a 32-byte encryption key for peer storage.
		 * 
		 * Implementations of this method must derive a secure encryption key.
		 * The key is used to encrypt or decrypt backups of our state stored with our peers.
		 * 
		 * Thus, if you wish to rely on recovery using this method, you should use a key which
		 * can be re-derived from data which would be available after state loss (eg the wallet seed).
		 */
		PeerStorageKey get_peer_storage_key();
		/**
		 * Returns the [`ReceiveAuthKey`] used to authenticate incoming [`BlindedMessagePath`] contexts.
		 * 
		 * This key is used as additional associated data (AAD) during MAC verification of the
		 * [`MessageContext`] at the final hop of a blinded path. It ensures that only paths
		 * constructed by this node will be accepted, preventing unauthorized parties from forging
		 * valid-looking messages.
		 * 
		 * Implementers must ensure that this key remains secret and consistent across invocations.
		 * 
		 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
		 * [`MessageContext`]: crate::blinded_path::message::MessageContext
		 */
		ReceiveAuthKey get_receive_auth_key();
		/**
		 * Get node id based on the provided [`Recipient`].
		 * 
		 * This method must return the same value each time it is called with a given [`Recipient`]
		 * parameter.
		 * 
		 * Errors if the [`Recipient`] variant is not supported by the implementation.
		 */
		Result_PublicKeyNoneZ get_node_id(Recipient recipient);
		/**
		 * Gets the ECDH shared secret of our node secret and `other_key`, multiplying by `tweak` if
		 * one is provided. Note that this tweak can be applied to `other_key` instead of our node
		 * secret, though this is less efficient.
		 * 
		 * Note that if this fails while attempting to forward an HTLC, LDK will panic. The error
		 * should be resolved to allow LDK to resume forwarding HTLCs.
		 * 
		 * Errors if the [`Recipient`] variant is not supported by the implementation.
		 */
		Result_ThirtyTwoBytesNoneZ ecdh(Recipient recipient, byte[] other_key, Option_BigEndianScalarZ tweak);
		/**
		 * Sign an invoice.
		 * 
		 * By parameterizing by the raw invoice bytes instead of the hash, we allow implementors of
		 * this trait to parse the invoice and make sure they're signing what they expect, rather than
		 * blindly signing the hash.
		 * 
		 * The `hrp_bytes` are ASCII bytes, while the `invoice_data` is base32.
		 * 
		 * The secret key used to sign the invoice is dependent on the [`Recipient`].
		 * 
		 * Errors if the [`Recipient`] variant is not supported by the implementation.
		 */
		Result_RecoverableSignatureNoneZ sign_invoice(RawBolt11Invoice invoice, Recipient recipient);
		/**
		 * Signs the [`TaggedHash`] of a BOLT 12 invoice.
		 * 
		 * Implementors may check that the `invoice` is expected rather than blindly signing the tagged
		 * hash. An `Ok` result should sign `invoice.tagged_hash().as_digest()` with the node's signing
		 * key or an ephemeral key to preserve privacy, whichever is associated with
		 * [`UnsignedBolt12Invoice::signing_pubkey`].
		 * 
		 * [`TaggedHash`]: crate::offers::merkle::TaggedHash
		 */
		Result_SchnorrSignatureNoneZ sign_bolt12_invoice(UnsignedBolt12Invoice invoice);
		/**
		 * Sign a gossip message.
		 * 
		 * Note that if this fails, LDK may panic and the message will not be broadcast to the network
		 * or a possible channel counterparty. If LDK panics, the error should be resolved to allow the
		 * message to be broadcast, as otherwise it may prevent one from receiving funds over the
		 * corresponding channel.
		 */
		Result_ECDSASignatureNoneZ sign_gossip_message(UnsignedGossipMessage msg);
		/**
		 * Sign an arbitrary message with the node's secret key.
		 * 
		 * Creates a digital signature of a message given the node's secret. The message is prefixed
		 * with \"Lightning Signed Message:\" before signing. See [this description of the format](https://web.archive.org/web/20191010011846/https://twitter.com/rusty_twit/status/1182102005914800128)
		 * for more details.
		 * 
		 * A receiver knowing the node's id and the message can be sure that the signature was generated by the caller.
		 * An `Err` can be returned to signal that the signer is unavailable / cannot produce a valid
		 * signature.
		 */
		Result_StrNoneZ sign_message(byte[] msg);
	}
	private static class LDKNodeSignerHolder { NodeSigner held; }
	public static NodeSigner new_impl(NodeSignerInterface arg) {
		final LDKNodeSignerHolder impl_holder = new LDKNodeSignerHolder();
		impl_holder.held = new NodeSigner(new bindings.LDKNodeSigner() {
			@Override public long get_expanded_key() {
				ExpandedKey ret = arg.get_expanded_key();
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long get_peer_storage_key() {
				PeerStorageKey ret = arg.get_peer_storage_key();
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long get_receive_auth_key() {
				ReceiveAuthKey ret = arg.get_receive_auth_key();
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long get_node_id(Recipient recipient) {
				Result_PublicKeyNoneZ ret = arg.get_node_id(recipient);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long ecdh(Recipient recipient, byte[] other_key, long tweak) {
				org.ldk.structs.Option_BigEndianScalarZ tweak_hu_conv = org.ldk.structs.Option_BigEndianScalarZ.constr_from_ptr(tweak);
				if (tweak_hu_conv != null) { tweak_hu_conv.ptrs_to.add(this); };
				Result_ThirtyTwoBytesNoneZ ret = arg.ecdh(recipient, other_key, tweak_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long sign_invoice(long invoice, Recipient recipient) {
				org.ldk.structs.RawBolt11Invoice invoice_hu_conv = null; if (invoice < 0 || invoice > 4096) { invoice_hu_conv = new org.ldk.structs.RawBolt11Invoice(null, invoice); }
				Result_RecoverableSignatureNoneZ ret = arg.sign_invoice(invoice_hu_conv, recipient);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long sign_bolt12_invoice(long invoice) {
				org.ldk.structs.UnsignedBolt12Invoice invoice_hu_conv = null; if (invoice < 0 || invoice > 4096) { invoice_hu_conv = new org.ldk.structs.UnsignedBolt12Invoice(null, invoice); }
				Result_SchnorrSignatureNoneZ ret = arg.sign_bolt12_invoice(invoice_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long sign_gossip_message(long msg) {
				org.ldk.structs.UnsignedGossipMessage msg_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(msg);
				if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.add(this); };
				Result_ECDSASignatureNoneZ ret = arg.sign_gossip_message(msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long sign_message(byte[] msg) {
				Result_StrNoneZ ret = arg.sign_message(msg);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Get the [`ExpandedKey`] which provides cryptographic material for various Lightning Network operations.
	 * 
	 * This key set is used for:
	 * - Encrypting and decrypting inbound payment metadata
	 * - Authenticating payment hashes (both LDK-provided and user-provided)
	 * - Supporting BOLT 12 Offers functionality (key derivation and authentication)
	 * - Authenticating spontaneous payments' metadata
	 * 
	 * This method must return the same value each time it is called.
	 * 
	 * If the implementor of this trait supports [phantom node payments], then every node that is
	 * intended to be included in the phantom invoice route hints must return the same value from
	 * this method. This is because LDK avoids storing inbound payment data. Instead, this key
	 * is used to construct a payment secret which is received in the payment onion and used to
	 * reconstruct the payment preimage. Therefore, for a payment to be receivable by multiple
	 * nodes, they must share the same key.
	 * 
	 * [phantom node payments]: PhantomKeysManager
	 */
	public ExpandedKey get_expanded_key() {
		long ret = bindings.NodeSigner_get_expanded_key(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpandedKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpandedKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Defines a method to derive a 32-byte encryption key for peer storage.
	 * 
	 * Implementations of this method must derive a secure encryption key.
	 * The key is used to encrypt or decrypt backups of our state stored with our peers.
	 * 
	 * Thus, if you wish to rely on recovery using this method, you should use a key which
	 * can be re-derived from data which would be available after state loss (eg the wallet seed).
	 */
	public PeerStorageKey get_peer_storage_key() {
		long ret = bindings.NodeSigner_get_peer_storage_key(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the [`ReceiveAuthKey`] used to authenticate incoming [`BlindedMessagePath`] contexts.
	 * 
	 * This key is used as additional associated data (AAD) during MAC verification of the
	 * [`MessageContext`] at the final hop of a blinded path. It ensures that only paths
	 * constructed by this node will be accepted, preventing unauthorized parties from forging
	 * valid-looking messages.
	 * 
	 * Implementers must ensure that this key remains secret and consistent across invocations.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 * [`MessageContext`]: crate::blinded_path::message::MessageContext
	 */
	public ReceiveAuthKey get_receive_auth_key() {
		long ret = bindings.NodeSigner_get_receive_auth_key(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReceiveAuthKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReceiveAuthKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Get node id based on the provided [`Recipient`].
	 * 
	 * This method must return the same value each time it is called with a given [`Recipient`]
	 * parameter.
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 */
	public Result_PublicKeyNoneZ get_node_id(org.ldk.enums.Recipient recipient) {
		long ret = bindings.NodeSigner_get_node_id(this.ptr, recipient);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(recipient);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyNoneZ ret_hu_conv = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the ECDH shared secret of our node secret and `other_key`, multiplying by `tweak` if
	 * one is provided. Note that this tweak can be applied to `other_key` instead of our node
	 * secret, though this is less efficient.
	 * 
	 * Note that if this fails while attempting to forward an HTLC, LDK will panic. The error
	 * should be resolved to allow LDK to resume forwarding HTLCs.
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 */
	public Result_ThirtyTwoBytesNoneZ ecdh(org.ldk.enums.Recipient recipient, byte[] other_key, org.ldk.structs.Option_BigEndianScalarZ tweak) {
		long ret = bindings.NodeSigner_ecdh(this.ptr, recipient, InternalUtils.check_arr_len(other_key, 33), tweak.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(recipient);
		Reference.reachabilityFence(other_key);
		Reference.reachabilityFence(tweak);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sign an invoice.
	 * 
	 * By parameterizing by the raw invoice bytes instead of the hash, we allow implementors of
	 * this trait to parse the invoice and make sure they're signing what they expect, rather than
	 * blindly signing the hash.
	 * 
	 * The `hrp_bytes` are ASCII bytes, while the `invoice_data` is base32.
	 * 
	 * The secret key used to sign the invoice is dependent on the [`Recipient`].
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 */
	public Result_RecoverableSignatureNoneZ sign_invoice(org.ldk.structs.RawBolt11Invoice invoice, org.ldk.enums.Recipient recipient) {
		long ret = bindings.NodeSigner_sign_invoice(this.ptr, invoice.ptr, recipient);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice);
		Reference.reachabilityFence(recipient);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs the [`TaggedHash`] of a BOLT 12 invoice.
	 * 
	 * Implementors may check that the `invoice` is expected rather than blindly signing the tagged
	 * hash. An `Ok` result should sign `invoice.tagged_hash().as_digest()` with the node's signing
	 * key or an ephemeral key to preserve privacy, whichever is associated with
	 * [`UnsignedBolt12Invoice::signing_pubkey`].
	 * 
	 * [`TaggedHash`]: crate::offers::merkle::TaggedHash
	 */
	public Result_SchnorrSignatureNoneZ sign_bolt12_invoice(org.ldk.structs.UnsignedBolt12Invoice invoice) {
		long ret = bindings.NodeSigner_sign_bolt12_invoice(this.ptr, invoice.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sign a gossip message.
	 * 
	 * Note that if this fails, LDK may panic and the message will not be broadcast to the network
	 * or a possible channel counterparty. If LDK panics, the error should be resolved to allow the
	 * message to be broadcast, as otherwise it may prevent one from receiving funds over the
	 * corresponding channel.
	 */
	public Result_ECDSASignatureNoneZ sign_gossip_message(org.ldk.structs.UnsignedGossipMessage msg) {
		long ret = bindings.NodeSigner_sign_gossip_message(this.ptr, msg.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ECDSASignatureNoneZ ret_hu_conv = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sign an arbitrary message with the node's secret key.
	 * 
	 * Creates a digital signature of a message given the node's secret. The message is prefixed
	 * with \"Lightning Signed Message:\" before signing. See [this description of the format](https://web.archive.org/web/20191010011846/https://twitter.com/rusty_twit/status/1182102005914800128)
	 * for more details.
	 * 
	 * A receiver knowing the node's id and the message can be sure that the signature was generated by the caller.
	 * An `Err` can be returned to signal that the signer is unavailable / cannot produce a valid
	 * signature.
	 */
	public Result_StrNoneZ sign_message(byte[] msg) {
		long ret = bindings.NodeSigner_sign_message(this.ptr, msg);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StrNoneZ ret_hu_conv = Result_StrNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
