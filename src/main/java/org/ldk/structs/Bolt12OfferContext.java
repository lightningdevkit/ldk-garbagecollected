package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The context of a payment made for an invoice requested from a BOLT 12 [`Offer`].
 * 
 * [`Offer`]: crate::offers::offer::Offer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt12OfferContext extends CommonBase {
	Bolt12OfferContext(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt12OfferContext_free(ptr); }
	}

	/**
	 * The identifier of the [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public OfferId get_offer_id() {
		long ret = bindings.Bolt12OfferContext_get_offer_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The identifier of the [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public void set_offer_id(org.ldk.structs.OfferId val) {
		bindings.Bolt12OfferContext_set_offer_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Fields from an [`InvoiceRequest`] sent for a [`Bolt12Invoice`].
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public InvoiceRequestFields get_invoice_request() {
		long ret = bindings.Bolt12OfferContext_get_invoice_request(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Fields from an [`InvoiceRequest`] sent for a [`Bolt12Invoice`].
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public void set_invoice_request(org.ldk.structs.InvoiceRequestFields val) {
		bindings.Bolt12OfferContext_set_invoice_request(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Bolt12OfferContext given each field
	 */
	public static Bolt12OfferContext of(org.ldk.structs.OfferId offer_id_arg, org.ldk.structs.InvoiceRequestFields invoice_request_arg) {
		long ret = bindings.Bolt12OfferContext_new(offer_id_arg.ptr, invoice_request_arg.ptr);
		Reference.reachabilityFence(offer_id_arg);
		Reference.reachabilityFence(invoice_request_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12OfferContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12OfferContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Bolt12OfferContext_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12OfferContext
	 */
	public Bolt12OfferContext clone() {
		long ret = bindings.Bolt12OfferContext_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12OfferContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12OfferContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt12OfferContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Bolt12OfferContext b) {
		boolean ret = bindings.Bolt12OfferContext_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Bolt12OfferContext)) return false;
		return this.eq((Bolt12OfferContext)o);
	}
	/**
	 * Serialize the Bolt12OfferContext object into a byte array which can be read by Bolt12OfferContext_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Bolt12OfferContext_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Bolt12OfferContext from a byte array, created by Bolt12OfferContext_write
	 */
	public static Result_Bolt12OfferContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Bolt12OfferContext_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt12OfferContextDecodeErrorZ ret_hu_conv = Result_Bolt12OfferContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
