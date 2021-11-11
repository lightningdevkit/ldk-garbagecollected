
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NonePaymentSendFailureZ extends CommonBase {
	private Result_NonePaymentSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NonePaymentSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_NonePaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NonePaymentSendFailureZ_is_ok(ptr)) {
			return new Result_NonePaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_NonePaymentSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_NonePaymentSendFailureZ_OK extends Result_NonePaymentSendFailureZ {
		private Result_NonePaymentSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NonePaymentSendFailureZ_Err extends Result_NonePaymentSendFailureZ {
		public final PaymentSendFailure err;
		private Result_NonePaymentSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NonePaymentSendFailureZ_get_err(ptr);
			PaymentSendFailure err_hu_conv = PaymentSendFailure.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NonePaymentSendFailureZ constructor_ok() {
		number ret = bindings.CResult_NonePaymentSendFailureZ_ok();
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NonePaymentSendFailureZ constructor_err(PaymentSendFailure e) {
		number ret = bindings.CResult_NonePaymentSendFailureZ_err(e.ptr);
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_NonePaymentSendFailureZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_NonePaymentSendFailureZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_NonePaymentSendFailureZ clone() {
		number ret = bindings.CResult_NonePaymentSendFailureZ_clone(this.ptr);
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
