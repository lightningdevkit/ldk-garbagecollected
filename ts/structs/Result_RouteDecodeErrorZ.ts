
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RouteDecodeErrorZ extends CommonBase {
	private Result_RouteDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RouteDecodeErrorZ_result_ok(ptr)) {
			return new Result_RouteDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteDecodeErrorZ_OK extends Result_RouteDecodeErrorZ {
		public final Route res;
		private Result_RouteDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_RouteDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: Route = new Route(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteDecodeErrorZ_Err extends Result_RouteDecodeErrorZ {
		public final DecodeError err;
		private Result_RouteDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_RouteDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_RouteDecodeErrorZ constructor_ok(Route o) {
		number ret = bindings.CResult_RouteDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_RouteDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_RouteDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_RouteDecodeErrorZ clone() {
		number ret = bindings.CResult_RouteDecodeErrorZ_clone(this.ptr);
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
