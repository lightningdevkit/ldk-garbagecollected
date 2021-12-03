
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class PaymentError extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.PaymentError_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): PaymentError {
		const raw_val: bindings.LDKPaymentError = bindings.LDKPaymentError_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKPaymentError.Invoice) {
			return new Invoice(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKPaymentError.Routing) {
			return new Routing(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKPaymentError.Sending) {
			return new Sending(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Invoice extends PaymentError {
	public invoice: String;
	private constructor(ptr: number, obj: bindings.LDKPaymentError.Invoice) {
		super(null, ptr);
		this.invoice = obj.invoice;
	}
}
export class Routing extends PaymentError {
	public routing: LightningError;
	private constructor(ptr: number, obj: bindings.LDKPaymentError.Routing) {
		super(null, ptr);
		const routing: number = obj.routing;
		const routing_hu_conv: LightningError = new LightningError(null, routing);
			routing_hu_conv.ptrs_to.add(this);
		this.routing = routing_hu_conv;
	}
}
export class Sending extends PaymentError {
	public sending: PaymentSendFailure;
	private constructor(ptr: number, obj: bindings.LDKPaymentError.Sending) {
		super(null, ptr);
		const sending: number = obj.sending;
		PaymentSendFailure sending_hu_conv = PaymentSendFailure.constr_from_ptr(sending);
			sending_hu_conv.ptrs_to.add(this);
		this.sending = sending_hu_conv;
	}
}
	public number clone_ptr() {
		number ret = bindings.PaymentError_clone_ptr(this.ptr);
		return ret;
	}

	public PaymentError clone() {
		number ret = bindings.PaymentError_clone(this.ptr);
		PaymentError ret_hu_conv = PaymentError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static PaymentError constructor_invoice(String a) {
		number ret = bindings.PaymentError_invoice(a);
		PaymentError ret_hu_conv = PaymentError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static PaymentError constructor_routing(LightningError a) {
		number ret = bindings.PaymentError_routing(a == null ? 0 : a.ptr & ~1);
		PaymentError ret_hu_conv = PaymentError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static PaymentError constructor_sending(PaymentSendFailure a) {
		number ret = bindings.PaymentError_sending(a.ptr);
		PaymentError ret_hu_conv = PaymentError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
