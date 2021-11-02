
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RouteHintHopDecodeErrorZ extends CommonBase {
	private Result_RouteHintHopDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteHintHopDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteHintHopDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RouteHintHopDecodeErrorZ_result_ok(ptr)) {
			return new Result_RouteHintHopDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteHintHopDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteHintHopDecodeErrorZ_OK extends Result_RouteHintHopDecodeErrorZ {
		public final RouteHintHop res;
		private Result_RouteHintHopDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_RouteHintHopDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: RouteHintHop = new RouteHintHop(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteHintHopDecodeErrorZ_Err extends Result_RouteHintHopDecodeErrorZ {
		public final DecodeError err;
		private Result_RouteHintHopDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_RouteHintHopDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_RouteHintHopDecodeErrorZ constructor_ok(RouteHintHop o) {
		number ret = bindings.CResult_RouteHintHopDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RouteHintHopDecodeErrorZ ret_hu_conv = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_RouteHintHopDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_RouteHintHopDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_RouteHintHopDecodeErrorZ ret_hu_conv = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_RouteHintHopDecodeErrorZ clone() {
		number ret = bindings.CResult_RouteHintHopDecodeErrorZ_clone(this.ptr);
		Result_RouteHintHopDecodeErrorZ ret_hu_conv = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
