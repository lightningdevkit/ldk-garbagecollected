
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NoneAPIErrorZ extends CommonBase {
	private Result_NoneAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneAPIErrorZ_is_ok(ptr)) {
			return new Result_NoneAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneAPIErrorZ_OK extends Result_NoneAPIErrorZ {
		private Result_NoneAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneAPIErrorZ_Err extends Result_NoneAPIErrorZ {
		public final APIError err;
		private Result_NoneAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NoneAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NoneAPIErrorZ constructor_ok() {
		number ret = bindings.CResult_NoneAPIErrorZ_ok();
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NoneAPIErrorZ constructor_err(APIError e) {
		number ret = bindings.CResult_NoneAPIErrorZ_err(e.ptr);
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneAPIErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_NoneAPIErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_NoneAPIErrorZ clone() {
		number ret = bindings.CResult_NoneAPIErrorZ_clone(this.ptr);
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
