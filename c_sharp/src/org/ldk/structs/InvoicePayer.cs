using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A utility for paying [`Invoice`]s and sending spontaneous payments.
 * 
 * See [module-level documentation] for details.
 * 
 * [module-level documentation]: crate::payment
 */
public class InvoicePayer : CommonBase {
	internal InvoicePayer(object _dummy, long ptr) : base(ptr) { }
	~InvoicePayer() {
		if (ptr != 0) { bindings.InvoicePayer_free(ptr); }
	}

	/**
	 * Creates an invoice payer that retries failed payment paths.
	 * 
	 * Will forward any [`Event::PaymentPathFailed`] events to the decorated `event_handler` once
	 * `retry` has been exceeded for a given [`Invoice`].
	 */
	public static InvoicePayer of(org.ldk.structs.Payer payer, org.ldk.structs.Router router, org.ldk.structs.Logger logger, org.ldk.structs.EventHandler event_handler, org.ldk.structs.Retry retry) {
		long ret = bindings.InvoicePayer_new(payer == null ? 0 : payer.ptr, router == null ? 0 : router.ptr, logger == null ? 0 : logger.ptr, event_handler == null ? 0 : event_handler.ptr, retry.ptr);
		GC.KeepAlive(payer);
		GC.KeepAlive(router);
		GC.KeepAlive(logger);
		GC.KeepAlive(event_handler);
		GC.KeepAlive(retry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoicePayer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoicePayer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(event_handler); };
		return ret_hu_conv;
	}

	/**
	 * Pays the given [`Invoice`], caching it for later use in case a retry is needed.
	 * 
	 * [`Invoice::payment_hash`] is used as the [`PaymentId`], which ensures idempotency as long
	 * as the payment is still pending. Once the payment completes or fails, you must ensure that
	 * a second payment with the same [`PaymentHash`] is never sent.
	 * 
	 * If you wish to use a different payment idempotency token, see
	 * [`Self::pay_invoice_with_id`].
	 */
	public Result_PaymentIdPaymentErrorZ pay_invoice(org.ldk.structs.Invoice invoice) {
		long ret = bindings.InvoicePayer_pay_invoice(this.ptr, invoice == null ? 0 : invoice.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(invoice);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(invoice); };
		return ret_hu_conv;
	}

	/**
	 * Pays the given [`Invoice`] with a custom idempotency key, caching the invoice for later use
	 * in case a retry is needed.
	 * 
	 * Note that idempotency is only guaranteed as long as the payment is still pending. Once the
	 * payment completes or fails, no idempotency guarantees are made.
	 * 
	 * You should ensure that the [`Invoice::payment_hash`] is unique and the same [`PaymentHash`]
	 * has never been paid before.
	 * 
	 * See [`Self::pay_invoice`] for a variant which uses the [`PaymentHash`] for the idempotency
	 * token.
	 */
	public Result_NonePaymentErrorZ pay_invoice_with_id(org.ldk.structs.Invoice invoice, byte[] payment_id) {
		long ret = bindings.InvoicePayer_pay_invoice_with_id(this.ptr, invoice == null ? 0 : invoice.ptr, InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(invoice);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentErrorZ ret_hu_conv = Result_NonePaymentErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(invoice); };
		return ret_hu_conv;
	}

	/**
	 * Pays the given zero-value [`Invoice`] using the given amount, caching it for later use in
	 * case a retry is needed.
	 * 
	 * [`Invoice::payment_hash`] is used as the [`PaymentId`], which ensures idempotency as long
	 * as the payment is still pending. Once the payment completes or fails, you must ensure that
	 * a second payment with the same [`PaymentHash`] is never sent.
	 * 
	 * If you wish to use a different payment idempotency token, see
	 * [`Self::pay_zero_value_invoice_with_id`].
	 */
	public Result_PaymentIdPaymentErrorZ pay_zero_value_invoice(org.ldk.structs.Invoice invoice, long amount_msats) {
		long ret = bindings.InvoicePayer_pay_zero_value_invoice(this.ptr, invoice == null ? 0 : invoice.ptr, amount_msats);
		GC.KeepAlive(this);
		GC.KeepAlive(invoice);
		GC.KeepAlive(amount_msats);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(invoice); };
		return ret_hu_conv;
	}

	/**
	 * Pays the given zero-value [`Invoice`] using the given amount and custom idempotency key,
	 * caching the invoice for later use in case a retry is needed.
	 * 
	 * Note that idempotency is only guaranteed as long as the payment is still pending. Once the
	 * payment completes or fails, no idempotency guarantees are made.
	 * 
	 * You should ensure that the [`Invoice::payment_hash`] is unique and the same [`PaymentHash`]
	 * has never been paid before.
	 * 
	 * See [`Self::pay_zero_value_invoice`] for a variant which uses the [`PaymentHash`] for the
	 * idempotency token.
	 */
	public Result_NonePaymentErrorZ pay_zero_value_invoice_with_id(org.ldk.structs.Invoice invoice, long amount_msats, byte[] payment_id) {
		long ret = bindings.InvoicePayer_pay_zero_value_invoice_with_id(this.ptr, invoice == null ? 0 : invoice.ptr, amount_msats, InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(invoice);
		GC.KeepAlive(amount_msats);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentErrorZ ret_hu_conv = Result_NonePaymentErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(invoice); };
		return ret_hu_conv;
	}

	/**
	 * Pays `pubkey` an amount using the hash of the given preimage, caching it for later use in
	 * case a retry is needed.
	 * 
	 * The hash of the [`PaymentPreimage`] is used as the [`PaymentId`], which ensures idempotency
	 * as long as the payment is still pending. Once the payment completes or fails, you must
	 * ensure that a second payment with the same [`PaymentPreimage`] is never sent.
	 */
	public Result_PaymentIdPaymentErrorZ pay_pubkey(byte[] pubkey, byte[] payment_preimage, long amount_msats, int final_cltv_expiry_delta) {
		long ret = bindings.InvoicePayer_pay_pubkey(this.ptr, InternalUtils.check_arr_len(pubkey, 33), InternalUtils.check_arr_len(payment_preimage, 32), amount_msats, final_cltv_expiry_delta);
		GC.KeepAlive(this);
		GC.KeepAlive(pubkey);
		GC.KeepAlive(payment_preimage);
		GC.KeepAlive(amount_msats);
		GC.KeepAlive(final_cltv_expiry_delta);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Pays `pubkey` an amount using the hash of the given preimage and a custom idempotency key,
	 * caching the invoice for later use in case a retry is needed.
	 * 
	 * Note that idempotency is only guaranteed as long as the payment is still pending. Once the
	 * payment completes or fails, no idempotency guarantees are made.
	 * 
	 * You should ensure that the [`PaymentPreimage`] is unique and the corresponding
	 * [`PaymentHash`] has never been paid before.
	 */
	public Result_NonePaymentErrorZ pay_pubkey_with_id(byte[] pubkey, byte[] payment_preimage, byte[] payment_id, long amount_msats, int final_cltv_expiry_delta) {
		long ret = bindings.InvoicePayer_pay_pubkey_with_id(this.ptr, InternalUtils.check_arr_len(pubkey, 33), InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_id, 32), amount_msats, final_cltv_expiry_delta);
		GC.KeepAlive(this);
		GC.KeepAlive(pubkey);
		GC.KeepAlive(payment_preimage);
		GC.KeepAlive(payment_id);
		GC.KeepAlive(amount_msats);
		GC.KeepAlive(final_cltv_expiry_delta);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentErrorZ ret_hu_conv = Result_NonePaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Removes the payment cached by the given payment hash.
	 * 
	 * Should be called once a payment has failed or succeeded if not using [`InvoicePayer`] as an
	 * [`EventHandler`]. Otherwise, calling this method is unnecessary.
	 */
	public void remove_cached_payment(byte[] payment_hash) {
		bindings.InvoicePayer_remove_cached_payment(this.ptr, InternalUtils.check_arr_len(payment_hash, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(payment_hash);
	}

	/**
	 * Constructs a new EventHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventHandler must be freed before this_arg is
	 */
	public EventHandler as_EventHandler() {
		long ret = bindings.InvoicePayer_as_EventHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventHandler ret_hu_conv = new EventHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
