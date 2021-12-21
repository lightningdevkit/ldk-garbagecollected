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
		if (raw_val.getClass() == bindings.LDKPaymentError.Routing.class) {
			return new Routing(ptr, (bindings.LDKPaymentError.Routing)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentError.Sending.class) {
			return new Sending(ptr, (bindings.LDKPaymentError.Sending)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * An error resulting from the provided [`Invoice`] or payment hash.
	 */
	public final static class Invoice extends PaymentError {
		public final String invoice;
		private Invoice(long ptr, bindings.LDKPaymentError.Invoice obj) {
			super(null, ptr);
			this.invoice = obj.invoice;
		}
	}
	/**
	 * An error occurring when finding a route.
	 */
	public final static class Routing extends PaymentError {
		public final LightningError routing;
		private Routing(long ptr, bindings.LDKPaymentError.Routing obj) {
			super(null, ptr);
			long routing = obj.routing;
			LightningError routing_hu_conv = null; if (routing < 0 || routing > 4096) { routing_hu_conv = new LightningError(null, routing); }
			routing_hu_conv.ptrs_to.add(this);
			this.routing = routing_hu_conv;
		}
	}
	/**
	 * An error occurring when sending a payment.
	 */
	public final static class Sending extends PaymentError {
		public final PaymentSendFailure sending;
		private Sending(long ptr, bindings.LDKPaymentError.Sending obj) {
			super(null, ptr);
			long sending = obj.sending;
			PaymentSendFailure sending_hu_conv = PaymentSendFailure.constr_from_ptr(sending);
			sending_hu_conv.ptrs_to.add(this);
			this.sending = sending_hu_conv;
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
		PaymentError ret_hu_conv = PaymentError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Invoice-variant PaymentError
	 */
	public static PaymentError invoice(java.lang.String a) {
		long ret = bindings.PaymentError_invoice(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentError ret_hu_conv = PaymentError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Routing-variant PaymentError
	 */
	public static PaymentError routing(LightningError a) {
		long ret = bindings.PaymentError_routing(a == null ? 0 : a.ptr & ~1);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentError ret_hu_conv = PaymentError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Sending-variant PaymentError
	 */
	public static PaymentError sending(PaymentSendFailure a) {
		long ret = bindings.PaymentError_sending(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentError ret_hu_conv = PaymentError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
