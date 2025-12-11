package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An `InvoiceRequest` is a request for a [`Bolt12Invoice`] formulated from an [`Offer`].
 * 
 * An offer may provide choices such as quantity, amount, chain, features, etc. An invoice request
 * specifies these such that its recipient can send an invoice for payment.
 * 
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 * [`Offer`]: crate::offers::offer::Offer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InvoiceRequest extends CommonBase {
	InvoiceRequest(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InvoiceRequest_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.InvoiceRequest_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceRequest
	 */
	public InvoiceRequest clone() {
		long ret = bindings.InvoiceRequest_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequest ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequest(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice (e.g., bitcoin mainnet).
	 * Payments must be denominated in units of the minimal lightning-payable unit (e.g., msats)
	 * for the selected chain.
	 */
	public byte[][] chains() {
		byte[][] ret = bindings.InvoiceRequest_chains(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Opaque bytes set by the originator. Useful for authentication and validating fields since it
	 * is reflected in `invoice_request` messages along with all the other fields from the `offer`.
	 */
	public Option_CVec_u8ZZ metadata() {
		long ret = bindings.InvoiceRequest_metadata(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 */
	public Option_AmountZ amount() {
		long ret = bindings.InvoiceRequest_amount(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_AmountZ ret_hu_conv = org.ldk.structs.Option_AmountZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the payment. Intended to be displayed to the user
	 * but with the caveat that it has not been verified in any way.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PrintableString description() {
		long ret = bindings.InvoiceRequest_description(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the offer.
	 */
	public OfferFeatures offer_features() {
		long ret = bindings.InvoiceRequest_offer_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested.
	 * 
	 * If `None`, the offer does not expire.
	 */
	public Option_u64Z absolute_expiry() {
		long ret = bindings.InvoiceRequest_absolute_expiry(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The issuer of the offer, possibly beginning with `user@domain` or `domain`. Intended to be
	 * displayed to the user but with the caveat that it has not been verified in any way.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PrintableString issuer() {
		long ret = bindings.InvoiceRequest_issuer(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes. Blinded paths provide
	 * recipient privacy by obfuscating its node id.
	 */
	public BlindedMessagePath[] paths() {
		long[] ret = bindings.InvoiceRequest_paths(this.ptr);
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
	 */
	public Quantity supported_quantity() {
		long ret = bindings.InvoiceRequest_supported_quantity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Quantity ret_hu_conv = org.ldk.structs.Quantity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	@Nullable
	public byte[] issuer_signing_pubkey() {
		byte[] ret = bindings.InvoiceRequest_issuer_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * An unpredictable series of bytes, typically containing information about the derivation of
	 * [`payer_signing_pubkey`].
	 * 
	 * [`payer_signing_pubkey`]: Self::payer_signing_pubkey
	 */
	public byte[] payer_metadata() {
		byte[] ret = bindings.InvoiceRequest_payer_metadata(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A chain from [`Offer::chains`] that the offer is valid for.
	 */
	public byte[] chain() {
		byte[] ret = bindings.InvoiceRequest_chain(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The amount to pay in msats (i.e., the minimum lightning-payable unit for [`chain`]), which
	 * must be greater than or equal to [`Offer::amount`], converted if necessary.
	 * 
	 * [`chain`]: Self::chain
	 */
	public Option_u64Z amount_msats() {
		long ret = bindings.InvoiceRequest_amount_msats(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns whether an amount was set in the request; otherwise, if [`amount_msats`] is `Some`
	 * then it was inferred from the [`Offer::amount`] and [`quantity`].
	 * 
	 * [`amount_msats`]: Self::amount_msats
	 * [`quantity`]: Self::quantity
	 */
	public boolean has_amount_msats() {
		boolean ret = bindings.InvoiceRequest_has_amount_msats(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 */
	public InvoiceRequestFeatures invoice_request_features() {
		long ret = bindings.InvoiceRequest_invoice_request_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public Option_u64Z quantity() {
		long ret = bindings.InvoiceRequest_quantity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public byte[] payer_signing_pubkey() {
		byte[] ret = bindings.InvoiceRequest_payer_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A payer-provided note which will be seen by the recipient and reflected back in the invoice
	 * response.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PrintableString payer_note() {
		long ret = bindings.InvoiceRequest_payer_note(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * If the [`Offer`] was sourced from a BIP 353 Human Readable Name, this should be set by the
	 * builder to indicate the original [`HumanReadableName`] which was resolved.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public HumanReadableName offer_from_hrn() {
		long ret = bindings.InvoiceRequest_offer_from_hrn(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HumanReadableName ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HumanReadableName(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ respond_with(BlindedPaymentPath[] payment_paths, byte[] payment_hash) {
		long ret = bindings.InvoiceRequest_respond_with(this.ptr, payment_paths != null ? Arrays.stream(payment_paths).mapToLong(payment_paths_conv_20 -> payment_paths_conv_20.ptr).toArray() : null, InternalUtils.check_arr_len(payment_hash, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_paths);
		Reference.reachabilityFence(payment_hash);
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
	public Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ respond_with_no_std(BlindedPaymentPath[] payment_paths, byte[] payment_hash, long created_at) {
		long ret = bindings.InvoiceRequest_respond_with_no_std(this.ptr, payment_paths != null ? Arrays.stream(payment_paths).mapToLong(payment_paths_conv_20 -> payment_paths_conv_20.ptr).toArray() : null, InternalUtils.check_arr_len(payment_hash, 32), created_at);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_paths);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(created_at);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ ret_hu_conv = Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies that the request was for an offer created using the given key by checking the
	 * metadata from the offer.
	 * 
	 * Returns the verified request which contains the derived keys needed to sign a
	 * [`Bolt12Invoice`] for the request if they could be extracted from the metadata.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public Result_VerifiedInvoiceRequestNoneZ verify_using_metadata(org.ldk.structs.ExpandedKey key) {
		long ret = bindings.InvoiceRequest_verify_using_metadata(this.ptr, key.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_VerifiedInvoiceRequestNoneZ ret_hu_conv = Result_VerifiedInvoiceRequestNoneZ.constr_from_ptr(ret);
		;
		return ret_hu_conv;
	}

	/**
	 * Verifies that the request was for an offer created using the given key by checking a nonce
	 * included with the [`BlindedMessagePath`] for which the request was sent through.
	 * 
	 * Returns the verified request which contains the derived keys needed to sign a
	 * [`Bolt12Invoice`] for the request if they could be extracted from the metadata.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public Result_VerifiedInvoiceRequestNoneZ verify_using_recipient_data(org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey key) {
		long ret = bindings.InvoiceRequest_verify_using_recipient_data(this.ptr, nonce.ptr, key.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(nonce);
		Reference.reachabilityFence(key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_VerifiedInvoiceRequestNoneZ ret_hu_conv = Result_VerifiedInvoiceRequestNoneZ.constr_from_ptr(ret);
		;
		return ret_hu_conv;
	}

	/**
	 * Signature of the invoice request using [`payer_signing_pubkey`].
	 * 
	 * [`payer_signing_pubkey`]: Self::payer_signing_pubkey
	 */
	public byte[] signature() {
		byte[] ret = bindings.InvoiceRequest_signature(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the InvoiceRequest object into a byte array which can be read by InvoiceRequest_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InvoiceRequest_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a InvoiceRequest from a byte array, created by InvoiceRequest_write
	 */
	public static Result_InvoiceRequestDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InvoiceRequest_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceRequestDecodeErrorZ ret_hu_conv = Result_InvoiceRequestDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
