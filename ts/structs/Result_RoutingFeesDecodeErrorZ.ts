
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RoutingFeesDecodeErrorZ extends CommonBase {
	private Result_RoutingFeesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RoutingFeesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RoutingFeesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RoutingFeesDecodeErrorZ_is_ok(ptr)) {
			return new Result_RoutingFeesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RoutingFeesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RoutingFeesDecodeErrorZ_OK extends Result_RoutingFeesDecodeErrorZ {
		public final RoutingFees res;
		private Result_RoutingFeesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_RoutingFeesDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: RoutingFees = new RoutingFees(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RoutingFeesDecodeErrorZ_Err extends Result_RoutingFeesDecodeErrorZ {
		public final DecodeError err;
		private Result_RoutingFeesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_RoutingFeesDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_RoutingFeesDecodeErrorZ constructor_ok(RoutingFees o) {
		number ret = bindings.CResult_RoutingFeesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_RoutingFeesDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_RoutingFeesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_RoutingFeesDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_RoutingFeesDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_RoutingFeesDecodeErrorZ clone() {
		number ret = bindings.CResult_RoutingFeesDecodeErrorZ_clone(this.ptr);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
