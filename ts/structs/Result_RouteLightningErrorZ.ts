
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RouteLightningErrorZ extends CommonBase {
	private Result_RouteLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteLightningErrorZ_is_ok(ptr)) {
			return new Result_RouteLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteLightningErrorZ_OK extends Result_RouteLightningErrorZ {
		public final Route res;
		private Result_RouteLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_RouteLightningErrorZ_get_ok(ptr);
			const res_hu_conv: Route = new Route(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteLightningErrorZ_Err extends Result_RouteLightningErrorZ {
		public final LightningError err;
		private Result_RouteLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_RouteLightningErrorZ_get_err(ptr);
			const err_hu_conv: LightningError = new LightningError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_RouteLightningErrorZ constructor_ok(Route o) {
		number ret = bindings.CResult_RouteLightningErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_RouteLightningErrorZ constructor_err(LightningError e) {
		number ret = bindings.CResult_RouteLightningErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_RouteLightningErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_RouteLightningErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_RouteLightningErrorZ clone() {
		number ret = bindings.CResult_RouteLightningErrorZ_clone(this.ptr);
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
