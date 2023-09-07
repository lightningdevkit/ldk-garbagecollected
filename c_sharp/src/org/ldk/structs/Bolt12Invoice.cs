using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class Bolt12Invoice : CommonBase {
	internal Bolt12Invoice(object _dummy, long ptr) : base(ptr) { }
	~Bolt12Invoice() {
		if (ptr != 0) { bindings.Bolt12Invoice_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Bolt12Invoice_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12Invoice
	 */
	public Bolt12Invoice clone() {
		long ret = bindings.Bolt12Invoice_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12Invoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the originating offer or refund. Intended to be
	 * displayed to the user but with the caveat that it has not been verified in any way.
	 */
	public PrintableString description() {
		long ret = bindings.Bolt12Invoice_description(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when the invoice was created.
	 */
	public long created_at() {
		long ret = bindings.Bolt12Invoice_created_at(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Duration since [`Bolt12Invoice::created_at`] when the invoice has expired and therefore
	 * should no longer be paid.
	 */
	public long relative_expiry() {
		long ret = bindings.Bolt12Invoice_relative_expiry(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the invoice has expired.
	 */
	public bool is_expired() {
		bool ret = bindings.Bolt12Invoice_is_expired(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * SHA256 hash of the payment preimage that will be given in return for paying the invoice.
	 */
	public byte[] payment_hash() {
		byte[] ret = bindings.Bolt12Invoice_payment_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The minimum amount required for a successful payment of the invoice.
	 */
	public long amount_msats() {
		long ret = bindings.Bolt12Invoice_amount_msats(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Features pertaining to paying an invoice.
	 */
	public Bolt12InvoiceFeatures features() {
		long ret = bindings.Bolt12Invoice_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The public key corresponding to the key used to sign the invoice.
	 */
	public byte[] signing_pubkey() {
		byte[] ret = bindings.Bolt12Invoice_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Hash that was used for signing the invoice.
	 */
	public byte[] signable_hash() {
		byte[] ret = bindings.Bolt12Invoice_signable_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Verifies that the invoice was for a request or refund created using the given key.
	 */
	public bool verify(org.ldk.structs.ExpandedKey key) {
		bool ret = bindings.Bolt12Invoice_verify(this.ptr, key == null ? 0 : key.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(key);
		if (this != null) { this.ptrs_to.AddLast(key); };
		return ret;
	}

	/**
	 * Serialize the Bolt12Invoice object into a byte array which can be read by Bolt12Invoice_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Bolt12Invoice_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
