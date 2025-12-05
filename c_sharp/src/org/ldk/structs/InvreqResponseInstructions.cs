using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Instructions for how to respond to an `InvoiceRequest`.
 */
public class InvreqResponseInstructions : CommonBase {
	protected InvreqResponseInstructions(object _dummy, long ptr) : base(ptr) { }
	~InvreqResponseInstructions() {
		if (ptr != 0) { bindings.InvreqResponseInstructions_free(ptr); }
	}

	internal static InvreqResponseInstructions constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKInvreqResponseInstructions_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new InvreqResponseInstructions_SendInvoice(ptr);
			case 1: return new InvreqResponseInstructions_SendStaticInvoice(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A InvreqResponseInstructions of type SendInvoice */
	public class InvreqResponseInstructions_SendInvoice : InvreqResponseInstructions {
		public org.ldk.structs.VerifiedInvoiceRequest send_invoice;
		internal InvreqResponseInstructions_SendInvoice(long ptr) : base(null, ptr) {
			long send_invoice = bindings.LDKInvreqResponseInstructions_SendInvoice_get_send_invoice(ptr);
			org.ldk.structs.VerifiedInvoiceRequest send_invoice_hu_conv = null; if (send_invoice < 0 || send_invoice > 4096) { send_invoice_hu_conv = new org.ldk.structs.VerifiedInvoiceRequest(null, send_invoice); }
			if (send_invoice_hu_conv != null) { send_invoice_hu_conv.ptrs_to.AddLast(this); };
			this.send_invoice = send_invoice_hu_conv;
		}
	}
	/** A InvreqResponseInstructions of type SendStaticInvoice */
	public class InvreqResponseInstructions_SendStaticInvoice : InvreqResponseInstructions {
		/**
		 * An identifier for the async recipient for whom we are serving [`StaticInvoice`]s.
		 * 
		 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
		 */
		public byte[] recipient_id;
		/**
		 * The slot number for the specific invoice being requested by the payer.
		 */
		public short invoice_slot;
		/**
		 * The invoice request that should be forwarded to the async recipient in case the
		 * recipient is online to respond. Should be forwarded by calling
		 * [`OffersMessageFlow::enqueue_invoice_request_to_forward`].
		 */
		public org.ldk.structs.InvoiceRequest invoice_request;
		internal InvreqResponseInstructions_SendStaticInvoice(long ptr) : base(null, ptr) {
			long recipient_id = bindings.LDKInvreqResponseInstructions_SendStaticInvoice_get_recipient_id(ptr);
			byte[] recipient_id_conv = InternalUtils.decodeUint8Array(recipient_id);
			this.recipient_id = recipient_id_conv;
			this.invoice_slot = bindings.LDKInvreqResponseInstructions_SendStaticInvoice_get_invoice_slot(ptr);
			long invoice_request = bindings.LDKInvreqResponseInstructions_SendStaticInvoice_get_invoice_request(ptr);
			org.ldk.structs.InvoiceRequest invoice_request_hu_conv = null; if (invoice_request < 0 || invoice_request > 4096) { invoice_request_hu_conv = new org.ldk.structs.InvoiceRequest(null, invoice_request); }
			if (invoice_request_hu_conv != null) { invoice_request_hu_conv.ptrs_to.AddLast(this); };
			this.invoice_request = invoice_request_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.InvreqResponseInstructions_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvreqResponseInstructions
	 */
	public org.ldk.structs.InvreqResponseInstructions clone() {
		long ret = bindings.InvreqResponseInstructions_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvreqResponseInstructions ret_hu_conv = org.ldk.structs.InvreqResponseInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendInvoice-variant InvreqResponseInstructions
	 */
	public static org.ldk.structs.InvreqResponseInstructions send_invoice(org.ldk.structs.VerifiedInvoiceRequest a) {
		long ret = bindings.InvreqResponseInstructions_send_invoice(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvreqResponseInstructions ret_hu_conv = org.ldk.structs.InvreqResponseInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendStaticInvoice-variant InvreqResponseInstructions
	 */
	public static org.ldk.structs.InvreqResponseInstructions send_static_invoice(byte[] recipient_id, short invoice_slot, org.ldk.structs.InvoiceRequest invoice_request) {
		long ret = bindings.InvreqResponseInstructions_send_static_invoice(InternalUtils.encodeUint8Array(recipient_id), invoice_slot, invoice_request.ptr);
		GC.KeepAlive(recipient_id);
		GC.KeepAlive(invoice_slot);
		GC.KeepAlive(invoice_request);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvreqResponseInstructions ret_hu_conv = org.ldk.structs.InvreqResponseInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
