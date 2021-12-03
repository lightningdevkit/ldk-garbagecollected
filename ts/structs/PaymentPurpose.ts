
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class PaymentPurpose extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.PaymentPurpose_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): PaymentPurpose {
		const raw_val: bindings.LDKPaymentPurpose = bindings.LDKPaymentPurpose_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKPaymentPurpose.InvoicePayment) {
			return new InvoicePayment(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKPaymentPurpose.SpontaneousPayment) {
			return new SpontaneousPayment(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class InvoicePayment extends PaymentPurpose {
	public payment_preimage: Uint8Array;
	public payment_secret: Uint8Array;
	public user_payment_id: number;
	private constructor(ptr: number, obj: bindings.LDKPaymentPurpose.InvoicePayment) {
		super(null, ptr);
		this.payment_preimage = obj.payment_preimage;
		this.payment_secret = obj.payment_secret;
		this.user_payment_id = obj.user_payment_id;
	}
}
export class SpontaneousPayment extends PaymentPurpose {
	public spontaneous_payment: Uint8Array;
	private constructor(ptr: number, obj: bindings.LDKPaymentPurpose.SpontaneousPayment) {
		super(null, ptr);
		this.spontaneous_payment = obj.spontaneous_payment;
	}
}
	public number clone_ptr() {
		number ret = bindings.PaymentPurpose_clone_ptr(this.ptr);
		return ret;
	}

	public PaymentPurpose clone() {
		number ret = bindings.PaymentPurpose_clone(this.ptr);
		PaymentPurpose ret_hu_conv = PaymentPurpose.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static PaymentPurpose constructor_invoice_payment(Uint8Array payment_preimage, Uint8Array payment_secret, number user_payment_id) {
		number ret = bindings.PaymentPurpose_invoice_payment(InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_secret, 32), user_payment_id);
		PaymentPurpose ret_hu_conv = PaymentPurpose.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static PaymentPurpose constructor_spontaneous_payment(Uint8Array a) {
		number ret = bindings.PaymentPurpose_spontaneous_payment(InternalUtils.check_arr_len(a, 32));
		PaymentPurpose ret_hu_conv = PaymentPurpose.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
