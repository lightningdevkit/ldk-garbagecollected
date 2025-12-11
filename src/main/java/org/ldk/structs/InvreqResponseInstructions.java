package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Instructions for how to respond to an `InvoiceRequest`.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InvreqResponseInstructions extends CommonBase {
	private InvreqResponseInstructions(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InvreqResponseInstructions_free(ptr); }
	}
	static InvreqResponseInstructions constr_from_ptr(long ptr) {
		bindings.LDKInvreqResponseInstructions raw_val = bindings.LDKInvreqResponseInstructions_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKInvreqResponseInstructions.SendInvoice.class) {
			return new SendInvoice(ptr, (bindings.LDKInvreqResponseInstructions.SendInvoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKInvreqResponseInstructions.SendStaticInvoice.class) {
			return new SendStaticInvoice(ptr, (bindings.LDKInvreqResponseInstructions.SendStaticInvoice)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * We are the recipient of this payment, and a [`Bolt12Invoice`] should be sent in response to
	 * the invoice request since it is now verified.
	 */
	public final static class SendInvoice extends InvreqResponseInstructions {
		public final org.ldk.structs.VerifiedInvoiceRequest send_invoice;
		private SendInvoice(long ptr, bindings.LDKInvreqResponseInstructions.SendInvoice obj) {
			super(null, ptr);
			long send_invoice = obj.send_invoice;
			org.ldk.structs.VerifiedInvoiceRequest send_invoice_hu_conv = null; if (send_invoice < 0 || send_invoice > 4096) { send_invoice_hu_conv = new org.ldk.structs.VerifiedInvoiceRequest(null, send_invoice); }
			if (send_invoice_hu_conv != null) { send_invoice_hu_conv.ptrs_to.add(this); };
			this.send_invoice = send_invoice_hu_conv;
		}
	}
	/**
	 * We are a static invoice server and should respond to this invoice request by retrieving the
	 * [`StaticInvoice`] corresponding to the `recipient_id` and `invoice_slot` and calling
	 * [`OffersMessageFlow::enqueue_static_invoice`].
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 */
	public final static class SendStaticInvoice extends InvreqResponseInstructions {
		/**
		 * An identifier for the async recipient for whom we are serving [`StaticInvoice`]s.
		 * 
		 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
		*/
		public final byte[] recipient_id;
		/**
		 * The slot number for the specific invoice being requested by the payer.
		*/
		public final short invoice_slot;
		/**
		 * The invoice request that should be forwarded to the async recipient in case the
		 * recipient is online to respond. Should be forwarded by calling
		 * [`OffersMessageFlow::enqueue_invoice_request_to_forward`].
		*/
		public final org.ldk.structs.InvoiceRequest invoice_request;
		private SendStaticInvoice(long ptr, bindings.LDKInvreqResponseInstructions.SendStaticInvoice obj) {
			super(null, ptr);
			this.recipient_id = obj.recipient_id;
			this.invoice_slot = obj.invoice_slot;
			long invoice_request = obj.invoice_request;
			org.ldk.structs.InvoiceRequest invoice_request_hu_conv = null; if (invoice_request < 0 || invoice_request > 4096) { invoice_request_hu_conv = new org.ldk.structs.InvoiceRequest(null, invoice_request); }
			if (invoice_request_hu_conv != null) { invoice_request_hu_conv.ptrs_to.add(this); };
			this.invoice_request = invoice_request_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.InvreqResponseInstructions_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvreqResponseInstructions
	 */
	public InvreqResponseInstructions clone() {
		long ret = bindings.InvreqResponseInstructions_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvreqResponseInstructions ret_hu_conv = org.ldk.structs.InvreqResponseInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendInvoice-variant InvreqResponseInstructions
	 */
	public static InvreqResponseInstructions send_invoice(org.ldk.structs.VerifiedInvoiceRequest a) {
		long ret = bindings.InvreqResponseInstructions_send_invoice(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvreqResponseInstructions ret_hu_conv = org.ldk.structs.InvreqResponseInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendStaticInvoice-variant InvreqResponseInstructions
	 */
	public static InvreqResponseInstructions send_static_invoice(byte[] recipient_id, short invoice_slot, org.ldk.structs.InvoiceRequest invoice_request) {
		long ret = bindings.InvreqResponseInstructions_send_static_invoice(recipient_id, invoice_slot, invoice_request.ptr);
		Reference.reachabilityFence(recipient_id);
		Reference.reachabilityFence(invoice_slot);
		Reference.reachabilityFence(invoice_request);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvreqResponseInstructions ret_hu_conv = org.ldk.structs.InvreqResponseInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
