package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A semantically valid [`Bolt12Invoice`] that hasn't been signed.
 * 
 * # Serialization
 * 
 * This is serialized as a TLV stream, which includes TLV records from the originating message. As
 * such, it may include unknown, odd TLV records.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedBolt12Invoice extends CommonBase {
	UnsignedBolt12Invoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedBolt12Invoice_free(ptr); }
	}

	/**
	 * Returns the [`TaggedHash`] of the invoice to sign.
	 */
	public TaggedHash tagged_hash() {
		long ret = bindings.UnsignedBolt12Invoice_tagged_hash(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TaggedHash ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TaggedHash(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice.
	 * 
	 * From [`Offer::chains`]; `None` if the invoice was created in response to a [`Refund`].
	 * 
	 * [`Offer::chains`]: crate::offers::offer::Offer::chains
	 */
	public Option_CVec_ThirtyTwoBytesZZ offer_chains() {
		long ret = bindings.UnsignedBolt12Invoice_offer_chains(this.ptr);
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
		byte[] ret = bindings.UnsignedBolt12Invoice_chain(this.ptr);
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
		long ret = bindings.UnsignedBolt12Invoice_metadata(this.ptr);
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
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Amount amount() {
		long ret = bindings.UnsignedBolt12Invoice_amount(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Amount ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Amount(null, ret); }
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
		long ret = bindings.UnsignedBolt12Invoice_offer_features(this.ptr);
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
	 */
	public PrintableString description() {
		long ret = bindings.UnsignedBolt12Invoice_description(this.ptr);
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
		long ret = bindings.UnsignedBolt12Invoice_absolute_expiry(this.ptr);
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
		long ret = bindings.UnsignedBolt12Invoice_issuer(this.ptr);
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
	public BlindedPath[] message_paths() {
		long[] ret = bindings.UnsignedBolt12Invoice_message_paths(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_13_len = ret.length;
		BlindedPath[] ret_conv_13_arr = new BlindedPath[ret_conv_13_len];
		for (int n = 0; n < ret_conv_13_len; n++) {
			long ret_conv_13 = ret[n];
			org.ldk.structs.BlindedPath ret_conv_13_hu_conv = null; if (ret_conv_13 < 0 || ret_conv_13 > 4096) { ret_conv_13_hu_conv = new org.ldk.structs.BlindedPath(null, ret_conv_13); }
			if (ret_conv_13_hu_conv != null) { ret_conv_13_hu_conv.ptrs_to.add(this); };
			ret_conv_13_arr[n] = ret_conv_13_hu_conv;
		}
		return ret_conv_13_arr;
	}

	/**
	 * The quantity of items supported.
	 * 
	 * From [`Offer::supported_quantity`]; `None` if the invoice was created in response to a
	 * [`Refund`].
	 * 
	 * [`Offer::supported_quantity`]: crate::offers::offer::Offer::supported_quantity
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Quantity supported_quantity() {
		long ret = bindings.UnsignedBolt12Invoice_supported_quantity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Quantity ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Quantity(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * An unpredictable series of bytes from the payer.
	 * 
	 * From [`InvoiceRequest::payer_metadata`] or [`Refund::payer_metadata`].
	 */
	public byte[] payer_metadata() {
		byte[] ret = bindings.UnsignedBolt12Invoice_payer_metadata(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 * 
	 * From [`InvoiceRequest::invoice_request_features`] or [`Refund::features`].
	 */
	public InvoiceRequestFeatures invoice_request_features() {
		long ret = bindings.UnsignedBolt12Invoice_invoice_request_features(this.ptr);
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
		long ret = bindings.UnsignedBolt12Invoice_quantity(this.ptr);
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
	public byte[] payer_id() {
		byte[] ret = bindings.UnsignedBolt12Invoice_payer_id(this.ptr);
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
		long ret = bindings.UnsignedBolt12Invoice_payer_note(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when the invoice was created.
	 */
	public long created_at() {
		long ret = bindings.UnsignedBolt12Invoice_created_at(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Duration since [`Bolt12Invoice::created_at`] when the invoice has expired and therefore
	 * should no longer be paid.
	 */
	public long relative_expiry() {
		long ret = bindings.UnsignedBolt12Invoice_relative_expiry(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired.
	 */
	public boolean is_expired() {
		boolean ret = bindings.UnsignedBolt12Invoice_is_expired(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * SHA256 hash of the payment preimage that will be given in return for paying the invoice.
	 */
	public byte[] payment_hash() {
		byte[] ret = bindings.UnsignedBolt12Invoice_payment_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum amount required for a successful payment of the invoice.
	 */
	public long amount_msats() {
		long ret = bindings.UnsignedBolt12Invoice_amount_msats(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Features pertaining to paying an invoice.
	 */
	public Bolt12InvoiceFeatures invoice_features() {
		long ret = bindings.UnsignedBolt12Invoice_invoice_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The public key corresponding to the key used to sign the invoice.
	 */
	public byte[] signing_pubkey() {
		byte[] ret = bindings.UnsignedBolt12Invoice_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the UnsignedBolt12Invoice object into a byte array which can be read by UnsignedBolt12Invoice_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UnsignedBolt12Invoice_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
