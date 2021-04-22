
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RouteHintCreationErrorZ extends CommonBase {
	private Result_RouteHintCreationErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteHintCreationErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteHintCreationErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RouteHintCreationErrorZ_result_ok(ptr)) {
			return new Result_RouteHintCreationErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteHintCreationErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteHintCreationErrorZ_OK extends Result_RouteHintCreationErrorZ {
		public final RouteHint res;
		private Result_RouteHintCreationErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_RouteHintCreationErrorZ_get_ok(ptr);
			const res_hu_conv: RouteHint = new RouteHint(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteHintCreationErrorZ_Err extends Result_RouteHintCreationErrorZ {
		public final LDKCreationError err;
		private Result_RouteHintCreationErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_RouteHintCreationErrorZ_get_err(ptr);
		}
	}

	public static Result_RouteHintCreationErrorZ constructor__ok(RouteHint o) {
		number ret = bindings.CResult_RouteHintCreationErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RouteHintCreationErrorZ ret_hu_conv = Result_RouteHintCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_RouteHintCreationErrorZ constructor__err(LDKCreationError e) {
		number ret = bindings.CResult_RouteHintCreationErrorZ_err(e);
		Result_RouteHintCreationErrorZ ret_hu_conv = Result_RouteHintCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_RouteHintCreationErrorZ _clone() {
		number ret = bindings.CResult_RouteHintCreationErrorZ_clone(this.ptr);
		Result_RouteHintCreationErrorZ ret_hu_conv = Result_RouteHintCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
