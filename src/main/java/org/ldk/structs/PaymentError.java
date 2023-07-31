package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An error that may occur when making a payment.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaymentError extends CommonBase {
	private PaymentError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentError_free(ptr); }
	}
	static PaymentError constr_from_ptr(long ptr) {
		bindings.LDKPaymentError raw_val = bindings.LDKPaymentError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPaymentError.Invoice.class) {
			return new Invoice(ptr, (bindings.LDKPaymentError.Invoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentError.Sending.class) {
			return new Sending(ptr, (bindings.LDKPaymentError.Sending)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * An error resulting from the provided [`Bolt11Invoice`] or payment hash.
	 */
	public final static class Invoice extends PaymentError {
		public final java.lang.String invoice;
		private Invoice(long ptr, bindings.LDKPaymentError.Invoice obj) {
			super(null, ptr);
			this.invoice = obj.invoice;
		}
	}
	/**
	 * An error occurring when sending a payment.
	 */
	public final static class Sending extends PaymentError {
		public final org.ldk.enums.RetryableSendFailure sending;
		private Sending(long ptr, bindings.LDKPaymentError.Sending obj) {
			super(null, ptr);
			this.sending = obj.sending;
		}
	}
	long clone_ptr() {
		long ret = bindings.PaymentError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentError
	 */
	public PaymentError clone() {
		long ret = bindings.PaymentError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Invoice-variant PaymentError
	 */
	public static PaymentError invoice(java.lang.String a) {
		long ret = bindings.PaymentError_invoice(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Sending-variant PaymentError
	 */
	public static PaymentError sending(org.ldk.enums.RetryableSendFailure a) {
		long ret = bindings.PaymentError_sending(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentError ret_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.PaymentError b) {
		boolean ret = bindings.PaymentError_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PaymentError)) return false;
		return this.eq((PaymentError)o);
	}
}
