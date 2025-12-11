using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Builds an [`Offer`] for the \"offer to be paid\" flow.
 * 
 * See [module-level documentation] for usage.
 * 
 * [module-level documentation]: self
 */
public class OfferWithDerivedMetadataBuilder : CommonBase {
	internal OfferWithDerivedMetadataBuilder(object _dummy, long ptr) : base(ptr) { }
	~OfferWithDerivedMetadataBuilder() {
		if (ptr != 0) { bindings.OfferWithDerivedMetadataBuilder_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.OfferWithDerivedMetadataBuilder_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferWithDerivedMetadataBuilder
	 */
	public org.ldk.structs.OfferWithDerivedMetadataBuilder clone() {
		long ret = bindings.OfferWithDerivedMetadataBuilder_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferWithDerivedMetadataBuilder ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferWithDerivedMetadataBuilder(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Similar to [`OfferBuilder::new`] except, if [`OfferBuilder::path`] is called, the signing
	 * pubkey is derived from the given [`ExpandedKey`] and [`Nonce`]. This provides recipient
	 * privacy by using a different signing pubkey for each offer. Otherwise, the provided
	 * `node_id` is used for [`Offer::issuer_signing_pubkey`].
	 * 
	 * Also, sets the metadata when [`OfferBuilder::build`] is called such that it can be used by
	 * [`InvoiceRequest::verify_using_metadata`] to determine if the request was produced for the
	 * offer given an [`ExpandedKey`]. However, if [`OfferBuilder::path`] is called, then the
	 * metadata will not be set and must be included in each [`BlindedMessagePath`] instead. In this case,
	 * use [`InvoiceRequest::verify_using_recipient_data`].
	 * 
	 * [`InvoiceRequest::verify_using_metadata`]: crate::offers::invoice_request::InvoiceRequest::verify_using_metadata
	 * [`InvoiceRequest::verify_using_recipient_data`]: crate::offers::invoice_request::InvoiceRequest::verify_using_recipient_data
	 * [`ExpandedKey`]: crate::ln::inbound_payment::ExpandedKey
	 */
	public static org.ldk.structs.OfferWithDerivedMetadataBuilder deriving_signing_pubkey(byte[] node_id, org.ldk.structs.ExpandedKey expanded_key, org.ldk.structs.Nonce nonce) {
		long ret = bindings.OfferWithDerivedMetadataBuilder_deriving_signing_pubkey(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_id, 33)), expanded_key.ptr, nonce.ptr);
		GC.KeepAlive(node_id);
		GC.KeepAlive(expanded_key);
		GC.KeepAlive(nonce);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferWithDerivedMetadataBuilder ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferWithDerivedMetadataBuilder(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Adds the chain hash of the given [`Network`] to [`Offer::chains`]. If not called,
	 * the chain hash of [`Network::Bitcoin`] is assumed to be the only one supported.
	 * 
	 * See [`Offer::chains`] on how this relates to the payment currency.
	 * 
	 * Successive calls to this method will add another chain hash.
	 */
	public void chain(Network network) {
		bindings.OfferWithDerivedMetadataBuilder_chain(this.ptr, network);
		GC.KeepAlive(this);
		GC.KeepAlive(network);
		;
	}

	/**
	 * Sets the [`Offer::amount`] as an [`Amount::Bitcoin`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void amount_msats(long amount_msats) {
		bindings.OfferWithDerivedMetadataBuilder_amount_msats(this.ptr, amount_msats);
		GC.KeepAlive(this);
		GC.KeepAlive(amount_msats);
		;
	}

	/**
	 * Sets the [`Offer::absolute_expiry`] as seconds since the Unix epoch.
	 * Any expiry that has already passed is valid and can be checked for using [`Offer::is_expired`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void absolute_expiry(long absolute_expiry) {
		bindings.OfferWithDerivedMetadataBuilder_absolute_expiry(this.ptr, absolute_expiry);
		GC.KeepAlive(this);
		GC.KeepAlive(absolute_expiry);
		;
	}

	/**
	 * Sets the [`Offer::description`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void description(string description) {
		bindings.OfferWithDerivedMetadataBuilder_description(this.ptr, InternalUtils.encodeString(description));
		GC.KeepAlive(this);
		GC.KeepAlive(description);
		;
	}

	/**
	 * Sets the [`Offer::issuer`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void issuer(string issuer) {
		bindings.OfferWithDerivedMetadataBuilder_issuer(this.ptr, InternalUtils.encodeString(issuer));
		GC.KeepAlive(this);
		GC.KeepAlive(issuer);
		;
	}

	/**
	 * Adds a blinded path to [`Offer::paths`]. Must include at least one path if only connected by
	 * private channels or if [`Offer::issuer_signing_pubkey`] is not a public node id.
	 * 
	 * Successive calls to this method will add another blinded path. Caller is responsible for not
	 * adding duplicate paths.
	 */
	public void path(org.ldk.structs.BlindedMessagePath path) {
		bindings.OfferWithDerivedMetadataBuilder_path(this.ptr, path.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		;
	}

	/**
	 * Sets the quantity of items for [`Offer::supported_quantity`]. If not called, defaults to
	 * [`Quantity::One`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public void supported_quantity(org.ldk.structs.Quantity quantity) {
		bindings.OfferWithDerivedMetadataBuilder_supported_quantity(this.ptr, quantity.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(quantity);
		;
	}

	/**
	 * Builds an [`Offer`] from the builder's settings.
	 */
	public org.ldk.structs.Result_OfferBolt12SemanticErrorZ build() {
		long ret = bindings.OfferWithDerivedMetadataBuilder_build(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferBolt12SemanticErrorZ ret_hu_conv = Result_OfferBolt12SemanticErrorZ.constr_from_ptr(ret);
		;
		return ret_hu_conv;
	}

}
} } }
