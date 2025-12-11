using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An `Offer` is a potentially long-lived proposal for payment of a good or service.
 * 
 * An offer is a precursor to an [`InvoiceRequest`]. A merchant publishes an offer from which a
 * customer may request an [`Bolt12Invoice`] for a specific quantity and using an amount sufficient
 * to cover that quantity (i.e., at least `quantity * amount`). See [`Offer::amount`].
 * 
 * Offers may be denominated in currency other than bitcoin but are ultimately paid using the
 * latter.
 * 
 * Through the use of [`BlindedMessagePath`]s, offers provide recipient privacy.
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
public class Offer : CommonBase {
	internal Offer(object _dummy, long ptr) : base(ptr) { }
	~Offer() {
		if (ptr != 0) { bindings.Offer_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Offer_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Offer
	 */
	public org.ldk.structs.Offer clone() {
		long ret = bindings.Offer_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Offer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Offer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice (e.g., bitcoin mainnet).
	 * Payments must be denominated in units of the minimal lightning-payable unit (e.g., msats)
	 * for the selected chain.
	 */
	public byte[][] chains() {
		long ret = bindings.Offer_chains(this.ptr);
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
		long ret = bindings.Offer_metadata(this.ptr);
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
		long ret = bindings.Offer_amount(this.ptr);
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
		long ret = bindings.Offer_description(this.ptr);
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
		long ret = bindings.Offer_offer_features(this.ptr);
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
		long ret = bindings.Offer_absolute_expiry(this.ptr);
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
		long ret = bindings.Offer_issuer(this.ptr);
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
		long ret = bindings.Offer_paths(this.ptr);
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
		long ret = bindings.Offer_supported_quantity(this.ptr);
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
		long ret = bindings.Offer_issuer_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the id of the offer.
	 */
	public org.ldk.structs.OfferId id() {
		long ret = bindings.Offer_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns whether the given chain is supported by the offer.
	 */
	public bool supports_chain(byte[] chain) {
		bool ret = bindings.Offer_supports_chain(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(chain, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(chain);
		return ret;
	}

	/**
	 * Whether the offer has expired.
	 */
	public bool is_expired() {
		bool ret = bindings.Offer_is_expired(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the offer has expired given the duration since the Unix epoch.
	 */
	public bool is_expired_no_std(long duration_since_epoch) {
		bool ret = bindings.Offer_is_expired_no_std(this.ptr, duration_since_epoch);
		GC.KeepAlive(this);
		GC.KeepAlive(duration_since_epoch);
		return ret;
	}

	/**
	 * Returns whether the given quantity is valid for the offer.
	 */
	public bool is_valid_quantity(long quantity) {
		bool ret = bindings.Offer_is_valid_quantity(this.ptr, quantity);
		GC.KeepAlive(this);
		GC.KeepAlive(quantity);
		return ret;
	}

	/**
	 * Returns whether a quantity is expected in an [`InvoiceRequest`] for the offer.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public bool expects_quantity() {
		bool ret = bindings.Offer_expects_quantity(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates an [`InvoiceRequestBuilder`] for the offer, which
	 * - derives the [`InvoiceRequest::payer_signing_pubkey`] such that a different key can be used
	 * for each request in order to protect the sender's privacy,
	 * - sets [`InvoiceRequest::payer_metadata`] when [`InvoiceRequestBuilder::build_and_sign`] is
	 * called such that it can be used by [`Bolt12Invoice::verify_using_metadata`] to determine
	 * if the invoice was requested using a base [`ExpandedKey`] from which the payer id was
	 * derived, and
	 * - includes the [`PaymentId`] encrypted in [`InvoiceRequest::payer_metadata`] so that it can
	 * be used when sending the payment for the requested invoice.
	 * 
	 * Errors if the offer contains unknown required features.
	 * 
	 * [`InvoiceRequest::payer_signing_pubkey`]: crate::offers::invoice_request::InvoiceRequest::payer_signing_pubkey
	 * [`InvoiceRequest::payer_metadata`]: crate::offers::invoice_request::InvoiceRequest::payer_metadata
	 * [`Bolt12Invoice::verify_using_metadata`]: crate::offers::invoice::Bolt12Invoice::verify_using_metadata
	 * [`ExpandedKey`]: crate::ln::inbound_payment::ExpandedKey
	 */
	public org.ldk.structs.Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ request_invoice(org.ldk.structs.ExpandedKey expanded_key, org.ldk.structs.Nonce nonce, byte[] payment_id) {
		long ret = bindings.Offer_request_invoice(this.ptr, expanded_key.ptr, nonce.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(expanded_key);
		GC.KeepAlive(nonce);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ ret_hu_conv = Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Offer.
	 */
	public long hash() {
		long ret = bindings.Offer_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Read a Offer from a byte array, created by Offer_write
	 */
	public static org.ldk.structs.Result_OfferDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Offer_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferDecodeErrorZ ret_hu_conv = Result_OfferDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Offer object into a byte array which can be read by Offer_read
	 */
	public byte[] write() {
		long ret = bindings.Offer_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Offer object from a string
	 */
	public static org.ldk.structs.Result_OfferBolt12ParseErrorZ from_str(string s) {
		long ret = bindings.Offer_from_str(InternalUtils.encodeString(s));
		GC.KeepAlive(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferBolt12ParseErrorZ ret_hu_conv = Result_OfferBolt12ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Offer object
	 */
	public string to_str() {
		long ret = bindings.Offer_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

}
} } }
