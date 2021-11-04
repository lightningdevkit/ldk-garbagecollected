
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PaymentIdPaymentSendFailureZ extends CommonBase {
	private Result_PaymentIdPaymentSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentIdPaymentSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_PaymentIdPaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PaymentIdPaymentSendFailureZ_result_ok(ptr)) {
			return new Result_PaymentIdPaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_PaymentIdPaymentSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentIdPaymentSendFailureZ_OK extends Result_PaymentIdPaymentSendFailureZ {
		public final Uint8Array res;
		private Result_PaymentIdPaymentSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PaymentIdPaymentSendFailureZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentIdPaymentSendFailureZ_Err extends Result_PaymentIdPaymentSendFailureZ {
		public final PaymentSendFailure err;
		private Result_PaymentIdPaymentSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_PaymentIdPaymentSendFailureZ_get_err(ptr);
			PaymentSendFailure err_hu_conv = PaymentSendFailure.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_PaymentIdPaymentSendFailureZ constructor_ok(Uint8Array o) {
		number ret = bindings.CResult_PaymentIdPaymentSendFailureZ_ok(o);
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PaymentIdPaymentSendFailureZ constructor_err(PaymentSendFailure e) {
		number ret = bindings.CResult_PaymentIdPaymentSendFailureZ_err(e.ptr);
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_PaymentIdPaymentSendFailureZ clone() {
		number ret = bindings.CResult_PaymentIdPaymentSendFailureZ_clone(this.ptr);
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
