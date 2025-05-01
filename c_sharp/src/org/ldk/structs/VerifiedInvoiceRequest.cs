using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An [`InvoiceRequest`] that has been verified by [`InvoiceRequest::verify_using_metadata`] or
 * [`InvoiceRequest::verify_using_recipient_data`] and exposes different ways to respond depending
 * on whether the signing keys were derived.
 */
public class VerifiedInvoiceRequest : CommonBase {
	internal VerifiedInvoiceRequest(object _dummy, long ptr) : base(ptr) { }
	~VerifiedInvoiceRequest() {
		if (ptr != 0) { bindings.VerifiedInvoiceRequest_free(ptr); }
	}

	/**
	 * The identifier of the [`Offer`] for which the [`InvoiceRequest`] was made.
	 */
	public org.ldk.structs.OfferId get_offer_id() {
		long ret = bindings.VerifiedInvoiceRequest_get_offer_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The identifier of the [`Offer`] for which the [`InvoiceRequest`] was made.
	 */
	public void set_offer_id(org.ldk.structs.OfferId val) {
		bindings.VerifiedInvoiceRequest_set_offer_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.VerifiedInvoiceRequest_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the VerifiedInvoiceRequest
	 */
	public org.ldk.structs.VerifiedInvoiceRequest clone() {
		long ret = bindings.VerifiedInvoiceRequest_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.VerifiedInvoiceRequest ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.VerifiedInvoiceRequest(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice (e.g., bitcoin mainnet).
	 * Payments must be denominated in units of the minimal lightning-payable unit (e.g., msats)
	 * for the selected chain.
	 */
	public byte[][] chains() {
		long ret = bindings.VerifiedInvoiceRequest_chains(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_8_len = InternalUtils.getArrayLength(ret);
		byte[][] ret_conv_8_arr = new byte[ret_conv_8_len][];
		for (int i = 0; i < ret_conv_8_len; i++) {
			long ret_conv_8 = InternalUtils.getU64ArrayElem(ret, i);
			byte[] ret_conv_8_conv = InternalUtils.decodeUint8Array(ret_conv_8);
			ret_conv_8_arr[i] = ret_conv_8_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_8_arr;
	}

	/**
	 * Opaque bytes set by the originator. Useful for authentication and validating fields since it
	 * is reflected in `invoice_request` messages along with all the other fields from the `offer`.
	 */
	public org.ldk.structs.Option_CVec_u8ZZ metadata() {
		long ret = bindings.VerifiedInvoiceRequest_metadata(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 */
	public org.ldk.structs.Option_AmountZ amount() {
		long ret = bindings.VerifiedInvoiceRequest_amount(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_AmountZ ret_hu_conv = org.ldk.structs.Option_AmountZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the payment. Intended to be displayed to the user
	 * but with the caveat that it has not been verified in any way.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.PrintableString description() {
		long ret = bindings.VerifiedInvoiceRequest_description(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the offer.
	 */
	public org.ldk.structs.OfferFeatures offer_features() {
		long ret = bindings.VerifiedInvoiceRequest_offer_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested.
	 * 
	 * If `None`, the offer does not expire.
	 */
	public org.ldk.structs.Option_u64Z absolute_expiry() {
		long ret = bindings.VerifiedInvoiceRequest_absolute_expiry(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The issuer of the offer, possibly beginning with `user@domain` or `domain`. Intended to be
	 * displayed to the user but with the caveat that it has not been verified in any way.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.PrintableString issuer() {
		long ret = bindings.VerifiedInvoiceRequest_issuer(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes. Blinded paths provide
	 * recipient privacy by obfuscating its node id.
	 */
	public BlindedMessagePath[] paths() {
		long ret = bindings.VerifiedInvoiceRequest_paths(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_20_len = InternalUtils.getArrayLength(ret);
		BlindedMessagePath[] ret_conv_20_arr = new BlindedMessagePath[ret_conv_20_len];
		for (int u = 0; u < ret_conv_20_len; u++) {
			long ret_conv_20 = InternalUtils.getU64ArrayElem(ret, u);
			org.ldk.structs.BlindedMessagePath ret_conv_20_hu_conv = null; if (ret_conv_20 < 0 || ret_conv_20 > 4096) { ret_conv_20_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret_conv_20); }
			if (ret_conv_20_hu_conv != null) { ret_conv_20_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_20_arr;
	}

	/**
	 * The quantity of items supported.
	 */
	public org.ldk.structs.Quantity supported_quantity() {
		long ret = bindings.VerifiedInvoiceRequest_supported_quantity(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Quantity ret_hu_conv = org.ldk.structs.Quantity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The public key corresponding to the key used by the recipient to sign invoices.
	 * - If [`Offer::paths`] is empty, MUST be `Some` and contain the recipient's node id for
	 * sending an [`InvoiceRequest`].
	 * - If [`Offer::paths`] is not empty, MAY be `Some` and contain a transient id.
	 * - If `None`, the signing pubkey will be the final blinded node id from the
	 * [`BlindedMessagePath`] in [`Offer::paths`] used to send the [`InvoiceRequest`].
	 * 
	 * See also [`Bolt12Invoice::signing_pubkey`].
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice::signing_pubkey`]: crate::offers::invoice::Bolt12Invoice::signing_pubkey
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public byte[] issuer_signing_pubkey() {
		long ret = bindings.VerifiedInvoiceRequest_issuer_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * An unpredictable series of bytes, typically containing information about the derivation of
	 * [`payer_signing_pubkey`].
	 * 
	 * [`payer_signing_pubkey`]: Self::payer_signing_pubkey
	 */
	public byte[] payer_metadata() {
		long ret = bindings.VerifiedInvoiceRequest_payer_metadata(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A chain from [`Offer::chains`] that the offer is valid for.
	 */
	public byte[] chain() {
		long ret = bindings.VerifiedInvoiceRequest_chain(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The amount to pay in msats (i.e., the minimum lightning-payable unit for [`chain`]), which
	 * must be greater than or equal to [`Offer::amount`], converted if necessary.
	 * 
	 * [`chain`]: Self::chain
	 */
	public org.ldk.structs.Option_u64Z amount_msats() {
		long ret = bindings.VerifiedInvoiceRequest_amount_msats(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns whether an amount was set in the request; otherwise, if [`amount_msats`] is `Some`
	 * then it was inferred from the [`Offer::amount`] and [`quantity`].
	 * 
	 * [`amount_msats`]: Self::amount_msats
	 * [`quantity`]: Self::quantity
	 */
	public bool has_amount_msats() {
		bool ret = bindings.VerifiedInvoiceRequest_has_amount_msats(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 */
	public org.ldk.structs.InvoiceRequestFeatures invoice_request_features() {
		long ret = bindings.VerifiedInvoiceRequest_invoice_request_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public org.ldk.structs.Option_u64Z quantity() {
		long ret = bindings.VerifiedInvoiceRequest_quantity(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public byte[] payer_signing_pubkey() {
		long ret = bindings.VerifiedInvoiceRequest_payer_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A payer-provided note which will be seen by the recipient and reflected back in the invoice
	 * response.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.PrintableString payer_note() {
		long ret = bindings.VerifiedInvoiceRequest_payer_note(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * If the [`Offer`] was sourced from a BIP 353 Human Readable Name, this should be set by the
	 * builder to indicate the original [`HumanReadableName`] which was resolved.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.HumanReadableName offer_from_hrn() {
		long ret = bindings.VerifiedInvoiceRequest_offer_from_hrn(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HumanReadableName ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HumanReadableName(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceBuilder`] for the request with the given required fields and using the
	 * [`Duration`] since [`std::time::SystemTime::UNIX_EPOCH`] as the creation time.
	 * 
	 * See [`InvoiceRequest::respond_with_no_std`] for further details where the aforementioned
	 * creation time is used for the `created_at` parameter.
	 * 
	 * [`Duration`]: core::time::Duration
	 */
	public org.ldk.structs.Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ respond_with(BlindedPaymentPath[] payment_paths, byte[] payment_hash) {
		long ret = bindings.VerifiedInvoiceRequest_respond_with(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(payment_paths, payment_paths_conv_20 => payment_paths_conv_20.ptr)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(payment_paths);
		GC.KeepAlive(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ ret_hu_conv = Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceBuilder`] for the request with the given required fields.
	 * 
	 * Unless [`InvoiceBuilder::relative_expiry`] is set, the invoice will expire two hours after
	 * `created_at`, which is used to set [`Bolt12Invoice::created_at`].
	 * Useful for non-`std` builds where [`std::time::SystemTime`] is not available.
	 * 
	 * The caller is expected to remember the preimage of `payment_hash` in order to claim a payment
	 * for the invoice.
	 * 
	 * The `payment_paths` parameter is useful for maintaining the payment recipient's privacy. It
	 * must contain one or more elements ordered from most-preferred to least-preferred, if there's
	 * a preference. Note, however, that any privacy is lost if a public node id was used for
	 * [`Offer::issuer_signing_pubkey`].
	 * 
	 * Errors if the request contains unknown required features.
	 * 
	 * # Note
	 * 
	 * If the originating [`Offer`] was created using [`OfferBuilder::deriving_signing_pubkey`],
	 * then first use [`InvoiceRequest::verify_using_metadata`] or
	 * [`InvoiceRequest::verify_using_recipient_data`] and then [`VerifiedInvoiceRequest`] methods
	 * instead.
	 * 
	 * [`Bolt12Invoice::created_at`]: crate::offers::invoice::Bolt12Invoice::created_at
	 * [`OfferBuilder::deriving_signing_pubkey`]: crate::offers::offer::OfferBuilder::deriving_signing_pubkey
	 */
	public org.ldk.structs.Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ respond_with_no_std(BlindedPaymentPath[] payment_paths, byte[] payment_hash, long created_at) {
		long ret = bindings.VerifiedInvoiceRequest_respond_with_no_std(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(payment_paths, payment_paths_conv_20 => payment_paths_conv_20.ptr)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)), created_at);
		GC.KeepAlive(this);
		GC.KeepAlive(payment_paths);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(created_at);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ ret_hu_conv = Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceBuilder`] for the request using the given required fields and that uses
	 * derived signing keys from the originating [`Offer`] to sign the [`Bolt12Invoice`]. Must use
	 * the same [`ExpandedKey`] as the one used to create the offer.
	 * 
	 * See [`InvoiceRequest::respond_with`] for further details.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public org.ldk.structs.Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ respond_using_derived_keys(BlindedPaymentPath[] payment_paths, byte[] payment_hash) {
		long ret = bindings.VerifiedInvoiceRequest_respond_using_derived_keys(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(payment_paths, payment_paths_conv_20 => payment_paths_conv_20.ptr)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(payment_paths);
		GC.KeepAlive(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ ret_hu_conv = Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceBuilder`] for the request using the given required fields and that uses
	 * derived signing keys from the originating [`Offer`] to sign the [`Bolt12Invoice`]. Must use
	 * the same [`ExpandedKey`] as the one used to create the offer.
	 * 
	 * See [`InvoiceRequest::respond_with_no_std`] for further details.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public org.ldk.structs.Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ respond_using_derived_keys_no_std(BlindedPaymentPath[] payment_paths, byte[] payment_hash, long created_at) {
		long ret = bindings.VerifiedInvoiceRequest_respond_using_derived_keys_no_std(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(payment_paths, payment_paths_conv_20 => payment_paths_conv_20.ptr)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)), created_at);
		GC.KeepAlive(this);
		GC.KeepAlive(payment_paths);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(created_at);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ ret_hu_conv = Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Fetch the [`InvoiceRequestFields`] for this verified invoice.
	 * 
	 * These are fields which we expect to be useful when receiving a payment for this invoice
	 * request, and include the returned [`InvoiceRequestFields`] in the
	 * [`PaymentContext::Bolt12Offer`].
	 * 
	 * [`PaymentContext::Bolt12Offer`]: crate::blinded_path::payment::PaymentContext::Bolt12Offer
	 */
	public org.ldk.structs.InvoiceRequestFields fields() {
		long ret = bindings.VerifiedInvoiceRequest_fields(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
