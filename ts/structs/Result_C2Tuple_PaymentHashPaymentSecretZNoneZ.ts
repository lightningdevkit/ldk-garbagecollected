
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_C2Tuple_PaymentHashPaymentSecretZNoneZ extends CommonBase {
	private Result_C2Tuple_PaymentHashPaymentSecretZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_PaymentHashPaymentSecretZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_is_ok(ptr)) {
			return new Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_OK extends Result_C2Tuple_PaymentHashPaymentSecretZNoneZ {
		public final TwoTuple_PaymentHashPaymentSecretZ res;
		private Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_get_ok(ptr);
			TwoTuple_PaymentHashPaymentSecretZ res_hu_conv = new TwoTuple_PaymentHashPaymentSecretZ(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_Err extends Result_C2Tuple_PaymentHashPaymentSecretZNoneZ {
		private Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_C2Tuple_PaymentHashPaymentSecretZNoneZ constructor_ok(TwoTuple_PaymentHashPaymentSecretZ o) {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_ok(o != null ? o.ptr : 0);
		Result_C2Tuple_PaymentHashPaymentSecretZNoneZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_PaymentHashPaymentSecretZNoneZ constructor_err() {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_err();
		Result_C2Tuple_PaymentHashPaymentSecretZNoneZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_C2Tuple_PaymentHashPaymentSecretZNoneZ clone() {
		number ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_clone(this.ptr);
		Result_C2Tuple_PaymentHashPaymentSecretZNoneZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
