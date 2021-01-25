
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
			this.res = res_hu_conv;
		}
		public Result_RouteDecodeErrorZ_OK(Route res) {
			this(null, bindings.CResult_RouteDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_RouteDecodeErrorZ_Err extends Result_RouteDecodeErrorZ {
		public final DecodeError err;
		private Result_RouteDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_RouteDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			this.err = err_hu_conv;
		}
		public Result_RouteDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_RouteDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
