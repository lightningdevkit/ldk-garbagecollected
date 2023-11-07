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
			case 1: return new PaymentError_Sending(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PaymentError of type Invoice */
	public class PaymentError_Invoice : PaymentError {
		public string invoice;
		internal PaymentError_Invoice(long ptr) : base(null, ptr) {
			long invoice = bindings.LDKPaymentError_Invoice_get_invoice(ptr);
			string invoice_conv = InternalUtils.decodeString(invoice);
			this.invoice = invoice_conv;
		}
	}
	/** A PaymentError of type Sending */
	public class PaymentError_Sending : PaymentError {
		public RetryableSendFailure sending;
		internal PaymentError_Sending(long ptr) : base(null, ptr) {
			this.sending = bindings.LDKPaymentError_Sending_get_sending(ptr);
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
		long ret = bindings.PaymentError_invoice(InternalUtils.encodeString(a));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Sending-variant PaymentError
	 */
	public static PaymentError sending(RetryableSendFailure a) {
		long ret = bindings.PaymentError_sending(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.PaymentError b) {
		bool ret = bindings.PaymentError_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PaymentError)) return false;
		return this.eq((PaymentError)o);
	}
}
} } }
