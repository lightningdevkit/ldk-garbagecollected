using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An error that may occur when making a payment.
 */
public class PaymentError : CommonBase {
	protected PaymentError(object _dummy, long ptr) : base(ptr) { }
	~PaymentError() {
		if (ptr != 0) { bindings.PaymentError_free(ptr); }
	}

	internal static PaymentError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPaymentError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PaymentError_Invoice(ptr);
			case 1: return new PaymentError_Routing(ptr);
			case 2: return new PaymentError_Sending(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PaymentError of type Invoice */
	public class PaymentError_Invoice : PaymentError {
		public string invoice;
		internal PaymentError_Invoice(long ptr) : base(null, ptr) {
			this.invoice = bindings.LDKPaymentError_Invoice_get_invoice(ptr);
		}
	}
	/** A PaymentError of type Routing */
	public class PaymentError_Routing : PaymentError {
		public LightningError routing;
		internal PaymentError_Routing(long ptr) : base(null, ptr) {
			long routing = bindings.LDKPaymentError_Routing_get_routing(ptr);
			org.ldk.structs.LightningError routing_hu_conv = null; if (routing < 0 || routing > 4096) { routing_hu_conv = new org.ldk.structs.LightningError(null, routing); }
			if (routing_hu_conv != null) { routing_hu_conv.ptrs_to.AddLast(this); };
			this.routing = routing_hu_conv;
		}
	}
	/** A PaymentError of type Sending */
	public class PaymentError_Sending : PaymentError {
		public PaymentSendFailure sending;
		internal PaymentError_Sending(long ptr) : base(null, ptr) {
			long sending = bindings.LDKPaymentError_Sending_get_sending(ptr);
			org.ldk.structs.PaymentSendFailure sending_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(sending);
			if (sending_hu_conv != null) { sending_hu_conv.ptrs_to.AddLast(this); };
			this.sending = sending_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.PaymentError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentError
	 */
	public PaymentError clone() {
		long ret = bindings.PaymentError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Invoice-variant PaymentError
	 */
	public static PaymentError invoice(string a) {
		long ret = bindings.PaymentError_invoice(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Routing-variant PaymentError
	 */
	public static PaymentError routing(org.ldk.structs.LightningError a) {
		long ret = bindings.PaymentError_routing(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Sending-variant PaymentError
	 */
	public static PaymentError sending(org.ldk.structs.PaymentSendFailure a) {
		long ret = bindings.PaymentError_sending(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
