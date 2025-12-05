using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A semantically valid [`Bolt12Invoice`] that hasn't been signed.
 * 
 * # Serialization
 * 
 * This is serialized as a TLV stream, which includes TLV records from the originating message. As
 * such, it may include unknown, odd TLV records.
 */
public class UnsignedBolt12Invoice : CommonBase {
	internal UnsignedBolt12Invoice(object _dummy, long ptr) : base(ptr) { }
	~UnsignedBolt12Invoice() {
		if (ptr != 0) { bindings.UnsignedBolt12Invoice_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.UnsignedBolt12Invoice_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedBolt12Invoice
	 */
	public org.ldk.structs.UnsignedBolt12Invoice clone() {
		long ret = bindings.UnsignedBolt12Invoice_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedBolt12Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedBolt12Invoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the [`TaggedHash`] of the invoice to sign.
	 */
	public org.ldk.structs.TaggedHash tagged_hash() {
		long ret = bindings.UnsignedBolt12Invoice_tagged_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TaggedHash ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TaggedHash(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes, including information
	 * needed for routing payments across them.
	 * 
	 * Blinded paths provide recipient privacy by obfuscating its node id. Note, however, that this
	 * privacy is lost if a public node id is used for
	 * [`UnsignedBolt12Invoice::signing_pubkey`].
	 */
	public BlindedPaymentPath[] payment_paths() {
		long ret = bindings.UnsignedBolt12Invoice_payment_paths(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_20_len = InternalUtils.getArrayLength(ret);
		BlindedPaymentPath[] ret_conv_20_arr = new BlindedPaymentPath[ret_conv_20_len];
		for (int u = 0; u < ret_conv_20_len; u++) {
			long ret_conv_20 = InternalUtils.getU64ArrayElem(ret, u);
			org.ldk.structs.BlindedPaymentPath ret_conv_20_hu_conv = null; if (ret_conv_20 < 0 || ret_conv_20 > 4096) { ret_conv_20_hu_conv = new org.ldk.structs.BlindedPaymentPath(null, ret_conv_20); }
			if (ret_conv_20_hu_conv != null) { ret_conv_20_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_20_arr;
	}

	/**
	 * Duration since the Unix epoch when the invoice was created.
	 */
	public long created_at() {
		long ret = bindings.UnsignedBolt12Invoice_created_at(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Duration since
	 * [`UnsignedBolt12Invoice::created_at`]
	 * when the invoice has expired and therefore should no longer be paid.
	 */
	public long relative_expiry() {
		long ret = bindings.UnsignedBolt12Invoice_relative_expiry(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired.
	 */
	public bool is_expired() {
		bool ret = bindings.UnsignedBolt12Invoice_is_expired(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired given the current time as duration since the Unix epoch.
	 */
	public bool is_expired_no_std(long duration_since_epoch) {
		bool ret = bindings.UnsignedBolt12Invoice_is_expired_no_std(this.ptr, duration_since_epoch);
		GC.KeepAlive(this);
		GC.KeepAlive(duration_since_epoch);
		return ret;
	}

	/**
	 * Fallback addresses for paying the invoice on-chain, in order of most-preferred to
	 * least-preferred.
	 */
	public Address[] fallbacks() {
		long ret = bindings.UnsignedBolt12Invoice_fallbacks(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_9_len = InternalUtils.getArrayLength(ret);
		Address[] ret_conv_9_arr = new Address[ret_conv_9_len];
		for (int j = 0; j < ret_conv_9_len; j++) {
			long ret_conv_9 = InternalUtils.getU64ArrayElem(ret, j);
			Address ret_conv_9_conv = new Address(null, ret_conv_9);
			ret_conv_9_arr[j] = ret_conv_9_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_9_arr;
	}

	/**
	 * Features pertaining to paying an invoice.
	 */
	public org.ldk.structs.Bolt12InvoiceFeatures invoice_features() {
		long ret = bindings.UnsignedBolt12Invoice_invoice_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A typically transient public key corresponding to the key used to sign the invoice.
	 * 
	 * If the invoices was created in response to an [`Offer`], then this will be:
	 * - [`Offer::issuer_signing_pubkey`] if it's `Some`, otherwise
	 * - the final blinded node id from a [`BlindedMessagePath`] in [`Offer::paths`] if `None`.
	 * 
	 * If the invoice was created in response to a [`Refund`], then it is a valid pubkey chosen by
	 * the recipient.
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 * [`Refund`]: crate::offers::refund::Refund
	 */
	public byte[] signing_pubkey() {
		long ret = bindings.UnsignedBolt12Invoice_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice.
	 * 
	 * From [`Offer::chains`]; `None` if the invoice was created in response to a [`Refund`].
	 * 
	 * [`Offer::chains`]: crate::offers::offer::Offer::chains
	 */
	public org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ offer_chains() {
		long ret = bindings.UnsignedBolt12Invoice_offer_chains(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ ret_hu_conv = org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The chain that must be used when paying the invoice; selected from [`offer_chains`] if the
	 * invoice originated from an offer.
	 * 
	 * From [`InvoiceRequest::chain`] or [`Refund::chain`].
	 * 
	 * [`offer_chains`]: Self::offer_chains
	 * [`InvoiceRequest::chain`]: crate::offers::invoice_request::InvoiceRequest::chain
	 */
	public byte[] chain() {
		long ret = bindings.UnsignedBolt12Invoice_chain(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Opaque bytes set by the originating [`Offer`].
	 * 
	 * From [`Offer::metadata`]; `None` if the invoice was created in response to a [`Refund`] or
	 * if the [`Offer`] did not set it.
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::metadata`]: crate::offers::offer::Offer::metadata
	 */
	public org.ldk.structs.Option_CVec_u8ZZ metadata() {
		long ret = bindings.UnsignedBolt12Invoice_metadata(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 * 
	 * From [`Offer::amount`]; `None` if the invoice was created in response to a [`Refund`] or if
	 * the [`Offer`] did not set it.
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::amount`]: crate::offers::offer::Offer::amount
	 */
	public org.ldk.structs.Option_AmountZ amount() {
		long ret = bindings.UnsignedBolt12Invoice_amount(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_AmountZ ret_hu_conv = org.ldk.structs.Option_AmountZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the originating [`Offer`].
	 * 
	 * From [`Offer::offer_features`]; `None` if the invoice was created in response to a
	 * [`Refund`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::offer_features`]: crate::offers::offer::Offer::offer_features
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.OfferFeatures offer_features() {
		long ret = bindings.UnsignedBolt12Invoice_offer_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the originating offer or refund.
	 * 
	 * From [`Offer::description`] or [`Refund::description`].
	 * 
	 * [`Offer::description`]: crate::offers::offer::Offer::description
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.PrintableString description() {
		long ret = bindings.UnsignedBolt12Invoice_description(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested.
	 * 
	 * From [`Offer::absolute_expiry`] or [`Refund::absolute_expiry`].
	 * 
	 * [`Offer::absolute_expiry`]: crate::offers::offer::Offer::absolute_expiry
	 */
	public org.ldk.structs.Option_u64Z absolute_expiry() {
		long ret = bindings.UnsignedBolt12Invoice_absolute_expiry(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The issuer of the offer or refund.
	 * 
	 * From [`Offer::issuer`] or [`Refund::issuer`].
	 * 
	 * [`Offer::issuer`]: crate::offers::offer::Offer::issuer
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.PrintableString issuer() {
		long ret = bindings.UnsignedBolt12Invoice_issuer(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes.
	 * 
	 * From [`Offer::paths`] or [`Refund::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public BlindedMessagePath[] message_paths() {
		long ret = bindings.UnsignedBolt12Invoice_message_paths(this.ptr);
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
	 * 
	 * From [`Offer::supported_quantity`]; `None` if the invoice was created in response to a
	 * [`Refund`].
	 * 
	 * [`Offer::supported_quantity`]: crate::offers::offer::Offer::supported_quantity
	 */
	public org.ldk.structs.Option_QuantityZ supported_quantity() {
		long ret = bindings.UnsignedBolt12Invoice_supported_quantity(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_QuantityZ ret_hu_conv = org.ldk.structs.Option_QuantityZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The public key used by the recipient to sign invoices.
	 * 
	 * From [`Offer::issuer_signing_pubkey`] and may be `None`; also `None` if the invoice was
	 * created in response to a [`Refund`].
	 * 
	 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public byte[] issuer_signing_pubkey() {
		long ret = bindings.UnsignedBolt12Invoice_issuer_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * An unpredictable series of bytes from the payer.
	 * 
	 * From [`InvoiceRequest::payer_metadata`] or [`Refund::payer_metadata`].
	 */
	public byte[] payer_metadata() {
		long ret = bindings.UnsignedBolt12Invoice_payer_metadata(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 * 
	 * From [`InvoiceRequest::invoice_request_features`] or [`Refund::features`].
	 */
	public org.ldk.structs.InvoiceRequestFeatures invoice_request_features() {
		long ret = bindings.UnsignedBolt12Invoice_invoice_request_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The quantity of items requested or refunded for.
	 * 
	 * From [`InvoiceRequest::quantity`] or [`Refund::quantity`].
	 */
	public org.ldk.structs.Option_u64Z quantity() {
		long ret = bindings.UnsignedBolt12Invoice_quantity(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request or to send an invoice for a
	 * refund in case there are no [`message_paths`].
	 * 
	 * [`message_paths`]: Self::message_paths
	 */
	public byte[] payer_signing_pubkey() {
		long ret = bindings.UnsignedBolt12Invoice_payer_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A payer-provided note reflected back in the invoice.
	 * 
	 * From [`InvoiceRequest::payer_note`] or [`Refund::payer_note`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.PrintableString payer_note() {
		long ret = bindings.UnsignedBolt12Invoice_payer_note(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * SHA256 hash of the payment preimage that will be given in return for paying the invoice.
	 */
	public byte[] payment_hash() {
		long ret = bindings.UnsignedBolt12Invoice_payment_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The minimum amount required for a successful payment of the invoice.
	 */
	public long amount_msats() {
		long ret = bindings.UnsignedBolt12Invoice_amount_msats(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Serialize the UnsignedBolt12Invoice object into a byte array which can be read by UnsignedBolt12Invoice_read
	 */
	public byte[] write() {
		long ret = bindings.UnsignedBolt12Invoice_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
