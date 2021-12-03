
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ErrorMessageDecodeErrorZ extends CommonBase {
	private Result_ErrorMessageDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ErrorMessageDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ErrorMessageDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ErrorMessageDecodeErrorZ_is_ok(ptr)) {
			return new Result_ErrorMessageDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ErrorMessageDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ErrorMessageDecodeErrorZ_OK extends Result_ErrorMessageDecodeErrorZ {
		public final ErrorMessage res;
		private Result_ErrorMessageDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ErrorMessageDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ErrorMessage = new ErrorMessage(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ErrorMessageDecodeErrorZ_Err extends Result_ErrorMessageDecodeErrorZ {
		public final DecodeError err;
		private Result_ErrorMessageDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ErrorMessageDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ErrorMessageDecodeErrorZ constructor_ok(ErrorMessage o) {
		number ret = bindings.CResult_ErrorMessageDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ErrorMessageDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ErrorMessageDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_ErrorMessageDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_ErrorMessageDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_ErrorMessageDecodeErrorZ clone() {
		number ret = bindings.CResult_ErrorMessageDecodeErrorZ_clone(this.ptr);
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
