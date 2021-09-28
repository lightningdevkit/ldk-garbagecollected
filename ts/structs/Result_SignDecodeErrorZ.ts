
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_SignDecodeErrorZ extends CommonBase {
	private Result_SignDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SignDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_SignDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SignDecodeErrorZ_result_ok(ptr)) {
			return new Result_SignDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_SignDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SignDecodeErrorZ_OK extends Result_SignDecodeErrorZ {
		public final Sign res;
		private Result_SignDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_SignDecodeErrorZ_get_ok(ptr);
			Sign ret_hu_conv = new Sign(null, res);
			ret_hu_conv.ptrs_to.add(this);
			this.res = ret_hu_conv;
		}
	}

	public static final class Result_SignDecodeErrorZ_Err extends Result_SignDecodeErrorZ {
		public final DecodeError err;
		private Result_SignDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_SignDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_SignDecodeErrorZ constructor_ok(Sign o) {
		number ret = bindings.CResult_SignDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_SignDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_SignDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_SignDecodeErrorZ clone() {
		number ret = bindings.CResult_SignDecodeErrorZ_clone(this.ptr);
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
