
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class InvoicePayer extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.InvoicePayer_free(this.ptr);
                    }
                }
	public static InvoicePayer constructor_new(Payer payer, Router router, MultiThreadedLockableScore scorer, Logger logger, EventHandler event_handler, RetryAttempts retry_attempts) {
		number ret = bindings.InvoicePayer_new(payer == null ? 0 : payer.ptr, router == null ? 0 : router.ptr, scorer == null ? 0 : scorer.ptr & ~1, logger == null ? 0 : logger.ptr, event_handler == null ? 0 : event_handler.ptr, retry_attempts == null ? 0 : retry_attempts.ptr & ~1);
		const ret_hu_conv: InvoicePayer = new InvoicePayer(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(payer);
		ret_hu_conv.ptrs_to.add(router);
		ret_hu_conv.ptrs_to.add(scorer);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(event_handler);
		return ret_hu_conv;
	}

	public Result_PaymentIdPaymentErrorZ pay_invoice(Invoice invoice) {
		number ret = bindings.InvoicePayer_pay_invoice(this.ptr, invoice == null ? 0 : invoice.ptr & ~1);
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(invoice);
		return ret_hu_conv;
	}

	public Result_PaymentIdPaymentErrorZ pay_zero_value_invoice(Invoice invoice, number amount_msats) {
		number ret = bindings.InvoicePayer_pay_zero_value_invoice(this.ptr, invoice == null ? 0 : invoice.ptr & ~1, amount_msats);
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(invoice);
		return ret_hu_conv;
	}

	public Result_PaymentIdPaymentErrorZ pay_pubkey(Uint8Array pubkey, Uint8Array payment_preimage, number amount_msats, number final_cltv_expiry_delta) {
		number ret = bindings.InvoicePayer_pay_pubkey(this.ptr, InternalUtils.check_arr_len(pubkey, 33), InternalUtils.check_arr_len(payment_preimage, 32), amount_msats, final_cltv_expiry_delta);
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public void remove_cached_payment(Uint8Array payment_hash) {
		bindings.InvoicePayer_remove_cached_payment(this.ptr, InternalUtils.check_arr_len(payment_hash, 32));
	}

	public EventHandler as_EventHandler() {
		number ret = bindings.InvoicePayer_as_EventHandler(this.ptr);
		EventHandler ret_hu_conv = new EventHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
