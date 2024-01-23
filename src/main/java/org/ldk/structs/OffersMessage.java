package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Possible BOLT 12 Offers messages sent and received via an [`OnionMessage`].
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OffersMessage extends CommonBase {
	private OffersMessage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OffersMessage_free(ptr); }
	}
	static OffersMessage constr_from_ptr(long ptr) {
		bindings.LDKOffersMessage raw_val = bindings.LDKOffersMessage_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKOffersMessage.InvoiceRequest.class) {
			return new InvoiceRequest(ptr, (bindings.LDKOffersMessage.InvoiceRequest)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKOffersMessage.Invoice.class) {
			return new Invoice(ptr, (bindings.LDKOffersMessage.Invoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKOffersMessage.InvoiceError.class) {
			return new InvoiceError(ptr, (bindings.LDKOffersMessage.InvoiceError)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A request for a [`Bolt12Invoice`] for a particular [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public final static class InvoiceRequest extends OffersMessage {
		public final org.ldk.structs.InvoiceRequest invoice_request;
		private InvoiceRequest(long ptr, bindings.LDKOffersMessage.InvoiceRequest obj) {
			super(null, ptr);
			long invoice_request = obj.invoice_request;
			org.ldk.structs.InvoiceRequest invoice_request_hu_conv = null; if (invoice_request < 0 || invoice_request > 4096) { invoice_request_hu_conv = new org.ldk.structs.InvoiceRequest(null, invoice_request); }
			if (invoice_request_hu_conv != null) { invoice_request_hu_conv.ptrs_to.add(this); };
			this.invoice_request = invoice_request_hu_conv;
		}
	}
	/**
	 * A [`Bolt12Invoice`] sent in response to an [`InvoiceRequest`] or a [`Refund`].
	 * 
	 * [`Refund`]: crate::offers::refund::Refund
	 */
	public final static class Invoice extends OffersMessage {
		public final org.ldk.structs.Bolt12Invoice invoice;
		private Invoice(long ptr, bindings.LDKOffersMessage.Invoice obj) {
			super(null, ptr);
			long invoice = obj.invoice;
			org.ldk.structs.Bolt12Invoice invoice_hu_conv = null; if (invoice < 0 || invoice > 4096) { invoice_hu_conv = new org.ldk.structs.Bolt12Invoice(null, invoice); }
			if (invoice_hu_conv != null) { invoice_hu_conv.ptrs_to.add(this); };
			this.invoice = invoice_hu_conv;
		}
	}
	/**
	 * An error from handling an [`OffersMessage`].
	 */
	public final static class InvoiceError extends OffersMessage {
		public final org.ldk.structs.InvoiceError invoice_error;
		private InvoiceError(long ptr, bindings.LDKOffersMessage.InvoiceError obj) {
			super(null, ptr);
			long invoice_error = obj.invoice_error;
			org.ldk.structs.InvoiceError invoice_error_hu_conv = null; if (invoice_error < 0 || invoice_error > 4096) { invoice_error_hu_conv = new org.ldk.structs.InvoiceError(null, invoice_error); }
			if (invoice_error_hu_conv != null) { invoice_error_hu_conv.ptrs_to.add(this); };
			this.invoice_error = invoice_error_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.OffersMessage_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OffersMessage
	 */
	public OffersMessage clone() {
		long ret = bindings.OffersMessage_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OffersMessage ret_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoiceRequest-variant OffersMessage
	 */
	public static OffersMessage invoice_request(org.ldk.structs.InvoiceRequest a) {
		long ret = bindings.OffersMessage_invoice_request(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OffersMessage ret_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Invoice-variant OffersMessage
	 */
	public static OffersMessage invoice(org.ldk.structs.Bolt12Invoice a) {
		long ret = bindings.OffersMessage_invoice(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OffersMessage ret_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoiceError-variant OffersMessage
	 */
	public static OffersMessage invoice_error(org.ldk.structs.InvoiceError a) {
		long ret = bindings.OffersMessage_invoice_error(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OffersMessage ret_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public OnionMessageContents as_OnionMessageContents() {
		long ret = bindings.OffersMessage_as_OnionMessageContents(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the OffersMessage object into a byte array which can be read by OffersMessage_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OffersMessage_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a OffersMessage from a byte array, created by OffersMessage_write
	 */
	public static Result_OffersMessageDecodeErrorZ read(byte[] ser, long arg_a, org.ldk.structs.Logger arg_b) {
		long ret = bindings.OffersMessage_read(ser, arg_a, arg_b.ptr);
		Reference.reachabilityFence(ser);
		Reference.reachabilityFence(arg_a);
		Reference.reachabilityFence(arg_b);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OffersMessageDecodeErrorZ ret_hu_conv = Result_OffersMessageDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_b); };
		return ret_hu_conv;
	}

}
