using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait that can handle cryptographic operations at the scope level of a node.
 */
public class NodeSigner : CommonBase {
	internal readonly bindings.LDKNodeSigner bindings_instance;
	internal NodeSigner(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private NodeSigner(bindings.LDKNodeSigner arg) : base(bindings.LDKNodeSigner_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~NodeSigner() {
		if (ptr != 0) { bindings.NodeSigner_free(ptr); }
	}

	public interface NodeSignerInterface {
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
		Result_PublicKeyNoneZ get_node_id(Recipient _recipient);
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
		Result_SharedSecretNoneZ ecdh(Recipient _recipient, byte[] _other_key, Option_ScalarZ _tweak);
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
		Result_RecoverableSignatureNoneZ sign_invoice(byte[] _hrp_bytes, UInt5[] _invoice_data, Recipient _recipient);
		/**
		 * Sign a gossip message.
		 * 
		 * Note that if this fails, LDK may panic and the message will not be broadcast to the network
		 * or a possible channel counterparty. If LDK panics, the error should be resolved to allow the
		 * message to be broadcast, as otherwise it may prevent one from receiving funds over the
		 * corresponding channel.
		 */
		Result_SignatureNoneZ sign_gossip_message(UnsignedGossipMessage _msg);
	}
	private class LDKNodeSignerHolder { internal NodeSigner held; }
	private class LDKNodeSignerImpl : bindings.LDKNodeSigner {
		internal LDKNodeSignerImpl(NodeSignerInterface arg, LDKNodeSignerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private NodeSignerInterface arg;
		private LDKNodeSignerHolder impl_holder;
		public byte[] get_inbound_payment_key_material() {
			byte[] ret = arg.get_inbound_payment_key_material();
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
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
		public long sign_invoice(byte[] _hrp_bytes, byte[] _invoice_data, Recipient _recipient) {
			int _invoice_data_conv_7_len = _invoice_data.Length;
			UInt5[] _invoice_data_conv_7_arr = new UInt5[_invoice_data_conv_7_len];
			for (int h = 0; h < _invoice_data_conv_7_len; h++) {
				byte _invoice_data_conv_7 = _invoice_data[h];
				UInt5 _invoice_data_conv_7_conv = new UInt5(_invoice_data_conv_7);
				_invoice_data_conv_7_arr[h] = _invoice_data_conv_7_conv;
			}
			Result_RecoverableSignatureNoneZ ret = arg.sign_invoice(_hrp_bytes, _invoice_data_conv_7_arr, _recipient);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_gossip_message(long _msg) {
			org.ldk.structs.UnsignedGossipMessage _msg_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(_msg);
			if (_msg_hu_conv != null) { _msg_hu_conv.ptrs_to.AddLast(this); };
			Result_SignatureNoneZ ret = arg.sign_gossip_message(_msg_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static NodeSigner new_impl(NodeSignerInterface arg) {
		LDKNodeSignerHolder impl_holder = new LDKNodeSignerHolder();
		impl_holder.held = new NodeSigner(new LDKNodeSignerImpl(arg, impl_holder));
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
		GC.KeepAlive(this);
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
	public Result_PublicKeyNoneZ get_node_id(Recipient recipient) {
		long ret = bindings.NodeSigner_get_node_id(this.ptr, recipient);
		GC.KeepAlive(this);
		GC.KeepAlive(recipient);
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
	public Result_SharedSecretNoneZ ecdh(Recipient recipient, byte[] other_key, org.ldk.structs.Option_ScalarZ tweak) {
		long ret = bindings.NodeSigner_ecdh(this.ptr, recipient, InternalUtils.check_arr_len(other_key, 33), tweak.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(recipient);
		GC.KeepAlive(other_key);
		GC.KeepAlive(tweak);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SharedSecretNoneZ ret_hu_conv = Result_SharedSecretNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(tweak); };
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
	public Result_RecoverableSignatureNoneZ sign_invoice(byte[] hrp_bytes, UInt5[] invoice_data, Recipient recipient) {
		long ret = bindings.NodeSigner_sign_invoice(this.ptr, hrp_bytes, invoice_data != null ? InternalUtils.convUInt5Array(invoice_data) : null, recipient);
		GC.KeepAlive(this);
		GC.KeepAlive(hrp_bytes);
		GC.KeepAlive(invoice_data);
		GC.KeepAlive(recipient);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
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
	public Result_SignatureNoneZ sign_gossip_message(org.ldk.structs.UnsignedGossipMessage msg) {
		long ret = bindings.NodeSigner_sign_gossip_message(this.ptr, msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

}
} } }
