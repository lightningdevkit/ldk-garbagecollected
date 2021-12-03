
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PaymentIdPaymentErrorZ extends CommonBase {
	private Result_PaymentIdPaymentErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentIdPaymentErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentIdPaymentErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentIdPaymentErrorZ_is_ok(ptr)) {
			return new Result_PaymentIdPaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentIdPaymentErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentIdPaymentErrorZ_OK extends Result_PaymentIdPaymentErrorZ {
		public final Uint8Array res;
		private Result_PaymentIdPaymentErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PaymentIdPaymentErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentIdPaymentErrorZ_Err extends Result_PaymentIdPaymentErrorZ {
		public final PaymentError err;
		private Result_PaymentIdPaymentErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_PaymentIdPaymentErrorZ_get_err(ptr);
			PaymentError err_hu_conv = PaymentError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_PaymentIdPaymentErrorZ constructor_ok(Uint8Array o) {
		number ret = bindings.CResult_PaymentIdPaymentErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PaymentIdPaymentErrorZ constructor_err(PaymentError e) {
		number ret = bindings.CResult_PaymentIdPaymentErrorZ_err(e.ptr);
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentIdPaymentErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_PaymentIdPaymentErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_PaymentIdPaymentErrorZ clone() {
		number ret = bindings.CResult_PaymentIdPaymentErrorZ_clone(this.ptr);
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
