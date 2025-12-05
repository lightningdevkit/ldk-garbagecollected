package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A `Bolt12Invoice` is a payment request, typically corresponding to an [`Offer`] or a [`Refund`].
 * 
 * An invoice may be sent in response to an [`InvoiceRequest`] in the case of an offer or sent
 * directly after scanning a refund. It includes all the information needed to pay a recipient.
 * 
 * [`Offer`]: crate::offers::offer::Offer
 * [`Refund`]: crate::offers::refund::Refund
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt12Invoice extends CommonBase {
	Bolt12Invoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt12Invoice_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.Bolt12Invoice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12Invoice
	 */
	public Bolt12Invoice clone() {
		long ret = bindings.Bolt12Invoice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12Invoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes, including information
	 * needed for routing payments across them.
	 * 
	 * Blinded paths provide recipient privacy by obfuscating its node id. Note, however, that this
	 * privacy is lost if a public node id is used for
	 * [`Bolt12Invoice::signing_pubkey`].
	 */
	public BlindedPaymentPath[] payment_paths() {
		long[] ret = bindings.Bolt12Invoice_payment_paths(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_20_len = ret.length;
		BlindedPaymentPath[] ret_conv_20_arr = new BlindedPaymentPath[ret_conv_20_len];
		for (int u = 0; u < ret_conv_20_len; u++) {
			long ret_conv_20 = ret[u];
			org.ldk.structs.BlindedPaymentPath ret_conv_20_hu_conv = null; if (ret_conv_20 < 0 || ret_conv_20 > 4096) { ret_conv_20_hu_conv = new org.ldk.structs.BlindedPaymentPath(null, ret_conv_20); }
			if (ret_conv_20_hu_conv != null) { ret_conv_20_hu_conv.ptrs_to.add(this); };
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		return ret_conv_20_arr;
	}

	/**
	 * Duration since the Unix epoch when the invoice was created.
	 */
	public long created_at() {
		long ret = bindings.Bolt12Invoice_created_at(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Duration since
	 * [`Bolt12Invoice::created_at`]
	 * when the invoice has expired and therefore should no longer be paid.
	 */
	public long relative_expiry() {
		long ret = bindings.Bolt12Invoice_relative_expiry(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired.
	 */
	public boolean is_expired() {
		boolean ret = bindings.Bolt12Invoice_is_expired(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired given the current time as duration since the Unix epoch.
	 */
	public boolean is_expired_no_std(long duration_since_epoch) {
		boolean ret = bindings.Bolt12Invoice_is_expired_no_std(this.ptr, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(duration_since_epoch);
		return ret;
	}

	/**
	 * Fallback addresses for paying the invoice on-chain, in order of most-preferred to
	 * least-preferred.
	 */
	public Address[] fallbacks() {
		long[] ret = bindings.Bolt12Invoice_fallbacks(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_9_len = ret.length;
		Address[] ret_conv_9_arr = new Address[ret_conv_9_len];
		for (int j = 0; j < ret_conv_9_len; j++) {
			long ret_conv_9 = ret[j];
			Address ret_conv_9_conv = new Address(null, ret_conv_9);
			ret_conv_9_arr[j] = ret_conv_9_conv;
		}
		return ret_conv_9_arr;
	}

	/**
	 * Features pertaining to paying an invoice.
	 */
	public Bolt12InvoiceFeatures invoice_features() {
		long ret = bindings.Bolt12Invoice_invoice_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
		byte[] ret = bindings.Bolt12Invoice_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The chains that may be used when paying a requested invoice.
	 * 
	 * From [`Offer::chains`]; `None` if the invoice was created in response to a [`Refund`].
	 * 
	 * [`Offer::chains`]: crate::offers::offer::Offer::chains
	 */
	public Option_CVec_ThirtyTwoBytesZZ offer_chains() {
		long ret = bindings.Bolt12Invoice_offer_chains(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ ret_hu_conv = org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
		byte[] ret = bindings.Bolt12Invoice_chain(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
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
	public Option_CVec_u8ZZ metadata() {
		long ret = bindings.Bolt12Invoice_metadata(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public Option_AmountZ amount() {
		long ret = bindings.Bolt12Invoice_amount(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_AmountZ ret_hu_conv = org.ldk.structs.Option_AmountZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	@Nullable
	public OfferFeatures offer_features() {
		long ret = bindings.Bolt12Invoice_offer_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	@Nullable
	public PrintableString description() {
		long ret = bindings.Bolt12Invoice_description(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested.
	 * 
	 * From [`Offer::absolute_expiry`] or [`Refund::absolute_expiry`].
	 * 
	 * [`Offer::absolute_expiry`]: crate::offers::offer::Offer::absolute_expiry
	 */
	public Option_u64Z absolute_expiry() {
		long ret = bindings.Bolt12Invoice_absolute_expiry(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	@Nullable
	public PrintableString issuer() {
		long ret = bindings.Bolt12Invoice_issuer(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
		long[] ret = bindings.Bolt12Invoice_message_paths(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_20_len = ret.length;
		BlindedMessagePath[] ret_conv_20_arr = new BlindedMessagePath[ret_conv_20_len];
		for (int u = 0; u < ret_conv_20_len; u++) {
			long ret_conv_20 = ret[u];
			org.ldk.structs.BlindedMessagePath ret_conv_20_hu_conv = null; if (ret_conv_20 < 0 || ret_conv_20 > 4096) { ret_conv_20_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret_conv_20); }
			if (ret_conv_20_hu_conv != null) { ret_conv_20_hu_conv.ptrs_to.add(this); };
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
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
	public Option_QuantityZ supported_quantity() {
		long ret = bindings.Bolt12Invoice_supported_quantity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_QuantityZ ret_hu_conv = org.ldk.structs.Option_QuantityZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	@Nullable
	public byte[] issuer_signing_pubkey() {
		byte[] ret = bindings.Bolt12Invoice_issuer_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * An unpredictable series of bytes from the payer.
	 * 
	 * From [`InvoiceRequest::payer_metadata`] or [`Refund::payer_metadata`].
	 */
	public byte[] payer_metadata() {
		byte[] ret = bindings.Bolt12Invoice_payer_metadata(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 * 
	 * From [`InvoiceRequest::invoice_request_features`] or [`Refund::features`].
	 */
	public InvoiceRequestFeatures invoice_request_features() {
		long ret = bindings.Bolt12Invoice_invoice_request_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The quantity of items requested or refunded for.
	 * 
	 * From [`InvoiceRequest::quantity`] or [`Refund::quantity`].
	 */
	public Option_u64Z quantity() {
		long ret = bindings.Bolt12Invoice_quantity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request or to send an invoice for a
	 * refund in case there are no [`message_paths`].
	 * 
	 * [`message_paths`]: Self::message_paths
	 */
	public byte[] payer_signing_pubkey() {
		byte[] ret = bindings.Bolt12Invoice_payer_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A payer-provided note reflected back in the invoice.
	 * 
	 * From [`InvoiceRequest::payer_note`] or [`Refund::payer_note`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PrintableString payer_note() {
		long ret = bindings.Bolt12Invoice_payer_note(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * SHA256 hash of the payment preimage that will be given in return for paying the invoice.
	 */
	public byte[] payment_hash() {
		byte[] ret = bindings.Bolt12Invoice_payment_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum amount required for a successful payment of the invoice.
	 */
	public long amount_msats() {
		long ret = bindings.Bolt12Invoice_amount_msats(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Signature of the invoice verified using [`Bolt12Invoice::signing_pubkey`].
	 */
	public byte[] signature() {
		byte[] ret = bindings.Bolt12Invoice_signature(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Hash that was used for signing the invoice.
	 */
	public byte[] signable_hash() {
		byte[] ret = bindings.Bolt12Invoice_signable_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the [`OfferId`] if this invoice corresponds to an [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public OfferId offer_id() {
		long ret = bindings.Bolt12Invoice_offer_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Verifies that the invoice was for a request or refund created using the given key by
	 * checking the payer metadata from the invoice request.
	 * 
	 * Returns the associated [`PaymentId`] to use when sending the payment.
	 */
	public Result_ThirtyTwoBytesNoneZ verify_using_metadata(org.ldk.structs.ExpandedKey key) {
		long ret = bindings.Bolt12Invoice_verify_using_metadata(this.ptr, key.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies that the invoice was for a request or refund created using the given key by
	 * checking a payment id and nonce included with the [`BlindedMessagePath`] for which the invoice was
	 * sent through.
	 */
	public Result_ThirtyTwoBytesNoneZ verify_using_payer_data(byte[] payment_id, org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey key) {
		long ret = bindings.Bolt12Invoice_verify_using_payer_data(this.ptr, InternalUtils.check_arr_len(payment_id, 32), nonce.ptr, key.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(nonce);
		Reference.reachabilityFence(key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the [`TaggedHash`] of the invoice that was signed.
	 */
	public TaggedHash tagged_hash() {
		long ret = bindings.Bolt12Invoice_tagged_hash(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TaggedHash ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TaggedHash(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt12Invoice.
	 */
	public long hash() {
		long ret = bindings.Bolt12Invoice_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Serialize the Bolt12Invoice object into a byte array which can be read by Bolt12Invoice_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Bolt12Invoice_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Bolt12Invoice from a byte array, created by Bolt12Invoice_write
	 */
	public static Result_Bolt12InvoiceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Bolt12Invoice_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt12InvoiceDecodeErrorZ ret_hu_conv = Result_Bolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
