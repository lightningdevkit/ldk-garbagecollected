using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A semantically valid [`StaticInvoice`] that hasn't been signed.
 */
public class UnsignedStaticInvoice : CommonBase {
	internal UnsignedStaticInvoice(object _dummy, long ptr) : base(ptr) { }
	~UnsignedStaticInvoice() {
		if (ptr != 0) { bindings.UnsignedStaticInvoice_free(ptr); }
	}

	/**
	 * Signs the [`TaggedHash`] of the invoice using the given function.
	 * 
	 * Note: The hash computation may have included unknown, odd TLV records.
	 */
	public org.ldk.structs.Result_StaticInvoiceSignErrorZ sign(org.ldk.structs.SignStaticInvoiceFn sign) {
		long ret = bindings.UnsignedStaticInvoice_sign(this.ptr, sign.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(sign);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticInvoiceSignErrorZ ret_hu_conv = Result_StaticInvoiceSignErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(sign); };
		if (this != null) { this.ptrs_to.AddLast(this); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, this is reset to null and is now a dummy object.
		this.ptr = 0;;
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes, including information
	 * needed for routing payments across them.
	 * 
	 * Blinded paths provide recipient privacy by obfuscating its node id. Note, however, that this
	 * privacy is lost if a public node id is used for
	 * [`UnsignedStaticInvoice::signing_pubkey`].
	 */
	public BlindedPaymentPath[] payment_paths() {
		long ret = bindings.UnsignedStaticInvoice_payment_paths(this.ptr);
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
		long ret = bindings.UnsignedStaticInvoice_created_at(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Duration since
	 * [`UnsignedStaticInvoice::created_at`]
	 * when the invoice has expired and therefore should no longer be paid.
	 */
	public long relative_expiry() {
		long ret = bindings.UnsignedStaticInvoice_relative_expiry(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired.
	 */
	public bool is_expired() {
		bool ret = bindings.UnsignedStaticInvoice_is_expired(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired given the current time as duration since the Unix epoch.
	 */
	public bool is_expired_no_std(long duration_since_epoch) {
		bool ret = bindings.UnsignedStaticInvoice_is_expired_no_std(this.ptr, duration_since_epoch);
		GC.KeepAlive(this);
		GC.KeepAlive(duration_since_epoch);
		return ret;
	}

	/**
	 * Fallback addresses for paying the invoice on-chain, in order of most-preferred to
	 * least-preferred.
	 */
	public Address[] fallbacks() {
		long ret = bindings.UnsignedStaticInvoice_fallbacks(this.ptr);
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
		long ret = bindings.UnsignedStaticInvoice_invoice_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
		long ret = bindings.UnsignedStaticInvoice_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The chain that must be used when paying the invoice. [`StaticInvoice`]s currently can only be
	 * created from offers that support a single chain.
	 */
	public byte[] chain() {
		long ret = bindings.UnsignedStaticInvoice_chain(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Opaque bytes set by the originating [`Offer::metadata`].
	 * 
	 * [`Offer::metadata`]: crate::offers::offer::Offer::metadata
	 */
	public org.ldk.structs.Option_CVec_u8ZZ metadata() {
		long ret = bindings.UnsignedStaticInvoice_metadata(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 * 
	 * From [`Offer::amount`].
	 * 
	 * [`Offer::amount`]: crate::offers::offer::Offer::amount
	 */
	public org.ldk.structs.Option_AmountZ amount() {
		long ret = bindings.UnsignedStaticInvoice_amount(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_AmountZ ret_hu_conv = org.ldk.structs.Option_AmountZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the originating [`Offer`], from [`Offer::offer_features`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::offer_features`]: crate::offers::offer::Offer::offer_features
	 */
	public org.ldk.structs.OfferFeatures offer_features() {
		long ret = bindings.UnsignedStaticInvoice_offer_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the originating offer, from [`Offer::description`].
	 * 
	 * [`Offer::description`]: crate::offers::offer::Offer::description
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.PrintableString description() {
		long ret = bindings.UnsignedStaticInvoice_description(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested, from
	 * [`Offer::absolute_expiry`].
	 * 
	 * [`Offer::absolute_expiry`]: crate::offers::offer::Offer::absolute_expiry
	 */
	public org.ldk.structs.Option_u64Z absolute_expiry() {
		long ret = bindings.UnsignedStaticInvoice_absolute_expiry(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The issuer of the offer, from [`Offer::issuer`].
	 * 
	 * [`Offer::issuer`]: crate::offers::offer::Offer::issuer
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.PrintableString issuer() {
		long ret = bindings.UnsignedStaticInvoice_issuer(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Paths to the node that may supply the invoice on the recipient's behalf, originating from
	 * publicly reachable nodes. Taken from [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public BlindedMessagePath[] offer_message_paths() {
		long ret = bindings.UnsignedStaticInvoice_offer_message_paths(this.ptr);
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
	 * Paths to the recipient for indicating that a held HTLC is available to claim when they next
	 * come online.
	 */
	public BlindedMessagePath[] message_paths() {
		long ret = bindings.UnsignedStaticInvoice_message_paths(this.ptr);
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
	 * The quantity of items supported, from [`Offer::supported_quantity`].
	 * 
	 * [`Offer::supported_quantity`]: crate::offers::offer::Offer::supported_quantity
	 */
	public org.ldk.structs.Quantity supported_quantity() {
		long ret = bindings.UnsignedStaticInvoice_supported_quantity(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Quantity ret_hu_conv = org.ldk.structs.Quantity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	public byte[] issuer_signing_pubkey() {
		long ret = bindings.UnsignedStaticInvoice_issuer_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
