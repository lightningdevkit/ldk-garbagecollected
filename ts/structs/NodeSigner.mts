

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of NodeSigner */
export interface NodeSignerInterface {
	/**Get the [`ExpandedKey`] which provides cryptographic material for various Lightning Network operations.
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
	get_expanded_key(): ExpandedKey;
	/**Defines a method to derive a 32-byte encryption key for peer storage.
	 * 
	 * Implementations of this method must derive a secure encryption key.
	 * The key is used to encrypt or decrypt backups of our state stored with our peers.
	 * 
	 * Thus, if you wish to rely on recovery using this method, you should use a key which
	 * can be re-derived from data which would be available after state loss (eg the wallet seed).
	 */
	get_peer_storage_key(): PeerStorageKey;
	/**Returns the [`ReceiveAuthKey`] used to authenticate incoming [`BlindedMessagePath`] contexts.
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
	get_receive_auth_key(): ReceiveAuthKey;
	/**Get node id based on the provided [`Recipient`].
	 * 
	 * This method must return the same value each time it is called with a given [`Recipient`]
	 * parameter.
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 */
	get_node_id(recipient: Recipient): Result_PublicKeyNoneZ;
	/**Gets the ECDH shared secret of our node secret and `other_key`, multiplying by `tweak` if
	 * one is provided. Note that this tweak can be applied to `other_key` instead of our node
	 * secret, though this is less efficient.
	 * 
	 * Note that if this fails while attempting to forward an HTLC, LDK will panic. The error
	 * should be resolved to allow LDK to resume forwarding HTLCs.
	 * 
	 * Errors if the [`Recipient`] variant is not supported by the implementation.
	 */
	ecdh(recipient: Recipient, other_key: Uint8Array, tweak: Option_BigEndianScalarZ): Result_ThirtyTwoBytesNoneZ;
	/**Sign an invoice.
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
	sign_invoice(invoice: RawBolt11Invoice, recipient: Recipient): Result_RecoverableSignatureNoneZ;
	/**Signs the [`TaggedHash`] of a BOLT 12 invoice.
	 * 
	 * Implementors may check that the `invoice` is expected rather than blindly signing the tagged
	 * hash. An `Ok` result should sign `invoice.tagged_hash().as_digest()` with the node's signing
	 * key or an ephemeral key to preserve privacy, whichever is associated with
	 * [`UnsignedBolt12Invoice::signing_pubkey`].
	 * 
	 * [`TaggedHash`]: crate::offers::merkle::TaggedHash
	 */
	sign_bolt12_invoice(invoice: UnsignedBolt12Invoice): Result_SchnorrSignatureNoneZ;
	/**Sign a gossip message.
	 * 
	 * Note that if this fails, LDK may panic and the message will not be broadcast to the network
	 * or a possible channel counterparty. If LDK panics, the error should be resolved to allow the
	 * message to be broadcast, as otherwise it may prevent one from receiving funds over the
	 * corresponding channel.
	 */
	sign_gossip_message(msg: UnsignedGossipMessage): Result_ECDSASignatureNoneZ;
	/**Sign an arbitrary message with the node's secret key.
	 * 
	 * Creates a digital signature of a message given the node's secret. The message is prefixed
	 * with \"Lightning Signed Message:\" before signing. See [this description of the format](https://web.archive.org/web/20191010011846/https://twitter.com/rusty_twit/status/1182102005914800128)
	 * for more details.
	 * 
	 * A receiver knowing the node's id and the message can be sure that the signature was generated by the caller.
	 * An `Err` can be returned to signal that the signer is unavailable / cannot produce a valid
	 * signature.
	 */
	sign_message(msg: Uint8Array): Result_StrNoneZ;
}

class LDKNodeSignerHolder {
	held: NodeSigner|null = null;
}

/**
 * A trait that can handle cryptographic operations at the scope level of a node.
 */
export class NodeSigner extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKNodeSigner|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NodeSigner_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of NodeSigner from a given implementation */
	public static new_impl(arg: NodeSignerInterface): NodeSigner {
		const impl_holder: LDKNodeSignerHolder = new LDKNodeSignerHolder();
		let structImplementation = {
			get_expanded_key (): bigint {
				const ret: ExpandedKey = arg.get_expanded_key();
				const result: bigint = ret.clone_ptr();
				return result;
			},
			get_peer_storage_key (): bigint {
				const ret: PeerStorageKey = arg.get_peer_storage_key();
				const result: bigint = ret.clone_ptr();
				return result;
			},
			get_receive_auth_key (): bigint {
				const ret: ReceiveAuthKey = arg.get_receive_auth_key();
				const result: bigint = ret.clone_ptr();
				return result;
			},
			get_node_id (recipient: Recipient): bigint {
				const ret: Result_PublicKeyNoneZ = arg.get_node_id(recipient);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			ecdh (recipient: Recipient, other_key: number, tweak: bigint): bigint {
				const other_key_conv: Uint8Array = bindings.decodeUint8Array(other_key);
				const tweak_hu_conv: Option_BigEndianScalarZ = Option_BigEndianScalarZ.constr_from_ptr(tweak);
				CommonBase.add_ref_from(tweak_hu_conv, this);
				const ret: Result_ThirtyTwoBytesNoneZ = arg.ecdh(recipient, other_key_conv, tweak_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_invoice (invoice: bigint, recipient: Recipient): bigint {
				const invoice_hu_conv: RawBolt11Invoice = new RawBolt11Invoice(null, invoice);
				const ret: Result_RecoverableSignatureNoneZ = arg.sign_invoice(invoice_hu_conv, recipient);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_bolt12_invoice (invoice: bigint): bigint {
				const invoice_hu_conv: UnsignedBolt12Invoice = new UnsignedBolt12Invoice(null, invoice);
				const ret: Result_SchnorrSignatureNoneZ = arg.sign_bolt12_invoice(invoice_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_gossip_message (msg: bigint): bigint {
				const msg_hu_conv: UnsignedGossipMessage = UnsignedGossipMessage.constr_from_ptr(msg);
				CommonBase.add_ref_from(msg_hu_conv, this);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_gossip_message(msg_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_message (msg: number): bigint {
				const msg_conv: Uint8Array = bindings.decodeUint8Array(msg);
				const ret: Result_StrNoneZ = arg.sign_message(msg_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKNodeSigner;
		const ptr_idx: [bigint, number] = bindings.LDKNodeSigner_new(structImplementation);

		impl_holder.held = new NodeSigner(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
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
	public get_expanded_key(): ExpandedKey {
		const ret: bigint = bindings.NodeSigner_get_expanded_key(this.ptr);
		const ret_hu_conv: ExpandedKey = new ExpandedKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public get_peer_storage_key(): PeerStorageKey {
		const ret: bigint = bindings.NodeSigner_get_peer_storage_key(this.ptr);
		const ret_hu_conv: PeerStorageKey = new PeerStorageKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public get_receive_auth_key(): ReceiveAuthKey {
		const ret: bigint = bindings.NodeSigner_get_receive_auth_key(this.ptr);
		const ret_hu_conv: ReceiveAuthKey = new ReceiveAuthKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public get_node_id(recipient: Recipient): Result_PublicKeyNoneZ {
		const ret: bigint = bindings.NodeSigner_get_node_id(this.ptr, recipient);
		const ret_hu_conv: Result_PublicKeyNoneZ = Result_PublicKeyNoneZ.constr_from_ptr(ret);
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
	public ecdh(recipient: Recipient, other_key: Uint8Array, tweak: Option_BigEndianScalarZ): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.NodeSigner_ecdh(this.ptr, recipient, bindings.encodeUint8Array(other_key), CommonBase.get_ptr_of(tweak));
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
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
	public sign_invoice(invoice: RawBolt11Invoice, recipient: Recipient): Result_RecoverableSignatureNoneZ {
		const ret: bigint = bindings.NodeSigner_sign_invoice(this.ptr, CommonBase.get_ptr_of(invoice), recipient);
		const ret_hu_conv: Result_RecoverableSignatureNoneZ = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
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
	public sign_bolt12_invoice(invoice: UnsignedBolt12Invoice): Result_SchnorrSignatureNoneZ {
		const ret: bigint = bindings.NodeSigner_sign_bolt12_invoice(this.ptr, CommonBase.get_ptr_of(invoice));
		const ret_hu_conv: Result_SchnorrSignatureNoneZ = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
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
	public sign_gossip_message(msg: UnsignedGossipMessage): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.NodeSigner_sign_gossip_message(this.ptr, CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
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
	public sign_message(msg: Uint8Array): Result_StrNoneZ {
		const ret: bigint = bindings.NodeSigner_sign_message(this.ptr, bindings.encodeUint8Array(msg));
		const ret_hu_conv: Result_StrNoneZ = Result_StrNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
