
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RouteHintDecodeErrorZ extends CommonBase {
	private Result_RouteHintDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteHintDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteHintDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RouteHintDecodeErrorZ_result_ok(ptr)) {
			return new Result_RouteHintDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteHintDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteHintDecodeErrorZ_OK extends Result_RouteHintDecodeErrorZ {
		public final RouteHint res;
		private Result_RouteHintDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_RouteHintDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: RouteHint = new RouteHint(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteHintDecodeErrorZ_Err extends Result_RouteHintDecodeErrorZ {
		public final DecodeError err;
		private Result_RouteHintDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_RouteHintDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_RouteHintDecodeErrorZ constructor_ok(RouteHint o) {
		number ret = bindings.CResult_RouteHintDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RouteHintDecodeErrorZ ret_hu_conv = Result_RouteHintDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_RouteHintDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_RouteHintDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_RouteHintDecodeErrorZ ret_hu_conv = Result_RouteHintDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_RouteHintDecodeErrorZ clone() {
		number ret = bindings.CResult_RouteHintDecodeErrorZ_clone(this.ptr);
		Result_RouteHintDecodeErrorZ ret_hu_conv = Result_RouteHintDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
