
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PaymentSecretAPIErrorZ extends CommonBase {
	private Result_PaymentSecretAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentSecretAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentSecretAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentSecretAPIErrorZ_is_ok(ptr)) {
			return new Result_PaymentSecretAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentSecretAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentSecretAPIErrorZ_OK extends Result_PaymentSecretAPIErrorZ {
		public final Uint8Array res;
		private Result_PaymentSecretAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PaymentSecretAPIErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentSecretAPIErrorZ_Err extends Result_PaymentSecretAPIErrorZ {
		public final APIError err;
		private Result_PaymentSecretAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_PaymentSecretAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_PaymentSecretAPIErrorZ constructor_ok(Uint8Array o) {
		number ret = bindings.CResult_PaymentSecretAPIErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PaymentSecretAPIErrorZ constructor_err(APIError e) {
		number ret = bindings.CResult_PaymentSecretAPIErrorZ_err(e.ptr);
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentSecretAPIErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_PaymentSecretAPIErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_PaymentSecretAPIErrorZ clone() {
		number ret = bindings.CResult_PaymentSecretAPIErrorZ_clone(this.ptr);
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
