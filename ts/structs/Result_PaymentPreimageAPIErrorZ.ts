
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PaymentPreimageAPIErrorZ extends CommonBase {
	private Result_PaymentPreimageAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentPreimageAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentPreimageAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentPreimageAPIErrorZ_is_ok(ptr)) {
			return new Result_PaymentPreimageAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentPreimageAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentPreimageAPIErrorZ_OK extends Result_PaymentPreimageAPIErrorZ {
		public final Uint8Array res;
		private Result_PaymentPreimageAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PaymentPreimageAPIErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentPreimageAPIErrorZ_Err extends Result_PaymentPreimageAPIErrorZ {
		public final APIError err;
		private Result_PaymentPreimageAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_PaymentPreimageAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_PaymentPreimageAPIErrorZ constructor_ok(Uint8Array o) {
		number ret = bindings.CResult_PaymentPreimageAPIErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PaymentPreimageAPIErrorZ constructor_err(APIError e) {
		number ret = bindings.CResult_PaymentPreimageAPIErrorZ_err(e.ptr);
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentPreimageAPIErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_PaymentPreimageAPIErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_PaymentPreimageAPIErrorZ clone() {
		number ret = bindings.CResult_PaymentPreimageAPIErrorZ_clone(this.ptr);
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
