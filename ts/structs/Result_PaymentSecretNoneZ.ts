
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PaymentSecretNoneZ extends CommonBase {
	private Result_PaymentSecretNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentSecretNoneZ_free(ptr); } super.finalize();
	}

	static Result_PaymentSecretNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentSecretNoneZ_is_ok(ptr)) {
			return new Result_PaymentSecretNoneZ_OK(null, ptr);
		} else {
			return new Result_PaymentSecretNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentSecretNoneZ_OK extends Result_PaymentSecretNoneZ {
		public final Uint8Array res;
		private Result_PaymentSecretNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PaymentSecretNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentSecretNoneZ_Err extends Result_PaymentSecretNoneZ {
		private Result_PaymentSecretNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_PaymentSecretNoneZ constructor_ok(Uint8Array o) {
		number ret = bindings.CResult_PaymentSecretNoneZ_ok(InternalUtils.check_arr_len(o, 32));
		Result_PaymentSecretNoneZ ret_hu_conv = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PaymentSecretNoneZ constructor_err() {
		number ret = bindings.CResult_PaymentSecretNoneZ_err();
		Result_PaymentSecretNoneZ ret_hu_conv = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentSecretNoneZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_PaymentSecretNoneZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_PaymentSecretNoneZ clone() {
		number ret = bindings.CResult_PaymentSecretNoneZ_clone(this.ptr);
		Result_PaymentSecretNoneZ ret_hu_conv = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
