
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ extends CommonBase {
	private Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK extends Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ {
		public final TwoTuple_PaymentHashPaymentSecretZ res;
		private Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_get_ok(ptr);
			TwoTuple_PaymentHashPaymentSecretZ res_hu_conv = new TwoTuple_PaymentHashPaymentSecretZ(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err extends Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ {
		public final APIError err;
		private Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ constructor_ok(TwoTuple_PaymentHashPaymentSecretZ o) {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_ok(o != null ? o.ptr : 0);
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ constructor_err(APIError e) {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_err(e.ptr);
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ clone() {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_clone(this.ptr);
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
