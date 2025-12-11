package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A `StaticInvoice` is a reusable payment request corresponding to an [`Offer`].
 * 
 * A static invoice may be sent in response to an [`InvoiceRequest`] and includes all the
 * information needed to pay the recipient. However, unlike [`Bolt12Invoice`]s, static invoices do
 * not provide proof-of-payment. Therefore, [`Bolt12Invoice`]s should be preferred when the
 * recipient is online to provide one.
 * 
 * [`Offer`]: crate::offers::offer::Offer
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class StaticInvoice extends CommonBase {
	StaticInvoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.StaticInvoice_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.StaticInvoice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the StaticInvoice
	 */
	public StaticInvoice clone() {
		long ret = bindings.StaticInvoice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the StaticInvoice.
	 */
	public long hash() {
		long ret = bindings.StaticInvoice_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Paths to the recipient originating from publicly reachable nodes, including information
	 * needed for routing payments across them.
	 * 
	 * Blinded paths provide recipient privacy by obfuscating its node id. Note, however, that this
	 * privacy is lost if a public node id is used for
	 * [`StaticInvoice::signing_pubkey`].
	 */
	public BlindedPaymentPath[] payment_paths() {
		long[] ret = bindings.StaticInvoice_payment_paths(this.ptr);
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
		long ret = bindings.StaticInvoice_created_at(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Duration since
	 * [`StaticInvoice::created_at`]
	 * when the invoice has expired and therefore should no longer be paid.
	 */
	public long relative_expiry() {
		long ret = bindings.StaticInvoice_relative_expiry(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired.
	 */
	public boolean is_expired() {
		boolean ret = bindings.StaticInvoice_is_expired(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired given the current time as duration since the Unix epoch.
	 */
	public boolean is_expired_no_std(long duration_since_epoch) {
		boolean ret = bindings.StaticInvoice_is_expired_no_std(this.ptr, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(duration_since_epoch);
		return ret;
	}

	/**
	 * Fallback addresses for paying the invoice on-chain, in order of most-preferred to
	 * least-preferred.
	 */
	public Address[] fallbacks() {
		long[] ret = bindings.StaticInvoice_fallbacks(this.ptr);
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
		long ret = bindings.StaticInvoice_invoice_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The public key corresponding to the key used to sign the invoice.
	 * 
	 * This will be:
	 * - [`Offer::issuer_signing_pubkey`] if it's `Some`, otherwise
	 * - the final blinded node id from a [`BlindedMessagePath`] in [`Offer::paths`] if `None`.
	 * 
	 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public byte[] signing_pubkey() {
		byte[] ret = bindings.StaticInvoice_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The chain that must be used when paying the invoice. [`StaticInvoice`]s currently can only be
	 * created from offers that support a single chain.
	 */
	public byte[] chain() {
		byte[] ret = bindings.StaticInvoice_chain(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Opaque bytes set by the originating [`Offer::metadata`].
	 * 
	 * [`Offer::metadata`]: crate::offers::offer::Offer::metadata
	 */
	public Option_CVec_u8ZZ metadata() {
		long ret = bindings.StaticInvoice_metadata(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 * 
	 * From [`Offer::amount`].
	 * 
	 * [`Offer::amount`]: crate::offers::offer::Offer::amount
	 */
	public Option_AmountZ amount() {
		long ret = bindings.StaticInvoice_amount(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_AmountZ ret_hu_conv = org.ldk.structs.Option_AmountZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the originating [`Offer`], from [`Offer::offer_features`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::offer_features`]: crate::offers::offer::Offer::offer_features
	 */
	public OfferFeatures offer_features() {
		long ret = bindings.StaticInvoice_offer_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the originating offer, from [`Offer::description`].
	 * 
	 * [`Offer::description`]: crate::offers::offer::Offer::description
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PrintableString description() {
		long ret = bindings.StaticInvoice_description(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested, from
	 * [`Offer::absolute_expiry`].
	 * 
	 * [`Offer::absolute_expiry`]: crate::offers::offer::Offer::absolute_expiry
	 */
	public Option_u64Z absolute_expiry() {
		long ret = bindings.StaticInvoice_absolute_expiry(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The issuer of the offer, from [`Offer::issuer`].
	 * 
	 * [`Offer::issuer`]: crate::offers::offer::Offer::issuer
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PrintableString issuer() {
		long ret = bindings.StaticInvoice_issuer(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Paths to the node that may supply the invoice on the recipient's behalf, originating from
	 * publicly reachable nodes. Taken from [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public BlindedMessagePath[] offer_message_paths() {
		long[] ret = bindings.StaticInvoice_offer_message_paths(this.ptr);
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
	 * Paths to the recipient for indicating that a held HTLC is available to claim when they next
	 * come online.
	 */
	public BlindedMessagePath[] message_paths() {
		long[] ret = bindings.StaticInvoice_message_paths(this.ptr);
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
	 * The quantity of items supported, from [`Offer::supported_quantity`].
	 * 
	 * [`Offer::supported_quantity`]: crate::offers::offer::Offer::supported_quantity
	 */
	public Quantity supported_quantity() {
		long ret = bindings.StaticInvoice_supported_quantity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Quantity ret_hu_conv = org.ldk.structs.Quantity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The public key used by the recipient to sign invoices, from
	 * [`Offer::issuer_signing_pubkey`].
	 * 
	 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public byte[] issuer_signing_pubkey() {
		byte[] ret = bindings.StaticInvoice_issuer_signing_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Signature of the invoice verified using [`StaticInvoice::signing_pubkey`].
	 */
	public byte[] signature() {
		byte[] ret = bindings.StaticInvoice_signature(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the [`Offer`] that this invoice is based on is expired.
	 */
	public boolean is_offer_expired() {
		boolean ret = bindings.StaticInvoice_is_offer_expired(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the [`Offer`] that this invoice is based on is expired, given the current time as
	 * duration since the Unix epoch.
	 */
	public boolean is_offer_expired_no_std(long duration_since_epoch) {
		boolean ret = bindings.StaticInvoice_is_offer_expired_no_std(this.ptr, duration_since_epoch);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(duration_since_epoch);
		return ret;
	}

	/**
	 * Returns the [`OfferId`] corresponding to the originating [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public OfferId offer_id() {
		long ret = bindings.StaticInvoice_offer_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the StaticInvoice object into a byte array which can be read by StaticInvoice_read
	 */
	public byte[] write() {
		byte[] ret = bindings.StaticInvoice_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a StaticInvoice from a byte array, created by StaticInvoice_write
	 */
	public static Result_StaticInvoiceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.StaticInvoice_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticInvoiceDecodeErrorZ ret_hu_conv = Result_StaticInvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
