
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ extends CommonBase {
	private Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_result_ok(ptr)) {
			return new Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_OK extends Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ {
		public final TwoTuple_PaymentHashPaymentIdZ res;
		private Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_get_ok(ptr);
			TwoTuple_PaymentHashPaymentIdZ res_hu_conv = new TwoTuple_PaymentHashPaymentIdZ(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_Err extends Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ {
		public final PaymentSendFailure err;
		private Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_get_err(ptr);
			PaymentSendFailure err_hu_conv = PaymentSendFailure.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ constructor_ok(TwoTuple_PaymentHashPaymentIdZ o) {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_ok(o != null ? o.ptr : 0);
		Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ constructor_err(PaymentSendFailure e) {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_err(e.ptr);
		Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ clone() {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_clone(this.ptr);
		Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
