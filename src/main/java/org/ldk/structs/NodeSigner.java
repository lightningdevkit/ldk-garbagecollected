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
		Result_RecoverableSignatureNoneZ sign_invoice(byte[] hrp_bytes, UInt5[] invoice_data, Recipient recipient);
		/**
		 * Signs the [`TaggedHash`] of a BOLT 12 invoice request.
		 * 
		 * May be called by a function passed to [`UnsignedInvoiceRequest::sign`] where
		 * `invoice_request` is the callee.
		 * 
		 * Implementors may check that the `invoice_request` is expected rather than blindly signing
		 * the tagged hash. An `Ok` result should sign `invoice_request.tagged_hash().as_digest()` with
		 * the node's signing key or an ephemeral key to preserve privacy, whichever is associated with
		 * [`UnsignedInvoiceRequest::payer_id`].
		 * 
		 * [`TaggedHash`]: crate::offers::merkle::TaggedHash
		 */
		Result_SchnorrSignatureNoneZ sign_bolt12_invoice_request(UnsignedInvoiceRequest invoice_request);
		/**
		 * Signs the [`TaggedHash`] of a BOLT 12 invoice.
		 * 
		 * May be called by a function passed to [`UnsignedBolt12Invoice::sign`] where `invoice` is the
		 * callee.
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
	}
	private static class LDKNodeSignerHolder { NodeSigner held; }
	public static NodeSigner new_impl(NodeSignerInterface arg) {
		final LDKNodeSignerHolder impl_holder = new LDKNodeSignerHolder();
		impl_holder.held = new NodeSigner(new bindings.LDKNodeSigner() {
			@Override public byte[] get_inbound_payment_key_material() {
				byte[] ret = arg.get_inbound_payment_key_material();
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public long get_node_id(Recipient recipient) {
				Result_PublicKeyNoneZ ret = arg.get_node_id(recipient);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long ecdh(Recipient recipient, byte[] other_key, long tweak) {
				org.ldk.structs.Option_BigEndianScalarZ tweak_hu_conv = org.ldk.structs.Option_BigEndianScalarZ.constr_from_ptr(tweak);
				if (tweak_hu_conv != null) { tweak_hu_conv.ptrs_to.add(this); };
				Result_ThirtyTwoBytesNoneZ ret = arg.ecdh(recipient, other_key, tweak_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long sign_invoice(byte[] hrp_bytes, byte[] invoice_data, Recipient recipient) {
				int invoice_data_conv_7_len = invoice_data.length;
				UInt5[] invoice_data_conv_7_arr = new UInt5[invoice_data_conv_7_len];
				for (int h = 0; h < invoice_data_conv_7_len; h++) {
					byte invoice_data_conv_7 = invoice_data[h];
					UInt5 invoice_data_conv_7_conv = new UInt5(invoice_data_conv_7);
					invoice_data_conv_7_arr[h] = invoice_data_conv_7_conv;
				}
				Result_RecoverableSignatureNoneZ ret = arg.sign_invoice(hrp_bytes, invoice_data_conv_7_arr, recipient);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long sign_bolt12_invoice_request(long invoice_request) {
				org.ldk.structs.UnsignedInvoiceRequest invoice_request_hu_conv = null; if (invoice_request < 0 || invoice_request > 4096) { invoice_request_hu_conv = new org.ldk.structs.UnsignedInvoiceRequest(null, invoice_request); }
				Result_SchnorrSignatureNoneZ ret = arg.sign_bolt12_invoice_request(invoice_request_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long sign_bolt12_invoice(long invoice) {
				org.ldk.structs.UnsignedBolt12Invoice invoice_hu_conv = null; if (invoice < 0 || invoice > 4096) { invoice_hu_conv = new org.ldk.structs.UnsignedBolt12Invoice(null, invoice); }
				Result_SchnorrSignatureNoneZ ret = arg.sign_bolt12_invoice(invoice_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long sign_gossip_message(long msg) {
				org.ldk.structs.UnsignedGossipMessage msg_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(msg);
				if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.add(this); };
				Result_ECDSASignatureNoneZ ret = arg.sign_gossip_message(msg_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
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
		byte[] ret = bindings.NodeSigner_get_inbound_payment_key_material(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
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
		if (this != null) { this.ptrs_to.add(tweak); };
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
	public Result_RecoverableSignatureNoneZ sign_invoice(byte[] hrp_bytes, UInt5[] invoice_data, org.ldk.enums.Recipient recipient) {
		long ret = bindings.NodeSigner_sign_invoice(this.ptr, hrp_bytes, invoice_data != null ? InternalUtils.convUInt5Array(invoice_data) : null, recipient);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(hrp_bytes);
		Reference.reachabilityFence(invoice_data);
		Reference.reachabilityFence(recipient);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs the [`TaggedHash`] of a BOLT 12 invoice request.
	 * 
	 * May be called by a function passed to [`UnsignedInvoiceRequest::sign`] where
	 * `invoice_request` is the callee.
	 * 
	 * Implementors may check that the `invoice_request` is expected rather than blindly signing
	 * the tagged hash. An `Ok` result should sign `invoice_request.tagged_hash().as_digest()` with
	 * the node's signing key or an ephemeral key to preserve privacy, whichever is associated with
	 * [`UnsignedInvoiceRequest::payer_id`].
	 * 
	 * [`TaggedHash`]: crate::offers::merkle::TaggedHash
	 */
	public Result_SchnorrSignatureNoneZ sign_bolt12_invoice_request(org.ldk.structs.UnsignedInvoiceRequest invoice_request) {
		long ret = bindings.NodeSigner_sign_bolt12_invoice_request(this.ptr, invoice_request == null ? 0 : invoice_request.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice_request);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(invoice_request); };
		return ret_hu_conv;
	}

	/**
	 * Signs the [`TaggedHash`] of a BOLT 12 invoice.
	 * 
	 * May be called by a function passed to [`UnsignedBolt12Invoice::sign`] where `invoice` is the
	 * callee.
	 * 
	 * Implementors may check that the `invoice` is expected rather than blindly signing the tagged
	 * hash. An `Ok` result should sign `invoice.tagged_hash().as_digest()` with the node's signing
	 * key or an ephemeral key to preserve privacy, whichever is associated with
	 * [`UnsignedBolt12Invoice::signing_pubkey`].
	 * 
	 * [`TaggedHash`]: crate::offers::merkle::TaggedHash
	 */
	public Result_SchnorrSignatureNoneZ sign_bolt12_invoice(org.ldk.structs.UnsignedBolt12Invoice invoice) {
		long ret = bindings.NodeSigner_sign_bolt12_invoice(this.ptr, invoice == null ? 0 : invoice.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(invoice);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(invoice); };
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
		if (this != null) { this.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

}
