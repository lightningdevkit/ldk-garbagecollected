package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A utility for paying [`Invoice]`s.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InvoicePayer extends CommonBase {
	InvoicePayer(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InvoicePayer_free(ptr); }
	}

	/**
	 * Creates an invoice payer that retries failed payment paths.
	 * 
	 * Will forward any [`Event::PaymentPathFailed`] events to the decorated `event_handler` once
	 * `retry_attempts` has been exceeded for a given [`Invoice`].
	 */
	public static InvoicePayer of(Payer payer, Router router, LockableScore scorer, Logger logger, EventHandler event_handler, RetryAttempts retry_attempts) {
		long ret = bindings.InvoicePayer_new(payer == null ? 0 : payer.ptr, router == null ? 0 : router.ptr, scorer == null ? 0 : scorer.ptr & ~1, logger == null ? 0 : logger.ptr, event_handler == null ? 0 : event_handler.ptr, retry_attempts == null ? 0 : retry_attempts.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		InvoicePayer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InvoicePayer(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(payer);
		ret_hu_conv.ptrs_to.add(router);
		ret_hu_conv.ptrs_to.add(scorer);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(event_handler);
		return ret_hu_conv;
	}

	/**
	 * Pays the given [`Invoice`], caching it for later use in case a retry is needed.
	 * 
	 * You should ensure that the `invoice.payment_hash()` is unique and the same payment_hash has
	 * never been paid before. Because [`InvoicePayer`] is stateless no effort is made to do so
	 * for you.
	 */
	public Result_PaymentIdPaymentErrorZ pay_invoice(Invoice invoice) {
		long ret = bindings.InvoicePayer_pay_invoice(this.ptr, invoice == null ? 0 : invoice.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(invoice);
		return ret_hu_conv;
	}

	/**
	 * Pays the given zero-value [`Invoice`] using the given amount, caching it for later use in
	 * case a retry is needed.
	 * 
	 * You should ensure that the `invoice.payment_hash()` is unique and the same payment_hash has
	 * never been paid before. Because [`InvoicePayer`] is stateless no effort is made to do so
	 * for you.
	 */
	public Result_PaymentIdPaymentErrorZ pay_zero_value_invoice(Invoice invoice, long amount_msats) {
		long ret = bindings.InvoicePayer_pay_zero_value_invoice(this.ptr, invoice == null ? 0 : invoice.ptr & ~1, amount_msats);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(invoice);
		return ret_hu_conv;
	}

	/**
	 * Removes the payment cached by the given payment hash.
	 * 
	 * Should be called once a payment has failed or succeeded if not using [`InvoicePayer`] as an
	 * [`EventHandler`]. Otherwise, calling this method is unnecessary.
	 */
	public void remove_cached_payment(byte[] payment_hash) {
		bindings.InvoicePayer_remove_cached_payment(this.ptr, payment_hash);
	}

	/**
	 * Constructs a new EventHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventHandler must be freed before this_arg is
	 */
	public EventHandler as_EventHandler() {
		long ret = bindings.InvoicePayer_as_EventHandler(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventHandler ret_hu_conv = new EventHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
