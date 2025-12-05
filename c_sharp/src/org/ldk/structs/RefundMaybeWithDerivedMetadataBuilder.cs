using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Builds a [`Refund`] for the \"offer for money\" flow.
 * 
 * See [module-level documentation] for usage.
 * 
 * [module-level documentation]: self
 */
public class RefundMaybeWithDerivedMetadataBuilder : CommonBase {
	internal RefundMaybeWithDerivedMetadataBuilder(object _dummy, long ptr) : base(ptr) { }
	~RefundMaybeWithDerivedMetadataBuilder() {
		if (ptr != 0) { bindings.RefundMaybeWithDerivedMetadataBuilder_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.RefundMaybeWithDerivedMetadataBuilder_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RefundMaybeWithDerivedMetadataBuilder
	 */
	public org.ldk.structs.RefundMaybeWithDerivedMetadataBuilder clone() {
		long ret = bindings.RefundMaybeWithDerivedMetadataBuilder_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RefundMaybeWithDerivedMetadataBuilder ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RefundMaybeWithDerivedMetadataBuilder(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new builder for a refund using the `signing_pubkey` for the public node id to send
	 * to if no [`Refund::paths`] are set. Otherwise, `signing_pubkey` may be a transient pubkey.
	 * 
	 * Additionally, sets the required (empty) [`Refund::description`], [`Refund::payer_metadata`],
	 * and [`Refund::amount_msats`].
	 * 
	 * # Note
	 * 
	 * If constructing a [`Refund`] for use with a [`ChannelManager`], use
	 * [`ChannelManager::create_refund_builder`] instead of [`RefundBuilder::new`].
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::create_refund_builder`]: crate::ln::channelmanager::ChannelManager::create_refund_builder
	 */
	public static org.ldk.structs.Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ of(byte[] metadata, byte[] signing_pubkey, long amount_msats) {
		long ret = bindings.RefundMaybeWithDerivedMetadataBuilder_new(InternalUtils.encodeUint8Array(metadata), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(signing_pubkey, 33)), amount_msats);
		GC.KeepAlive(metadata);
		GC.KeepAlive(signing_pubkey);
		GC.KeepAlive(amount_msats);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ ret_hu_conv = Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Similar to [`RefundBuilder::new`] except, if [`RefundBuilder::path`] is called, the payer id
	 * is derived from the given [`ExpandedKey`] and nonce. This provides sender privacy by using a
	 * different payer id for each refund, assuming a different nonce is used.  Otherwise, the
	 * provided `node_id` is used for the payer id.
	 * 
	 * Also, sets the metadata when [`RefundBuilder::build`] is called such that it can be used by
	 * [`Bolt12Invoice::verify_using_metadata`] to determine if the invoice was produced for the
	 * refund given an [`ExpandedKey`]. However, if [`RefundBuilder::path`] is called, then the
	 * metadata must be included in each [`BlindedMessagePath`] instead. In this case, use
	 * [`Bolt12Invoice::verify_using_payer_data`].
	 * 
	 * The `payment_id` is encrypted in the metadata and should be unique. This ensures that only
	 * one invoice will be paid for the refund and that payments can be uniquely identified.
	 * 
	 * [`Bolt12Invoice::verify_using_metadata`]: crate::offers::invoice::Bolt12Invoice::verify_using_metadata
	 * [`Bolt12Invoice::verify_using_payer_data`]: crate::offers::invoice::Bolt12Invoice::verify_using_payer_data
	 * [`ExpandedKey`]: crate::ln::inbound_payment::ExpandedKey
	 */
	public static org.ldk.structs.Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ deriving_signing_pubkey(byte[] node_id, org.ldk.structs.ExpandedKey expanded_key, org.ldk.structs.Nonce nonce, long amount_msats, byte[] payment_id) {
		long ret = bindings.RefundMaybeWithDerivedMetadataBuilder_deriving_signing_pubkey(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_id, 33)), expanded_key.ptr, nonce.ptr, amount_msats, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)));
		GC.KeepAlive(node_id);
		GC.KeepAlive(expanded_key);
		GC.KeepAlive(nonce);
		GC.KeepAlive(amount_msats);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ ret_hu_conv = Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets the [`Refund::description`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void description(string description) {
		bindings.RefundMaybeWithDerivedMetadataBuilder_description(this.ptr, InternalUtils.encodeString(description));
		GC.KeepAlive(this);
		GC.KeepAlive(description);
		;
	}

	/**
	 * Sets the [`Refund::absolute_expiry`] as seconds since the Unix epoch.
	 * Any expiry that has already passed is valid and can be checked for using [`Refund::is_expired`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void absolute_expiry(long absolute_expiry) {
		bindings.RefundMaybeWithDerivedMetadataBuilder_absolute_expiry(this.ptr, absolute_expiry);
		GC.KeepAlive(this);
		GC.KeepAlive(absolute_expiry);
		;
	}

	/**
	 * Sets the [`Refund::issuer`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void issuer(string issuer) {
		bindings.RefundMaybeWithDerivedMetadataBuilder_issuer(this.ptr, InternalUtils.encodeString(issuer));
		GC.KeepAlive(this);
		GC.KeepAlive(issuer);
		;
	}

	/**
	 * Adds a blinded path to [`Refund::paths`]. Must include at least one path if only connected
	 * by private channels or if [`Refund::payer_signing_pubkey`] is not a public node id.
	 * 
	 * Successive calls to this method will add another blinded path. Caller is responsible for not
	 * adding duplicate paths.
	 */
	public void path(org.ldk.structs.BlindedMessagePath path) {
		bindings.RefundMaybeWithDerivedMetadataBuilder_path(this.ptr, path.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		;
	}

	/**
	 * Sets the [`Refund::chain`] of the given [`Network`] for paying an invoice. If not
	 * called, [`Network::Bitcoin`] is assumed.
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void chain(Network network) {
		bindings.RefundMaybeWithDerivedMetadataBuilder_chain(this.ptr, network);
		GC.KeepAlive(this);
		GC.KeepAlive(network);
		;
	}

	/**
	 * Sets [`Refund::quantity`] of items. This is purely for informational purposes. It is useful
	 * when the refund pertains to a [`Bolt12Invoice`] that paid for more than one item from an
	 * [`Offer`] as specified by [`InvoiceRequest::quantity`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`InvoiceRequest::quantity`]: crate::offers::invoice_request::InvoiceRequest::quantity
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public void quantity(long quantity) {
		bindings.RefundMaybeWithDerivedMetadataBuilder_quantity(this.ptr, quantity);
		GC.KeepAlive(this);
		GC.KeepAlive(quantity);
		;
	}

	/**
	 * Sets the [`Refund::payer_note`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void payer_note(string payer_note) {
		bindings.RefundMaybeWithDerivedMetadataBuilder_payer_note(this.ptr, InternalUtils.encodeString(payer_note));
		GC.KeepAlive(this);
		GC.KeepAlive(payer_note);
		;
	}

	/**
	 * Builds a [`Refund`] after checking for valid semantics.
	 */
	public org.ldk.structs.Result_RefundBolt12SemanticErrorZ build() {
		long ret = bindings.RefundMaybeWithDerivedMetadataBuilder_build(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RefundBolt12SemanticErrorZ ret_hu_conv = Result_RefundBolt12SemanticErrorZ.constr_from_ptr(ret);
		;
		return ret_hu_conv;
	}

}
} } }
