using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An `InvoiceRequest` is a request for a [`Bolt12Invoice`] formulated from an [`Offer`].
 * 
 * An offer may provide choices such as quantity, amount, chain, features, etc. An invoice request
 * specifies these such that its recipient can send an invoice for payment.
 * 
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 * [`Offer`]: crate::offers::offer::Offer
 */
public class InvoiceRequest : CommonBase {
	internal InvoiceRequest(object _dummy, long ptr) : base(ptr) { }
	~InvoiceRequest() {
		if (ptr != 0) { bindings.InvoiceRequest_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.InvoiceRequest_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceRequest
	 */
	public InvoiceRequest clone() {
		long ret = bindings.InvoiceRequest_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequest ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequest(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * An unpredictable series of bytes, typically containing information about the derivation of
	 * [`payer_id`].
	 * 
	 * [`payer_id`]: Self::payer_id
	 */
	public byte[] metadata() {
		byte[] ret = bindings.InvoiceRequest_metadata(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A chain from [`Offer::chains`] that the offer is valid for.
	 */
	public byte[] chain() {
		byte[] ret = bindings.InvoiceRequest_chain(this.ptr);
		GC.KeepAlive(this);
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
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 */
	public InvoiceRequestFeatures features() {
		long ret = bindings.InvoiceRequest_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public Option_u64Z quantity() {
		long ret = bindings.InvoiceRequest_quantity(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public byte[] payer_id() {
		byte[] ret = bindings.InvoiceRequest_payer_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A payer-provided note which will be seen by the recipient and reflected back in the invoice
	 * response.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public PrintableString payer_note() {
		long ret = bindings.InvoiceRequest_payer_note(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Verifies that the request was for an offer created using the given key. Returns the derived
	 * keys need to sign an [`Bolt12Invoice`] for the request if they could be extracted from the
	 * metadata.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public Result_COption_KeyPairZNoneZ verify(org.ldk.structs.ExpandedKey key) {
		long ret = bindings.InvoiceRequest_verify(this.ptr, key == null ? 0 : key.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_KeyPairZNoneZ ret_hu_conv = Result_COption_KeyPairZNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(key); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the InvoiceRequest object into a byte array which can be read by InvoiceRequest_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InvoiceRequest_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
