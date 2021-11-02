
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RouteParametersDecodeErrorZ extends CommonBase {
	private Result_RouteParametersDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteParametersDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteParametersDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RouteParametersDecodeErrorZ_result_ok(ptr)) {
			return new Result_RouteParametersDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteParametersDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteParametersDecodeErrorZ_OK extends Result_RouteParametersDecodeErrorZ {
		public final RouteParameters res;
		private Result_RouteParametersDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_RouteParametersDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: RouteParameters = new RouteParameters(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteParametersDecodeErrorZ_Err extends Result_RouteParametersDecodeErrorZ {
		public final DecodeError err;
		private Result_RouteParametersDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_RouteParametersDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_RouteParametersDecodeErrorZ constructor_ok(RouteParameters o) {
		number ret = bindings.CResult_RouteParametersDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_RouteParametersDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_RouteParametersDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_RouteParametersDecodeErrorZ clone() {
		number ret = bindings.CResult_RouteParametersDecodeErrorZ_clone(this.ptr);
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
