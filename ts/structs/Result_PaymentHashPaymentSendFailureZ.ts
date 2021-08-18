
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PaymentHashPaymentSendFailureZ extends CommonBase {
	private Result_PaymentHashPaymentSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentHashPaymentSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_PaymentHashPaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PaymentHashPaymentSendFailureZ_result_ok(ptr)) {
			return new Result_PaymentHashPaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_PaymentHashPaymentSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentHashPaymentSendFailureZ_OK extends Result_PaymentHashPaymentSendFailureZ {
		public final Uint8Array res;
		private Result_PaymentHashPaymentSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PaymentHashPaymentSendFailureZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentHashPaymentSendFailureZ_Err extends Result_PaymentHashPaymentSendFailureZ {
		public final PaymentSendFailure err;
		private Result_PaymentHashPaymentSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_PaymentHashPaymentSendFailureZ_get_err(ptr);
			PaymentSendFailure err_hu_conv = PaymentSendFailure.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_PaymentHashPaymentSendFailureZ constructor__ok(Uint8Array o) {
		number ret = bindings.CResult_PaymentHashPaymentSendFailureZ_ok(o);
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PaymentHashPaymentSendFailureZ constructor__err(PaymentSendFailure e) {
		number ret = bindings.CResult_PaymentHashPaymentSendFailureZ_err(e.ptr);
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_PaymentHashPaymentSendFailureZ _clone() {
		number ret = bindings.CResult_PaymentHashPaymentSendFailureZ_clone(this.ptr);
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
